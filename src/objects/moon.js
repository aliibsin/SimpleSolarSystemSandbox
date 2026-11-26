import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { moonProperties, LINE_UP_LONGITUDE } from './properties.js';
import KeplerOrbit from './keplerOrbit.js';
import OrbitPath from './orbitPath.js';

const DEG = Math.PI / 180;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

// Largest periodic corrections to the Moon's longitude (evection, variation, annual equation).
const longitudeCorrection = (hours, keplerOrbit) => {
  const { sunMeanLongitude, sunMeanAnomaly } = moonProperties.sun;
  const sunLongitude = sunMeanLongitude.at + sunMeanLongitude.rate * hours;
  const sunAnomaly = (sunMeanAnomaly.at + sunMeanAnomaly.rate * hours) * DEG;
  const moonAnomaly = keplerOrbit.meanAnomalyAt(hours);
  const moonLongitude = keplerOrbit.node + keplerOrbit.nodeRate * hours
    + keplerOrbit.argPeri + keplerOrbit.argPeriRate * hours + moonAnomaly;
  const elongation = (moonLongitude - sunLongitude) * DEG;

  return (-1.274 * Math.sin(moonAnomaly * DEG - 2 * elongation)
    + 0.658 * Math.sin(2 * elongation)
    - 0.186 * Math.sin(sunAnomaly)) * DEG;
};

class Moon extends Sphere {
  constructor(scene, planet, globalScale, solarSystemScale, userPlanetScale) {
    super('moon', moonProperties.texture, moonProperties.radius / globalScale);
    this.properties = moonProperties;
    this.planet = planet;
    this.solarSystemScale = solarSystemScale;
    this.offset = new THREE.Vector3();
    this.hours = 0;

    this.keplerOrbit = new KeplerOrbit(moonProperties.elements);
    this.lineUpMeanAnomaly = this.keplerOrbit.meanAnomalyAtLongitude(LINE_UP_LONGITUDE);
    this.orbitPath = new OrbitPath(scene, this.keplerOrbit, solarSystemScale);

    scene.add(this.body);
    this.scale(userPlanetScale);
  }

  // Tidally locked: the rotation is set in #updatePosition so the same face always points at the planet.
  rotate () {}

  update (clock) {
    this.clock = clock;
    this.#updatePosition();
  }

  scale (size) {
    this.size = size;
    this.body.scale.setScalar(size);
    this.#updatePosition();
  }

  #updatePosition () {
    if (!this.clock) return;

    const { hours, isDate } = this.clock;
    const center = this.planet.body.position;
    const meanAnomaly = (isDate ? this.keplerOrbit.meanAnomaly : this.lineUpMeanAnomaly)
      + this.keplerOrbit.meanMotion * hours;

    this.keplerOrbit.position(meanAnomaly, hours, this.offset)
      .multiplyScalar(this.size / this.solarSystemScale);

    if (isDate) {
      this.offset.applyAxisAngle(Y_AXIS, longitudeCorrection(hours, this.keplerOrbit));
    }

    this.body.position.copy(center).add(this.offset);
    this.body.rotation.y = Math.atan2(this.offset.z, -this.offset.x);
    this.orbitPath.update(hours, center, this.size);
  }
}

export default Moon;

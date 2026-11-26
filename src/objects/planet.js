import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { planetProperties, KM_PER_AU, LINE_UP_LONGITUDE } from './properties.js';
import KeplerOrbit from './keplerOrbit.js';
import OrbitPath from './orbitPath.js';
import Ring from './ring.js';
import applyRingShadows from './ringShadows.js';

const Y_AXIS = new THREE.Vector3(0, 1, 0);

class Planet extends Sphere {
  constructor(scene, name, globalScale, solarSystemScale, userPlanetScale) {
    super(name, planetProperties[name].texture, planetProperties[name].radius / globalScale);
    this.scene = scene;
    this.properties = planetProperties[name];
    this.globalScale = globalScale;
    this.solarSystemScale = solarSystemScale;

    this.keplerOrbit = KeplerOrbit.fromJplElements(this.properties.elements, KM_PER_AU);
    this.lineUpMeanAnomaly = this.keplerOrbit.meanAnomalyAtLongitude(LINE_UP_LONGITUDE);

    this.#setInitialOrientation();
    this.tilt = this.body.quaternion.clone();
    scene.add(this.body);

    this.ring = this.#ring();
    if (this.ring) applyRingShadows(this);
    this.orbitPath = new OrbitPath(scene, this.keplerOrbit, solarSystemScale);
    this.orbitPath.update(0);

    this.scale(userPlanetScale);
  }

  // For simple one axis rotation calculations, radians = 2pi * elapsed seconds * timescale / period in hours

  rotate (timescale, deltaSeconds) {
    const { rotationHours, rotationDirection } = this.properties;
    const radians = (2 * Math.PI * deltaSeconds * timescale) / rotationHours;
    this.body.rotateY(radians * rotationDirection);

    if (this.ring) {
      this.ring.body.rotateZ(radians * rotationDirection);
    }
  }

  update (clock) {
    const meanAnomaly = (clock.isDate ? this.keplerOrbit.meanAnomaly : this.lineUpMeanAnomaly)
      + this.keplerOrbit.meanMotion * clock.hours;

    this.keplerOrbit.position(meanAnomaly, 0, this.body.position).divideScalar(this.solarSystemScale);

    if (this.ring) {
      this.ring.body.position.copy(this.body.position);
    }

    if (clock.isDate && this.properties.showsTimeOfDay) {
      this.#faceSunForTimeOfDay(clock.hours);
    }
  }

  scale (size) {
    this.body.scale.set(size, size, size);

    if (this.ring) {
      this.ring.body.scale.set(size, size, size);
    }
  }

  // J2000 is 12:00 UT, when the Sun is over longitude 0 (ignoring the equation of time).
  #faceSunForTimeOfDay (hoursSinceJ2000) {
    const universalTime = (((hoursSinceJ2000 + 12) % 24) + 24) % 24;
    const subsolarLongitude = (12 - universalTime) * 15 * Math.PI / 180;
    const toSun = this.body.position.clone().negate().applyQuaternion(this.tilt.clone().invert());
    const sunAzimuth = Math.atan2(-toSun.z, toSun.x);

    this.body.quaternion.copy(this.tilt)
      .multiply(new THREE.Quaternion().setFromAxisAngle(Y_AXIS, sunAzimuth - subsolarLongitude));
  }

  #setInitialOrientation () {
    this.body.rotateX(-this.properties.equatorInclination * Math.PI / 180);
  }

  #ring () {
    if (this.properties.rings) {
      const ringProperties = this.properties.rings;

      return new Ring(
        this.scene,
        `${this.name}_rings`,
        `assets/${ringProperties.texture}`,
        ringProperties.innerRadius / this.globalScale,
        ringProperties.outerRadius / this.globalScale,
        this.properties.equatorInclination
      );
    }
  }
}

export default Planet;

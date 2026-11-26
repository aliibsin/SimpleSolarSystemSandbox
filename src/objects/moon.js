import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { moonProperties } from './properties.js';
import OrbitPath from './orbitPath.js';

class Moon extends Sphere {
  constructor(scene, planet, globalScale, solarSystemScale, userPlanetScale) {
    super('moon', moonProperties.texture, moonProperties.radius / globalScale);
    this.properties = moonProperties;
    this.planet = planet;
    this.offset = new THREE.Vector3();

    this.orbitPath = new OrbitPath(
      scene,
      moonProperties.semiMajorAxis,
      moonProperties.semiMinorAxis,
      moonProperties.orbitInclination,
      solarSystemScale
    );
    this.angle = this.orbitPath.alignedStartAngle;

    scene.add(this.body);
    this.scale(userPlanetScale);
  }

  // Tidally locked: the rotation is set in #updatePosition so the same face always points at the planet.
  rotate () {}

  orbit (timescale, deltaSeconds) {
    this.angle += (2 * Math.PI * deltaSeconds * timescale) / this.properties.orbitHours;
    this.#updatePosition();
  }

  scale (size) {
    this.size = size;
    this.body.scale.setScalar(size);
    this.orbitPath.body.scale.setScalar(size);
    this.#updatePosition();
  }

  #updatePosition () {
    const center = this.planet.body.position;

    this.orbitPath.positionAt(this.angle, this.offset).multiplyScalar(this.size);
    this.body.position.copy(center).add(this.offset);
    this.orbitPath.body.position.copy(center);
    this.body.rotation.y = Math.atan2(this.offset.z, -this.offset.x);
  }
}

export default Moon;

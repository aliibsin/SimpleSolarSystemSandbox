import Sphere from '../util/sphere.js';

import { planetProperties } from './properties.js';
import OrbitPath from './orbitPath.js';
import Ring from './ring.js';
import applyRingShadows from './ringShadows.js';

class Planet extends Sphere {
  constructor(scene, name, globalScale, solarSystemScale, userPlanetScale) {
    super(name, planetProperties[name].texture, planetProperties[name].radius / globalScale);
    this.scene = scene;
    this.properties = planetProperties[name];
    this.globalScale = globalScale;
    this.solarSystemScale = solarSystemScale;

    this.#setInitialOrientation();
    scene.add(this.body);

    this.ring = this.#ring();
    if (this.ring) applyRingShadows(this);
    this.orbitPath = this.#orbitPath();

    this.angle = this.orbitPath.alignedStartAngle;
    this.#updatePosition();
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

  orbit (timescale, deltaSeconds) {
    const { orbitHours } = this.properties;

    this.angle += (2 * Math.PI * deltaSeconds * timescale) / orbitHours;
    this.#updatePosition();
  }

  scale (size) {
    this.body.scale.set(size, size, size);

    if (this.ring) {
      this.ring.body.scale.set(size, size, size);
    }
  }

  #updatePosition () {
    this.orbitPath.positionAt(this.angle, this.body.position);

    if (this.ring) {
      this.ring.body.position.copy(this.body.position);
    }
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

  #orbitPath () {
    return new OrbitPath(
      this.scene,
      this.properties.semiMajorAxis,
      this.properties.semiMinorAxis,
      this.properties.orbitInclination,
      this.solarSystemScale
    );
  }
}

export default Planet;

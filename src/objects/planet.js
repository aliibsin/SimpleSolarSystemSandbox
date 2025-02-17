import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { planetProperties } from './properties.js';
import OrbitPath from './orbitPath.js';
import Ring from './ring.js';

class Planet extends Sphere {
  constructor(scene, name, globalScale, solarSystemScale, userPlanetScale) {
    super(name, planetProperties[name].texture, (planetProperties[name].radius / globalScale) * userPlanetScale);
    this.scene = scene;
    this.properties = planetProperties[name];
    this.globalScale = globalScale;
    this.solarSystemScale = solarSystemScale;
    this.userPlanetScale = userPlanetScale;
    this.angle = 0;

    this.#setInitialOrientation();
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    scene.add(this.body);

    this.ring = this.#ring();
    this.orbitPath = this.#orbitPath();
  }

  // For simple one axis rotation calculations, radians per frame = 2pi / (rotation period * frames)

  rotate (timescale, targetFps) {
    const { rotationHours, rotationDirection } = this.properties;
    const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timescale) * targetFps);
    this.body.rotateY(radiansPerFrame * rotationDirection * timescale);

    if (this.ring) {
      this.ring.body.rotateZ(radiansPerFrame * rotationDirection * timescale);
    }
  }

  orbit (timescale, targetFps) {
    const { semiMajorAxis, semiMinorAxis, orbitHours, orbitInclination } = this.properties
    const radiansPerFrame = (2 * Math.PI) / ((orbitHours / timescale) * targetFps);

    this.angle += radiansPerFrame * timescale;

    const x = (semiMinorAxis / this.solarSystemScale) * Math.sin(this.angle);
    const z = (semiMajorAxis / this.solarSystemScale) * Math.cos(this.angle);
  
    const y = x * Math.sin(orbitInclination * Math.PI / 180);
    const xInclined = x * Math.cos(orbitInclination * Math.PI / 180);
    const zInclined = z * Math.cos(orbitInclination * Math.PI / 180);
  
    this.body.position.set(xInclined, -y, zInclined);
  
    if (this.ring) {
      this.ring.body.position.set(xInclined, -y, zInclined);
    };
  };

  scale (size) {
    this.body.scale.set(size, size, size);

    if (this.ring) {
      this.ring.body.scale.set(size, size, size);
    };
  }

  #setInitialOrientation () {
    this.body.position.set(0, 0, this.properties.semiMajorAxis / this.solarSystemScale);
    this.body.rotateX(-this.properties.equatorInclination * Math.PI / 180);
  }

  #ring () {
    if (this.properties.rings) {
      const ringProperties = this.properties.rings;

      return new Ring(
        this.scene,
        `${this.name}_rings`,
        `assets/${ringProperties.texture}`,
        (ringProperties.innerRadius / this.globalScale) * this.userPlanetScale,
        (ringProperties.outerRadius / this.globalScale) * this.userPlanetScale,
        this.properties.semiMajorAxis,
        this.properties.equatorInclination,
        this.solarSystemScale
      );
    };
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

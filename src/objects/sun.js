import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { sunProperties } from './properties.js';

class Sun extends Sphere {
  constructor(scene, globalScale) {
    super('sun', sunProperties.texture, sunProperties.radius / globalScale, { toneMapped: false }, THREE.MeshBasicMaterial);
    this.properties = sunProperties;
    scene.add(this.body);
  }

  // For simple one axis rotation calculations, radians = 2pi * elapsed seconds * timescale / period in hours

  rotate (timescale, deltaSeconds) {
    const { rotationHours, rotationDirection } = sunProperties;
    const radians = (2 * Math.PI * deltaSeconds * timescale) / rotationHours;
    this.body.rotateY(radians * rotationDirection);
  }
}

export default Sun;

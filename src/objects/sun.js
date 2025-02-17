import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { sunProperties } from './properties.js';

class Sun extends Sphere {
  constructor(scene, globalScale) {
    super('sun', 'assets/sun.jpg', sunProperties.radius / globalScale, { toneMapped: false }, THREE.MeshBasicMaterial);
    scene.add(this.body);
  }

  rotate (timescale, targetFps) {
    const { rotationHours, rotationDirection } = sunProperties;
    this.rotateBody(timescale, targetFps, rotationHours, rotationDirection);
  }
}

export default Sun;

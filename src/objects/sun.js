import * as THREE from 'three';
import Sphere from '../util/sphere.js';

import { sunProperties } from './properties.js';

class Sun extends Sphere {
  constructor(scene, globalScale) {
    super('sun', sunProperties.texture, sunProperties.radius / globalScale, { toneMapped: false }, THREE.MeshBasicMaterial);
    this.properties = sunProperties;
    scene.add(this.body);
  }

  // For simple one axis rotation calculations, radians per frame = 2pi / (rotation period * frames)

  rotate (timescale, targetFps) {
    const { rotationHours, rotationDirection } = sunProperties;
    const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timescale) * targetFps);
    this.body.rotateY(radiansPerFrame * rotationDirection * timescale);
  }
}

export default Sun;

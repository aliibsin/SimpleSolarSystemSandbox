import * as THREE from 'three';
import { planetProperties } from './bodies.js';;

const setupOrbitPaths = (solarSystemScale) => {
  return Object.entries(planetProperties).map(([body, properties]) => {
    if (body === 'sun') {
      return;
    };

    const { semiMajorAxis, semiMinorAxis, orbitInclination } = properties;

    const curve = new THREE.EllipseCurve(0, 0, semiMajorAxis / solarSystemScale, semiMinorAxis / solarSystemScale, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(128);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Rotate the orbit to account for inclination
    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(orbitInclination * Math.PI / 180);

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const ellipse = new THREE.Line(geometry, material);

    return ellipse;
  });
};

export default setupOrbitPaths;

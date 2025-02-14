import * as THREE from 'three';

const NUM_POINTS = 128;

const setupOrbitPathObject = (properties, solarSystemScale) => {
  const { semiMajorAxis, semiMinorAxis, orbitInclination } = properties;

  const curve = new THREE.EllipseCurve(0, 0, semiMajorAxis / solarSystemScale, semiMinorAxis / solarSystemScale, 0, 2 * Math.PI, false, 0);
  const points = curve.getPoints(NUM_POINTS);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Rotate the orbit to account for inclination
  geometry.rotateX(Math.PI / 2);
  geometry.rotateZ(-orbitInclination * Math.PI / 180);

  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const ellipse = new THREE.Line(geometry, material);

  return ellipse;
};

export default setupOrbitPathObject;

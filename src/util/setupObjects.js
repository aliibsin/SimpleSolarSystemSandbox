import * as THREE from 'three';

const SPHERE_WIDTH_DIVISIONS = 128;
const SPHERE_HEIGHT_DIVISIONS = 128;
const RING_THETA_SEGMENTS = 128;
const ORBIT_SEGMENTS = 128;

export const setupSphereObject = (sphereRadius, textureName, side = THREE.FrontSide) => {
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, SPHERE_WIDTH_DIVISIONS, SPHERE_HEIGHT_DIVISIONS);
  const texture = new THREE.TextureLoader().load(`assets/${textureName}.jpg`);
  texture.colorSpace = THREE.SRGBColorSpace;

  const materialOptions = { map: texture };
  if (side) {
    materialOptions.side = side;
  };

  const material = new THREE.MeshStandardMaterial(materialOptions);
  const body = new THREE.Mesh(sphereGeometry, material);
  body.name = textureName;
  return body;
};

export const setupRingObject = (innerRadius, outerRadius, textureName) => {
  const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, RING_THETA_SEGMENTS);

  const midRadius = (innerRadius + outerRadius) / 2;
  let pos = ringGeometry.attributes.position;
  let v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    ringGeometry.attributes.uv.setXY(i, v3.length() < midRadius ? 0 : 1, 1);
  }
  
  const ringTexture = new THREE.TextureLoader().load(`assets/${textureName}.png`);
  const material = new THREE.MeshStandardMaterial({ map: ringTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthWrite: false });
  const ring = new THREE.Mesh(ringGeometry, material);
  ring.name = textureName;

  return ring;
};

export const setupOrbitPathObject = (properties, solarSystemScale) => {
  const { semiMajorAxis, semiMinorAxis, orbitInclination } = properties;

  const curve = new THREE.EllipseCurve(0, 0, semiMajorAxis / solarSystemScale, semiMinorAxis / solarSystemScale, 0, 2 * Math.PI, false, 0);
  const points = curve.getPoints(ORBIT_SEGMENTS);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Rotate the orbit to account for inclination
  geometry.rotateX(Math.PI / 2);
  geometry.rotateZ(-orbitInclination * Math.PI / 180);

  const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.1, color: 0xffffff });
  const ellipse = new THREE.Line(geometry, material);

  return ellipse;
};

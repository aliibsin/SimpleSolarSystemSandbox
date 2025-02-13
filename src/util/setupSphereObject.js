import * as THREE from 'three';

const SPHERE_WIDTH_DIVISIONS = 32;
const SPHERE_HEIGHT_DIVISIONS = 32;

const setupSphereObject = (sphereRadius, textureName, side = undefined) => {
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, SPHERE_WIDTH_DIVISIONS, SPHERE_HEIGHT_DIVISIONS);
  const texture = new THREE.TextureLoader().load(`assets/${textureName}.jpg`);

  const materialOptions = { map: texture };
  if (side) {
    materialOptions.side = side;
  };

  const material = new THREE.MeshBasicMaterial(materialOptions);
  return new THREE.Mesh(sphereGeometry, material);
};

export default setupSphereObject;

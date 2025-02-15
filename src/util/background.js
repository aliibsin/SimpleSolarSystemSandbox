import * as THREE from 'three';
import { setupSphereObject } from './setupObjects';

const backgroundMesh = (sphereRadius) => {
  return setupSphereObject(sphereRadius, 'stars_milky_way', THREE.BackSide);
};

export default backgroundMesh;

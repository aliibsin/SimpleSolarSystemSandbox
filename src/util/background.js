import * as THREE from 'three';
import setupSphereObject from './setupSphereObject';

const backgroundMesh = (sphereRadius) => {
  return setupSphereObject(sphereRadius, 'stars_milky_way', THREE.BackSide);
};

export default backgroundMesh;

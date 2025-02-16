import * as THREE from 'three';

const CAMERA_MIN = 0.1;

const setupCamera = (cameraMax) => {
  const aspect_ratio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect_ratio, CAMERA_MIN, cameraMax);

  return camera;
}

export default setupCamera;

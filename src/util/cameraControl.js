import * as THREE from 'three';

const CAMERA_MIN = 0.1;

const setupCamera = (renderer, cameraMax) => {
  const aspect_ratio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect_ratio, CAMERA_MIN, cameraMax);
  // camera.position.set(1000, 1000, 161204.1);
  camera.position.set(0, 1000, -5000);
  // camera.rotateX(-0.785398);

  return camera;
}

export default setupCamera;

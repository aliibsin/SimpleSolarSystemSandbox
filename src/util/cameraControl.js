import * as THREE from 'three';

const CAMERA_MIN = 0.1;

const setupCamera = (renderer, cameraMax) => {
  const aspect_ratio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect_ratio, CAMERA_MIN, cameraMax);
  camera.position.set(2000, 0, 0);
  // camera.rotateX(-0.785398);
  
  // resize window adjusting
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  return camera;
}

export default setupCamera;

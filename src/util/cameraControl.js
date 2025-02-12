import * as THREE from 'three';

const CAMERA_MIN = 0.1;
const CAMERA_MAX = 15000;

const setupCamera = (renderer) => {
  const aspect_ratio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect_ratio, CAMERA_MIN, CAMERA_MAX);
  camera.position.set(0, 2,  30);
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

import * as THREE from 'three';

const MAX_DEVICE_PIXEL_RATIO = 2;

export const getPixelRatio = () => Math.min(window.devicePixelRatio, MAX_DEVICE_PIXEL_RATIO);

const setupRenderer = () => {
  const renderer = new THREE.WebGLRenderer(rendererSettings());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(getPixelRatio());
  document.body.appendChild(renderer.domElement);

  return renderer;
}

function rendererSettings () {
  return {
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true
  };
};

export default setupRenderer;

import * as THREE from 'three';

const MAX_DEVICE_PIXEL_RATIO = 2;

const setupRenderer = () => {
  const renderer = new THREE.WebGLRenderer(rendererSettings());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DEVICE_PIXEL_RATIO));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);

  return renderer;
}

function rendererSettings () {
  return {
    antialias: true,
    alpha: true
  };
};

export default setupRenderer;

import * as THREE from 'three';

const setupLoadingProgress = () => {
  const bar = document.getElementById('loading-bar');
  const fill = document.getElementById('loading-bar-fill');
  const text = document.getElementById('begin-text');

  THREE.DefaultLoadingManager.onProgress = (url, loaded, total) => {
    fill.style.width = `${(loaded / total) * 100}%`;
  };

  THREE.DefaultLoadingManager.onLoad = () => {
    bar.style.display = 'none';
    text.textContent = 'Click anywhere outside this box to begin.';
  };
};

export default setupLoadingProgress;

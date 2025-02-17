import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const BLOOM_RADIUS = 0.8;
const BLOOM_STRENGTH = 1;
const BLOOM_THRESHOLD = 0.5;

const setupBloomComposer = (renderer, scene, camera) => {
  const renderScene = new RenderPass(scene, camera);
  const outputPass = new OutputPass();
  
  const bloomResolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
  const bloomPass = new UnrealBloomPass(bloomResolution, BLOOM_RADIUS, BLOOM_STRENGTH, BLOOM_THRESHOLD);
  
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  return composer;
};

export default setupBloomComposer;

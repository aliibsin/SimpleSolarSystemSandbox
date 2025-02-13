import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import setupStats from './src/util/stats.js';
import backgroundMesh from './src/util/background.js';
import { setupSphereBodies, moveSphereBodies } from './src/planets/setupPlanets.js';
// import * as dat from 'dat.gui';

const GLOBAL_SIZE_SCALE = 1000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;
const TARGET_MAX_FPS = 60;

const renderer = setupRenderer();
const camera = setupCamera(renderer, GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);
const stats = setupStats();
const scene = new THREE.Scene();

setupIntro();
setupMusic();

scene.add(backgroundMesh(GLOBAL_BOUNDS));

const sphereBodies = setupSphereBodies(GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE);
sphereBodies.forEach((sphereBody) => scene.add(sphereBody));

let userScales = {
  time: 3
}

const fpsInterval = 1000 / TARGET_MAX_FPS;
let then = Date.now();

function animate() {
  const now = Date.now();
  const elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    stats.begin();
    controls.update();

    moveSphereBodies(sphereBodies, TARGET_MAX_FPS, userScales.time);

    renderer.render(scene, camera);
    stats.end();
  }
}

renderer.setAnimationLoop(animate);



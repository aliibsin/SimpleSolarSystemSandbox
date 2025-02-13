import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import backgroundMesh from './src/util/background.js';
import setupPlanets from './src/planets/setupPlanets.js';
// import * as dat from 'dat.gui';

const GLOBAL_SIZE_SCALE = 1000; // 1:1000 global scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / GLOBAL_SIZE_SCALE;

const renderer = setupRenderer();
const camera = setupCamera(renderer, GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update()

const scene = new THREE.Scene();
scene.add(backgroundMesh(GLOBAL_BOUNDS));

setupIntro();
setupMusic();
setupPlanets(scene, GLOBAL_SIZE_SCALE);

function animate() {
  controls.update();
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



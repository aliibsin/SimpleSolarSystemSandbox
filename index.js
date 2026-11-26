import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewportGizmo } from "three-viewport-gizmo";

import setupRenderer, { getPixelRatio } from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupBloomComposer from './src/util/postProcessing.js';
import setupIntro from './src/util/introControl.js';
import setupLoadingProgress from './src/util/loadingProgress.js';
import setupMusic from './src/util/musicControl.js';
import setupStats from './src/util/stats.js';
import setupGui from './src/util/gui.js';
import addBackground from './src/util/background.js';
import { addAmbientLight, addSunLight } from './src/util/lights.js';
import Sun from './src/objects/sun.js';
import Planet from './src/objects/planet.js';

const GLOBAL_SIZE_SCALE = 1_000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;

let userState = {
  intro: true,
  timePause: false,
  time: 1,
  size: 25
}

const renderer = setupRenderer();
const camera = setupCamera(GLOBAL_BOUNDS * 2);
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = GLOBAL_BOUNDS / 2;
const gizmo = new ViewportGizmo(camera, renderer, { placement: 'bottom-right' });
const stats = setupStats();
const scene = new THREE.Scene();
gizmo.attachControls(controls);

setupIntro(userState);
setupLoadingProgress();
setupMusic();
addBackground(scene, GLOBAL_BOUNDS);
addAmbientLight(scene);
addSunLight(scene);

const bloomComposer = setupBloomComposer(renderer, scene, camera);

// resize window adjusting
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = getPixelRatio();

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  bloomComposer.setPixelRatio(pixelRatio);
  bloomComposer.setSize(width, height);
  gizmo.update();
});

const sun = new Sun(scene, GLOBAL_SIZE_SCALE);

let planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
planets = planets.map((planet) => {
  return new Planet(scene, planet, GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userState.size);
});

setupGui(planets, userState);

const timer = new THREE.Timer();
timer.connect(document);

const earth = planets[2]
// Places Venus and Mercury in front of the sun during the intro.
const cameraOffset = new THREE.Vector3(400.0, 0.0, 300.0);

function animate(timestamp) {
  timer.update(timestamp);
  const delta = timer.getDelta();

  stats.begin();
  controls.update();

  if (!userState.timePause) {
    sun.rotate(userState.time, delta);

    planets.forEach((planet) => {
      planet.rotate(userState.time, delta);
      planet.orbit(userState.time, delta);
    });
  };

  if (userState.intro) {
    const objectPosition = new THREE.Vector3();
    earth.body.getWorldPosition(objectPosition);
    camera.position.copy(objectPosition).add(cameraOffset);
  }

  bloomComposer.render();
  gizmo.render();
  stats.end();
}

renderer.setAnimationLoop(animate);

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
import setupInfoPanel from './src/util/infoPanel.js';
import setupPicking from './src/util/picking.js';
import FocusControl from './src/util/focusControl.js';
import addBackground from './src/util/background.js';
import { addAmbientLight, addSunLight } from './src/util/lights.js';
import Sun from './src/objects/sun.js';
import Planet from './src/objects/planet.js';
import Moon from './src/objects/moon.js';
import AsteroidBelt from './src/objects/asteroidBelt.js';

const GLOBAL_SIZE_SCALE = 1_000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;

let userState = {
  intro: true,
  timePause: false,
  time: 1,
  size: 25,
  focus: 'none'
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
const asteroidBelt = new AsteroidBelt(scene, GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userState.size);

let planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
planets = planets.map((planet) => {
  return new Planet(scene, planet, GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userState.size);
});

const earth = planets[2];
const moon = new Moon(scene, earth, GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userState.size);
const bodies = [...planets.slice(0, 3), moon, ...planets.slice(3)];

const focusables = new Map([sun, ...bodies].map((object) => [object.name, object]));
const focusControl = new FocusControl(camera, controls);
const infoPanel = setupInfoPanel(() => setFocus('none'));

function setFocus(name) {
  const object = focusables.get(name);
  userState.focus = object ? name : 'none';

  if (object) {
    focusControl.focus(object);
    infoPanel.show(object);
  } else {
    focusControl.release();
    infoPanel.hide();
  }
}

setupPicking(renderer.domElement, camera, [...focusables.values()], (object) => setFocus(object.name));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && userState.focus !== 'none') setFocus('none');
});

setupGui(bodies, asteroidBelt, userState, [...focusables.keys()], setFocus);

const timer = new THREE.Timer();
timer.connect(document);

// Places Venus and Mercury in front of the sun during the intro.
const cameraOffset = new THREE.Vector3(400.0, 0.0, 300.0);

function animate(timestamp) {
  timer.update(timestamp);
  const delta = timer.getDelta();

  stats.begin();

  if (!userState.timePause) {
    sun.rotate(userState.time, delta);
    asteroidBelt.orbit(userState.time, delta);

    bodies.forEach((body) => {
      body.rotate(userState.time, delta);
      body.orbit(userState.time, delta);
    });
  };

  if (userState.intro) {
    const objectPosition = new THREE.Vector3();
    earth.body.getWorldPosition(objectPosition);
    camera.position.copy(objectPosition).add(cameraOffset);
  }

  focusControl.update(delta);
  controls.update();

  bloomComposer.render();
  gizmo.render();
  stats.end();
}

renderer.setAnimationLoop(animate);

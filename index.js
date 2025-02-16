import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewportGizmo } from "three-viewport-gizmo";

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupBloomComposer from './src/util/postProcessing.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import setupStats from './src/util/stats.js';
import setupGui from './src/util/gui.js';
import backgroundMesh from './src/util/background.js';
import { addAmbientLight, addSunLight } from './src/util/lights.js';
import { setupSun, setupPlanets } from './src/planets/setupBodies.js';
import { rotateSun, rotatePlanet, orbitBody } from './src/planets/moveBodies.js';

const GLOBAL_SIZE_SCALE = 1_000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;
const TARGET_MAX_FPS = 60;

let userState = {
  intro: true,
  timePause: false,
  time: 1,
  size: 5
}

const renderer = setupRenderer();
const camera = setupCamera(GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);
const gizmo = new ViewportGizmo(camera, renderer, { placement: 'bottom-right' });
const stats = setupStats();
const scene = new THREE.Scene();

setupIntro(userState);
setupMusic();
gizmo.attachControls(controls);

scene.add(backgroundMesh(GLOBAL_BOUNDS));

const sun = setupSun(GLOBAL_SIZE_SCALE);
scene.add(sun);

const planets = setupPlanets(GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userState.size);
Object.values(planets).forEach((planet) => {
  scene.add(planet.sphereBody);
  scene.add(planet.orbitPath);

  if (planet.ringBody) {
    scene.add(planet.ringBody);
  };
});

setupGui(planets, userState);
addAmbientLight(scene);
addSunLight(scene);

const bloomComposer = setupBloomComposer(renderer, scene, camera);

const fpsInterval = 1000 / TARGET_MAX_FPS;
let then = 0;

// resize window adjusting
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  gizmo.update();
});

const earth = planets['earth'].sphereBody
const cameraOffset = new THREE.Vector3(500.0, 0.0, 300.0);

function animate(time) {
  const elapsed = time - then;

  if (elapsed > fpsInterval) {
    then = time - (elapsed % fpsInterval);

    stats.begin();
    controls.update();

    if (!userState.timePause) {
      rotateSun(sun, TARGET_MAX_FPS, userState.time);

      Object.values(planets).forEach((planet) => {
        rotatePlanet(planet, TARGET_MAX_FPS, userState.time);
        orbitBody(planet, TARGET_MAX_FPS, userState.time, SOLAR_SYSTEM_SIZE_SCALE);
      });
    }

    Object.values(planets).forEach((planet) => {
      planet.sphereBody.scale.set(userState.size, userState.size, userState.size);

      if (planet.ringBody) {
        planet.ringBody.scale.set(userState.size, userState.size, userState.size);
      }
    });

    if (userState.intro) {
      const objectPosition = new THREE.Vector3();
      earth.getWorldPosition(objectPosition);
      camera.position.copy(objectPosition).add(cameraOffset);
    }

    bloomComposer.render();
    gizmo.render();
    stats.end();
  }
}

renderer.setAnimationLoop(animate);

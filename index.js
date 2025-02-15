import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import setupStats from './src/util/stats.js';
import backgroundMesh from './src/util/background.js';
import { setupSun, setupPlanets } from './src/planets/setupBodies.js';
import { rotateSun, rotatePlanet, orbitBody } from './src/planets/moveBodies.js';
// import * as dat from 'dat.gui';

const GLOBAL_SIZE_SCALE = 1000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;
const TARGET_MAX_FPS = 60;

let userScales = {
  time: 5,
  size: 100
}

const renderer = setupRenderer();
const camera = setupCamera(renderer, GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);
const stats = setupStats();
const scene = new THREE.Scene();

setupIntro();
setupMusic();

scene.add(backgroundMesh(GLOBAL_BOUNDS));

const sun = setupSun(GLOBAL_SIZE_SCALE);
const planets = setupPlanets(GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userScales.size);

scene.add(sun);
Object.values(planets).forEach((planet) => {
  scene.add(planet.sphereBody);
  scene.add(planet.orbitPath);

  if (planet.ringBody) {
    scene.add(planet.ringBody);
  };
});

const pointLight = new THREE.PointLight(0xffffff, 0.9, 0, 0);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const fpsInterval = 1000 / TARGET_MAX_FPS;
let then = 0;

function animate(time) {
  const elapsed = time - then;

  if (elapsed > fpsInterval) {
    then = time - (elapsed % fpsInterval);

    stats.begin();
    controls.update();

    rotateSun(sun, TARGET_MAX_FPS, userScales.time);

    Object.values(planets).forEach((planet) => {
      rotatePlanet(planet, TARGET_MAX_FPS, userScales.time);
      orbitBody(planet, TARGET_MAX_FPS, userScales.time, SOLAR_SYSTEM_SIZE_SCALE);
    });

    renderer.render(scene, camera);
    stats.end();
  }
}

renderer.setAnimationLoop(animate);

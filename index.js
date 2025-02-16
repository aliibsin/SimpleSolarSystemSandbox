import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ViewportGizmo } from "three-viewport-gizmo";

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import setupStats from './src/util/stats.js';
import backgroundMesh from './src/util/background.js';
import { setupSun, setupPlanets } from './src/planets/setupBodies.js';
import { rotateSun, rotatePlanet, orbitBody } from './src/planets/moveBodies.js';
import humanize from './src/util/humanizeString.js';

const GLOBAL_SIZE_SCALE = 1_000; // 1:1,000 global scale in km
const SOLAR_SYSTEM_SIZE_SCALE = 10_000; // 1:10,000 solar system scale in km
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / SOLAR_SYSTEM_SIZE_SCALE;
const TARGET_MAX_FPS = 60;

let userScales = {
  time: 1,
  size: 1
}

const renderer = setupRenderer();
const camera = setupCamera(renderer, GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);
const gizmo = new ViewportGizmo(camera, renderer, { placement: 'bottom-right' });
const stats = setupStats();
const scene = new THREE.Scene();
const gui = new GUI();

setupIntro();
setupMusic();
gizmo.attachControls(controls);

scene.add(backgroundMesh(GLOBAL_BOUNDS));

const sun = setupSun(GLOBAL_SIZE_SCALE);
const planets = setupPlanets(GLOBAL_SIZE_SCALE, SOLAR_SYSTEM_SIZE_SCALE, userScales.size);

scene.add(sun);

const orbitPaths = gui.addFolder('Toggle Orbit Paths').close();

const showAllPaths = () => {
  Object.values(planets).forEach((planet) => {
    planet.orbitPath.visible = true;
  });
}

const hideAllPaths = () => {
  Object.values(planets).forEach((planet) => {
    planet.orbitPath.visible = false;
  });
}

const togglePaths = {
  showAll: showAllPaths,
  hideAll: hideAllPaths
}

const togglePath = (planet) => {
  planet.orbitPath.visible = !planet.orbitPath.visible;
}

Object.values(planets).forEach((planet) => {
  scene.add(planet.sphereBody);
  scene.add(planet.orbitPath);

  togglePaths[planet.sphereBody.name] = () => togglePath(planet);
  orbitPaths.add(togglePaths, planet.sphereBody.name).name(humanize(planet.sphereBody.name));

  if (planet.ringBody) {
    scene.add(planet.ringBody);
  };
});

orbitPaths.add(togglePaths, 'showAll').name('Show All');
orbitPaths.add(togglePaths, 'hideAll').name('Hide All');

let timePause = false;

const toggleTime = () => {
  timePause = !timePause;
};

let timeStop = {
  toggle: toggleTime
};

const scaleFolder = gui.addFolder('Scale Controls').close();
scaleFolder.add(timeStop, "toggle").name("Pause/Resume Time");
scaleFolder.add(userScales, "time", 1, 50, 1).name("Time Scale");
scaleFolder.add(userScales, "size", 1, 100, 1).name("Planet Size Scale");

const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
scene.add( ambientLight );

const pointLight = new THREE.PointLight(0xffffff, 0.9, 0, 0.03);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const fpsInterval = 1000 / TARGET_MAX_FPS;
let then = 0;

const renderScene = new RenderPass( scene, camera );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), .8, 1, .5);
const outputPass = new OutputPass();

const composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass( outputPass );

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

function animate(time) {
  const elapsed = time - then;

  if (elapsed > fpsInterval) {
    then = time - (elapsed % fpsInterval);

    stats.begin();
    controls.update();

    if (!timePause) {
      rotateSun(sun, TARGET_MAX_FPS, userScales.time);

      Object.values(planets).forEach((planet) => {
        rotatePlanet(planet, TARGET_MAX_FPS, userScales.time);
        orbitBody(planet, TARGET_MAX_FPS, userScales.time, SOLAR_SYSTEM_SIZE_SCALE);
      });
    }

    Object.values(planets).forEach((planet) => {
      planet.sphereBody.scale.set(userScales.size, userScales.size, userScales.size);

      if (planet.ringBody) {
        planet.ringBody.scale.set(userScales.size, userScales.size, userScales.size);
      }
    });

    composer.render();
    gizmo.render();
    stats.end();
  }
}

renderer.setAnimationLoop(animate);

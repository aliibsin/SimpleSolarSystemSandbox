import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import setupRenderer from './src/util/renderer.js';
import setupCamera from './src/util/cameraControl.js';
import setupIntro from './src/util/introControl.js';
import setupMusic from './src/util/musicControl.js';
import backgroundMesh from './src/util/background.js';
import planets from './src/planets/planets.js';
// import * as dat from 'dat.gui';

// 1:1000 global scale in km
const GLOBAL_SCALE = 1000;
const BOUNDS = 300_000_000_000; // Oort cloud starts ~299,195,741,382 km from the sun
const GLOBAL_BOUNDS = BOUNDS / GLOBAL_SCALE;

const renderer = setupRenderer();
const camera = setupCamera(renderer, GLOBAL_BOUNDS);
const controls = new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();
const bg = backgroundMesh(GLOBAL_BOUNDS);
scene.add(backgroundMesh(GLOBAL_BOUNDS));

setupIntro();
setupMusic();

// 695 700

const sphereGeometry = new THREE.SphereGeometry( 695.7, 32, 32 );
const texture = new THREE.TextureLoader().load('assets/sun.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh( sphereGeometry, material );
scene.add( sphere );

// const bgGeometry = new THREE.SphereGeometry(sphereRadius, SPHERE_WIDTH_DIVISIONS, SPHERE_HEIGHT_DIVISIONS);
//   const bgTexture = new THREE.TextureLoader().load('assets/stars_milky_way.jpg');
//   const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.BackSide });

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



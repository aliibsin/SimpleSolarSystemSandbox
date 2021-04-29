import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import Sun from './planets/sun';
import {
  mercury, venus, earth, mars,
  jupiter, saturn, uranus, neptune,
  saturnRing
} from './planets/planets';

console.log('webpack is working');

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const bgTexture = new THREE.TextureLoader();
bgTexture.load("src/assets/stars_milky_way.jpg", function(bgTexture) {
  scene.background = bgTexture;
});


scene.add(Sun);

let userValues = {
  scale: 10,
  timeScale: 1
} 


// planets
let rMercury = 716;
mercury.position.set(rMercury, 0, 0);
mercury.rotation.set(0, 0, -Math.PI * 2 / 180);
let thetaMercury = 0;
let dThetaMercury = 2 * Math.PI * (10 * userValues.timeScale) / (88 * 60) ;
const mercuryPathGeometry = new THREE.RingGeometry(rMercury-10, rMercury+10, 100, 100);
const mercuryPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const mercuryPath = new THREE.Mesh(mercuryPathGeometry, mercuryPathMaterial);
mercuryPath.rotation.set(1.5708, 0, 0);
scene.add(mercuryPath);
scene.add(mercury);


let rVenus = 1101;
venus.position.set(rVenus, 0, 0);
venus.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaVenus = 0;
let dThetaVenus = 2 * Math.PI * (10 * userValues.timeScale) / (225 * 60) ;
const venusPathGeometry = new THREE.RingGeometry(rVenus-10, rVenus+10, 100, 100);
const venusPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const venusPath = new THREE.Mesh(venusPathGeometry, venusPathMaterial);
venusPath.rotation.set(1.5708, 0, 0);
scene.add(venusPath);
scene.add(venus);


let rEarth = 1366;
earth.position.set(rEarth, 0, 0);
earth.rotation.set(0, 0, -Math.PI * 23.5 / 180);
let thetaEarth = 0;
let dThetaEarth = 2 * Math.PI * (10 * userValues.timeScale) / (365 * 60) ;
const earthPathGeometry = new THREE.RingGeometry(rEarth-10, rEarth+10, 100, 100);
const earthPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const earthPath = new THREE.Mesh(earthPathGeometry, earthPathMaterial);
earthPath.rotation.set(1.5708, 0, 0);
scene.add(earthPath);
scene.add(earth);


let rMars = 1962.2;
mars.position.set(rMars, 0, 0);
mars.rotation.set(0, 0, -Math.PI * 25.2 / 180);
let thetaMars = 0;
let dThetaMars = 2 * Math.PI * (10 * userValues.timeScale) / (687 * 60) ;
const marsPathGeometry = new THREE.RingGeometry(rMars-10, rMars+10, 100, 100);
const marsPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const marsPath = new THREE.Mesh(marsPathGeometry, marsPathMaterial);
marsPath.rotation.set(1.5708, 0, 0);
scene.add(marsPath);
scene.add(mars);


let rJupiter = 5268;
jupiter.position.set(rJupiter, 0, 0);
jupiter.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaJupiter = 0;
let dThetaJupiter = 2 * Math.PI * (10 * userValues.timeScale) / (4380 * 60) ;
const jupiterPathGeometry = new THREE.RingGeometry(rJupiter-20, rJupiter+20, 100, 100);
const jupiterPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const jupiterPath = new THREE.Mesh(jupiterPathGeometry, jupiterPathMaterial);
jupiterPath.rotation.set(1.5708, 0, 0);
scene.add(jupiterPath);
scene.add(jupiter);


let rSaturn = 9338;
saturn.position.set(rSaturn, 0, 0);
saturnRing.position.set(rSaturn, 0, 0);
saturn.rotation.set(0, 0, -Math.PI * 27 / 180);
saturnRing.rotation.set( 1.5708, -Math.PI * 27 / 180, 0);
let thetaSaturn = 0;
let thetaSaturnRing = 0;
let dThetaSaturn = 2 * Math.PI * (10 * userValues.timeScale) / (10585 * 60) ;
let dThetaSaturnRing = 2 * Math.PI * (10 * userValues.timeScale) / (10585 * 60) ;
const saturnPathGeometry = new THREE.RingGeometry(rSaturn-20, rSaturn+20, 100, 100);
const saturnPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const saturnPath = new THREE.Mesh(saturnPathGeometry, saturnPathMaterial);
saturnPath.rotation.set(1.5708, 0, 0);
scene.add(saturnRing);
scene.add(saturnPath);
scene.add(saturn);


let rUranus = 18270;
uranus.position.set(rUranus, 0, 0);
uranus.rotation.set(0, 0, -Math.PI * 98 / 180);
let thetaUranus = 0;
let dThetaUranus = 2 * Math.PI * (10 * userValues.timeScale) / (30660 * 60) ;
const uranusPathGeometry = new THREE.RingGeometry(rUranus-20, rUranus+20, 100, 100);
const uranusPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const uranusPath = new THREE.Mesh(uranusPathGeometry, uranusPathMaterial);
uranusPath.rotation.set(1.5708, 0, 0);
scene.add(uranusPath);
scene.add(uranus);


let rNeptune = 29840;
neptune.position.set(rNeptune, 0, 0);
neptune.rotation.set(0, 0, -Math.PI * 28.5 / 180);
let thetaNeptune = 0;
let dThetaNeptune = 2 * Math.PI * (10 * userValues.timeScale) / (60225 * 60) ;
const neptunePathGeometry = new THREE.RingGeometry(rNeptune-20, rNeptune+20, 100, 100);
const neptunePathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
const neptunePath = new THREE.Mesh(neptunePathGeometry, neptunePathMaterial);
neptunePath.rotation.set(1.5708, 0, 0);
scene.add(neptunePath);
scene.add(neptune);


// sun light
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2)
scene.add(pointLight)

// gui for scaling
const scaleGUI = new dat.GUI({ autoPlace: false, width: 300 });
const scaleGUIFolder = scaleGUI.addFolder('Toggle Scale Controls');
scaleGUIFolder.add(userValues, "scale", 1, 20).name("Planet Size Scale");
scaleGUIFolder.add(userValues, "timeScale", 1, 20).name("Time Scale");

let scaleGUIContainer = document.getElementById("scale-gui");
scaleGUIContainer.appendChild(scaleGUI.domElement)


// default window sizes
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

//starting camera position
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500000)
camera.position.set(0, 2000,  3000);
camera.rotateX(-0.785398 );
scene.add(camera)

//create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// resize window adjusting
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

var controls = new OrbitControls( camera, renderer.domElement);
controls.update();


const clock = new THREE.Clock()

const animate = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  controls.update();

  // Body rotations
  Sun.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (25 * 60));
  mercury.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (58.7 * 60));
  venus.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (118.75 * 60));
  earth.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (1 * 60));
  mars.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (1 * 60));
  jupiter.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (0.42 * 60));
  saturn.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (0.45 * 60));
  saturnRing.rotateZ(2 * Math.PI * (10 * userValues.timeScale) / (0.45 * 60));
  uranus.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (0.72 * 60));
  neptune.rotateY(2 * Math.PI * (10 * userValues.timeScale) / (0.67 * 60));

  // Body orbits

  dThetaMercury = 2 * Math.PI * (10 * userValues.timeScale) / (88 * 60) ;
  thetaMercury -= dThetaMercury;
  mercury.position.x = rMercury * Math.cos(thetaMercury);
  mercury.position.z = rMercury * Math.sin(thetaMercury);

  dThetaVenus = 2 * Math.PI * (10 * userValues.timeScale) / (225 * 60) ;
  thetaVenus -= dThetaVenus;
  venus.position.x = rVenus * Math.cos(thetaVenus);
  venus.position.z = rVenus * Math.sin(thetaVenus);

  dThetaEarth = 2 * Math.PI * (10 * userValues.timeScale) / (365 * 60) ;
  thetaEarth -= dThetaEarth;
  earth.position.x = rEarth * Math.cos(thetaEarth);
  earth.position.z = rEarth * Math.sin(thetaEarth);

  dThetaMars = 2 * Math.PI * (10 * userValues.timeScale) / (687 * 60) ;
  thetaMars -= dThetaMars;
  mars.position.x = rMars * Math.cos(thetaMars);
  mars.position.z = rMars * Math.sin(thetaMars);

  dThetaJupiter = 2 * Math.PI * (10 * userValues.timeScale) / (4380 * 60) ;
  thetaJupiter -= dThetaJupiter;
  jupiter.position.x = rJupiter * Math.cos(thetaJupiter);
  jupiter.position.z = rJupiter * Math.sin(thetaJupiter);

  dThetaSaturn = 2 * Math.PI * (10 * userValues.timeScale) / (10585 * 60) ;
  thetaSaturn -= dThetaSaturn;
  saturn.position.x = rSaturn * Math.cos(thetaSaturn);
  saturn.position.z = rSaturn * Math.sin(thetaSaturn);
  
  dThetaSaturnRing = 2 * Math.PI * (10 * userValues.timeScale) / (10585 * 60) ;
  thetaSaturnRing -= dThetaSaturnRing;
  saturnRing.position.x = rSaturn * Math.cos(thetaSaturnRing);
  saturnRing.position.z = rSaturn * Math.sin(thetaSaturnRing);

  dThetaUranus = 2 * Math.PI * (10 * userValues.timeScale) / (30660 * 60) ;
  thetaUranus -= dThetaUranus;
  uranus.position.x = rUranus * Math.cos(thetaUranus);
  uranus.position.z = rUranus * Math.sin(thetaUranus);

  dThetaNeptune = 2 * Math.PI * (10 * userValues.timeScale) / (60225 * 60) ;
  thetaNeptune -= dThetaNeptune;
  neptune.position.x = rNeptune * Math.cos(thetaNeptune);
  neptune.position.z = rNeptune * Math.sin(thetaNeptune);


  // user set scales

  mercury.scale.set(userValues.scale, userValues.scale, userValues.scale);
  venus.scale.set(userValues.scale, userValues.scale, userValues.scale);
  earth.scale.set(userValues.scale, userValues.scale, userValues.scale);
  mars.scale.set(userValues.scale, userValues.scale, userValues.scale);
  jupiter.scale.set(userValues.scale, userValues.scale, userValues.scale);
  saturn.scale.set(userValues.scale, userValues.scale, userValues.scale);
  saturnRing.scale.set(userValues.scale, userValues.scale, userValues.scale);
  uranus.scale.set(userValues.scale, userValues.scale, userValues.scale);
  neptune.scale.set(userValues.scale, userValues.scale, userValues.scale);


  // Render
  renderer.render(scene, camera)

  // Call animate again on the next frame
  window.requestAnimationFrame(animate)
}

animate()
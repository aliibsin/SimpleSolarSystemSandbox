import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import Sun from './planets/sun';
import {
  mercury, venus, earth, mars,
  jupiter, saturn, uranus, neptune,
  saturnRing
} from './planets/planets';

let introModal = document.getElementById("intro-box-modal");
let introButton = document.getElementById("about-button");

introButton.onclick = () => {
  introModal.style.display = "block";
}

window.onclick = (e) => {
  if (e.target === introModal) {
    introModal.style.display = "none";
  }
}

let playMusic = document.getElementById("music-button");
let musicPlayer = document.getElementById("music");

musicPlayer.volume = 0.1;

playMusic.onclick = () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playMusic.classList.add("music-on")
  } else {
    musicPlayer.pause();
    playMusic.classList.remove("music-on")
  }
}


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
const mercuryPathCurve = new THREE.EllipseCurve(0, 0, rMercury, rMercury, 0, 2 * Math.PI, false, 0)
const mercuryPathPoints = mercuryPathCurve.getPoints(128);
const mercuryPathGeometry = new THREE.BufferGeometry().setFromPoints(mercuryPathPoints);
const mercuryPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const mercuryPath = new THREE.Line(mercuryPathGeometry, mercuryPathMaterial);
mercuryPath.rotation.set(1.5708, 0, 0);
scene.add(mercuryPath);
scene.add(mercury);


let rVenus = 1101;
venus.position.set(rVenus, 0, 0);
venus.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaVenus = 0;
let dThetaVenus = 2 * Math.PI * (10 * userValues.timeScale) / (225 * 60) ;
const venusPathCurve = new THREE.EllipseCurve(0, 0, rVenus, rVenus, 0, 2 * Math.PI, false, 0)
const venusPathPoints = venusPathCurve.getPoints(128);
const venusPathGeometry = new THREE.BufferGeometry().setFromPoints(venusPathPoints);
const venusPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const venusPath = new THREE.Line(venusPathGeometry, venusPathMaterial);
venusPath.rotation.set(1.5708, 0, 0);
scene.add(venusPath);
scene.add(venus);


let rEarth = 1366;
earth.position.set(rEarth, 0, 0);
earth.rotation.set(0, 0, -Math.PI * 23.5 / 180);
let thetaEarth = 0;
let dThetaEarth = 2 * Math.PI * (10 * userValues.timeScale) / (365 * 60) ;
const earthPathCurve = new THREE.EllipseCurve(0, 0, rEarth, rEarth, 0, 2 * Math.PI, false, 0)
const earthPathPoints = earthPathCurve.getPoints(128);
const earthPathGeometry = new THREE.BufferGeometry().setFromPoints(earthPathPoints);
const earthPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const earthPath = new THREE.Line(earthPathGeometry, earthPathMaterial);
earthPath.rotation.set(1.5708, 0, 0);
scene.add(earthPath);
scene.add(earth);


let rMars = 1962.2;
mars.position.set(rMars, 0, 0);
mars.rotation.set(0, 0, -Math.PI * 25.2 / 180);
let thetaMars = 0;
let dThetaMars = 2 * Math.PI * (10 * userValues.timeScale) / (687 * 60) ;
const marsPathCurve = new THREE.EllipseCurve(0, 0, rMars, rMars, 0, 2 * Math.PI, false, 0)
const marsPathPoints = marsPathCurve.getPoints(128);
const marsPathGeometry = new THREE.BufferGeometry().setFromPoints(marsPathPoints);
const marsPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const marsPath = new THREE.Line(marsPathGeometry, marsPathMaterial);

marsPath.rotation.set(1.5708, 0, 0);
scene.add(marsPath);
scene.add(mars);


let rJupiter = 5268;
jupiter.position.set(rJupiter, 0, 0);
jupiter.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaJupiter = 0;
let dThetaJupiter = 2 * Math.PI * (10 * userValues.timeScale) / (4380 * 60) ;
const jupiterPathCurve = new THREE.EllipseCurve(0, 0, rJupiter, rJupiter, 0, 2 * Math.PI, false, 0)
const jupiterPathPoints = jupiterPathCurve.getPoints(128);
const jupiterPathGeometry = new THREE.BufferGeometry().setFromPoints(jupiterPathPoints);
const jupiterPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const jupiterPath = new THREE.Line(jupiterPathGeometry, jupiterPathMaterial);

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
const saturnPathCurve = new THREE.EllipseCurve(0, 0, rSaturn, rSaturn, 0, 2 * Math.PI, false, 0)
const saturnPathPoints = saturnPathCurve.getPoints(128);
const saturnPathGeometry = new THREE.BufferGeometry().setFromPoints(saturnPathPoints);
const saturnPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const saturnPath = new THREE.Line(saturnPathGeometry, saturnPathMaterial);

saturnPath.rotation.set(1.5708, 0, 0);
scene.add(saturnRing);
scene.add(saturnPath);
scene.add(saturn);


let rUranus = 18270;
uranus.position.set(rUranus, 0, 0);
uranus.rotation.set(0, 0, -Math.PI * 98 / 180);
let thetaUranus = 0;
let dThetaUranus = 2 * Math.PI * (10 * userValues.timeScale) / (30660 * 60) ;
const uranusPathCurve = new THREE.EllipseCurve(0, 0, rUranus, rUranus, 0, 2 * Math.PI, false, 0)
const uranusPathPoints = uranusPathCurve.getPoints(128);
const uranusPathGeometry = new THREE.BufferGeometry().setFromPoints(uranusPathPoints);
const uranusPathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const uranusPath = new THREE.Line(uranusPathGeometry, uranusPathMaterial);

uranusPath.rotation.set(1.5708, 0, 0);
scene.add(uranusPath);
scene.add(uranus);


let rNeptune = 29840;
neptune.position.set(rNeptune, 0, 0);
neptune.rotation.set(0, 0, -Math.PI * 28.5 / 180);
let thetaNeptune = 0;
let dThetaNeptune = 2 * Math.PI * (10 * userValues.timeScale) / (60225 * 60) ;
const neptunePathCurve = new THREE.EllipseCurve(0, 0, rNeptune, rNeptune, 0, 2 * Math.PI, false, 0)
const neptunePathPoints = neptunePathCurve.getPoints(128);
const neptunePathGeometry = new THREE.BufferGeometry().setFromPoints(neptunePathPoints);
const neptunePathMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const neptunePath = new THREE.Line(neptunePathGeometry, neptunePathMaterial);

neptunePath.rotation.set(1.5708, 0, 0);
scene.add(neptunePath);
scene.add(neptune);

// Orbit path visibility
function allPathInvisible() {
  mercuryPath.visible = false;
  venusPath.visible = false;
  earthPath.visible = false;
  marsPath.visible = false;
  jupiterPath.visible = false;
  saturnPath.visible = false;
  uranusPath.visible = false;
  neptunePath.visible = false;
};

function allPathVisible() {
  mercuryPath.visible = true;
  venusPath.visible = true;
  earthPath.visible = true;
  marsPath.visible = true;
  jupiterPath.visible = true;
  saturnPath.visible = true;
  uranusPath.visible = true;
  neptunePath.visible = true;
};

function mercuryPathToggle() {
 mercuryPath.visible = !mercuryPath.visible
}

function venusPathToggle() {
  venusPath.visible = !venusPath.visible
}

function earthPathToggle() {
  earthPath.visible = !earthPath.visible
}

function marsPathToggle() {
  marsPath.visible = !marsPath.visible
}

function jupiterPathToggle() {
  jupiterPath.visible = !jupiterPath.visible
}

function saturnPathToggle() {
 saturnPath.visible = !saturnPath.visible
}

function uranusPathToggle() {
  uranusPath.visible = !uranusPath.visible
}

function neptunePathToggle() {
  neptunePath.visible = !neptunePath.visible
}

 
allPathInvisible();

let pathFxs = {
  showAll: allPathVisible,
  hideAll: allPathInvisible,
  mercuryPath: mercuryPathToggle,
  venusPath: venusPathToggle,
  earthPath: earthPathToggle,
  marsPath: marsPathToggle,
  jupiterPath: jupiterPathToggle,
  saturnPath: saturnPathToggle,
  uranusPath: uranusPathToggle,
  neptunePath: neptunePathToggle,
}



// user controls
const userGUI = new dat.GUI({ autoPlace: false, width: 300 });

const planetFolder = userGUI.addFolder("Planets");
planetFolder.add(pathFxs, "mercuryPath").name("Mercury");
planetFolder.add(pathFxs, "venusPath").name("Venus");
planetFolder.add(pathFxs, "earthPath").name("Earth");
planetFolder.add(pathFxs, "marsPath").name("Mars");
planetFolder.add(pathFxs, "jupiterPath").name("Jupiter");
planetFolder.add(pathFxs, "saturnPath").name("Saturn");
planetFolder.add(pathFxs, "uranusPath").name("Uranus");
planetFolder.add(pathFxs, "neptunePath").name("Neptune");

const orbitFolder = userGUI.addFolder("Toggle Orbits")
orbitFolder.add(pathFxs, "showAll").name("Show all");
orbitFolder.add(pathFxs, "hideAll").name("Hide all");

const userGUIFolder = userGUI.addFolder('Toggle Scale Controls');
userGUIFolder.add(userValues, "scale", 1, 20).name("Planet Size Scale");
userGUIFolder.add(userValues, "timeScale", 1, 20).name("Time Scale");

let userGUIContainer = document.getElementById("scale-gui");
userGUIContainer.appendChild(userGUI.domElement)


// sun light
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 2)
scene.add(pointLight)


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
  antialias: true,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setPixelRatio(window.devicePixelRatio);

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
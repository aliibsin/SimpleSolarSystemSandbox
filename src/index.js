import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sun from './planets/sun';
import {
  mercury, venus, earth, mars,
  jupiter, saturn, uranus, neptune,
  saturnRing
} from './planets/planets';

console.log('webpack is working')

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const bgTexture = new THREE.TextureLoader();
bgTexture.load("src/assets/stars_milky_way.jpg", function(bgTexture) {
  scene.background = bgTexture;
});


scene.add(Sun);

let scale = 20;

// let rMercury = 700;
let rMercury = 716;
mercury.position.set(rMercury, 0, 0);
mercury.scale.set(scale*2, scale*2, scale*2)
mercury.rotation.set(0, 0, -Math.PI * 2 / 180);
let thetaMercury = 0;
let dThetaMercury = 2 * Math.PI / 88 ;

const mercuryPathGeometry = new THREE.TorusGeometry(rMercury, 3, 200, 200);
const mercuryPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const mercuryPath = new THREE.Mesh(mercuryPathGeometry, mercuryPathMaterial);
mercuryPath.rotation.set(1.5708, 0, 0);
scene.add(mercuryPath);
scene.add(mercury);


// let rVenus = 900;
let rVenus = 1101;
venus.position.set(rVenus, 0, 0);
venus.scale.set(scale, scale, scale);
venus.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaVenus = 0;
let dThetaVenus = 2 * Math.PI / 225 ;
const venusPathGeometry = new THREE.TorusGeometry(rVenus, 3, 100, 100);
const venusPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const venusPath = new THREE.Mesh(venusPathGeometry, venusPathMaterial);
venusPath.rotation.set(1.5708, 0, 0);
scene.add(venusPath);
scene.add(venus);


// let rEarth = 1200;
let rEarth = 1366;
earth.position.set(rEarth, 0, 0);
earth.scale.set(scale, scale, scale);
earth.rotation.set(0, 0, -Math.PI * 23.5 / 180);
let thetaEarth = 0;
let dThetaEarth = 2 * Math.PI / 365 ;
const earthPathGeometry = new THREE.TorusGeometry(rEarth, 3, 100, 100);
const earthPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const earthPath = new THREE.Mesh(earthPathGeometry, earthPathMaterial);
earthPath.rotation.set(1.5708, 0, 0);
scene.add(earthPath);
scene.add(earth);


// let rMars = 1500;
let rMars = 1962.2;
mars.position.set(rMars, 0, 0);
mars.scale.set(scale, scale, scale);
mars.rotation.set(0, 0, -Math.PI * 25.2 / 180);
let thetaMars = 0;
let dThetaMars = 2 * Math.PI / 687 ;

const marsPathGeometry = new THREE.TorusGeometry(rMars, 3, 100, 100);
const marsPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const marsPath = new THREE.Mesh(marsPathGeometry, marsPathMaterial);
marsPath.rotation.set(1.5708, 0, 0);
scene.add(marsPath);
scene.add(mars);


// let rJupiter = 2000;
let rJupiter = 5268;
jupiter.position.set(rJupiter, 0, 0);
jupiter.scale.set(scale, scale, scale);
jupiter.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaJupiter = 0;
let dThetaJupiter = 2 * Math.PI / 4380 ;

const jupiterPathGeometry = new THREE.TorusGeometry(rJupiter, 3, 100, 100);
const jupiterPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const jupiterPath = new THREE.Mesh(jupiterPathGeometry, jupiterPathMaterial);
jupiterPath.rotation.set(1.5708, 0, 0);
scene.add(jupiterPath);
scene.add(jupiter);




// let rSaturn = 2600;
let rSaturn = 9338;
saturn.position.set(rSaturn, 0, 0);
saturnRing.position.set(rSaturn, 0, 0);
saturn.scale.set(scale, scale, scale);
saturnRing.scale.set(scale, scale, scale);
saturn.rotation.set(0, 0, -Math.PI * 27 / 180);
saturnRing.rotation.set( 1.5708, -Math.PI * 27 / 180, 0);
let thetaSaturn = 0;
let thetaSaturnRing = 0;
let dThetaSaturn = 2 * Math.PI / 10585 ;
let dThetaSaturnRing = 2 * Math.PI / 10585 ;
const saturnPathGeometry = new THREE.TorusGeometry(rSaturn, 3, 100, 100);
const saturnPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const saturnPath = new THREE.Mesh(saturnPathGeometry, saturnPathMaterial);
saturnPath.rotation.set(1.5708, 0, 0);
scene.add(saturnRing);
scene.add(saturnPath);
scene.add(saturn);



// let rUranus = 3100;
let rUranus = 18270;
uranus.position.set(rUranus, 0, 0);
uranus.scale.set(scale, scale, scale);
uranus.rotation.set(0, 0, -Math.PI * 98 / 180);
let thetaUranus = 0;
let dThetaUranus = 2 * Math.PI / 30660 ;

const uranusPathGeometry = new THREE.TorusGeometry(rUranus, 3, 100, 100);
const uranusPathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const uranusPath = new THREE.Mesh(uranusPathGeometry, uranusPathMaterial);
uranusPath.rotation.set(1.5708, 0, 0);
scene.add(uranusPath);
scene.add(uranus);


// let rNeptune = 3600;
let rNeptune = 29840;
neptune.position.set(rNeptune, 0, 0);
neptune.scale.set(scale, scale, scale);
neptune.rotation.set(0, 0, -Math.PI * 28.5 / 180);
let thetaNeptune = 0;
let dThetaNeptune = 2 * Math.PI / 60225 ;
const neptunePathGeometry = new THREE.TorusGeometry(rNeptune, 3, 100, 100);
const neptunePathMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const neptunePath = new THREE.Mesh(neptunePathGeometry, neptunePathMaterial);
neptunePath.rotation.set(1.5708, 0, 0);
scene.add(neptunePath);
scene.add(neptune);


const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.set(2, 3, 4);
scene.add(pointLight)


const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500000)
camera.position.set(0, 2000, 4000);
camera.rotateX(-0.75);
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
  Sun.rotateY(0.0006);
  mercury.rotateY(.0003);
  venus.rotateY(.00015);
  earth.rotateY(.017);
  mars.rotateY(.017);
  jupiter.rotateY(.042);
  saturn.rotateY(.04);
  saturnRing.rotateZ(.04);
  uranus.rotateY(.025);
  neptune.rotateY(.026);

  // Body orbits
  thetaMercury -= dThetaMercury;
  mercury.position.x = rMercury * Math.cos(thetaMercury);
  mercury.position.z = rMercury * Math.sin(thetaMercury);

  thetaVenus -= dThetaVenus;
  venus.position.x = rVenus * Math.cos(thetaVenus);
  venus.position.z = rVenus * Math.sin(thetaVenus);

  thetaEarth -= dThetaEarth;
  earth.position.x = rEarth * Math.cos(thetaEarth);
  earth.position.z = rEarth * Math.sin(thetaEarth);

  thetaMars -= dThetaMars;
  mars.position.x = rMars * Math.cos(thetaMars);
  mars.position.z = rMars * Math.sin(thetaMars);

  thetaJupiter -= dThetaJupiter;
  jupiter.position.x = rJupiter * Math.cos(thetaJupiter);
  jupiter.position.z = rJupiter * Math.sin(thetaJupiter);

  thetaSaturn -= dThetaSaturn;
  saturn.position.x = rSaturn * Math.cos(thetaSaturn);
  saturn.position.z = rSaturn * Math.sin(thetaSaturn);

  thetaSaturnRing -= dThetaSaturnRing;
  saturnRing.position.x = rSaturn * Math.cos(thetaSaturnRing);
  saturnRing.position.z = rSaturn * Math.sin(thetaSaturnRing);

  thetaUranus -= dThetaUranus;
  uranus.position.x = rUranus * Math.cos(thetaUranus);
  uranus.position.z = rUranus * Math.sin(thetaUranus);

  thetaNeptune -= dThetaNeptune;
  neptune.position.x = rNeptune * Math.cos(thetaNeptune);
  neptune.position.z = rNeptune * Math.sin(thetaNeptune);


  // Render
  renderer.render(scene, camera)

  // Call animate again on the next frame
  window.requestAnimationFrame(animate)
}

animate()
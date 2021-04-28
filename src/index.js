import * as THREE from 'three';
import Sun from './planets/sun';
import {
  mercury, venus, earth, mars,
  jupiter, saturn, uranus, neptune
} from './planets/planets';

console.log('webpack is working')

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const bgTexture = new THREE.TextureLoader();
bgTexture.load("src/assets/stars_milky_way.jpg", function(bgTexture) {
  scene.background = bgTexture;
});


scene.add(Sun);

let scale = 3;

let rMercury = 700;
mercury.position.set(rMercury, 0, 0);
mercury.scale.set(scale, scale, scale)
mercury.rotation.set(0, 0, -Math.PI * 2 / 180);
let thetaMercury = 0;
let dThetaMercury = 2 * Math.PI / 88 ;
scene.add(mercury);


let rVenus = 900;
venus.position.set(rVenus, 0, 0);
venus.scale.set(scale, scale, scale);
venus.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaVenus = 0;
let dThetaVenus = 2 * Math.PI / 225 ;
scene.add(venus);


let rEarth = 1200;
earth.position.set(rEarth, 0, 0);
earth.scale.set(scale, scale, scale);
earth.rotation.set(0, 0, -Math.PI * 23.5 / 180);
let thetaEarth = 0;
let dThetaEarth = 2 * Math.PI / 365 ;
scene.add(earth);


let rMars = 1500;
mars.position.set(rMars, 0, 0);
mars.scale.set(scale, scale, scale);
mars.rotation.set(0, 0, -Math.PI * 25.2 / 180);
let thetaMars = 0;
let dThetaMars = 2 * Math.PI / 687 ;
scene.add(mars);


let rJupiter = 2000;
jupiter.position.set(rJupiter, 0, 0);
jupiter.scale.set(scale, scale, scale);
jupiter.rotation.set(0, 0, -Math.PI * 3 / 180);
let thetaJupiter = 0;
let dThetaJupiter = 2 * Math.PI / 4380 ;
scene.add(jupiter);


let rSaturn = 2600;
saturn.position.set(rSaturn, 0, 0);
saturn.scale.set(scale, scale, scale);
saturn.rotation.set(0, 0, -Math.PI * 27 / 180);
let thetaSaturn = 0;
let dThetaSaturn = 2 * Math.PI / 10585 ;
scene.add(saturn);


let rUranus = 3100;
uranus.position.set(rUranus, 0, 0);
uranus.scale.set(scale, scale, scale);
uranus.rotation.set(0, 0, -Math.PI * 98 / 180);
let thetaUranus = 0;
let dThetaUranus = 2 * Math.PI / 30660 ;
scene.add(uranus);


let rNeptune = 3600;
neptune.position.set(rNeptune, 0, 0);
neptune.scale.set(scale, scale, scale);
neptune.rotation.set(0, 0, -Math.PI * 28.5 / 180);
let thetaNeptune = 0;
let dThetaNeptune = 2 * Math.PI / 60225 ;
scene.add(neptune);


const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.set(2, 3, 4);
scene.add(pointLight)


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.set(0, 1500, 3000);
camera.rotateX(-.5);
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
})


const clock = new THREE.Clock()

const animate = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // Update objects

  // Body rotations
  Sun.rotateY(0.0006);
  mercury.rotateY(.0003);
  venus.rotateY(.00015);
  earth.rotateY(.017);
  mars.rotateY(.017);
  jupiter.rotateY(.042);
  saturn.rotateY(.04);
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
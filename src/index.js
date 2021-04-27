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

mercury.position.set(700, 0, 0);
mercury.scale.set(scale, scale, scale)
mercury.rotation.set(0, 0, -Math.PI * 2 / 180);
scene.add(mercury);


venus.position.set(900, 0, 0);
venus.scale.set(scale, scale, scale);
venus.rotation.set(0, 0, -Math.PI * 3 / 180);
scene.add(venus);


earth.position.set(1200, 0, 0);
earth.scale.set(scale, scale, scale);
earth.rotation.set(0, 0, -Math.PI * 23.5 / 180);
scene.add(earth);


mars.position.set(1500, 0, 0);
mars.scale.set(scale, scale, scale);
mars.rotation.set(0, 0, -Math.PI * 25.2 / 180);
scene.add(mars);


jupiter.position.set(2000, 0, 0);
jupiter.scale.set(scale, scale, scale);
jupiter.rotation.set(0, 0, -Math.PI * 3 / 180);
scene.add(jupiter);


saturn.position.set(2600, 0, 0);
saturn.scale.set(scale, scale, scale);
saturn.rotation.set(0, 0, -Math.PI * 27 / 180);
scene.add(saturn);


uranus.position.set(3100, 0, 0);
uranus.scale.set(scale, scale, scale);
uranus.rotation.set(0, 0, -Math.PI * 98 / 180);
scene.add(uranus);


neptune.position.set(3600, 0, 0);
neptune.scale.set(scale, scale, scale);
neptune.rotation.set(0, 0, -Math.PI * 28.5 / 180);
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

  Sun.rotateY(0.0006);
  mercury.rotateY(.0003);
  venus.rotateY(.00015);
  earth.rotateY(.017);
  mars.rotateY(.017);
  jupiter.rotateY(.042);
  saturn.rotateY(.04);
  uranus.rotateY(.025);
  neptune.rotateY(.026);
  // Sun.rotation.y = 0.034 * elapsedTime;
  // mercury.rotation.y = 0.017 * elapsedTime;
  // venus.rotation.y = 0.009 * elapsedTime;
  // earth.rotation.y = 1 * elapsedTime;
  // mars.rotation.y = 1 * elapsedTime;
  // jupiter.rotation.y = 2.38 * elapsedTime;
  // saturn.rotation.y = 2.27 * elapsedTime;

  
  // uranus.rotation.y = 1.41 * elapsedTime;
  // neptune.rotation.y = 1.49 * elapsedTime;


  // Update Orbital Controls
  // controls.update()

  // Render
  
  renderer.render(scene, camera)

  // Call animate again on the next frame
  window.requestAnimationFrame(animate)
}

animate()
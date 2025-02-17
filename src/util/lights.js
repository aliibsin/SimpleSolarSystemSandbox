import * as THREE from 'three';

const AMBIENT_LIGHT_COLOR = 0xffffff;
const AMBIENT_LIGHT_INTENSITY = 0.02;
const SUN_LIGHT_COLOR = 0xffffff;
const SUN_LIGHT_INTENSITY = 0.9;
const SUN_LIGHT_DISTANCE = 0; // infinite distance
const SUN_LIGHT_DECAY = 0.03;

export const addAmbientLight = (scene) => {
  const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
  scene.add(ambientLight);
}

export const addSunLight = (scene) => {
  const pointLight = new THREE.PointLight(SUN_LIGHT_COLOR, SUN_LIGHT_INTENSITY, SUN_LIGHT_DISTANCE, SUN_LIGHT_DECAY);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;
  scene.add(pointLight);
}

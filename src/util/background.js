import * as THREE from 'three';
import Sphere from './sphere';

const addBackground = (scene, boundRadius) => {
  const background = new Sphere('background', 'assets/stars_milky_way.jpg', boundRadius, { side: THREE.BackSide });
  scene.add(background.body);
};

export default addBackground;

import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const uranusTexture = new THREE.TextureLoader().load("src/assets/uranus.jpg");
const material = new THREE.MeshBasicMaterial({map: uranusTexture});

const uranus = new THREE.Mesh(sphereGeometry, material);

export default uranus;
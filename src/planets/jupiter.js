import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const jupiterTexture = new THREE.TextureLoader().load("src/assets/jupiter.jpg");
const material = new THREE.MeshBasicMaterial({map: jupiterTexture});

const jupiter = new THREE.Mesh(sphereGeometry, material);

export default jupiter;
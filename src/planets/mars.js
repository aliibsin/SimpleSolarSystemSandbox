import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const marsTexture = new THREE.TextureLoader().load("src/assets/mars.jpg");
const material = new THREE.MeshBasicMaterial({map: marsTexture});

const mars = new THREE.Mesh(sphereGeometry, material);

export default mars;
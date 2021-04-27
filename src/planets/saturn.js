import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const saturnTexture = new THREE.TextureLoader().load("src/assets/saturn.jpg");
const material = new THREE.MeshBasicMaterial({map: saturnTexture});

const saturn = new THREE.Mesh(sphereGeometry, material);

export default saturn;
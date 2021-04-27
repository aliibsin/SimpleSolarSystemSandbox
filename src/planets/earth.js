import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const earthTexture = new THREE.TextureLoader().load("src/assets/earth.jpg");
const material = new THREE.MeshBasicMaterial({map: earthTexture});

const earth = new THREE.Mesh(sphereGeometry, material);

export default earth;
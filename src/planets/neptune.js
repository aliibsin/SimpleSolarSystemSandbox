import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const neptuneTexture = new THREE.TextureLoader().load("src/assets/neptune.jpg");
const material = new THREE.MeshBasicMaterial({map: neptuneTexture});

const neptune = new THREE.Mesh(sphereGeometry, material);

export default neptune;
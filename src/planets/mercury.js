import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const mercuryTexture = new THREE.TextureLoader().load("src/assets/mercury.jpg");
const material = new THREE.MeshBasicMaterial({map: mercuryTexture});

const mercury = new THREE.Mesh(sphereGeometry, material);

export default mercury;
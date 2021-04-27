import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const sunTexture = new THREE.TextureLoader().load("src/assets/sun.jpg");
const material = new THREE.MeshBasicMaterial({map: sunTexture});

const sun = new THREE.Mesh(sphereGeometry, material);

export default sun;
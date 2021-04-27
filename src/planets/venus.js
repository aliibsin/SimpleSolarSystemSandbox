import * as THREE from 'three';

const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const venusTexture = new THREE.TextureLoader().load("src/assets/venus.jpg");
const material = new THREE.MeshBasicMaterial({map: venusTexture});

const venus = new THREE.Mesh(sphereGeometry, material);

export default venus;
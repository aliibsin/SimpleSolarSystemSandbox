import * as THREE from 'three';

//mercury
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const mercuryTexture = new THREE.TextureLoader().load("src/assets/mercury.jpg");
const material = new THREE.MeshBasicMaterial({map: mercuryTexture});

export const mercury = new THREE.Mesh(sphereGeometry, material);


//venus
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const venusTexture = new THREE.TextureLoader().load("src/assets/venus.jpg");
const material = new THREE.MeshBasicMaterial({map: venusTexture});

export const venus = new THREE.Mesh(sphereGeometry, material);


//earth
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const earthTexture = new THREE.TextureLoader().load("src/assets/earth.jpg");
const material = new THREE.MeshBasicMaterial({map: earthTexture});

export const earth = new THREE.Mesh(sphereGeometry, material);


//mars
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const marsTexture = new THREE.TextureLoader().load("src/assets/mars.jpg");
const material = new THREE.MeshBasicMaterial({map: marsTexture});

export const mars = new THREE.Mesh(sphereGeometry, material);


//jupiter
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const jupiterTexture = new THREE.TextureLoader().load("src/assets/jupiter.jpg");
const material = new THREE.MeshBasicMaterial({map: jupiterTexture});

export const jupiter = new THREE.Mesh(sphereGeometry, material);


//saturn
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const saturnTexture = new THREE.TextureLoader().load("src/assets/saturn.jpg");
const material = new THREE.MeshBasicMaterial({map: saturnTexture});

export const saturn = new THREE.Mesh(sphereGeometry, material);


//uranus
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const uranusTexture = new THREE.TextureLoader().load("src/assets/uranus.jpg");
const material = new THREE.MeshBasicMaterial({map: uranusTexture});

export const uranus = new THREE.Mesh(sphereGeometry, material);


//neptune
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 100, 100);
const neptuneTexture = new THREE.TextureLoader().load("src/assets/neptune.jpg");
const material = new THREE.MeshBasicMaterial({map: neptuneTexture});

export const neptune = new THREE.Mesh(sphereGeometry, material);
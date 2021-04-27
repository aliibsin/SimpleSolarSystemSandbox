import * as THREE from 'three';

//mercury
const mercuryGeometry = new THREE.SphereBufferGeometry(1.5, 100, 100);
const mercuryTexture = new THREE.TextureLoader().load("src/assets/mercury.jpg");
const mercuryMaterial = new THREE.MeshBasicMaterial({map: mercuryTexture});

export const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);


//venus
const venusGeometry = new THREE.SphereBufferGeometry(3.8, 100, 100);
const venusTexture = new THREE.TextureLoader().load("src/assets/venus.jpg");
const venusMaterial = new THREE.MeshBasicMaterial({map: venusTexture});

export const venus = new THREE.Mesh(venusGeometry, venusMaterial);


//earth
const earthGeometry = new THREE.SphereBufferGeometry(6.4, 100, 100);
const earthTexture = new THREE.TextureLoader().load("src/assets/earth.jpg");
const earthMaterial = new THREE.MeshBasicMaterial({map: earthTexture});

export const earth = new THREE.Mesh(earthGeometry, earthMaterial);


//mars
const marsGeometry = new THREE.SphereBufferGeometry(2.1, 100, 100);
const marsTexture = new THREE.TextureLoader().load("src/assets/mars.jpg");
const marsMaterial = new THREE.MeshBasicMaterial({map: marsTexture});

export const mars = new THREE.Mesh(marsGeometry, marsMaterial);


//jupiter
const jupiterGeometry = new THREE.SphereBufferGeometry(43.4, 100, 100);
const jupiterTexture = new THREE.TextureLoader().load("src/assets/jupiter.jpg");
const jupiterMaterial = new THREE.MeshBasicMaterial({map: jupiterTexture});

export const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);


//saturn
const saturnGeometry = new THREE.SphereBufferGeometry(36.2, 100, 100);
const saturnTexture = new THREE.TextureLoader().load("src/assets/saturn.jpg");
const saturnMaterial = new THREE.MeshBasicMaterial({map: saturnTexture});

export const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);


//uranus
const uranusGeometry = new THREE.SphereBufferGeometry(15.8, 100, 100);
const uranusTexture = new THREE.TextureLoader().load("src/assets/uranus.jpg");
const uranusMaterial = new THREE.MeshBasicMaterial({map: uranusTexture});

export const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);


//neptune
const neptuneGeometry = new THREE.SphereBufferGeometry(15.3, 100, 100);
const neptuneTexture = new THREE.TextureLoader().load("src/assets/neptune.jpg");
const neptuneMaterial = new THREE.MeshBasicMaterial({map: neptuneTexture});

export const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
import * as THREE from 'three';

//planet textures from https://www.solarsystemscope.com/textures/

//mercury
const mercuryGeometry = new THREE.SphereGeometry(1.5, 128, 128);
const mercuryTexture = new THREE.TextureLoader().load("/assets/mercury.jpg");
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture});

export const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);


//venus
const venusGeometry = new THREE.SphereGeometry(3.8, 128, 128);
const venusTexture = new THREE.TextureLoader().load("/assets/venus.jpg");
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture});

export const venus = new THREE.Mesh(venusGeometry, venusMaterial);


//earth
const earthGeometry = new THREE.SphereGeometry(6.4, 128, 128);
const earthTexture = new THREE.TextureLoader().load("/assets/earth.jpg");
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});

export const earth = new THREE.Mesh(earthGeometry, earthMaterial);


//mars
const marsGeometry = new THREE.SphereGeometry(2.1, 128, 128);
const marsTexture = new THREE.TextureLoader().load("/assets/mars.jpg");
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});

export const mars = new THREE.Mesh(marsGeometry, marsMaterial);


//jupiter
const jupiterGeometry = new THREE.SphereGeometry(43.4, 128, 128);
const jupiterTexture = new THREE.TextureLoader().load("/assets/jupiter.jpg");
const jupiterMaterial = new THREE.MeshStandardMaterial({map: jupiterTexture});

export const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);


//saturn
const saturnGeometry = new THREE.SphereGeometry(36.2, 128, 128);
const saturnTexture = new THREE.TextureLoader().load("/assets/saturn.jpg");
const saturnMaterial = new THREE.MeshStandardMaterial({map: saturnTexture});

export const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

const ringTexture = new THREE.TextureLoader().load("/assets/saturn_rings.png");
const ringGeometry = new THREE.RingGeometry(41.6, 111.8, 128);
var pos = ringGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
  v3.fromBufferAttribute(pos, i);
  ringGeometry.attributes.uv.setXY(i, v3.length() < 76.8 ? 0 : 1, 1);
}

const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true,
});
export const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);

//uranus
const uranusGeometry = new THREE.SphereGeometry(15.8, 128, 128);
const uranusTexture = new THREE.TextureLoader().load("/assets/uranus.jpg");
const uranusMaterial = new THREE.MeshStandardMaterial({map: uranusTexture});

export const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

//neptune
const neptuneGeometry = new THREE.SphereGeometry(15.3, 128, 128);
const neptuneTexture = new THREE.TextureLoader().load("/assets/neptune.jpg");
const neptuneMaterial = new THREE.MeshStandardMaterial({map: neptuneTexture});

export const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);



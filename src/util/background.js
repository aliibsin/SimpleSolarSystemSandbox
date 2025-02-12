import * as THREE from 'three';

const SPHERE_RADIUS = 15000;
const SPHERE_WIDTH_DIVISIONS = 32;
const SPHERE_HEIGHT_DIVISIONS = 32;

const backgroundMesh = () => {
  const bgGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, SPHERE_WIDTH_DIVISIONS, SPHERE_HEIGHT_DIVISIONS);
  const bgTexture = new THREE.TextureLoader().load('assets/stars_milky_way.jpg');
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.BackSide });
  return new THREE.Mesh(bgGeometry, bgMaterial);
};

export default backgroundMesh;

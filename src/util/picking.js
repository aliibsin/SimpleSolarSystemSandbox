import * as THREE from 'three';

const MAX_CLICK_MOVEMENT_PX = 5;

const setupPicking = (domElement, camera, objects, onPick) => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const owners = new Map();
  let downAt = null;

  objects.forEach((object) => {
    owners.set(object.body, object);
    if (object.ring) owners.set(object.ring.body, object);
  });

  const meshes = [...owners.keys()];

  domElement.addEventListener('pointerdown', (e) => {
    downAt = { x: e.clientX, y: e.clientY };
  });

  domElement.addEventListener('pointerup', (e) => {
    if (!downAt) return;
    const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
    downAt = null;
    if (moved > MAX_CLICK_MOVEMENT_PX) return;

    const rect = domElement.getBoundingClientRect();
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);

    const [hit] = raycaster.intersectObjects(meshes, false);
    if (hit) onPick(owners.get(hit.object));
  });
};

export default setupPicking;

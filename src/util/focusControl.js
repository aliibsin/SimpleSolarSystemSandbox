import * as THREE from 'three';

const TRANSITION_SECONDS = 1.2;
const VIEW_DISTANCE_IN_RADII = 6;
const MIN_DISTANCE_IN_RADII = 1.5;
const ORIGIN = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);
const VIEW_SIDE_OFFSET = 0.6;
const VIEW_UP_OFFSET = 0.25;

const easeInOut = (t) => t * t * (3 - 2 * t);

class FocusControl {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this.focused = null;
    this.transition = null;
    this.position = new THREE.Vector3();
    this.cameraGoal = new THREE.Vector3();
  }

  focus (object) {
    this.focused = object;
    object.body.getWorldPosition(this.position);

    const offset = object.focusOffset
      ? object.focusOffset(this.camera)
      : this.#viewDirection().multiplyScalar(this.#radius(object) * VIEW_DISTANCE_IN_RADII);
    this.#startTransition(offset);
  }

  release () {
    this.focused = null;
    this.controls.minDistance = 0;
    this.#startTransition(null);
  }

  update (delta) {
    if (this.focused) {
      this.focused.body.getWorldPosition(this.position);
      this.controls.minDistance = this.focused.focusOffset ? 0 : this.#radius(this.focused) * MIN_DISTANCE_IN_RADII;
    }

    if (this.transition) {
      this.#stepTransition(delta);
    } else if (this.focused) {
      this.camera.position.add(this.cameraGoal.subVectors(this.position, this.controls.target));
      this.controls.target.copy(this.position);
    }
  }

  #startTransition (offset) {
    this.transition = {
      elapsed: 0,
      offset,
      startCamera: this.camera.position.clone(),
      startTarget: this.controls.target.clone()
    };
    this.controls.enabled = false;
  }

  #stepTransition (delta) {
    const transition = this.transition;
    transition.elapsed += delta;
    const progress = easeInOut(Math.min(transition.elapsed / TRANSITION_SECONDS, 1));

    const targetGoal = this.focused ? this.position : ORIGIN;
    const cameraGoal = this.focused
      ? this.cameraGoal.copy(this.position).add(transition.offset)
      : transition.startCamera;

    this.controls.target.lerpVectors(transition.startTarget, targetGoal, progress);
    this.camera.position.lerpVectors(transition.startCamera, cameraGoal, progress);

    if (progress === 1) {
      this.transition = null;
      this.controls.enabled = true;
    }
  }

  #viewDirection () {
    const toSun = ORIGIN.clone().sub(this.position);

    if (toSun.lengthSq() === 0) {
      return this.camera.position.clone().sub(this.position).normalize();
    }

    toSun.normalize();
    const side = toSun.clone().cross(UP).normalize();

    return toSun
      .addScaledVector(side, VIEW_SIDE_OFFSET)
      .addScaledVector(UP, VIEW_UP_OFFSET)
      .normalize();
  }

  #radius (object) {
    return object.radius * object.body.scale.x;
  }
}

export default FocusControl;

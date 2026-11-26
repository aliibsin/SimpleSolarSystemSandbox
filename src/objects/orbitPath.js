import * as THREE from 'three';

class OrbitPath {
  constructor(scene, semiMajorAxis, semiMinorAxis, orbitInclination, solarSystemScale) {
    this.semiMajorAxis = semiMajorAxis / solarSystemScale;
    this.semiMinorAxis = semiMinorAxis / solarSystemScale;
    this.focalDistance = Math.sqrt(this.semiMajorAxis ** 2 - this.semiMinorAxis ** 2);
    this.orbitInclination = orbitInclination;
    this.orbitSegments = 128;

    this.orientation = this.#orientation();
    this.geometry = this.#geometry();
    this.material = this.#material();
    this.body = this.#body();

    scene.add(this.body);
  }

  positionAt (angle, target = new THREE.Vector3()) {
    return target
      .set(
        this.semiMajorAxis * Math.cos(angle) - this.focalDistance,
        this.semiMinorAxis * Math.sin(angle),
        0
      )
      .applyMatrix4(this.orientation);
  }

  get alignedStartAngle () {
    return -Math.acos(this.focalDistance / this.semiMajorAxis);
  }

  #orientation () {
    const flatten = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
    const incline = new THREE.Matrix4().makeRotationZ(-this.orbitInclination * Math.PI / 180);
    return incline.multiply(flatten);
  }

  #geometry () {
    const points = [];

    for (let i = 0; i <= this.orbitSegments; i++) {
      points.push(this.positionAt((i / this.orbitSegments) * 2 * Math.PI));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }

  #material () {
    return new THREE.LineBasicMaterial({ transparent: true, opacity: 0.1, color: 0xffffff });
  }

  #body () {
    const body = new THREE.Line(this.geometry, this.material);
    body.visible = false;
    return body;
  }
}

export default OrbitPath;

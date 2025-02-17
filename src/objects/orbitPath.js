import * as THREE from 'three';

class OrbitPath {
  constructor(scene, semiMajorAxis, semiMinorAxis, orbitInclination, solarSystemScale) {
    this.semiMajorAxis = semiMajorAxis;
    this.semiMinorAxis = semiMinorAxis;
    this.orbitInclination = orbitInclination;
    this.solarSystemScale = solarSystemScale;
    this.orbitSegments = 128;

    this.curve = this.#curve();
    this.geometry = this.#geometry();
    this.#setInitialOrientation()
    this.material = this.#material();
    this.body = this.#body();

    scene.add(this.body);
  }

  #curve () {
    return new THREE.EllipseCurve(
      0, 0,
      this.semiMajorAxis / this.solarSystemScale, this.semiMinorAxis / this.solarSystemScale,
      0, 2 * Math.PI,
      false, 0
    );
  }

  #geometry () {
    const points = this.curve.getPoints(this.orbitSegments);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }

  #setInitialOrientation () {
    this.geometry.rotateX(Math.PI / 2);
    this.geometry.rotateZ(-this.orbitInclination * Math.PI / 180);
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

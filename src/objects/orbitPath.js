import * as THREE from 'three';

const ORBIT_SEGMENTS = 256;

class OrbitPath {
  constructor(scene, keplerOrbit, solarSystemScale) {
    this.keplerOrbit = keplerOrbit;
    this.body = new THREE.Line(this.#geometry(solarSystemScale), this.#material());
    this.body.visible = false;
    this.body.matrixAutoUpdate = false;

    scene.add(this.body);
  }

  update (hours, center = null, size = 1) {
    this.keplerOrbit.orientation(hours, this.body.matrix);

    if (center) {
      this.body.matrix.premultiply(new THREE.Matrix4().makeScale(size, size, size).setPosition(center));
    }

    this.body.matrixWorldNeedsUpdate = true;
  }

  #geometry (solarSystemScale) {
    const points = [];

    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const point = this.keplerOrbit.pointAtEccentricAnomaly((i / ORBIT_SEGMENTS) * 2 * Math.PI);
      points.push(point.divideScalar(solarSystemScale));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }

  #material () {
    return new THREE.LineBasicMaterial({ transparent: true, opacity: 0.1, color: 0xffffff });
  }
}

export default OrbitPath;

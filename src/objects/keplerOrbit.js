import * as THREE from 'three';

const DEG = Math.PI / 180;
const HOURS_PER_CENTURY = 36_525 * 24;
const ECLIPTIC_TO_SCENE = new THREE.Matrix4().set(
  1, 0, 0, 0,
  0, 0, 1, 0,
  0, -1, 0, 0,
  0, 0, 0, 1
);

const solveKepler = (meanAnomaly, eccentricity) => {
  let eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly);

  for (let i = 0; i < 6; i++) {
    eccentricAnomaly -= (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly)
      / (1 - eccentricity * Math.cos(eccentricAnomaly));
  }

  return eccentricAnomaly;
};

// Elements are in degrees and km; rates are per hour. Times are hours since J2000.
class KeplerOrbit {
  static fromJplElements ({ a, e, i, L, longPeri, longNode, LRate }, kmPerAu) {
    return new KeplerOrbit({
      semiMajorAxis: a * kmPerAu,
      eccentricity: e,
      inclination: i,
      node: longNode,
      argPeri: longPeri - longNode,
      meanAnomaly: L - longPeri,
      meanMotion: LRate / HOURS_PER_CENTURY
    });
  }

  constructor({ semiMajorAxis, eccentricity, inclination, node, argPeri, meanAnomaly, meanMotion, nodeRate = 0, argPeriRate = 0 }) {
    Object.assign(this, { semiMajorAxis, eccentricity, inclination, node, argPeri, meanAnomaly, meanMotion, nodeRate, argPeriRate });
    this.semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity ** 2);
  }

  orientation (hours, target = new THREE.Matrix4()) {
    const node = new THREE.Matrix4().makeRotationZ((this.node + this.nodeRate * hours) * DEG);
    const incline = new THREE.Matrix4().makeRotationX(this.inclination * DEG);
    const argPeri = new THREE.Matrix4().makeRotationZ((this.argPeri + this.argPeriRate * hours) * DEG);

    return target.copy(ECLIPTIC_TO_SCENE).multiply(node).multiply(incline).multiply(argPeri);
  }

  pointAtEccentricAnomaly (eccentricAnomaly, target = new THREE.Vector3()) {
    return target.set(
      this.semiMajorAxis * (Math.cos(eccentricAnomaly) - this.eccentricity),
      this.semiMinorAxis * Math.sin(eccentricAnomaly),
      0
    );
  }

  position (meanAnomalyDeg, hours, target = new THREE.Vector3()) {
    const eccentricAnomaly = solveKepler(meanAnomalyDeg * DEG, this.eccentricity);
    return this.pointAtEccentricAnomaly(eccentricAnomaly, target).applyMatrix4(this.orientation(hours));
  }

  meanAnomalyAt (hours) {
    return this.meanAnomaly + this.meanMotion * hours;
  }

  // Mean anomaly that puts the body at the given ecliptic longitude.
  meanAnomalyAtLongitude (longitudeDeg, hours = 0) {
    const node = (this.node + this.nodeRate * hours) * DEG;
    const argPeri = (this.argPeri + this.argPeriRate * hours) * DEG;
    const fromNode = longitudeDeg * DEG - node;
    const argumentOfLatitude = Math.atan2(Math.sin(fromNode), Math.cos(fromNode) * Math.cos(this.inclination * DEG));
    const trueAnomaly = argumentOfLatitude - argPeri;
    const e = this.eccentricity;
    const eccentricAnomaly = 2 * Math.atan2(Math.sqrt(1 - e) * Math.sin(trueAnomaly / 2), Math.sqrt(1 + e) * Math.cos(trueAnomaly / 2));

    return (eccentricAnomaly - e * Math.sin(eccentricAnomaly)) / DEG;
  }
}

export default KeplerOrbit;

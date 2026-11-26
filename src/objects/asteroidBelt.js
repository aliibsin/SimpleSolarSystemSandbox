import * as THREE from 'three';

const KM_PER_AU = 149_597_871;
const HOURS_PER_EARTH_YEAR = 8_766;
const COUNT = 8_000;
const SEED = 1801;
const INNER_AU = 2.1;
const OUTER_AU = 3.3;
const KIRKWOOD_GAPS_AU = [2.50, 2.82, 2.95];
const KIRKWOOD_GAP_HALF_WIDTH_AU = 0.02;
const MAX_ECCENTRICITY = 0.25;
const INCLINATION_SPREAD_DEG = 7;
const MIN_RADIUS_KM = 3;
const MAX_RADIUS_KM = 300;
const SIZE_DISTRIBUTION_SLOPE = 1.5;
const SIZE_EXAGGERATION = 20;
const MIN_POINT_SIZE_PX = 2;
const MIN_OPACITY = 0.04;

// Roughly the real mix of dark carbon-rich, stony and metallic asteroids.
const TYPES = [
  { share: 0.75, color: [0.30, 0.29, 0.28] },
  { share: 0.17, color: [0.55, 0.45, 0.35] },
  { share: 0.08, color: [0.50, 0.50, 0.52] }
];

const VERTEX_DECLARATIONS = `
#include <common>
attribute vec4 orbit;
attribute vec3 phase;
attribute float radiusKm;
uniform float elapsedHours;
uniform float unitsPerKm;
varying float vOpacity;
`;

const VERTEX_POSITION = `
float semiMajor = orbit.x;
float eccentricity = orbit.y;
float inclination = orbit.z;
float ascendingNode = orbit.w;
float perihelionArgument = phase.x;
float angle = phase.y + 6.28318530718 * elapsedHours / phase.z;

vec2 inPlane = vec2(
  semiMajor * (cos(angle) - eccentricity),
  semiMajor * sqrt(1.0 - eccentricity * eccentricity) * sin(angle)
);
inPlane = mat2(cos(perihelionArgument), sin(perihelionArgument), -sin(perihelionArgument), cos(perihelionArgument)) * inPlane;
vec3 ecliptic = vec3(inPlane.x, inPlane.y * cos(inclination), inPlane.y * sin(inclination));
ecliptic.xy = mat2(cos(ascendingNode), sin(ascendingNode), -sin(ascendingNode), cos(ascendingNode)) * ecliptic.xy;

vec3 transformed = vec3(ecliptic.x, ecliptic.z, -ecliptic.y);
`;

const VERTEX_SIZE = `
#include <fog_vertex>
float diameterPx = 2.0 * radiusKm * unitsPerKm * projectionMatrix[1][1] * scale * size / -mvPosition.z;
gl_PointSize = max(diameterPx, ${MIN_POINT_SIZE_PX.toFixed(1)} * size);

vec3 toSun = normalize((viewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz - mvPosition.xyz);
vec3 toCamera = normalize(-mvPosition.xyz);
float sunlit = 0.35 + 0.65 * (0.5 + 0.5 * dot(toSun, toCamera));
float coverage = diameterPx / gl_PointSize;

vOpacity = clamp(coverage * coverage, ${MIN_OPACITY}, 1.0) * sunlit;
`;

const FRAGMENT_DECLARATIONS = `
#include <common>
varying float vOpacity;
`;

const FRAGMENT_SHAPE = `
#include <color_fragment>
float fromCenter = length(gl_PointCoord - 0.5) * 2.0;
diffuseColor.a *= vOpacity * (1.0 - smoothstep(0.5, 1.0, fromCenter));
`;

const mulberry32 = (seed) => () => {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const inKirkwoodGap = (au) =>
  KIRKWOOD_GAPS_AU.some((gap) => Math.abs(au - gap) < KIRKWOOD_GAP_HALF_WIDTH_AU);

const pickType = (roll) => {
  let total = 0;
  return TYPES.find((type) => (total += type.share) >= roll) ?? TYPES[0];
};

class AsteroidBelt {
  constructor(scene, globalScale, solarSystemScale, userPlanetScale) {
    this.globalScale = globalScale;
    this.elapsedHours = 0;
    this.uniforms = {
      elapsedHours: { value: 0 },
      unitsPerKm: { value: 0 }
    };

    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      depthWrite: false
    });

    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', VERTEX_DECLARATIONS)
        .replace('#include <begin_vertex>', VERTEX_POSITION)
        .replace('#include <fog_vertex>', VERTEX_SIZE);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', FRAGMENT_DECLARATIONS)
        .replace('#include <color_fragment>', FRAGMENT_SHAPE);
    };

    this.body = new THREE.Points(this.#geometry(solarSystemScale), material);
    this.body.frustumCulled = false;
    scene.add(this.body);

    this.scale(userPlanetScale);
  }

  orbit (timescale, deltaSeconds) {
    this.elapsedHours += deltaSeconds * timescale;
    this.uniforms.elapsedHours.value = this.elapsedHours;
  }

  scale (size) {
    this.uniforms.unitsPerKm.value = (size * SIZE_EXAGGERATION) / this.globalScale;
  }

  toggle () {
    this.body.visible = !this.body.visible;
  }

  #geometry (solarSystemScale) {
    const random = mulberry32(SEED);
    const unitsPerAu = KM_PER_AU / solarSystemScale;
    const orbits = new Float32Array(COUNT * 4);
    const phases = new Float32Array(COUNT * 3);
    const radii = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      let au;
      do {
        au = INNER_AU + (OUTER_AU - INNER_AU) * (random() + random()) / 2;
      } while (inKirkwoodGap(au));

      const gaussian = Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
      const inclination = Math.abs(gaussian) * INCLINATION_SPREAD_DEG * Math.PI / 180;

      orbits.set([au * unitsPerAu, MAX_ECCENTRICITY * random() ** 1.5, inclination, random() * 2 * Math.PI], i * 4);
      phases.set([random() * 2 * Math.PI, random() * 2 * Math.PI, HOURS_PER_EARTH_YEAR * au ** 1.5], i * 3);
      radii[i] = Math.min(MIN_RADIUS_KM * (1 - random()) ** (-1 / SIZE_DISTRIBUTION_SLOPE), MAX_RADIUS_KM);

      const albedo = 0.8 + random() * 0.4;
      colors.set(pickType(random()).color.map((channel) => channel * albedo), i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geometry.setAttribute('orbit', new THREE.BufferAttribute(orbits, 4));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 3));
    geometry.setAttribute('radiusKm', new THREE.BufferAttribute(radii, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }
}

export default AsteroidBelt;

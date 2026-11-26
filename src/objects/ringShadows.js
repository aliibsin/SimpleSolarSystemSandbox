import * as THREE from 'three';

const SHARED_VERTEX = {
  declare: '#include <common>\nvarying vec3 vRingShadowWorldPosition;',
  assign: '#include <project_vertex>\nvRingShadowWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;'
};

const SHARED_UNIFORMS = `
varying vec3 vRingShadowWorldPosition;
uniform vec3 ringShadowSunPosition;
uniform vec3 ringShadowPlanetCenter;
uniform float ringShadowPlanetRadius;
uniform vec3 ringShadowRingNormal;
uniform float ringShadowRingInner;
uniform float ringShadowRingOuter;
uniform float ringShadowRingOpacity;
uniform sampler2D ringShadowRingMap;
`;

const RING_SHADOW_ON_PLANET = `
float ringShadow = 1.0;
vec3 toSun = normalize(ringShadowSunPosition - vRingShadowWorldPosition);
float facing = dot(toSun, ringShadowRingNormal);

if (abs(facing) > 1e-4) {
  float distanceToRing = dot(ringShadowPlanetCenter - vRingShadowWorldPosition, ringShadowRingNormal) / facing;

  if (distanceToRing > 0.0) {
    float r = length(vRingShadowWorldPosition + toSun * distanceToRing - ringShadowPlanetCenter);

    if (r > ringShadowRingInner && r < ringShadowRingOuter) {
      float u = (r - ringShadowRingInner) / (ringShadowRingOuter - ringShadowRingInner);
      ringShadow = 1.0 - texture2D(ringShadowRingMap, vec2(u, 0.5)).a * ringShadowRingOpacity;
    }
  }
}

reflectedLight.directDiffuse *= ringShadow;
reflectedLight.directSpecular *= ringShadow;
`;

const PLANET_SHADOW_ON_RING = `
vec3 toSun = normalize(ringShadowSunPosition - vRingShadowWorldPosition);
vec3 fromCenter = vRingShadowWorldPosition - ringShadowPlanetCenter;
float along = dot(fromCenter, toSun);
float missDistance = sqrt(max(dot(fromCenter, fromCenter) - along * along, 0.0));
float edge = ringShadowPlanetRadius * 0.02;
float planetShadow = along < 0.0
  ? smoothstep(ringShadowPlanetRadius - edge, ringShadowPlanetRadius + edge, missDistance)
  : 1.0;

reflectedLight.directDiffuse *= planetShadow;
reflectedLight.directSpecular *= planetShadow;
`;

const injectShadow = (material, uniforms, cacheKey, fragmentCode) => {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', SHARED_VERTEX.declare)
      .replace('#include <project_vertex>', SHARED_VERTEX.assign);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${SHARED_UNIFORMS}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>\n${fragmentCode}`);
  };
  material.customProgramCacheKey = () => cacheKey;
};

const applyRingShadows = (planet) => {
  const { body, ring, radius } = planet;
  const normal = new THREE.Vector3();

  const uniforms = {
    ringShadowSunPosition: { value: new THREE.Vector3() },
    ringShadowPlanetCenter: { value: new THREE.Vector3() },
    ringShadowPlanetRadius: { value: 0 },
    ringShadowRingNormal: { value: new THREE.Vector3() },
    ringShadowRingInner: { value: 0 },
    ringShadowRingOuter: { value: 0 },
    ringShadowRingOpacity: { value: ring.material.opacity },
    ringShadowRingMap: { value: ring.texture }
  };

  const update = () => {
    const scale = body.scale.x;
    body.getWorldPosition(uniforms.ringShadowPlanetCenter.value);
    uniforms.ringShadowPlanetRadius.value = radius * scale;
    uniforms.ringShadowRingNormal.value.copy(normal.set(0, 0, 1).transformDirection(ring.body.matrixWorld));
    uniforms.ringShadowRingInner.value = ring.innerRadius * ring.body.scale.x;
    uniforms.ringShadowRingOuter.value = ring.outerRadius * ring.body.scale.x;
  };

  body.onBeforeRender = update;
  ring.body.onBeforeRender = update;

  injectShadow(body.material, uniforms, 'ring-shadow-on-planet', RING_SHADOW_ON_PLANET);
  injectShadow(ring.material, uniforms, 'planet-shadow-on-ring', PLANET_SHADOW_ON_RING);
};

export default applyRingShadows;

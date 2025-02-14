import setupSphereObject from '../util/setupSphereObject.js';
import { sunProperties, planetProperties } from './bodies.js';;

//planet textures from https://www.solarsystemscope.com/textures/

export const setupSun = (sizeScale) => {
  return setupSphereBody('sun', sunProperties, sizeScale, 1);
};

export const setupPlanets = (sizeScale, solarSystemScale) => {
  return Object.entries(planetProperties).map(([body, properties]) => {
    return setupSphereBody(body, properties, sizeScale, solarSystemScale);
  });
};

const setupSphereBody = (name, properties, sizeScale, solarSystemScale) => {
  const sphereBody = setupSphereObject(properties.radius / sizeScale, name);
  sphereBody.position.set(0, 0, properties.semiMajorAxis / solarSystemScale);
  sphereBody.name = name;

  return sphereBody;
};

// For simple one axis rotation calculations
// radians per frame = 2pi / (rotation period * frames)

export const rotateSun = (sun, targetFps, timeScale) => {
  rotateSphereBodies(sun, targetFps, timeScale, sunProperties);
}

export const rotatePlanets = (bodies, targetFps, timeScale) => {
  bodies.forEach((body) => {
    rotateSphereBodies(body, targetFps, timeScale, planetProperties[body.name]);
  });
};

const rotateSphereBodies = (body, targetFps, timeScale, properties) => {
  const { rotationHours, rotationDirection } = properties;
  const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timeScale) * targetFps);

  body.rotateY(radiansPerFrame * rotationDirection * timeScale);
};

const orbitSphereBodies = (body, targetFps, timeScale) => {
  const { orbitalRadius, orbitalPeriod, orbitalInclination, orbitalEccentricity, initialOrbitalPosition } = planetProperties[body.name];
  const radiansPerFrame = (2 * Math.PI) / ((orbitalPeriod / timeScale) * targetFps);

  const angle = initialOrbitalPosition + radiansPerFrame * time * timeScale;
  const a = orbitalRadius; // semi-major axis
  const b = a * Math.sqrt(1 - Math.pow(orbitalEccentricity, 2)); // semi-minor axis

  const x = a * Math.cos(angle);
  const z = b * Math.sin(angle);

  // Apply inclination
  const y = z * Math.sin(orbitalInclination);
  const zInclined = z * Math.cos(orbitalInclination);

  body.position.set(x, y, zInclined);
};

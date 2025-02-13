import setupSphereObject from '../util/setupSphereObject.js';
import { sphericalBodies } from './bodies.js';;

//planet textures from https://www.solarsystemscope.com/textures/

export const setupSphereBodies = (sizeScale, solarSystemScale) => {
  return Object.entries(sphericalBodies).map(([key, body]) => {
    const sphereBody = setupSphereObject(body.radius / sizeScale, key);
    sphereBody.position.set(body.positionX / solarSystemScale, body.positionY / solarSystemScale, body.positionZ / solarSystemScale);
    sphereBody.name = key;

    return sphereBody;
  });
};

// For simple one axis rotation calculations
// radians per frame = 2pi / (rotation period * frames)

export const moveSphereBodies = (bodies, targetFps, timeScale) => {
  bodies.forEach((body) => {
    rotateSphereBodies(body, targetFps, timeScale);
  });
};

const rotateSphereBodies = (body, targetFps, timeScale) => {
  const { rotationHours, rotationDirection } = sphericalBodies[body.name];
  const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timeScale) * targetFps);

  body.rotateY(radiansPerFrame * rotationDirection * timeScale);
};

const orbitSphereBodies = (body, targetFps, timeScale) => {
  const { orbitalRadius, orbitalPeriod, orbitalInclination, orbitalEccentricity, initialOrbitalPosition } = sphericalBodies[body.name];
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

import { sunProperties, planetProperties } from './bodies.js';;

export const rotateSun = (sun, targetFps, timeScale) => {
  rotateBody({ sphereBody: sun }, targetFps, timeScale, sunProperties);
}

export const rotatePlanet = (system, targetFps, timeScale) => {
  rotateBody(system, targetFps, timeScale, planetProperties[system.sphereBody.name]);
};

// For simple one axis rotation calculations, radians per frame = 2pi / (rotation period * frames)

const rotateBody = (system, targetFps, timeScale, properties) => {
  const { sphereBody, ringBody } = system;

  const { rotationHours, rotationDirection } = properties;
  const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timeScale) * targetFps);

  sphereBody.rotateY(radiansPerFrame * rotationDirection * timeScale);

  if (ringBody) {
    ringBody.rotateZ(radiansPerFrame * rotationDirection * timeScale);
  }
};

export const orbitBody = (system, targetFps, timeScale, solarSystemScale) => {
  const { sphereBody, ringBody } = system;
  const { semiMajorAxis, semiMinorAxis, orbitHours, orbitInclination } = planetProperties[sphereBody.name];

  const radiansPerFrame = (2 * Math.PI) / ((orbitHours / timeScale) * targetFps);
  
  sphereBody.userData.angle += radiansPerFrame * timeScale;

  const x = (semiMinorAxis / solarSystemScale) * Math.sin(sphereBody.userData.angle);
  const z = (semiMajorAxis / solarSystemScale) * Math.cos(sphereBody.userData.angle);

  const y = x * Math.sin(orbitInclination * Math.PI / 180);
  const xInclined = x * Math.cos(orbitInclination * Math.PI / 180);
  const zInclined = z * Math.cos(orbitInclination * Math.PI / 180);

  sphereBody.position.set(xInclined, -y, zInclined);

  if (ringBody) {
    ringBody.position.set(xInclined, -y, zInclined);
  }
}

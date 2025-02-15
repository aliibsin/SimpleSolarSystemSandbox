import { sunProperties, planetProperties } from './bodies.js';;

export const rotateSun = (sun, targetFps, timeScale) => {
  rotateSphereBodies(sun, targetFps, timeScale, sunProperties);
}

export const rotatePlanet = (planet, targetFps, timeScale) => {
  rotateSphereBodies(planet, targetFps, timeScale, planetProperties[planet.name]);
};

// For simple one axis rotation calculations, radians per frame = 2pi / (rotation period * frames)

const rotateSphereBodies = (body, targetFps, timeScale, properties) => {
  const { rotationHours, rotationDirection } = properties;
  const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timeScale) * targetFps);

  body.rotateY(radiansPerFrame * rotationDirection * timeScale);
};

export const orbitBody = (system, targetFps, timeScale, solarSystemScale) => {
  const { planetBody, ringBody } = system;
  const { semiMajorAxis, semiMinorAxis, orbitHours, orbitInclination } = planetProperties[planetBody.name];

  const radiansPerFrame = (2 * Math.PI) / ((orbitHours / timeScale) * targetFps);
  
  planetBody.userData.angle += radiansPerFrame * timeScale;

  const x = (semiMinorAxis / solarSystemScale) * Math.sin(planetBody.userData.angle);
  const z = (semiMajorAxis / solarSystemScale) * Math.cos(planetBody.userData.angle);

  const y = x * Math.sin(orbitInclination * Math.PI / 180);
  const xInclined = x * Math.cos(orbitInclination * Math.PI / 180);
  const zInclined = z * Math.cos(orbitInclination * Math.PI / 180);

  planetBody.position.set(xInclined, -y, zInclined);

  if (ringBody) {
    ringBody.position.set(xInclined, -y, zInclined);
  }
}

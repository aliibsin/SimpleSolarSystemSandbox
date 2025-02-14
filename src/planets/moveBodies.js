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

export const orbitPlanet = (planet, targetFps, timeScale, solarSystemScale) => {
  const { semiMajorAxis, semiMinorAxis, orbitHours, orbitInclination } = planetProperties[planet.name];

  const radiansPerFrame = (2 * Math.PI) / ((orbitHours / timeScale) * targetFps);
  
  planet.userData.angle += radiansPerFrame * timeScale;

  const x = (semiMinorAxis / solarSystemScale) * Math.sin(planet.userData.angle);
  const z = (semiMajorAxis / solarSystemScale) * Math.cos(planet.userData.angle);

  const y = x * Math.sin(orbitInclination * Math.PI / 180);
  const xInclined = x * Math.cos(orbitInclination * Math.PI / 180);
  const zInclined = z * Math.cos(orbitInclination * Math.PI / 180);

  planet.position.set(xInclined, -y, zInclined);
}

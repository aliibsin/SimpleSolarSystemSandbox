import setupSphereObject from '../util/setupSphereObject.js';
import { sunProperties, planetProperties } from './bodies.js';;
import setupOrbitPathObject from './setupOrbitPathObjects.js';

//planet textures from https://www.solarsystemscope.com/textures/

export const setupSun = (sizeScale) => {
  return positionSphereBody('sun', sunProperties, sizeScale, 1);
};

export const setupPlanets = (sizeScale, solarSystemScale, userPlanetScale) => {
  const objects = {};

  Object.entries(planetProperties).map(([name, properties]) => {
    const planetBody = positionSphereBody(name, properties, sizeScale, userPlanetScale, solarSystemScale);
    const orbitPath = setupOrbitPathObject(properties, solarSystemScale);

    planetBody.userData = { angle: 0 };

    objects[name] = { planetBody, orbitPath };
  });

  return objects
};

const positionSphereBody = (name, properties, sizeScale, userPlanetScale, solarSystemScale) => {
  const sphereBody = setupSphereObject((properties.radius / sizeScale) * userPlanetScale, name);
  sphereBody.position.set(0, 0, properties.semiMajorAxis / solarSystemScale);

  return sphereBody;
};

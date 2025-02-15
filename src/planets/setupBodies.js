import { setupSphereObject, setupRingObject, setupOrbitPathObject } from '../util/setupObjects.js';
import { sunProperties, planetProperties, ringProperties } from './bodies.js';;

//planet textures from https://www.solarsystemscope.com/textures/

export const setupSun = (sizeScale) => {
  return positionSphereBody('sun', sunProperties, sizeScale, 1, 1);
};

export const setupPlanets = (sizeScale, solarSystemScale, userPlanetScale) => {
  const objects = {};

  Object.entries(planetProperties).map(([name, properties]) => {
    const planetBody = positionSphereBody(name, properties, sizeScale, userPlanetScale, solarSystemScale);
    const orbitPath = setupOrbitPathObject(properties, solarSystemScale);
    planetBody.userData = { angle: 0 };

    objects[name] = { planetBody, orbitPath };

    if (name in ringProperties) {
      objects[name]['ringBody'] = positionRingBody(name, ringProperties[name], sizeScale, userPlanetScale, solarSystemScale);
    }
  });

  return objects
};

const positionSphereBody = (name, properties, sizeScale, userPlanetScale, solarSystemScale) => {
  const { radius, semiMajorAxis } = properties;
  const sphereBody = setupSphereObject((radius / sizeScale) * userPlanetScale, name);
  sphereBody.position.set(0, 0, semiMajorAxis / solarSystemScale);

  return sphereBody;
};

const positionRingBody = (name, properties, sizeScale, userPlanetScale, solarSystemScale) => {
  const { innerRadius, outerRadius, initialPosition } = properties;
  const ringBody = setupRingObject(
    (innerRadius / sizeScale) * userPlanetScale,
    (outerRadius / sizeScale) * userPlanetScale,
    `${name}_rings`
  );

  ringBody.position.set(0, 0, initialPosition / solarSystemScale);
  ringBody.rotateX(Math.PI / 2);
  return ringBody
};

import * as THREE from 'three';
import { setupSphereObject, setupRingObject, setupOrbitPathObject } from '../util/setupObjects.js';
import { planetProperties, ringProperties } from '../objects/properties.js';;

// Planet textures from https://www.solarsystemscope.com/textures/

export const setupPlanets = (sizeScale, solarSystemScale, userPlanetScale) => {
  const objects = {};

  Object.entries(planetProperties).map(([name, properties]) => {
    const sphereBody = positionSphereBody(name, properties, sizeScale, userPlanetScale, solarSystemScale);
    const orbitPath = setupOrbitPathObject(properties, solarSystemScale);
    sphereBody.castShadow = true;
    sphereBody.receiveShadow = true;
    sphereBody.userData = { angle: 0 };
    orbitPath.visible = false;

    objects[name] = { sphereBody, orbitPath };

    if (name in ringProperties) {
      const ringBody = positionRingBody(name, ringProperties[name], sizeScale, userPlanetScale, solarSystemScale);
      ringBody.castShadow = true;
      ringBody.receiveShadow = true;
      objects[name]['ringBody'] = ringBody;
    }
  });

  return objects;
};

const positionSphereBody = (name, properties, sizeScale, userPlanetScale, solarSystemScale) => {
  const { radius, semiMajorAxis, equatorInclination } = properties;
  const sphereBody = setupSphereObject((radius / sizeScale) * userPlanetScale, name);
  sphereBody.position.set(0, 0, semiMajorAxis / solarSystemScale);
  sphereBody.rotateX(-equatorInclination * Math.PI / 180);

  return sphereBody;
};

const positionRingBody = (name, properties, sizeScale, userPlanetScale, solarSystemScale) => {
  const { innerRadius, outerRadius, initialPosition, inclination } = properties;
  const ringBody = setupRingObject(
    (innerRadius / sizeScale) * userPlanetScale,
    (outerRadius / sizeScale) * userPlanetScale,
    `${name}_rings`
  );

  ringBody.position.set(0, 0, initialPosition / solarSystemScale);
  ringBody.rotateX(Math.PI / 2);
  ringBody.rotateX(-inclination * Math.PI / 180);
  return ringBody;
};

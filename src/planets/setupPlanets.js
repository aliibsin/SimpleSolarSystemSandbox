import setupSphereObject from '../util/setupSphereObject.js';
import { sphericalBodies } from './bodies.js';;

//planet textures from https://www.solarsystemscope.com/textures/

const setupPlanets = (scene, scale) => {
  Object.entries(sphericalBodies).forEach(([key, body]) => {
    const sphereBody = setupSphereObject(body.radius / scale, key);
    sphereBody.position.set(body.positionX / scale, body.positionY / scale, body.positionZ / scale);
    scene.add(sphereBody);
  });
};

export default setupPlanets;

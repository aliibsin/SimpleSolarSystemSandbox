import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import humanize from './humanizeString.js';

const setupGui = (planets, userState) => {
  const gui = new GUI();
  const orbitPaths = gui.addFolder('Toggle Orbit Paths').close();
  const scaleFolder = gui.addFolder('Scale Controls').close();

  const togglePaths = {
    showAll: () => showAllPaths(planets),
    hideAll: () => hideAllPaths(planets)
  };

  planets.forEach((planet) => {
    togglePaths[planet.name] = () => togglePath(planet);
    orbitPaths.add(togglePaths, planet.name).name(humanize(planet.name));
  });

  orbitPaths.add(togglePaths, 'showAll').name('Show All');
  orbitPaths.add(togglePaths, 'hideAll').name('Hide All');

  scaleFolder.add({ toggle: () => toggleTimePause(userState) }, 'toggle').name("Pause/Resume Time");
  scaleFolder.add(userState, "time", 1, 50, 1).name("Time Scale");
  scaleFolder.add(userState, "size", 1, 100, 1).name("Planet Size Scale");
};

const showAllPaths = (planets) => {
  toggleAllPaths(planets, true);
};

const hideAllPaths = (planets) => {
  toggleAllPaths(planets, false);
};

const toggleAllPaths = (planets, visibility) => {
  planets.forEach((planet) => {
    planet.orbitPath.body.visible = visibility;
  });
};

const togglePath = (planet) => {
  planet.orbitPath.body.visible = !planet.orbitPath.body.visible;
}

const toggleTimePause = (userState) => {
  userState.timePause = !userState.timePause;
};

export default setupGui;

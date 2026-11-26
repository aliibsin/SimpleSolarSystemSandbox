import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import humanize from './humanizeString.js';

const setupGui = ({ planets, asteroidBelt, userState, focusNames, setFocus, clock }) => {
  const gui = new GUI();
  const focusFolder = gui.addFolder('Focus Camera').close();
  const orbitPaths = gui.addFolder('Toggle Orbit Paths').close();
  const asteroidBeltFolder = gui.addFolder('Toggle Asteroid Belt').close();
  const dateFolder = gui.addFolder('Set Date').close();
  const scaleFolder = gui.addFolder('Scale Controls').close();

  const focusButtons = { release: () => setFocus('none') };

  focusNames.forEach((name) => {
    focusButtons[name] = () => setFocus(name);
    focusFolder.add(focusButtons, name).name(humanize(name));
  });

  focusFolder.add(focusButtons, 'release').name('Release Focus');

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

  asteroidBeltFolder.add({ toggle: () => asteroidBelt.toggle() }, 'toggle').name('Asteroid Belt');

  const dateControls = {
    date: toDateString(new Date()),
    today: () => {
      const now = new Date();
      dateControls.date = toDateString(now);
      dateField.updateDisplay();
      clock.setDate(now);
    },
    lineUp: () => clock.lineUp()
  };
  let lastValidDate = dateControls.date;

  const dateField = dateFolder.add(dateControls, 'date').name('Date').onFinishChange((value) => {
    const date = parseDate(value);

    if (date) {
      lastValidDate = value;
      clock.setDate(date);
    } else {
      dateControls.date = lastValidDate;
      dateField.updateDisplay();
    }
  });
  dateFolder.add(dateControls, 'today').name('Today');
  dateFolder.add(dateControls, 'lineUp').name('Line Up Planets');

  scaleFolder.add({ toggle: () => toggleTimePause(userState) }, 'toggle').name("Pause/Resume Time");
  scaleFolder.add(userState, "time", 1, 50, 1).name("Time Scale");
  scaleFolder.add(userState, "size", 1, 100, 1).name("Planet Size Scale")
    .onChange((size) => [...planets, asteroidBelt].forEach((object) => object.scale(size)));
};

const MIN_YEAR = 1800;
const MAX_YEAR = 2050;

const toDateString = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((part, i) => String(part).padStart(i ? 2 : 4, '0')).join('-');

const parseDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  const isRealDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  return isRealDate && year >= MIN_YEAR && year <= MAX_YEAR ? date : null;
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

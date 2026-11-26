import humanize from './humanizeString.js';

const KM_PER_AU = 149_597_871;
const HOURS_PER_EARTH_YEAR = 8_766;

const formatNumber = (value, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const formatRotation = (hours, direction) => {
  const period = hours < 48 ? `${formatNumber(hours, 1)} hours` : `${formatNumber(hours / 24, 1)} Earth days`;
  return direction < 0 ? `${period} (retrograde)` : period;
};

const formatOrbit = (hours) => {
  const days = hours / 24;
  return days < 1000 ? `${formatNumber(days, 1)} Earth days` : `${formatNumber(hours / HOURS_PER_EARTH_YEAR, 1)} Earth years`;
};

const stats = (properties) => {
  const rows = [
    ['Radius', `${formatNumber(properties.radius)} km`],
    ['Rotation', formatRotation(properties.rotationHours, properties.rotationDirection)]
  ];

  if (properties.orbitHours) {
    const axialTilt = properties.rotationDirection < 0
      ? 180 - properties.equatorInclination
      : properties.equatorInclination;

    const distance = properties.orbits
      ? [`Distance from ${humanize(properties.orbits)}`, `${formatNumber(properties.semiMajorAxis)} km (shown scaled with planet size)`]
      : ['Distance from Sun', `${formatNumber(properties.semiMajorAxis / 1e6, 1)} million km (${formatNumber(properties.semiMajorAxis / KM_PER_AU, 2)} AU)`];

    rows.push(
      [properties.orbits ? 'Orbital period' : 'Year', formatOrbit(properties.orbitHours)],
      distance,
      ['Axial tilt', `${formatNumber(axialTilt, 1)}°`],
      ['Orbital inclination', `${formatNumber(properties.orbitInclination, 1)}°`],
      ['Eccentricity', formatNumber(properties.eccentricity, 3)]
    );
  }

  return rows;
};

const setupInfoPanel = (onClose) => {
  const panel = document.getElementById('info-panel');
  const title = document.getElementById('info-panel-title');
  const fact = document.getElementById('info-panel-fact');
  const list = document.getElementById('info-panel-stats');

  document.getElementById('info-panel-close').onclick = onClose;

  return {
    show (object) {
      title.textContent = humanize(object.name);
      fact.textContent = object.properties.fact;
      list.replaceChildren(...stats(object.properties).flatMap(([label, value]) => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = label;
        dd.textContent = value;
        return [dt, dd];
      }));
      panel.hidden = false;
    },

    hide () {
      panel.hidden = true;
    }
  };
};

export default setupInfoPanel;

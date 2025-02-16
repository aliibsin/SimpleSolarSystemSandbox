import Stats from 'stats.js'

const setupStats = () => {
  const stats = new Stats();
  stats.dom.style.top = ''
  stats.dom.style.bottom = '0px'
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  return stats;
};

export default setupStats;

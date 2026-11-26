export const J2000_MS = Date.UTC(2000, 0, 1, 12);
const MS_PER_HOUR = 3_600_000;
const HOURS_PER_YEAR = 365.25 * 24;

const pad = (value) => String(value).padStart(2, '0');

class SimulationClock {
  constructor() {
    this.lineUp();
  }

  get isDate () {
    return this.mode === 'date';
  }

  lineUp () {
    this.mode = 'sandbox';
    this.hours = 0;
  }

  setDate (date) {
    this.mode = 'date';
    this.hours = (date.getTime() - J2000_MS) / MS_PER_HOUR;
  }

  advance (timescale, deltaSeconds) {
    this.hours += deltaSeconds * timescale;
  }

  get label () {
    if (this.isDate) {
      return new Date(J2000_MS + this.hours * MS_PER_HOUR).toLocaleString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    }

    const years = Math.floor(this.hours / HOURS_PER_YEAR);
    const days = Math.floor((this.hours - years * HOURS_PER_YEAR) / 24);
    const hours = Math.floor(this.hours - years * HOURS_PER_YEAR - days * 24);
    return `+${years} y ${pad(days)} d ${pad(hours)} h`;
  }
}

export default SimulationClock;

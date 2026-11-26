// Sidereal rotation used. Physical data from NASA's Planetary Fact Sheets.
// Orbital elements: planets from JPL's "Approximate Positions of the Planets" (Table 1, valid 1800-2050,
// J2000 values: a in AU, angles in degrees, LRate in degrees per century); the Moon and Sun from standard
// mean elements at J2000 with rates per hour.

export const KM_PER_AU = 149_597_871;
export const LINE_UP_LONGITUDE = 245;

export const sunProperties = {
  texture: 'sun.jpg',
  fact: 'Contains about 99.8% of all the mass in the solar system.',
  radius: 695_700,
  rotationHours: 609.1,
  rotationDirection: 1
}

export const moonProperties = {
  texture: 'moon.jpg',
  fact: 'Always shows the same face to Earth, because it spins exactly once per orbit.',
  orbits: 'earth',
  radius: 1_737.4,
  rotationHours: 655.72,
  rotationDirection: 1,
  orbitHours: 655.72,
  eccentricity: 0.0549,
  semiMajorAxis: 384_400,
  elements: {
    semiMajorAxis: 384_400,
    eccentricity: 0.0549,
    inclination: 5.1454,
    node: 125.04337,
    nodeRate: -0.0022064087,
    argPeri: 318.30994,
    argPeriRate: 0.0068482218,
    meanAnomaly: 134.96289,
    meanMotion: 0.5443747063
  },
  sun: {
    sunMeanLongitude: { at: 280.46587, rate: 0.0410686396 },
    sunMeanAnomaly: { at: 357.52540, rate: 0.0410666774 }
  },
  orbitInclination: 5.145,
  equatorInclination: 6.68
}

const ASTEROIDS_SHOWN = 8_000;

export const asteroidBeltProperties = {
  fact: 'Rocky leftovers from the formation of the solar system, kept from forming a planet by Jupiter\'s gravity.',
  count: ASTEROIDS_SHOWN,
  details: [
    ['Location', 'Between Mars and Jupiter, about 2.2–3.2 AU from the Sun'],
    ['Asteroids', '1.1–1.9 million wider than 1 km, plus millions of smaller ones'],
    ['Total mass', 'Less than 10% of the Moon\'s, about a third of it in Ceres'],
    ['Spacing', 'Over 1 million km apart on average'],
    ['Kirkwood gaps', '2.50, 2.82 and 2.95 AU, cleared by Jupiter\'s gravity'],
    ['Shown here', `${ASTEROIDS_SHOWN.toLocaleString('en-US')} asteroids, enlarged for visibility`]
  ]
}

export const planetProperties = {
  mercury: {
    elements: { a: 0.38709927, e: 0.20563593, i: 7.00497902, L: 252.2503235, longPeri: 77.45779628, longNode: 48.33076593, LRate: 149472.67411175 },
    texture: 'mercury.jpg',
    fact: 'The smallest planet and the closest to the Sun.',
    radius: 2_440,
    rotationHours: 1407.6,
    rotationDirection: 1,
    orbitHours: 2_111.26,
    eccentricity: 0.2056,
    semiMajorAxis: 57_909_000,
    orbitInclination: 7.00,
    equatorInclination: 0.034
  },
  venus: {
    elements: { a: 0.72333566, e: 0.00677672, i: 3.39467605, L: 181.9790995, longPeri: 131.60246718, longNode: 76.67984255, LRate: 58517.81538729 },
    texture: 'venus.jpg',
    fact: 'The hottest planet, and it spins in the opposite direction to most planets.',
    radius: 6_052,
    rotationHours: 5832.6,
    rotationDirection: -1,
    orbitHours: 5_392.82,
    eccentricity: 0.0068,
    semiMajorAxis: 108_210_000,
    orbitInclination: 3.40,
    equatorInclination: 2.64
  },
  earth: {
    elements: { a: 1.00000261, e: 0.01671123, i: -1.531e-05, L: 100.46457166, longPeri: 102.93768193, longNode: 0.0, LRate: 35999.37244981 },
    texture: 'earth.jpg',
    showsTimeOfDay: true,
    fact: 'The only place in the universe known to support life.',
    radius: 6_371,
    rotationHours: 23.9345,
    rotationDirection: 1,
    orbitHours: 8_766.14,
    eccentricity: 0.0167,
    semiMajorAxis: 149_598_000,
    orbitInclination: 0,
    equatorInclination: 23.44
  },
  mars: {
    elements: { a: 1.52371034, e: 0.0933941, i: 1.84969142, L: -4.55343205, longPeri: -23.94362959, longNode: 49.55953891, LRate: 19140.30268499 },
    texture: 'mars.jpg',
    fact: 'Home to Olympus Mons, the tallest known volcano in the solar system.',
    radius: 3_390,
    rotationHours: 24.6229,
    rotationDirection: 1,
    orbitHours: 16_487.52,
    eccentricity: 0.0935,
    semiMajorAxis: 227_956_000,
    orbitInclination: 1.85,
    equatorInclination: 25.19
  },
  jupiter: {
    elements: { a: 5.202887, e: 0.04838624, i: 1.30439695, L: 34.39644051, longPeri: 14.72847983, longNode: 100.47390909, LRate: 3034.74612775 },
    texture: 'jupiter.jpg',
    fact: 'The largest planet, more than twice as massive as all the other planets combined.',
    radius: 69_911,
    rotationHours: 9.925,
    rotationDirection: 1,
    orbitHours: 103_982.14,
    eccentricity: 0.0487,
    semiMajorAxis: 778_479_000,
    orbitInclination: 1.30,
    equatorInclination: 3.13
  },
  saturn: {
    elements: { a: 9.53667594, e: 0.05386179, i: 2.48599187, L: 49.95424423, longPeri: 92.59887831, longNode: 113.66242448, LRate: 1222.49362201 },
    texture: 'saturn.jpg',
    fact: 'Its main rings are about 270,000 km across but typically only about 10 metres thick.',
    radius: 58_232,
    rotationHours: 10.6561,
    rotationDirection: 1,
    orbitHours: 258_136.78,
    eccentricity: 0.0520,
    semiMajorAxis: 1_432_041_000,
    orbitInclination: 2.49,
    equatorInclination: 26.73,
    rings: {
      texture: 'saturn_rings.png',
      innerRadius: 66_900,
      outerRadius: 136_780
    }
  },
  uranus: {
    elements: { a: 19.18916464, e: 0.04725744, i: 0.77263783, L: 313.23810451, longPeri: 170.9542763, longNode: 74.01692503, LRate: 428.48202785 },
    texture: 'uranus.jpg',
    fact: 'Tipped on its side, so each pole gets about 42 years of continuous sunlight.',
    radius: 25_362,
    rotationHours: 17.2401,
    rotationDirection: -1,
    orbitHours: 736_449.60,
    eccentricity: 0.0469,
    semiMajorAxis: 2_867_043_000,
    orbitInclination: 0.77,
    equatorInclination: 82.23
  },
  neptune: {
    elements: { a: 30.06992276, e: 0.00859048, i: 1.77004347, L: -55.12002969, longPeri: 44.96476227, longNode: 131.78422574, LRate: 218.45945325 },
    texture: 'neptune.jpg',
    fact: 'Has the fastest winds in the solar system, reaching over 2,000 km/h.',
    radius: 24_622,
    rotationHours: 16.11,
    rotationDirection: 1,
    orbitHours: 1_444_536.43,
    eccentricity: 0.0097,
    semiMajorAxis: 4_514_953_000,
    orbitInclination: 1.77,
    equatorInclination: 28.32
  }
};

// Sidereal rotation used. All data from NASA's Planetary Fact Sheets.

export const sunProperties = {
  texture: 'sun.jpg',
  fact: 'Contains about 99.8% of all the mass in the solar system.',
  radius: 695_700,
  rotationHours: 609.1,
  rotationDirection: 1
}

export const planetProperties = {
  mercury: {
    texture: 'mercury.jpg',
    fact: 'The smallest planet and the closest to the Sun.',
    radius: 2_440,
    rotationHours: 1407.6,
    rotationDirection: 1,
    orbitHours: 2_111.26,
    eccentricity: 0.2056,
    semiMajorAxis: 57_909_000,
    semiMinorAxis: 56_671_839,
    orbitInclination: 7.00,
    equatorInclination: 0.034
  },
  venus: {
    texture: 'venus.jpg',
    fact: 'The hottest planet, and it spins in the opposite direction to most planets.',
    radius: 6_052,
    rotationHours: 5832.6,
    rotationDirection: -1,
    orbitHours: 5_392.82,
    eccentricity: 0.0068,
    semiMajorAxis: 108_210_000,
    semiMinorAxis: 107_959_529,
    orbitInclination: 3.40,
    equatorInclination: 2.64
  },
  earth: {
    texture: 'earth.jpg',
    fact: 'The only place in the universe known to support life.',
    radius: 6_371,
    rotationHours: 23.9345,
    rotationDirection: 1,
    orbitHours: 8_766.14,
    eccentricity: 0.0167,
    semiMajorAxis: 149_598_000,
    semiMinorAxis: 149_577_138,
    orbitInclination: 0,
    equatorInclination: 23.44
  },
  mars: {
    texture: 'mars.jpg',
    fact: 'Home to Olympus Mons, the tallest known volcano in the solar system.',
    radius: 3_390,
    rotationHours: 24.6229,
    rotationDirection: 1,
    orbitHours: 16_487.52,
    eccentricity: 0.0935,
    semiMajorAxis: 227_956_000,
    semiMinorAxis: 226_957_389,
    orbitInclination: 1.85,
    equatorInclination: 25.19
  },
  jupiter: {
    texture: 'jupiter.jpg',
    fact: 'The largest planet, more than twice as massive as all the other planets combined.',
    radius: 69_911,
    rotationHours: 9.925,
    rotationDirection: 1,
    orbitHours: 103_982.14,
    eccentricity: 0.0487,
    semiMajorAxis: 778_479_000,
    semiMinorAxis: 777_555_297,
    orbitInclination: 1.30,
    equatorInclination: 3.13
  },
  saturn: {
    texture: 'saturn.jpg',
    fact: 'Its main rings are about 270,000 km across but typically only about 10 metres thick.',
    radius: 58_232,
    rotationHours: 10.6561,
    rotationDirection: 1,
    orbitHours: 258_136.78,
    eccentricity: 0.0520,
    semiMajorAxis: 1_432_041_000,
    semiMinorAxis: 1_430_103_570,
    orbitInclination: 2.49,
    equatorInclination: 26.73,
    rings: {
      texture: 'saturn_rings.png',
      innerRadius: 66_900,
      outerRadius: 136_780
    }
  },
  uranus: {
    texture: 'uranus.jpg',
    fact: 'Tipped on its side, so each pole gets about 42 years of continuous sunlight.',
    radius: 25_362,
    rotationHours: 17.2401,
    rotationDirection: -1,
    orbitHours: 736_449.60,
    eccentricity: 0.0469,
    semiMajorAxis: 2_867_043_000,
    semiMinorAxis: 2_863_888_076,
    orbitInclination: 0.77,
    equatorInclination: 82.23
  },
  neptune: {
    texture: 'neptune.jpg',
    fact: 'Has the fastest winds in the solar system, reaching over 2,000 km/h.',
    radius: 24_622,
    rotationHours: 16.11,
    rotationDirection: 1,
    orbitHours: 1_444_536.43,
    eccentricity: 0.0097,
    semiMajorAxis: 4_514_953_000,
    semiMinorAxis: 4_514_740_589,
    orbitInclination: 1.77,
    equatorInclination: 28.32
  }
};

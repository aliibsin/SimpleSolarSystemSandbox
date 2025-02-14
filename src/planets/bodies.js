// Sidereal rotation used. Simplifying to y axis for now.

export const sunProperties = {
  radius: 695_700,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationSeconds: 2_192_832,
  rotationHours: 609.12,
  rotationDirection: 1,
  eccentricity: 0,
  semiMajorAxis: 0,
  semiMinorAxis: 0,
  orbitInclination: 0,
  equatorInclination: 0
}

export const planetProperties = {
  mercury: {
    radius: 2_440,
    positionX: 57_910_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 5_067_360,
    rotationHours: 1407.6,
    rotationDirection: 1,
    eccentricity: 0.2056,
    semiMajorAxis: 57_909_000,
    semiMinorAxis: 56_671_839,
    orbitInclination: 7.00,
    equatorInclination: 0.034
  },
  venus: {
    radius: 6_052,
    positionX: 108_200_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 20_997_360,
    rotationHours: 5832.6,
    rotationDirection: -1,
    eccentricity: 0.0068,
    semiMajorAxis: 108_210_000,
    semiMinorAxis: 107_959_529,
    orbitInclination: 3.40,
    equatorInclination: 2.64
  },
  earth: {
    radius: 6_371,
    positionX: 149_600_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 86_164,
    rotationHours: 23.9345,
    rotationDirection: 1,
    eccentricity: 0.0167,
    semiMajorAxis: 149_598_000,
    semiMinorAxis: 149_577_138,
    orbitInclination: 0,
    equatorInclination: 23.44
  },
  mars: {
    radius: 3_390,
    positionX: 227_900_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 88_642,
    rotationHours: 24.6229,
    rotationDirection: 1,
    eccentricity: 0.0935,
    semiMajorAxis: 227_956_000,
    semiMinorAxis: 226_957_389,
    orbitInclination: 1.85,
    equatorInclination: 25.19
  },
  jupiter: {
    radius: 69_911,
    positionX: 778_500_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 35_730,
    rotationHours: 9.925,
    rotationDirection: 1,
    eccentricity: 0.0487,
    semiMajorAxis: 778_479_000,
    semiMinorAxis: 777_555_297,
    orbitInclination: 1.30,
    equatorInclination: 3.13
  },
  saturn: {
    radius: 58_232,
    positionX: 1_429_400_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 38_362,
    rotationHours: 10.6561,
    rotationDirection: 1,
    eccentricity: 0.0520,
    semiMajorAxis: 1_432_041_000,
    semiMinorAxis: 1_430_103_570,
    orbitInclination: 2.49,
    equatorInclination: 26.73
  },
  uranus: {
    radius: 25_362,
    positionX: 2_870_990_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 62_064,
    rotationHours: 17.2401,
    rotationDirection: 1,
    eccentricity: 0.0469,
    semiMajorAxis: 2_867_043_000,
    semiMinorAxis: 2_863_888_076,
    orbitInclination: 0.77,
    equatorInclination: 82.23
  },
  neptune: {
    radius: 24_622,
    positionX: 4_498_250_000,
    positionY: 0,
    positionZ: 0,
    rotationSeconds: 57_996,
    rotationHours: 16.11,
    rotationDirection: 1,
    eccentricity: 0.0097,
    semiMajorAxis: 4_514_953_000,
    semiMinorAxis: 4_514_740_589,
    orbitInclination: 1.77,
    equatorInclination: 28.32
  }
};

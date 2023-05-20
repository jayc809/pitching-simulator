export const HOME_PLATE_WIDTH = 17 * 2.54 / 100;
export const HOME_PLATE_REAR_TO_MOUND_REAR = (60 * 12 + 22) * 2.54 / 100;
export const HOME_PLATE_REAR_TO_RELEASE_POINT = (54 * 12 + 6) * 2.54 / 100;
export const HOME_PLATE_HEIGHT = 17 * 2.54 / 100;
export const HOME_PLATE_RECTANGLE_HEIGHT = 8.5 * 2.54 / 100;
export const HOME_PLATE_THICKNESS = 2.54 / 2 / 100
export const RELEASE_POINT = 6 * 12 * 2.54 / 100;
export const STRIKE_ZONE_HEIGHT = 25 * 2.54 / 100;
export const STRIKE_ZONE_THICKNESS = 2.54 / 100;
export const STRIKE_ZONE_BOTTOM_TO_GROUND = 21 * 2.54 / 100;
export const GROUND_OFFSET = -3.5 * 12 * 2.54 / 100;
export const TOTAL_HEIGHT = 7 * 12 * 2.54 / 100;
export const MOUND_REAR_WIDTH = 60 * 2.54 / 100;
export const MOUND_REAR_LENGTH = 34 * 2.54 / 100;
export const MOUND_REAR_HEIGHT = 10 * 2.54 / 100;
export const MOUND_LENGTH = 96 * 2.54 / 100 + MOUND_REAR_LENGTH;
export const PITCHERS_PLATE_WIDTH = 24 * 2.54 / 100;
export const PITCHERS_PLATE_HEIGHT = 6 * 2.54 / 100;
export const PITCHERS_PLATE_THICKNESS = 2.54 / 2 / 100;
export const PITCHERS_PLATE_TO_MOUND_REAR_FRONT = 9 * 2.54 / 100;
export const BASEBALL_RADIUS = 2.9 / 2 * 2.54 / 100;
export const BASEBALL_MASS = 145.5 / 1000;
export const BASEBALL_CROSS_SECTION = Math.PI * Math.pow(BASEBALL_RADIUS, 2)
export const GRAVITY_ACCELERATION = 9.8067;
export const RELEASE_HEIGHT = 72 * 2.54 / 100;
export const AIR_DENSITY = 1.192;
export const AIR_DRAG_COEFFICIENT = 0.3401;
export const AIR_RESISTANCE_CONSTANT = AIR_DENSITY * AIR_DRAG_COEFFICIENT * BASEBALL_CROSS_SECTION / 2;

export const PITCH_INDEX_TO_COLOR = {
    0: 'red',
    1: 'blue',
    2: 'green',
    3: 'yellow',
    4: 'deepPink',
    5: 'lime',
    6: 'orangeRed',
    7: 'teal',
    8: 'rebeccaPurple',
    9: 'deepSkyBlue'
};

export const PITCH_ACRONYM_TO_NAME = {
    '4SB': '4-Seam Fastball',
    '2SB': '2-Seam Fastball',
    'CUT': 'Cutter',
    'SNK': 'Sinker',
    'SPL': 'Splitter',
    'FRK': 'Forkball',
    'GYR': 'Gyroball',
    'SHT': 'Shootball',
    'SLD': 'Slider',
    'SWP': 'Sweeper',
    'SLV': 'Slurve',
    'CRV': 'Curveball',
    '12-6': '12-6 Curve',
    'K-CRV': 'Knuckle Curve',
    'SCR': 'Screwball',
    'CHG': 'Changeup',
    'CIR': 'Circle Change',
    'VUL': 'Vulcan Change',
    'K-CHG': 'Knuckle Change',
    'PLM': 'Palmball',
    'KNU': 'Knuckleball'
}


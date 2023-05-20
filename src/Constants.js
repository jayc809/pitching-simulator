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
export const RADIANS_PER_SECOND_TO_RPM = 0.10472;

export const PITCH_TYPE_TO_NAME = {
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
};

export const PITCH_TYPE_TO_COLOR = {
    '4SB': '#FC0000',
    '2SB': '#FC2E00',
    'CUT': '#FC5400',
    'SPL': '#FC00B7',
    'FRK': '#FC0063',
    'SNK': '#FC7E00',
    'GYR': '#5800FC',
    'SHT': '#8D00FC',
    'SLD': '#0004FC',
    'SWP': '#0073FC',
    'SLV': '#00FCF8',
    'CRV': '#00FC6B',
    '12-6': '#00FC35',
    'K-CRV': '#2EFC00',
    'SCR': '#FC9900',
    'CHG': '#FCE900',
    'CIR': '#FCFC00',
    'VUL': '#EDFC00',
    'K-CHG': '#BBFC00',
    'PLM': '#D6FC00',
    'KNU': '#FFFFFF'
};

export const PITCH_TYPE_TO_BASE_DATA = {
    '4SB': {velocity: 94, spinRate: 2300, spinAxis: 180, activeSpin: 90, releaseAngle: [0, 0], pitchType: '4SB'},
    '2SB': {velocity: 91, spinRate: 2200, spinAxis: 210, activeSpin: 85, releaseAngle: [0, 0], pitchType: '2SB'},
    'CUT': {velocity: 90, spinRate: 2400, spinAxis: 150, activeSpin: 50, releaseAngle: [0, 0], pitchType: 'CUT'},
    'SNK': {velocity: 94, spinRate: 2150, spinAxis: 240, activeSpin: 90, releaseAngle: [0, 0], pitchType: 'SNK'},
    'SPL': {velocity: 87, spinRate: 1350, spinAxis: 240, activeSpin: 75, releaseAngle: [0, 0], pitchType: 'SPL'},
    'FRK': {velocity: 82, spinRate: 1650, spinAxis: 240, activeSpin: 70, releaseAngle: [0, 0], pitchType: 'FRK'},
    'GYR': {velocity: 85, spinRate: 1250, spinAxis: 210, activeSpin: 5, releaseAngle: [0, 0], pitchType: 'GYR'},
    'SHT': {velocity: 82, spinRate: 2750, spinAxis: 240, activeSpin: 65, releaseAngle: [0, 0], pitchType: 'SHT'},
    'SLD': {velocity: 84, spinRate: 2400, spinAxis: 90, activeSpin: 40, releaseAngle: [0, 0], pitchType: 'SLD'},
    'SWP': {velocity: 81, spinRate: 2650, spinAxis: 90, activeSpin: 45, releaseAngle: [0, 0], pitchType: 'SWP'},
    'SLV': {velocity: 83, spinRate: 2650, spinAxis: 60, activeSpin: 55, releaseAngle: [0, 0], pitchType: 'SLV'},
    'CRV': {velocity: 77, spinRate: 2550, spinAxis: 30, activeSpin: 70, releaseAngle: [0, 0], pitchType: 'CRV'},
    '12-6': {velocity: 75, spinRate: 2550, spinAxis: 0, activeSpin: 80, releaseAngle: [0, 0], pitchType: 'CRV'},
    'K-CRV': {velocity: 72, spinRate: 2500, spinAxis: 30, activeSpin: 5, releaseAngle: [0, 0], pitchType: 'K-CRV'},
    'SCR': {velocity: 83, spinRate: 2600, spinAxis: 300, activeSpin: 65, releaseAngle: [0, 0], pitchType: 'SCR'},
    'CHG': {velocity: 83, spinRate: 1750, spinAxis: 240, activeSpin: 55, releaseAngle: [0, 0], pitchType: 'CHG'},
    'CIR': {velocity: 83, spinRate: 1750, spinAxis: 270, activeSpin: 70, releaseAngle: [0, 0], pitchType: 'CIR'},
    'VUL': {velocity: 83, spinRate: 1500, spinAxis: 240, activeSpin: 70, releaseAngle: [0, 0], pitchType: 'VUL'},
    'K-CHG': {velocity: 73, spinRate: 1650, spinAxis: 240, activeSpin: 5, releaseAngle: [0, 0], pitchType: 'K-CHG'},
    'PLM': {velocity: 68, spinRate: 1250, spinAxis: 0, activeSpin: 10, releaseAngle: [0, 0], pitchType: 'PLM'},
    'KNU': {velocity: 65, spinRate: 600, spinAxis: 180, activeSpin: 0, releaseAngle: [0, 0], pitchType: 'KNU'}
}

export const DEFAULT_DATA = {
    pitchDatas: [
        {...PITCH_TYPE_TO_BASE_DATA['4SB'], isDefault: true},
        {...PITCH_TYPE_TO_BASE_DATA['SNK'], isDefault: true},
        {...PITCH_TYPE_TO_BASE_DATA['SWP'], isDefault: true},
        {...PITCH_TYPE_TO_BASE_DATA['CRV'], isDefault: true}
    ],
    pitchDataChanged: -1,
    pitchDataSelected: -1
}

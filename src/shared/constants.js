export const COLORS = {
  WHITE: '#ffffff',
  ORANGE: '#ee9b74',
  YELLOW: '#fff475',
  GREEN: '#bce592',
  PINK: '#efa0a0'
}

export const ROOM_STRINGS = {
  [COLORS.WHITE]: 'Förråd',
  [COLORS.ORANGE]: 'Vardagsrum',
  [COLORS.YELLOW]: 'Badrum',
  [COLORS.GREEN]: 'Kök',
  [COLORS.PINK]: 'Sovrum',
};

export const PEOPLE = {
  NONE: 0,
  ALMA: 1,
  ALOJZ: 2,
}

export const COLOR_INDEX = {
  [COLORS.WHITE]: 0,
  [COLORS.ORANGE]: 1,
  [COLORS.YELLOW]: 2,
  [COLORS.GREEN]: 3,
  [COLORS.PINK]: 4,
}

export const COLOR_IDS = {
  WHITE: 0,
  ORANGE: 1,
  YELLOW: 2,
  GREEN: 3,
  PINK: 4,
};

export function getColorFromParent(parentId) {
  switch (parentId) {
    case COLOR_IDS.ORANGE:
      return COLORS.ORANGE;
    case COLOR_IDS.YELLOW:
      return COLORS.YELLOW;
    case COLOR_IDS.GREEN:
      return COLORS.GREEN;
    case COLOR_IDS.PINK:
      return COLORS.PINK;
    case 0:
    default:
      return COLORS.WHITE;
  }

}

export function createOwnerString(owner, id) {
  id = id.toString().padStart(2, '0');
  switch (owner) {
    case PEOPLE.ALMA:
      return `C - ${id}`
    case PEOPLE.ALOJZ:
      return `A - ${id}`
    case PEOPLE.NONE:
      return `N - ${id}`
    default:
      return '';
  }
}

export const getRoomString = id => ROOM_STRINGS[getColorFromParent(id)];
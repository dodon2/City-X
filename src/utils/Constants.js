export const CITY_SIZE = 60;
export const BLOCK_SIZE = 4;
export const CHUNK_SIZE = 10;

export const COLORS = {
    GROUND: 0x1a1a1a,
    BUILDING: 0x2b2b2b,
    WALL: 0x111111,
    ROAD: 0x333333,
    SKY: 0x050505,
    FOG: 0x0a0a0a
};

export const INITIAL_STATE = {
    health: 100,
    hunger: 100,
    fatigue: 0,
    money: 10,
    morality: 0,
    reputation: {
        government: 0,
        resistance: 0,
        criminal: 0
    }
};

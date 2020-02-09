export const classes = (...vs) => vs.filter(v => v).join(' ');

export const sq = x => x * x;

export const UUID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const RANDOM_GAME_ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
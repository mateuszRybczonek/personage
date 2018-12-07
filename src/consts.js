/* eslint-disable import/prefer-default-export */
export const emojisForTeam = [0, 1, 2, 3];

export const gameStateReady = 'ready';
export const gameStatePlaying = 'playing';
export const gameStatePaused = 'paused';
export const gameStateTimeout = 'timeout';
export const gameStateFinished = 'finished';

export const teamA = 'teamA';
export const teamB = 'teamB';
export const teamC = 'teamC';
export const teamD = 'teamD';
export const teamE = 'teamE';
export const teamF = 'teamF';

export const timeoutDelay = 3000;
export const maxTimeToReturn = 60 * 60 * 1000; // 60 minutes

// Game setup limits
export const CARDS_RANGE = {
  min: 10,
  max: 100,
};

export const SKIPS_RANGE = {
  min: 0,
  max: 12,
};

export const TEAMS_RANGE = {
  min: 2,
  max: 6,
};

export const TIME_RANGE = {
  min: 30,
  max: 120,
};

// Global events
export const $GAME_CORRECT_ANSWER = 'GAME.CORRECT_ANSWER';
export const $GAME_INCORRECT_ANSWER = 'GAME.INCORRECT_ANSWER';
export const $GAME_SKIP_CARD = 'GAME.SKIP_CARD';

// URLS
export const EMOJIS_URL = '/emojis';
export const GAME_URL = '/game';
export const HOME_URL = '/';
export const ONBOARDING_URL = '/onboarding';
export const SETUP_URL = '/setup';
export const SUMMARY_URL = '/summary';

// SOUNDS
export const SOUNDS = {
  click: 'clockStopwatch',
  turnStart: 'fireMonster',
  start: 'monsterYeah',
  correct: 'snakeMonsterBite',
  incorrect: 'monsterYellsNo',
  pause: 'slowZombieMoan',
  resume: 'monsterYeah',
  hurry: 'heartbeat',
  timesup: 'goblinDeath',
  paperTurnPage: 'paperTurnPage',
  summary: 'evilMonsterLaugh',
};

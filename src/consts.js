/* eslint-disable import/prefer-default-export */
export const cardsApiUrl = 'https://raw.githubusercontent.com/netguru/taboo-db/master/en.json';

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
export const teamG = 'teamG';
export const teamH = 'teamH';
export const teamI = 'teamI';
export const teamJ = 'teamJ';

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
  max: 10,
};

export const TIME_RANGE = {
  min: 30,
  max: 120,
};

// Global events
export const $GAME_CORRECT_ANSWER = 'GAME.CORRECT_ANSWER';
export const $GAME_INCORRECT_ANSWER = 'GAME.INCORRECT_ANSWER';
export const $GAME_SKIP_CARD = 'GAME.SKIP_CARD';

// Local storage keys
export const LS_STATE_KEY = 'personage:state';
export const LS_ROUTE_KEY = 'personage:route';
export const LS_LAST_ACTIVITY_AT_KEY = 'personage:last-active-at';

// URLS
export const EMOJIS_URL = '/emojis';
export const GAME_URL = '/game';
export const HOME_URL = '/';
export const ONBOARDING_URL = '/onboarding';
export const SETUP_URL = '/setup';
export const SUMMARY_URL = '/summary';

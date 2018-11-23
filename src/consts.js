/* eslint-disable import/prefer-default-export */
export const cardsApiUrl = 'https://raw.githubusercontent.com/netguru/taboo-db/master/en.json';

export const categories = ['design', 'it', 'people', 'travel'];

export const emojisForTeamA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const emojisForTeamB = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export const gameStateReady = 'ready';
export const gameStatePlaying = 'playing';
export const gameStatePaused = 'paused';
export const gameStateTimeout = 'timeout';
export const gameStateFinished = 'finished';

export const teamA = 'teamA';
export const teamB = 'teamB';

export const timeoutDelay = 3000;
export const maxTimeToReturn = 60 * 60 * 1000; // 60 minutes

export const EASTER_EGG_ENABLED = false;

// Game setup limits
export const SKIPS_RANGE = {
  min: 0,
  max: 12,
};

export const ROUNDS_RANGE = {
  min: 1,
  max: 20,
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
export const CATEGORIES_URL = '/categories';
export const EMOJIS_URL = '/emojis';
export const GAME_URL = '/game';
export const HOME_URL = '/';
export const ONBOARDING_URL = '/onboarding';
export const SETUP_URL = '/setup';
export const SUMMARY_URL = '/summary';

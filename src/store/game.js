import {
  teamA,
  teamB,
  gameStateReady,
  gameStatePlaying,
  gameStatePaused,
  gameStateTimeout,
  gameStateFinished,
  SKIPS_RANGE,
} from '@/consts';

import router from '@/router';

export const initialTeamPayload = {
  correct: 0,
  incorrect: 0,
  skipped: 0,
  fastestAnswer: null,
};

export const initialState = {
  currentRound: 1,
  currentTeam: teamA,
  gameState: gameStateReady,
  teamA: { ...initialTeamPayload },
  teamB: { ...initialTeamPayload },
};

const calculateWinner = (a, b) => {
  // More correct answers wins
  if (a.correct > b.correct) {
    return teamA;
  } else if (a.correct < b.correct) {
    return teamB;
  }

  // If draw - less incorrect answers wins
  if (a.incorrect < b.incorrect) {
    return teamA;
  } else if (a.incorrect > b.incorrect) {
    return teamB;
  }

  // If draw - less skipped wins
  if (a.skipped < b.skipped) {
    return teamA;
  } else if (a.skipped > b.skipped) {
    return teamB;
  }

  // If draw - fastest answer wins
  if (a.fastestAnswer < b.fastestAnswer) {
    return teamA;
  } else if (a.fastestAnswer > b.fastestAnswer) {
    return teamB;
  }

  // Draw
  return null;
};

export default {
  namespaced: true,
  state: initialState,
  getters: {
    isGameReady: state => state.gameState === gameStateReady,
    isGamePlaying: state => state.gameState === gameStatePlaying,
    isGamePaused: state => state.gameState === gameStatePaused,
    isGameTimedOut: state => state.gameState === gameStateTimeout,
    isGameFinished: state => state.gameState === gameStateFinished,
    isTeamATurn: state => state.currentTeam === teamA,
    isTeamBTurn: state => state.currentTeam === teamB,
    winner: state => calculateWinner(state.teamA, state.teamB),
    skipsLimitReached: (state, getters, rootState) => {
      const { skipsLimit } = rootState.settings;
      if (skipsLimit === SKIPS_RANGE.max) return false;
      return state[state.currentTeam].skipped >= rootState.settings.skipsLimit;
    },
  },
  mutations: {
    setGameState(state, gameState) {
      state.gameState = gameState;
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team;
    },
    incrementCorrectScore(state) {
      state[state.currentTeam].correct += 1;
    },
    incrementIncorrectScore(state) {
      state[state.currentTeam].incorrect += 1;
    },
    incrementRound(state) {
      state.currentRound += 1;
    },
    incrementSkippedCards(state) {
      state[state.currentTeam].skipped += 1;
    },
    resetGame(state) {
      state.currentRound = 1;
      state.currentTeam = teamA;
      state.teamA = { ...initialTeamPayload };
      state.teamB = { ...initialTeamPayload };
    },
    setFastestAnswer(state, fastestAnswer) {
      state[state.currentTeam].fastestAnswer = fastestAnswer;
    },
  },
  actions: {
    prepareGame({ commit }) {
      commit('resetGame');
      commit('setGameState', gameStateReady);
    },

    startGame({ commit }) {
      commit('setGameState', gameStatePlaying);
    },

    pauseGame({ commit }) {
      commit('setGameState', gameStatePaused);
    },

    finishGame({ commit }) {
      commit('setGameState', gameStateFinished);
      router.push({ name: 'summary' });
    },

    showTimeout({ commit }) {
      commit('setGameState', gameStateTimeout);
    },

    finishTurn({ commit, dispatch, getters }) {
      if (getters.isTeamATurn) {
        commit('setCurrentTeam', teamB);
        commit('setGameState', gameStateReady);
      } else {
        commit('setCurrentTeam', teamA);
        dispatch('nextRound');
      }
    },

    nextRound({
      commit,
      state,
      rootState,
      dispatch,
    }) {
      if (state.currentRound === rootState.settings.roundsLimit) {
        dispatch('finishGame');
      } else {
        commit('incrementRound');
        commit('setGameState', gameStateReady);
      }
    },

    updateFastestAnswerTime({ commit, state }, answerTime) {
      const currentFastestAnswerTime = state[state.currentTeam].fastestAnswer;

      if (currentFastestAnswerTime === null || answerTime < currentFastestAnswerTime) {
        commit('setFastestAnswer', answerTime);
      }
    },
  },
};


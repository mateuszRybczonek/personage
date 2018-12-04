import {
  teamA,
  teamB,
  teamC,
  teamD,
  teamE,
  teamF,
  gameStateReady,
  gameStatePlaying,
  gameStatePaused,
  gameStateTimeout,
  gameStateFinished,
  SKIPS_RANGE,
} from '@/consts';

import router from '@/router';

const calculateWinner = (a, b) => {
  // More correct answers wins
  if (a.correct > b.correct) return teamA;
  if (a.correct < b.correct) return teamB;

  // If draw - less incorrect answers wins
  if (a.incorrect < b.incorrect) return teamA;
  if (a.incorrect > b.incorrect) return teamB;

  // If draw - less skipped wins
  if (a.skipped < b.skipped) return teamA;
  if (a.skipped > b.skipped) return teamB;

  // If draw - fastest answer wins
  if (a.fastestAnswer < b.fastestAnswer) return teamA;
  if (a.fastestAnswer > b.fastestAnswer) return teamB;

  // Draw
  return null;
};

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

export default {
  namespaced: true,
  state: initialState,
  getters: {
    isGameReady: state => state.gameState === gameStateReady,
    isGamePlaying: state => state.gameState === gameStatePlaying,
    isGamePaused: state => state.gameState === gameStatePaused,
    isGameTimedOut: state => state.gameState === gameStateTimeout,
    isGameFinished: state => state.gameState === gameStateFinished,
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

    setInitialTeams(state, teamsLimit) {
      if (teamsLimit > 2) {
        state.initialState[teamC] = { ...initialTeamPayload };
      }
      if (teamsLimit > 3) {
        state.initialState[teamD] = { ...initialTeamPayload };
      }
      if (teamsLimit > 4) {
        state.initialState[teamE] = { ...initialTeamPayload };
      }
      if (teamsLimit > 5) {
        state.initialState[teamF] = { ...initialTeamPayload };
      }

      return initialState;
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
    },

    resetTeams(state, teamsLimit) {
      state[teamA] = { ...initialTeamPayload };
      state[teamB] = { ...initialTeamPayload };
      state[teamC] = null;
      state[teamD] = null;
      state[teamE] = null;
      state[teamF] = null;

      if (teamsLimit > 2) {
        state[teamC] = { ...initialTeamPayload };
      }
      if (teamsLimit > 3) {
        state[teamD] = { ...initialTeamPayload };
      }
      if (teamsLimit > 4) {
        state[teamE] = { ...initialTeamPayload };
      }
      if (teamsLimit > 5) {
        state[teamF] = { ...initialTeamPayload };
      }

      return initialState;
    },

    setFastestAnswer(state, fastestAnswer) {
      state[state.currentTeam].fastestAnswer = fastestAnswer;
    },
  },
  actions: {
    prepareGame({ commit, rootState }) {
      commit('resetGame');
      commit('resetTeams', rootState.settings.teamsLimit);
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
    },

    showTimeout({ commit }) {
      commit('setGameState', gameStateTimeout);
    },

    finishTurn({
      commit,
      state,
    }) {
      switch (state.currentTeam) {
        case teamA: {
          commit('setCurrentTeam', teamB);
          break;
        }
        case teamB: {
          if (state[teamC]) {
            commit('setCurrentTeam', teamC);
          } else {
            commit('setCurrentTeam', teamA);
          }
          break;
        }
        case teamC: {
          if (state[teamD]) {
            commit('setCurrentTeam', teamD);
          } else {
            commit('setCurrentTeam', teamA);
          }
          break;
        }
        case teamD: {
          if (state[teamE]) {
            commit('setCurrentTeam', teamE);
          } else {
            commit('setCurrentTeam', teamA);
          }
          break;
        }
        case teamE: {
          if (state[teamF]) {
            commit('setCurrentTeam', teamF);
          } else {
            commit('setCurrentTeam', teamA);
          }
          break;
        }
        case teamF: {
          commit('setCurrentTeam', teamA);
          break;
        }
        default: {
          break;
        }
      }
      commit('setGameState', gameStateReady);
    },

    nextRound({
      commit,
      state,
      dispatch,
    }) {
      if (state.currentRound === 3) {
        dispatch('finishGame');
      } else {
        commit('incrementRound');
        commit('setCurrentTeam', teamA);
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

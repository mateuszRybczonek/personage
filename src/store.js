import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { teamA, LS_STATE_KEY } from '@/consts';

import cards from './store/cards';
import game from './store/game';
import onboarding from './store/onboarding';
import settings from './store/settings';
import timer from './store/timer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cards,
    onboarding,
    game,
    settings,
    timer,
  },
  plugins: [createPersistedState({
    key: LS_STATE_KEY,
    paths: [
      'onboarding.isFinished',
      'settings.roundsLimit',
      'settings.skipsLimit',
      'settings.sound',
      'settings.timeLimit',
      'settings.teamAEmoji',
      'settings.teamBEmoji',
      'settings.selectedCategories',
      'settings.isPauseTooltipVisible',
      'game.currentRound',
      'game.currentTeam',
      'game.gameState',
      'game.teamA',
      'game.teamB',
      'cards.allCards',
      'cards.playedCards',
      'cards.currentGameCards',
      'cards.nextCardIndex',
      'cards.visibleCards',
      'timer.timePassed',
    ],
  })],
  getters: {
    currentTeamEmoji: state => (
      state.game.currentTeam === teamA
        ? state.settings.teamAEmoji
        : state.settings.teamBEmoji
    ),
  },
  actions: {
    prepareGame({ dispatch }) {
      dispatch('game/prepareGame');
      dispatch('timer/resetTimer');
    },

    startGame({ commit, dispatch }) {
      dispatch('game/startGame');
      commit('settings/hidePauseTooltip');
      dispatch('timer/startTimer');
    },

    pauseGame({ dispatch }) {
      dispatch('game/pauseGame');
      dispatch('timer/pauseTimer');
    },
  },
});

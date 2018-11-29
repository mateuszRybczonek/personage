import Vue from 'vue';
import { cardsApiUrl } from '@/consts';
import { serializeCards } from '@/utils/serializer';
import { shuffleArray } from '@/utils/helpers';

export default {
  namespaced: true,
  state: {
    currentGameCards: [],
    allCards: [],
    playedCards: [],
    visibleCards: [],
  },

  getters: {
    areCardsLoaded: state => state.allCards.length > 0,
  },

  mutations: {
    pushKeywordToPlayedCards(state, keyword) {
      state.playedCards.push(keyword);
    },

    pushCardToVisibleCards(state, card) {
      state.visibleCards.push(card);
    },

    pushCardToCurrentGameCards(state, card) {
      state.currentGameCards.push(card);
    },

    clearPlayedCards(state) {
      state.playedCards = [];
    },

    setCurrentGameCards(state, value) {
      state.currentGameCards = value;
    },

    setAllCards(state, cards) {
      state.allCards = cards;
    },

    setInitialVisibleCards(state, value) {
      state.visibleCards = value;
    },
  },

  actions: {
    async loadCards({ commit }) {
      try {
        const response = await fetch(cardsApiUrl);
        const cards = await response.json();
        commit('setAllCards', serializeCards(cards));
      } catch (err) {
        Vue.rollbar.error('Error while fetching & serializing cards', err);
      }
    },

    loadNextCard({ commit, state, dispatch }) {
      const {
        currentGameCards,
        visibleCards,
      } = state;

      if (currentGameCards.length) {
        commit('pushKeywordToPlayedCards', visibleCards[0].keyword);
        console.log(currentGameCards[0].keyword)
        commit('pushCardToVisibleCards', currentGameCards.shift());
      } else {
        console.log('finish round here');
        // finish round
      }
    },

    prepareInitialCards({ dispatch }) {
      console.log('prepare cards');
      dispatch('setInitialCurrentGameCards');
      dispatch('setInitialVisibleCards');
    },

    setInitialCurrentGameCards({ commit, state, rootState }) {
      const { allCards } = state;

      commit('clearPlayedCards');
      commit('setCurrentGameCards', shuffleArray(allCards).slice(0, rootState.settings.cardsLimit));
    },

    shuffleCurrentCards({ commit, state, dispatch }) {
      const {
        currentGameCards,
        visibleCards,
      } = state;

      commit('pushCardToCurrentGameCards', visibleCards[0]);
      commit('setCurrentGameCards', shuffleArray(currentGameCards));
      dispatch('setInitialVisibleCards');
    },

    setInitialVisibleCards({
      commit,
      getters,
      state,
    }) {
      const { currentGameCards } = state;
      const { areCardsLoaded } = getters;

      if (!areCardsLoaded) return;

      commit('setInitialVisibleCards', currentGameCards.splice(0, 1));
    },
  },
};

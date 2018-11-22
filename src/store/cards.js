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

    clearPlayedCards(state) {
      state.playedCards = [];
    },

    setCurrentGameCards(state, value) {
      state.currentGameCards = value;
    },

    setAllCards(state, cards) {
      state.allCards = cards;
    },

    setVisibleCards(state, value) {
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
        playedCards,
      } = state;

      const keywordsToOmit = new Set([...playedCards, ...visibleCards.map(card => card.keyword)]);
      const remainingCards = currentGameCards.filter(card => !keywordsToOmit.has(card.keyword));

      if (remainingCards.length) {
        commit('pushKeywordToPlayedCards', visibleCards[0].keyword);
        commit('pushCardToVisibleCards', remainingCards[0]);
      } else {
        dispatch('resetCurrentGameCards');
        dispatch('loadNextCard');
      }
    },

    prepareCards({ dispatch }) {
      dispatch('setCurrentGameCards');
      dispatch('setVisibleCards');
    },

    resetCurrentGameCards({ commit, dispatch }) {
      commit('clearPlayedCards');
      dispatch('setCurrentGameCards');
    },

    setCurrentGameCards({ commit, state, rootState }) {
      const { allCards } = state;

      const selectedCategoriesCards = allCards
        .filter(card => rootState.settings.selectedCategories.includes(card.category));

      commit('setCurrentGameCards', shuffleArray(selectedCategoriesCards));
    },

    setVisibleCards({
      commit,
      getters,
      state,
    }) {
      const { currentGameCards, playedCards } = state;
      const { areCardsLoaded } = getters;

      if (!areCardsLoaded) return;

      const remainingCards = currentGameCards.filter(card => !playedCards.includes(card.keyword));

      commit('setVisibleCards', remainingCards.slice(0, 3));
    },
  },
};

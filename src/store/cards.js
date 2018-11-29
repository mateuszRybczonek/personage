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
    isLastCard: state => state.currentGameCards.length === 0,
  },

  mutations: {
    clearPlayedCards(state) {
      state.playedCards = [];
    },

    pushCardToPlayedCards(state, card) {
      state.playedCards.push(card);
    },

    pushCardToVisibleCards(state, card) {
      state.visibleCards.push(card);
    },

    pushCardToCurrentGameCards(state, card) {
      state.currentGameCards.push(card);
    },

    resetCurrentGameCards(state) {
      state.currentGameCards = state.playedCards;
    },

    setCurrentGameCards(state, value) {
      state.currentGameCards = value;
    },

    setAllCards(state, cards) {
      state.allCards = cards;
    },

    setVisibleCard(state, value) {
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

    loadNextCard({ commit, state }, actionType) {
      if (actionType === 'skipped') commit('pushCardToCurrentGameCards', state.visibleCards[0]);
      else commit('pushCardToPlayedCards', state.visibleCards[0]);

      commit('pushCardToVisibleCards', state.currentGameCards.shift());
    },

    pushVisibleCardToPlayedCards({ commit, state }) {
      commit('pushCardToPlayedCards', state.visibleCards[0]);
    },

    prepareInitialCards({ dispatch }) {
      dispatch('setInitialCurrentGameCards');
      dispatch('setVisibleCard');
    },

    prepareCardsForNextRound({ commit, dispatch, state }) {
      dispatch('pushVisibleCardToPlayedCards');
      commit('resetCurrentGameCards');
      commit('setCurrentGameCards', shuffleArray(state.currentGameCards));
      dispatch('setVisibleCard');
    },

    prepareCardsForNextTurn({ commit, dispatch, state }) {
      commit('pushCardToCurrentGameCards', state.visibleCards[0]);
      commit('setCurrentGameCards', shuffleArray(state.currentGameCards));
      dispatch('setVisibleCard');
    },

    setInitialCurrentGameCards({ commit, state, rootState }) {
      const { allCards } = state;

      commit('clearPlayedCards');
      commit('setCurrentGameCards', shuffleArray(allCards).slice(0, rootState.settings.cardsLimit));
    },

    setVisibleCard({
      commit,
      getters,
      state,
    }) {
      const { currentGameCards } = state;
      const { areCardsLoaded } = getters;

      if (!areCardsLoaded) return;

      commit('setVisibleCard', currentGameCards.splice(0, 1));
    },
  },
};

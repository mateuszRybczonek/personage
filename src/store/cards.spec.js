import {
  card1,
  card2,
  allCardsMock,
} from '@/utils/mocks';
import cards from './cards';

jest.mock('@/utils/helpers', () => ({
  shuffleArray: jest.fn(array => array),
}));

const {
  actions,
  mutations,
} = cards;

describe('mutations', () => {
  test('clearPlayedCards', () => {
    const state = { playedCards: [card1, card2] };

    mutations.clearPlayedCards(state);
    expect(state.playedCards).toEqual([]);
  });

  test('pushCardToPlayedCards', () => {
    const state = { playedCards: [card1] };

    mutations.pushCardToPlayedCards(state, card2);
    expect(state.playedCards).toEqual([card1, card2]);
  });

  test('pushCardToVisibleCards', () => {
    const state = { visibleCards: [card1] };

    mutations.pushCardToVisibleCards(state, card2);
    expect(state.visibleCards).toEqual([card1, card2]);
  });

  test('pushCardToCurrentGameCards', () => {
    const state = { currentGameCards: [card1] };

    mutations.pushCardToCurrentGameCards(state, card2);
    expect(state.currentGameCards).toEqual([card1, card2]);
  });

  test('resetCurrentGameCards', () => {
    const state = { currentGameCards: [card1], playedCards: [card2] };

    mutations.resetCurrentGameCards(state);
    expect(state.currentGameCards).toEqual([card2]);
  });

  test('setCurrentGameCards', () => {
    const state = { currentGameCards: [] };
    const newValue = [card1, card2];

    mutations.setCurrentGameCards(state, newValue);
    expect(state.currentGameCards).toEqual(newValue);
  });

  test('setAllCards', () => {
    const state = { allCards: [] };
    const newValue = [card1, card2];

    mutations.setAllCards(state, newValue);
    expect(state.allCards).toEqual(newValue);
  });

  test('setVisibleCard', () => {
    const state = { visibleCards: [] };
    const newValue = [card1, card2];

    mutations.setVisibleCard(state, newValue);
    expect(state.visibleCards).toEqual(newValue);
  });
});

describe('actions', () => {
  describe('loadCards', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    global.fetch = jest.fn().mockImplementation(() => new Promise(resolve => resolve({
      ok: true,
      json() {
        return {};
      },
    })));

    await actions.loadCards({ commit, dispatch });

    it('calls fetch', () => {
      expect(global.fetch).toHaveBeenCalled();
    });

    it('commits setAllCards with proper payload', () => {
      expect(commit).toHaveBeenCalledWith('setAllCards', []);
    });

    it('dispatches prepareCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('prepareCards');
    });
  });

  describe('loadNextCard', () => {
    const currentGameCards = ['a', 'b', 'c', 'd', 'e', 'f'];

    context('when it\'s possible to load new card', () => {
      const commit = jest.fn();

      const state = {
        visibleCards: ['b', 'c', 'd'],
        playedCards: ['a'],
        currentGameCards,
      };

      actions.loadNextCard({ commit, state });

      it('commits pushCardToPlayedCards with the first visible card', () => {
        expect(commit).toHaveBeenCalledWith('pushCardToPlayedCards', 'b');
      });

      it('commits pushCardToVisibleCards with proper payload', () => {
        expect(commit).toHaveBeenCalledWith('pushCardToVisibleCards', 'a');
      });
    });
  });

  describe('pushVisibleCardToPlayedCards', () => {
    const commit = jest.fn();

    const state = {
      visibleCards: ['visible-card'],
    };

    actions.pushVisibleCardToPlayedCards({ commit, state });

    it('commits pushCardToPlayedCards mutation with proper payload', () => {
      expect(commit).toHaveBeenCalledWith('pushCardToPlayedCards', 'visible-card');
    });
  });

  describe('prepareInitialCards', () => {
    const dispatch = jest.fn();

    actions.prepareInitialCards({ dispatch });

    it('dispatches setInitialCurrentGameCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('setInitialCurrentGameCards');
    });

    it('dispatches setVisibleCard action', () => {
      expect(dispatch).toHaveBeenCalledWith('setVisibleCard');
    });
  });

  describe('prepareCardsForNextRound', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    const state = {
      currentGameCards: ['card-1'],
    };

    actions.prepareCardsForNextRound({ commit, dispatch, state });

    it('dispatches pushVisibleCardToPlayedCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('pushVisibleCardToPlayedCards');
    });

    it('commits resetCurrentGameCards mutation', () => {
      expect(commit).toHaveBeenCalledWith('resetCurrentGameCards');
    });

    it('commits setCurrentGameCards mutation', () => {
      expect(commit).toHaveBeenCalledWith('setCurrentGameCards', ['card-1']);
    });

    it('dispatches setVisibleCard action', () => {
      expect(dispatch).toHaveBeenCalledWith('setVisibleCard');
    });
  });

  describe('prepareCardsForNextTurn', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    const state = {
      currentGameCards: ['card-1'],
      visibleCards: ['visible-card'],
    };

    actions.prepareCardsForNextTurn({ commit, dispatch, state });

    it('commits setCurrentGameCards mutation', () => {
      expect(commit).toHaveBeenCalledWith('setCurrentGameCards', ['card-1']);
    });

    it('commits pushCardToCurrentGameCards mutation', () => {
      expect(commit).toHaveBeenCalledWith('pushCardToCurrentGameCards', 'visible-card');
    });

    it('dispatches setVisibleCard action', () => {
      expect(dispatch).toHaveBeenCalledWith('setVisibleCard');
    });
  });

  describe('setInitialCurrentGameCards', () => {
    const commit = jest.fn();

    const rootState = {
      settings: {
        selectedCategories: ['people'],
      },
    };

    it('commits setInitialCurrentGameCards with cards that belong to selected categories', () => {
      const state = {
        allCards: allCardsMock,
      };

      actions.setInitialCurrentGameCards({ commit, state, rootState });

      expect(commit).toHaveBeenCalledWith('clearPlayedCards');
      expect(commit).toHaveBeenCalledWith('setCurrentGameCards', allCardsMock);
    });
  });

  describe('setVisibleCard', () => {
    it('doesn\'t do anything when no cards have been loaded', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      const state = {
        currentGameCards: allCardsMock,
      };

      const getters = {
        areCardsLoaded: false,
      };

      actions.setVisibleCard({
        commit,
        dispatch,
        getters,
        state,
      });

      expect(commit).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('commits setVisibleCard with proper payload', () => {
      const commit = jest.fn();

      const state = {
        currentGameCards: ['card 1'],
      };

      const getters = {
        areCardsLoaded: true,
      };

      actions.setVisibleCard({
        commit,
        getters,
        state,
      });

      expect(commit).toHaveBeenCalledWith(
        'setVisibleCard',
        ['card 1'],
      );
    });
  });
});

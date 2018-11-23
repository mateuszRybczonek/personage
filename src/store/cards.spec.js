import {
  card1,
  card2,
  allCardsMock,
  peopleCards,
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
  test('pushKeywordToPlayedCards', () => {
    const state = { playedCards: [card1] };

    mutations.pushKeywordToPlayedCards(state, card2);
    expect(state.playedCards).toEqual([card1, card2]);
  });

  test('pushCardToVisibleCards', () => {
    const state = { visibleCards: [card1] };

    mutations.pushCardToVisibleCards(state, card2);
    expect(state.visibleCards).toEqual([card1, card2]);
  });

  test('clearPlayedCards', () => {
    const state = { playedCards: [card1, card2] };

    mutations.clearPlayedCards(state);
    expect(state.playedCards).toEqual([]);
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

  test('setVisibleCards', () => {
    const state = { visibleCards: [] };
    const newValue = [card1, card2];

    mutations.setVisibleCards(state, newValue);
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
    const currentGameCards = [
      { keyword: 'a' },
      { keyword: 'b' },
      { keyword: 'c' },
      { keyword: 'd' },
      { keyword: 'e' },
      { keyword: 'f' },
    ];

    context('when it\'s possible to load new card', () => {
      const commit = jest.fn();

      const state = {
        visibleCards: [{ keyword: 'b' }, { keyword: 'c' }, { keyword: 'd' }],
        playedCards: ['a'],
        currentGameCards,
      };

      actions.loadNextCard({ commit, state });

      it('commits pushKeywordToPlayedCards with the first visible card', () => {
        expect(commit).toHaveBeenCalledWith('pushKeywordToPlayedCards', 'b');
      });

      it('commits pushCardToVisibleCards with proper payload', () => {
        expect(commit).toHaveBeenCalledWith('pushCardToVisibleCards', currentGameCards[4]);
      });
    });

    context('when all cards have been already used', () => {
      const dispatch = jest.fn();

      const state = {
        visibleCards: [{ keyword: 'd' }, { keyword: 'e' }, { keyword: 'f' }],
        playedCards: ['a', 'b', 'c'],
        currentGameCards,
      };

      actions.loadNextCard({ dispatch, state });

      it('dispatches resetCurrentGameCards action', () => {
        expect(dispatch).toHaveBeenCalledWith('resetCurrentGameCards');
      });

      it('dispatches itself after reseting played cards and shuffling the stack', () => {
        expect(dispatch).toHaveBeenCalledWith('loadNextCard');
      });
    });
  });

  describe('prepareCards', () => {
    const dispatch = jest.fn();

    actions.prepareCards({ dispatch });

    it('dispatches setCurrentGameCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('setCurrentGameCards');
    });

    it('dispatches setVisibleCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('setVisibleCards');
    });
  });

  describe('resetCurrentGameCards', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions.resetCurrentGameCards({ commit, dispatch });

    it('commits clearPlayedCards', () => {
      expect(commit).toHaveBeenCalledWith('clearPlayedCards');
    });

    it('dispatches setCurrentGameCards action', () => {
      expect(dispatch).toHaveBeenCalledWith('setCurrentGameCards');
    });
  });

  describe('setCurrentGameCards', () => {
    const commit = jest.fn();

    const rootState = {
      settings: {
        selectedCategories: ['people'],
      },
    };

    it('commits setCurrentGameCards with cards that belong to selected categories', () => {
      const state = {
        allCards: allCardsMock,
      };

      actions.setCurrentGameCards({ commit, state, rootState });

      expect(commit).toHaveBeenCalledWith('setCurrentGameCards', peopleCards);
    });
  });

  describe('setVisibleCards', () => {
    it('doesn\'t do anything when no cards have been loaded', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      const state = {
        currentGameCards: allCardsMock,
      };

      const getters = {
        areCardsLoaded: false,
        isNewGame: false,
      };

      actions.setVisibleCards({
        commit,
        dispatch,
        getters,
        state,
      });

      expect(commit).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('commits setVisibleCards with proper paylod', () => {
      const commit = jest.fn();

      const state = {
        currentGameCards: allCardsMock,
        playedCards: [],
      };

      const getters = {
        areCardsLoaded: true,
      };

      actions.setVisibleCards({
        commit,
        getters,
        state,
      });

      expect(commit).toHaveBeenCalledWith(
        'setVisibleCards',
        [allCardsMock[0], allCardsMock[1], allCardsMock[2]],
      );
    });
  });
});

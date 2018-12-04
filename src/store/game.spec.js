import {
  teamA,
  teamB,
  gameStateReady,
  gameStatePlaying,
  gameStateFinished,
} from '@/consts';
import game, { initialState } from './game';

jest.useFakeTimers();

const { mutations, actions, getters } = game;

describe('getters', () => {
  describe('skipsLimitReached', () => {
    const callSkipsLimitReached = ({ limit: skipsLimit, skipped }) => getters.skipsLimitReached({
      currentTeam: 'teamA',
      teamA: {
        skipped,
      },
    }, null, {
      settings: {
        skipsLimit,
      },
    });

    it('returns true if limit has been reached', () => {
      expect(callSkipsLimitReached({
        limit: 5,
        skipped: 5,
      })).toBe(true);

      expect(callSkipsLimitReached({
        limit: 5,
        skipped: 8, // absurd case but still true should be returned
      })).toBe(true);
    });

    it('returns false if limit has not been reached', () => {
      expect(callSkipsLimitReached({
        limit: 10,
        skipped: 5,
      })).toBe(false);
    });
  });

  describe('winner', () => {
    test('More correct answers wins', () => {
      expect(getters.winner({
        teamA: {
          correct: 4,
          incorrect: 0,
          skipped: 0,
          fastestAnswer: null,
        },
        teamB: {
          correct: 2,
          incorrect: 0,
          skipped: 0,
          fastestAnswer: null,
        },
      })).toBe(teamA);
    });

    test('If draw on correct answers - less incorrect answers wins', () => {
      expect(getters.winner({
        teamA: {
          correct: 4,
          incorrect: 3,
          skipped: 0,
          fastestAnswer: null,
        },
        teamB: {
          correct: 4,
          incorrect: 2,
          skipped: 0,
          fastestAnswer: null,
        },
      })).toBe(teamB);
    });

    test('If draw on correct and incorrect answers - less skipped wins', () => {
      expect(getters.winner({
        teamA: {
          correct: 4,
          incorrect: 2,
          skipped: 1,
          fastestAnswer: null,
        },
        teamB: {
          correct: 4,
          incorrect: 2,
          skipped: 3,
          fastestAnswer: null,
        },
      })).toBe(teamA);
    });

    test('If draw on all points except time - fastest answer wins', () => {
      expect(getters.winner({
        teamA: {
          correct: 4,
          incorrect: 2,
          skipped: 0,
          fastestAnswer: 10,
        },
        teamB: {
          correct: 4,
          incorrect: 2,
          skipped: 0,
          fastestAnswer: 8,
        },
      })).toBe(teamB);
    });

    test('If draw - returns null', () => {
      expect(getters.winner({
        teamA: {
          correct: 4,
          incorrect: 0,
          skipped: 1,
          fastestAnswer: 15,
        },
        teamB: {
          correct: 4,
          incorrect: 0,
          skipped: 1,
          fastestAnswer: 15,
        },
      })).toBe(null);
    });
  });
});

describe('mutations', () => {
  test('incrementRound', () => {
    const state = {
      ...initialState,
      currentRound: 2,
    };

    mutations.incrementRound(state);
    expect(state.currentRound).toBe(3);
  });

  test('resetGame', () => {
    const state = {
      ...initialState,
      currentTeam: 'teamB',
      currentRound: 2,
    };

    mutations.resetGame(state);

    expect(state.currentRound).toBe(1);
    expect(state.currentTeam).toBe(teamA);
  });

  test('setFastestAnswer', () => {
    const state = {
      currentTeam: 'teamA',
      teamA: {
        fastestAnswer: 0,
      },
    };

    mutations.setFastestAnswer(state, 25);

    expect(state.teamA.fastestAnswer).toBe(25);
  });
});

describe('actions', () => {
  test('prepareGame', () => {
    const rootState = {
      settings: {
        teamsLimit: 3,
      },
    };

    const commit = jest.fn();
    actions.prepareGame({ commit, rootState });

    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenCalledWith('resetGame');
    expect(commit).toHaveBeenCalledWith('resetTeams', 3);
    expect(commit).toHaveBeenCalledWith('setGameState', gameStateReady);
  });

  test('startGame', () => {
    const commit = jest.fn();
    actions.startGame({ commit });
    expect(commit).toHaveBeenCalledWith('setGameState', gameStatePlaying);
  });

  test('finishGame', () => {
    const commit = jest.fn();
    actions.finishGame({ commit });
    expect(commit).toHaveBeenCalledWith('setGameState', gameStateFinished);
  });

  describe('finishTurn', () => {
    test('team A turn', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      actions.finishTurn({
        commit,
        dispatch,
        state: {
          currentTeam: teamA,
        },
      });

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith('setCurrentTeam', teamB);
      expect(commit).toHaveBeenCalledWith('setGameState', gameStateReady);
    });
  });

  describe('nextRound', () => {
    const rootState = {
      settings: { roundsLimit: 4 },
    };

    test('not last round - go to next', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      actions.nextRound({
        commit,
        dispatch,
        rootState,
        state: {
          currentRound: 1,
        },
      });

      expect(commit).toHaveBeenCalledTimes(3);
      expect(commit).toHaveBeenCalledWith('incrementRound');
      expect(commit).toHaveBeenCalledWith('setCurrentTeam', teamA);
      expect(commit).toHaveBeenCalledWith('setGameState', gameStateReady);
    });

    test('last round - finish game', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      actions.nextRound({
        commit,
        dispatch,
        rootState,
        state: {
          currentRound: 3,
        },
      });

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('finishGame');
    });
  });

  describe('updateFastestAnswerTime', () => {
    const getState = time => ({
      currentTeam: 'teamA',
      teamA: {
        fastestAnswer: time,
      },
    });

    it('commits setFastestAnswer with proper time when initial value is null', () => {
      const commit = jest.fn();

      actions.updateFastestAnswerTime({
        commit,
        state: getState(null),
      }, 20);

      expect(commit).toHaveBeenCalledWith('setFastestAnswer', 20);
    });

    it('commits setFastestAnswer if passed time < current time', () => {
      const commit = jest.fn();

      actions.updateFastestAnswerTime({
        commit,
        state: getState(30),
      }, 25);

      expect(commit).toHaveBeenCalledWith('setFastestAnswer', 25);
    });

    it('doesn\'t commit setFastestAnswer if passed time == current time', () => {
      const commit = jest.fn();

      actions.updateFastestAnswerTime({
        commit,
        state: getState(25),
      }, 25);

      expect(commit).not.toHaveBeenCalled();
    });

    it('doesn\'t commit setFastestAnswer if passed time > current time', () => {
      const commit = jest.fn();

      actions.updateFastestAnswerTime({
        commit,
        state: getState(25),
      }, 30);

      expect(commit).not.toHaveBeenCalled();
    });
  });
});

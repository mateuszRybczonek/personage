import timer from './timer';

const { mutations, actions, getters } = timer;
jest.useFakeTimers();

const rootState = {
  settings: {
    timeLimit: 60,
  },
};

describe('mutations', () => {
  test('increment', () => {
    const state = {
      timePassed: 0,
    };

    mutations.increment(state);

    expect(state.timePassed).toBe(1);
  });

  test('resetTimer', () => {
    const state = {
      timePassed: 30,
      isRunning: true,
    };

    mutations.resetTimer(state);

    expect(state.timePassed).toBe(0);
    expect(state.isRunning).toBe(false);
  });
});

describe('actions', () => {
  test('startTimer', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    actions.startTimer({ dispatch, commit });

    jest.runTimersToTime(10000);

    expect(dispatch).toHaveBeenCalledTimes(10);
    expect(dispatch).toHaveBeenCalledWith('incrementTimer');
  });

  test('pauseTimer', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    actions.startTimer({ dispatch, commit });

    jest.runTimersToTime(10000);

    actions.pauseTimer({ commit });

    jest.runTimersToTime(10000);

    expect(dispatch).toHaveBeenCalledTimes(10);
    expect(commit).toHaveBeenCalledWith('setIsRunning', false);
  });

  test('resetTimer', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    actions.resetTimer({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith('pauseTimer');
    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('resetTimer');
  });

  describe('incrementTimer', () => {
    it('increments the counter', () => {
      const dispatch = jest.fn();
      const commit = jest.fn();

      actions.incrementTimer({
        state: {
          timePassed: 0,
        },
        rootState,
        dispatch,
        commit,
      });

      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(commit).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('increment');
    });

    it('finishes counting if hits the limit', () => {
      const dispatch = jest.fn();
      const commit = jest.fn();

      actions.incrementTimer({
        state: {
          timePassed: 60,
        },
        rootState,
        dispatch,
        commit,
      });

      expect(commit).toHaveBeenCalledTimes(0);
      expect(dispatch).toHaveBeenCalledWith('pauseTimer');
    });
  });
});

describe('getters', () => {
  test('timeLeft', () => {
    const result = getters.timeLeft(
      { timePassed: 20 },
      {},
      rootState,
    );

    expect(result).toBe(40);
  });

  describe('hurryUp', () => {
    context('when timer isRunning', () => {
      const isRunning = true;

      it('returns true if timeLeft is less than 10 seconds, but not 0', () => {
        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 10 },
        )).toBe(true);

        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 1 },
        )).toBe(true);
      });

      it('returns false if more than 10 seconds left', () => {
        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 20 },
        )).toBe(false);
      });

      it('returns false if 0 seconds left', () => {
        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 0 },
        )).toBe(false);
      });
    });

    context('when time !isRunning', () => {
      const isRunning = false;

      it('returns false always', () => {
        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 0 },
        )).toBe(false);

        expect(getters.hurryUp(
          { isRunning },
          { timeLeft: 30 },
        )).toBe(false);
      });
    });
  });
});

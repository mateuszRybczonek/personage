let interval;

export default {
  namespaced: true,

  state: {
    timePassed: 0,
    isRunning: false,
  },

  mutations: {
    increment(state) {
      state.timePassed += 1;
    },
    resetTimer(state) {
      state.timePassed = 0;
      state.isRunning = false;
    },
    setIsRunning(state, val) {
      state.isRunning = val;
    },
  },

  actions: {
    startTimer({ dispatch, commit }) {
      commit('setIsRunning', true);
      interval = setInterval(() => dispatch('incrementTimer'), 1000);
    },

    pauseTimer({ commit }) {
      commit('setIsRunning', false);
      clearInterval(interval);
    },

    resetTimer({ commit, dispatch }) {
      dispatch('pauseTimer');
      commit('resetTimer');
    },

    incrementTimer({
      dispatch, commit, state, rootState,
    }) {
      if (state.timePassed === rootState.settings.timeLimit) {
        dispatch('pauseTimer');
        return;
      }

      commit('increment');
    },
  },

  getters: {
    timeLeft: (state, getters, rootState) => rootState.settings.timeLimit - state.timePassed,
    hurryUp: (state, getters) => getters.timeLeft <= 10 && getters.timeLeft >= 1 && state.isRunning,
  },
};

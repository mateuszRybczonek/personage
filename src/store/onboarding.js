export default {
  namespaced: true,
  state: {
    isFinished: false,
    previousRouteName: 'home',
  },
  mutations: {
    finishOnboarding(state) {
      state.isFinished = true;
    },
    setPreviousRouteName(state, routeName) {
      if (routeName) {
        state.previousRouteName = routeName;
      }
    },
  },
};

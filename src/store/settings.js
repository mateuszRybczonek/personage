const arrEq = (arr1, arr2) => arr1.join(',') === arr2.join(',');
const getLastCategories = categories => categories.slice();

export default {
  namespaced: true,
  state: {
    skipsLimit: 3,
    timeLimit: 60,
    roundsLimit: 10,
    sound: false,
    teamAEmoji: 1,
    teamBEmoji: 9,
    selectedCategories: [],
    toggledCategoriesStack: [],
    isPauseTooltipVisible: true,
  },
  getters: {
    roundsLimit: state => state.roundsLimit,
    skipsLimit: state => state.skipsLimit,
    sound: state => state.sound,
    timeLimit: state => state.timeLimit,
    isPauseTooltipVisible: state => state.isPauseTooltipVisible,
  },
  mutations: {
    setRoundsLimit(state, roundsLimit) {
      state.roundsLimit = roundsLimit;
    },
    setSkipsLimit(state, skipsLimit) {
      state.skipsLimit = skipsLimit;
    },
    setTimeLimit(state, timeLimit) {
      state.timeLimit = timeLimit;
    },
    setSound(state, sound) {
      state.sound = sound;
    },
    setTeamAEmoji(state, emoji) {
      state.teamAEmoji = emoji;
    },
    setTeamBEmoji(state, emoji) {
      state.teamBEmoji = emoji;
    },
    hidePauseTooltip(state) {
      state.isPauseTooltipVisible = false;
    },
    toggleCategory(state, category) {
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
  },
};

export default {
  namespaced: true,
  state: {
    cardsLimit: 40,
    skipsLimit: 3,
    timeLimit: 60,
    teamsLimit: 2,
    sound: false,
    teamAEmoji: 1,
    teamBEmoji: 9,
    selectedCategories: [],
    toggledCategoriesStack: [],
    isPauseTooltipVisible: true,
  },
  getters: {
    cardsLimit: state => state.cardsLimit,
    numberOfTeams: state => state.teamsLimit,
    skipsLimit: state => state.skipsLimit,
    sound: state => state.sound,
    timeLimit: state => state.timeLimit,
    isPauseTooltipVisible: state => state.isPauseTooltipVisible,
  },
  mutations: {
    setCardsLimit(state, cardsLimit) {
      state.cardsLimit = cardsLimit;
    },
    setTeamsLimit(state, teamsLimit) {
      state.teamsLimit = teamsLimit;
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

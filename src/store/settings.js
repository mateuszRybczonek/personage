import {
  teamA,
  teamB,
  teamC,
  teamD,
  teamE,
  teamF,
  teamG,
  teamH,
  teamI,
  teamJ,
} from '../consts';

export default {
  namespaced: true,
  state: {
    cardsLimit: 40,
    skipsLimit: 3,
    timeLimit: 60,
    teamsLimit: 2,
    sound: false,
    emojis: {
      teamA: 1,
      teamB: 1,
    },
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
    activeTeams: state => state.activeTeams,
  },
  mutations: {
    setCardsLimit(state, cardsLimit) {
      state.cardsLimit = cardsLimit;
    },
    setTeamsLimit(state, teamsLimit) {
      state.teamsLimit = teamsLimit;
      state.emojis = {
        teamA: 1,
        teamB: 1,
      };

      if (teamsLimit > 2) {
        state.emojis[teamC] = 1;
      }
      if (teamsLimit > 3) {
        state.emojis[teamD] = 1;
      }
      if (teamsLimit > 4) {
        state.emojis[teamE] = 1;
      }
      if (teamsLimit > 5) {
        state.emojis[teamF] = 1;
      }
      if (teamsLimit > 6) {
        state.emojis[teamG] = 1;
      }
      if (teamsLimit > 7) {
        state.emojis[teamH] = 1;
      }
      if (teamsLimit > 8) {
        state.emojis[teamI] = 1;
      }
      if (teamsLimit > 9) {
        state.emojis[teamJ] = 1;
      }
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
    setTeamEmoji(state, payload) {
      const { team, emoji } = payload;
      state.emojis[team] = emoji;
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

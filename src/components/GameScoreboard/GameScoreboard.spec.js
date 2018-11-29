import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import GameTeamScore from '@/components/GameTeamScore/GameTeamScore';
import GameTimer from '@/components/GameTimer/GameTimer';
import PauseTooltip from '@/components/PauseTooltip/PauseTooltip';
import timer from '@/store/timer';
import { gameStateReady } from '@/consts';

import GameScoreboard from './GameScoreboard';

describe('GameScoreboard', () => {
  const setup = () => {
    const settingsGetters = {
      isPauseTooltipVisible: jest.fn(),
      emojis: jest.fn(),
    };

    settingsGetters.isPauseTooltipVisible.mockReturnValue(true);
    settingsGetters.emojis.mockReturnValue({ teamA: 0 });

    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      modules: {
        game: {
          namespaced: true,
          state: {
            gameState: gameStateReady,
            teamA: {
              correct: 1,
              skipped: 3,
            },
          },
        },
        settings: {
          namespaced: true,
          state: {
            skipsLimit: 6,
            timeLimit: 60,
            isPauseTooltipVisible: true,
          },
          getters: settingsGetters,
        },
        timer,
      },
    });

    const wrapper = shallowMount(GameScoreboard, {
      localVue,
      store,
      propsData: {
        currentTeam: 'teamA',
      },
    });

    return { wrapper };
  };

  context('default state', () => {
    const { wrapper } = setup();

    it('renders with proper number of GameTeamScore components', () => {
      expect(wrapper.findAll(GameTeamScore)).toHaveLength(1);
    });

    it('renders GameTimer component', () => {
      expect(wrapper.findAll(GameTimer)).toHaveLength(1);
    });

    it('renders PauseTooltip component', () => {
      expect(wrapper.findAll(PauseTooltip)).toHaveLength(1);
    });
  });

  describe('computed properties', () => {
    const { wrapper } = setup();

    context('teamData', () => {
      it('returns proper object', () => {
        expect(wrapper.vm.teamData).toEqual({
          correct: 1,
          emoji: 0,
          skipped: 3,
        });
      });
    });
  });
});

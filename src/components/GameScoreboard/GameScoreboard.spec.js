import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import GameTeamScore from '@/components/GameTeamScore/GameTeamScore';
import GameTimer from '@/components/GameTimer/GameTimer';
import PauseTooltip from '@/components/PauseTooltip/PauseTooltip';
import timer from '@/store/timer';
import { gameStateReady } from '@/consts';

import GameScoreboard from './GameScoreboard';

jest.mock('lottie-web', () => ({}));

describe('GameScoreboard', () => {
  const setup = () => {
    const gameGetters = {
      isTeamATurn: jest.fn(),
      isTeamBTurn: jest.fn(),
    };

    gameGetters.isTeamATurn.mockReturnValue(true);
    gameGetters.isTeamBTurn.mockReturnValue(false);

    const settingsGetters = {
      isPauseTooltipVisible: jest.fn(),
    };

    settingsGetters.isPauseTooltipVisible.mockReturnValue(true);

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
            teamB: {
              correct: 3,
              skipped: 1,
            },
          },
          getters: gameGetters,
        },
        settings: {
          namespaced: true,
          state: {
            skipsLimit: 6,
            timeLimit: 60,
            teamAEmoji: 0,
            teamBEmoji: 9,
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
    });

    return { wrapper };
  };

  context('default state', () => {
    const { wrapper } = setup();

    it('renders with proper number of GameTeamScore components', () => {
      expect(wrapper.findAll(GameTeamScore)).toHaveLength(2);
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

    context('teamAData', () => {
      it('returns proper object', () => {
        expect(wrapper.vm.teamAData).toEqual({
          correct: 1,
          emoji: 0,
          skipped: 3,
        });
      });
    });

    context('teamBData', () => {
      it('returns proper object', () => {
        expect(wrapper.vm.teamBData).toEqual({
          correct: 3,
          emoji: 9,
          skipped: 1,
        });
      });
    });
  });
});

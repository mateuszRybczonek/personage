import { shallowMount, createLocalVue } from '@vue/test-utils';
import installFilters from '@/filters';
import {
  gameStatePlaying,
  gameStatePaused,
  gameStateReady,
} from '@/consts';
import GameTimer from './GameTimer';

const baseTimeLimit = 10;
const localVue = createLocalVue();

installFilters(localVue);

describe('GameTimer', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameTimer, {
      localVue,
      propsData: {
        gameState: 'ready',
        timeLeft: baseTimeLimit,
        timeLimit: baseTimeLimit,
        ...props,
      },
    });

    return { wrapper };
  };

  describe('basic render', () => {
    const { wrapper } = setup();

    it('with proper stroke-dasharray value when remaining time is 100%', () => {
      expect(wrapper.find('[data-test="game-timer-path-remaining"]').attributes()['stroke-dasharray']).toBe('290 500');
    });

    it('with proper time label', () => {
      expect(wrapper.find('[data-test="game-timer-label"]').text()).toBe('0:10');
    });
  });

  describe('computed properties', () => {
    const { wrapper } = setup();

    context('timeFraction', () => {
      it('returns 1 on initial state', () => {
        expect(wrapper.vm.timeFraction).toBe(1);
      });


      it('returns 0.5 when timeLeft is 50% of initialTime', () => {
        wrapper.setProps({ timeLeft: 5 });
        expect(wrapper.vm.timeFraction).toBe(0.45);
      });

      it('returns 0 when timeLeft is 0 ', () => {
        wrapper.setProps({ timeLeft: 0 });
        expect(wrapper.vm.timeFraction).toBe(-0.1);
      });
    });

    context('circleDasharray', () => {
      it('returns proper value on initial state', () => {
        wrapper.setProps({ timeLeft: 10 });
        expect(wrapper.vm.circleDasharray).toBe('290 500');
      });


      it('returns proper value when timeFraction is 0.5', () => {
        wrapper.setProps({ timeLeft: 5 });
        expect(wrapper.vm.circleDasharray).toBe('131 500');
      });

      it('returns proper value when timeFraction is 0 ', () => {
        wrapper.setProps({ timeLeft: 0 });
        expect(wrapper.vm.circleDasharray).toBe('-29 500');
      });
    });
  });

  describe('methods', () => {
    describe('toggleTimer', () => {
      it('emits "pauseGame" event, when current game is being played', () => {
        const { wrapper } = setup({ gameState: gameStatePlaying });

        wrapper.vm.toggleTimer();
        expect(wrapper.emitted('pauseGame')).toBeTruthy();
      });

      it('emits "pauseGame" event, when current game state is ready', () => {
        const { wrapper } = setup({ gameState: gameStateReady });

        wrapper.vm.toggleTimer();
        expect(wrapper.emitted('pauseGame')).toBeTruthy();
      });

      it('emits "resumeGame" event, when current game is being paused', () => {
        const { wrapper } = setup({ gameState: gameStatePaused });

        wrapper.vm.toggleTimer();
        expect(wrapper.emitted('resumeGame')).toBeTruthy();
      });
    });
  });

  describe('watchers', () => {
    describe('timeLeft', () => {
      it('emits "timesUp" event, when time has passed', () => {
        const { wrapper } = setup({ gameState: gameStatePlaying });

        wrapper.setProps({ timeLeft: 0 });
        expect(wrapper.emitted('timesUp')).toBeTruthy();
      });
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import GameCard from './GameCard';

jest.useFakeTimers();

describe('GameCard', () => {
  const setup = (props) => {
    const wrapper = shallowMount(GameCard, {
      propsData: {
        card: {
          keyword: 'Server',
          forbiddenWords: ['Deploy', 'Machine', 'Application', 'Cloud'],
        },
        isCurrent: true,
        ...props,
      },
    });

    return { wrapper };
  };

  describe('renders', () => {
    const { wrapper } = setup();

    it('with keyword', () => {
      expect(wrapper.text()).toContain('Server');
    });

    it('with forbidden words', () => {
      expect(wrapper.findAll('[data-test="forbidden-word"]')).toHaveLength(4);
      expect(wrapper.text()).toContain('Deploy');
      expect(wrapper.text()).toContain('Machine');
      expect(wrapper.text()).toContain('Application');
      expect(wrapper.text()).toContain('Cloud');
    });
  });

  describe('correctAnswer method', () => {
    const { wrapper } = setup();

    wrapper.vm.playCard = jest.fn();
    wrapper.vm.interactSetPosition = jest.fn();
    wrapper.vm.hideCard = jest.fn();

    wrapper.vm.correctAnswer();

    it('calls playCard method', () => {
      expect(wrapper.vm.playCard).toHaveBeenCalledTimes(1);
    });

    it('calls interactSetPosition method with proper arguments', () => {
      expect(wrapper.vm.interactSetPosition).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.interactSetPosition).toHaveBeenCalledWith({
        rotation: 15,
        x: 500,
      });
    });

    it('emits "correctAnswer" event', () => {
      expect(wrapper.emitted('correctAnswer')).toBeTruthy();
    });

    it('calls hideCard method', () => {
      expect(wrapper.vm.hideCard).toHaveBeenCalledTimes(1);
    });
  });

  describe('incorrectAnswer method', () => {
    const { wrapper } = setup();

    wrapper.vm.playCard = jest.fn();
    wrapper.vm.interactSetPosition = jest.fn();
    wrapper.vm.hideCard = jest.fn();

    wrapper.vm.incorrectAnswer();

    it('calls playCard method', () => {
      expect(wrapper.vm.playCard).toHaveBeenCalledTimes(1);
    });

    it('calls interactSetPosition method with proper arguments', () => {
      expect(wrapper.vm.interactSetPosition).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.interactSetPosition).toHaveBeenCalledWith({
        rotation: -15,
        x: -500,
      });
    });

    it('emits "incorrectAnswer" event', () => {
      expect(wrapper.emitted('incorrectAnswer')).toBeTruthy();
    });

    it('calls hideCard method', () => {
      expect(wrapper.vm.hideCard).toHaveBeenCalledTimes(1);
    });
  });

  describe('skipCard method', () => {
    context('with skip enabled', () => {
      const { wrapper } = setup();

      wrapper.vm.playCard = jest.fn();
      wrapper.vm.interactSetPosition = jest.fn();
      wrapper.vm.hideCard = jest.fn();

      wrapper.vm.skipCard();

      it('calls playCard method', () => {
        expect(wrapper.vm.playCard).toHaveBeenCalledTimes(1);
      });

      it('emits "cardSkipped" event', () => {
        expect(wrapper.emitted('cardSkipped')).toBeTruthy();
      });

      it('calls interactSetPosition method with proper arguments', () => {
        expect(wrapper.vm.interactSetPosition).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.interactSetPosition).toHaveBeenCalledWith({
          y: 600,
        });
      });

      it('calls hideCard method', () => {
        expect(wrapper.vm.hideCard).toHaveBeenCalledTimes(1);
      });
    });

    context('with skip disabled', () => {
      const { wrapper } = setup({
        isSkipDisabled: true,
      });

      wrapper.vm.playCard = jest.fn();
      wrapper.vm.interactSetPosition = jest.fn();
      wrapper.vm.hideCard = jest.fn();

      wrapper.vm.skipCard();

      it('doesn\'t call playCard method', () => {
        expect(wrapper.vm.playCard).not.toHaveBeenCalled();
      });

      it('doesn\'t call interactSetPosition method', () => {
        expect(wrapper.vm.interactSetPosition).not.toHaveBeenCalled();
      });

      it('doesn\'t emit "cardSkipped" event', () => {
        expect(wrapper.emitted('cardSkipped')).not.toBeTruthy();
      });

      it('doesn\'t call hideCard method', () => {
        expect(wrapper.vm.hideCard).not.toHaveBeenCalled();
      });
    });
  });

  describe('hideCard method', () => {
    const { wrapper } = setup();

    wrapper.setData({
      showing: true,
    });

    wrapper.vm.skipCard();
    jest.runTimersToTime(800);

    it('sets showing to false after specified amount of time', () => {
      expect(wrapper.vm.showing).toEqual(false);
    });
  });

  describe('playCard method', () => {
    const { wrapper } = setup();

    wrapper.vm.interactUnsetElement = jest.fn();
    wrapper.vm.playCard();

    it('calls interactUnsetElement method', () => {
      expect(wrapper.vm.interactUnsetElement).toHaveBeenCalledTimes(1);
    });
  });
});

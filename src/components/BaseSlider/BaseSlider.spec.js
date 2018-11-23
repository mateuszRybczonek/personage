import { shallowMount } from '@vue/test-utils';
import rangesliderJs from 'rangeslider-js';
import InfiniteIcon from '@/assets/infinite.svg';
import BaseSlider from './BaseSlider';

jest.mock('rangeslider-js', () => ({
  create: jest.fn(),
}));

describe('BaseSlider', () => {
  const setup = (props = { withRangeLabels: true, withValue: true }) => {
    const rangeLabels = props.withRangeLabels ? [
      { label: 0 },
      { label: 2 },
      { label: { component: InfiniteIcon } },
    ] : null;

    const value = props.withValue ? 6 : null;

    const wrapper = shallowMount(BaseSlider, {
      propsData: {
        label: 'Slider label: 6',
        inputId: 'someSlider',
        min: 0,
        max: 12,
        rangeLabels,
        step: 1,
        value,
      },
    });

    return { wrapper };
  };

  context('renders with range labels', () => {
    const { wrapper } = setup();

    it('with proper slider label', () => {
      expect(wrapper.find('[data-test="slider-label"]').text()).toBe('Slider label: 6');
    });

    it('with slider input', () => {
      expect(wrapper.findAll('[data-test="slider-input"]')).toHaveLength(1);
    });

    it('with proper number of range text items', () => {
      expect(wrapper.findAll('[data-test="slider-range-text"]')).toHaveLength(2);
    });

    it('with proper range text labels', () => {
      expect(wrapper.find('[data-test="slider-range-labels"]').text().includes('0')).toBe(true);
      expect(wrapper.find('[data-test="slider-range-labels"]').text().includes('2')).toBe(true);
    });

    it('with proper number of range image items', () => {
      expect(wrapper.findAll('[data-test="slider-range-image"]')).toHaveLength(1);
    });

    it('with proper range image label', () => {
      expect(wrapper.findAll(InfiniteIcon)).toHaveLength(1);
    });
  });

  context('renders without range labels', () => {
    const { wrapper } = setup({ withRangeLabels: false, withValue: true });

    it('with proper slider label', () => {
      expect(wrapper.find('[data-test="slider-label"]').text()).toBe('Slider label: 6');
    });

    it('with slider input', () => {
      expect(wrapper.findAll('[data-test="slider-input"]')).toHaveLength(1);
    });

    it('without range labels', () => {
      expect(wrapper.findAll('[data-test="slider-range-labels"]')).toHaveLength(0);
    });
  });

  it('destroys slider on "beforeDestroy"', () => {
    const { wrapper } = setup();

    const sliderDestroySpy = jest.fn();
    const slider = { destroy: sliderDestroySpy };

    wrapper.setData({ slider });
    wrapper.destroy();

    expect(sliderDestroySpy).toHaveBeenCalledTimes(1);
  });

  it('emits "input" event on "beforeMount", when no value is passed to the component', () => {
    const { wrapper } = setup({ withRangeLabels: true, withValue: false });

    expect(wrapper.emitted('input')[0][0]).toBe(0);
  });

  it('calls create on rangesliderJs on "mounted"', () => {
    expect(rangesliderJs.create).toHaveBeenCalled();
  });

  describe('isValidTextLabel method', () => {
    const { wrapper } = setup();

    it('returns true if value is a finite Number', () => {
      expect(wrapper.vm.isValidTextLabel(1)).toBe(true);
    });

    it('returns true if value is a String', () => {
      expect(wrapper.vm.isValidTextLabel('Pikachu')).toBe(true);
    });

    it('returns false if value is an infinite Number', () => {
      expect(wrapper.vm.isValidTextLabel(1 / 0)).toBe(false);
    });

    it('returns false if value is an Object', () => {
      expect(wrapper.vm.isValidTextLabel({ src: '../assets/pikachu.svg' })).toBe(false);
    });

    it('returns false if value is a Boolean', () => {
      expect(wrapper.vm.isValidTextLabel(true)).toBe(false);
    });
  });

  describe('isValidImageLabel method', () => {
    const { wrapper } = setup();

    it('returns true if value is an Object', () => {
      expect(wrapper.vm.isValidImageLabel({ src: '../assets/pikachu.svg' })).toBe(true);
    });

    it('returns false if value is a Number', () => {
      expect(wrapper.vm.isValidImageLabel(1)).toBe(false);
    });

    it('returns false if value is a String', () => {
      expect(wrapper.vm.isValidImageLabel('Pikachu')).toBe(false);
    });

    it('returns false if value is a Boolean', () => {
      expect(wrapper.vm.isValidImageLabel(true)).toBe(false);
    });
  });
});

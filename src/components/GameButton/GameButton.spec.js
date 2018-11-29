import { shallowMount } from '@vue/test-utils';
import GameButton from './GameButton';

describe('GameButton', () => {
  it('renders properly without label', () => {
    const wrapper = shallowMount(GameButton, {
      slots: {
        default: 'Text',
      },
    });

    expect(wrapper.text()).toContain('Text');
    expect(wrapper.findAll('[data-test="button-label"]')).toHaveLength(0);
  });

  it('renders with "label" slot', () => {
    const wrapper = shallowMount(GameButton, {
      slots: {
        default: 'Text',
        label: '<span>Label</span>',
      },
    });

    expect(wrapper.text()).toContain('Text');
    expect(wrapper.text()).toContain('Label');
    expect(wrapper.findAll('[data-test="button-label"]')).toHaveLength(1);
  });
});

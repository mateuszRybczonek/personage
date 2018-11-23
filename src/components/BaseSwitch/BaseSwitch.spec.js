import { shallowMount } from '@vue/test-utils';
import BaseSwitch from './BaseSwitch';

describe('BaseSwitch', () => {
  const setup = () => {
    const wrapper = shallowMount(BaseSwitch, {
      propsData: {
        checked: false,
        name: 'switch',
      },
    });

    return { wrapper };
  };

  context('renders with range labels', () => {
    const { wrapper } = setup();

    it('with slider input', () => {
      expect(wrapper.findAll('[data-test="switch-input"]')).toHaveLength(1);
    });

    it('with switch', () => {
      expect(wrapper.findAll('[data-test="switch-handle"]')).toHaveLength(1);
    });
  });

  it('emits "change" event on "mount" with proper value', () => {
    const { wrapper } = setup();

    expect(wrapper.emitted('change')[0][0]).toBe(false);
  });

  it('emits "change" events with proper value when user clicks on the switch', async () => {
    // TODO: Figure out how to trigger tap event
  });
});

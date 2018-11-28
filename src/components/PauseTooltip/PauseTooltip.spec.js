import { shallowMount } from '@vue/test-utils';
import PauseTooltip from './PauseTooltip';

describe('PauseTooltip', () => {
  it('renders with proper content', () => {
    const wrapper = shallowMount(PauseTooltip, {
      mocks: {
        $t: t => t,
      },
    });

    expect(wrapper.text()).toContain('views.game.pause_tooltip');
  });
});

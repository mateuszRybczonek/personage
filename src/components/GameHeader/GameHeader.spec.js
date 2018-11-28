import { shallowMount } from '@vue/test-utils';
import GameHeader from './GameHeader';
import ConnectionStatus from '../ConnectionStatus/ConnectionStatus';

describe('GameHeader', () => {
  const wrapper = shallowMount(GameHeader, {
    propsData: {
      roundNumber: 2,
      teamName: 'Gumisie',
    },
    mocks: {
      $t: key => key,
    },
  });

  it('renders with round indicator', () => {
    expect(wrapper.find('[data-test="game-header-round"]').text()).toContain('2');
  });

  it('renders with current team name', () => {
    expect(wrapper.find('[data-test="game-header-round"]').text()).toContain('Gumisie');
  });

  it('renders the ConnectionStatus component', () => {
    expect(wrapper.find(ConnectionStatus).exists()).toBe(true);
  });

  it('renders dotted menu', () => {
    expect(wrapper.find('[data-test="header-nav"]').exists()).toBe(true);
  });

  it('emits "togglePause" event after cliking on dotted menu', () => {
    wrapper.find('[data-test="header-nav"]').trigger('click');
    expect(wrapper.emitted('togglePause')).toBeTruthy();
  });
});

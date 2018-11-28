import { shallowMount } from '@vue/test-utils';
import OfflineIcon from '@/assets/wifi-off.svg';
import ConnectionStatus from './ConnectionStatus';

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

describe('ConnectionStatus', () => {
  context('online', () => {
    const wrapper = shallowMount(ConnectionStatus, {
      mocks: {
        $t: t => t,
      },
    });

    it('doesn\'t render anything', () => {
      expect(wrapper.find('[data-test="connection-status"]').exists()).toBe(false);
    });
  });

  context('offline', () => {
    const wrapper = shallowMount(ConnectionStatus, {
      mocks: {
        $t: t => t,
      },
    });

    wrapper.setData({
      isOnline: false,
    });

    it('renders connection status', () => {
      expect(wrapper.text()).toBe('game.offline');
    });

    it('renders connection icon', () => {
      expect(wrapper.find(OfflineIcon).exists()).toBe(true);
    });
  });
});

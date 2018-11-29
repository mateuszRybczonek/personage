import { shallowMount, createLocalVue } from '@vue/test-utils';
import GameStarter from './GameStarter';

const localVue = createLocalVue();
localVue.filter('teamName', val => val);

describe('GameStarter', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameStarter, {
      localVue,
      propsData: {
        currentTeam: 'teamA',
        currentRound: 1,
        emoji: 1,
        ...props,
      },
      mocks: {
        $t: t => t,
      },
    });

    return { wrapper };
  };

  context('Team A', () => {
    it('renders properly', () => {
      const { wrapper } = setup();

      expect(wrapper.text()).toContain('teamA');
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import Animation from '@/components/Animation/Animation';
import GameStarter from './GameStarter';

jest.mock('lottie-web', () => ({}));

describe('GameStarter', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameStarter, {
      propsData: {
        isTeamATurn: true,
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

  it('renders proper Emoji', () => {
    const { wrapper } = setup();

    expect(wrapper.find(Animation).props('path')).toContain('happy/1.json');
  });

  context('Team A', () => {
    it('renders initial view if it\'s the first round', () => {
      const { wrapper } = setup();

      expect(wrapper.text()).toContain('general.team_a');
      expect(wrapper.text()).toContain('views.game.begins');
    });

    it('renders normal view after first round', () => {
      const { wrapper } = setup({
        isTeamATurn: true,
        currentRound: 2,
      });

      expect(wrapper.text()).toContain('general.team_a');
      expect(wrapper.text()).not.toContain('views.game.begins');
    });
  });

  context('Team B', () => {
    it('renders normal view regardless of the round', () => {
      const { wrapper } = setup({
        isTeamATurn: false,
      });
      expect(wrapper.text()).toContain('general.team_b');
      expect(wrapper.text()).not.toContain('views.game.begins');
    });
  });
});

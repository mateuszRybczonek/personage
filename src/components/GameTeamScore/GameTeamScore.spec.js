import { shallowMount, createLocalVue } from '@vue/test-utils';
import GameTeamScore from './GameTeamScore';

const localVue = createLocalVue();
localVue.filter('skipsLimit', val => val);

describe('GameTeamScore', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameTeamScore, {
      localVue,
      propsData: {
        skipsLimit: props.skipsLimit,
        teamData: {
          correct: 4,
          emoji: 0,
          skipped: 3,
        },
      },
    });

    return { wrapper };
  };

  context('with default values', () => {
    const { wrapper } = setup({ skipsLimit: 5 });

    it('renders proper value of correct answers', () => {
      expect(wrapper.find('[data-test="team-scores-correct"]').text()).toBe('4');
    });

    it('renders proper value of skips', () => {
      expect(wrapper.find('[data-test="team-scores-skips"]').text()).toBe('3/5');
    });
  });

  context('when skips limit is 0', () => {
    const { wrapper } = setup({ skipsLimit: 0 });

    it('renders without skips info', () => {
      expect(wrapper.findAll('[data-test="team-scores-skips"]')).toHaveLength(0);
    });
  });
});

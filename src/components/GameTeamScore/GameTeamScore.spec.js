import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  DEFAULT_TEST_CORRECT,
  DEFAULT_TEST_EMOJI,
  DEFAULT_TEST_SKIPPED,
} from '@/utils/mocks';
import GameTeamScore from './GameTeamScore';

jest.mock('lottie-web', () => ({}));

const localVue = createLocalVue();
localVue.filter('skipsLimit', val => val);

describe('GameTeamScore', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameTeamScore, {
      localVue,
      propsData: {
        reverse: false,
        skipsLimit: props.skipsLimit,
        team: {
          correct: DEFAULT_TEST_CORRECT,
          emoji: DEFAULT_TEST_EMOJI,
          skipped: DEFAULT_TEST_SKIPPED,
        },
      },
    });

    return { wrapper };
  };

  context('with default values', () => {
    const { wrapper } = setup({ skipsLimit: 5 });

    it('renders proper emoji', () => {
      expect(wrapper.find('[data-test="team-emoji"]').attributes().path).toContain('0.json');
    });

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

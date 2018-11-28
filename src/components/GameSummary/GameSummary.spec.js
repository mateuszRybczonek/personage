import { shallowMount, createLocalVue } from '@vue/test-utils';
import { teamA, teamB } from '@/consts';
import GameSummary from './GameSummary';

const localVue = createLocalVue();
localVue.filter('time', val => val);
jest.mock('lottie-web', () => ({}));

const teamAPayload = {
  emoji: 1,
  correct: 10,
  incorrect: 3,
  skipped: 2,
  fastestAnswer: 30,
};

const teamBPayload = {
  emoji: 5,
  correct: 12,
  incorrect: 6,
  skipped: 1,
  fastestAnswer: 35,
};

describe('GameSummary', () => {
  const setup = (props = {}) => {
    const wrapper = shallowMount(GameSummary, {
      localVue,
      propsData: {
        winner: null,
        teamA: teamAPayload,
        teamB: teamBPayload,
        ...props,
      },
      mocks: {
        $t: t => t,
      },
    });

    return { wrapper };
  };

  describe('title', () => {
    it('renders "Draw" when there is no winner', () => {
      const { wrapper } = setup();
      expect(wrapper.find('[data-test="title"]').text()).toBe('views.summary.draw');
    });

    it('renders properly when team A wins', () => {
      const { wrapper } = setup({ winner: teamA });
      expect(wrapper.find('[data-test="title"]').text()).toBe('views.summary.team_a_wins');
    });

    it('renders properly when team B wins', () => {
      const { wrapper } = setup({ winner: teamB });
      expect(wrapper.find('[data-test="title"]').text()).toBe('views.summary.team_b_wins');
    });
  });

  it('renders winners emoji', () => {
    const { wrapper } = setup({ winner: teamA });
    expect(wrapper.find('[data-test="winner-emoji"]').props('path')).toContain('/1.json');
  });

  describe('table', () => {
    const { wrapper } = setup({ winner: teamB });

    it('renders sad emoji for looser', () => {
      expect(wrapper.find('[data-test="team-a-emoji"]').props('path')).toContain('/sad/1.json');
    });

    it('renders happy emoji for winner', () => {
      expect(wrapper.find('[data-test="team-b-emoji"]').props('path')).toContain('/happy/5.json');
    });

    it('renders proper data', () => {
      const find = (key, index) => wrapper.findAll(`tr[data-test="${key}"] td`).at(index);

      expect(Number(find('row-correct', 1).text())).toBe(teamAPayload.correct);
      expect(Number(find('row-correct', 2).text())).toBe(teamBPayload.correct);

      expect(Number(find('row-incorrect', 1).text())).toBe(teamAPayload.incorrect);
      expect(Number(find('row-incorrect', 2).text())).toBe(teamBPayload.incorrect);

      expect(Number(find('row-skipped', 1).text())).toBe(teamAPayload.skipped);
      expect(Number(find('row-skipped', 2).text())).toBe(teamBPayload.skipped);

      expect(Number(find('row-fastest-answer', 1).text())).toBe(teamAPayload.fastestAnswer);
      expect(Number(find('row-fastest-answer', 2).text())).toBe(teamBPayload.fastestAnswer);
    });
  });
});

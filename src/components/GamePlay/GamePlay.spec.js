import { shallowMount } from '@vue/test-utils';
import { allCardsMock } from '../../utils/mocks';
import { testCases } from '../../utils/testUtils';
import GamePlay from './GamePlay';
import GameCard from '../GameCard/GameCard';

describe('GamePlay', () => {
  describe('rendering', () => {
    const wrapper = shallowMount(GamePlay, {
      propsData: {
        cards: allCardsMock,
      },
    });

    const $cards = wrapper.findAll(GameCard);
    const $indicators = wrapper.findAll('[data-test="action-indicator"]');

    it('renders all passed cards', () => {
      expect($cards).toHaveLength(allCardsMock.length);
      expect($cards.at(0).props('card')).toBe(allCardsMock[0]);
      expect($cards.at(1).props('card')).toBe(allCardsMock[1]);
      expect($cards.at(2).props('card')).toBe(allCardsMock[2]);
    });

    it('renders first card with isCurrent prop', () => {
      expect($cards.at(0).props('isCurrent')).toBe(true);
      expect($cards.at(1).props('isCurrent')).toBe(false);
      expect($cards.at(2).props('isCurrent')).toBe(false);
    });

    it('properly passess isSkipDisabled prop to GameCard', () => {
      wrapper.setProps({
        isSkipDisabled: true,
      });

      expect($cards.at(0).props('isSkipDisabled')).toBe(true);
      expect($cards.at(1).props('isSkipDisabled')).toBe(true);
      expect($cards.at(2).props('isSkipDisabled')).toBe(true);
    });

    it('renders two action indicators', () => {
      expect($indicators).toHaveLength(2);
    });

    it('applies inline styles to proper indicator based on the drag direction', () => {
      wrapper.setData({
        draggedDistance: -100,
      });

      expect($indicators.at(0).attributes('style')).toBeTruthy();
      expect($indicators.at(1).attributes('style')).toBeFalsy();

      wrapper.setData({
        draggedDistance: 0,
      });

      expect($indicators.at(0).attributes('style')).toBeFalsy();
      expect($indicators.at(0).attributes('style')).toBeFalsy();

      wrapper.setData({
        draggedDistance: 100,
      });

      expect($indicators.at(0).attributes('style')).toBeFalsy();
      expect($indicators.at(1).attributes('style')).toBeTruthy();
    });
  });

  describe('computed properties', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(GamePlay, {
        propsData: {
          cards: allCardsMock,
        },
      });
    });

    test('isDraggedLeft', () => {
      testCases([
        [-10, true],
        [0, false],
        [5, false],
      ], (draggedDistance, expectedValue) => {
        wrapper.setData({ draggedDistance });
        expect(wrapper.vm.isDraggedLeft).toBe(expectedValue);
      });
    });

    test('isDraggedRight', () => {
      testCases([
        [-10, false],
        [0, false],
        [5, true],
      ], (draggedDistance, expectedValue) => {
        wrapper.setData({ draggedDistance });
        expect(wrapper.vm.isDraggedRight).toBe(expectedValue);
      });
    });

    test('absoluteDraggedDistance', () => {
      testCases([
        [-10, 10],
        [0, 0],
        [5, 5],
      ], (draggedDistance, expectedValue) => {
        wrapper.setData({ draggedDistance });
        expect(wrapper.vm.absoluteDraggedDistance).toBe(expectedValue);
      });
    });

    test('indicatorOpacity', () => {
      testCases([
        [-240, 1],
        [-200, 1],
        [-100, 0.5],
        [-25, 0.125],
        [0, 0],
        [50, 0.25],
        [200, 1],
        [330, 1],
      ], (draggedDistance, expectedValue) => {
        wrapper.setData({ draggedDistance });
        expect(wrapper.vm.indicatorOpacity).toBe(expectedValue);
      });
    });

    test('indicatorScale', () => {
      testCases([
        [-500, 2],
        [-400, 2],
        [-240, 1.36],
        [-200, 1.2],
        [-100, 0.8],
        [-25, 0.5],
        [0, 0.4],
        [50, 0.6],
        [200, 1.2],
        [300, 1.6],
        [400, 2],
        [500, 2],
      ], (draggedDistance, expectedValue) => {
        wrapper.setData({ draggedDistance });
        expect(wrapper.vm.indicatorScale).toBe(expectedValue);
      });
    });

    test('indicatorStyles', () => {
      wrapper.setData({ draggedDistance: 100 });

      expect(wrapper.vm.indicatorStyles).toEqual({
        opacity: 0.5,
        transform: 'scale(0.8)',
      });
    });
  });
});

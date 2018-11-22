import {
  formatTime,
  shuffleArray,
  generateRange,
} from './helpers';

describe('formatTime', () => {
  it('returns "-" for no value', () => {
    expect(formatTime(null)).toBe('-');
  });

  it('returns proper time for value < 60', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(30)).toBe('0:30');
    expect(formatTime(59)).toBe('0:59');
  });

  it('returns proper time for value == 60', () => {
    expect(formatTime(60)).toBe('1:00');
  });

  it('returns proper time for value > 60', () => {
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(123)).toBe('2:03');
  });
});

describe('shuffleArray', () => {
  it('returns array with the same length', () => {
    expect(shuffleArray(['a', 'b', 'c', 'd', 'e', 'f', 'g']).length).toBe(7);
  });
});

describe('generateRange', () => {
  it('returns array with proper values when no step provided', () => {
    expect(generateRange(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('returns array with proper values when step value provided', () => {
    expect(generateRange(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it('returns array with proper values when starting from negative value', () => {
    expect(generateRange(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
  });
});

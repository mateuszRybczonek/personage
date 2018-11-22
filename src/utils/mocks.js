export const DEFAULT_TEST_CORRECT = 4;
export const DEFAULT_TEST_EMOJI = 0;
export const DEFAULT_TEST_SKIPS_LIMIT = 5;
export const DEFAULT_TEST_SKIPPED = 3;

export const card1 = {
  keyword: 'Arnold',
  forbiddenWords: ['Terminator'],
  category: 'people',
};

export const card2 = {
  keyword: 'Sly',
  forbiddenWords: ['Rambo'],
  category: 'people',
};

export const card3 = {
  keyword: 'Chuck Norris',
  forbiddenWords: ['Texas Ranger'],
  category: 'people',
};

export const card4 = {
  keyword: 'Angular.js',
  forbiddenWords: ['Legacy'],
  category: 'it',
};

export const card5 = {
  keyword: 'Vue.js',
  forbiddenWords: ['Progressive'],
  category: 'it',
};

export const card6 = {
  keyword: 'React.js',
  forbiddenWords: ['Atom'],
  category: 'it',
};

export const itCards = [
  card4,
  card5,
  card6,
];

export const peopleCards = [
  card1,
  card2,
  card3,
];

export const allCardsMock = [
  ...itCards,
  ...peopleCards,
];

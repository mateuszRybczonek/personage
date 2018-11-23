/* eslint-disable import/prefer-default-export */
export const serializeCards = cardsObj => Object.keys(cardsObj).reduce((acc, category) => {
  const cardsFromCategory = cardsObj[category];
  const cardsArr = Object.keys(cardsFromCategory).map(keyword => ({
    keyword,
    category,
    forbiddenWords: cardsFromCategory[keyword],
  }));

  return [
    ...acc,
    ...cardsArr,
  ];
}, []);

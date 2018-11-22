/* eslint-disable import/prefer-default-export */
export const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

export const formatTime = (time) => {
  if (!time && time !== 0) return '-';
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
};

export const shuffleArray = (array) => {
  const arrayCopy = [...array];
  const shuffledArray = [];

  array.forEach(() => {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    shuffledArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  });

  return shuffledArray;
};

export const generateRange = (start, stop, step = 1) => {
  const length = ((Math.abs(stop - start)) / step) + 1;
  return Array(length).fill(0).map((e, index) => start + (step * index));
};

/* eslint-disable import/prefer-default-export */

export const testCases = (cases, fn) => {
  cases.forEach(c => fn(...c));
};

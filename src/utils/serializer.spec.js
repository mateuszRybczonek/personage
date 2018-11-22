import { serializeCards } from './serializer';

describe('serializeCards', () => {
  it('serializes object to proper array', () => {
    const cards = {
      category1: {
        lorem: ['a', 'b', 'c'],
        ipsum: ['d', 'e', 'f'],
      },
      category2: {
        dolor: ['g', 'h'],
        sit: ['i', 'j'],
      },
    };

    expect(serializeCards(cards)).toMatchSnapshot();
  });
});

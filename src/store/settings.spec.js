import settings from './settings';
import { secretCategoriesFlow, secretCategory } from '../consts';

describe('mutations', () => {
  describe('toggleCategory', () => {
    const { toggleCategory } = settings.mutations;
    const state = {
      toggledCategoriesStack: [],
      selectedCategories: [],
    };

    it('toggles categories properly', () => {
      toggleCategory(state, 'travel');
      expect(state.selectedCategories.includes('travel')).toBe(true);

      toggleCategory(state, 'people');
      expect(state.selectedCategories.includes('people')).toBe(true);
      expect(state.selectedCategories.includes('travel')).toBe(true);

      toggleCategory(state, 'travel');
      expect(state.selectedCategories.includes('people')).toBe(true);
      expect(state.selectedCategories.includes('travel')).toBe(false);

      toggleCategory(state, 'people');
      expect(state.selectedCategories.length).toBe(0);
    });

    // TODO: enable after enabling easter egg
    it.skip('selects secret category if categories were toggled in special order', () => {
      secretCategoriesFlow.forEach(category => toggleCategory(state, category));
      expect(state.selectedCategories.length).toBe(1);
      expect(state.selectedCategories[0]).toBe(secretCategory);
    });

    // TODO: enable after enabling easter egg
    it.skip(`selects secret category if categories were toggled in special order
        no matter if there were selected any categories before
    `, () => {
      toggleCategory(state, 'people');
      toggleCategory(state, 'it');

      expect(state.selectedCategories.includes('people')).toBe(true);
      expect(state.selectedCategories.includes('it')).toBe(true);

      secretCategoriesFlow.forEach(category => toggleCategory(state, category));
      expect(state.selectedCategories.length).toBe(1);
      expect(state.selectedCategories[0]).toBe(secretCategory);
    });
  });
});

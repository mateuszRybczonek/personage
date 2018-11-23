import settings from './settings';

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
  });
});

import { shallowMount } from '@vue/test-utils';
import AddIcon from '@/assets/add.svg';
import ShareIcon from '@/assets/share.svg';
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip';
import HomescreenTooltip from './HomescreenTooltip';

window.matchMedia = () => jest.fn();

describe('HomescreenTooltip', () => {
  const setup = (computedProps) => {
    const wrapper = shallowMount(HomescreenTooltip, {
      computed: computedProps,
      mocks: {
        $t: t => t,
      },
    });

    return { wrapper };
  };

  const { wrapper: defaultWrapper } = setup({
    showAddToHomescreenMessage: () => true,
    isPhone: () => true,
  });

  it('renders with BaseTooltip', () => {
    expect(defaultWrapper.findAll(BaseTooltip)).toHaveLength(1);
  });

  it('renders with AddIcon', () => {
    expect(defaultWrapper.findAll(AddIcon)).toHaveLength(1);
  });

  it('renders with ShareIcon', () => {
    expect(defaultWrapper.findAll(ShareIcon)).toHaveLength(1);
  });

  it('renders with proper content', () => {
    expect(defaultWrapper.text()).toContain('general.add_to_homescreen_1');
    expect(defaultWrapper.text()).toContain('general.add_to_homescreen_2');
  });

  describe('computed', () => {
    describe('showAddToHomescreenMessage', () => {
      it('returns true when showTooltip is true, isIos is true, isInStandaloneMode is false and isSafari is true', () => {
        const { wrapper } = setup({
          isIos: () => true,
          isInStandaloneMode: () => false,
          isSafari: () => true,
        });

        wrapper.setData({ showTooltip: true });

        expect(wrapper.vm.showAddToHomescreenMessage).toBeTruthy();
      });

      context('returns false', () => {
        test('when showTooltip is false', () => {
          const { wrapper } = setup({
            isIos: () => true,
            isInStandaloneMode: () => false,
            isSafari: () => true,
          });

          wrapper.setData({ showTooltip: false });

          expect(wrapper.vm.showAddToHomescreenMessage).toBeFalsy();
        });

        test('when isIos is false', () => {
          const { wrapper } = setup({
            isIos: () => false,
            isInStandaloneMode: () => false,
            isSafari: () => true,
          });

          wrapper.setData({ showTooltip: true });

          expect(wrapper.vm.showAddToHomescreenMessage).toBeFalsy();
        });

        test('when isInStandaloneMode is true', () => {
          const { wrapper } = setup({
            isIos: () => true,
            isInStandaloneMode: () => true,
            isSafari: () => true,
          });

          wrapper.setData({ showTooltip: true });

          expect(wrapper.vm.showAddToHomescreenMessage).toBeFalsy();
        });

        test('when isSafari is false', () => {
          const { wrapper } = setup({
            isIos: () => true,
            isInStandaloneMode: () => false,
            isSafari: () => false,
          });

          wrapper.setData({ showTooltip: true });

          expect(wrapper.vm.showAddToHomescreenMessage).toBeFalsy();
        });
      });
    });
  });
});

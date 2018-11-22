import { shallowMount } from '@vue/test-utils';
import BaseTooltip from './BaseTooltip';

describe('BaseTooltip', () => {
  const setup = (props) => {
    const wrapper = shallowMount(BaseTooltip, {
      propsData: { ...props },
      slots: {
        default: 'Text',
      },
    });

    return { wrapper };
  };

  context('with default props', () => {
    const { wrapper } = setup();

    it('renders with tooltip content slot', () => {
      expect(wrapper.findAll('[data-test="content"]')).toHaveLength(1);
    });

    it('renders with arrow', () => {
      expect(wrapper.findAll('[data-test="arrow"]')).toHaveLength(1);
    });

    it('renders arrow with proper data-placement attribute', () => {
      expect(wrapper.findAll('[data-placement="top"]')).toHaveLength(0);
      expect(wrapper.findAll('[data-placement="bottom"]')).toHaveLength(1);
    });
  });

  context('when isDismissible', () => {
    const { wrapper } = setup({ isDismissible: true });

    it('renders close button', () => {
      expect(wrapper.findAll('[data-test="close-button"]')).toHaveLength(1);
    });

    it('emits "close" event when clicked on the close button', () => {
      wrapper.find('[data-test="close-button"]').trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  context('with top arrowVerticalPlacement', () => {
    const { wrapper } = setup({ arrowVerticalPlacement: 'top' });

    it('has proper data-placement attribute', () => {
      expect(wrapper.findAll('[data-placement="top"]')).toHaveLength(1);
      expect(wrapper.findAll('[data-placement="bottom"]')).toHaveLength(0);
    });
  });

  context('with custom arrowHorizontalPlacement', () => {
    const { wrapper } = setup({ arrowHorizontalPlacement: '150px' });

    it('has proper arrowHorizontalPlacement style value', () => {
      expect(wrapper.find('[data-test="arrow"]').attributes().style).toBe('left: 150px;');
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import interactMixin from '@/mixins/interact';

jest.mock('interact.js', () => () => ({
  unset: jest.fn(),
  draggable: jest.fn(),
}));

describe('interact mixin', () => {
  const setup = () => {
    const Component = {
      mixins: [interactMixin],
      template: '<div></div>',
    };

    const wrapper = shallowMount(Component);

    return { wrapper };
  };

  describe('computed properties', () => {
    const { wrapper } = setup();
    const expectedString = 'translate3D(1px, 2px, 0) rotate(3deg)';

    wrapper.setData({
      interactPosition: {
        x: 1,
        y: 2,
        rotation: 3,
      },
    });

    context('transformString', () => {
      it('returns null when interactAnimating is true and interactDragged is false', () => {
        wrapper.setData({
          interactAnimating: true,
          interactDragged: false,
        });

        expect(wrapper.vm.transformString).toEqual(null);
      });

      it('returns proper string when interactAnimating is true and interactDragged is true', () => {
        wrapper.setData({
          interactAnimating: true,
          interactDragged: true,
        });

        expect(wrapper.vm.transformString).toEqual(expectedString);
      });

      it('returns proper string when interactAnimating is false and interactDragged is true', () => {
        wrapper.setData({
          interactAnimating: false,
          interactDragged: true,
        });

        expect(wrapper.vm.transformString).toEqual(expectedString);
      });

      it('returns proper string when interactAnimating is false and interactDragged is false', () => {
        wrapper.setData({
          interactAnimating: false,
          interactDragged: false,
        });

        expect(wrapper.vm.transformString).toEqual(expectedString);
      });
    });
  });

  describe('methods', () => {
    describe('interactSetPosition method', () => {
      const { wrapper } = setup();
      const fakeX = 100;
      const fakeY = 200;
      const fakeRotation = 15;

      wrapper.vm.interactSetPosition({ x: fakeX });

      it('sets interactPosition.x to passed value when x coordinate is passed', () => {
        expect(wrapper.vm.interactPosition.x).toEqual(fakeX);
      });

      wrapper.vm.interactSetPosition({ y: fakeY });

      it('sets interactPosition.y to passed value when y coordinate is passed', () => {
        expect(wrapper.vm.interactPosition.y).toEqual(fakeY);
      });

      wrapper.vm.interactSetPosition({ rotation: fakeRotation });

      it('sets interactPosition.rotation to passed value when rotation coordinate is passed', () => {
        expect(wrapper.vm.interactPosition.rotation).toEqual(fakeRotation);
      });

      wrapper.vm.interactSetPosition({ x: fakeX, y: fakeY, rotation: fakeRotation });

      it('sets proper values when multiple values are passed', () => {
        expect(wrapper.vm.interactPosition.x).toEqual(fakeX);
        expect(wrapper.vm.interactPosition.y).toEqual(fakeY);
        expect(wrapper.vm.interactPosition.rotation).toEqual(fakeRotation);
      });
    });

    describe('interactUnsetElement method', () => {
      const { wrapper } = setup();

      wrapper.vm.interactUnsetElement();

      it('sets interactDragged to true', () => {
        expect(wrapper.vm.interactDragged).toEqual(true);
      });
    });
  });

  describe('events', () => {
    describe('drag', () => {
      const position = { x: 50, y: 10, rotation: 30 };

      it('emits "drag" event properly without isDragging flag', () => {
        const { wrapper } = setup();
        wrapper.vm.interactSetPosition(position);

        expect(wrapper.emitted('drag')[0][0]).toEqual({
          ...position,
          isDragging: false,
        });
      });

      it('emits "drag" event properly with isDragging flag', () => {
        const { wrapper } = setup();
        wrapper.vm.interactSetPosition(position, true);

        expect(wrapper.emitted('drag')[0][0]).toEqual({
          ...position,
          isDragging: true,
        });
      });
    });
  });
});

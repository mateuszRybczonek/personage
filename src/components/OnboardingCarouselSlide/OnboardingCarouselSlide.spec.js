import { shallowMount } from '@vue/test-utils';
import OnboardingCarouselSlide from './OnboardingCarouselSlide';

jest.mock('lottie-web', () => ({
  loadAnimation: jest.fn(),
}));

const TITLE = 'This is a title.';
const DESCRIPTION = 'This is a proper description.';
const ANIMATION_URL = '/mock.json';

describe('OnboardingCarouselSlide', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(OnboardingCarouselSlide, {
      propsData: {
        title: TITLE,
        description: DESCRIPTION,
        animation: ANIMATION_URL,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('animates content and animation container properly', () => {
    const wrapper = shallowMount(OnboardingCarouselSlide, {
      propsData: {
        title: TITLE,
        description: DESCRIPTION,
        animation: ANIMATION_URL,
      },
    });

    expect(wrapper.find('[data-test="animation"]').props('play')).toBe(false);
    expect(wrapper.find('[data-test="animation-container"]').classes()).not.toContain('is-visible');
    expect(wrapper.find('[data-test="content"]').classes()).not.toContain('is-visible');

    wrapper.setProps({
      playAnimation: true,
    });

    expect(wrapper.find('[data-test="animation"]').props('play')).toBe(true);
    expect(wrapper.find('[data-test="animation-container"]').classes()).toContain('is-visible');
    expect(wrapper.find('[data-test="content"]').classes()).toContain('is-visible');
  });
});

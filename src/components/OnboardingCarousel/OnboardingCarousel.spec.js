import { shallowMount } from '@vue/test-utils';
import OnboardingCarousel from '@/components/OnboardingCarousel/OnboardingCarousel';

jest.mock('lottie-web', () => ({
  loadAnimation: jest.fn(),
}));

const slides = [{
  title: 'Lorem',
  description: 'desc1',
  animation: '/anim/1.json',
}, {
  title: 'Ipsum',
  description: 'desc2',
  animation: '/anim/2.json',
}, {
  title: 'Dolor',
  description: 'desc3',
  animation: '/anim/3.json',
}];

describe('OnboardingCarousel', () => {
  const wrapper = shallowMount(OnboardingCarousel, {
    propsData: {
      slides,
      activeSlideIndex: 0,
    },
  });

  it('renders all slides', () => {
    expect(wrapper.findAll('[data-test="slide"]').length).toBe(3);
  });

  it('renders active slide with enabled animation', () => {
    expect(wrapper.findAll('[data-test="slide"]').at(0).props()).toEqual({
      animation: slides[0].animation,
      title: slides[0].title,
      description: slides[0].description,
      playAnimation: true,
    });
  });

  it('renders other slides with disabled animation', () => {
    expect(wrapper.findAll('[data-test="slide"]').at(1).props()).toEqual({
      animation: slides[1].animation,
      title: slides[1].title,
      description: slides[1].description,
      playAnimation: false,
    });

    expect(wrapper.findAll('[data-test="slide"]').at(2).props()).toEqual({
      animation: slides[2].animation,
      title: slides[2].title,
      description: slides[2].description,
      playAnimation: false,
    });
  });
});

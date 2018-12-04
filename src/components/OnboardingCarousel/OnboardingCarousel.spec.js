import { shallowMount } from '@vue/test-utils';
import OnboardingCarousel from '@/components/OnboardingCarousel/OnboardingCarousel';

const slides = [{
  title: 'Lorem',
  description: 'desc1',
  image: 'onboarding',
}, {
  title: 'Ipsum',
  description: 'desc2',
  image: 'onboarding',
}, {
  title: 'Dolor',
  description: 'desc3',
  image: 'onboarding',
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

  it('renders active slide', () => {
    expect(wrapper.findAll('[data-test="slide"]').at(0).props()).toEqual({
      image: slides[0].image,
      title: slides[0].title,
      description: slides[0].description,
    });
  });

  it('renders other slides', () => {
    expect(wrapper.findAll('[data-test="slide"]').at(1).props()).toEqual({
      image: slides[1].image,
      title: slides[1].title,
      description: slides[1].description,
    });

    expect(wrapper.findAll('[data-test="slide"]').at(2).props()).toEqual({
      image: slides[2].image,
      title: slides[2].title,
      description: slides[2].description,
    });
  });
});

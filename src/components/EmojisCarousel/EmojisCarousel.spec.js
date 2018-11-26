import { shallowMount } from '@vue/test-utils';
import EmojisCarousel from './EmojisCarousel';

jest.useFakeTimers();

jest.mock('lottie-web', () => ({
  loadAnimation: jest.fn(),
}));

const TITLE = 'This is a title.';

describe('EmojisCarousel', () => {
  const wrapper = shallowMount(EmojisCarousel, {
    propsData: {
      title: TITLE,
      items: ['a', 'b', 'c', 'd', 'e'],
      activeItem: 'b',
    },
  });

  it('renders title', () => {
    expect(wrapper.find('[data-test="slider-title"]').text()).toBe(TITLE);
  });

  it('renders all slides', () => {
    const slides = wrapper.findAll('li');
    expect(slides).toHaveLength(5);
    expect(slides.at(0).find('animation-stub').props('path')).toBe('/anim/emoji/happy/a.json');
    expect(slides.at(1).find('animation-stub').props('path')).toBe('/anim/emoji/happy/b.json');
    expect(slides.at(2).find('animation-stub').props('path')).toBe('/anim/emoji/happy/c.json');
    expect(slides.at(3).find('animation-stub').props('path')).toBe('/anim/emoji/happy/d.json');
    expect(slides.at(4).find('animation-stub').props('path')).toBe('/anim/emoji/happy/e.json');
  });

  it('marks properly active item', () => {
    expect(wrapper.findAll('li').at(1).classes('glide__slide--active')).toBe(true);
  });

  it('animates active item', () => {
    expect(wrapper.findAll('animation-stub').at(0).props('play')).toBe(false);
    expect(wrapper.findAll('animation-stub').at(1).props('play')).toBe(true);
    expect(wrapper.findAll('animation-stub').at(2).props('play')).toBe(false);
  });

  it('emits "onChange" on item click', async () => {
    wrapper.findAll('li').at(3).trigger('click');
    jest.runAllTimers();
    expect(wrapper.emitted('onChange')[0][0]).toBe('d');
  });
});

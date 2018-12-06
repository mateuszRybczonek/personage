import { shallowMount } from '@vue/test-utils';
import EmojisCarousel from './EmojisCarousel';

jest.useFakeTimers();

const TITLE = 'teamA';

describe('EmojisCarousel', () => {
  const wrapper = shallowMount(EmojisCarousel, {
    propsData: {
      team: TITLE,
      items: ['a', 'b', 'c', 'd', 'e'],
      activeItem: 'b',
    },
    mocks: {
      $t: t => t,
    },
  });

  it('renders title', () => {
    expect(wrapper.find('[data-test="slider-title"]').text()).toBe('teams.teamA');
  });

  it('renders all slides', () => {
    const slides = wrapper.findAll('li');
    expect(slides).toHaveLength(5);
  });

  it('marks properly active item', () => {
    expect(wrapper.findAll('li').at(1).classes('glide__slide--active')).toBe(true);
  });

  it('emits "onChange" on item click', async () => {
    wrapper.findAll('li').at(3).trigger('click');
    jest.runAllTimers();
    expect(wrapper.emitted('onChange')[0][0]).toBe('d');
  });
});

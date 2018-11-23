import { shallowMount } from '@vue/test-utils';
import lottie from 'lottie-web';
import Animation from './Animation';

jest.mock('lottie-web', () => ({
  loadAnimation: jest.fn(() => ({
    play: jest.fn(),
    stop: jest.fn(),
  })),
}));

const FILE_PATH = '/file.json';

const setup = (props) => {
  const wrapper = shallowMount(Animation, {
    propsData: {
      path: FILE_PATH,
      ...props,
    },
  });

  return { wrapper };
};

describe('Animation', () => {
  it('calls lottie-web with proper params', () => {
    const { wrapper } = setup();

    expect(lottie.loadAnimation).toHaveBeenCalledWith({
      container: wrapper.vm.$refs.animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: FILE_PATH,
    });
  });

  it('accepts optional settings', () => {
    const { wrapper } = setup({
      options: {
        autoplay: false,
        renderer: 'canvas',
      },
    });

    expect(lottie.loadAnimation).toHaveBeenCalledWith({
      container: wrapper.vm.$refs.animationContainer,
      renderer: 'canvas',
      loop: true,
      autoplay: false,
      path: FILE_PATH,
    });
  });

  it('emits "animCreated" event on "mount"', () => {
    const { wrapper } = setup();

    expect(wrapper.emitted('animCreated')).toBeTruthy();
  });

  it('plays the animation if "play" prop is true', () => {
    const { wrapper } = setup({
      play: true,
      options: {
        autoPlay: false,
      },
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(1);
  });

  it('pauses/plays the animation if "play" prop has changed', () => {
    const { wrapper } = setup({
      play: false,
      options: {
        autoPlay: false,
      },
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      play: true,
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      play: false,
    });

    expect(wrapper.vm.anim.stop).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      play: true,
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(2);
  });

  it('doesn\'t pause or play the animation if "play" prop value didn\'t change', () => {
    const { wrapper } = setup({
      play: false,
      options: {
        autoPlay: false,
      },
    });

    wrapper.setProps({
      play: false,
    });

    expect(wrapper.vm.anim.stop).toHaveBeenCalledTimes(0);

    wrapper.setProps({
      play: true,
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      play: true,
    });

    expect(wrapper.vm.anim.play).toHaveBeenCalledTimes(1);
  });
});

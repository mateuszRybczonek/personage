import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Wrapper from './Wrapper';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const URL = '/url';
const $t = key => key;

describe('Wrapper', () => {
  it('renders title', () => {
    const wrapper = shallowMount(Wrapper, {
      slots: {
        header: 'This is a title.',
        footer: '<div>footer</div>',
        default: '<div>content</div>',
      },
      mocks: {
        $t,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('doesn\'t render header if "noHeader" props is passed', () => {
    const wrapper = shallowMount(Wrapper, {
      propsData: {
        noHeader: true,
      },
      mocks: {
        $t,
      },
    });
    expect(wrapper.findAll('[data-test="header"]')).toHaveLength(0);
  });

  it('renders back link if url is given ', () => {
    const wrapper = mount(Wrapper, {
      localVue,
      router,
      propsData: {
        back: { path: URL },
      },
      mocks: {
        $t,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders close link if url is given ', () => {
    const wrapper = mount(Wrapper, {
      localVue,
      router,
      propsData: {
        close: { path: URL },
      },
      mocks: {
        $t,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

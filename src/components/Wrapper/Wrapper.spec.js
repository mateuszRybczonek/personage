import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Wrapper from './Wrapper';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
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

  it('renders back link if url is given', () => {
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

  it('renders close link if url is given', () => {
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

  context('language flag', () => {
    const store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state: {
            locale: 'en',
          },
        },
      },
    });

    const setup = (showLocale) => {
      const wrapper = shallowMount(Wrapper, {
        localVue,
        store,
        propsData: {
          showLocale,
        },
        mocks: {
          $t,
        },
      });

      return { wrapper };
    };

    it('is rendered when showLocale is true', () => {
      const { wrapper } = setup(true);
      expect(wrapper.findAll('[data-test="language-flag"]')).toHaveLength(1);
    });

    it('is not rendered when showLocale is false', () => {
      const { wrapper } = setup(false);
      expect(wrapper.findAll('[data-test="language-flag"]')).toHaveLength(0);
    });
  });
});

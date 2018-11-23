import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseSlider from '@/components/BaseSlider/BaseSlider';
import SetupContent from './SetupContent';

const SLIDER_REQUIRED_PROPS = [
  'inputEvent',
  'label',
  'min',
  'max',
  'name',
  'rangeLabels',
  'step',
  'value',
];

describe('SetupContent', () => {
  const setup = (props = {}) => {
    const getters = {
      cardsLimit: jest.fn(),
      teamsLimit: jest.fn(),
      skipsLimit: jest.fn(),
      sound: jest.fn(),
      timeLimit: jest.fn(),
    };

    getters.cardsLimit.mockReturnValue(40);
    getters.teamsLimit.mockReturnValue(2);
    getters.skipsLimit.mockReturnValue(3);
    getters.sound.mockReturnValue(false);
    getters.timeLimit.mockReturnValue(60);

    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state: {
            cardsLimit: 40,
            teamsLimit: 2,
            skipsLimit: 3,
            sound: props.sound || false,
            timeLimit: 60,
          },
          getters,
        },
      },
    });

    const wrapper = shallowMount(SetupContent, {
      localVue,
      store,
      mocks: {
        $t: t => t,
      },
    });

    return { wrapper };
  };

  context('renders', () => {
    const { wrapper } = setup();

    it('BaseSlider component for skipsLimit with proper value', () => {
      expect(wrapper.findAll(BaseSlider).at(0).props().value).toBe(3);
    });

    it('BaseSlider component for timeLimit with proper value', () => {
      expect(wrapper.findAll(BaseSlider).at(1).props().value).toBe(60);
    });

    it('BaseSlider component for teamsLimit with proper value', () => {
      expect(wrapper.findAll(BaseSlider).at(2).props().value).toBe(2);
    });

    it('BaseSlider component for cardsLimit with proper value', () => {
      expect(wrapper.findAll(BaseSlider).at(3).props().value).toBe(40);
    });

    it('proper sound value on sound switch label', () => {
      expect(wrapper.find('[data-test="sound-switch-label"]').text()).toContain('off');
    });

    it('properly checked sound switch', () => {
      expect(wrapper.find('[data-test="sound-switch"]').props().checked).toBe(false);
    });
  });

  describe('teamsLimitSlider', () => {
    const { wrapper } = setup();

    it('has all required props', () => {
      SLIDER_REQUIRED_PROPS.forEach((prop) => {
        expect(Object.keys(wrapper.vm.teamsLimitSlider)).toContain(prop);
      });
    });
  });

  describe('cardsLimitSlider', () => {
    const { wrapper } = setup();

    it('has all required props', () => {
      SLIDER_REQUIRED_PROPS.forEach((prop) => {
        expect(Object.keys(wrapper.vm.cardsLimitSlider)).toContain(prop);
      });
    });
  });

  describe('skipsLimitSlider', () => {
    const { wrapper } = setup();

    it('has all required props', () => {
      SLIDER_REQUIRED_PROPS.forEach((prop) => {
        expect(Object.keys(wrapper.vm.skipsLimitSlider)).toContain(prop);
      });
    });
  });

  describe('timeLimitSlider', () => {
    const { wrapper } = setup();

    it('has all required props', () => {
      SLIDER_REQUIRED_PROPS.forEach((prop) => {
        expect(Object.keys(wrapper.vm.timeLimitSlider)).toContain(prop);
      });
    });
  });

  describe('soundEffectsLabel', () => {
    it('return label containing "off" when sound is off', () => {
      const { wrapper } = setup();
      expect(wrapper.vm.soundEffectsLabel).toContain('off');
    });

    it('return label containing "on" when sound is on', () => {
      const { wrapper } = setup({ sound: true });
      expect(wrapper.vm.soundEffectsLabel).toContain('on');
    });
  });
});

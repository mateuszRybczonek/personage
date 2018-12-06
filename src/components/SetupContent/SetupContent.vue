<template>
  <section :class="$style.setup">
    <BaseSlider
      v-for="slider in sliders"
      :key="slider.name"
      data-test="setup-slider"
      :class="$style.setup__item"
      :label="slider.label"
      :input-id="`input-${slider.name}`"
      :min="slider.min"
      :max="slider.max"
      :range-labels="slider.rangeLabels"
      :step="slider.step"
      :value="slider.value"
      @input="slider.inputEvent($event)"
    />
    <div :class="[$style.setup__item, $style.setup__switch]">
      <label
        data-test="sound-switch-label"
        :class="$style.setup__switchLabel"
      >
        {{ soundEffectsLabel }}
      </label>
      <BaseSwitch
        data-test="sound-switch"
        :checked="sound === true"
        name="soundSwitch"
        @change="setSound($event)"
      />
    </div>
  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import InfiniteIcon from '@/assets/infinite.svg';
import BaseSlider from '@/components/BaseSlider/BaseSlider';
import BaseSwitch from '@/components/BaseSwitch/BaseSwitch';
import { formatTime, generateRange } from '@/utils/helpers';
import {
  CARDS_RANGE,
  TEAMS_RANGE,
  SKIPS_RANGE,
  TIME_RANGE,
} from '@/consts';

export default {
  components: {
    BaseSlider,
    BaseSwitch,
  },

  computed: {
    ...mapState('settings', [
      'cardsLimit',
      'skipsLimit',
      'teamsLimit',
      'timeLimit',
      'sound',
    ]),

    sliders() {
      return [
        this.skipsLimitSlider,
        this.timeLimitSlider,
        this.teamsLimitSlider,
        this.cardsLimitSlider,
      ];
    },

    cardsLimitSlider() {
      const { min, max } = CARDS_RANGE;
      const labelStep = 30;

      const rangeLabels = generateRange(min, max, labelStep).map(label => ({ label }));

      return {
        inputEvent: this.setCardsLimit,
        label: `${this.$t('views.setup.game.cards')}: ${this.cardsLimit}`,
        min,
        max,
        name: 'CardsLimitSlider',
        rangeLabels,
        step: 10,
        value: this.cardsLimit,
      };
    },

    teamsLimitSlider() {
      const { min, max } = TEAMS_RANGE;

      return {
        inputEvent: this.setTeamsLimit,
        label: `${this.$t('views.setup.game.teams')}: ${this.teamsLimit}`,
        min,
        max,
        name: 'TeamsLimitSlider',
        rangeLabels: [
          { label: min },
          { label: max },
        ],
        step: 1,
        value: this.teamsLimit,
      };
    },

    skipsLimitLabel() {
      const labelValue = this.skipsLimit !== SKIPS_RANGE.max ? this.skipsLimit : '∞';
      return `${this.$t('views.setup.game.skips_limit')}: ${labelValue}`;
    },

    skipsLimitSlider() {
      const { min, max } = SKIPS_RANGE;
      const labelStep = 2;

      const rangeLabels = generateRange(min, max - labelStep, labelStep).map(label => ({ label }));

      return {
        inputEvent: this.setSkipsLimit,
        label: this.skipsLimitLabel,
        min,
        max,
        name: 'SkipsLimitSlider',
        rangeLabels: [
          ...rangeLabels,
          { label: { component: InfiniteIcon, name: 'inifnite-icon' } },
        ],
        step: 1,
        value: this.skipsLimit,
      };
    },

    soundEffectsLabel() {
      return `${this.$t('views.setup.game.sound_effects')}: ${this.sound ? this.$t('general.on') : this.$t('general.off')}`;
    },

    timeLimitSlider() {
      const { min, max } = TIME_RANGE;
      const labelStep = 30;

      const rangeLabels = generateRange(min, max, labelStep)
        .map(labelValue => ({ label: formatTime(labelValue) }));

      return {
        inputEvent: this.setTimeLimit,
        label: `${this.$t('views.setup.game.time_per_team')}: ${formatTime(this.timeLimit)}`,
        min,
        max,
        name: 'TimeLimitSlider',
        rangeLabels,
        step: 10,
        value: this.timeLimit,
      };
    },
  },

  methods: {
    ...mapMutations('settings', [
      'setCardsLimit',
      'setTeamsLimit',
      'setSkipsLimit',
      'setSound',
      'setTimeLimit',
    ]),
  },
};
</script>

<style module lang="scss">
.setup {
  &__item {
    margin-top: 15px;

    &:first-of-type {
      margin-top: 0;
    }

    @media #{$mobile-md-v-up} {
      margin-top: 25px;

      &:first-of-type {
        margin-top: 10px;
      }
    }
  }

  &__switch {
    display: flex;
    margin-top: 15px;

    @media #{$mobile-md-v-up} {
      margin-top: 25px;
    }

    &Label {
      display: flex;
      width: 100%;
      font-size: $fs-small;
      color: $c-heading;
      flex: 1;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      @media #{$mobile-md-v-up} {
        font-size: $fs-small;
      }
    }
  }
}

.buttonNext {
  margin: auto;
  margin-bottom: rem(26px);
}
</style>

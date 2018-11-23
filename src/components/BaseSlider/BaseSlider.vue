<template>
  <div :class="$style.slider">
    <label
      data-test="slider-label"
      :for="inputId"
      :class="$style.slider__label"
    >
      {{ label }}
    </label>
    <div :class="$style.slider__innerWrapper">
      <input
        :id="inputId"
        ref="slider"
        data-test="slider-input"
        :value="currentValue"
        type="range"
      >
      <div
        v-if="rangeLabels"
        data-test="slider-range-labels"
        :class="$style.slider__range"
      >
        <div
          v-for="rangeLabel in rangeLabels"
          :key="rangeLabel.label.name"
          :class="$style.slider__separator"
        >
          <span
            v-if="isValidTextLabel(rangeLabel.label)"
            data-test="slider-range-text"
            :class="$style.slider__separatorText"
          >
            {{ rangeLabel.label }}
          </span>
          <Component
            :is="rangeLabel.label.component"
            v-else-if="isValidImageLabel(rangeLabel.label)"
            data-test="slider-range-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rangesliderJs from 'rangeslider-js';

export default {
  name: 'BaseSlider',

  props: {
    label: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    rangeLabels: {
      type: Array,
      default: null,
    },
  },

  computed: {
    currentValue() {
      return this.value || this.min;
    },
  },

  beforeMount() {
    if (this.value === null) this.$emit('input', this.min);
  },

  mounted() {
    this.slider = rangesliderJs
      .create(
        this.$refs.slider,
        {
          min: this.min,
          max: this.max,
          value: this.currentValue,
          step: this.step,
          onSlide: (value) => {
            this.$emit('input', value);
          },
        },
    );
  },

  beforeDestroy() {
    if (this.slider) this.slider.destroy();
  },

  methods: {
    isValidTextLabel(label) {
      return (typeof label === 'number' && Number.isFinite(label)) ||
      (typeof label === 'string' || label instanceof String);
    },
    isValidImageLabel(label) {
      return typeof label === 'object' && label.constructor === Object;
    },
  },
};
</script>

<style module lang="scss">
$handleControlSize: 27px;
$handleSize: 2 * $handleControlSize;
$rangesliderMargin: 14px;
$rangesliderBoxshadowLeft: $rangesliderMargin;
$rangesliderBoxshadowRight: - $rangesliderMargin + 1px;

.slider {
  &__label {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    font-size: $fs-small;
    color: $c-heading;
    justify-content: space-between;
  }

  &__range {
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  &__separator {
    @include relative(top 6px);

    min-width: $handleControlSize;
  }

  &__separatorText {
    min-width: 10px;
    font-size: $fs-small;
    text-align: center;
    transform: translate(-50%, 3px);
  }
}

:global {
  .rangeslider {
    position: relative;
    display: block;
    height: 25px;
    cursor: pointer;
    margin: 10px -$rangesliderMargin 0 -$rangesliderMargin;
    touch-action: none;

    @include before {
      @include absolute(top 0 left 0);
      @include sizing(100%);

      z-index: $z-index-9;
      display: block;
      box-shadow:
        inset $rangesliderBoxshadowLeft 0 0 0 $c-background,
        inset $rangesliderBoxshadowRight 0 0 0 $c-background;
    }
  }

  .rangeslider__fill,
  .rangeslider__fill__bg {
    @include absolute(top 50%);

    z-index: $z-index-1;
    display: block;
    height: 3px;
    border-radius: 10px;
    background: $dots-inactive;
  }

  .rangeslider__handle {
    @include sizing($handleSize);
    @include absolute(top 55% left 0);
    @include flex-center();

    z-index: $z-index-2;
    cursor: pointer;
    pointer-events: all;

    @include before() {
      @include circle($handleControlSize);

      background: linear-gradient($primary-gradient-start, $primary-gradient-end);
    }
  }

  .rangeslider__fill__bg {
    width: 100%;
    background: $dots-inactive;
  }
}
</style>

<template>
  <div :class="[$style.wrapper, $style[arrowVerticalPlacement]]">
    <button
      v-if="isDismissible"
      data-test="close-button"
      :class="$style.close"
      @click="$emit('close')"
    >
      <CloseIcon :class="$style.closeIcon" />
    </button>
    <div
      data-test="content"
      :class="$style.content"
    >
      <slot />
    </div>
    <span
      data-test="arrow"
      :class="$style.arrow"
      :data-placement="arrowVerticalPlacement"
      :style="{ left: arrowHorizontalPlacement }"
    />
  </div>
</template>
<script>
import CloseIcon from '@/assets/close.svg';

export default {
  name: 'Tooltip',
  components: {
    CloseIcon,
  },
  props: {
    isDismissible: {
      type: Boolean,
      default: false,
    },
    arrowVerticalPlacement: {
      type: String,
      default: 'bottom',
      validator: value => [
        'bottom',
        'top',
      ].includes(value),
    },
    arrowHorizontalPlacement: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss" module>
$tooltip-arrow-border-width: 1px;
$tooltip-arrow-size: 15px;
$tooltip-arrow-border-size: $tooltip-arrow-size + $tooltip-arrow-border-width;
$tooltip-arrow-horizontal-position: calc(50% - 6px);

$tooltip-tablet-arrow-border-width: 2px;
$tooltip-tablet-arrow-size: 20px;
$tooltip-tablet-arrow-border-size: $tooltip-tablet-arrow-size + $tooltip-tablet-arrow-border-width;

.close {
  @include absolute(top 0 right 0);
  @include sizing(34px);

  z-index: $z-index-9;
  box-sizing: border-box;
  margin: 0;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;

  &Icon {
    svg {
      @include sizing(100%);
    }

    path {
      fill: $c-ios-dark-grey;
      stroke: $c-ios-dark-grey;
    }
  }
}

.wrapper {
  position: relative;
  z-index: $z-index-9;
  min-width: 60px;
  max-width: 600px;
  font-weight: $fw-normal;
  border-radius: 12px;
  color: $c-dark-label;
  background-color: $c-ios-light-grey;

  @media #{$tablet-up} {
    max-width: 315px;
    font-size: $fs-small;
  }
}

.arrow {
  @include sizing(0);

  @include before() {
    @include absolute(top -1px right -$tooltip-arrow-size * 1.5);
    @include sizing(0);

    border-width: $tooltip-arrow-size;
    border-style: solid;
    border-color: transparent $c-ios-light-grey transparent transparent;
    transform: rotate(-90deg);

    @media #{$tablet-up} {
      top: -$tooltip-tablet-arrow-border-size;
    }
  }

  @media #{$tablet-up} {
    top: -3px;
  }

  &[data-placement="bottom"] {
    @include absolute(top 100% left $tooltip-arrow-horizontal-position);

    margin-left: -($tooltip-arrow-border-size / 2);

    @media #{$tablet-up} {
      margin-left: -($tooltip-tablet-arrow-border-size / 2);
    }
  }

  &[data-placement="top"] {
    transform-origin: 50% 0;

    @include absolute(top -$tooltip-arrow-border-size left 50%);

    margin-left: -($tooltip-arrow-border-size / 2);
    transform: translate3d(-50%, 0, 0) scaleY(-1);

    @media #{$tablet-up} {
      top: -$tooltip-tablet-arrow-border-size;
      margin-left: -($tooltip-tablet-arrow-border-size / 2);
    }
  }
}
</style>

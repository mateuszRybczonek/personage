<template>
  <div
    data-test="gameplay"
    :class="$style.gamePlay"
  >
    <div :class="$style.cards">
      <GameCard
        v-for="(card, index) in cards"
        :key="card"
        :card="card"
        :is-current="index === 0"
        :is-skip-disabled="isSkipDisabled"
        @cardSkipped="$emit('cardSkipped')"
        @correctAnswer="$emit('correctAnswer')"
        @hideCard="$emit('hideCard')"
        @incorrectAnswer="$emit('incorrectAnswer')"
        @drag="handleDrag"
      />
      <div
        :class="[$style.actionIndicatorIcon, {
          [$style.animated]: shouldIndicatorAnimate
        }]"
        :style="isDraggedLeft && indicatorStyles"
        data-test="action-indicator"
        data-answer="incorrect"
      >
        <CardIncorrectIcon />
      </div>
      <div
        :class="[$style.actionIndicatorIcon, {
          [$style.animated]: shouldIndicatorAnimate
        }]"
        :style="isDraggedRight && indicatorStyles"
        data-test="action-indicator"
        data-answer="correct"
      >
        <CardCorrectIcon />
      </div>
    </div>
    <GameButtons
      :class="$style.actions"
      :is-skip-disabled="isSkipDisabled"
    />
  </div>
</template>

<script>
import CardCorrectIcon from '@/assets/card-tick-correct.svg';
import CardIncorrectIcon from '@/assets/card-tick-incorrect.svg';
import GameButtons from '@/components/GameButtons/GameButtons';
import GameCard from '@/components/GameCard/GameCard';

const MAX_DRAG_DISTANCE = 200;
const SCALE_BASE_MAX = 1.2;
const SCALE_MAX = 2;
const SCALE_MIN = 0.4;

export default {
  components: {
    CardCorrectIcon,
    CardIncorrectIcon,
    GameButtons,
    GameCard,
  },

  props: {
    cards: {
      type: Array,
      required: true,
    },
    isSkipDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      draggedDistance: 0,
      shouldIndicatorAnimate: false,
    };
  },

  computed: {
    isDraggedLeft() {
      return this.draggedDistance < 0;
    },

    isDraggedRight() {
      return this.draggedDistance > 0;
    },

    absoluteDraggedDistance() {
      return Math.abs(this.draggedDistance);
    },

    indicatorOpacity() {
      return Math.min(this.absoluteDraggedDistance / MAX_DRAG_DISTANCE, 1);
    },

    indicatorScale() {
      const scaleDifference = SCALE_BASE_MAX - SCALE_MIN;
      const scaleFraction = (this.absoluteDraggedDistance * scaleDifference) / MAX_DRAG_DISTANCE;
      const scaleValue = Math.round((SCALE_MIN + scaleFraction) * 100) / 100;

      return Math.min(scaleValue, SCALE_MAX);
    },

    indicatorStyles() {
      return {
        opacity: this.indicatorOpacity,
        transform: `scale(${this.indicatorScale})`,
      };
    },
  },

  methods: {
    handleDrag({ x, isDragging }) {
      this.draggedDistance = x;
      this.shouldIndicatorAnimate = !isDragging;
    },
  },
};
</script>

<style module lang="scss">
  .gamePlay {
    display: flex;
    padding: 0 30px 20px;
    flex-direction: column;
  }

  .cards {
    position: relative;
    display: flex;
    width: 100%;
    margin: 0 auto 60px auto;
    flex: 1;
  }

  .actionIndicatorIcon {
    @include absolute(top 6vh bottom 0);
    @include sizing(145px);

    z-index: $z-index-1;
    margin: auto;
    color: $c-white-30;
    opacity: 0;
    pointer-events: none;

    &.animated {
      /*
       * Needed to overwrite inline styles
       * applied by component logic
       */
      opacity: 0 !important;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    &[data-answer="incorrect"] {
      left: -20px;
    }

    &[data-answer="correct"] {
      right: -20px;
    }
  }

  .actions {
    @include absolute(bottom 5px);

    @media #{$mobile-md-up} {
      bottom: 20px;
    }

    width: calc(100% - 60px);
    padding: 0 20px;
  }
</style>

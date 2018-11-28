<template>
  <div
    v-if="showing"
    ref="interactElement"
    :class="[
      $style.card,
      { [$style.animated]: interactAnimating },
      { [$style.isCurrent]: isCurrent }
    ]"
    :style="{ transform: transformString }"
    data-test="game-card"
  >
    <div>
      <h3 :class="$style.cardTitle">
        {{ card.keyword }}
      </h3>
      <ul :class="$style.cardWordsList">
        <li
          v-for="word in card.forbiddenWords"
          :key="word"
          data-test="forbidden-word"
        >
          {{ word }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import interactMixin from '@/mixins/interact';
import EventBus from '@/event-bus';
import {
  $GAME_CORRECT_ANSWER,
  $GAME_INCORRECT_ANSWER,
  $GAME_SKIP_CARD,
} from '@/consts';

export default {
  mixins: [interactMixin],
  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    isSkipDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      interactMaxRotation: 15,
      showing: true,
    };
  },

  mounted() {
    EventBus.$on($GAME_CORRECT_ANSWER, this.correctAnswer);
    EventBus.$on($GAME_INCORRECT_ANSWER, this.incorrectAnswer);
    EventBus.$on($GAME_SKIP_CARD, this.skipCard);
  },

  beforeDestroy() {
    EventBus.$off($GAME_CORRECT_ANSWER, this.correctAnswer);
    EventBus.$off($GAME_INCORRECT_ANSWER, this.incorrectAnswer);
    EventBus.$off($GAME_SKIP_CARD, this.skipCard);
  },

  methods: {
    draggedRight() {
      this.correctAnswer();
    },

    draggedLeft() {
      this.incorrectAnswer();
    },

    draggedDown() {
      if (this.isSkipDisabled) {
        this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
      } else {
        this.skipCard();
      }
    },

    correctAnswer() {
      if (!this.isCurrent) return;

      this.playCard();

      this.interactSetPosition({
        x: this.interactOutOfSightXCoordinate,
        rotation: this.interactMaxRotation,
      });

      this.$emit('correctAnswer');
      this.hideCard();
    },

    incorrectAnswer() {
      if (!this.isCurrent) return;

      this.playCard();

      this.interactSetPosition({
        x: -this.interactOutOfSightXCoordinate,
        rotation: -this.interactMaxRotation,
      });

      this.$emit('incorrectAnswer');
      this.hideCard();
    },

    skipCard() {
      if (!this.isCurrent || this.isSkipDisabled) return;
      this.playCard();
      this.interactSetPosition({ y: this.interactOutOfSightYCoordinate });
      this.$emit('cardSkipped');
      this.hideCard();
    },

    playCard() {
      this.interactUnsetElement();
    },

    hideCard() {
      setTimeout(() => {
        this.showing = false;
        this.$emit('hideCard', this.card);
      }, 300);
    },
  },
};
</script>

<style lang="scss" module>
$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

@mixin card() {
  border-radius: 15px;
  box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);
}

.card {
  @include card();
  @include absolute(top 5px left 0 bottom 30px);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 420px;
  margin: auto;
  font-size: $fs-h3;
  font-weight: $fw-bold;
  color: $c-white;
  background-image:
    linear-gradient(
      -180deg,
      $primary-gradient-start 2%,
      $primary-gradient-end 100%
    );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  @media #{$mobile-sm-v-down} {
    max-height: 240px;
  }

  @media #{$mobile-md-v-up} {
    font-size: $fs-h2;
  }

  @media #{$mobile-lg-v-up} {
    height: 100vw;
  }

  &.isCurrent {
    pointer-events: auto;
  }

  &.animated {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;

  @media #{$mobile-md-v-up} {
    margin-bottom: 30px;
  }
}

.cardWordsList {
  margin: 0;
  padding: 0;
  line-height: 1.4em;
  list-style: none;
  opacity: 0.5;

  @media #{$mobile-lg-v-up} {
    line-height: 1.86em;
  }

  &:last-child {
    margin-bottom: 10px;
  }
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    }

    @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>

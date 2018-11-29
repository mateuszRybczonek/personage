<template>
  <div
    ref="interactElement"
    data-test="game-starter-container"
    :class="[
      $style.container,
      { [$style.animated]: interactAnimating }
    ]"
    :style="{ transform: transformString }"
  >
    <Component
      :class="$style.figure"
      :is="figures[emoji]"
    />
    <h2
      data-test="game-starter-team-title"
      :class="$style.title"
    >
      {{ currentTeam | teamName }}
    </h2>
    <div :class="$style.swipeInfo">
      <SwipeIcon :class="$style.swipeIcon" />
      <p :class="$style.swipeText">
        {{ $t('views.game.swipe') }}
      </p>
    </div>
  </div>
</template>

<script>
import interactMixin from '@/mixins/interact';
import SwipeIcon from '@/assets/swipe.svg';
import Figure1 from '@/assets/avatars/1-figure.svg';
import Figure2 from '@/assets/avatars/2-figure.svg';
import Figure3 from '@/assets/avatars/3-figure.svg';
import Figure4 from '@/assets/avatars/4-figure.svg';

export default {
  components: {
    SwipeIcon,
    Figure1,
    Figure2,
    Figure3,
    Figure4,
  },

  mixins: [interactMixin],

  props: {
    currentTeam: {
      type: String,
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    },
    emoji: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      interactLockYAxis: true,
      interactLockSwipeLeft: true,
      figures: [
        'Figure1',
        'Figure2',
        'Figure3',
        'Figure4',
      ],
    };
  },

  methods: {
    draggedRight() {
      this.interactUnsetElement();
      this.interactSetPosition({
        x: this.interactOutOfSightXCoordinate,
      });

      setTimeout(() => this.$emit('play'), 100);
    },

    draggedLeft() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },
  },
};
</script>

<style module lang="scss">
  .container {
    display: flex;
    margin-top: 25px;
    padding-bottom: 40px;
    flex-direction: column;
    align-items: center;

    &.animated {
      transition: transform 0.5s $ease-out-back;
    }
  }

  .figure {
    height: 45vh !important;
    padding-top: 20px;

    :global(svg) {
      transform: translate3d(0, 0, 0) scale(1.1) !important;
    }
  }

  .title {
    margin: 20px 0 40px;
    font-size: $fs-h2;
    color: $c-white;

    @media #{$mobile-md-v-up} {
      font-size: $fs-h1;
    }
  }

  .swipeInfo {
    margin-top: auto;
  }

  .swipeText {
    max-width: 320px;
    margin: 0;
    padding: 0;
    font-size: $fs-h3;

    @media #{$mobile-md-v-up} {
      font-size: $fs-h2;
    }
  }

  .swipeIcon {
    height: 32px;
    margin-bottom: 12px;
  }
</style>

<template>
  <div
    :class="$style.gameTimer"
    @click="toggleTimer"
  >
    <svg
      :class="$style.gameTimerSvg"
      viewBox="0 0 101 101"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g :class="$style.gameTimerCircle">
        <circle
          :class="$style.gameTimerPathElapsed"
          cx="50.5"
          cy="50.5"
          r="46.5"
        />
        <path
          data-test="game-timer-path-remaining"
          :class="$style.gameTimerPathRemaining"
          :stroke-dasharray="circleDasharray"
          d="
            M50.5 97C76.181 97 97 76.181 97
            50.5S76.181 4 50.5 4 4 24.819
            4 50.5 24.819 97 50.5 97z
          "
        />
      </g>
    </svg>
    <span
      data-test="game-timer-label"
      :class="$style.gameTimerTimeLabel"
    >
      <PauseIcon v-if="isPaused" />
      <template v-else>
        {{ timeLeft | time }}
      </template>
    </span>
  </div>
</template>

<script>
import PauseIcon from '@/assets/pause.svg';
import {
  gameStatePlaying,
  gameStatePaused,
  gameStateReady,
} from '@/consts';

const fullDashArray = 290;

export default {
  components: {
    PauseIcon,
  },

  props: {
    timeLimit: {
      type: Number,
      required: true,
    },
    timeLeft: {
      type: Number,
      required: true,
    },
    gameState: {
      type: String,
      required: true,
    },
  },

  computed: {
    canPause() {
      return this.gameState === gameStatePlaying || this.gameState === gameStateReady;
    },

    circleDasharray() {
      return `${((this.timeFraction) * fullDashArray).toFixed(0)} 500`;
    },

    isPaused() {
      return this.gameState === gameStatePaused;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - ((1 / this.timeLimit) * (1 - rawTimeFraction));
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) this.$emit('timesUp');
    },
  },

  methods: {
    toggleTimer() {
      if (this.canPause) this.$emit('pauseGame');
      else if (this.isPaused) this.$emit('resumeGame');
    },
  },
};
</script>

<style module lang="scss">
.gameTimer {
  @include sizing(60px);

  position: relative;

  &Svg {
    width: 100%;
    transform: scaleX(-1) rotate(-55deg);
  }

  &Circle {
    fill: none;
    fill-rule: evenodd;
    stroke: none;
  }

  &PathElapsed {
    stroke: $primary-gradient-end;
    stroke-width: 7px;
    stroke-linecap: round;
    fill-rule: nonzero;
  }

  &PathRemaining {
    stroke: $primary-gradient-start;
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(-125deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
  }

  &TimeLabel {
    @include absolute(top 20px left 0);

    width: 60px;
    font-size: $fs-h4;
    color: $c-white;
  }
}
</style>

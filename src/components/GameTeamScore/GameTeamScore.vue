<template>
  <div
    data-test="game-team-score"
    :class="[$style.team, {
      [$style.isReversed]: reverse,
      [$style.isActive]: isActive,
    }]"
  >
    <div :class="$style.teamIcon">
      <Animation
        data-test="team-emoji"
        :path="`/anim/emoji/happy/${team.emoji}.json`"
        :play="false"
        :options="{ autoplay: false }"
      />
    </div>
    <div :class="$style.teamScores">
      <span
        data-test="team-scores-correct"
        :class="$style.teamScoresCorrect"
      >
        {{ team.correct }}
      </span>
      <div
        v-if="skipsLimit"
        data-test="team-scores-skips"
        :class="$style.teamScoresSkips"
      >
        <ButtonNextIcon />
        <span :class="$style.teamScoresSkipsText">
          {{ team.skipped }}/{{ skipsLimit | skipsLimit }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Animation from '@/components/Animation/Animation';
import ButtonNextIcon from '@/assets/button-next.svg';

export default {
  components: {
    Animation,
    ButtonNextIcon,
  },

  props: {
    team: {
      type: Object,
      required: true,
    },
    skipsLimit: {
      type: Number,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
.team {
  display: flex;
  height: 80px;

  &Icon {
    position: relative;
    width: 80px;
    opacity: 0.5;

    .isReversed & {
      order: 2;
    }

    .isActive & {
      opacity: 1;
    }

    .isActive &::before {
      @include absolute(right 18px bottom 14px);
      @include circle(3px);

      content: '';
      background-color: $c-red;
    }
  }

  &Scores {
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;

    .isReversed & {
      text-align: right;
      order: 1;
    }

    &Correct {
      color: $c-white;
    }

    &Skips {
      display: flex;
      margin-top: 3px;
      font-size: $fs-xsmall;
      align-items: center;

      &Text {
        margin-left: 3px;
      }
    }
  }
}
</style>

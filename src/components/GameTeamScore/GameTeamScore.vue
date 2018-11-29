<template>
  <div :class="$style.team" data-test="game-team-score">
    <div :class="$style.teamScores">
      <span
        data-test="team-scores-correct"
        :class="$style.teamScoresCorrect"
      >
        {{ teamData.correct }}
      </span>
      <div
        v-if="skipsLimit"
        data-test="team-scores-skips"
        :class="$style.teamScoresSkips"
      >
        <ButtonNextIcon />
        <span :class="$style.teamScoresSkipsText">
          {{ teamData.skipped }}/{{ skipsLimit | skipsLimit }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonNextIcon from '@/assets/button-next.svg';

export default {
  components: {
    ButtonNextIcon,
  },

  props: {
    teamData: {
      type: Object,
      required: true,
    },
    skipsLimit: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style module lang="scss">
.team {
  display: flex;
  height: 80px;
  margin-top: 10px;

  &Icon {
    position: relative;
    width: 80px;
    margin-right: 10px;
  }

  &Scores {
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;

    &Correct {
      font-size: $fs-h2;
      color: $c-white;
    }

    &Skips {
      display: flex;
      margin-top: 5px;
      font-size: $fs-small;
      align-items: center;

      &Text {
        margin-left: 5px;
      }
    }
  }
}
</style>

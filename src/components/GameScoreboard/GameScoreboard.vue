<template>
  <section>
    <div :class="$style.gameScoreboard">
      <GameTeamScore
        :skips-limit="skipsLimit"
        :team="teamAData"
        :is-active="isTeamATurn"
      />
      <GameTimer
        :time-limit="timeLimit"
        :time-left="timeLeft"
        :game-state="gameState"
        @pauseGame="$emit('pause')"
        @resumeGame="$emit('resume')"
        @timesUp="$emit('timesUp')"
      />
      <GameTeamScore
        :reverse="true"
        :skips-limit="skipsLimit"
        :team="teamBData"
        :is-active="isTeamBTurn"
      />
    </div>
    <transition name="t-fade">
      <PauseTooltip
        v-if="isPauseTooltipVisible"
        data-test="pause-tooltip"
        :class="$style.pauseTooltip"
      />
    </transition>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameTeamScore from '@/components/GameTeamScore/GameTeamScore';
import GameTimer from '@/components/GameTimer/GameTimer';
import PauseTooltip from '@/components/PauseTooltip/PauseTooltip';

export default {
  components: {
    GameTeamScore,
    GameTimer,
    PauseTooltip,
  },

  computed: {
    ...mapState('settings', [
      'skipsLimit',
      'timeLimit',
      'teamAEmoji',
      'teamBEmoji',
    ]),

    ...mapState('game', [
      'gameState',
      'teamA',
      'teamB',
    ]),

    ...mapGetters('game', ['isTeamATurn', 'isTeamBTurn']),
    ...mapGetters('timer', ['timeLeft']),
    ...mapGetters('settings', ['isPauseTooltipVisible']),

    teamAData() {
      const { correct, skipped } = this.teamA;

      return {
        correct,
        emoji: this.teamAEmoji,
        skipped,
      };
    },

    teamBData() {
      const { correct, skipped } = this.teamB;

      return {
        correct,
        emoji: this.teamBEmoji,
        skipped,
      };
    },
  },
};
</script>

<style module lang="scss">
.gameScoreboard {
  display: flex;
  margin-top: -10px;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
}

.pauseTooltip {
  @include absolute(left 0 right 0);

  max-width: 310px;
  margin: 5px auto;
}
</style>

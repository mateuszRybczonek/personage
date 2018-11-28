<template>
  <section>
    <div :class="$style.gameScoreboard">
      <div :class="$style.teamIcon">
        <component :is="avatars[teamData.emoji]" :class="$style.avatar" ></component>
      </div>
      <GameTimer
        :class="$style.timer"
        :time-limit="timeLimit"
        :time-left="timeLeft"
        :game-state="gameState"
        @pauseGame="$emit('pause')"
        @resumeGame="$emit('resume')"
        @timesUp="$emit('timesUp')"
      />
      <GameTeamScore
        :class="$style.teamScore"
        :skips-limit="skipsLimit"
        :teamData="teamData"
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
import Avatar1 from '@/assets/avatars/1-avatar.svg'
import Avatar2 from '@/assets/avatars/2-avatar.svg'
import Avatar3 from '@/assets/avatars/3-avatar.svg'
import Avatar4 from '@/assets/avatars/4-avatar.svg'

export default {
  components: {
    GameTeamScore,
    GameTimer,
    PauseTooltip,
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
  },

  props: {
    currentTeam: {
      type: String,
      reqiured: true,
    },
  },

  data() {
    return {
      avatars: [
        'Avatar1',
        'Avatar2',
        'Avatar3',
        'Avatar4',
      ]
    };
  },

  computed: {
    ...mapState('settings', [
      'skipsLimit',
      'timeLimit',
    ]),

    ...mapState('game', [
      'gameState',
    ]),

    ...mapGetters('timer', ['timeLeft']),
    ...mapGetters('settings', ['isPauseTooltipVisible', 'emojis']),

    teamData() {
      const { correct, skipped } = this.$store.state.game[this.currentTeam];

      return {
        correct,
        emoji: this.emojis[this.currentTeam],
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
  justify-content: center;
}

.timer {
  margin: 0 50px;
}

.teamIcon {
  position: relative;
  width: 60px;
  margin-top: 10px;
}

.teamScore {
  width: 60px;
}

.pauseTooltip {
  @include absolute(left 0 right 0);

  max-width: 310px;
  margin: 5px auto;
}
</style>

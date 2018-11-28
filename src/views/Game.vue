<template>
  <div :class="$style.container">
    <GameHeader
      :round-number="currentRound"
      :team-name="currentTeam"
      @togglePause="togglePause"
    />
    <GameScoreboard
      @pause="pause"
      @resume="resume"
      @timesUp="handleFinishTurn"
    />

    <main :class="$style.main">
      <transition name="t-fade">
        <GameStarter
          v-if="isGameReady"
          key="starter"
          :class="$style.section"
          :is-team-a-turn="isTeamATurn"
          :current-round="currentRound"
          :emoji="currentTeamEmoji"
          @play="start"
        />

        <GamePlay
          v-else-if="showGamePlay"
          key="play"
          :class="$style.section"
          :cards="visibleCards"
          :is-skip-disabled="skipsLimitReached"
          @correctAnswer="handleCorrectAnswer"
          @incorrectAnswer="handleIncorrectAnswer"
          @cardSkipped="handleCardSkipped"
          @hideCard="removeCardFromDeck"
        />

        <div
          v-else-if="isGameTimedOut"
          key="timeout"
          data-test="game-timeout"
          :class="[$style.timeout, $style.section]"
        >
          {{ $t('views.game.timesup') }}
        </div>

        <GamePauseScreen
          v-else-if="isGamePaused"
          key="pause"
          :class="$style.section"
          @continueGame="resume"
        />
      </transition>
    </main>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
} from 'vuex';

import GameHeader from '@/components/GameHeader/GameHeader';
import GameScoreboard from '@/components/GameScoreboard/GameScoreboard';
import GameStarter from '@/components/GameStarter/GameStarter';
import GamePlay from '@/components/GamePlay/GamePlay';
import GamePauseScreen from '@/components/GamePauseScreen/GamePauseScreen';
import { waitFor } from '@/utils/helpers';
import { timeoutDelay, gameStateReady } from '@/consts';

export default {
  components: {
    GameHeader,
    GameScoreboard,
    GameStarter,
    GamePlay,
    GamePauseScreen,
  },

  data() {
    return {
      startTime: Date.now(),
      timeTrackingEnabled: false,
    };
  },

  computed: {
    ...mapState('game', [
      'currentRound',
    ]),

    ...mapState('timer', [
      'isRunning',
      'timePassed',
    ]),

    ...mapState('cards', [
      'allCards',
      'visibleCards',
    ]),

    ...mapGetters([
      'currentTeamEmoji',
    ]),

    ...mapGetters('cards', [
      'areCardsLoaded',
    ]),

    ...mapGetters('game', [
      'isGameReady',
      'isGamePlaying',
      'isGamePaused',
      'isGameTimedOut',
      'isTeamATurn',
      'winner',
      'skipsLimitReached',
    ]),

    showGamePlay() {
      return this.isGamePlaying && this.areCardsLoaded && this.isRunning;
    },

    currentTeam() {
      const translationKey = `general.${this.isTeamATurn ? 'team_a' : 'team_b'}`;
      return this.$t(translationKey);
    },
  },

  watch: {
    showGamePlay(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.enableTimeTracking();
      }
    },
    isGamePaused(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.disableTimeTracking();
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // direct visit on /game (including initial redirect)
      // results in "from.name" to be "null",
      // so we only reset the game when user intentionally
      // navigated to this page
      if (from.name) {
        vm.prepareGame();
        vm.prepareCards();
      } else if (vm.isGameTimedOut) {
        vm.completeCurrentTurn();
      } else {
        vm.pauseGame();
        vm.disableTimeTracking();
      }
    });
  },

  destroyed() {
    this.resetTimer();
  },

  methods: {
    ...mapActions(['startGame', 'pauseGame', 'prepareGame']),

    ...mapActions('game', [
      'showTimeout',
      'finishTurn',
      'updateFastestAnswerTime',
    ]),

    ...mapActions('timer', [
      'resetTimer',
    ]),

    ...mapActions('cards', [
      'prepareCards',
      'loadNextCard',
    ]),

    ...mapMutations('game', [
      'incrementCorrectScore',
      'incrementIncorrectScore',
      'incrementSkippedCards',
      'setGameState',
    ]),

    handleCardSkipped() {
      this.incrementSkippedCards();
      this.showNextCard();
    },

    handleCorrectAnswer() {
      if (this.timeTrackingEnabled) {
        const answerTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.updateFastestAnswerTime(answerTime);
      }
      this.incrementCorrectScore();
      this.showNextCard();
    },

    async handleFinishTurn() {
      this.removeCardFromDeck();
      this.showNextCard();
      this.showTimeout();
      await waitFor(timeoutDelay);
      this.completeCurrentTurn();
    },

    handleIncorrectAnswer() {
      this.incrementIncorrectScore();
      this.showNextCard();
    },

    removeCardFromDeck() {
      this.visibleCards.shift();
    },

    showNextCard() {
      this.loadNextCard();
      this.enableTimeTracking();
    },

    disableTimeTracking() {
      this.timeTrackingEnabled = false;
      this.startTime = null;
    },

    enableTimeTracking() {
      this.timeTrackingEnabled = true;
      this.startTime = Date.now();
    },

    completeCurrentTurn() {
      this.resetTimer();
      this.finishTurn();
    },

    togglePause() {
      if (this.isGamePaused) this.resume();
      else this.pause();
    },

    start() {
      this.startGame();
    },

    pause() {
      this.pauseGame();
    },

    resume() {
      if (this.timePassed === 0) this.setGameState(gameStateReady);
      else this.startGame();
    },
  },
};
</script>

<style module lang="scss">
.container {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.main {
  position: relative;
  flex: 1;
}

.section {
  @include absolute(top 0 left 0 right 0 bottom 0);
}

.timeout {
  @include flex-center();

  top: -60px;
  margin: auto;
  font-size: $fs-huge;
  color: $c-red;
}
</style>

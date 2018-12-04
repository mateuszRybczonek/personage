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
      :current-team="currentTeam"
    />

    <main :class="$style.main">
      <transition name="t-fade">
        <GameSummary
          v-if="showGameSummary"
          key="summary"
          :class="$style.section"
          @goToNextRound="goToNextRound"
          @finishGame="handleFinishGame"
        />

        <GameStarter
          v-else-if="isGameReady"
          key="starter"
          :class="$style.section"
          :current-round="currentRound"
          :current-team="currentTeam"
          :emoji="emoji"
          @play="start"
        />

        <GamePlay
          v-else-if="showGamePlay"
          key="play"
          :class="$style.section"
          :cards="visibleCards"
          :is-skip-disabled="skipsLimitReached || isLastCard"
          @correctAnswer="handleCorrectAnswer"
          @incorrectAnswer="handleIncorrectAnswer"
          @cardSkipped="handleCardSkipped"
          @hideCard="removeCardFromDeck"
        />

        <div
          v-else-if="isGameTimedOut || isGameFinished"
          key="timeout"
          data-test="game-timeout"
          :class="[$style.timeout, $style.section]"
        >
          {{ $t(timeoutScreenLabelKey) }}
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
import GameSummary from '@/components/GameSummary/GameSummary';
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
    GameSummary,
  },

  data() {
    return {
      startTime: Date.now(),
      timeTrackingEnabled: false,
      showGameSummary: false,
      timeoutScreenLabelKey: 'views.game.timesup',
    };
  },

  computed: {
    ...mapState('game', [
      'currentRound',
      'currentTeam',
    ]),

    ...mapState('timer', [
      'isRunning',
      'timePassed',
    ]),

    ...mapState('cards', [
      'allCards',
      'currentGameCards',
      'visibleCards',
      'playedCards',
    ]),

    ...mapGetters('cards', [
      'areCardsLoaded',
      'isLastCard',
    ]),

    ...mapGetters('game', [
      'isGameFinished',
      'isGameReady',
      'isGamePlaying',
      'isGamePaused',
      'isGameTimedOut',
      'winner',
      'skipsLimitReached',
    ]),

    ...mapGetters('settings', [
      'emojis',
      'teamsLimit',
    ]),

    showGamePlay() {
      return this.isGamePlaying && this.areCardsLoaded && this.isRunning;
    },

    emoji() {
      return this.emojis[this.currentTeam];
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
        vm.prepareInitialCards();
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
      'finishGame',
      'nextRound',
      'updateFastestAnswerTime',
    ]),

    ...mapActions('timer', [
      'resetTimer',
    ]),

    ...mapActions('cards', [
      'loadNextCard',
      'prepareInitialCards',
      'prepareCardsForNextRound',
      'prepareCardsForNextTurn',
      'resetCurrentGameCards',
    ]),

    ...mapMutations('game', [
      'incrementCorrectScore',
      'incrementIncorrectScore',
      'incrementSkippedCards',
      'setGameState',
    ]),

    handleCardSkipped() {
      this.incrementSkippedCards();
      this.showNextCard('skipped');
    },

    async handleCorrectAnswer() {
      if (this.timeTrackingEnabled) {
        const answerTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.updateFastestAnswerTime(answerTime);
      }
      this.$_playSound('correct');
      this.incrementCorrectScore();
      if (this.currentGameCards.length) {
        this.showNextCard('correct');
      } else {
        this.$_playSound('summary');
        this.resetTimer();
        if (this.currentRound === 3) {
          this.timeoutScreenLabelKey = 'views.game.end_of_game';
        } else {
          this.timeoutScreenLabelKey = 'views.game.end_of_round';
        }
        this.showTimeout();
        await waitFor(timeoutDelay);
        this.showGameSummary = true;
        this.prepareCardsForNextRound();
      }
    },

    goToNextRound() {
      this.showGameSummary = false;
      this.nextRound();
    },

    handleFinishGame() {
      this.showGameSummary = false;
      this.$_redirectWithSound({ name: 'setup' });
      this.setGameState(gameStateReady);
    },

    async handleFinishTurn() {
      this.timeoutScreenLabelKey = 'views.game.timesup';
      this.showTimeout();
      await waitFor(timeoutDelay);
      this.completeCurrentTurn();
    },

    async handleIncorrectAnswer() {
      this.$_playSound('incorrect');
      this.resetTimer();
      this.timeoutScreenLabelKey = 'views.game.wrong_answer';
      this.showTimeout();
      await waitFor(timeoutDelay);
      this.completeCurrentTurn();
    },

    removeCardFromDeck() {
      this.visibleCards.shift();
    },

    showNextCard(actionType) {
      this.loadNextCard(actionType);
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
      this.prepareCardsForNextTurn();
    },

    togglePause() {
      if (this.isGamePaused) this.resume();
      else this.pause();
    },

    start() {
      this.$_playSound('turnStart');
      this.startGame();
    },

    pause() {
      this.$_playSound('pause');
      this.pauseGame();
    },

    resume() {
      this.$_playSound('resume');
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
  flex-direction: column;
}
</style>

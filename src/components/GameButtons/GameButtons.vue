<template>
  <div :class="$style.buttons">
    <GameButton
      data-test="game-button-incorrect"
      @click="incorrect"
    >
      <WrongIcon />
    </GameButton>

    <GameButton
      data-test="game-button-skip"
      :disabled="isSkipDisabled"
      @click="skip"
    >
      <SkipIcon />
    </GameButton>

    <GameButton
      data-test="game-button-correct"
      @click="correct"
    >
      <OkIcon />
    </GameButton>
  </div>
</template>

<script>
import GameButton from '@/components/GameButton/GameButton';
import WrongIcon from '@/assets/wrong.svg';
import SkipIcon from '@/assets/skip.svg';
import OkIcon from '@/assets/ok.svg';
import EventBus from '@/event-bus';
import {
  $GAME_CORRECT_ANSWER,
  $GAME_INCORRECT_ANSWER,
  $GAME_SKIP_CARD,
} from '@/consts';

export default {
  components: {
    GameButton,
    WrongIcon,
    SkipIcon,
    OkIcon,
  },

  props: {
    isSkipDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    correct() {
      EventBus.$emit($GAME_CORRECT_ANSWER);
    },

    skip() {
      EventBus.$emit($GAME_SKIP_CARD);
    },

    incorrect() {
      EventBus.$emit($GAME_INCORRECT_ANSWER);
    },
  },
};
</script>

<style module lang="scss">
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>

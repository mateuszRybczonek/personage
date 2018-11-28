<template>
  <div
    data-test="game-pause"
    :class="$style.container"
  >
    <div :class="$style.text">
      {{ $t('views.game.paused') }}
    </div>
    <button
      data-test="continue-button"
      class="btn btnPrimary"
      :class="$style.button"
      @click="$emit('continueGame')"
    >
      {{ $t('views.game.continue') }}
    </button>
    <button
      data-test="new-game-link"
      @click="$_redirectWithSound({ name: 'setup' })"
    >
      {{ $t('views.game.new_game') }}
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="scss">
  .container {
    display: flex;
    padding: 0 rem(30px) rem(30px);
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .text {
    margin-top: auto;
    font-size: $fs-huge;
    text-transform: uppercase;
    color: $primary-gradient-end;
  }

  .button {
    margin-top: auto;
    margin-bottom: rem(12px);

    @media #{$mobile-md-v-up} {
      margin-bottom: rem(26px);
    }
  }
</style>

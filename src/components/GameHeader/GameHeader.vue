<template>
  <div :class="$style.gameHeader">
    <button
      :class="$style.gameHeaderNav"
      data-test="header-nav"
      @click="$emit('togglePause')"
    >
      <DotsIcon />
    </button>
    <span
      data-test="game-header-round"
      :class="$style.gameHeaderRound"
    >
      {{ $t('game.round') }} {{ roundNumber }} - {{ teamName }}
    </span>
    <ConnectionStatus :class="$style.gameHeaderConnectionStatus" />
  </div>
</template>

<script>
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus';
import DotsIcon from '@/assets/dots.svg';

export default {
  components: {
    ConnectionStatus,
    DotsIcon,
  },

  props: {
    roundNumber: {
      type: Number,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style module lang="scss">
.gameHeader {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;

  &Nav {
    @include absolute(left 15px);
    @include sizing(30px);
    @include flex-center();

    color: $c-white;

    :global(svg) {
      @include sizing(15px);
    }
  }

  &Round {
    font-size: $fs-small;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $c-white;
  }

  &ConnectionStatus {
    @include absolute(right 5px);
  }
}
</style>

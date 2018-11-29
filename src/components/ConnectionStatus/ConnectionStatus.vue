<template>
  <div
    v-if="!isOnline"
    data-test="connection-status"
    :class="$style.badge"
  >
    <OfflineIcon />
    <span :class="$style.text">
      {{ $t('game.offline') }}
    </span>
  </div>
</template>

<script>
import OfflineIcon from '@/assets/wifi-off.svg';

const EVENTS = ['load', 'online', 'offline'];

export default {
  components: {
    OfflineIcon,
  },

  data() {
    return {
      isOnline: navigator.onLine || false,
    };
  },

  mounted() {
    EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus));
  },

  beforeDestroy() {
    EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus));
  },

  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine || false;
    },
  },
};
</script>

<style module lang="scss">
  .badge {
    display: flex;
    padding: 1px 10px;
    font-size: $fs-small;
    border-radius: 20px;
    background-color: $c-navy-light;
    align-items: center;
  }

  .text {
    margin-left: 5px;
  }
</style>

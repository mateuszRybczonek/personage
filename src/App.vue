<template>
  <div
    id="app"
    :class="{ 'hurry-up': hurryUp }"
  >
    <transition name="fade" v-if="isPortraitOriented">
      <router-view />
    </transition>
    <HomescreenTooltip v-if="isPortraitOriented"/>

    <OrientationNotice v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomescreenTooltip from '@/components/HomescreenTooltip/HomescreenTooltip';
import OrientationNotice from '@/components/OrientationNotice/OrientationNotice';
import { preloadSound } from '@/utils/sounds';

const heartbeatSound = preloadSound('hurry', { loop: true });

export default {
  components: {
    HomescreenTooltip,
    OrientationNotice,
  },

  data() {
    return {
      windowHeight: 0,
      isPortraitOriented: window.orientation === 0,
      resizeTimeout: null,
    };
  },

  computed: {
    ...mapGetters('timer', ['hurryUp', 'timeLeft']),
  },

  watch: {
    hurryUp(newValue) {
      if (!this.$store.state.settings.sound) return;
      if (newValue) {
        heartbeatSound.play();
      } else {
        heartbeatSound.stop();
        this.$_playSound('timesup');
      }
    },
  },

  mounted() {
    this.checkOrientation();

    this.$nextTick(() => {
      window.addEventListener('resize', this.resizeThrottler, false);
    });
  },

  methods: {
    resizeThrottler() {
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          this.checkOrientation();
        }, 66);
      }
    },

    checkOrientation() {
      this.isPortraitOriented = (window.innerWidth > 480 && window.innerHeight > 480)
        || window.orientation === 0;
    },
  },
};
</script>

<style lang="scss">
  @import "node_modules/@glidejs/glide/src/assets/sass/glide.core";

  @font-face {
    font-family: $ff-averta;
    font-display: fallback;
    src:
      local('Averta Std Bold'),
      local('AvertaStd-Bold'),
      url("#{$font-path}AvertaStd-Bold.woff2") format('woff2'),
      url("#{$font-path}AvertaStd-Bold.woff") format('woff');
    font-style: normal;
    font-weight: $fw-bold;
  }

  @font-face {
    font-family: $ff-averta;
    font-display: fallback;
    src:
      local('Averta Std Regular'),
      local('AvertaStd-Regular'),
      url("#{$font-path}AvertaStd-Regular.woff2") format('woff2'),
      url("#{$font-path}AvertaStd-Regular.woff") format('woff');
    font-style: normal;
    font-weight: $fw-normal;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    position: fixed;
    overflow: hidden;
    margin: 0;
    padding: 0;
    font-family: $ff-base;
    color: $c-text;
    background: $c-background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: $c-link;
  }

  button {
    padding: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border: 0;
    background: none;
    cursor: pointer;

    &:not(.btn) {
      color: $c-link;
    }
  }

  #app {
    max-width: rem(420px);
    height: 100%;
    margin: 0 auto;
    text-align: center;

    &.hurry-up {
      @include before() {
        @include absolute(top 0 right 0 bottom 0 left 0);

        background: $c-background-light;
        animation: blink 1s infinite;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter-active {
    transition-delay: 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .btn {
    display: block;
    width: 100%;
    max-width: rem(320px);
    padding: rem(16px) rem(30px);
    font-size: $fs-button-sm;
    font-weight: $fw-bold;
    text-decoration: none;
    border: none;
    border-radius: rem(30px);
    color: $c-heading;
    transition: all 0.1s ease-in-out;
    flex: 0 0 auto;

    @media #{$mobile-md-v-up} {
      padding-top: rem(20px);
      padding-bottom: rem(20px);
      font-size: $fs-button-md;
    }

    @media #{$mobile-lg-v-up} {
      padding-top: rem(22px);
      padding-bottom: rem(22px);
      font-size: $fs-button;
    }

    &.is-disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    &Primary {
      background: linear-gradient($primary-gradient-start, $primary-gradient-end);

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.7;
      }

      &:focus {
        box-shadow: 0 -1px 10px 0 $primary-gradient-start;
      }
    }
  }
</style>

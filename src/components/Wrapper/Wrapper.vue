<template>
  <div :class="$style.wrapperContainer">
    <nav
      v-if="!noHeader"
      :class="$style.nav"
      data-test="header"
    >
      <button
        v-if="back"
        data-test="wrapper-go-back-arrow"
        :class="$style.navLink"
        :aria-label="$t('general.go_back')"
        @click="$_redirectWithSound(back, 'click')"
      >
        <BackIcon :class="$style.icon" />
      </button>
      <div :class="$style.navTitle">
        <slot name="header" />
      </div>
        <button
          v-if="showLocale"
          :class="[
            $style.flag,
            $style.navLink,
            $style.pullRight,
          ]"
          data-test="language-flag"
          @click="switchLocale()"
        >
          <component
            :class="$style.flagImage"
            :is="localeSvg"
          />
        </button>
      <button
        v-if="close"
        :class="[
          $style.navLink,
          $style.pullRight,
        ]"
        :aria-label="$t('general.close')"
        data-test="close-page"
        @click="$_redirectWithSound(close, 'click')"
      >
        <CloseIcon :class="$style.icon" />
      </button>
    </nav>
    <main
      :class="[$style.wrapper, {
        'no-header': noHeader,
        'no-padding': noPadding
      }]"
    >
      <slot />
      <footer
        data-test="footer"
        :class="$style.wrapperFooter"
      >
        <slot name="footer" />
      </footer>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import BackIcon from '@/assets/back.svg';
import CloseIcon from '@/assets/close.svg';
import FlagPL from '@/assets/locale/pl.svg';
import FlagEN from '@/assets/locale/en.svg';

export default {
  components: {
    BackIcon,
    CloseIcon,
    FlagEN,
    FlagPL,
  },

  props: {
    back: {
      type: Object,
      default: null,
    },
    close: {
      type: Object,
      default: null,
    },
    showLocale: {
      type: Boolean,
      default: null,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState('settings', ['locale']),

    localeSvg() {
      return this.locale === 'en' ? 'FlagPL' : 'FlagEN';
    },
  },

  methods: {
    ...mapMutations('settings', ['setLocale']),

    switchLocale () {
      const newLocale = this.$i18n.locale === 'pl' ? 'en' : 'pl';
      this.$i18n.locale = newLocale;
      this.setLocale(newLocale);
    },
  }
};
</script>

<style module lang="scss">
  $headerHeight: 60px;

  .nav {
    z-index: $z-index-1;
    display: flex;
    height: rem($headerHeight);
    background-color: $c-background;
    transform: translateZ(0);
    align-items: center;
    justify-content: space-between;
  }

  .navTitle {
    @include absolute(right 0 left 0);

    font-size: $fs-h3;
    font-weight: $fw-bold;
    line-height: rem($headerHeight);
    text-align: center;
    color: $c-heading;
  }

  .navLink {
    @include sizing(52px 60px);

    position: relative;
    z-index: $z-index-1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    @include sizing(15px);

    display: inline-block;
    color: $c-white;
  }

  .flag {
    margin-right: 25px;
    margin-top: 10px;

    &Image {
      @include sizing(40px);
    }
  }

  .wrapperContainer {
    position: relative;
    height: 100%;
  }

  .wrapper {
    @include absolute(top $headerHeight right 0 left 0 bottom 0);

    display: flex;
    overflow-y: scroll;
    padding: 0 rem(30px) rem(30px) rem(30px);
    flex-direction: column;
    -webkit-overflow-scrolling: touch;

    &:global(.no-header) {
      top: 0;
    }

    &:global(.no-padding) {
      padding-right: 0;
      padding-left: 0;
    }
  }

  .wrapperFooter {
    margin-top: auto; /* pull down */
    padding-top: 20px;
    font-size: $fs-button-sm;

    @media #{$mobile-lg-v-up} {
      padding-top: 30px;
      font-size: $fs-button;
    }

    .wrapper:global(.no-padding) & {
      padding-right: 30px;
      padding-left: 30px;
    }

    :global(.btnPrimary) {
      margin: auto auto rem(12px);

      @media #{$mobile-md-v-up} {
        margin-bottom: rem(26px);
      }
    }
  }

  .pullRight {
    margin-left: auto;
  }
</style>

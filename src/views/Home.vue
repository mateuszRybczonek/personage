<template>
  <div :class="$style.home">
    <main :class="$style.home__content">
      <section :class="$style.home__logo">
        <Logo  :class="$style.home__image" />
        <span :class="$style.home__title">PERSONAGE</span>
      </section>
      <button
        class="btn btnPrimary"
        :class="$style.home__button"
        @click="getStarted"
      >
        {{ $t("views.home.get_started") }}
      </button>
    </main>
  </div>
</template>

<script>
import Logo from '@/assets/logo.svg';

export default {
  components: {
    Logo,
  },

  computed: {
    getStartedRouteName() {
      return this.$store.state.onboarding.isFinished
        ? 'setup'
        : 'onboarding';
    },
  },

  methods: {
    getStarted() {
      this.$router.push({ name: this.getStartedRouteName });
    },
  },
};
</script>

<style module lang="scss">
  .home {
    position: relative;
    height: 100%;

    &__content {
      position: relative;
      display: flex;
      height: 100%;
      padding: 0 rem(10px) rem(40px);
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }

    &__logo {
      @include sizing(250px 65vh);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__image {
      @include sizing(250px);
      @include relative(top 40px left -10px);
    }

    &__title {
      font-family: $ff-notime;
      font-size: $fs-huge;
      font-weight: $fw-bold;
      letter-spacing: 5px;
      color: $c-yellow;
    }

    &__button {
      animation: slidein 2s ease-out;
    }
  }
</style>

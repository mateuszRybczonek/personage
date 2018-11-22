<template>
  <div :class="$style.home">
    <main :class="$style.home__content">
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

export default {
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

    &__animation {
      @include absolute(top 0);
      @include sizing(100%);
    }

    &__button {
      animation: slidein 4s ease-out;
    }
  }

  .logo {
    @include sizing(400px);
  }

  @keyframes slidein {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    60% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

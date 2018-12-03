<template>
  <div :class="$style.home">
    <main :class="$style.home__content">
      <section :class="$style.home__logo">
        <img src="@/assets/logo.png" :class="$style.home__image" />
        <span :class="$style.home__title">
          {{ $t('title') }}
        </span>
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

    &__logo {
      @include sizing(250px 65vh);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__image {
      @include sizing(300px);
      @include relative(top 60px);
    }
  }
</style>

<template>
  <div :class="$style.container">
    <div
      data-test="animation-container"
      :class="[$style.animation, {
        'is-visible': playAnimation,
      }]"
    >
      <Animation
        data-test="animation"
        :class="$style.animationItem"
        :path="animation"
        :play="playAnimation"
        :options="{ autoplay: false }"
      />
    </div>
    <div
      data-test="content"
      :class="[$style.content, {
        'is-visible': playAnimation,
      }]"
    >
      <div
        :class="$style.title"
        data-test="title"
      >
        {{ title }}
      </div>
      <div
        :class="$style.description"
        data-test="description"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import Animation from '@/components/Animation/Animation';

export default {
  components: {
    Animation,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    animation: {
      type: String,
      required: true,
    },
    playAnimation: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
  .container {
    display: flex;
    height: 100%;
    padding: 0 30px;
    flex-direction: column;
  }

  .animation {
    height: 202px;
    margin-top: auto;
    opacity: 0;
    transform: scale(0.8) translate3d(0, 0, 0);
    transition: opacity 0.6s ease, transform $ease-in-out 0.6s;

    &:global(.is-visible) {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0);
    }

    @media #{$mobile-md-v-up} {
      height: 45vh;
    }
  }

  .content {
    margin-top: auto;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform ease 0.6s;

    &:global(.is-visible) {
      opacity: 1;
      transform: translateY(0);
    }

    @media #{$mobile-sm-down} {
      display: flex;
      max-height: 130px;
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }
  }

  .title {
    margin-bottom: rem(4px);
    font-size: $fs-h1;
    font-weight: $fw-bold;
    line-height: rem(40px);
    text-align: center;
    color: $c-heading;

    @media #{$mobile-sm-down} {
      font-size: $fs-h3;
    }
  }

  .description {
    font-size: $fs-p;
    line-height: $lh-p;
    text-align: center;
    color: $c-ios-light-grey;

    @media #{$mobile-sm-down} {
      font-size: $fs-small;
    }
  }
</style>

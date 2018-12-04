<template>
  <div :class="$style.container">
    <div :class="$style.imageContainer">
      <img
        data-test="image"
        :src="require(`@/assets/onboarding/${image}.png`)"
        :class="$style.image"
      />
    </div>
    <div
      data-test="content"
      :class="$style.content"
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

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style module lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 75%;
    padding: 0 30px;
  }

  .image {
    margin-top: auto;
    width: 100%;
  }

  .content {
    opacity: 1;
    transform: translateY(40px);

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

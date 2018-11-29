<template>
  <button
    :class="[$style.button, {
      animate: clicked,
    }]"
    @click="click"
  >
    <slot />
    <span
      v-if="hasLabel"
      :class="$style.buttonLabel"
      data-test="button-label"
    >
      <slot name="label" />
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      clicked: false,
    };
  },

  computed: {
    hasLabel() {
      return Boolean(this.$slots.label);
    },
  },

  methods: {
    click() {
      this.clicked = true;
      this.$emit('click');

      setTimeout(() => {
        this.clicked = false;
      }, 600);
    },
  },
};
</script>

<style module lang="scss">
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:global(.animate) {
      pointer-events: none;
      animation: scaleUpAndDown 0.6s;
      animation-timing-function: $ease-in-out;
    }

    &:global([disabled="disabled"]) {
      display: none;
    }
  }

  .buttonLabel {
    margin-top: 10px;
    font-size: $fs-xsmall;
    text-transform: uppercase;
    color: $c-dark-label;
  }
</style>

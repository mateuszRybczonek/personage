<template>
  <span
    data-test="switch"
    :class="$style.switch"
  >
    <input
      data-test="switch-input"
      :class="$style.switchInput"
      :checked="checked"
      :name="name"
      type="checkbox"
    >
    <span
      ref="interactElement"
      data-test="switch-handle"
      :class="$style.switchHandle"
    />
  </span>
</template>

<script>
import interact from 'interact.js';

export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  watch: {
    value(value) {
      this.$emit('change', value);
    },
    checked(value) {
      this.value = value;
    },
  },

  beforeMount() {
    this.value = this.checked;
  },

  mounted() {
    this.$emit('change', this.value);

    interact(this.$refs.interactElement)
      .draggable({
        onmove: (event) => {
          if (event.dx > 0 && this.value !== true) this.value = true;
          if (event.dx < 0 && this.value !== false) this.value = false;
        },
      })
      .on('tap', () => { this.value = !this.value; });
  },
};
</script>

<style lang="scss" module>
.switch {
  @include sizing(52px 31px);

  position: relative;
  display: inline-block;

  &Handle {
    @include absolute(top 0 right 0 bottom 0 left 0);

    cursor: pointer;
    border-radius: 18px;
    background: $dots-inactive;
    transition: 0.4s;

    @include before() {
      @include circle(26px);
      @include absolute(top 1px left 0);

      border: 1px solid $c-switch-dot-border;
      background-color: $c-white;
      transform: translateX(2px);
      transition: all 0.4s;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
    }
  }

  &Input {
    display: none;

    &:checked + .switchHandle {
      background: linear-gradient($primary-gradient-start, $primary-gradient-end);
    }

    &:focus + .switchHandle {
      box-shadow: 0;
    }

    &:checked + .switchHandle::before {
      transform: translateX(22px);
    }
  }
}
</style>

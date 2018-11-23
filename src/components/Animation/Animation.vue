<template>
  <div
    ref="animationContainer"
    :style="style"
  />
</template>

<script>
import lottie from 'lottie-web';

export default {
  props: {
    play: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: null,
    },
    path: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      style: {
        width: this.width ? `${this.width}` : '100%',
        height: this.height ? `${this.height}` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    };
  },

  watch: {
    play(newValue, oldValue) {
      if (oldValue === newValue) return;

      if (newValue) {
        this.anim.play();
      } else {
        this.anim.stop();
      }
    },
  },

  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.path,
      ...this.options,
    });

    if (this.options && !this.options.autoplay && this.play) {
      this.anim.play();
    }

    this.$emit('animCreated', this.anim);
  },
};
</script>

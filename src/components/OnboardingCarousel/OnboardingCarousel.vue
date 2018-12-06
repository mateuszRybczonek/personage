<template>
  <div :class="$style.container">
    <div
      ref="glide"
      class="glide"
    >
      <div
        class="glide__track"
        data-glide-el="track"
      >
        <div
          class="glide__slides"
        >
          <OnboardingCarouselSlide
            v-for="slide in slides"
            :key="slide.title"
            class="glide__slide"
            data-test="slide"
            :title="slide.title"
            :description="slide.description"
            :image="slide[`image_${locale}`]"
            :locale="locale"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide';
import OnboardingCarouselSlide from '@/components/OnboardingCarouselSlide/OnboardingCarouselSlide';

export default {
  components: {
    OnboardingCarouselSlide,
  },

  props: {
    slides: {
      type: Array,
      required: true,
    },
    activeSlideIndex: {
      type: Number,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      nextSlideIndex: 0,
    };
  },

  watch: {
    activeSlideIndex(newValue, prevValue) {
      if (newValue !== prevValue) {
        this.goTo(newValue);
      }
    },
  },

  mounted() {
    this.glide = new Glide(this.$refs.glide, {
      type: 'slider',
      perView: 1,
      focusAt: 'center',
      keyboard: false,
      rewind: false,
    });

    this.glide.on('run.before', (movement) => {
      let newIndex;

      if (movement.direction === '<') newIndex = this.glide.index - 1;
      if (movement.direction === '>') newIndex = this.glide.index + 1;

      if (newIndex > this.slides.length - 1) {
        this.$emit('finishOnboarding');
      } else if (newIndex < 0) {
        newIndex = 0;
      }

      if (newIndex !== undefined) {
        this.$emit('slide', Number(newIndex));
      }
    });

    this.glide.mount();
  },

  methods: {
    goTo(index) {
      this.glide.go(`=${index}`);
    },
  },
};
</script>

<style module lang="scss">
  .container {
    flex: 1;
  }

  :global(.glide),
  :global(.glide__track),
  :global(.glide__slides) {
    height: 100%;
  }
</style>

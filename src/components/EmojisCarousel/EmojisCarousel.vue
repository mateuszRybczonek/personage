<template>
  <div
    data-test="emojis-carousel"
    :class="$style.container"
  >
    <h4
      :class="$style.title"
      data-test="slider-title"
    >
      {{ title }}
    </h4>
    <div
      data-test="emojis-carousel-slider"
      :class="$style.sliderContainer"
    >
      <div
        ref="glide"
        class="glide"
      >
        <div
          class="glide__track"
          data-glide-el="track"
        >
          <ul
            class="glide__slides"
            :class="$style.slides"
          >
            <li
              v-for="(emojiName, index) in items"
              :key="emojiName"
              class="glide__slide"
              :class="[$style.slide, {
                'is-active': emojiName === activeItem
              }]"
              data-test="slide"
              @click="goTo(index)"
            >
              <Animation
                :path="`/anim/emoji/happy/${emojiName}.json`"
                :play="emojiName === activeItem"
                :options="{ autoplay: false }"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide';
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
    items: {
      type: Array,
      required: true,
    },
    activeItem: {
      type: [Number, String],
      default: 0,
    },
  },

  mounted() {
    this.glide = new Glide(this.$refs.glide, {
      type: 'slider',
      perView: 3,
      startAt: this.items.indexOf(this.activeItem),
      focusAt: 'center',
      keyboard: false,
      rewind: false,
    });

    this.glide.on('run.before', (movement) => {
      // Calculate new index ahead of time,
      // to execute animation a bit faster
      let newIndex = movement.direction === '='
        ? movement.steps
        : (this.glide.index - movement.steps);

      if (newIndex > this.items.length - 1) {
        newIndex = this.items.length - 1;
      } else if (newIndex < 0) {
        newIndex = 0;
      }

      this.$emit('onChange', this.items[newIndex]);
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
    margin: 0 -24px 3vh -24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    margin: 7vh 0 15vh;
    font-size: $fs-h2;
    color: $c-white;
  }

  .sliderContainer {
    margin: 2vh 0;

    @media #{$mobile-sm-down} {
      margin: 0;
    }
  }

  .slides {
    height: 20vh;
    margin: 0;

    @media #{$desktop-up} {
      height: 120px;
    }
  }

  .slide {
    opacity: 0.5;
    transition: opacity 0.2s ease;

    > div {
      transform: scale(0.8);
      transition: transform 0.2s ease;
    }

    &:global(.is-active) {
      opacity: 1;

      > div {
        transform: scale(1);
      }
    }
  }
</style>

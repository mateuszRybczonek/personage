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
              <component :is="avatars[index]" :class="$style.avatar" ></component>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide';
import Avatar1 from '@/assets/avatars/1-avatar.svg'
import Avatar2 from '@/assets/avatars/2-avatar.svg'
import Avatar3 from '@/assets/avatars/3-avatar.svg'
import Avatar4 from '@/assets/avatars/4-avatar.svg'

export default {
  components: {
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
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

  data() {
    return {
      avatars: [
        'Avatar1',
        'Avatar2',
        'Avatar3',
        'Avatar4',
      ]
    };
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
    margin: 0 -24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    margin: 0 0 3vh;
    font-size: $fs-h2;
    color: $c-white;
  }

  .sliderContainer {
    margin: 0;

    @media #{$mobile-sm-down} {
      margin: 0;
    }
  }

  .slides {
    height: 20vh;
    margin: 0;
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

  .avatar {
    height: 80px;
  }
</style>

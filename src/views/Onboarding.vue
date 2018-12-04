<template>
  <Wrapper
    :close="{ name: previousRouteName }"
    :no-padding="true"
  >
    <template slot="header">
      {{ $t('views.onboarding.title') }}
    </template>

    <OnboardingCarousel
      :slides="slides"
      :active-slide-index="activeSlideIndex"
      @slide="updateActiveSlide"
      @finishOnboarding="gotIt"
    />

    <template slot="footer">
      <div
        :class="$style.footer"
      >
        <button
          v-if="isFinished"
          data-test="close-link"
          :class="$style.footerLink"
          @click="$_redirect({ name: previousRouteName })"
        >
          {{ $t('views.onboarding.close') }}
        </button>
        <button
          v-else
          data-test="skip-link"
          :class="$style.footerLink"
          @click="gotIt"
        >
          {{ $t('views.onboarding.skip') }}
        </button>

        <ul :class="$style.pagination">
          <li
            v-for="(slide, index) in slides"
            :key="slide.title"
            :class="$style.paginationItem"
          >
            <button
              data-test="dot-link"
              :aria-label="$t('views.onboarding.slide_num', { index })"
              :class="[$style.paginationBullet, {
                'is-active': activeSlideIndex == index
              }]"
              @click="updateActiveSlide(index)"
            />
          </li>
        </ul>

        <button
          v-if="activeSlideIndex < slides.length - 1"
          data-test="next-slide"
          :class="[$style.footerLink, $style.isPrimary]"
          @click="next"
        >
          {{ $t('views.onboarding.next') }}
        </button>
        <button
          v-if="activeSlideIndex === slides.length - 1"
          data-test="got-it"
          :class="[$style.footerLink, $style.isPrimary]"
          @click="gotIt"
        >
          {{ $t('views.onboarding.got_it ') }}
        </button>
      </div>
    </template>
  </Wrapper>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Wrapper from '@/components/Wrapper/Wrapper';
import OnboardingCarousel from '@/components/OnboardingCarousel/OnboardingCarousel';

export default {
  components: {
    Wrapper,
    OnboardingCarousel,
  },

  data() {
    return {
      activeSlideIndex: 0,
      slides: [{
        title: this.$t('views.onboarding_team.title'),
        description: this.$t('views.onboarding_team.description'),
        image: 'onboarding-1',
      }, {
        title: this.$t('views.onboarding_round_1.title'),
        description: this.$t('views.onboarding_round_1.description'),
        image: 'onboarding-2-en',
      }, {
        title: this.$t('views.onboarding_round_2.title'),
        description: this.$t('views.onboarding_round_2.description'),
        image: 'onboarding-3-en',
      }, {
        title: this.$t('views.onboarding_round_3.title'),
        description: this.$t('views.onboarding_round_3.description'),
        image: 'onboarding-4',
      }, {
        title: this.$t('views.onboarding_points.title'),
        description: this.$t('views.onboarding_points.description'),
        image: 'onboarding-1',
      }],
    };
  },

  computed: {
    ...mapState('onboarding', ['isFinished', 'previousRouteName']),
  },

  methods: {
    ...mapMutations('onboarding', ['finishOnboarding', 'setPreviousRouteName']),

    updateActiveSlide(index) {
      this.activeSlideIndex = index;
    },

    next() {
      this.activeSlideIndex += 1;
    },

    gotIt() {
      this.finishOnboarding();
      this.$_redirect({ name: 'setup' });
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setPreviousRouteName(from.name);
    });
  },
};
</script>

<style module lang="scss">
  .contentHolder {
    overflow: hidden;
    flex: 1;
  }

  .footer {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .footerLink {
    position: relative;
    z-index: $z-index-1;
    font-weight: $fw-bold;
    text-decoration: none;
    text-transform: uppercase;
    color: $c-link;

    &.isPrimary {
      color: $c-primary-link;
    }
  }

  .pagination {
    @include absolute(left 0 right 0);

    margin: 0 auto;
    padding: 0;
    list-style-type: none;
  }

  .paginationItem {
    display: inline-block;
    margin: 0 rem(5px);
  }

  .paginationBullet {
    display: inline-block;
    width: rem(8px);
    height: rem(8px);
    text-indent: -9999pt;
    border-radius: 50%;
    background: $dots-inactive;
    vertical-align: middle;

    &:global(.is-active) {
      background: $dots-active;
    }
  }
</style>

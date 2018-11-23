<template>
  <BaseTooltip
    v-if="showAddToHomescreenMessage"
    :arrow-vertical-placement="tooltipArrowVerticalPlacement"
    :arrow-horizontal-placement="tooltipArrowHorizontalPlacement"
    :class="$style.tooltip"
    is-dismissible
    @close="showTooltip = false"
  >
    <div :class="$style.tooltipContent">
      <AddIcon :class="$style.tooltipContentAddIcon" />
      <span :class="$style.tooltipContentDescription">
        {{ $t('general.add_to_homescreen_1') }}
        <ShareIcon :class="$style.tooltipContentShareIcon" />
        {{ $t('general.add_to_homescreen_2') }}
      </span>
    </div>
  </BaseTooltip>
</template>

<script>
import BaseTooltip from '@/components/BaseTooltip/BaseTooltip';
import AddIcon from '@/assets/add.svg';
import ShareIcon from '@/assets/share.svg';

export default {
  components: {
    AddIcon,
    BaseTooltip,
    ShareIcon,
  },

  data() {
    return {
      showTooltip: true,
    };
  },

  computed: {
    isPhone() {
      return window.matchMedia('(max-width: 600px)').matches;
    },

    isIos() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    },

    isInStandaloneMode() {
      return ('standalone' in window.navigator) && window.navigator.standalone;
    },

    isSafari() {
      return !!navigator.userAgent.match(/Version\/[\d]+.*Safari/);
    },

    showAddToHomescreenMessage() {
      return this.showTooltip
        && this.isIos
        && !this.isInStandaloneMode
        && this.isSafari;
    },

    tooltipArrowVerticalPlacement() {
      return this.isPhone ? 'bottom' : 'top';
    },

    tooltipArrowHorizontalPlacement() {
      return this.isPhone ? null : '180px';
    },
  },
};
</script>

<style lang="scss" module>
.tooltip {
  width: 98%;
  padding: 10px 35px 10px 10px;
  font-size: $fs-ios;
  line-height: 1.3;
  color: $c-black;

  @include absolute(bottom 20px left 1%);

  @media #{$tablet-up} {
    @include absolute(top 20px right 10px bottom auto left auto);

    height: 60px;
  }

  &Content {
    display: flex;
    align-items: center;

    &AddIcon {
      @include sizing(60px 40px);

      margin-right: 5px;
      color: $c-ios-dark-grey;
    }

    &Description {
      padding-bottom: 7px;
    }

    &ShareIcon {
      @include sizing(20px);
      @include relative(top 4px);
    }
  }
}
</style>

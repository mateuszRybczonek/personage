<template>
  <div :class="$style.wrapper">
    <span :class="$style.tooltipContent">
      {{ $t('views.game.pause_tooltip') }}
    </span>
    <span
      data-test="arrow"
      :class="$style.arrow"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  position: relative;
  z-index: $z-index-9;
  padding: 10px 0;
  font-size: $fs-ios;
  font-weight: $fw-normal;
  border: solid 1.5px $c-skin;
  border-radius: 20px;
  color: $c-text;
  background-color: transparent;
  animation: bounce 1s infinite alternate;
}

.arrow {
  @include sizing(15px);
  @include absolute(top 0 left 50%);

  @include before() {
    @include sizing(10px);
    @include absolute(top 0 left 50%);

    border: solid 1.5px $c-skin;
    background: $c-background;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
  }

  overflow: hidden;
  transform-origin: 50% 0;
  transform: translate3d(-50%, 0, 0) scaleY(-1);
}
</style>

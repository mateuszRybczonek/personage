<template>
  <div :class="$style.orientationNotice">
    <RotateIcon :class="$style.orientationNotice__image" />
    <span>{{ 'Please turn your device to portait orientation' }}</span>
  </div>
</template>

<script>
import RotateIcon from '@/assets/rotate.svg';

export default {
  components: {
    RotateIcon,
  },
};
</script>

<style lang="scss" module>
.orientationNotice {
  display: flex;
  height: 85vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__image {
    @include sizing(150px);

    fill: $c-white;
  }
}
</style>

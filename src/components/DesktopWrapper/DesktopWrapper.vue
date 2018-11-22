<template>
  <div :class="$style.wrapper">
    <div :class="$style.iframeHolder">
      <iframe
        :class="$style.iframe"
        :src="appUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appUrl: window.location.href,
    };
  },
};
</script>

<style module lang="scss">
  .wrapper {
    @include fixed(top 0 right 0 bottom 0 left 0);
  }

  .iframeHolder {
    @include absolute(top 50% right 0 left 0);

    overflow: hidden;
    width: 375px;
    max-width: 94%;
    max-height: 90%;
    margin: auto;
    border-radius: 20px;
    transform: translateY(-50%);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4);

    @include after() {
      display: block;
      padding-bottom: 178%;
    }
  }

  .iframe {
    @include absolute(top 0 left 0);
    @include sizing(100%);

    border: 0;
  }
</style>

<template>
  <Wrapper>
    <template
      slot="header"
    >
      {{ $t('views.setup.game.title') }}
    </template>

    <SetupContent />

    <template
      slot="footer"
    >
      <button
        class="btn btnPrimary"
        @click="$_redirectWithSound({ name: 'emojis' })"
      >
        {{ $t('views.setup.choose_your_heroes') }}
      </button>
    </template>
  </Wrapper>
</template>

<script>
import Wrapper from '@/components/Wrapper/Wrapper';
import SetupContent from '@/components/SetupContent/SetupContent';

export default {
  components: {
    SetupContent,
    Wrapper,
  },
};
</script>

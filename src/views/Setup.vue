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
        @click="$_redirect({ name: 'emojis' })"
      >
        {{ $t('views.setup.choose_your_heroes') }}
      </button>
      <button @click="$_redirect({ name: 'onboarding' })">
        {{ $t('views.setup.game_rules') }}
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

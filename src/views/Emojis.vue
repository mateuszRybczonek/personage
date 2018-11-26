<template>
  <Wrapper :back="{name: 'setup'}">
    <template slot="header">
      {{ $t('views.emojis.title') }}
    </template>

    <EmojisContent />

    <template slot="footer">
      <button
        class="btn btnPrimary"
        @click="$_redirect({ name: 'categories' })"
      >
        {{ $t('views.emojis.choose_categories') }}
      </button>
      <button @click="$_redirect({ name: 'onboarding' })">
        {{ $t('views.emojis.game_rules') }}
      </button>
    </template>
  </Wrapper>
</template>

<script>
import Wrapper from '@/components/Wrapper/Wrapper';
import EmojisContent from '@/components/EmojisContent/EmojisContent';

export default {
  components: {
    Wrapper,
    EmojisContent,
  },
};
</script>

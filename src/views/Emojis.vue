<template>
  <Wrapper :back="{name: 'setup'}">
    <template slot="header">
      {{ $t('views.emojis.title') }}
    </template>

    <EmojisContent :currentTeam="currentTeam"/>

    <section :class="$style.controlButtons">
      <button
        :class="{ 'is-hidden': currentTeamIndex === 0 }"
        @click="currentTeamIndex -= 1"
      >
        <BackIcon :class="$style.icon" />
        {{ $t('views.emojis.previous') }}
      </button>
      <button
        v-if="currentTeamIndex < teams.length - 1"
        @click="currentTeamIndex += 1"
      >
        {{ $t('views.emojis.next') }}
        <BackIcon :class="$style.nextIcon" />
      </button>
    </section>

    <template slot="footer">
      <button
        class="btn btnPrimary"
        :class="{ 'is-disabled': currentTeamIndex < teams.length - 1 }"
        @click="$_redirect({ name: 'game' })"
      >
        {{ $t('views.emojis.play') }}
      </button>
      <button @click="$_redirect({ name: 'onboarding' })">
        {{ $t('views.emojis.game_rules') }}
      </button>
    </template>
  </Wrapper>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BackIcon from '@/assets/back.svg';
import Wrapper from '@/components/Wrapper/Wrapper';
import EmojisContent from '@/components/EmojisContent/EmojisContent';

export default {
  components: {
    BackIcon,
    EmojisContent,
    Wrapper,
  },

  data() {
    return {
      currentTeamIndex: 0,
    };
  },

  computed: {
    ...mapState('settings', ['emojis']),

    teams() {
      return Object.keys(this.emojis)
    },

    currentTeam() {
      return this.teams[this.currentTeamIndex];
    }
  }
};
</script>

<style lang="scss" module>
  .controlButtons {
    display: flex;
    margin-bottom: 50px;
    justify-content: space-between;
  }

  .icon {
    @include relative(top 1px left -5px);
  }

  .nextIcon {
    @include relative(top 1px left 5px);

    transform: rotateY(180deg);
  }
</style>

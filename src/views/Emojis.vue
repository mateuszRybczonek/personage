<template>
  <Wrapper :back="{name: 'setup'}">
    <template slot="header">
      {{ $t('views.emojis.title') }}
    </template>

    <EmojisContent :currentTeam="currentTeam"/>

    <section :class="$style.controlButtons">
      <button
        :class="{ 'is-hidden': currentTeamIndex === 0 }"
        @click="previousTeam"
      >
        <BackIcon :class="$style.icon" />
      </button>
      <button
        v-if="currentTeamIndex < teams.length - 1"
        @click="nextTeam"
      >
        <BackIcon :class="$style.nextIcon" />
      </button>
    </section>

    <template slot="footer">
      <button
        class="btn btnPrimary"
        :class="{ 'is-disabled': currentTeamIndex < teams.length - 1 }"
        @click="$_redirectWithSound({ name: 'game' }, 'start')"
      >
        {{ $t('views.emojis.play') }}
      </button>
      <button @click="$_redirectWithSound({ name: 'onboarding' })">
        {{ $t('views.emojis.game_rules') }}
      </button>
    </template>
  </Wrapper>
</template>

<script>
import { mapState } from 'vuex';
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
      return Object.keys(this.emojis);
    },

    currentTeam() {
      return this.teams[this.currentTeamIndex];
    },
  },

  methods: {
    previousTeam() {
      this.$_playSound('click');
      this.currentTeamIndex -= 1;
    },

    nextTeam() {
      this.$_playSound('click');
      this.currentTeamIndex += 1;
    },
  },
};
</script>

<style lang="scss" module>
  .controlButtons {
    display: flex;
    justify-content: space-between;
  }

  .icon {
    @include absolute(top 22px left 60px);
  }

  .nextIcon {
    @include absolute(top 22px right 60px);

    transform: rotateY(180deg);
  }
</style>

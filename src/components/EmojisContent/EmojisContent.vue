<template>
  <section :class="$style.container">
    <transition name="fade">
      <EmojisCarousel
        :key="currentTeam"
        :title="formatTeamName(currentTeam)"
        :items="emojisForTeam"
        :active-item="emojis[currentTeam]"
        @onChange="handleSetTeamEmoji($event, currentTeam)"
      />
    </transition>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { emojisForTeam } from '@/consts';
import EmojisCarousel from '@/components/EmojisCarousel/EmojisCarousel';

export default {
  components: {
    EmojisCarousel,
  },

  props: {
    currentTeam: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      emojisForTeam,
    };
  },

  computed: {
    ...mapState('settings', ['emojis']),
  },

  methods: {
    ...mapMutations('settings', ['setTeamEmoji']),

    handleSetTeamEmoji(emoji, team) {
      this.setTeamEmoji({ team, emoji });
    },

    formatTeamName(team) {
      return team.replace(/([A-Z])/g, ' $1').trim().replace(/^./, char => char.toUpperCase());
    },
  },
};
</script>

<style module lang="scss">
  .container {
    overflow: hidden;
    margin-top: 15px;
    flex: 1;
  }
</style>

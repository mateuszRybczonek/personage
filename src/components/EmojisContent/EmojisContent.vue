<template>
  <section :class="$style.container">
    <transition name="fade" mode="out-in">
      <EmojisCarousel
        :key="currentTeam"
        :title="currentTeam.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (char) => char.toUpperCase())"
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

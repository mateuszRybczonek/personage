<template>
  <section :class="$style.container">
    <EmojisCarousel
      v-for="team in Object.keys(emojis)"
      :key="team"
      :title="team.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (char) => char.toUpperCase())"
      :items="emojisForTeam"
      :active-item="emojis[team]"
      @onChange="handleSetTeamEmoji($event, team)"
    />
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

<template>
  <section :class="$style.container">
    <EmojisCarousel
      :title="$t('general.team_a')"
      :items="emojisForTeam"
      :active-item="teamAEmoji"
      @onChange="handleSetTeamAEmoji"
    />
    <EmojisCarousel
      :title="$t('general.team_b')"
      :items="emojisForTeam"
      :active-item="teamBEmoji"
      @onChange="handleSetTeamBEmoji"
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
    ...mapState('settings', [
      'teamAEmoji',
      'teamBEmoji'
      ]),
  },
  methods: {
    ...mapMutations('settings', ['setTeamAEmoji', 'setTeamBEmoji']),

    handleSetTeamAEmoji(emoji) {
      this.setTeamAEmoji(emoji);
    },

    handleSetTeamBEmoji(emoji) {
      this.setTeamBEmoji(emoji);
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

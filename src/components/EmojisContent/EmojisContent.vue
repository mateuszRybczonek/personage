<template>
  <section :class="$style.container">
    <TransitionGroup name="fade" mode="out-in">
      <div :key="currentTeam">
        <EmojisCarousel
          :team="currentTeam"
          :items="emojisForTeam"
          :active-item="emojis[currentTeam]"
          @onChange="handleSetTeamEmoji($event, currentTeam)"
        />
        <div
          :class="$style.figureContainer"
        >
          <Component
            :class="$style.figure"
            :is="figures[ emojis[currentTeam]]"
          />
          <a :class="$style.figureCredits"
            href="https://www.freepik.com/free-vector/funny-monsters-avatars_764473.htm"
          >
            {{ $t('general.freepik_credit') }}
          </a>
        </div>
      </div>
    </TransitionGroup>
   </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { emojisForTeam } from '@/consts';
import EmojisCarousel from '@/components/EmojisCarousel/EmojisCarousel';
import Figure1 from '@/assets/avatars/1-figure.svg';
import Figure2 from '@/assets/avatars/2-figure.svg';
import Figure3 from '@/assets/avatars/3-figure.svg';
import Figure4 from '@/assets/avatars/4-figure.svg';

export default {
  components: {
    EmojisCarousel,
    Figure1,
    Figure2,
    Figure3,
    Figure4,
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
      figures: [
        'Figure1',
        'Figure2',
        'Figure3',
        'Figure4',
      ],
    };
  },

  computed: {
    ...mapState('settings', ['emojis']),
  },

  methods: {
    ...mapMutations('settings', ['setTeamEmoji']),

    handleSetTeamEmoji(emoji, team) {
      this.$_playSound('paperTurnPage');
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

  .figureContainer {
    display: flex;
    height: 35vh;
    margin-top: 5vh;
    flex-direction: column;
  }

  .figure {
    height: 100px;

    @media #{$mobile-lg-v-up} {
      height: 100%;
    }

    &Credits {
      @include relative(top 15px);

      font-size: $fs-xsmall;
      align-self: center;
    }
  }
</style>

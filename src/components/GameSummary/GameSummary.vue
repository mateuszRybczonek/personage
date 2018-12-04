<template>
  <div
    ref="interactElement"
    data-test="game-summary"
    :class="[
      $style.container,
      { [$style.animated]: interactAnimating }
    ]"
    :style="{ transform: transformString }"
  >
    <h3
      :class="$style.title"
      data-test="title"
    >
      {{ $t('views.summary.title') }}
    </h3>

    <div :class="$style.tableHolder">
      <table :class="$style.table">
        <thead>
          <tr>
            <th />
            <th :class="$style.tableLabel">
              {{ $t('views.summary.correct') }}
            </th>
            <th :class="$style.tableLabel">
              {{ $t('views.summary.incorrect') }}
            </th>
            <th :class="$style.tableLabel">
              {{ $t('views.summary.skipped') }}
            </th>
            <th :class="$style.tableLabel">
              {{ $t('views.summary.fastest_answer') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.name">
            <td data-test="cell-correct">
              <span :class="$style.teamName">
                {{ team.name }}
              </span>
              <Component :is="figures[team.emoji]"
                data-test="team-emoji"
                :class="$style.teamEmoji"
              />
            </td>
            <td data-test="cell-correct">
              {{ team ? team.correct : '' }}
            </td>
            <td data-test="cell-incorrect">
              {{ team ? team.incorrect : '' }}
            </td>
            <td data-test="cell-skipped">
              {{ team ? team.skipped : '' }}
            </td>
            <td data-test="cell-fastest-answer">
              {{ team ? team.fastestAnswer : '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="$style.summaryControls">
      <button
        v-if="currentRound === 3"
        class="btn btnPrimary"
        @click="$_redirectWithSound({ name: 'setup' })"
      >
        {{ $t('views.summary.new_game') }}
      </button>
    </div>
  </div>
</template>

<script>
import interactMixin from '@/mixins/interact';
import {
  teamA,
  teamB,
  teamC,
  teamD,
  teamE,
  teamF,
  emojisForTeam,
} from '@/consts';
import Avatar1 from '@/assets/avatars/1-avatar.svg';
import Avatar2 from '@/assets/avatars/2-avatar.svg';
import Avatar3 from '@/assets/avatars/3-avatar.svg';
import Avatar4 from '@/assets/avatars/4-avatar.svg';
import { mapState } from 'vuex';

export default {
  components: {
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
  },

  mixins: [interactMixin],

  data() {
    return {
      interactLockYAxis: true,
      interactLockSwipeLeft: true,
      emojisForTeam,
      figures: [
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
      ],
    };
  },

  computed: {
    ...mapState('settings', ['emojis']),
    ...mapState('game', ['currentRound']),

    teams() {
      const { $store: { state: { game } } } = this;

      const teams = [
        { ...game[teamA], name: 'A', emoji: this.emojis[teamA] },
        { ...game[teamB], name: 'B', emoji: this.emojis[teamB] },
        { ...game[teamC], name: game[teamC] ? 'C' : null, emoji: this.emojis[teamC] },
        { ...game[teamD], name: game[teamD] ? 'D' : null, emoji: this.emojis[teamD] },
        { ...game[teamE], name: game[teamE] ? 'E' : null, emoji: this.emojis[teamE] },
        { ...game[teamF], name: game[teamF] ? 'F' : null, emoji: this.emojis[teamF] },
      ];

      return teams.sort((a, b) => {
        if (a.correct < b.correct) return 1;
        if (b.correct < a.correct) return -1;
        return 0;
      });
    },
  },

  methods: {
    draggedRight() {
      this.interactUnsetElement();
      this.interactSetPosition({
        x: this.interactOutOfSightXCoordinate,
      });

      setTimeout(() => this.$emit('goToNextRound'), 100);
    },
  },
};
</script>

<style module lang="scss">
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;

    &.animated {
      transition: transform 0.5s $ease-out-back;
    }
  }

  .title {
    margin: 35px 0 10px;
    font-size: $fs-h1;
    color: $c-white;
  }

  .tableHolder {
    margin: 0;
  }

  .table {
    width: 100%;
    color: $c-white;

    @media #{$mobile-sm-down} {
      font-size: $fs-small;
    }

    :global(td),
    :global(th) {
      padding: 5px 0;

      &:first-child {
        width: 25%;
        white-space: nowrap;
      }
    }
  }

  .tableLabel {
    font-size: $fs-xsmall;
    text-align: left;
  }

  .teamEmoji {
    @include sizing(25px);
  }

  .teamName {
    @include relative(right 5px bottom 8px);
  }

  .summaryControls {
    display: flex;
    justify-content: center;
  }
</style>

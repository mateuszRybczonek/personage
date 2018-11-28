<template>
  <div
    data-test="game-summary"
    :class="$style.container"
  >
    <h3
      :class="$style.title"
      data-test="title"
    >
      <template v-if="winner">
        {{ hasTeamAWon ? $t('views.summary.team_a_wins') : $t('views.summary.team_b_wins') }}
      </template>
      <template v-else>
        {{ $t('views.summary.draw') }}
      </template>
    </h3>

    <Animation
      v-if="winnerEmoji !== null"
      data-test="winner-emoji"
      :path="`/anim/emoji/happy/${winnerEmoji}.json`"
      :class="$style.winnerEmoji"
    />

    <div :class="$style.tableHolder">
      <table :class="$style.table">
        <thead>
          <tr>
            <th />
            <th>
              <Animation
                data-test="team-a-emoji"
                :path="teamAEmojiPath"
                :class="$style.teamEmoji"
              />
            </th>
            <th>
              <Animation
                data-test="team-b-emoji"
                :path="teamBEmojiPath"
                :class="$style.teamEmoji"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr data-test="row-correct">
            <td :class="$style.tableLabel">
              {{ $t('views.summary.correct') }}
            </td>
            <td>{{ teamA.correct }}</td>
            <td>{{ teamB.correct }}</td>
          </tr>
          <tr data-test="row-incorrect">
            <td :class="$style.tableLabel">
              {{ $t('views.summary.incorrect') }}
            </td>
            <td>{{ teamA.incorrect }}</td>
            <td>{{ teamB.incorrect }}</td>
          </tr>
          <tr data-test="row-skipped">
            <td :class="$style.tableLabel">
              {{ $t('views.summary.skipped') }}
            </td>
            <td>{{ teamA.skipped }}</td>
            <td>{{ teamB.skipped }}</td>
          </tr>
          <tr data-test="row-fastest-answer">
            <td :class="$style.tableLabel">
              {{ $t('views.summary.fastest_answer') }}
            </td>
            <td>{{ teamA.fastestAnswer | time }}</td>
            <td>{{ teamB.fastestAnswer | time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Animation from '@/components/Animation/Animation';
import { teamA, teamB } from '@/consts';

export default {
  components: {
    Animation,
  },

  props: {
    teamA: {
      type: Object,
      required: true,
    },
    teamB: {
      type: Object,
      required: true,
    },
    winner: {
      type: String,
      default: null,
    },
  },

  computed: {
    winnerEmoji() {
      if (!this.winner) return null;
      return this.winner === teamA ? this.teamA.emoji : this.teamB.emoji;
    },

    teamAEmojiPath() {
      const mood = this.winner === teamB ? 'sad' : 'happy';
      return `/anim/emoji/${mood}/${this.teamA.emoji}.json`;
    },

    teamBEmojiPath() {
      const mood = this.winner === teamA ? 'sad' : 'happy';
      return `/anim/emoji/${mood}/${this.teamB.emoji}.json`;
    },

    hasTeamAWon() {
      return this.winner === teamA;
    },
  },
};
</script>

<style module lang="scss">
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .title {
    margin: 24px 0 10px;
    font-size: $fs-h1;
    color: $c-white;
  }

  .winnerEmoji {
    flex: 1;

    :global(svg) {
      display: block;
      transform: scale(1.2) translate3d(0, 0, 0);
    }
  }

  .tableHolder {
    margin: auto -20px auto 0;
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
        width: 55%;
        white-space: nowrap;
      }
    }
  }

  .tableLabel {
    text-align: left;
  }

  .teamEmoji {
    max-width: 80px;
  }
</style>

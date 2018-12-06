import { playSound } from '@/utils/sounds';

export default {
  methods: {
    $_playSound(soundName = 'click') {
      if (!this.$store.state.settings.sound) return;
      return playSound(soundName); // eslint-disable-line
    },
    $_redirectWithSound(to, soundName) {
      this.$_playSound(soundName);
      this.$router.push(to);
    },
  },
};

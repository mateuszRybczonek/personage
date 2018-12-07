import Vue from 'vue';
import Router from 'vue-router';

import Emojis from '@/views/Emojis';
import Game from '@/views/Game';
import Home from '@/views/Home';
import Onboarding from '@/views/Onboarding';
import Setup from '@/views/Setup';

import {
  EMOJIS_URL,
  GAME_URL,
  HOME_URL,
  ONBOARDING_URL,
  SETUP_URL,
} from '@/consts';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: HOME_URL,
      name: 'home',
      component: Home,
    },
    {
      path: ONBOARDING_URL,
      name: 'onboarding',
      component: Onboarding,
    },
    {
      path: SETUP_URL,
      name: 'setup',
      component: Setup,
    },
    {
      path: EMOJIS_URL,
      name: 'emojis',
      component: Emojis,
    },
    {
      path: GAME_URL,
      name: 'game',
      component: Game,
    },
  ],
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';

import Emojis from '@/views/Emojis';
import Game from '@/views/Game';
import Home from '@/views/Home';
import Onboarding from '@/views/Onboarding';
import Setup from '@/views/Setup';

import {
  LS_ROUTE_KEY,
  EMOJIS_URL,
  GAME_URL,
  HOME_URL,
  ONBOARDING_URL,
  SETUP_URL,
} from '@/consts';

Vue.use(Router);

let isFirstTransition = true;

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

router.beforeEach((to, from, next) => {
  const lastRouteName = localStorage.getItem(LS_ROUTE_KEY);

  const shouldRedirect = Boolean(to.name === 'home'
    && isFirstTransition
    && lastRouteName
    && lastRouteName !== 'home');

  if (shouldRedirect) {
    next({ name: lastRouteName });
  } else {
    next();
  }

  isFirstTransition = false;
});

router.afterEach((to) => {
  localStorage.setItem(LS_ROUTE_KEY, to.name);
});

export default router;

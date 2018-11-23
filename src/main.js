import Vue from 'vue';
import 'normalize.css';
import './registerServiceWorker';

import AppComponent from './App.vue';
import DesktopWrapper from './components/DesktopWrapper/DesktopWrapper.vue';

import installFilters from './filters';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

installFilters(Vue);

Vue.mixin({
  methods: {
    $_redirect(to) {
      this.$router.push(to);
    },
  },
});

// Up to iPad vertical - display native app
const App = window.matchMedia('(max-width: 768px)').matches ? AppComponent : DesktopWrapper;

new Vue({
  router,
  store,
  i18n,
  created() {
    this.$store.dispatch('cards/loadCards');
  },
  render: h => h(App),
}).$mount('#app');

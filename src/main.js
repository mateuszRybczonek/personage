import Vue from 'vue';
import 'normalize.css';
import './registerServiceWorker';

import AppComponent from './App.vue';

import installFilters from './filters';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import soundsMixin from './mixins/sounds';

Vue.config.productionTip = false;

installFilters(Vue);

Vue.mixin(soundsMixin);

new Vue({
  router,
  store,
  i18n,
  created() {
    this.$store.dispatch('cards/loadCards');
  },
  render: h => h(AppComponent),
}).$mount('#app');

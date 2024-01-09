import Vue from 'vue';
import App from './App.vue';

// index.js
import microApp from '@micro-zoe/micro-app';
import router from './routes';
import './plugins/element';

microApp.start();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

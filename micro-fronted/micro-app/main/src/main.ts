import Vue from 'vue';
import App from './App.vue';

// index.js
import microApp from '@micro-zoe/micro-app';
import router from './routes';
import './plugins/element';

microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值,注意这里的name实际上是页面<micro-app>标签的name值
      'app-vite-demo': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              code = code.replace(
                /(from|import)(\s*['"])(\/app-vite-demo\/)/g,
                all => {
                  return all.replace(
                    '/app-vite-demo/',
                    'http://127.0.0.1:4003/app-vite-demo/'
                  );
                }
              );
            }
            return code;
          },
        },
      ],
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

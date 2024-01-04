import { createApp } from 'vue';
import App from './App.vue';

// 引入组件
import Button from './components/Button.vue';

// 注册组件
const app = createApp(App);
app.component(Button.name, Button);

app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import STUI from './packages/index';
const app = createApp(App);
app.use(STUI);
app.mount('#app');

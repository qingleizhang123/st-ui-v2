import { createApp } from 'vue';
import Element from 'element-ui'; // 引入elementUi，因为要用到elementui里的结构
import Derectives from '@/derective/index';
import App from './App.vue';
import STUI from './packages/index';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/googlecode.css'; // 引入高亮js样式文件
import 'highlight.js/styles/default.css';
const app = createApp(App);
app.use(STUI);
app.use(Derectives);
app.mount('#app');

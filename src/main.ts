import { createApp } from 'vue';
import { Slider } from 'ant-design-vue';
import Derectives from '@/derective/index';
import App from './App.vue';
import STUI from './packages/index';
import './styles/index.less';
import 'element-plus/dist/index.css';
import 'highlight.js/styles/googlecode.css'; // 引入高亮js样式文件
import 'highlight.js/styles/default.css';
const app = createApp(App);
Slider.install(app);
app.use(STUI);
app.use(Derectives);
app.mount('#app');

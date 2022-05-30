import { App } from 'vue';
import DemoBlock from './DemoBlock.vue';

// 定义 install 方法， App 作为参数
DemoBlock.install = (app: App): void => {
  app.component(DemoBlock.name, DemoBlock);
};

export default DemoBlock;

import { App } from 'vue';
import LayoutSwitch from './LayoutSwitch.vue';

// 定义 install 方法， App 作为参数
LayoutSwitch.install = (app: App): void => {
  app.component(LayoutSwitch.name, LayoutSwitch);
};

export default LayoutSwitch;

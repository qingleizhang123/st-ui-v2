import { App } from 'vue';
import Button from './button';
import DemoBlock from './DemoBlock';

// 所有组件列表
const components = [Button, DemoBlock];

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
  // 遍历注册所有组件
  components.map(component => app.component(component.name, component));
};

export { Button, DemoBlock };

export default {
  install,
};

import { App } from 'vue';
import Button from './button';
import ImageButton from './ImageButton';
import DemoBlock from './DemoBlock';
import LayoutSwitch from './LayoutSwitch';
import SeriesList from './SeriesList';

// 所有组件列表
const components = [Button, ImageButton, DemoBlock, LayoutSwitch, SeriesList];

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
  // 遍历注册所有组件
  components.map(component => app.component(component.name, component));
};

export { Button, DemoBlock };

export default {
  install,
};

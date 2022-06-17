import { App } from 'vue';
import ColorPicker from './ColorPicker.vue';

// 定义 install 方法， App 作为参数
ColorPicker.install = (app: App): void => {
  app.component(ColorPicker.name, ColorPicker);
};

export default ColorPicker;

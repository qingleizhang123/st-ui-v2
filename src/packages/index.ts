import { App } from 'vue';
import Button from './button';
import Select from './Select';
import ImageButton from './ImageButton';
import LayoutSwitch from './LayoutSwitch';
import SeriesList from './SeriesList';
import TissueList from './TissueList';
import ColorPicker from './ColorPicker';
import Progress from './Progress';

// 所有组件列表
const components = [Button, Select, ImageButton, LayoutSwitch, SeriesList, TissueList, ColorPicker, Progress];

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
  // 遍历注册所有组件
  components.map(component => app.component(component.name, component));
};

export { Button, Select, ImageButton, LayoutSwitch, SeriesList, TissueList, ColorPicker, Progress };

export default {
  install,
};

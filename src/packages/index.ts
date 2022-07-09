import { App } from 'vue';
import Select from './Select';
import ImageButton from './ImageButton';
import LayoutSwitch from './LayoutSwitch';
import SeriesList from './SeriesList';
import TissueList from './TissueList';
import ColorPicker from './ColorPicker';
import Progress from './Progress';
import ScreenShot from './ScreenShot';
import MessageTip from './MessageTip';

// 所有组件列表
const components = [
  Select,
  ImageButton,
  LayoutSwitch,
  SeriesList,
  TissueList,
  ColorPicker,
  Progress,
  ScreenShot,
  MessageTip,
];

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
  // 遍历注册所有组件
  components.map(component => app.component(component.name, component));
};

export { Select, ImageButton, LayoutSwitch, SeriesList, TissueList, ColorPicker, Progress, ScreenShot, MessageTip };

export default {
  install,
};

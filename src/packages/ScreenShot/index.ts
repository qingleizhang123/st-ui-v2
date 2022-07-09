import { App } from 'vue';
import ScreenShot from './ScreenShot.vue';

ScreenShot.install = (app: App) => {
  app.component(ScreenShot.name, ScreenShot);
};

export default ScreenShot;

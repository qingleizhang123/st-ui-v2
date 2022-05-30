import { App } from 'vue';
import ImageButton from './ImageButton.vue';

ImageButton.install = (app: App) => {
  app.component(ImageButton.name, ImageButton);
};

export default ImageButton;

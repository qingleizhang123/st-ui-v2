import { App } from 'vue';
import SeriesList from './SeriesList.vue';

SeriesList.install = (app: App): void => {
  app.component(SeriesList.name, SeriesList);
};

export default SeriesList;

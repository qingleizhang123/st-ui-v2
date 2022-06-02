import { App } from 'vue';
import TissueList from './TissueList.vue';

TissueList.install = (app: App) => {
  app.component(TissueList.name, TissueList);
};

export default TissueList;

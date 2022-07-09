import { App } from 'vue';
import MessageTip from './MessageTip.vue';

MessageTip.install = (app: App) => {
  app.component(MessageTip.name, MessageTip);
};

export default MessageTip;

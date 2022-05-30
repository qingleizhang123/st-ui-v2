import highlight from './highlight';

const directivesList = {
  highlight,
};

const directives = {
  install(app) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]); // 注册
    });
  },
};

export default directives; // 抛出

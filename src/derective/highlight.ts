import hljs from 'highlight.js'; // 引入高亮js
const highlight = {
  mounted(el, binding) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach(block => {
      hljs.highlightBlock(block);
    });
  },
};

export default highlight;

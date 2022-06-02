<template>
  <!-- 主要用到了三个插槽 -->
  <div
    ref="demoBlock"
    class="demo-block"
    :class="[blockClass, { hover: hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div style="padding: 24px">
      <!-- 第一个是源代码插槽 -->
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <!-- 第二个是描述插槽 -->
        <slot></slot>
      </div>
      <div class="highlight" v-highlight>
        <!-- 第三个是高亮插槽 -->
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="demo-block-control" ref="control" @click="onExpand">
      <transition name="arrow-slide">
        <i :class="[iconClass, { hovering: hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  defineComponent,
  toRefs,
  ref,
  reactive,
  computed,
  ToRefs,
  defineProps,
  onMounted,
  nextTick,
  onUnmounted,
  watch,
} from 'vue';
</script>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'demo-block',
});
const demoBlock = ref(null);
const meta = ref(null);
const control = ref(null);
let [hovering, isExpanded, fixedControl] = toRefs(reactive([false, false, false]));
let scrollParent = null;
const langConfig = {
  'hide-text': '隐藏代码',
  'show-text': '显示代码',
  'button-text': '在线运行',
  'tooltip-text': '前往 jsfiddle.net 运行此示例',
};
const router = useRouter();
const route = useRoute();

const lang = computed(() => {
  return route.path.split('/')[1];
});

const blockClass = computed(() => {
  /* return `demo-${lang} demo-${router.currentRoute.value.path.split('/').pop()}` */
  return 'demo-ch';
});

const iconClass = computed(() => {
  return isExpanded.value ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
});

const controlText = computed(() => {
  return isExpanded.value ? langConfig['hide-text'] : langConfig['show-text'];
});

const codeArea = computed(() => {
  return demoBlock.value.getElementsByClassName('meta')[0];
});

const codeAreaHeight = computed(() => {
  if (demoBlock.value.getElementsByClassName('description').length > 0) {
    return (
      demoBlock.value.getElementsByClassName('description')[0].clientHeight +
      demoBlock.value.getElementsByClassName('highlight')[0].clientHeight +
      20
    );
  }
  return demoBlock.value.getElementsByClassName('highlight')[0].clientHeight;
});

onMounted(() => {
  nextTick(() => {
    const highlight = demoBlock.value.getElementsByClassName('highlight')[0];
    if (demoBlock.value.getElementsByClassName('description').length === 0) {
      highlight.style.width = '100%';
      highlight.borderRight = 'none';
    }
  });
});

watch(isExpanded, val => {
  codeArea.value.style.height = val ? `${codeAreaHeight.value + 1}px` : '0';
  if (!val) {
    fixedControl = false;
    control.value.style.left = '0';
    removeScrollHandler();
    return;
  }
  setTimeout(() => {
    scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
    scrollParent && scrollParent.addEventListener('scroll', scrollHandler);
    scrollHandler();
  }, 200);
});

const scrollHandler = () => {
  const { top, bottom, left } = meta.value.getBoundingClientRect();
  fixedControl = bottom > document.documentElement.clientHeight && top + 44 <= document.documentElement.clientHeight;
};

const removeScrollHandler = () => {
  scrollParent && scrollParent.removeEventListener('scroll', scrollHandler);
};

const onExpand = () => {
  isExpanded.value = !isExpanded.value;
};

onUnmounted(() => {
  removeScrollHandler();
});
</script>

<style lang="scss" scoped>
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;
      line-height: 1.8;
      color: black;
      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>

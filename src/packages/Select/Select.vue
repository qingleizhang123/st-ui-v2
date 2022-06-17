<template>
  <div class="custom-select-wrapper" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <a-select
      :allowClear="false"
      v-model:value="currentValue"
      @change="onChange"
      @dropdownVisibleChange="onDropdownVisibleChange"
      @focus="onFocus"
      :style="customStyle"
      :options="props.options"
      :disabled="props.disabled"
      :showArrow="hideClearIcon"
    >
      <template #suffixIcon><img crossorigin="anonymous" src="assets/images/select_down.svg" /></template>
    </a-select>
    <div
      v-if="props.allowClear"
      @click="clearValue"
      :class="{ 'custom-select-clear': true, hide: hideClearIcon, show: !hideClearIcon }"
    >
      <img src="assets/images/close.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'st-select',
});
</script>

<script setup lang="ts">
import { ref, defineEmits, defineExpose, defineProps, watch, onMounted, computed } from 'vue';
// props定义
interface Props {
  value: string | null; // 下拉框数据 同ant design a-select组件
  options: any; // 下拉框数据同ant design a-select组件
  customStyle?: any; // 下拉框样式
  disabled?: boolean; // 下拉框按钮禁用同ant design a-select组件
  allowClear?: boolean; // 下拉框是否显示清除按钮同ant design a-select组件
  width?: string; // 下拉框宽度
  height?: string; // 下拉框高度
}
const props = withDefaults(defineProps<Props>(), {
  customStyle: { width: '120px', height: '40px' },
  disabled: false,
  value: null,
  allowClear: false,
  width: '120px',
  height: '40px',
});

// 定义内部状态
const hideClearIcon = ref<boolean>(true);
const currentValue = ref<string | null>(props.value);

onMounted(() => {
  // 兼容前置预览页面下拉框
  if (currentValue.value === '-') {
    hideClearIcon.value = true;
  }
});

// 定义事件
const emits = defineEmits<{
  (e: 'change', value: string | null): void;
  (e: 'dropdownVisibleChange', value: boolean): void;
  (e: 'update:value', value: string | null): void;
  (e: 'focus', value: string | null): void;
}>();

// 定义CSS变量
const cssHeight = props.height;
const cssWidth = props.width;

// 计算属性
// 自定义下拉框样式
const customStyle = computed(() => ({ ...props.customStyle, width: props.width, height: props.height }));
const onChange = event => {
  emits('update:value', event);
  emits('change', event);
};

const onDropdownVisibleChange = event => {
  emits('dropdownVisibleChange', event);
};
const onFocus = event => {
  emits('focus', event);
};

const clearValue = () => {
  currentValue.value = null;
  hideClearIcon.value = true;
  emits('change', null);
};

const onMouseOver = () => {
  if (props.allowClear && currentValue.value !== '' && currentValue.value !== null) {
    hideClearIcon.value = false;
  }
};

const onMouseLeave = () => {
  if (props.allowClear && currentValue.value !== '' && currentValue.value !== null) {
    hideClearIcon.value = true;
  }
};

watch(
  () => props.value,
  (newVal, oldVal) => {
    currentValue.value = newVal;
  },
);
</script>

<style scoped lang="less">
.custom-select-wrapper {
  position: relative;
  width: v-bind(cssWidth);
  height: v-bind(cssHeight);

  :deep(.ant-select-selector) {
    width: v-bind(cssWidth);
    height: v-bind(cssHeight);
  }

  :deep(.ant-select-selection-item) {
    line-height: v-bind(cssHeight);
  }
  :deep(.ant-select-arrow) {
    top: 30%;
    width: 24px;
    img {
      height: 24px;
      width: 24px;
      margin: 0;
    }
  }

  .custom-select-clear {
    position: absolute;
    top: 45%;
    right: 16px;
    width: 20px;
    height: 20px;
    margin-top: -9px;
    > img {
      width: 20px;
      height: 20px;
      margin: 0;
    }
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
}
</style>

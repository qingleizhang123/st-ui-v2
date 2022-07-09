<template>
  <a-modal
    :visible="isVisible"
    @update:visible="updateVisible"
    :title="props.title"
    :maskClosable="props.maskClosable"
    :closable="props.closable"
    wrapClassName="message-tip"
  >
    <div class="tip-content">
      <div>
        <img src="assets/images/error.png" />
        <p>{{ props.tipContent }}</p>
      </div>
    </div>
    <div class="bottom-line"></div>
    <template #footer>
      <a-button @click="onCancelClick()">取消</a-button>
      <a-button @click="onOkClick()">确定</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'message-tip',
});
</script>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, toRefs, watch } from 'vue';
// props定义
interface Props {
  isVisible: boolean;
  tipContent: string;
  title?: string;
  maskClosable?: boolean;
  closable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: '提示',
  isVisible: false,
  tipContent: '',
  maskClosable: true,
  closable: true,
});

const updateVisible = e => {
  emits('update:isVisible', e);
};

const emits = defineEmits<{
  (e: 'update:isVisible', isVisible: boolean): void;
  (e: 'onOk'): void;
  (e: 'onCancel'): void;
}>();

const onCancelClick = () => {
  emits('update:isVisible', false);
  emits('onCancel');
};

const onOkClick = () => {
  emits('update:isVisible', false);
  emits('onOk');
};
</script>

<style lang="less">
.message-tip {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 10000;
  .ant-modal {
    top: 250px;
  }
  .ant-modal-content {
    height: 376px;
    width: 640px;
    background: rgba(21, 24, 28, 0.9);
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }

  .ant-modal-header {
    height: 60px;
    background: rgba(21, 24, 28, 0.9);
    background-image: linear-gradient(180deg, #2b313b 0%, rgba(24, 27, 33, 0) 100%);
    box-shadow: inset 0 1px 0 0 #424959;
    border-radius: 4px 4px 0 0;
    border-bottom: none;
    padding: none;
  }

  .ant-modal-title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
  }

  .ant-modal-close-x {
    color: #ffffff;
  }

  .ant-modal-body {
    height: 500px;
    padding: 0px;

    .prompt-box {
      text-align: center;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #ffffff;
      font-weight: 400;
    }

    .ant-divider-horizontal {
      width: 440px;
      min-width: 440px;
      background: #252a33;
      height: 2px;
      margin: 39px 80px 0;
    }
  }

  .ant-modal-footer {
    text-align: center;
    border-top: none;
    padding: 32px;
    height: 114px;
  }

  .ant-modal-footer {
    .ant-btn {
      width: 244px;
      height: 50px;
      background: #434b59;
      border: none;
      box-shadow: none;
      border-radius: 4px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #ffffff;
      font-weight: 400;
      &:last-child {
        background: rgb(4, 133, 111);
        margin-left: 32px;
      }
    }

    .ant-btn-primary {
      background: #04856f;
      margin-left: 32px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #ffffff;
      font-weight: 400;
    }
  }
  // 模态对话框格式

  .tip-content {
    // height: 198px;
    img {
      height: 64px;
      width: 64px;
      margin: 40px auto 24px auto;
      display: block;
    }

    p {
      height: 40px;
      line-height: 40px;
      padding-left: 45px;
      padding-right: 45px;
      font-family: MicrosoftYaHei-Bold, sans-serif;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
    }
  }
  .bottom-line {
    // margin-top:32px;
    background-image: linear-gradient(134deg, rgba(37, 42, 51, 0) 0%, #252a33 50%, rgba(37, 42, 51, 0) 100%);
    height: 2px;
    width: 608px;
    display: flex;
    margin-top: 32px;
  }
}
</style>

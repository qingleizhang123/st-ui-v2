<template>
  <div class="table-tr" :class="{ 'selected-item': tissue.selected }">
    <div class="col-name">
      <div v-if="!canEditName" @dblclick.stop="dbClickName">{{ tissueName }}</div>
      <a-input
        v-else
        v-model:value="tissueName"
        :maxlength="16"
        @blur="endEditName"
        @pressEnter="endEditName"
        ref="inputName"
      ></a-input>
    </div>
    <div class="col-color">
      <div @click.stop="openColor">
        <el-color-picker :model-value="tissueColor" show-alpha />
      </div>
    </div>
    <div class="col-size">
      {{ tissue.volume }}
      <span v-if="tissue.volume">ml</span>
    </div>
    <div class="col-visible">
      <button class="tissue-oper" @click.stop="changeItemVisibility">
        <img class="oper-hide" crossorigin="anonymous" src="assets/images/show.svg" v-if="tissue.visibility" />
        <img class="oper-hide" crossorigin="anonymous" src="assets/images/hide.png" v-else />
      </button>
    </div>
    <div class="col-delete">
      <button class="tissue-oper" @click.stop="deleteTissue" v-if="tissue.selected && tissue.deleteEnabled">
        <img src="assets/images/delete.svg" alt="delelte" :style="{ width: '22px', transform: 'none' }" />
      </button>
    </div>
    <!-- 颜色调节弹框 -->
    <template v-if="isOpenColorSetting">
      <color-setting
        @changeSettingOpen="changeSettingOpen"
        @changeColor="changeColor"
        :style="{ marginTop: '-58px' }"
      ></color-setting>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, nextTick, defineEmits } from 'vue';
import { ElColorPicker } from 'element-plus';
import { TissueItem } from './interface';
import ColorSetting from './ColorSetting.vue';
const props = defineProps<{
  tissue: TissueItem;
  selecCellType: string;
  canEditName: boolean;
}>();

const emits = defineEmits<{
  (e: 'changeColor', color: string): void;
  (e: 'changeVisibility', visibility: string): void;
  (e: 'changeOpacity', opacity: number): void;
  (e: 'deleteTissue'): void;
}>();

const isEditingName = ref(false);
const isOpenColorSetting = ref(false);
const preName = ref('');
const tissueName = ref(props.tissue.name);

const inputName = ref(null);

const dbClickName = () => {
  isEditingName.value = true;
  preName.value = tissueName.value;
  nextTick(() => {
    inputName.value.focus();
  });
};

const endEditName = () => {
  const { tissueId } = props.tissue;
  isEditingName.value = false;
  tissueName.value = tissueName.value.trim();
  const length = tissueName.value.length;
};

// 颜色框修改颜色
const openColor = () => {
  isOpenColorSetting.value = true;
};

const changeSettingOpen = (param: boolean) => {
  isOpenColorSetting.value = param;
};

const changeColor = (color: string) => {
  console.log(color);
  emits('changeColor', props.tissue.tissueId, color);
};

const changeVisibility = () => {
  emits('changeVisibility');
};

const deleteTissue = () => {
  emits('deleteTissue');
};
</script>

<style lang="less">
@height: 35px;

.table-tr {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #303640;
  cursor: pointer;
  padding-left: 24px;
  .col-name {
    flex: 1;
    width: 80px;
    height: @height;
    line-height: @height;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .col-color {
    width: 40px;
    height: 100%;
    margin-top: 0;
    :deep {
      .el-color-picker {
        height: 35px;
      }
      .el-color-picker__trigger {
        border: none;
        width: 24px;
        height: 24px;
        cursor: pointer;
        vertical-align: -14px;
      }
      .el-color-picker__mask {
        display: none;
      }
      .el-color-picker__icon {
        display: none;
      }
    }
  }
  .col-size {
    width: 100px;
    height: @height;
    line-height: @height;
  }

  .col-visible {
    height: @height;
    line-height: @height;
    width: 40px;
  }

  .col-delete {
    width: 40px;
  }

  .tissue-oper {
    float: right;
    padding: 0px;
    height: 35px;
    background: transparent;
    width: 36px;
    margin-right: 18px;
    border: 0;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      transform: translateY(-1px);
    }
  }
  .tissue-oper:hover {
    background: #194547;
    box-shadow: 0px 1px 0px 0px rgb(0 0 0 / 50%);
  }
}

.selected-item {
  background: #1d3a3c;
  border: 1px solid #438981;
}
</style>

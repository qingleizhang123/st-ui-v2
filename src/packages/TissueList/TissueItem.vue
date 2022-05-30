<template>
  <div class="table-tr" :class="{ 'selected-item': tissue.selected }">
    <div class="col-name">
      <div v-if="!isEditingName" @dblclick.stop="dbClickName">{{ tissueName }}</div>
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
        <el-color-picker :model-value="tissueColor" show-alpha :disabled="true" />
      </div>
    </div>
    <div class="col-size">
      {{ tissue.volume }}
      <span v-if="tissue.volume">ml</span>
    </div>
    <div class="col-visible">
      <button class="tissue-oper" @click.stop="changeItemVisibility">
        <img class="oper-hide" crossorigin="anonymous" src="assets/common/show.svg" v-if="tissue.visibility" />
        <img class="oper-hide" crossorigin="anonymous" src="assets/common/hide.png" v-else />
      </button>
    </div>
    <div class="col-delete">
      <button class="tissue-oper" @click.stop="deleteTissue" v-if="tissue.selected && tissue.deleteEnabled">
        <img src="assets/dti/delete.svg" alt="delelte" :style="{ width: '22px', transform: 'none' }" />
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

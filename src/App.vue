<template>
  <div>组件示例</div>
  <div>{{ count }}</div>
  <st-button @click="handleClick">默认按钮</st-button>
  <st-button @click="handleClick" type="primary">主要按钮</st-button>
  <st-button @click="handleClick" type="warning">警告按钮</st-button>
  <st-button @click="handleClick" type="danger">危险按钮</st-button>
  <st-button @click="handleClick" type="success">成功按钮</st-button>

  <demo-block>
    <template #source>
      <st-button>按钮</st-button>
    </template>
    使用type属性来定义 Button 的样式
    <template #highlight> </template>
  </demo-block>
</template>

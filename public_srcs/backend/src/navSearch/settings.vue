<template>
  <div>
    <editorCollapseBox title="按钮主色" defaultExpanded>
      <NInput v-model:value="data.mainColor"/>
    </editorCollapseBox>
    <editorCollapseBox title="按钮辅色" defaultExpanded>
      <NInput v-model:value="data.subsColor"/>
    </editorCollapseBox>
      <p class="text-sm ">只支持hsl格式的颜色，示例：<span class="text-blue">200deg 93% 63%</span>。</p>
  </div>
</template>

<script setup>
const {  editorCollapseBox } = nv.components;
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
</script>

<template>
  <div>
    <editorCollapseBox title="边框颜色" defaultExpanded>
      <NInput v-model:value="data.color"/>
    </editorCollapseBox>
  </div>
</template>

<script setup>
const {  editorCollapseBox } = nv.components;
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
</script>

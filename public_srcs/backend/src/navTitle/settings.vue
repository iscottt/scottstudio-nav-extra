<template>
  <div>
    <editorCollapseBox title="装饰块样式" defaultExpanded>
      <NInput v-model:value="data.style" type="textarea"/>
    </editorCollapseBox>
  </div>
</template>

<script setup>
const { editorColorSelector, editorCollapseBox } = nv.components;
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
</script>

<style scoped>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.icon-list .icon-item {
  width: 28px;
  height: 28px;
  text-align: center;
  font-size: 20px;
  background: #fff;
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .25s;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
}

.icon-list .icon-item.active {
  background: var(--primary-color);
  color: #fff;
}

.is-dark .icon-list .icon-item {
  border-color: #fff;
}

.is-dark .icon-list .icon-item.active {
  border-color: var(--primary-color);
}
</style>

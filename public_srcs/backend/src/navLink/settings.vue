<template>
  <div>
    <editorCollapseBox title="颜色" defaultExpanded>
      <editorColorSelector v-model:value="data.color"/>
    </editorCollapseBox>
    <editorCollapseBox title="图标" defaultExpanded>
      <div class="icon-list">
        <template v-for="icon in iconList" :key="icon">
          <div class="icon-item" :class="{ 'active': data.icon === icon }" @click="chooseIcon(icon)">
            <i :class="`el-icon-${icon}`"></i>
          </div>
        </template>
      </div>
    </editorCollapseBox>
  </div>
</template>

<script setup>
const { editorColorSelector, editorCollapseBox } = nv.components;
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
const iconList = ['info', 'warning', 'success', 'error'];
const chooseIcon = (icon) => {
  data.icon = icon;
}
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

console.log(data)
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

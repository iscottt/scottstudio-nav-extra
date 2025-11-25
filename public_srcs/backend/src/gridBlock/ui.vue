<template>
  <div class="scottstudio-panel" :class="{
    primary: data.type == 'primary',
    error: data.type == 'error',
    warning: data.type == 'warning',
    success: data.type == 'success'
  }">
		  <editorInnerBlocks  class="content grid" :class="`grid-cols-` + (data.cols || 3)" :style="`gap: ${data.gap || 16}px`" :value="content" @update:value="val => { data.text = val }" />
  </div>
</template>

<script setup>
var { ref, reactive, inject, computed } = nv.Vue
var { editorInnerBlocks, editorRichText } = nv.components
var { insert } = nv.editor.blocks;

const $props = defineProps({
  block: {
    type: Object,
  }
})
const { data, type, id } = $props.block;

var content = computed(() => {
  if (typeof (data.text) == 'string') {
    return {}
  }
  else {
    return data.text;
  }
})

// 处理旧数据：text旧数据是string
if (typeof (data.text) == 'string') {
  var __STRING__ = data.text;
  var blocks = [];
  data.text = { blocks };
  __STRING__.split('<br>').forEach((text, index) => {
    insert({
      type: 'paragraph',
      data: { text },
      row: blocks,
      index,
    })
  })
}

</script>

<style scoped>
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.scottstudio-panel {
  --text-color: #000;
  --border-color: rgba(179, 192, 209, 0.3);
  --opacity-color: rgba(179, 192, 209, 0.05);
  --content-color: var(--text-color-2);
  --solid-color: rgba(179, 192, 209, .2);
  border: 1px solid var(--solid-color);
  border-radius: 1rem;
  overflow: hidden;
  margin-block: 1em;
}
.scottstudio-panel>.content {
  font-size: var(--thyuu--size-medium);
  color: var(--content-color);
  padding: 1em;
}

.scottstudio-panel.primary {
  --primary-opacity-1: rgba(0, 112, 245, .1);
  --primary-opacity-2: rgba(0, 112, 245, .2);
  --primary-color: #0070f5;
  --solid-color: var(--primary-opacity-2);
  --opacity-color: var(--primary-opacity-1);
  --title-color: var(--primary-color);
  --content-color: #333639;
}

.scottstudio-panel.success {
  --success-opacity-1: rgba(103, 194, 58, .1);
  --success-opacity-2: rgba(103, 194, 58, .2);
  --success-color: #67c23a;
  --solid-color: var(--success-opacity-2);
  --opacity-color: var(--success-opacity-1);
  --title-color: var(--success-color);
  --content-color: #36661f;
}

.scottstudio-panel.warning {
  --warning-opacity-1: rgba(230, 162, 60, .1);
  --warning-opacity-2: rgba(230, 162, 60, .2);
  --warning-color: #e6a23c;
  --solid-color: var(--warning-opacity-2);
  --opacity-color: var(--warning-opacity-1);
  --title-color: var(--warning-color);
  --content-color: #66481b;

}

.scottstudio-panel.error {
  --error-opacity-1: rgba(245, 108, 108, .1);
  --error-opacity-2: rgba(245, 108, 108, .2);
  --error-color: #f56c6c;
  --solid-color: var(--error-opacity-2);
  --opacity-color: var(--error-opacity-1);
  --title-color: var(--error-color);
  --content-color: #662d2d;
}
</style>

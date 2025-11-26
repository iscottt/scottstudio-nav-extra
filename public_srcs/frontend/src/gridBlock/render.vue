<script setup>
import { defineProps,ref } from 'vue'

defineProps({
  data: Object,
})
</script>

<template>
  <div
    class="scottstudio-grid-block">
		<nv-block-nestedblocks class="sst-content" :class="`sst-grid-cols-` + (data.cols || 3)" :style="`gap: ${data.gap || 16}px`" :blocks.prop="data.text.blocks || []" />
  </div>
</template>

<style >
.sst-content>.nv-blocks:first-of-type{
  display: grid !important;
  gap: inherit;
}
.sst-grid-cols-1>.nv-blocks:first-of-type{
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.sst-grid-cols-2>.nv-blocks:first-of-type{
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.sst-grid-cols-3>.nv-blocks:first-of-type{
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sst-grid-cols-4>.nv-blocks:first-of-type{
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.sst-grid-cols-5>.nv-blocks:first-of-type{
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.sst-grid-cols-6>.nv-blocks:first-of-type{
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
@media screen and  (max-width: 1280px) {
  .sst-content>.nv-blocks:first-of-type{
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}
@media screen and (max-width: 768px) {
  .sst-content>.nv-blocks:first-of-type{
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

</style>

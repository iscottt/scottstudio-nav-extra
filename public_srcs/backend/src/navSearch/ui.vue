<template>
  <div class="mi-calculator-placeholder">
    占位块：导航搜索块
  </div>
</template>

<script setup>
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
</script>

<style scoped>
.mi-calculator-placeholder {
  padding: 20px;
  border: 2px dashed #ccc;
  text-align: center;
  color: #888;
  font-size: 16px;
  background: #f9f9f9;
}
</style>

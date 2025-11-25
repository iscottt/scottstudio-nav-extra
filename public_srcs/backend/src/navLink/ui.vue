<script setup>
const { editorRichText,nvMediaSelector } = nv.components;
const { ref } = nv.Vue
const $props = defineProps({
  block: {
    type: Object,
  }
})
const { data } = $props.block;
var visibility_REF = ref(false);
var handleConfirm = arr => {
  data.cover = arr[0].urls.original;
  visibility_REF.value = false;
};
var handleSelect = () => {
  visibility_REF.value = true;
}
</script>

<template>
  <div class="scottstudio-navitem">
    <editorRichText tag="a" class="title" v-model:value="data.title" />
    <editorRichText tag="div" class="description" v-model:value="data.desc" />

    <a class="icon" @click="handleSelect"
      :style="`background-color: rgb(0, 86, 240); background-image: url('${data.cover}'); background-size: 50px 50px;`">
      <i class="el-icon-plus" v-if="!data.cover"></i>
      <div class="mask"></div>
    </a>
    <nvMediaSelector v-model:visibility="visibility_REF" @select-confirm="handleConfirm" />
  </div>
</template>
<style scoped>
.scottstudio-navitem {
  box-shadow: 0 5px 5px rgba(215, 221, 230, 0.5), 1px 0 0 #d8e0ea inset, -1px 0 0 #d8e0ea inset, 0 -1px 0 #d8e0ea inset, 0 0 0 2px rgba(255, 255, 255, 0.75) inset;
  height: 130px;
  margin: 15px 0 30px;
  padding: 20px 15px;
  text-align: center;
  position: relative;
  cursor: pointer;
  border-radius: 3px 3px 13px 13px;
  background: linear-gradient(#fff, #fafbfc 88%, #eaeef5);
  border-top: 3px solid rgb(0, 103, 255);
}

.scottstudio-navitem .title {
  font-size: 15.5px;
  color: #475669;
  text-shadow: 0 1px #fff;
  margin-bottom: 0.5rem;
}

.scottstudio-navitem .description {
  font-size: 13px;
  color: #99a9bf;
  text-shadow: 0 1px #fff;
}

.scottstudio-article .icon i {
  font-size: 1.5em;
}

.scottstudio-navitem .icon {
  position: absolute;
  width: 65px;
  height: 65px;
  color: var(--gray-4);
  background: #fff;
  background-position: 50%;
  background-size: cover;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 33px;
  left: 50%;
  margin-left: -33px;
  bottom: -20px;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  transition: left ease-out 0.3s, bottom cubic-bezier(0.5, 3, 0.5, 1) 0.75s, width ease-out 0.3s, height ease-out 0.3s, border-radius ease-out 0.15s, margin-left ease-out 0.3s;
  box-shadow: 0 3px 8px rgba(200, 215, 230, 0.5);
}

.scottstudio-navitem .icon .mask {
  opacity: 0.66;
  transition: 0.25s;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0));
}
</style>

<script setup>
import { defineProps } from 'vue'

defineProps({
  data: Object,
})
</script>

<template>
  <div class="scottstudio-navtitle">
    <div class="decoration" :style="data.style"></div>
    <div class="favlinks_container">
      <div class="favlinks_title">
        <span class="favlinks_title_text" v-html="data.title" />
        <div class="favlinks_dynamic_bar"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scottstudio-navtitle {
  position: relative;
  margin-bottom: 1em;
}

.scottstudio-navtitle .decoration {
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: -1.25rem;
  z-index: 3;
  top: 50%;
  left: 0px;
  position: absolute;
  transform: translateY(-50%);
}

.scottstudio-navtitle:hover .decoration {
  transform: translateX(-10px) translateY(-50%);
}

.scottstudio-navtitle .favlinks_container {
  --tw-shadow: 0 5px 5px rgba(215, 221, 230, 0.5), 1px 0 0 #d8e0ea inset, -1px 0 0 #d8e0ea inset, 0 -1px 0 #d8e0ea inset, 0 0 0 2px rgba(255, 255, 255, 0.75) inset;
  --tw-shadow-colored: 0 5px 5px var(--tw-shadow-color), inset 1px 0 0 var(--tw-shadow-color), inset -1px 0 0 var(--tw-shadow-color), inset 0 -1px 0 var(--tw-shadow-color), inset 0 0 0 2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  padding: .5rem 1rem;
  background-image: linear-gradient(rgb(255, 255, 255), rgb(249, 250, 251), rgb(243, 244, 246));
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
  width: 100%;
  z-index: 4;
  position: relative;
  transform: matrix(1, 0, 0, 1, 0, 0);
}


.scottstudio-navtitle .favlinks_title {
  font-weight: bold;
  display: inline-block;
  padding: 0 8px;
  font-size: 20px;
  position: relative;
}

.favlinks_title_text {
  position: relative;
  z-index: 3;
  display: inline-block;
  transition: transform 0.3s ease-out;
  transform-origin: center;
}

.favlinks_dynamic_bar {
  background: var(--title-bg-color, rgba(107, 114, 128, 0.2));
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
  z-index: 1;
  border-radius: 9999px;
  width: 4rem;
  height: 1rem;
  display: inline-block;
  margin-left: 0.5rem;
}

.favlinks_dynamic_bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--title-bg-hover, rgba(107, 114, 128, 0.1)), transparent);
  animation: shimmer 2s infinite;
  z-index: 2;
}

.scottstudio-navtitle .favlinks_container:hover {
  transform: scale(1.02);
}

.favlinks_container:hover .favlinks_dynamic_bar {
  background: var(--title-bg-hover, rgba(107, 114, 128, 0.15));
  width: 24px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

}
</style>

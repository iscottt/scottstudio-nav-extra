<script setup>
import { defineProps, ref, onMounted } from 'vue'
const extractedColor = ref('#0056f0')
const borderColor = ref('#0067ff')
const props = defineProps({
  data: Object,
})
function extractColorFromImage(imageUrl) {
  return new Promise((resolve) => {
    try {
      // 创建一个临时Canvas元素
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        console.error('Could not get canvas context for color extraction');
        resolve(DEFAULT_COLOR);
        return;
      }

      // 创建图像对象
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 允许跨域图片

      // 设置超时处理
      const timeoutId = setTimeout(() => {
        console.warn(`Image loading timed out: ${imageUrl}`);
        resolve(DEFAULT_COLOR);
      }, 3000); // 3秒超时

      img.onload = () => {
        clearTimeout(timeoutId); // 清除超时
        try {
          // 设置canvas尺寸
          const size = 20; // 使用小尺寸以提高性能
          canvas.width = size;
          canvas.height = size;

          // 绘制图像到canvas上
          ctx.drawImage(img, 0, 0, size, size);

          // 获取图像数据
          const imageData = ctx.getImageData(0, 0, size, size).data;

          // 计算平均颜色
          let r = 0, g = 0, b = 0;
          let count = 0;

          // 跳过透明像素
          for (let i = 0; i < imageData.length; i += 4) {
            const alpha = imageData[i + 3];
            if (alpha > 128) { // 忽略半透明及以下的像素
              r += imageData[i];
              g += imageData[i + 1];
              b += imageData[i + 2];
              count++;
            }
          }

          // 如果没有有效像素，返回默认蓝色
          if (count === 0) {
            resolve(DEFAULT_COLOR);
            return;
          }

          // 计算平均值
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);

          // 转换为十六进制
          const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

          resolve(hex);
        } catch (error) {
          console.error('Error processing image data:', error);
          resolve(DEFAULT_COLOR);
        }
      };

      img.onerror = () => {
        clearTimeout(timeoutId); // 清除超时
        console.error(`Could not load image: ${imageUrl}`);
        resolve(DEFAULT_COLOR);
      };

      // 设置图片源
      img.src = imageUrl;
    } catch (error) {
      console.error('Unexpected error in color extraction:', error);
      // 终极错误处理，确保总是返回一个颜色
      resolve(DEFAULT_COLOR);
    }
  });
}
onMounted(async () => {
  try {
    extractedColor.value = await extractColorFromImage(props.data.cover);
  } catch (error) {
    extractedColor.value = '#0056f0'
  }
})
</script>

<template>
  <div class="scottstudio-navitem" :style="` border-top: 3px solid ${data.color || extractedColor}`">
    <a class="title" v-html="data.title" :href="data.href" :target="data.opennew ? '_blank' : ''" />
    <div class="description" v-html="data.desc" />

    <a class="icon" :href="data.href" :target="data.opennew ? '_blank' : ''"
      :style="`background-color: ${extractedColor}; background-image: url('${data.cover}'); background-size: 50px 50px;`">
      <div class="mask"></div>
    </a>
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
}

.scottstudio-navitem .title {
  font-size: 15.5px;
  color: #475669;
  text-shadow: 0 1px #fff;
  margin-bottom: 0.5rem;
  display: inline-block;
  line-height: 1;
}

.scottstudio-navitem .description {
  font-size: 13px;
  color: #99a9bf;
  line-height: 1;
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

.scottstudio-navitem:hover .icon {

  left: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin-left: 0 !important;
  border-radius: 0 0 13px 13px !important;
  transition:
    ease-out 0.3s !important;
}

.scottstudio-navitem:hover .icon>div {
  opacity: 1 !important;
}

:root[theme='dark'] .scottstudio-navitem,
.dark .scottstudio-navitem,
.dark-page .scottstudio-navitem{
  background-image: linear-gradient(rgb(45, 55, 72), rgb(26, 32, 44) 88%, rgb(23, 25, 35));
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 5px 0px, rgba(255, 255, 255, 0.1) 1px 0px 0px 0px inset, rgba(255, 255, 255, 0.1) -1px 0px 0px 0px inset, rgba(255, 255, 255, 0.1) 0px -1px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 2px inset;
}
:root[theme='dark'] .scottstudio-navitem .icon,
.dark.scottstudio-navitem .icon,
.dark-page .scottstudio-navitem .icon{
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px 0px;
}
:root[theme='dark'] .scottstudio-navitem .title,
.dark .scottstudio-navitem .title,
.dark-page .scottstudio-navitem .title{
  color: #e2e8f0;
    text-shadow: 0 1px rgba(0, 0, 0, 0.5);
}
:root[theme='dark'] .scottstudio-navitem .description,
.dark .scottstudio-navitem .description,
.dark-page .scottstudio-navitem .description{
  color: #a0aec0;
    text-shadow: 0 1px rgba(0, 0, 0, 0.5);
}
</style>

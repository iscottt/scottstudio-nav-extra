<script setup>
import { watch, onMounted, ref, computed, defineProps } from 'vue'
const props = defineProps({
  data: Object,
})
const isActive = ref(false)
const engineList = [
  {
    name: 'Bing',
    url: 'https://cn.bing.com/search?q=%s%',
    placeholder: '微软Bing搜索',
    img: 'https://cn.bing.com/favicon.ico'
  },
  {
    name: '百度',
    url: 'https://www.baidu.com/s?wd=%s%',
    placeholder: '百度一下',
    img: 'https://www.baidu.com/favicon.ico'
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%s%',
    placeholder: '谷歌两下',
    img: 'data:image/png;base64,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'
  },
  {
    name: '360',
    url: 'https://www.so.com/s?q=%s%',
    placeholder: '360好搜',
    img: 'https://ss.360tres.com/static/121a1737750aa53d.ico'
  },
  {
    name: '搜狗',
    url: 'https://www.sogou.com/web?query=%s%',
    placeholder: '搜狗搜索',
    img: 'https://www.sogou.com/images/logo/new/favicon.ico?v=4'
  }
]
const engineCurrent = ref(localStorage.getItem('engine-name') || 'Bing')
function updatePlaceholder() {
  const inputEl = document.querySelector('.search-main input')
  const currentEngine = engineList.find(engine => engine.name === engineCurrent.value)
  if (inputEl && currentEngine) {
    inputEl.placeholder = currentEngine.placeholder
  }
}
function onSearch(event) {
  event.preventDefault()
  const inputEl = document.querySelector('.search-main input')
  const query = encodeURIComponent(inputEl.value.trim())
  if (!query) {
    return window.$message.warning('请输入搜索内容')
  }
  const currentEngine = engineList.find(engine => engine.name === engineCurrent.value)
  if (currentEngine && query) {
    const searchUrl = currentEngine.url.replace('%s%', query)
    window.open(searchUrl, '_blank')
  }
}
const currentImg = ref(localStorage.getItem('engine-img') || 'https://cn.bing.com/favicon.ico')
function chooseEngine(item) {
  localStorage.setItem('engine-name', item.name)
  localStorage.setItem('engine-img', item.img)
  engineCurrent.value = item.name
  currentImg.value = item.img
}
watch(engineCurrent, () => {
  updatePlaceholder()
})
onMounted(() => {
  updatePlaceholder()
  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
    :root {
      --thyuu--main-color: ${props.data.mainColor || '213deg 100% 48%'};
      --thyuu--subs-color: ${props.data.subsColor || '200deg 93% 63%'};
    }
  `
  document.head.appendChild(styleTag)
})
</script>

<template>

  <div class="scottstudio-nav-search">
    <form class="search-main" @submit="onSearch">
      <span class="search-selector" :class="{ active: isActive }" @click="isActive = !isActive">
        <img :src="currentImg" alt="">
        <ul class="engine-list">
          <li v-for="engine in engineList" @click="chooseEngine(engine)"
            :class="{ active: engine.name === engineCurrent }" :key="engine.name">{{ engine.name }}</li>
        </ul>
      </span>
      <input type="search" placeholder="微软Bing搜索" autocomplete="off" data-status="true">
      <button class="button has-thyuu-color has-btn-effect" type="submit">
        <svg t="1764077239552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="10838" width="16" height="16" fill="currentColor">
          <path
            d="M834.44799977 770.72000033l168.22399979 168.25199934a44.82800044 44.82800044 0 0 1 0 63.78400056 45.41600011 45.41600011 0 0 1-31.89199979 13.24399977 45.41600011 45.41600011 0 0 1-31.89199977-13.24399977L770.72000033 834.56a466.31200021 466.31200021 0 0 1-626.08000022-30.35200021A466.42400044 466.42400044 0 0 1 474.36800033 8C731.91200033 8 940.67999956 216.79599979 940.67999956 474.39599989c0 110.45999967-38.97600033 214.53599967-106.25999933 296.352zM474.36800033 98.29999967c-207.59199989 0.33599967-375.75999956 168.53199989-376.09600022 376.12400077 0 207.70400011 168.39200011 376.12399979 376.09600022 376.12399979s376.06799967-168.41999967 376.06799967-376.12399979c0-207.73199967-168.36399956-376.12399979-376.06799967-376.12400077z"
            p-id="10839"></path>
        </svg>
        <div class="btn-meta">
          搜索
        </div>
      </button>
    </form>
  </div>
</template>
<style scoped>
.scottstudio-nav-search {
  margin-block: 2em;
  position: relative;
  z-index: 2;
}

.search-main {
  position: relative;
  max-width: 60vw;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .search-main {
    max-width: 100vw;
  }
}

.search-main .search-selector {
  height: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding-bottom: 1px;
  padding-left: 4px;
}

.search-selector img {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: white;
  padding: .25em;
}

.search-main input {
  font-size: 16px;
  border-radius: 2rem;
  padding: 0.5em 1em;
  padding-right: 3.5rem;
  padding-left: 48px;
  line-height: 1.6;
  width: 100%;
  accent-color: hsl(0deg 70% 70% / .8);
  box-shadow: var(--thyuu--shadow-shift);
  vertical-align: middle;
  appearance: none;
  background: var(--thyuu--color-back-font, hsl(0deg 0% 20% / 5%));
  transition: 0.7s;
  margin: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
}

.search-main input::placeholder {
  transition: 0.35s;
}

.search-main input:focus::placeholder {
  opacity: 0;
  transform: translateY(-1em);
}

.search-main input::placeholder {
  font-size: var(--thyuu--size-medium, .875rem);
}

.search-main button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: var(--thyuu--size-small, 0.75rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  accent-color: hsl(var(--thyuu--main-color, 0 70% 70%) / .8);
  width: unset;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 1em;
  border-radius: 2em;
  gap: 0.5em;
  flex: 0 0 auto;
  margin: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  transition: 0.7s;
  color: rgb(255, 255, 255);
  box-shadow: 0 0 1em 0 hsl(var(--thyuu--main-color, 213deg 100% 48%) / .2), 0 .5em 1em -0.5em hsl(var(--thyuu--main-color, 213deg 100% 48%) / .5);
  background: linear-gradient(135deg, hsl(0deg 0% 20% / 5%) 20%, hsl(var(--thyuu--main-color, 213deg 100% 48%) / .8) 30%, hsl(var(--thyuu--subs-color, 200deg 93% 63%) / .8) 70%, var(--thyuu--color-back-font, hsl(0deg 0% 20% / 5%)) 80%) 50% / 300% 100%;
}

.search-main button .btn-meta {
  opacity: 0;
  max-width: 0px;
  height: 1em;
  margin: 0px -0.5em 0px 0px;
  white-space: nowrap;
  overflow: hidden;
  transition: inherit;
}

.search-main button:hover .btn-meta {
  opacity: 1;
  max-width: 10em;
  margin: 0px;
}

.engine-list {
  position: absolute;
  left: 0;
  top: 110%;
  margin: 0;
  z-index: 20;
  min-width: 120px;
  list-style: none;
  padding: .5em;
  border-radius: var(--thyuu--border-radius, 1rem);
  background: linear-gradient(#fff, #fafbfc 88%, #eaeef5);
  outline: var(--thyuu--border);
  opacity: 0;
  transition: .35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-2em);
  box-shadow: 0 3px 8px rgba(200, 215, 230, 0.5);
}

.search-selector.active .engine-list {
  opacity: 1;
  transform: none;
}

.engine-list li {
  cursor: pointer;
  padding: 0 1em;
  font-size: var(--thyuu--size-medium, 14px);
  border-radius: var(--thyuu--border-radius, 1rem);
  border: 1px solid transparent;
  transition: .35s;
  margin-bottom: .25em;
  font-weight: 500;
  line-height: 32px;
}

.engine-list li:hover,
.engine-list li.active {
  border-color: hsl(var(--thyuu--main-color, 0 70% 70%) / .2);
  background: hsl(var(--thyuu--main-color, 0 70% 70%) / .1);
  color: hsl(var(--thyuu--main-color, 0 70% 70%));
}

:root[theme='dark'] .engine-list,
.dark .engine-list,
.dark-page .engine-list {
  background-image: linear-gradient(rgb(31, 41, 55), rgb(17, 24, 39));
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px 0px;
}
</style>

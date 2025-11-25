<script setup>
import { watch, onMounted, ref, defineProps } from 'vue'
const engineList = [
  {
    name: 'Bing',
    url: 'https://cn.bing.com/search?q=%s%',
    placeholder: '微软Bing搜索',
  },
  {
    name: '百度',
    url: 'https://www.baidu.com/s?wd=%s%',
    placeholder: '百度一下',
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%s%',
    placeholder: '谷歌两下',
  },
  {
    name: '360',
    url: 'https://www.so.com/s?q=%s%',
    placeholder: '360好搜',
  },
  {
    name: '搜狗',
    url: 'https://www.sogou.com/web?query=%s%',
    placeholder: '搜狗搜索',
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
function chooseEngine(name) {
  localStorage.setItem('engine-name', name)
  console.log('name', name)
  engineCurrent.value = name
}
watch(engineCurrent, () => {
  updatePlaceholder()
})
onMounted(updatePlaceholder)
</script>

<template>

  <div class="scottstudio-nav-search">
    <form class="search-main" @submit="onSearch">
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
    <div class="search-list">
      <div class="search-group">
        <ul>
          <li v-for="engine in engineList" :key="engine.name">
            <input :id="engine.name" v-model="engineCurrent" hidden type="radio" name="type" :value="engine.url"
              :data-placeholder="engine.placeholder" :checked="engine.name === engineCurrent">
            <label :for="engine.name" @click="chooseEngine(engine.name)">
              <span class="text-muted">{{ engine.name }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.scottstudio-nav-search {
  margin-block: 2em;
}

.search-main {
  position: relative;
  max-width: 60vw;
  margin: 0 auto;
}

.search-main input {
  font-size: 16px;
  border-radius: 2rem;
  padding-right: 3.5rem;
  line-height: 1.6;
  width: 100%;
  accent-color: hsl(0deg 70% 70% / .8);
  box-shadow: var(--thyuu--shadow-shift);
  vertical-align: middle;
  appearance: none;
  padding: 0.5em 1em;
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
  box-shadow: 0 0 1em 0 hsl(var(--thyuu--main-color, 0 70% 70%) / .2), 0 .5em 1em -0.5em hsl(var(--thyuu--main-color, 0 70% 70%) / .5);
  background: linear-gradient(135deg, hsl(0deg 0% 20% / 5%) 20%, hsl(var(--thyuu--main-color, 0 70% 70%) / .8) 30%, hsl(var(--thyuu--subs-color, 17deg 95% 70%) / .8) 70%, var(--thyuu--color-back-font, hsl(0deg 0% 20% / 5%)) 80%) 50% / 300% 100%;
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

.search-list {
  position: relative;
  text-align: center;

}

.search-list .search-group {
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.search-list .search-group ul {
  padding-left: 5px;
  display: initial;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  margin: 0;
}

.search-list .search-group ul li {
  display: inline-block;
}


.search-list .search-group ul li input[type="radio"] {
  display: none !important;
}

.search-list .search-group ul li label {
  transition: all 0.3s;
  position: relative;
  background: transparent !important;
  padding: 5px 20px;
  cursor: pointer;
  font-weight: 500;

}

.search-list .search-group ul li label span {
  font-size: var(--thyuu--size-medium, .875rem);
  margin-top: 10px;
  display: inline-block;
}

.search-list .search-group ul li label::before {
  content: '';
  border-width: 8px 8px 0px 8px;
  border-style: solid;
  border-color: var(--thyuu--color-back-font, hsl(0deg 0% 20% / 5%)) transparent transparent;
  position: absolute;
  left: 50%;
  top: -9px;
  margin-left: -8px;
  opacity: 0;
  transition: all 0.3s;
}

.search-list .search-group ul li input:checked+label {
  color: hsl(var(--thyuu--main-color, 0 70% 70%));
}

.search-list .search-group ul li input:checked+label::before {
  opacity: 1;
}
</style>

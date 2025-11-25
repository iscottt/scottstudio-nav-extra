<template>
  <toolbarDropdown :button-active="hasLink" button-tooltip="超链接" :show="linkDropdownVisible"
    @update:show="linkDropdownVisible = $event">
    <template #label>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z">
        </path>
      </svg>
    </template>

    <template #default>
      <div style="width: 200px;">
        <!-- 链接输入 -->
        <n-input v-model:value="linkUrl" placeholder="请输入链接..." clearable />

        <!-- 新窗口打开开关 -->
        <div class="text-sm flex items-center justify-between p-2 mt-5">
          <span>新窗口打开</span>
          <n-switch v-model:value="openInNewWindow" />
        </div>

        <!-- 操作按钮 -->
        <div class="text-right p-3 pl-1 mt-3 flex items-center justify-between">
          <span>
            <a v-if="data.href" class="text-sm text-decoration-none blue bulge inline-flex items-center g-3"
              @click="removeLink">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" fill="currentColor">
                <path
                  d="M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z">
                </path>
              </svg>
              <span>取消链接</span>
            </a>
          </span>
          <a class="text-sm text-decoration-none blue bulge" @click="confirmLink">
            <i class="el-icon-check mr-3"></i>
            <span>确定</span>
          </a>
        </div>
      </div>
    </template>
  </toolbarDropdown>
</template>
<script setup>
import { ref, nextTick, computed, watch } from "vue";
var toolbarDropdown = nv.components.editorToolbarDropdown;
var $props = defineProps({
  block: {
    type: Object,
  }
})
var { data, type, id } = $props.block;
var show_REF = ref(false)

// 链接相关状态
const linkDropdownVisible = ref(false)
const linkUrl = ref('')
const openInNewWindow = ref(false)
const hasLink = computed(() => !!data.href)

// 监听下拉框显示状态，初始化表单数据
watch(linkDropdownVisible, (isVisible) => {
  if (isVisible) {
    linkUrl.value = data.href || ''
    openInNewWindow.value = data.opennew || false
  }
})

// 确认链接设置
const confirmLink = () => {
  data.href = linkUrl.value
  data.opennew = openInNewWindow.value
  linkDropdownVisible.value = false
}

// 移除链接
const removeLink = () => {
  data.href = ''
  data.opennew = false
  linkDropdownVisible.value = false
}
</script>
<style scoped>
.link-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>

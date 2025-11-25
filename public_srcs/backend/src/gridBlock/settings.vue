<template>
	<editorCollapseBox title="外观" defaultExpanded>
		<div class="nvbe-settings-form-item">
			<div class="nvbe-settings-form-item-title">
				<span class="title-label-6em">列数（1~6）</span>
				<NInput v-model:value="data.cols" type="number" :min="1" :max="6" />
			</div>
		</div>
		<div class="nvbe-settings-form-item">
			<div class="nvbe-settings-form-item-title">
				<span class="title-label-6em">边距（px）</span>
				<NInput v-model:value="data.gap" type="number" >
					<template #suffix>
						px
					</template>
				</NInput>
			</div>
		</div>
	</editorCollapseBox>
	<editorCollapseBox title="颜色" defaultExpanded>
		<editorColorSelector :palette="Object.keys(colorRelation)" :value="getColor"
			@update:value="val => { data.type = colorRelation[val] || '' }" />
	</editorCollapseBox>

</template>
<script setup>
var { computed } = nv.Vue;
var { editorCollapseBox, editorColorSelector } = nv.components;
const $props = defineProps({
	block: {
		type: Object,
	}
})
const { data, type, id } = $props.block;

var colorRelation = {
	'#C0CCDA': '',
	'#007dff': 'primary',
	'#67c23a': 'success',
	'#e6a23c': 'warning',
	'#f56c6c': 'error',
}
var getColor = computed(() => {
	var keys = Object.keys(colorRelation);
	for (var i = 0; i < keys.length; i++) {
		var color = keys[i];
		if (colorRelation[color] == data.type) {
			return color;
		}
	}
})

</script>

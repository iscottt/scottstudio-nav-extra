var { register_block_type,unregister_block_type } = nv.editor.blocks;
import editor from "./ui.vue"
import icon from "./icon.vue"

export default () => {
	register_block_type("scottstudio/nav-search", {
		name: "导航搜索",
		description: "在导航页面中使用的搜索板块。",
		icon,
		attributes: {
		},
		editor
	})	
}

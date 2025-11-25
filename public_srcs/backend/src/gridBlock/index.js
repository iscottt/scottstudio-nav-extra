var { register_block_type,unregister_block_type } = nv.editor.blocks;
import editor from "./ui.vue"
import icon from "./icon.vue"
import settings from "./settings.vue"
export default () => {
	setTimeout(() => {
		unregister_block_type("scottstudio/nav-item")
		unregister_block_type("scottstudio/navSearch")	
	});
	register_block_type("scottstudio/grid-block", {
		name: "栅格容器",
		description: "用于布局的无背景栅格容器。",
		icon,
		attributes: {
			type: '',
			title: '',
			cols: 3,
			gap: 16,
			text() { return {} },
		},
		editor,
		settings
	})
}

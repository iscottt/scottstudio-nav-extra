var { register_block_type } = nv.editor.blocks;
import editor from "./ui.vue"
import settings from "./settings.vue"
import icon from "./icon.vue"

export default () => {
	register_block_type("scottstudio/nav-title", {
		name: "特殊标题",
		description: "一个特殊标题，用于突出显示重要内容",
		icon,
		attributes: {
			title: '',
			style:'background-image: linear-gradient(to right bottom, rgb(0, 86, 240), rgb(51, 120, 255));'
		},
		editor,
		settings
	})
}

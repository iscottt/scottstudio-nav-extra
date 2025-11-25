var { register_block_type, unregister_block_type } = nv.editor.blocks;
import editor from "./ui.vue"
import inlineTunes from "./inline-tunes.vue"
import icon from "./icon.vue"
export default () => {
setTimeout(() => {
	register_block_type("scottstudio/nav-link", {
		name: "导航链接",
		description: "在导航页面中使用的链接项。",
		icon,
		attributes: {
			title: '',
			cover: '',
			desc:'',
			href:'',
			opennew: false
		},
		editor,
		inlineTunes
	})
});
}

import render from "./render.vue"
export default {
  block_type: "scottstudio/grid-block",
  attributes: {
			type: '',
			title: '',
			cols: 3,
			gap: 16,
			text() { return {} },
  },
  render,
}

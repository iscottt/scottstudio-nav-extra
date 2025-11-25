import render from "./render.vue"
export default {
  block_type: "scottstudio/nav-link",
  attributes: {
    // 在这里定义需要被存储的block data数据字段，并提供默认值
    // 当默认值是引用数据类型时，应使用工厂函数！
    color: '',
    title: '',
    align: '',
    icon: ''
  },
  render,
}

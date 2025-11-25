// 立刻添加style
var style = document.createElement('link')
style.setAttribute('rel','stylesheet')
style.setAttribute('href',`${location.port==3000?"/vite-proxy":""}/nav-extra-srcs/backend.css`)
document.head.append(style)
var load_blocks = webpack_blocks => {
  webpack_blocks &&
    webpack_blocks.keys().forEach(i => {
      webpack_blocks(i).default()
    })
}
window.Vue = nv.Vue
export default ({ post_type }) => {
  const simple = require.context('./', true, /^(\.\/)\w*(\/index\.js)$/, 'sync')
  if (simple) [simple].forEach(load_blocks)
}

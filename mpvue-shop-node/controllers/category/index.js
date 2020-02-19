const { mysql } = require('../../mysql')

// 获取分类列表,导航栏
async function categoryNav(ctx) {
  const categoryId = ctx.query.id
  // 获取分类
  const currentNav = await mysql('nideshop_category').where({
    'id': categoryId
  }).select()
  // 获取它的同类
  const navData = await mysql('nideshop_category').where({
    'parent_id': currentNav[0].parent_id
  }).select()

  ctx.body = {
    navData,
    currentNav: currentNav[0]
  }
}

module.exports = {
  categoryNav
}
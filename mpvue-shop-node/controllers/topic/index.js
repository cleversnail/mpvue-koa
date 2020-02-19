const { mysql } = require('../../mysql')

// 获取专题列表数据
async function listAction (ctx) {
  let page = ctx.query.page || 1
  const size = 5
  // 分页处理
  const data = await mysql('nideshop_topic').column('id', 'title', 'price_info', 'scene_pic_url', 'subtitle').limit(size).offset((page - 1) * size)
  const data1 = await mysql('nideshop_topic').column('id', 'title', 'price_info', 'subtitle').select()
  const total = parseInt(data1.length / 5)

  ctx.body = {
    'page': page,
    'total': total,
    'data': data
  }
}

// 专题详情
async function detailAction (ctx) {
  const id = ctx.query.id
  let data = []
  if (id) {
    data = await mysql('nideshop_topic').where({
      'id': id
    }).select()
  }
  const recommendList = await mysql('nideshop_topic').column('id', 'title', 'price_info', 'scene_pic_url', 'subtitle').limit(4).select()
  ctx.body = {
    'data': data[0],
    'recommendList': recommendList
  }
}

module.exports = {
  listAction,
  detailAction
}
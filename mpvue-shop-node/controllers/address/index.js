const { mysql } = require('../../mysql')

// 获取收货地址列表
async function getListAction(ctx) {
  const openId = ctx.query.openId
  const addressList = await mysql('nideshop_address').where({
    'user_id': openId
  }).orderBy('is_default', 'desc').select()
  ctx.body = {
    data: addressList
  }
}

// 获取详细地址
async function detailAction(ctx) {
  const id = ctx.query.id
  const detailData = await mysql('nideshop_address').where({
    'id': id
  }).select()
  ctx.body = {
    data: detailData[0]
  }
}

module.exports = {
  getListAction,
  detailAction
}
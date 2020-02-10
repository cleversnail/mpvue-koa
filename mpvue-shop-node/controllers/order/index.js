const { mysql } = require('../../mysql')

async function submitAction (ctx) {
  const { openId } = ctx.request.body
  let goodsId = ctx.request.body.goodsId
  let allPrice = ctx.request.body.allPrice
  // 是否存在订单
  const isOrder = await mysql('nideshop_order').where({
    'user_id': openId
  }).select()
  if (isOrder.length > 0) {
    const data = await mysql('nideshop_order').where({
      'user_id': openId
    }).update({
      user_id: openId,
      goods_id: goodsId,
      allprice: allPrice
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  } else {
    const data = await mysql('nideshop_order').insert({
      user_id: openId,
      goods_id: goodsId,
      allprice: allPrice
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  }
}

module.exports = {
  submitAction
}
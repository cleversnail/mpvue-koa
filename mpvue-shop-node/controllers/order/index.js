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

async function detailAction (ctx) {
  const openId = ctx.query.openId
  const addressId = ctx.query.addressId || ''
  const orderDetail = await mysql('nideshop_order').where({
    'user_id': openId
  }).select()
  var goodsIds = orderDetail[0].goods_id.split(',')

  const list = await mysql('nideshop_cart').andWhere({
    'user_id': openId
  }).whereIn('goods_id', goodsIds).select()
  // 收货地址
  var addressList;
  if (addressId) {
    addressList = await mysql('nideshop_address').where({
      'user_id': openId,
      'id': addressId
    }).orderBy('is_default', 'desc').select()
  } else {
    addressList = await mysql('nideshop_address').where({
      'user_id': openId
    }).orderBy('is_default', 'desc').select()
  }
  ctx.body = {
    price: orderDetail[0].allprice,
    goodsList: list,
    address: addressList[0] || {}
  }
}

module.exports = {
  submitAction,
  detailAction
}
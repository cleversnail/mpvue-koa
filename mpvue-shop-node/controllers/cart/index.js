const { mysql } = require('../../mysql')

async function addCart(ctx) {
  const { openId, goodsId, number } = ctx.request.body

  // 判断购物车是否包含此数据
  const haveGoods = await mysql('nideshop_cart').where({
    'user_id': openId,
    'goods_id': goodsId
  }).select()
  if (haveGoods.length === 0) {
    const goods = await mysql('nideshop_goods').where({
      'id': goodsId
    }).select()
    const { retail_price, name, list_pic_url } = goods[0]
    // 如果不存在
    await mysql('nideshop_cart').insert({
      'user_id': openId,
      'goods_id': goodsId,
      number,
      'goods_name': name,
      retail_price,
      list_pic_url
    })
  } else {
    const oldNumber = await mysql('nideshop_cart').where({
      'user_id': openId,
      'goods_id': goodsId
    }).column('number').select()
    // 更新数据
    await mysql('nideshop_cart').where({
      'user_id': openId,
      'goods_id': goodsId
    }).update({
      'number': oldNumber[0].number + number
    })
  }
  ctx.body = {
    data: 'success'
  }
}

// 获取购物车列表
async function cartList(ctx) {
  const { openId } = ctx.query
  
  const cartList = await mysql('nideshop_cart').where({
    'user_id': openId
  }).select()
  ctx.body = {
    data: cartList
  }
}

module.exports = {
  addCart,
  cartList
}
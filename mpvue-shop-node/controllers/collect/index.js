const { mysql } = require('../../mysql')

// 添加收藏
async function addCollect(ctx) {
  const { openId, goodsId } = ctx.request.body
  // 判断是否已经收藏
  const iscollect = await mysql('nideshop_collect').where({
    'user_id': openId,
    'value_id': goodsId
  }).select()
  if (iscollect.length == 0) {
    await mysql('nideshop_collect').insert({
      'user_id': openId,
      'value_id': goodsId
    })
    ctx.body = {
      data: 'collected'
    }
  } else {
    await mysql('nideshop_collect').where({
      'user_id': openId,
      'value_id': goodsId
    }).del()
    ctx.body = {
      data: 'uncollect'
    }
  }
}

module.exports = {
  addCollect
}
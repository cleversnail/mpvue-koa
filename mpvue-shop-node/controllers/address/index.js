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

// 添加或更新收货地址
async function saveAction(ctx) {
  const addressId = ctx.request.body.addressId
  const { userName, telNumber, address, detailaddress, checked, openId } = ctx.request.body
  console.log(checked)
  // 如果是默认选中，现在数据库中查询是否是默认地址
  if (checked) {
    const isDefault = await mysql('nideshop_address').where({
      'user_id': openId,
      'is_default': 1
    }).select()
    if (isDefault.length > 0) {
      await mysql('nideshop_address').where({
        'user_id': openId,
        'is_default': 1
      }).update({
        'is_default': 0
      })
    }
  }

  if (!addressId) {
    // 添加地址
    const data = await mysql('nideshop_address').insert({
      name: userName,
      mobile: telNumber,
      address: address,
      address_detail: detailaddress,
      user_id: openId,
      is_default: checked == 'true' || checked ? 1 : 0
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
    // 更新地址
    const data = await mysql('nideshop_address').where({
      'id': addressId
    }).update({
      name: userName,
      mobile: telNumber,
      address: address,
      address_detail: detailaddress,
      user_id: openId,
      is_default: checked == 'true' || checked ? 1 : 0
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
  getListAction,
  detailAction,
  saveAction
}
<template>
  <div class="order">
    <div class="address" v-if="address.name" @click="toAddressList">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.name}}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.address+address.address_detail}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="seladdress" v-else @click="toAdd">请选择默认地址</div>

    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>¥{{allprice}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>

    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>¥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{item.number}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div>实付：¥ {{allprice}}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from '../../utils'
export default {
  data () {
    return {
      address: {},
      price: '',
      allprice: '',
      openId: '',
      addressId: '',
      listData: []
    }
  },
  onShow () {
    if (wx.getStorageSync('addressId')) {
      this.addressId = wx.getStorageSync('addressId')
    }
    this.openId = getStorageOpenid()
    this.getDetail()
  },
  methods: {
    toAddressList () {
      wx.navigateTo({
        url: '/pages/addressSelect/main'
      })
    },
    toAdd () {
      wx.navigateTo({
        url: '/pages/addaddress/main'
      })
    },
    async getDetail () {
      const data = await get('/order/detailAction', {
        openId: this.openId,
        addressId: this.addressId
      })
      console.log(data)
      if (data) {
        // this.allprice = data.price
        this.listData = data.goodsList
        this.address = data.address
      }
      this.listData.map((item) => {
        this.allprice = Number(item.retail_price * item.number) + Number(this.allprice)
      })
    },
    pay () {
      wx.showToast({
        title: '支付功能暂未开发',
        icon: 'none',
        duration: 1500,
        mask: false,
        success: res => {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
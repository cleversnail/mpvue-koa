<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="icon" @click="changeColor(index, item.goods_id)" :class="[Listids[index] ? 'active' : '']"></div>
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>¥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x {{item.number}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed">
      <div class="left" @click="allCheck" :class="{'active': allcheck}">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>¥{{allPrice}}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils"
export default {
  data () {
    return {
      openId: '',
      listData: [],
      Listids: [],
      allcheck: false
    }
  },
  onShow () {
    this.openId = getStorageOpenid()
    this.getListData()
  },
  methods: {
    async getListData () {
      const data = await get('/cart/cartList', {
        openId: this.openId
      })
      console.log(data)
      this.listData = data.data
    },
    changeColor (index, id) {
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false)
      } else {
        this.$set(this.Listids, index, id)
      }
    },
    allCheck () {
      // 先清空选择
      this.Listids = []
      if (this.allcheck) {
        this.allcheck = false
      } else {
        this.allcheck = true
        // 全部选择
        for (let i = 0; i < this.listData.length; i++) {
          const element = this.listData[i]
          this.Listids.push(element.goods_id)
        }
      }
    },
    async orderDown () {
      if (this.Listids.length === 0) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 1500
        })
        return false
      }
      // 去除数组中空的false
      let newgoodsid = []
      for (let i = 0; i < this.Listids.length; i++) {
        const element = this.Listids[i]
        if (element) {
          newgoodsid.push(element)
        }
      }
      let goodsId = newgoodsid.join(',')
      const data = await post('/order/submitAction', {
        goodsId: goodsId,
        openId: this.openId,
        allPrice: this.allPrice
      })
      if (data) {
        wx.navigateTo({
          url: '/pages/order/main'
        });
      }
    }
  },
  computed: {
    isCheckedNumber () {
      let number = 0
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          number++
        }
      }
      if (number == this.listData.length && number !== 0) {
        this.allcheck = true
      } else {
        this.allcheck = false
      }
      return number
    },
    allPrice () {
      let Price = 0
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          Price += this.listData[i].retail_price * this.listData[i].number
        }
      }
      return Price
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
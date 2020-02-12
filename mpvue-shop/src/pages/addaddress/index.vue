<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份、城市、区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailaddress">
    </div>

    <div class="item itemend">
      <checkbox-group @click="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#b4282d"></checkbox>
          设置为默认地址
        </label>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>

    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { get, post, getStorageOpenid } from "../../utils";
export default {
  data () {
    return {
      userName: '',
      telNumber: '',
      region: [],
      customItem: '全部',
      address: '',
      detailaddress: '',
      checked: false,
      openId: '',
      res: '',
      id: ''
    }
  },
  mounted() {
    this.openId = getStorageOpenid()
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      console.log(this.res, '------')
      this.userName = this.res.userName
      this.telNumber = this.res.telNumber
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
      this.detailaddress = this.res.detailInfo
    }
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id
      this.getDetail()
    }
  },
  methods: {
    async getDetail () {
      const data = await get('/address/detailAction', {
        id: this.id
      })
      console.log(data)
      let detail = data.data
      this.userName = detail.name
      this.telNumber = detail.mobile
      this.address = detail.address
      this.detailaddress = detail.address_detail
      this.checked = detail.is_default === 1 ? true : false
    },
    checkboxChange () {},
    wxaddress () {},
    saveAddress () {
      
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
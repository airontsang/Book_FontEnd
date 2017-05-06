<template>
  <div>
    <div style="margin: 10px;overflow: hidden;" v-for="item in list">
      <masker style="border-radius: 2px;">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div slot="content" class="m-title">
          {{item.title}}
          <br/>
          <span class="m-time">2016-03-18</span>
        </div>
      </masker>
    </div>
  </div>
</template>

<script>
import { Masker } from 'vux'
import  Vue  from 'vue'
import  resource  from '../../resource.js'
export default {
  components: {
    Masker
  },
  data () {
    return {
      list: []
    }
  },
  mounted: function () {
    this.$vux.loading.show({
      text: "加载中"
    })
    resource.getUnsureBooks({
      pageIndex: 1,
      pageSize: 100
    }).then( res => {
      var _this = this;
      if(res.status === 200 && res.body.error_code === 0){
        res.body.data.forEach( book => {
          
          let bookIn = {}
          bookIn.title = book.title
          bookIn.img   = Vue.http.options.root + '/Books/getBookPic?fileName=' + book.picUrl
          _this.list.push(bookIn)
        })
        this.$vux.loading.hide();
      }
    })
  }
}
</script>

<style lang="less">
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}
.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>
<template>
  <div>
    <div v-if="hasData">
      <div @click="goPending(index)" style="margin: 10px;overflow: hidden;" v-for="(item, index) in list" :key="item._id">
        <masker style="border-radius: 2px;">
          <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
          <div slot="content" class="m-title">
            {{item.title}}
            <br/>
            <span class="m-time">{{ item.showTime }}</span>
          </div>
        </masker>
      </div>
    </div>
    <div v-else>
      <divider>没有数据</divider>
    </div>
  </div>
</template>

<script>
import { Masker, Divider } from 'vux'
import Vue from 'vue'
import moment from 'moment'
import resource from '../../resource.js'
import { index_book } from '../../state.js'
export default {
  components: {
    Masker,
    Divider
  },
  data() {
    return {
      hasData: false,
      list: [],
    }
  },
  methods: {
    goPending: function (index) {
      index_book.reset()
      index_book.id = this.list[index]._id
      index_book.title = this.list[index].title
      index_book.intro = this.list[index].intro
      index_book.picUrl = this.list[index].picUrl
      index_book.place = this.list[index].place
      index_book.isPublic = this.list[index].isPublic
      index_book.partyTime = this.list[index].partyTime
      index_book.sum = this.list[index].sum
      index_book.spend = this.list[index].spend
      index_book.balance = this.list[index].balance
      this.$router.push({ path: "/pending", query: { id: this.list[index]._id } })
    }
  },
  mounted: function () {
    this.$vux.loading.show({
      text: "加载中"
    })
    resource.getUnsureBooks({
      pageIndex: 1,
      pageSize: 100
    }).then(res => {
      var _this = this;
      if (res.status === 200 && res.body.error_code === 0 && res.body.data.length !==0 ) {
        res.body.data.forEach(book => {
          let bookIn = {}
          bookIn._id = book._id
          bookIn.title = book.title
          bookIn.intro = book.intro
          bookIn.isPublic = book.isPublic
          bookIn.partyTime = book.partyTime
          bookIn.showTime = moment(book.partyTime).format("YYYY-MM-DD")
          bookIn.place = book.place
          bookIn.sum = book.sum
          bookIn.spend = book.spend
          bookIn.balance = book.balance
          bookIn.picUrl = book.picUrl
          bookIn.img = Vue.http.options.root + '/Books/getBookPic?fileName=' + book.picUrl
          _this.list.push(bookIn)
        })
        this.hasData = true;
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
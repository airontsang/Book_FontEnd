<template>
  <div>
    <div class="head-box" :style="{ height: height*0.4 + 'px'}">
      <div class="text-box">
        <h2>13届布吉中心小学聚会</h2>
        <label :style="{ 'margin-top': (height)*0.035 + 'px'}">凭证ID</label>
        <div>bubiV8i4erwKob5Cj9zVSQbXBtSRApV8nphs955g</div>
      </div>
      <img src="static/default.jpg">
      <div class="loom"></div>
    </div>
    <div class="bottom-box" :style="{ height: height*0.6 + 'px'}">
    </div>
    <div class="black" :style="{ 'top': (height)*0.32 + 'px'}">
      <swiper :height="contentH + 'px'" dots-position="center">
        <swiper-item class="black" v-for="item in list" :key="item.bookId">
          <div @click="goDetails(item.bookId)" class="content-box" :style="{ height: contentH + 'px', width: (contentH)*0.8 + 'px'}">
            <label><img src="../../assets/pic/more.svg"></label>
            <p class="hash-title" :style="{ 'margin-top': (height)*0.07 + 'px'}">账本数据哈希值</p>
            <p class="dbhash">e3a7e990ad82bf0bb9bc39550772b68202f509ab</p>
            <div class="qr-box">
              <!--:style="{ 'margin-top': (height)*0.25 + 'px'}"-->
              <qrcode :value="qrValue" type="img"></qrcode>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Qrcode } from 'vux'
import resource from '../../resource.js'
import Vue from "vue"

export default {
  components: {
    Swiper,
    SwiperItem,
    Qrcode
  },
  beforeRouteEnter(to, from, next) {
    var listData = []
    var itemData = {}
    if (to.query.id) {
      resource.onePublicedBook({
        bookId: to.query.id
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          itemData.title = res.body.data.bookTitle
          itemData.bookId = res.body.data._id
          itemData.showUrl = Vue.http.options.root + '/Books/getBookPic?fileName=' + item.picUrl
          itemData.evidenceId = res.body.data.evidenceId
          itemData.dbHash = res.body.data.dbHash
          itemData.bcHash = res.body.data.bcHash
        }
        listData.push(itemData)
      })
    } else {
      resource.getPublicedBooks().then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          res.body.data.forEach(item => {
            itemData.title = item.bookTitle
            itemData.picUrl = item.picUrl
            itemData.bookId = item._id
            itemData.showUrl = Vue.http.options.root + '/Books/getBookPic?fileName=' + item.picUrl
            itemData.evidenceId = item.evidenceId
            itemData.dbHash = item.dbHash
            itemData.bcHash = item.bcHash
            listData.push(itemData)
          })
        }
      })
    }
    next(vm => {
      vm.list = listData
      vm.$vux.loading.hide()
    })
  },
  data() {
    return {
      height: '',
      contentH: '',
      qrValue: '',
      list: []
    }
  },
  methods: {
    getBrowserInterfaceSize: function () {
      var pageWidth = window.innerWidth;
      var pageHeight = window.innerHeight;
      if (typeof pageWidth != "number") {
        //在标准模式下面
        if (document.compatMode == "CSS1Compat") {
          pageWidth = document.documentElement.clientWidth;
          pageHeight = document.documentElement.clientHeight;
        } else {
          pageWidth = document.body.clientWidth;
          pageHeight = window.body.clientHeight;
        }
      }
      return {
        pageWidth: pageWidth,
        pageHeight: pageHeight
      }
    },
    goDetails: function (bookId) {
      this.$router.push({ path: "/publicedbookdetails", query: { bookId: bookId } })
    }
  },
  mounted: function () {
    let result = this.getBrowserInterfaceSize()
    this.height = (result.pageHeight - 54);
    this.contentH = this.height * 0.58;
    this.qrValue = window.location.href;
    this.$vux.loading.hide();
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.title {
  line-height: 100px;
  text-align: center;
  color: #fff;
}

.head-box {
  position: relative;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .text-box {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    padding: 25px 15px 0 15px;
    text-align: left;
    color: #fff;
    z-index: 999;
    label {
      font-size: .5em;
      display: inline-block;
      opacity: .7;
    }
    div {
      word-wrap: break-word;
      word-break: break-all;
      font-size: .9em;
      opacity: .8;
    }
  }
  .loom {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background: #000;
    opacity: .4;
  }
}

.black {
  width: 100%;
  position: absolute;
}

.bottom-box {
  background-color: #1AAD19;
  width: 100%;
}


.qr-box {
  width: 53%;
  margin: auto;
  margin-top: 15px;
}

.content-box {
  background: #fff;
  margin: auto;
  position: relative;
  overflow: hidden;
  box-shadow: 1px 1px 5px #fff;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  label {
    width: 20px;
    height: 20px;
    margin: 10px 15px 0 0;
    float: right;
  }
  .hash-title {}
  .dbhash {
    word-wrap: break-word;
    word-break: break-all;
    padding: 0 10px;
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.vux-indicator.custom-bottom {
  bottom: 30px;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

.fadeInUp {
  animation-name: fadeInUp;
}
</style>
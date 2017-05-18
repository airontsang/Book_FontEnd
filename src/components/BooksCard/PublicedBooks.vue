<template>
  <div>
    <div v-if="hasData">
      <div class="head-box" :style="{ height: height*0.4 + 'px'}">
        <div class="text-box">
          <h2>{{ oneBook.title }}</h2>
          <label :style="{ 'margin-top': (height)*0.035 + 'px'}">凭证ID</label>
          <div>{{ oneBook.evidenceId }}</div>
        </div>
        <img :src="oneBook.showUrl">
        <div class="loom"></div>
      </div>
      <div class="bottom-box" :style="{ height: height*0.6 + 'px'}">
      </div>
      <div class="black" :style="{ 'top': (height)*0.32 + 'px'}">
        <swiper :height="contentH + 'px'" @on-index-change="moveItem" dots-position="center">
          <swiper-item class="black" v-for="item in list" :key="item.bookId">
            <div class="content-box" :style="{ height: contentH + 'px', width: (contentH)*0.8 + 'px'}">
              <label @click="showMenus = true"><img src="../../assets/pic/more.svg"></label>
              <div @click="goDetails(item.bookId)">
                <p class="hash-title" :style="{ 'margin-top': (height)*0.07 + 'px'}">账本数据哈希值</p>
                <p class="dbhash">{{ item.dbHash }}</p>
                <div class="qr-box">
                  <!--:style="{ 'margin-top': (height)*0.25 + 'px'}"-->
                  <qrcode :value="item.qrValue" type="img"></qrcode>
                </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div v-transfer-dom>
        <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="proof" show-cancel></actionsheet>
      </div>
      <div v-transfer-dom>
        <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
          <div class="img-box">
            <p>{{ checkDbHash1 }}</p>
            <p>{{ checkDbHash2 }}</p>              
          </div>
          <div @click="showHideOnBlur=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
    </div>
    <div v-else>
      <divider>没有数据</divider>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem, Qrcode, TransferDom, Actionsheet, Divider, XDialog } from 'vux'
import resource from '../../resource.js'
import Vue from "vue"

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    Divider,
    XDialog,
    SwiperItem,
    Actionsheet,
    Qrcode
  },
  data() {
    return {
      hasData: false,
      menus: {
        menu1: '数据验证',
      },
      showMenus: false,
      showHideOnBlur: false,
      height: '',
      contentH: '',
      list: [],
      oneBook: {},
      checkDbHash1: "",
      checkDbHash2: ""
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
    },
    proof: function () {
      this.$vux.loading.show({
        text: "请等待"
      })
      resource.checkBdHash({
        bookId: this.oneBook.bookId,
        evidenceId: this.oneBook.evidenceId,
        bcHash: this.oneBook.bcHash
      }).then(res => {
        this.$vux.loading.hide()
        if (res.status === 200 && res.body.error_code === 0) {
          this.showHideOnBlur = true
          this.checkDbHash1 = res.body.data.dbHash
          this.checkDbHash2 = res.body.data.bcMeta
        } else if (res.body.error_code === 1018) {
          this.$vux.toast.show({
            text: '网络开小差',
            type: 'warn',
            time: 2000
          })
        }
      })
    },
    moveItem: function (index) {
      this.oneBook = this.list[index]
    }
  },
  mounted: function () {
    let result = this.getBrowserInterfaceSize()
    this.height = (result.pageHeight - 54);
    this.contentH = this.height * 0.58;
    var listData = []
    var itemData = {}
    if (this.$route.query.id) {
      resource.onePublicedBook({
        bookId: this.$route.query.id
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          itemData.title = res.body.data.bookTitle
          itemData.bookId = res.body.data._id
          itemData.showUrl = Vue.http.options.root + '/Books/getBookPic?fileName=' + item.picUrl
          itemData.qrValue = Vue.http.options.root + '/#/publiced/id?' + res.body.data._id;
          itemData.evidenceId = res.body.data.evidenceId
          itemData.dbHash = res.body.data.dbHash
          itemData.bcHash = res.body.data.bcHash
        }
        listData.push(itemData)
        this.oneBook = itemData
      })
    } else {
      resource.getPublicedBooks().then(res => {
        if (res.status === 200 && res.body.error_code === 0 && res.body.data.length !== 0) {
          res.body.data.forEach(item => {
            itemData.title = item.title
            itemData.picUrl = item.picUrl
            itemData.bookId = item._id
            if (item.picUrl == 'default.jpg') {
              itemData.showUrl = 'static/default.jpg'
            } else {
              itemData.showUrl = Vue.http.options.root + '/Books/getBookPic?fileName=' + item.picUrl
            }
            itemData.qrValue = Vue.http.options.root + '/#/publiced?id=' + item._id;
            itemData.evidenceId = item.evidenceId
            itemData.dbHash = item.dbHash
            itemData.bcHash = item.bcHash
            listData.push(itemData)
            itemData = {}
          })
          this.list = listData;
          this.oneBook = listData[0]
          this.hasData = true;
        }
        this.$vux.loading.hide();
      })
    }
    this.list = listData
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

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
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
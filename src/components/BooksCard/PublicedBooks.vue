<template>
  <div>
    <swiper :height="height + 'px'" dots-position="center">
      <swiper-item class="black" v-for="item in list">
        <div class="no-box" :style="{ height: height*0.33 + 'px'}">
          {{ item.title }}
        </div>
        <div class="content-box" :style="{ height: contentH + 'px'}">
          <img :style="{ height: contentH*0.6 + 'px'}" src="static/default.jpg">
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      height: '',
      contentH: '',
      list: [{
        title: '06届下李朗小学聚会',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '06届下李朗小学聚会',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '06届下李朗小学聚会',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '06届下李朗小学聚会',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }]
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
    }
  },
  mounted: function () {
    let result = this.getBrowserInterfaceSize()
    this.height = (result.pageHeight-54);
    this.contentH = result.pageWidth * 0.875
   }
}
</script>

<style lang="less">
.black {
  background-color: #1AAD19;
  width: 100%;
}

.title {
  line-height: 100px;
  text-align: center;
  color: #fff;
}

.no-box {
}

.content-box {
  width: 70%;
  height: 410px;
  background: #fff;
  margin: auto;
  img {
    width: 100%;
    object-fit: cover;
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
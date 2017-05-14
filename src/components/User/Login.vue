<template>
  <div class="login-holder">
    <div class="bg-img">
      <img src="../../assets/login_bg.jpg">
    </div>
      <div class="bg-loom"></div>    
    <div class="solgn-box">
      <div class="logo">
        <img src="../../assets/logo.png">
      </div>
      <h3>聚会帐-可信赖</h3>
    </div>
    <div class="login-box">
      <group title="">
        <x-input title="手机" :value="LoginId" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title="密码" :value="passWord" type="password"></x-input>
      </group>
      <div style="padding:15px;">
        <x-button @click.native="login()" type="primary" action-type="button">登录</x-button>
      </div>
      <div class="reg-text">
        <router-link :to="{ path: '/reg'}">
          <p class="vux-1px-b">新用户?注册</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {
  XInput,
  XButton,
  Group
} from 'vux'
import resource from '@/resource.js'
import Vue from 'vue'

export default {
  components: {
    XInput,
    XButton,
    Group
  },
  data() {
    return {
      LoginId: '18665802614',
      passWord: '123456'
    }
  },
  methods: {
    login: function () {
      this.$vux.loading.show({
        text: "登录中"
      })
      resource.login({
        loginId: this.LoginId,
        passWord: this.passWord
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          localStorage.token = res.body.token;
          this.$router.push({ path: '/' })
          this.$vux.loading.hide()
        }
      }, err => {
        console.log(err)
      })
    }
  }
}

</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.login-holder {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

h3 {
  color: #fff
}

.solgn-box {
  width: 100%;
  margin-top: 20%;
  text-align: center;
}

.bg-img {
  position: absolute;
  z-index: -2;
      width: 100%;
      height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.bg-loom {
    position: absolute;
    background: #000;
    z-index: -1;
    opacity: .5;
    width: 100%;
    height: 100%;
  }

.login-box {
  margin-top: 60px;
}

.weui-cells {
  background: transparent;
  color: rgba(255, 255, 255, .6);
}

.weui-cells:before {
  border-top: none;
}

.weui-cell:before {
  border-top: none;
}

.weui-cells:after {
  border-bottom: none;
}

.reg-text {
  text-align: center;
  p {
    display: inline;
    color:rgba(255, 255, 255, .9)
    // text-decoration: underline; 
  }
}

.logo img{
    width: 80px;
    height: 80px;
}
</style>

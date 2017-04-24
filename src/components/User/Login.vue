<template>
  <div>
    <div class="solgn-box">
      <div class="logo">
        <img src="../../assets/logo.png">
      </div>
      <h3>聚会帐-可信赖</h3>
    </div>
    <div class="login-box">
      <group title="">
        <x-input title="手机号码" :value="LoginId" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title='密码' :value="passWord" type="password"></x-input>
      </group>
      <div style="padding:15px;">
        <x-button @click.native="login()" type="primary" action-type="button">登录</x-button>
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
            resource.login({
                loginId: this.LoginId,
                passWord: this.passWord
            }).then( res => {
                if( res.status === 200 && res.body.error_code === 0) {
                    localStorage.token = res.body.token;  
                }
            }, err => {
                console.log(err)
            })
        }
    }
  }

</script>
<style>
  .solgn-box {
    width: 100%;
    margin-top: 20%;
    text-align: center;
  }
  
  .login-box {
    margin-top: 60px;
  }

</style>

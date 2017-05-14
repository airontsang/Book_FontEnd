<template>
    <div>
        <x-header></x-header>    
        <group title="新用户快速注册">
            <x-input title="手机号码" is-type="china-mobile"></x-input>
            <x-input title="密码" type="password"></x-input>
            <x-input title="确认密码" type="password"></x-input>
            <x-input title="验证码" class="weui-cell_vcode">
                <img slot="right" class="weui-vcode-img" src="http://weui.github.io/weui/images/vcode.jpg">
            </x-input>
        </group>
        <div style="padding:15px;">
        <x-button @click.native="reg()" type="primary" action-type="button">提交</x-button>
      </div>
    </div>
</template>
<script>
import {
    XInput,
    XButton,
    XHeader,
    Group
} from 'vux'
import resource from '@/resource.js'
import Vue from 'vue'

export default {
    components: {
        XInput,
        XHeader,
        XButton,
        Group
    },
    data() {
        return {
        }
    },
    methods: {
        // reg: function () {
        //   this.$vux.loading.show({
        //     text: "登录中"
        //   })
        //   resource.login({
        //     loginId: this.LoginId,
        //     passWord: this.passWord
        //   }).then(res => {
        //     if (res.status === 200 && res.body.error_code === 0) {
        //       localStorage.token = res.body.token;
        //       this.$router.push({ path: '/' })
        //       this.$vux.loading.hide()
        //     }
        //   }, err => {
        //     console.log(err)
        //   })
        // }
    }
}

</script>
<style scope lang="less">
@import '~vux/src/styles/1px.less';
</style>

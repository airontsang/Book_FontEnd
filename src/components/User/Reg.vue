<template>
    <div>
        <x-header></x-header>
        <group title="新用户快速注册">
            <x-input title="手机号码" v-model="loginId" is-type="china-mobile"></x-input>
            <x-input title="密码" v-model="passWord" type="password"></x-input>
            <x-input title="确认密码" v-model="pwConfirm" type="password" :equal-with="passWord"></x-input>
            <x-input title="验证码" :is-type="checkCode" v-model="code" class="weui-cell_vcode">
                <canvas slot="right" v-on:click="drawPic" class="weui-vcode-img" id="canvas" width="120" height="40"></canvas>
            </x-input>
            <div style="padding:15px;">
                <x-button @click.native="reg()" type="primary" action-type="button" :disabled="!canSubmit">提交</x-button>
            </div>
        </group>
    
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
            loginId: '',
            passWord: '',
            pwConfirm: '',
            code: '',
            verification: ''
        }
    },
    computed: {
        canSubmit: function(){
            if( this.loginId !== '' && this.passWord == this.pwConfirm && this.code.toLowerCase() == this.verification.toLowerCase()){
                return true
            }
            return false
        }
    },
    methods: {
        reg: function () {
            console.log("hello")
            this.$vux.loading.show({
                text: "加载中"
            })
            resource.reg({},{
                loginId: this.loginId,
                passWord: this.passWord
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    // localStorage.token = res.body.token;
                    // this.$router.push({ path: '/' })
                    this.$vux.loading.show({
                        text: "跳转中"
                    })
                    this.login()
                } else if (res.body.error_code === 1004) {
                    this.$vux.loading.hide()
                    this.$vux.toast.show({
                        text: '手机号已被注册',
                        type: 'warn',
                        time: 2000
                    })
                }
            }, err => {
                console.log(err)
            })
        },
        login: function () {
            resource.login({
                loginId: this.loginId,
                passWord: this.passWord
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    localStorage.token = res.body.token;
                    this.$router.push({ path: '/' })
                    this.$vux.loading.hide()
                }
            }, err => {
                this.$vux.loading.hide()
                console.log(err)
            })

        },
        checkCode: function (value) {
            var show = true
            if (value.toLowerCase() == this.verification.toLowerCase()) {
                show = true
            } else {
                show = false
            }
            return {
                valid: value.toLowerCase() == this.verification.toLowerCase(),
                msg: '验证码错误'
            }
        },
        createCode: function () {
            var selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
            var code = '';
            for (var i = 0; i < 4; i++) {
                var charIndex = Math.floor(Math.random() * 58);
                code += selectChar[charIndex];
            }
            return code;
        },
        /**生成一个随机数**/
        randomNum: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        /**生成一个随机色**/
        randomColor: function (min, max) {
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        /**绘制验证码图片**/
        drawPic: function () {
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            /**绘制背景色**/
            ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
            ctx.fillRect(0, 0, 120, 40);
            /**绘制文字**/
            var txt = this.verification = this.createCode();
            ctx.fillStyle = this.randomColor(50, 160);  //随机生成字体颜色
            ctx.font = 30 + 'px SimHei'; //随机生成字体大小
            var x = 25;
            var y = 35;
            var deg = this.randomNum(-10, 10);
            //修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
            /**绘制干扰线**/
            for (var i = 0; i < 8; i++) {
                ctx.strokeStyle = this.randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, 120), this.randomNum(0, 40));
                ctx.lineTo(this.randomNum(0, 120), this.randomNum(0, 40));
                ctx.stroke();
            }
            /**绘制干扰点**/
            for (var i = 0; i < 100; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, 120), this.randomNum(0, 40), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    },
    mounted: function () {
        this.drawPic()
    }
}

</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
</style>

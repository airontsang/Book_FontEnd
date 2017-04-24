<template>
  <div>
    <h1>这里是示例</h1>
    <h2>登录/注册或得更大内容</h2>
    <!--<loading v-model="show" :text="text1"></loading>-->
  </div>
</template>
<script>
  import resource from '@/resource.js'
  import { Loading } from 'vux'
  export default {
    name: 'NoneUser',
    compoments: {
      Loading
    },
    data(){
      return {
        show: false,
        text1: "正在玩命加载"
      }
    },
    mounted: function () {
      this.show = true
      resource.getIndexBook().then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          console.log(res.body.data)
          this.show = false
        }
      }, err => {
        console.log(err)
          this.show = false
      })
      console.log("您好")
    }
  }

</script>
<style scoped lang="less">


</style>

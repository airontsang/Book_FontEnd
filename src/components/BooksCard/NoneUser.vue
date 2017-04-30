<template>
  <div>
    <h1>这里是示例</h1>
    <h2 @click="gologin">登录/注册或得更大内容</h2>
  </div>
</template>
<script>2
import { Loading } from 'vux'
export default {
  name: 'NoneUser',
  compoments: {
  },
  data() {
    return {
    }
  },
  methods: {
    gologin: function() {
      this.$router.push({ path: '/login' })
    }
  },
  mounted: function () {
  }

}

</script>
<style scoped lang="less">

</style>

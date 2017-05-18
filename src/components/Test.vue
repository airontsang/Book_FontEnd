<template>
  <div class="holder">
    <div class="box-left">
      <button @click="isShow = !isShow">show</button>
    </div>
    <div class="box-right">
      <div class="content-panel" :class="{ contentShow: isShow }">
        <ul>
          <li>文件名：5651231</li>
          <li>df5df132</li>
          <li>文件名：dsd1g23df231</li>
          <li>文件名：hiu5l13231</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  2
  import {
    Loading
  } from 'vux'
  export default {
    name: 'NoneUser',
    compoments: {},
    data() {
      return {
          isShow: false
      }
    },
    methods: {
      gologin: function () {
        this.$router.push({
          path: '/login'
        })
      }
    },
    mounted: function () {}

  }

</script>
<style scoped lang="less">
  li {
    list-style-type: none;
    width: 100%;
    padding: 5px;
    border: 1px solid #999;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .holder {
    width: 80%;
    margin: auto;
    display: flex;
    button {
      padding: 5px 10px;
      color: #fff;
      background: @base-green;
      margin-top: 150px;
      margin: auto;
      border: none;
    }
  }
  
  .box-left {
    width: 19%;
  }
  
  .box-right {
    width: 80%;
    position: relative;
    .content-panel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    //   display: none;
    transform: translate(0);
      transition: transform 1s;
    }
    .contentShow {
    transform: translate(100%)
        
        // left: 0;
        // display: block;
    }
  }

</style>

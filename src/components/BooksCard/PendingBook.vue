<template>
  <div>
    <div class="header-box">
      <h1 class="header-title">06届下李朗小学聚会</h1>
      <div class="header-edit">
        <x-icon type="ios-plus" size="37"></x-icon>
      </div>
      <div class="header-add">
        <x-icon type="ios-help" size="37"></x-icon>
      </div>
    </div>
    <div class="info-box">
      <div class="info-time">2017-5-25</div>
      <div class="info-place">深圳南山</div>
    </div>
    <div class="info-intro">
      最近我开始使用Vs code来编写前端代码，为了编写方便我安装了HTML Snippets这个自动补全插件，但是我使用的时候发现一个问题就是，自动补全插件的提示优先级最低，比如我输入div的时候想回车直接就补
    </div>
    <div class="but-item">
      <x-button type="primary" action-type="button">记一笔</x-button>
    </div>
    <div class="item-box">
      <ul>
        <li class="item-all item-cell vux-1px-b">
          <div class="all-box">
            明细
          </div>
          <div class="all-text">
            查看全部
          </div>
          <div class="arrow-box">
            <label class="arrow"></label>
          </div>
        </li>
        <li class="item-cell vux-1px-b">
          <div class="item-left">
            <div class="item-tag">酒店住宿</div>
            <div class="two-info">
              <span class="item-time">04-27</span>
              <span class="item-content">他又超支了</span>
            </div>
          </div>
          <div class="item-right">￥425.00</div>
        </li>
        <li class="item-cell vux-1px-b">
          <div class="item-left">
            <div class="item-tag">吃喝</div>
            <div class="two-info">
              <span class="item-time">04-28</span>
              <span class="item-content"></span>
            </div>
          </div>
          <div class="item-right">￥386.00</div>
        </li>
        <li class="item-cell vux-1px-b">
          <div class="item-left">
            <div class="item-tag">交款</div>
            <div class="two-info">
              <span class="item-time">04-20</span>
              <span class="item-content">胖子</span>
            </div>
          </div>
          <div class="item-right">￥550.00</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Group, XButton, Cell, CellBox } from 'vux'
  import { set_book_info, get_book_info } from '../../state.js'
  export default {
    data() {
      return {
      }
    },
    computed: {
      title: function () {
        var test = get_book_info()
        return test
      }
    },
    mounted: function () {
      set_book_info("这是什么")
      this.title = get_book_info()
    },
    components: {
      Group,
      Cell,
      CellBox,
      XButton
    }
  }

</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .vux-x-icon {
    fill: #09BB07;
  }
  
  .header-box {
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 10px 0;
    h1 {
      width: 100%;
      font-size: 1em;
    }
    .header-add {
      display: flex;
      align-items: center;
      position: absolute;
      right: 1em;
    }
    .header-edit {
      display: flex;
      align-items: center;
      position: absolute;
      left: 1em;
    }
  }
  
  .info-cell {
    padding: 10px;
    text-align: center;
  }
  
  .info-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .info-time {
      .info-cell;
      flex: 1;
    }
    .info-place {
      .info-cell;
      flex: 1;
    }
  }
  
  .info-intro {
    font-size: .8em;
    padding: 10px;
  }
  
  .but-item {
    padding: 10px;
  }
  
  .item-cell {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .item-all {
    .all-box {
      width: 70%;
    }
    .all-text {
      width: 25%;
      color: #999;
      text-align: right;
      margin-right: 10px;
    }
    .arrow-box {
      width: 5%;
    }
  }
  
  .arrow {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }

  .item-left {
    display: flex;
    flex-direction: column;
    width: 80%;
    .two-info {
      font-size: .6em;
      color: #999;
    }
  }
  .item-right {
    width: 20%;
    text-align: right;
  }
</style>
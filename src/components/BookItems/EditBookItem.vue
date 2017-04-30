<template>
  <div>
    <b-header @back="Fback" @submit="Fsubmit" @typeChanged="typeCome" :is-tabbar=true></b-header>
    <div class="text-box">
      <div class="input-box vux-1px-b">
        <div class="label-box">
          <span>￥</span>
          <br>
          <span>人民币</span>
        </div>
        <input type="number" v-model="charge">
      </div>
      <div class="tag-box vux-1px-b" v-show="!type">
        <label :class="{ selected :tag.selected }" v-for="(tag, index) in tags" @click="selectTag(index)">{{ tag.name }}</label>
      </div>
      <div class="remark-box vux-1px-b">
        <input type="text" v-model="remark" placeholder="备注...">
      </div>
      <group class="time-box1">
        <datetime-range :title="timeTitle" start-date="2017-05-15" end-date="2017-06-15" :format="format" :value="value" @on-change="onChange"></datetime-range>
      </group>
    </div>
  </div>
  </div>
</template>
<script>
  import Bheader from '../BHeader.vue'
  import {
    Group,
    DatetimeRange
  } from 'vux'
  import moment from 'moment'
  import resource from '../../resource.js'
  import {
    index_book
  } from '../../state.js'
  export default {
    watch: {
      $route(to, from) {
        if (from.name === 'allbookitems') {
          console.log(this.$route.query.bookitemid)
        }
      }
    },
    data() {
      return {
        tags: [{
          name: '吃喝',
          selected: true
        }, {
          name: '交通出行',
          selected: false
        }, {
          name: '酒店住宿',
          selected: false
        }, {
          name: '门票',
          selected: false
        }, {
          name: '娱乐项目',
          selected: false
        }, {
          name: '购物其他',
          selected: false
        }, ],
        type: false,
        selectedTag: '吃喝',
        charge: 0.00,
        format: "YYYY/MM/DD",
        remark: "",
        timeTitle: "选择时间",
        test: "测试",
        value: [],
        timeToDb: '',
      }
    },
    methods: {
      Fback: function () {
        this.$router.back(-1)
      },
      Fsubmit: function () {
        this.$vux.loading.show({
          text: "提交中"
        })
        resource.addBookItem({
        }, {
          bookId: index_book.id,
          content: this.remark,
          charge: this.charge,
          type: this.type,
          tag: this.selectedTag,
          happen_at: this.timeToDb          
        }).then(res => {
          if (res.status === 200 && res.body.error_code === 0) {
              var goodItem = {}
              goodItem.content = this.remark;
              goodItem.charge  = this.charge;
              goodItem.type    = this.type;
              goodItem.tag     = this.selectedTag;
              goodItem.happen_at = moment(this.happen_at).format('MM-DD HH:mm');
              index_book.newItem(goodItem);
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '已提交',
              time: 2000
            })
            this.$router.back();
          } else if (res.status === 200 && res.body.error_code === 1012) {
              this.$vux.loading.hide()
            this.$vux.toast.show({
              text: '账本不存在',
              type: warn,
              time: 2000
            })
          } else{
              console.log(res)
          }
        })
      },
      test: function () {
        console.log("niho")
        this.$emit('input', 0)
      },
      onChange(val) {
        console.log(this.value)
        this.timeToDb = this.value[0] + " " + this.value[1] + ":" + this.value[2] + ":00.000"
      },
      typeCome(val) {
        if (val === 1) {
          this.type = true;
          this.selectedTag = "成员交款";
        } else {
          this.type = false;
        }
      },
      selectTag: function (index) {
        this.tags.forEach(tag => {
          tag.selected = false;
        })
        this.tags[index].selected = true;
        this.selectedTag = this.tags[index].name;
      }
    },
    mounted: function () {
      this.value = (moment().format('YYYY-MM-DD HH mm')).split(" ");
    },
    components: {
      Group,
      DatetimeRange,
      'b-header': Bheader,
    }
  }

</script>
<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  input {
    outline: none;
  }
  
  .text-box {
    padding: 10px;
    background: #fff;
  }
  
  .input-box {
    display: flex;
    width: 100%;
    .label-box {
      font-size: .7em;
      padding-bottom: 10px;
      text-align: center;
    }
    input {
      border: none;
      margin-left: 10px;
      font-size: 1.3em;
      font-weight: bold;
      color: @base;
    }
  }
  
  .tag-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 10px 0;
    width: 100%;
    label {
      display: block;
      text-align: center;
      width: 21%;
      margin-top: 10px;
      margin-right: 3%;
      font-size: .9em;
      color: #999;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    .selected {
      color: @base;
      border: 1px solid @base;
    }
  }
  
  .remark-box {
    padding: 10px 0;
    input {
      border: none;
    }
  }
  
  .time-box {
    display: -webkit-inline-flex;
    display: inline-flex;
    align-items: center;
    padding: 5px;
    margin: 10px 0;
    font-size: .9em;
    color: #777;
    background: #ccc;
    border-radius: 3px;
    img {
      width: 1.2em;
    }
    span {
      margin-left: 4px;
    }
  }
  
  .time-box1 {
    color: #777;
  }

</style>

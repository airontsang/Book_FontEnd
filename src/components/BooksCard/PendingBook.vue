<template>
  <div>
    <div class="header-box">
      <h1 class="header-title">{{ book.title }}</h1>
      <div class="header-edit">
        <router-link :to="{ path: '/editbook', query:{ isEdit: false }}">
          <x-icon type="ios-plus" size="37"></x-icon>
        </router-link>
      </div>
      <div class="header-add">
        <router-link :to="{ path: '/editbook', query:{ isEdit: true }}">
          <x-icon type="ios-help" size="37"></x-icon>
        </router-link>
      </div>
    </div>
    <div class="info-box">
      <div class="info-time">{{ book.partyTime }}</div>
      <div class="info-place">{{ book.place }}</div>
    </div>
    <div class="info-intro">
      {{ book.intro }}
    </div>
    <div class="but-item">
      <x-button @click.native="add_item" type="primary" action-type="button">记一笔</x-button>
    </div>
    <div class="item-box">
      <ul>
        <router-link to="/allbookitems">
          <li class="item-all item-cell vux-1px-b">
            <div class="all-box">明细</div>
            <div class="all-text">查看全部</div>
            <div class="arrow-box">
              <label class="arrow"></label>
            </div>
          </li>
        </router-link>
        <li class="item-cell vux-1px-b" v-for="item in book.book_item">
          <div class="item-left">
            <div class="item-tag">{{ item.tag }}</div>
            <div class="two-info">
              <span class="item-time">{{ item.happen_at }}</span>
              <span class="item-content">{{ item.content }}</span>
            </div>
          </div>
          <div class="item-right">￥{{ item.charge }}</div>
        </li>
      </ul>
      <x-button @click.native="toPublic" type="primary" action-type="button">公示</x-button>      
    </div>
  </div>
</template>

<script>
import resource from '@/resource.js'
import { Group, XButton, Cell, CellBox } from 'vux'
import moment from 'moment'
import { index_book } from '../../state.js'
export default {
  data() {
    return {
      book: {},
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.query.id)
    if (to.query.id) {
      resource.getAllBookItems({
        bookId: to.query.id
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          if (res.body.data.length == 0) {
            console.log("长度为0")
            index_book.book_item = []
          } else {
            index_book.setIndexItem(res.body.data);
          }
          next(vm => {
            console.log("运行了")
            // vm.$vux.loading.hide()
            // vm.book = index_book;
            // console.log(vm.book)            
          })
        }
      }, err => {
        console.log(err)
        next();
      })
    } else {
      if (index_book.id) {
        console.log("query没有值，index_book有")
        next(vm => {
          vm.$nextTick(function () {
            vm.$vux.loading.hide()
            // vm.book = index_book;
            // console.log(vm.book)
            vm.book.place = "深圳"
          })
        })
      } else {
        resource.getIndexBook().then(res => {
          if (res.status === 200 && res.body.error_code === 0) {
            index_book.set(res.body.data.info, res.body.data.bookItems);
            next(vm => {
              // vm.$router.push({ path: 'pending', query: { bookId: '5'} })
              console.log("这里是vm")
              vm.book = index_book;
              vm.book.partyTime = moment(vm.book.partyTime).format('YYYY-MM-DD')
              vm.$vux.loading.hide()
            })
          } else if (res.status === 200 && res.body.error_code === 1006) {
            next(vm => {
              vm.$vux.loading.hide()
              vm.$router.push({ path: 'login' })
              vm.$vux.toast.show({
                text: '登录过期',
                type: 'warn',
                time: 2000
              })
            })
          }
        }, err => {
          next(vm => {
            vm.$vux.loading.hide()
          })
        })
      }
    }
  },
  methods: {
    add_item: function () {
      this.$router.push({ path: 'editbookitem', query: { isEdit: false } })
    },
    toPublic: function () {
      this.$vux.loading.show({
        text: "公示中"
      })
      resource.toPublic({}, {
        bookId: index_book.id
      }).then( res => {
        if (res.status === 200 && res.body.error_code === 0 ) {
          this.$router.push({ path: "/publiced"})
        }
      })
    }
  },
  mounted: function () {
    if (this.$route.query.id) {
      this.book = index_book;
      this.book.partyTime = moment(this.book.partyTime).format('YYYY-MM-DD')
      this.$vux.loading.hide()
    } else if (index_book.id) {
      this.book = index_book
    } else {
      this.$vux.loading.show({
        text: "加载中"
      })
    }
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
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
      <ul :class="{disabled:!hasBookItem}">
        <router-link to="/allbookitems">
          <li class="item-all item-cell vux-1px-b">
            <div class="all-box">明细</div>
            <div class="all-text">查看全部</div>
            <div class="arrow-box">
              <label class="arrow"></label>
            </div>
          </li>
        </router-link>
        <div v-if="hasBookItem">
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
        </div>
        <div v-else>
          <divider>没有账目</divider>
        </div>
      </ul>
      <x-button @click.native="toPublic" type="primary" action-type="button">公示</x-button>
    </div>
  </div>
</template>

<script>
import resource from '@/resource.js'
import { XButton, Divider } from 'vux'
import moment from 'moment'
import { index_book } from '../../state.js'
export default {
  data() {
    return {
      hasBookItem: false,
      book: {},
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
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          this.$router.push({ path: "/publiced" })
        }
      })
    }
  },
  mounted: function () {
    this.$vux.loading.show({
      text: "加载中"
    })
    if (this.$route.query.id) {
      this.book = index_book;
      resource.getAllBookItems({
        bookId: this.$route.query.id
      }).then(res => {
        if (res.status === 200 && res.body.error_code === 0) {
          if (res.body.data.length == 0) {
            index_book.book_item = []
          } else {
            res.body.data.forEach((item, index) => {
              if (index < 4) {
                item.happen_at = moment(item.happen_at).format("MM-DD HH:mm")
                index_book.book_item.push(item)
              }
            })
            this.book.partyTime = moment(this.book.partyTime).format('YYYY-MM-DD')
            console.log(res.body.data)
            this.hasBookItem = true
            this.$vux.loading.hide()
          }
        }
        this.$vux.loading.hide()
      }, err => {
        console.log(err)
        next();
      })
    } else if (index_book.id) {
      this.$vux.loading.hide()
      this.book = index_book
      if (this.book.book_item.length != 0) {
        this.hasBookItem = true;
      }
    } else {
      resource.getIndexBook().then(res => {
          console.log(res)
        if (res.status === 200 && res.body.error_code === 0) {
          if (res.body.data !== null) {
            if (res.body.data.bookItems.length !== 0) {
              this.hasBookItem = true;
            }
            index_book.set(res.body.data.info, res.body.data.bookItems);
            this.book = index_book;
            this.book.partyTime = moment(this.book.partyTime).format('YYYY-MM-DD')
          }
          this.$vux.loading.hide()
        } else if (res.status === 200 && res.body.error_code === 1006) {
          this.$vux.loading.hide()
          this.$router.push({ path: 'login' })
          this.$vux.toast.show({
            text: '登录过期',
            type: 'warn',
            time: 2000
          })
        }
      }, err => {
        this.$vux.loading.hide()
      })
    }
  },
  components: {
    Divider,
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
    z-index: 1;
  }
  .header-edit {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 1;
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

.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
</style>
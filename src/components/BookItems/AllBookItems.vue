<template>
    <div>
        <b-header @back="Fback" :is-tabbar=false :headerTitle="headerTitle"></b-header>
        <div class="all-item-box">
            <div v-for="(value, key) in allItem" class="day-box">
                <div class="date-holder">{{ key }}</div>
                <swipeout v-for="item in value" :key="item._id">
                    <swipeout-item :threshold=".5" underlay-color="#ccc">
                        <div slot="right-menu">
                            <swipeout-button @click.native="edit(item)" background-color="#09BB07">编辑</swipeout-button>
                            <swipeout-button @click.native="del(item._id)" background-color="#D23934">删除</swipeout-button>
                        </div>
                        <div slot="content" class="item-cell vux-1px-b">
                            <div class="item-left">
                                <div class="item-tag">{{ item.tag }}</div>
                                <div class="two-info">
                                    <span class="item-time">{{ item.happen_atF }}</span>
                                    <span class="item-content">{{ item.content }}</span>
                                </div>
                            </div>
                            <div class="item-right">￥{{ item.charge }}</div>
                        </div>
                    </swipeout-item>
                </swipeout>
            </div>
        </div>
        <div class="but-item">
            <router-link :to="{ path:'/editbookitem', query:{ isEdit: false } }">
                <x-button type="primary" action-type="button">记一笔</x-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import Bheader from '../BHeader.vue'
import moment from 'moment'
import resource from '../../resource.js'
import { index_book } from '../../state.js'
export default {
    data() {
        return {
            title: '',
            headerTitle: '细则',
            allItem: {}
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     resource.getAllBookItems({
    //         bookId: index_book.id,
    //         pageIndex: 1,
    //         pageSize: 100
    //     }).then(res => {
    //         if (res.status === 200 && res.body.error_code === 0) {
    //             next(vm => {
    //                 console.log(res.body.data[1])
    //                 vm.allItem = res.body.data;
    //                 index_book.setIndexItem(res.body.data);
    //                 let onlyMonth = {};
    //                 res.body.data.forEach((item, index) => {
    //                     // console.log(item)
    //                     let month = moment(item.happen_at).format('M' + '月')
    //                     item.happen_atF = moment(item.happen_at).format("MM-DD HH:mm")
    //                     if (!onlyMonth[month]) {
    //                         onlyMonth[month] = [];
    //                     }
    //                     onlyMonth[month].push(item)
    //                 })
    //                 vm.allItem = onlyMonth;
    //                 vm.$vux.loading.hide()
    //             })
    //         }
    //     }, err => {
    //         next(vm => {
    //             vm.$vux.loading.hide()
    //         })
    //     })
    // },
    methods: {
        del: function (itemId) {
            const _this = this
            this.$vux.confirm.show({
                title: '请三思',
                content: '确定删除吗？',
                onCancel() {
                },
                onConfirm() {
                    _this.$vux.loading.show({
                        text: '删除中'
                    })
                    resource.delBookItem({
                        bookId: index_book.id,
                        bookItemId: itemId
                    }).then(res => {
                        _this.$vux.loading.hide();
                        if (res.status === 200 && res.body.error_code === 0) {
                            _this.$vux.toast.show({
                                text: '删除成功',
                                type: 'success',
                                time: 2000
                            })
                            _this.$router.push({ path: '/allbookitems' })
                        }
                    })
                }
            })
        },
        edit: function (itemToEdit) {
            console.log(itemToEdit.type)
            this.$router.push({ path: '/editbookitem', query: { isEdit: true, itemId: itemToEdit._id, content: itemToEdit.content, tag: itemToEdit.tag, type: itemToEdit.type, happen_at: itemToEdit.happen_at, charge: itemToEdit.charge } })
        },
        Fback: function () {
            console.log("返回")
            this.$router.push({ path: '/pending' })
        }
    },
    components: {
        'b-header': Bheader,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        XButton
    },
    mounted: function () {
        this.$vux.loading.show({
            text: '加载中'
        })
        resource.getAllBookItems({
            bookId: index_book.id,
            pageIndex: 1,
            pageSize: 100
        }).then(res => {
            if (res.status === 200 && res.body.error_code === 0) {
                let intemStorge = res.body.data;
                let onlyMonth = {};
                res.body.data.forEach((item, index) => {
                    let month = moment(item.happen_at).format('M' + '月')
                    item.happen_atF = moment(item.happen_at).format("MM-DD HH:mm")
                    if (!onlyMonth[month]) {
                        onlyMonth[month] = [];
                    }
                    onlyMonth[month].push(item)
                })
                index_book.book_item = []
                intemStorge.forEach((item, index) => {
                    if (index < 4) {
                        item.happen_at = moment(item.happen_at).format("MM-DD HH:mm")
                        index_book.book_item.push(item)
                    }
                })
                this.allItem = onlyMonth;
                this.$vux.loading.hide()
            }
        })
    }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.item-cell {
    padding: 10px;
    display: flex;
    align-items: center;
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

.day-box {
    margin-top: 25px;
}

.date-holder {
    padding: 5px 0 5px 10px;
}

.but-item {
    padding: 10px;
}
</style>
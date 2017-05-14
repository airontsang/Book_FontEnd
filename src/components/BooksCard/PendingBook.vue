<template>
    <div>
        <div>
            <div class="head-box" :style="{ height: height*0.4 + 'px'}">
                <div class="text-box">
                    <h2 :style="{ 'margin-top': (height)*0.21 + 'px'}">{{ book.title }}</h2>
                    <div class="details-box">
                        <div class="time">
                            <img src="../../assets/pic/pending_time.png">
                            <span>{{ book.partyTime }}</span>
                        </div>
                        <div class="place">
                            <img src="../../assets/pic/pending_place.png">
                            <span>{{ book.place }}</span>
                        </div>
                    </div>
                </div>
                <div class="header-add">
                    <router-link :to="{ path: '/editbook', query:{ isEdit: false }}">
                        <x-icon type="ios-plus" size="37"></x-icon>
                    </router-link>
                </div>
                <div class="header-edit">
                    <router-link :to="{ path: '/editbook', query:{ isEdit: true }}">
                        <img src="../../assets/pic/pending_edit.png">
                    </router-link>
                </div>
                <img src="static/default.jpg">
                <div class="loom"></div>
            </div>
            <div class="green-box" :style="{ height: height*0.2 + 'px'}">
                <div class="count-box" :style="{ height: height*0.1 + 'px'}">
                    <div class="count-item">
                        <label>总额</label>
                        <label>￥880</label>
                    </div>
                    <div class="count-item">
                        <label>余额</label>
                        <label>￥880</label>
                    </div>
                    <div class="count-item">
                        <label>支出</label>
                        <label>￥880</label>
                    </div>
                </div>
            </div>
            <div class="item-box" :style="{ top: -(height*0.1) + 'px'}">
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
                <div class="but-item">
                    <x-button @click.native="add_item" type="primary" action-type="button">记一笔</x-button>
                </div>
            </div>
        </div>
        <button class="publiced-but">
            <img src="../../assets/logo.png">
        </button>
    </div>
</template>

<script>
import resource from '@/resource.js'
import { XButton, Divider } from 'vux'
import moment from 'moment'
import { index_book } from '../../state.js'

export default {
    components: {
        Divider,
        XButton
    },
    data() {
        return {
            hasBookItem: true,
            height: '',
            contentH: '',
            book: {},
        }
    },
    methods: {
        getBrowserInterfaceSize: function () {
            var pageWidth = window.innerWidth;
            var pageHeight = window.innerHeight;
            if (typeof pageWidth != "number") {
                //在标准模式下面
                if (document.compatMode == "CSS1Compat") {
                    pageWidth = document.documentElement.clientWidth;
                    pageHeight = document.documentElement.clientHeight;
                } else {
                    pageWidth = document.body.clientWidth;
                    pageHeight = window.body.clientHeight;
                }
            }
            return {
                pageWidth: pageWidth,
                pageHeight: pageHeight
            }
        },
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
        },
        getAllBookItems: function () {
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
            })
        },
        getIndexBook: function () {
            resource.getIndexBook().then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    if (res.body.data.bookItems.length !== 0) {
                        this.hasBookItem = true;
                    }
                    index_book.set(res.body.data.info, res.body.data.bookItems);
                    this.book = index_book;
                    this.book.partyTime = moment(this.book.partyTime).format('YYYY-MM-DD')
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
    mounted: function () {
        let result = this.getBrowserInterfaceSize()
        this.height = (result.pageHeight - 54);
        this.contentH = this.height * 0.58;

        this.$vux.loading.show({
            text: "加载中"
        })
        if (this.$route.query.id) {
            this.book = index_book
            this.getAllBookItems()
        } else if (index_book.id) {
            this.$vux.loading.hide()
            this.book = index_book
            if (this.book.book_item.length != 0) {
                this.hasBookItem = true;
            }
        } else {
            this.getIndexBook()
        }
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-x-icon {
    fill: #09BB07; //   fill: #fff;
}

.title {
    line-height: 100px;
    text-align: center;
    color: #fff;
}

.head-box {
    position: relative;
    width: 100%;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        z-index: -5;
    }
    .text-box {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        padding: 25px 15px 0 15px;
        text-align: left;
        color: #fff;
        z-index: 999;
        width: 100%;
        label {
            font-size: .5em;
            display: inline-block;
            opacity: .7;
        }
        div {
            word-wrap: break-word;
            word-break: break-all;
            font-size: .9em;
            opacity: .8;
        }
    }
    .details-box {
        color: #F8F8FF;
        display: inline-flex;
        width: 100%;
        margin-top: 15px;
        img {
            height: 15px;
            width: 15px;
            display: inline-block;
        }
        .time {
            display: inline-block;
            width: 50%;
        }
        .place {
            display: inline-block;
            width: 50%;
            text-align: right;
        }
    }
    .loom {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -4;
        top: 0;
        background: #000;
        opacity: .4;
    }
    .header-edit {
        display: flex;
        align-items: center;
        position: absolute;
        right: 1.2em;
        top: 1.2em;
        img {
            width: 32px;
            height: 32px;
        }
    }
    .header-add {
        display: flex;
        align-items: center;
        position: absolute;
        left: 1em;
        top: 1em;
    }
}

.green-box {
    background: @base-green;
    color: #fff;
    font-size: .9em;
    .count-box {
        margin: auto;
        width: 90%;
        display: flex;
        .count-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }
    }
}

.but-item {
    padding: 10px 10px;
}

.item-box {
    position: relative;
    width: 90%;
    margin: auto;
    background: #fff;
    box-shadow: 4px 4px 7px rgba(255, 255, 255, .8);
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

.publiced-but {
    position: fixed;
    display: flex;
    align-content: center;
    right: 10%;
    bottom: 8%;
    background: @base-green;
    border-radius: 50%;
    border: none;
    padding: 9px;
    img {
        width: 36px;
        height: 36px;
    }
}






.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.vux-indicator.custom-bottom {
    bottom: 30px;
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}

.fadeInUp {
    animation-name: fadeInUp;
}
</style>
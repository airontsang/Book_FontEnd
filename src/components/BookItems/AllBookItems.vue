<template>
    <div>
        <x-header>Title</x-header>
        <div class="all-item-box">
            <swipeout>
                <swipeout-item :threshold=".5" underlay-color="#ccc">
                    <div slot="right-menu">
                        <swipeout-button background-color="#09BB07">编辑</swipeout-button>
                        <swipeout-button background-color="#D23934">删除</swipeout-button>
                    </div>
                    <div slot="content" class="item-cell vux-1px-b">
                        <div class="item-left">
                            <div class="item-tag">酒店住宿</div>
                            <div class="two-info">
                                <span class="item-time">04-27 13:25</span>
                                <span class="item-content">他又超支了</span>
                            </div>
                        </div>
                        <div class="item-right">￥425.00</div>
                    </div>
                </swipeout-item>
            </swipeout>
            <div class="day-box">
                <div class="date-holder">
                    4月 27日
                </div>
                <swipeout>
                <swipeout-item :threshold=".5" underlay-color="#ccc">
                    <div slot="right-menu">
                        <swipeout-button background-color="#09BB07">编辑</swipeout-button>
                        <swipeout-button background-color="#D23934">删除</swipeout-button>
                    </div>
                    <div slot="content" class="item-cell vux-1px-b">
                        <div class="item-left">
                            <div class="item-tag">酒店住宿</div>
                            <div class="two-info">
                                <span class="item-time">04-27 13:25</span>
                                <span class="item-content">他又超支了</span>
                            </div>
                        </div>
                        <div class="item-right">￥425.00</div>
                    </div>
                </swipeout-item>
            </swipeout>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import { set_book_info, get_book_info } from '../../state.js'
    export default {
        data() {
            return {
                title: ''
            }
        },
        computed: {


        },
        mounted: function () {
        },
        components: {
            XHeader,
            Swipeout, 
            SwipeoutItem, 
            SwipeoutButton
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
</style>
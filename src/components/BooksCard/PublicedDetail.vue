<template>
    <div>
        <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">{{ book.bookTitle }}</x-header>
        <form-preview :header-label="formTitle" header-value="来一个标题就好" :body-items="list"></form-preview>
        <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
        </div>
    </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, FormPreview } from 'vux'
import { Group, XInput, XTextarea } from 'vux'
import { set_book_info, get_book_info } from '../../state.js'
import moment from "moment"
import resource from '../../resource.js'
export default {
    directives: {
        TransferDom
    },
    data() {
        return {
            tag: 1,
            tick1: false,
            tick2: false,
            formTitle: "标题",
            list: [{
                label: '创建时间',
                value: '电动打蛋机'
            },{
                label: '公示时间',
                value: '电动打蛋机'
            }, {
                label: '地点',
                value: '名字名字名字'
            }, {
                label: '简介',
                value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
            },{
                label: '聚会时间',
                value: '电动打蛋机'
            },{
                label: '总收款',
                value: '电动打蛋机'
            },{
                label: '总花费',
                value: '电动打蛋机'
            },{
                label: '余额',
                value: '电动打蛋机'
            },{
                label: '凭证ID',
                value: '电动打蛋机'
            },{
                label: '区块标识',
                value: '电动打蛋机'
            },{
                label: '全数据HASH',
                value: '电动打蛋机'
            }],
            book: {},
            bookItems: [],
            menus: {
                menu1: 'Take Photo',
                menu2: 'Choose from photos'
            },
            showMenus: false
        }
    },
    computed: {
    },
    methods: {
        back: function () {
            alert("back")
        },
        submit: function () {
            alert("submit")
        },
        getBookInfo: function () {
            resource.onePublicedBook({
                bookId: this.$route.query.bookId
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    this.book = res.body.data
                }
                this.tick1 = true;
            })
        },
        getBookItems: function () {
            resource.getAllBookItems({
                bookId: this.$route.query.bookId,
                pageIndex: 1,
                pageSize: 100
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    res.body.data.forEach((item, index) => {
                        item.happen_at = moment(item.happen_at).format("MM-DD HH:mm")
                    })
                    this.bookItems = res.body.data;
                }
                this.tick2 = true;
                this.$vux.loading.hide()                
            })
        },

    },
    mounted: function () {
        this.$vux.loading.show({
            text: "加载中"
        })
        this.getBookInfo()
        this.getBookItems()
    },
    components: {
        XHeader,
        Actionsheet,
        FormPreview
    }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
</style>
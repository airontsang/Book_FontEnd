<template>
    <div>
        <b-header v-on:back="back" v-on:submit="submit" :is-tabbar=false :headerTitle="title"></b-header>
        <x-input title="标题" v-model="bookTitle"></x-input>
        <x-input title="聚会时间" v-model="partyTime"></x-input>
        <x-input title="地点" v-model="partyPlace"></x-input>
        <x-textarea title="简介" v-model="bookIntro"></x-textarea>
    </div>
</template>

<script>
    import BHeader from '../BHeader.vue'
    import { Group, XInput, XTextarea } from 'vux'
    import { set_book_info, get_book_info } from '../../state.js'
    export default {
        data() {
            return {
                tag: 1,
                title: "公示細則",
                bookTitle: "13届下李朗小学聚会",
                partyTime: "05月05号",
                partyPlace: "深圳南山",
                bookIntro: "你好，大家还好吗，我时常还会梦见大家。高中的时候，会觉得初中那美好的时光是那么近，又那么远；可现在觉得，原来已经那么远了，却又不想去承认"
            }
        },
        methods: {
            back: function () {
                alert("back")
            },
            submit: function () {
                alert("submit")
            }
        },
        computed: {


        },
        mounted: function () {
        },
        components: {
            'b-header': BHeader,
            Group,
            XInput,
            XTextarea
        }
    }

</script>

<style scoped lang="less">
    @import '~vux/src/styles/1px.less';

</style>
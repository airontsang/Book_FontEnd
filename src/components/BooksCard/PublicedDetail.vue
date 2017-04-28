<template>
    <div>
        <b-header v-on:back="back" v-on:submit="submit"></b-header>
        ni
    </div>
</template>

<script>
    import BHeader from '../BHeader.vue'
    import { set_book_info, get_book_info } from '../../state.js'
    export default {
        data() {
            return {
                tag: 1
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
            'b-header': BHeader
        }
    }

</script>

<style scoped lang="less">
    @import '~vux/src/styles/1px.less';

</style>
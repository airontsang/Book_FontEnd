<template>
    <div>
        <div class="book-header">
            <div class="back-arrow">
                <x-icon v-on:click="back" type="ios-arrow-thin-left" class="icon-red" size="30"></x-icon>
            </div>
            <div class="header-content">
                <button-tab :height="25" v-model="tag" v-if="isTabbar">
                    <button-tab-item>消费</button-tab-item>
                    <button-tab-item>成员交款</button-tab-item>
                </button-tab>
                <p v-else>{{ headerTitle }}</p>
            </div>
            <div class="submit-but">
                <x-icon v-on:click="submit" type="ios-checkmark-empty" class="icon-white" size="30"></x-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
export default {
    props: {
        isTabbar: Boolean,
        headerTitle: String
    },
    data() {
        return {
            tag: 1
        }
    },
    methods: {
        back: function () {
            this.$emit('back')
        },
        submit: function () {
            this.$emit('submit')
        }
    },
    computed: {


    },
    mounted: function () {
    },
    components: {
        ButtonTab,
        ButtonTabItem
    }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.book-header {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 7px;
    background: #393a3f;
    .back-arrow {
        display: flex;
        align-items: center;
        width: 15%;
    }
    .header-content {
        padding: 8px 55px;
        text-align: center;
        color: #fff;
        width: 70%;
    }
    .submit-but {
        display: flex;
        align-items: center;
        width: 15%;
    }
}

.vux-x-icon {
    fill: #fff;
}

.vux-button-group-current {
    background: #393a3f!important;
}

.vux-button-tab-item-first:after {
    border: 1px solid #fff!important;
    color: #fff!important;
}

.vux-button-tab-item-last:after {
    border-right: 1px solid #fff!important;
    border-top: 1px solid #fff!important;
    border-bottom: 1px solid #fff!important;
}
.vux-button-tab-item-first:after {
    border-right: 1px solid #fff!important;
    border-top: 1px solid #fff!important;
    border-bottom: 1px solid #fff!important;
}
</style>
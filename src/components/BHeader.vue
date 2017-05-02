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
            <div class="submit-but" v-if="isSubmit">
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
        isSubmit: Boolean,
        tellType: Boolean,
        headerTitle: String
    },
    data() {
        return {
            tag: 0
        }
    },
    computed: {
    },
    methods: {
        back: function () {
            this.$emit('back')
        },
        submit: function () {
            this.$emit('submit')
        },
    },
    watch: {
        tag: function () {
            this.$emit('typeChanged', this.tag);
        }
    },
    mounted: function () {
            if( this.tellType === true ){
                this.tag = 1
            } else if( this.tellType === false ){
                this.tag = 0
            } else {
                this.tag = 0
            }
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
    background: #393a3f;
    .back-arrow {
        position: absolute;
        display: flex;
        align-items: center;
        width: 15%;
        left: 10px;
    }
    .header-content {
        padding: 10px 110px;
        text-align: center;
        color: #fff;
        width: 70%;
    }
    .submit-but {
        position: absolute;
        right: -9px;
        display: flex;
        align-items: center;
        width: 12%;
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
<template>
    <div>
        <b-header @back="Fback" @submit="Fsubmit" :is-tabbar=true></b-header>
        <div class="text-box">
            <div class="input-box vux-1px-b">
                <div class="label-box">
                    <span>￥</span>
                    <br>
                    <span>人民币</span>
                </div>
                <input type="number" v-model="charge">
            </div>
            <div class="tag-box vux-1px-b">
                <label class="selected">吃喝</label>
                <label>交通出行</label>
                <label>酒店住宿</label>
                <label>门票</label>
                <label>娱乐项目</label>
                <label>购物其他</label>
            </div>
            <div class="remark-box vux-1px-b">
                <input type="text" v-model="remark" placeholder="备注...">
            </div>
            <div class="time-box" @click="test">
                <img src="../../assets/pic/time.svg"></img>
                <span>{{ time }}</span>
            </div>
          
                <datetime-range :title="time" start-date="2017-05-15" end-date="2017-06-15" :format="format" v-model="value" @on-change="onChange"></datetime-range>
           
        </div>
    </div>
    </div>
</template>

<script>
import Bheader from '../BHeader.vue'
import { dateFormat, Group, DatetimeRange } from 'vux'
import { set_book_info, get_book_info } from '../../state.js'
export default {
    data() {
        return {
            tag: 1,
            charge: 0.00,
            format: "YYYY/MM/DD",
            remark: "",
            time: "",
            title: "选择",
            value: ['2017-05-20', '10', '00']
        }
    },
    methods: {
        Fback: function () {
            alert("back")
        },
        Fsubmit: function () {
            alert("submit")
        },
        test: function () {
            console.log("niho")
            this.$emit('input', 0)
        },
        onChange (val) {
            console.log('change', val)
        }
    },
    computed: {

    },
    mounted: function () {
        this.time = dateFormat(new Date(), 'MM-DD HH:mm')
    },
    components: {
        Group,
        DatetimeRange,
        'b-header': Bheader,
    }
}

</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
input {
    outline: none;
}

.text-box {
    padding: 10px;
    background: #fff;
}

.input-box {
    display: flex;
    width: 100%;
    .label-box {
        font-size: .7em;
        padding-bottom: 10px;
        text-align: center;
    }
    input {
        border: none;
        margin-left: 10px;
        font-size: 1.3em;
        font-weight: bold;
        color: @base;
    }
}

.tag-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 10px 0;
    width: 100%;
    label {
        display: block;
        text-align: center;
        width: 21%;
        margin-top: 10px;
        margin-right: 3%;
        font-size: .9em;
        color: #999;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    .selected {
        color: @base;
        border: 1px solid @base;
    }
}

.remark-box {
    padding: 10px 0;
    input {
        border: none;
    }
}

.time-box {
    display: -webkit-inline-flex;
    display: inline-flex;
    align-items: center;
    padding: 5px;
    margin: 10px 0;
    font-size: .9em;
    color: #777;
    background: #ccc;
    border-radius: 3px;
    img {
        width: 1.2em;
    }
    span {
        margin-left: 4px;
    }
}
</style>
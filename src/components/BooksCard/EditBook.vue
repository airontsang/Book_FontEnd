<template>
    <div>
        <b-header v-on:back="back" v-on:submit="submit" :is-tabbar=false :is-submit=true :headerTitle="title"></b-header>
        <x-input title="标题" v-model="bookTitle"></x-input>
        <!--<x-input title="聚会时间" v-model="partyTime"></x-input>-->
        <x-input title="地点" v-model="partyPlace"></x-input>
        <x-textarea title="简介" v-model="bookIntro"></x-textarea>
        <group class="time-box1">
            <datetime-range :title="timeTitle" start-date="2017-05-15" end-date="2017-06-15" :format="format" :value="value" @on-change="onChange"></datetime-range>
        </group>
        <div class="image-box">
            <div class="image-show">
                <img :src="exampleSrc">
            </div>
            <input type="file" name="images" id="imageBut" mutiple />
        </div>
    </div>
</template>

<script>
    import BHeader from '../BHeader.vue'
    import { Group, XInput, DatetimeRange, XTextarea } from 'vux'
    import moment from "moment"
    import { index_book } from '../../state.js'
    export default {
        data() {
            return {
                timeTitle: "聚会时间",
                format: "YYYY/MM/DD",
                value: [],
                timeToDb: '',
                exampleSrc: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg',
                lastFile: '',
                tag: 1,
                title: "账本修改",
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
            },
            pickImg: function () {
                var input = document.getElementById("imageBut")
                if (input.addEventListener) {
                    var _this = this;
                    input.addEventListener("change", function (evt) {
                        var i = 0,
                            len = this.files.length,
                            img, reader, file;
                        for (; i < len; i++) {
                            file = this.files[i]
                            if (window.FileReader) {
                                reader = new FileReader();
                                reader.onloadend = function (e) {
                                    console.log(e.target.result);
                                    _this.exampleSrc = e.target.result;
                                };
                                reader.readAsDataURL(file);
                                _this.lastFile = file;
                            }
                            if (window.FormData) {
                                var formdata = new FormData();
                                formdata.append("images", file);
                                //TODO 调用接口 发送formdata
                            }
                        }

                    })
                }
            },
            onChange(val) {
                this.timeToDb = val[0] + " " + val[1] + ":" + val[2] + ":00.000"
            }
        },
        computed: {
        },
        mounted: function () {
            if (this.$route.query.isEdit) {
                this.value = (moment().format('YYYY-MM-DD HH mm')).split(" ");
            } else {
                this.value = (moment().format('YYYY-MM-DD HH mm')).split(" ");
            }
            this.pickImg();
        },
        components: {
            'b-header': BHeader,
            Group,
            XInput,
            DatetimeRange,
            XTextarea
        }
    }

</script>

<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
    .time-box1 {
        color: #777;
    }
    .image-box {
        padding: 15px 10px;
        .image-show {
            width: 100%;
            height: 250px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
</style>
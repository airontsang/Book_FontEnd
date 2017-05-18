<template>
    <div class="edit-box">
        <b-header v-on:back="back" v-on:submit="submit" :is-tabbar=false :isClick="canSubmit" :is-submit=true :headerTitle="title"></b-header>
        <x-input title="标题" v-model="bookTitle"></x-input>
        <!--<x-input title="聚会时间" v-model="partyTime"></x-input>-->
        <x-input title="地点" v-model="place"></x-input>
        <x-textarea title="简介" v-model="intro"></x-textarea>
        <div class="time-box1">
            <datetime-range style="padding: 0" :title="timeTitle" start-date="2017-05-15" end-date="2017-06-15" :format="format" :value="value" @on-change="onChange"></datetime-range>
        </div>
    
        <div class="image-box">
            <p>背景图片(不做选择即使用默认)</p>
            <div class="image-show">
                <img :src="picUrl">
            </div>
    
            <div class="upload-box">
                <a href="javascript:;" class="file" :class="{ pickedUpload: picIsOk, isClicked: isClick  }">{{ butText }}
                    <input accept="image/*" type="file" name="images" id="imageBut">    
                </a>
                <button @click="uploadPic" class="upload-but" :class="{ pickedBut: picIsOk }">上传</button>
            </div>
        </div>
        <button @click="delBook" v-if="this.$route.query.isEdit" class="del-but">删除这个账本</button>
    </div>
</template>

<script>
import BHeader from '../BHeader.vue'
import Vue from 'vue'
import { Group, XInput, DatetimeRange, XTextarea } from 'vux'
import resource from '../../resource.js'
import moment from "moment"
import { index_book } from '../../state.js'
export default {
    data() {
        return {
            timeTitle: "聚会时间",
            format: "YYYY/MM/DD",
            picIsOk: false,
            isClick: false,
            butText: "选择图片",
            picOK: true,
            switchValue: true,
            switchTitle: "背景图片(不做选择即使用默认)",
            value: [],
            timeToDb: '',
            urlToDb: '',
            lastFile: '',
            tag: 1,
            title: "账本修改",
            bookTitle: "",
            picUrl: '',
            place: "",
            intro: ""
        }
    },
    methods: {
        back: function () {
            this.$router.replace({ path: '/pending ' })
        },
        submit: function () {
            this.$vux.loading.show({
                test: '添加中'
            })
            if (this.$route.query.isEdit) {
                this.submitEdit();
            } else {
                this.submitAdd();
            }
            index_book.reset();
        },
        submitAdd: function () {
            resource.addBook({}, {
                bookId: index_book.id,
                bookTitle: this.bookTitle,
                bookIntro: this.intro,
                bookPic: this.urlToDb,
                bookPlace: this.place,
                partyTime: this.timeToDb
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {

                    this.$vux.toast.show({
                        text: '添加成功',
                        type: 'success',
                        time: 2000
                    })
                    this.$router.replace({ path: '/pending' });
                } else {
                    this.$vux.toast.show({
                        text: '网络开小差',
                        type: 'warn',
                        time: 2000
                    })
                }
            })
        },
        submitEdit: function () {
            resource.editBook({}, {
                bookId: index_book.id,
                bookTitle: this.bookTitle,
                bookIntro: this.intro,
                bookPic: this.urlToDb,
                bookPlace: this.place,
                partyTime: this.timeToDb
            }).then(res => {
                if (res.status === 200 && res.body.error_code === 0) {
                    this.$router.replace({ path: '/pending' });
                    this.$vux.toast.show({
                        text: '修改成功',
                        type: 'success',
                        time: 2000
                    })
                } else {
                    this.$vux.toast.show({
                        text: '网络开小差',
                        type: 'warn',
                        time: 2000
                    })
                }
            })
        },
        uploadPic: function () {
            this.$vux.loading.show({
                text: '上传中'
            })
            if (window.FormData) {
                var formdata = new FormData();
                formdata.append("images", this.lastFile);
                //TODO 调用接口 发送formdata
            }
            let url = Vue.http.options.root + 'Books/bookPic/uploading'
            this.$http.post('http://localhost:3000/Books/bookPic/uploading', formdata, {
                headers: {
                    'Content-type': "mutipart/form-data"
                }
            }).then(res => {
                if (res.status === 200 && (res.body.error_code === 0 || res.body.error_code === 1019)) {
                    this.$vux.toast.show({
                        text: '上传成功',
                        type: 'success',
                        time: 2000
                    })
                    this.$vux.loading.hide();
                    this.lastFile = ""
                    this.urlToDb = res.body.name
                    this.picIsOk = false;
                    this.isClick = true;
                    this.butText = "已上传"
                    this.picOK = true;
                }
            }, err => {
                console.log(err)
            })
        },
        pickImg: function () {
            var input = document.getElementById("imageBut")
            if (input.addEventListener) {
                var _this = this;
                input.addEventListener("change", function (evt) {
                    console.log("改变了啊")
                    var i = 0,
                        len = this.files.length,
                        img, reader, file;
                    var filter = /^(image\/jpg|image\/jpeg|image\/png|image\/gif)$/i;
                    for (; i < len; i++) {
                        file = this.files[i]
                        if (!filter.test(file.type)) {
                            _this.$vux.toast.show({
                                text: '不支持该图片格式',
                                type: 'warn',
                                time: 1300
                            })
                            return;
                        }
                        if (file.size > 6291456) {
                            _this.$vux.toast.show({
                                text: '支持6M以下',
                                type: 'warn',
                                time: 1300
                            })
                            return;
                        }

                        if (window.FileReader) {
                            reader = new FileReader();
                            reader.readAsDataURL(file)
                            reader.onloadend = function (e) {
                                _this.picUrl = e.target.result;
                                _this.picOK = false;    //选了不上传的情况
                            };
                            _this.lastFile = file;
                            _this.picIsOk = true;
                            _this.butText = "重新选择";

                        }
                    }

                })
            } else {
                console.log("怎么会没有图片")
            }
        },
        delBook: function () {
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
                    resource.delBook({
                        bookId: index_book.id
                    }).then(res => {
                        if (res.status === 200 && res.body.error_code === 0) {
                            _this.$vux.loading.hide()
                            index_book.reset();
                            _this.$router.replace({ path: '/pending' })
                            _this.$vux.toast.show({
                                text: '删除成功',
                                type: 'success',
                                time: 2000
                            })
                        }
                    })
                }
            })
        },
        onChange(val) {
            this.timeToDb = val[0] + " " + val[1] + ":" + val[2] + ":00.000"
        }
    },
    computed: {
        canSubmit: function () {
            if (this.picOK && this.bookTitle !== '' && this.place !== '') {
                return true
            } else {
                return false

            }
        }
    },
    mounted: function () {
        if (this.$route.query.isEdit) {
            if (index_book.id == "") {
                this.$router.go(-1)
            } else if (index_book.picUrl === 'default.jpg') {
                this.picUrl = 'static/default.jpg'
                this.urlToDb = 'default.jpg'
            } else {
                this.urlToDb = index_book.picUrl
                this.picUrl = Vue.http.options.root + '/Books/getBookPic?fileName=' + index_book.picUrl
            }
            this.title = "账本修改"
            this.bookTitle = index_book.title
            this.place = index_book.place
            this.intro = index_book.intro
            this.value = (moment(index_book.partyTime).format('YYYY-MM-DD HH mm')).split(" ");
        } else {
            this.value = (moment().format('YYYY-MM-DD HH mm')).split(" ");
            this.picUrl = 'static/default.jpg'
            this.urlToDb = 'default.jpg'
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
.edit-box {
    width: 100%;
    overflow: hidden;
}

.time-box1 {
    color: #777;
}

.image-box {
    padding: 10px 10px;
    p {
        font-size: .8em;
        color: #999;
        padding-bottom: 8px;
    }
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

.upload-box {
    display: flex;
    text-align: center;
    margin-top: 10px;
    justify-content: space-between;
}

.file {
    position: relative;
    display: inline-block;
    background: #1AAD19;
    width: 100%;
    color: #fff;
    border-radius: 4px;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    padding: 8px 0;
}

.file input {
    position: absolute;
    font-size: 40px;
    right: 0;
    top: 0;
    opacity: 0;
}

.base-but {
    color: #fff;
    font-size: 1em;
    border: none;
}

.upload-but {
    .base-but;
    padding: 8px 0;
    border-radius: 4px;
    display: none;
    background: #1AAD19;
}

.del-but {
    .base-but;
    margin-top: 20px;
    padding: 12px 0;
    width: 100%;
    background: #f74c31;
}

.pickedUpload {
    width: 47%;
}

.pickedBut {
    .pickedUpload;
    display: inline-block;
}

.isClicked {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
</style>
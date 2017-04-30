import moment from 'moment'
var index_book = {
    id          : '',
    title       : '',
    intro       : '',
    picUrl      : '',
    place       : '',
    isPlublic   : false,
    partyTime   : new Date("month,dd,hh,mm"),
    sum         : 0,
    spend       : 0,
    balance     : 0,
    book_item   : []
}

index_book.set = function (info, bookItems) {
    this.id         = info._id;
    this.title      = info.title;
    this.picUrl     = info.picUrl;
    this.place      = info.place;
    this.intro      = info.intro;  
    this.partyTime  = moment(new Date()).format('YYYY-MM-DD');  
    this.sum        = info.sum;
    this.spend      = info.spend;
    this.balance    = info.balance;
    this.isPlublic  = info.isPublic;

    bookItems.map( item => {     
        item.update_at = moment(item.update_at).format('MM-DD HH:mm');
        return item;
    }) 
    this.book_item  = bookItems;
}

index_book.reset = function () {
    this.id         = '';
    this.title      = '';
    this.picUrl     = '';
    this.place      = '';
    this.intro      = '';  
    this.partyTime  = new Date("month,dd,hh,mm");  
    this.sum        = 0;
    this.spend      = 0;
    this.balance    = 0;
    this.isPlublic  = false;
    this.book_item  = [];
}

export { index_book }

// <div class="time-box" @click="test">
//                 <img src="../../assets/pic/time.svg"></img>
//                 <span>{{ time }}</span>
//             </div>
import moment from 'moment'
var index_book = {
  id: '',
  title: '',
  intro: '',
  picUrl: '',
  place: '',
  isPlublic: false,
  partyTime: new Date("month,dd,hh,mm"),
  sum: 0,
  spend: 0,
  balance: 0,
  book_item: []
}

index_book.formatTime = function (bookItems) {
    bookItems.map(item => {
    item.happen_at = moment(item.happen_at).format('MM-DD HH:mm');
    return item;
  })
  return bookItems;
}

index_book.set = function (info, bookItems) {
  this.id = info._id;
  this.title = info.title;
  this.picUrl = info.picUrl;
  this.place = info.place;
  this.intro = info.intro;
  this.partyTime = moment(new Date()).format('YYYY-MM-DD');
  this.sum = info.sum;
  this.spend = info.spend;
  this.balance = info.balance;
  this.isPlublic = info.isPublic;

  
  this.book_item = this.formatTime(bookItems);
}

index_book.reset = function () {
  this.id = '';
  this.title = '';
  this.picUrl = '';
  this.place = '';
  this.intro = '';
  this.partyTime = new Date("month,dd,hh,mm");
  this.sum = 0;
  this.spend = 0;
  this.balance = 0;
  this.isPlublic = false;
  this.book_item = [];
}

index_book.newItem = function (newItem) {
  if (this.book_item.length >= 4) {
    this.book_item.splice(3, 1);
  }
  this.book_item.unshift(newItem);
}

index_book.setIndexItem = function (allItem) {
  for (let i = 0; i <= 3; i++) {
    this.book_item[i] = allItem[i]
    this.book_item[i].happen_at = moment(allItem[i].happen_at).format('MM-DD HH:mm')
  }
}

export {
  index_book
}

// <div class="time-box" @click="test">
//                 <img src="../../assets/pic/time.svg"></img>
//                 <span>{{ time }}</span>
//             </div>

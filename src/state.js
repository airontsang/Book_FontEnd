import moment from 'moment'
var index_book = {
  id: '',
  title: '',
  intro: '',
  picUrl: '',
  place: '',
  isPublic: false,
  partyTime: '',
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
  this.partyTime = info.partyTime;
  this.sum = info.sum;
  this.spend = info.spend;
  this.balance = info.balance;
  this.isPublic = info.isPublic;


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
  this.isPublic = false;
  this.book_item = [];
}

index_book.newItem = function (newItem) {
  if (this.book_item.length >= 4) {
    this.book_item.splice(3, 1);
  }
  this.book_item.unshift(newItem);
}

// index_book.count = function () {
//   var countSheet = {}
//   var curSum = 0
//   var curSpend = 0
//   if( this.book_item.length == 0 ){
//     countSheet.sum = 0
//     countSheet.spend = 0
//     countSheet.balance = 0
//   } else {
//     this.book_item.forEach( item => {
//       if( item.type == 0 ){
//         curSpend =+ item.charge 
//       } else {
//         curSum =+ item.charge
//       }
//     })
//     coutSheet.sum = curSum
//     coutSheet.spend = curSpend
//     coutSheet.balance = curSum - curSpend
//   }
//   return countSheet
// }
index_book.count = function( type, charge ){
  if( type == 1 ){
    this.sum += Number(charge)
    this.balance += Number(charge)
  } else {
    this.spend += Number(charge)
    this.balance -= Number(charge)
  }
}

index_book.setIndexItem = function (allItem) {
  this.book_item = []
  if (allItem.length = 0) {
    this.book_item = []
  } else {
    for (let i = 0; i <= 3; i++) {
    console.log(allItem[i])      
      this.book_item.push(allItem[i])
    }
  }
}

export {
  index_book
}

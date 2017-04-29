var book_info = {
    id: '',
    title: '',
    intro: '',
    partyTime: '',
}

var book_item = [
    {
        title: ''
    }
]

export var set_book_info = function (value) {
    book_info.title = value;
}
export var get_book_info = function () {
    return book_info.title;
}
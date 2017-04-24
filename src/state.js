var book_info = {
    title: '',
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
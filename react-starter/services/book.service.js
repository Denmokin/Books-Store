import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { bookDB } from '../books.js'

const BOOKS_KEY = 'Books_DB'
_createBooks(10)

export const bookService = {
    query, // Request 
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                regExp = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books.filer(book => book.listPrice.amount < filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => book.find(book => book.id === bookId))
}


function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    }
    else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getDefaultFilter(filterBy = { txt: '', price: 0 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}



function _createBooks(amount) {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < amount; i++) {
            let book = bookDB.getRandBook()
            books.push(book)
        }
        utilService.saveToStorage(BOOKS_KEY, books)
    }


}
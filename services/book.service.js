import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { eventBus, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


const BOOKS_KEY = 'Books_DB'
utilService.loadFromStorage(BOOKS_KEY) || _createBooks(20)

export const bookService = {
    query, // Request 
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook,
}

function query(filterBy = {}) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }

            if (filterBy.diff) {
                books = books.filter(book => _pageFilterCount(filterBy.diff, book.pageCount))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
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
            .then(book => showSuccessMsg(`Book ${book.id} Added`))
    }
}

function getDefaultFilter(filterBy = { txt: '', price: 0, diff: '' }) {
    return { txt: filterBy.txt, price: filterBy.price, diff: filterBy.diff }
}


function _createBooks(amount) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const currency = ['EUR', 'USD', 'ILS']
    const books = []
    for (let i = 0; i < amount; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeBookTitle(),
            subtitle: utilService.makeLorem(5),
            author: utilService.makeAuthor(),
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(100),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `https://www.coding-academy.org/books-photos/${i + 1}.jpg`,
            language: "en",
            reviews: _createReviews(),
            listPrice: {
                amount: utilService.getRandomIntInclusive(30, 200),
                currencyCode: currency[utilService.getRandomIntInclusive(0, 2)],
                isOnSale: Math.random() > 0.7
            },

        }
        books.push(book)
    }
    utilService.saveToStorage(BOOKS_KEY, books)
}

function getEmptyBook() {
    const currency = ['EUR', 'USD', 'ILS']
    const book = {
        id: '',
        title: '',
        author: '',
        publishedDate: '',
        description: '',
        pageCount: '',
        categories: '',
        thumbnail: '',
        language: '',
        listPrice: {
            amount: '',
            currencyCode: currency[utilService.getRandomIntInclusive(0, 2)],
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}


function _pageFilterCount(type, pages) {
    switch (type) {
        case 'serious':
            if (pages >= 500) return true;
            break;
        case 'decent':
            if (pages > 100) return true;
            break;
        case 'light':
            if (pages <= 100) return true;
            break;
        default: ''
    }
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOKS_KEY).then((books) => {
        const bookIdx = books.findIndex(currBook => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}



function _createReviews() {
    const amount = utilService.getRandomIntInclusive(1, 5)
    const reviews = []
    for (let i = 0; i < amount; i++) {
        const review = {
            id: utilService.makeId(),
            name: utilService.makeAuthor(),
            comment: utilService.makeLorem(50),
            rating: utilService.getRandomIntInclusive(1, 10)
        }
        reviews.push(review)
    }
    return reviews
}
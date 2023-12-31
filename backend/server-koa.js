import fs from 'node:fs'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import Router from '@koa/router'
import { v4 as uuid } from 'uuid'

const getBooks = () => {
  try {
    return JSON.parse(fs.readFileSync('./data.json', 'utf-8')).books
  } catch (error) {
    return []
  }
}

const setBooks = (books) => {
  return fs.writeFileSync('./data.json', JSON.stringify({ books }))
}

const bookRepository = {
  books: getBooks(),
  find (search) {
    if (!search) {
      return bookRepository.books
    }
    return bookRepository.books.filter(b => b.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  },
  findById (id) {
    return bookRepository.books.find(b => b.id === id) // null
  },
  add (book) {
    const newBook = {
      ...book,
      id: uuid() // генерирует случайную строчку
    }
    this.books.push(newBook)
    setBooks(this.books)
    return newBook
  },
  delete (id) {
    this.books = this.books.filter(b => b.id !== id)
    setBooks(this.books)
  },
  update (book) {
    this.books = this.books.map(b => b.id === book.id ? book : b)
    setBooks(this.books)
  }
}

const router = new Router()
const app = new Koa()
app
  .use(koaBody({
    urlencoded: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Student'
})

router.get('/books', (ctx, next) => {
  ctx.body = bookRepository.find()
})

router.post('/books', async (ctx, next) => {
  console.log(ctx.request.body)
  // ctx.body = ctx.request.body;

  // const book = bookRepository.add()
  ctx.body = 'test';

  next()
})

// router.post('/books/:id', (ctx) => {
//
// })
//
// router.delete('/books/:id', (ctx) => {
//
// })

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`)
})

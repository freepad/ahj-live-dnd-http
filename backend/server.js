import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'node:fs'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

const app = express()

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
    return bookRepository.books.find(b => b.id === id)
  },
  add (book) {
    const newBook = {
      ...book,
      id: uuidv4()
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
  }
}

app.use(cors())
app.use(
  bodyParser.json({
    type (req) {
      return true
    }
  })
)
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  // if (!req.headers.authorization) {
  //   res.status(401)
  //   res.json({
  //     message: 'Unauthorized'
  //   })
  //   return
  // }

  next()
})

app.get('/books', async (req, res) => {
  res.send(JSON.stringify({ books: bookRepository.find(req.query.name) }))
})

app.post('/books', async (req, res) => {
  const book = bookRepository.add(req.body)
  res.send(JSON.stringify(book))
})


app.get('/books/:id', (req, res) => {
  const book = bookRepository.findById(req.params.id)
  res.send(JSON.stringify(book))
})

app.post('/books/:id', async (req, res) => {
  bookRepository.update({
    ...req.body,
    id: req.params.id
  })
  res.send(JSON.stringify({ books: bookRepository.find() }))
})

app.delete('/books/:id', async (req, res) => {
  bookRepository.delete(req.params.id)
  res.send(JSON.stringify({ status: 'ok' }))
})

app.get('/', (req, res) => {
    res.send('Hello world')
})

// eslint-disable-next-line no-undef
const port = process.env.PORT || 7071
app.listen(port, () => console.log(`The server is running on port ${port}.`))

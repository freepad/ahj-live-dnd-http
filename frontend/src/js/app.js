import { TicketService } from './service'

// await BookService.all()
//
// let newBook = {
//   name: 'Фундаментальный подход к программной архитектуре'
// }
// const book = await BookService.create(newBook)
// const sameBook = await BookService.get(book.id)
// if (book.name === sameBook.name && book.id === sameBook.id) {
//   console.log('Одна и та же книга')
// } else {
//   console.log('Что-то пошло не так')
// }
// const name = 'Чистая архитектура'
// await BookService.update({ name })
// await BookService.delete(book.id)
// await BookService.all()


await TicketService.all()

let newBook = {
  name: 'Фундаментальный подход к программной архитектуре'
}
const book = await TicketService.create(newBook)
const sameBook = await TicketService.get(book.id)
if (book.name === sameBook.name && book.id === sameBook.id) {
  console.log('Одна и та же книга')
} else {
  console.log('Что-то пошло не так')
}
const name = 'Чистая архитектура'
await TicketService.update({ id: book.id, name })
await TicketService.delete(book.id)
await TicketService.all()

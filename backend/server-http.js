import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ticketRepository from './TicketRepository.js'

const app = express()

app.use(cors())
app.use(
  bodyParser.json({
    type (req) {
      return true
    }
  })
)




app.get('/', (request, response) => {
  switch (request.query.method) {
    case 'allTickets':
      response.send(ticketRepository.find())
      break;
    case 'ticketById':
      response.send(ticketRepository.findOne(request.query.id))
      break;
    default:
      response.status(404)
  }
})

app.post('/', (request, response) => {
  switch (request.query.method) {
    case 'createTicket':
      response.send(ticketRepository.create(request.body))
      break;
    case 'updateTicket':
      response.send(ticketRepository.update(request.query.id, request.body))
      break;
    default:
      response.status(404)
  }
})

app.delete('/', (request, response) => {
  switch (request.query.method) {
    case 'deleteTicket':
      ticketRepository.delete(request.query.id)
      response.send({ status: 'ok' })
      break;
    default:
      response.status(404)
  }
})

const PORT = process.env.PORT || 7080
app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`)
})


/**
 * Вам потребуется написать CRUD функционал для работы с заявками при помощи сервера koa. Для хранения данных мы будем оперировать следующими структурами:
 *
 * Ticket {
 *     id // идентификатор (уникальный в пределах системы)
 *     name // краткое описание
 *     status // boolean - сделано или нет
 *     created // дата создания (timestamp)
 * }
 *
 * TicketFull {
 *     id // идентификатор (уникальный в пределах системы)
 *     name // краткое описание
 *     description // полное описание
 *     status // boolean - сделано или нет
 *     created // дата создания (timestamp)
 * }
 * Примеры запросов:
 */

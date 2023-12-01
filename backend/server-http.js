import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'node:fs'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(cors())
app.use(
  bodyParser.json({
    type (req) {
      return true
    }
  })
)

// const ticketRepository = {
//  getAll () {}
// }

let tickets = [];

const getAllTickets = () => {
  return tickets;
}

const getTicketById = (id) => {
  return tickets.find(ticket => ticket.id === id);
}

const createTicket = (newTicket) => {
  const ticket = {
    ...newTicket,
    id: uuidv4()
  }
  tickets.push(ticket)
  return ticket;
}

const updateTicket = (id, oldTicket) => {
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id)
  if (ticketIndex !== -1) {
    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      ...oldTicket,
      id
    }
  }
  return tickets[ticketIndex];
}

const deleteTicket = (id) => {
  tickets = tickets.filter(ticket => ticket.id !== id)
}

app.get('/', (request, response) => {
  switch (request.query.method) {
    case 'allTickets':
      response.send(getAllTickets())
      break;
    case 'ticketById':
      response.send(getTicketById(request.query.id))
      break;
    default:
      response.status(404)
  }
})

app.post('/', (request, response) => {
  switch (request.query.method) {
    case 'createTicket':
      response.send(createTicket(request.body))
      break;
    case 'updateTicket':
      response.send(updateTicket(request.query.id, request.body))
      break;
    default:
      response.status(404)
  }
})

app.delete('/', (request, response) => {
  switch (request.query.method) {
    case 'deleteTicket':
      deleteTicket(request.query.id)
      response.send({ status: 'ok' })
      break;
    default:
      response.status(404)
  }
})

const PORT = 7080
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

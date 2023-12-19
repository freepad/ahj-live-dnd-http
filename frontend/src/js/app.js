import { TicketService } from "./service";

const btnGetAllTicketEl = document.querySelector('[data-method="allTickets"]');

const fetchAllTickets = async () => {
  const tickets = await TicketService.all()
  console.log(tickets)
}

btnGetAllTicketEl.addEventListener('click', fetchAllTickets)


// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", () => {
//     // console.log(button.textContent);
//
//     if (button.textContent === "allTickets") {
//       TicketService.all().then((data) => {
//         console.log("Созданы элементы: ", data);
//       });
//     }
//
//     if (button.textContent === "createTicket") {
//       const currentTimeStamp = new Date().getTime();
//       // console.log(currentTimeStamp)
//       let newTicket = {
//         name: "Фундаментальный подход к программной архитектуре",
//         description: "Описание",
//         status: false,
//         created: currentTimeStamp,
//       };
//       TicketService.create(newTicket).then((data) => {
//         console.log("Создан элемент: ", data);
//       });
//     }
//   });
// });

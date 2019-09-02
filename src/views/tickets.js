import elements from "../config/ui";
import airlinesStore from "../store/airlines.store";

class TicketsUI {
  constructor(el) {
    this.container = el.ticketsContainer;
  }

  renderTickets(tickets) {
    this.container.innerHTML = "";

    let fragment = "";
    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  // 4. Создать модуль для вывода полученных билетов. Выводить нужно логотип
  // авиакомпании, ее название, дату и время вылета (должны быть в формате
  // 'mm.dd.yyyy hh:mm'), количество пересадок (если пересадок ноль тогда
  // выводить текст "Прямой рейс" если есть пересадки то выводить их количество),
  // номер борта (это свойство flight_number), цену с приставкой $ ну и конечно
  // город отправления и город прибытия.
  static ticketTemplate(ticket) {
    return `
    <div class="air-ticket uk-card uk-card-default uk-card-body uk-width-1-2@m">
      <div class="air-logo" style="background-image: url(${
        airlinesStore.getCompany(ticket.airline).logo
      });"></div>
      <div class="air-body">
        <h3 class="uk-card-title">${
          airlinesStore.getCompany(ticket.airline).name
        }</h3>
        <p><strong>${ticket.origin} - ${ticket.destination}</strong>, ${
      ticket.transfers !== 0
        ? `transfers: ${ticket.transfers}`
        : `direct flight`
    }</p>
        <h2 style="margin:8px 0px"><strong>$${ticket.price}</strong></h2>
        <p>Date: ${ticket.departure_at}, Flight number: ${
      ticket.flight_number
    }</p>
        <button class="uk-button uk-button-default add-favorites" data-id="${
          ticket.id
        }">Add to favorites</button>
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(elements);

export default ticketsUI;

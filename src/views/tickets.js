import elements from "../config/ui";

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

  static ticketTemplate(ticket) {
    return `
    <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
      <h3 class="uk-card-title">Default</h3>
      <p>${ticket.departure_at}, ${ticket.airline}</p>
      <button class="uk-button uk-button-default add-favorites" data-id="${ticket.id}">Add to favorites</button>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(elements);

export default ticketsUI;

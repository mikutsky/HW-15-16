import "./style.css";
import "./plugins";
import UIkit from "uikit";
import locationsStore from "./store/locations.store";
import airlinesStore from "./store/airlines.store";
import favoritesStore from "./store/favorites.store";
import formUi from "./views/form";
import ticketsUI from "./views/tickets";
import favoritesUI from "./views/favorites";
import elements from "./config/ui";
import { formateDateFromString } from "./helpers/date";
const {
  form,
  countryDestination,
  countryOrigin,
  startDate,
  endDate,
  cityOrigin,
  cityDestination,
  ticketsContainer,
  favoritesList
} = elements;

document.addEventListener("DOMContentLoaded", () => {
  initApp();

  // Events
  countryOrigin.addEventListener("change", e => {
    onCountryChange("cityOrigin", countryOrigin.value);
  });

  countryDestination.addEventListener("change", e => {
    onCountryChange("cityDestination", countryDestination.value);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    searchTickets();
  });

  ticketsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("add-favorites")) {
      const id = e.target.dataset.id;
      onAddToFavorites(id);
      // ДЗ-16
      // 5. При добавлении билета выводить уведомление что билет добавлен
      // успешно
      UIkit.notification(
        `
        <span uk-icon='icon: check'></span>
        Билет добавлен успешно!`,
        {
          status: "success",
          timeout: 1000
        }
      );
    }
  });
  // ДЗ-16
  // 1. Реализовать удаление билета из избранного
  favoritesList.addEventListener("click", e => {
    if (e.target.classList.contains("delete-favorite")) {
      const id = e.target.dataset.id;
      onRemoveFromFavorites(id);
      // ДЗ-16
      // 4. После удаления выводить уведомление что билет удален успешно
      UIkit.notification(
        `
      <span uk-icon='icon: close'></span>
      Билет удален успешно!`,
        {
          status: "danger",
          timeout: 1000
        }
      );
    }
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    await airlinesStore.init();

    formUi.renderCountries(locationsStore.countries);
  }

  function onCountryChange(type, value) {
    const cities = locationsStore.getCitiesByCountryCode(value);
    formUi.renderCities(type, cities);
  }

  async function searchTickets() {
    const depart_date = formateDateFromString(startDate.value, "yyyy-MM");
    const return_date = formateDateFromString(endDate.value, "yyyy-MM");
    const origin = cityOrigin.value;
    const destination = cityDestination.value;

    await locationsStore.fetchTickets(
      {
        origin,
        destination,
        depart_date,
        return_date
      },
      //Коллбэк функция, модифицирует записи билетов, приводя к нужному виду
      ticket => {
        ticket.airlineLogo = airlinesStore.getCompany(ticket.airline).logo;
        ticket.airlineName = airlinesStore.getCompany(ticket.airline).name;

        ticket.transfers =
          ticket.transfers !== 0
            ? `transfers: ${ticket.transfers}`
            : `прямой рейс`;

        ticket.price = "$" + ticket.price;
        ticket.departure_at = formateDateFromString(
          ticket.departure_at,
          "MM.dd.yyyy hh:mm"
        );
      }
    );
    ticketsUI.renderTickets(locationsStore.lastSearch);
  }

  function onAddToFavorites(id) {
    const ticket = locationsStore.getTicketById(id);
    favoritesStore.addNewFavorit(ticket);
    favoritesUI.renderFavorites(favoritesStore.favorites);
  }
  // ДЗ-16
  // 1. Реализовать удаление билета из избранного, обработчик события
  function onRemoveFromFavorites(id) {
    const ticket = locationsStore.getTicketById(id);
    favoritesStore.removeFavorit(ticket);
    favoritesUI.renderFavorites(favoritesStore.favorites);
  }
});

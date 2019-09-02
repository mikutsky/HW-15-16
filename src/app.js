import "./style.css";
import "./plugins";
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
  ticketsContainer
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
    }
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    await airlinesStore.init();

    formUi.renderCountries(locationsStore.countries);

    // Заполняем DatePick-ры
    const dateNow = new Date();
    startDate.value = formateDateFromString(dateNow, "yyyy-MM-dd");
    endDate.value = formateDateFromString(
      new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() + 7
      ),
      "yyyy-MM-dd"
    );

    // !!!!!!!!!!!!!!!!!!!!!!!!TODO
    countryOrigin.value = "UA";
    countryOrigin.dispatchEvent(new Event("change"));
    countryDestination.value = "AT";
    countryDestination.dispatchEvent(new Event("change"));
    cityOrigin.value = "IEV";
    cityDestination.value = "VIE";
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

    await locationsStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date
    });
    ticketsUI.renderTickets(locationsStore.lastSearch);
  }

  function onAddToFavorites(id) {
    const ticket = locationsStore.getTicketById(id);
    favoritesStore.addNewFavorit(ticket);
    favoritesUI.renderFavorites(favoritesStore.favorites);
  }
});

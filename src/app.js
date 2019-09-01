import './style.css';
import './plugins';
import locationsStore from './store/locations.store';
import favoritesStore from './store/favorites.store';
import formUi from './views/form';
import ticketsUI from './views/tickets';
import favoritesUI from './views/favorites';
import elements from './config/ui';
import { formateDateFromString } from './helpers/date';
const {
  form,
  countryDestination,
  countryOrigin,
  startDate,
  endDate,
  cityOrigin,
  cityDestination,
  ticketsContainer,
} = elements;

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  // Events
  countryOrigin.addEventListener('change', e => {
    onCountryChange('cityOrigin', countryOrigin.value);
  });

  countryDestination.addEventListener('change', e => {
    onCountryChange('cityDestination', countryDestination.value);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    searchTickets();
  });

  ticketsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('add-favorites')) {
      const id = e.target.dataset.id;
      onAddToFavorites(id);
    }
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    formUi.renderCountries(locationsStore.countries);
  }

  function onCountryChange(type, value) {
    const cities = locationsStore.getCitiesByCountryCode(value);
    formUi.renderCities(type, cities);
  }

  async function searchTickets() {
    const depart_date = formateDateFromString(startDate.value, 'yyyy-MM');
    const return_date = formateDateFromString(endDate.value, 'yyyy-MM');
    const origin = cityOrigin.value;
    const destination = cityDestination.value;

    await locationsStore.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
    });

    console.log(locationsStore.lastSearch);
    ticketsUI.renderTickets(locationsStore.lastSearch);
  }

  function onAddToFavorites(id) {
    const ticket = locationsStore.getTicketById(id);
    favoritesStore.addNewFavorit(ticket);
    favoritesUI.renderFavorites(favoritesStore.favorites);
  }
});

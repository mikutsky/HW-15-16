import aviaSalesService from '../services/aviasales.services';
import { generateId } from '../helpers/uuid';

class LocationsStore {
  constructor(api, generateId) {
    this.api = api;
    this.countries = {};
    this.cities = {};
    this._lastSearch = {};
    this.generateId = generateId;
  }

  get lastSearch() {
    return Object.values(this._lastSearch);
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);

    const [countries, cities] = response;
    this.countries = countries;
    this.cities = cities;
    return response;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this._lastSearch = this.updateData(response.data);
    console.log(this._lastSearch);
  }

  updateData(data) {
    return Object.entries(data).reduce((acc, [, value]) => {
      value.id = this.generateId();
      acc[value.id] = value;
      return acc;
    }, {});
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }

  // метод для получения названия города

  getTicketById(id) {
    return this._lastSearch[id];
  }
}

const locationsStore = new LocationsStore(aviaSalesService, generateId);

export default locationsStore;

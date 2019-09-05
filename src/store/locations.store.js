import aviaSalesService from "../services/aviasales.services";
import { generateId } from "../helpers/uuid";

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
      this.api.cities()
    ]);

    const [countries, cities] = response;
    this.countries = countries;
    this.cities = cities;
    return response;
  }

  async fetchTickets(params, cb) {
    const response = await this.api.prices(params);
    this._lastSearch = this.updateData(response.data, cb);
  }

  updateData(data, cb) {
    return Object.entries(data).reduce((acc, [, value]) => {
      value.id = this.generateId();

      acc[value.id] = value;
      acc[value.id].origin = this.getCityNameByCityCode(value.origin);
      acc[value.id].destination = this.getCityNameByCityCode(value.destination);

      // Коллбэк функция для модификации записи о билете, передается из app.js
      cb(acc[value.id]);

      return acc;
    }, {});
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }

  // метод для получения названия города
  getCityNameByCityCode(code) {
    return this.cities.find(city => city.code === code).name;
  }

  getTicketById(id) {
    return this._lastSearch[id];
  }
}

const locationsStore = new LocationsStore(aviaSalesService, generateId);

export default locationsStore;

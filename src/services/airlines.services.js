// Задание(ДЗ) №15:
// 1. Создать отдельный сервис с методом для получения airlines. Этот запрос
// вернет информацию об авиакомпаних.
// Адрес запроса: 'https://aviasales-api.herokuapp.com/airlines'

import axios from "axios";
import config from "../config/api";

class AirlinesServices {
  constructor(config, http) {
    this.url = config.url;
    this.http = http;
  }
  async airlines() {
    try {
      const response = await this.http.get(`${this.url}/airlines`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const airlinesServices = new AirlinesServices(config, axios);

export default airlinesServices;

// Задание(ДЗ) №15:
// 2. Создать store через который будет вызываться запрос на получение airlines.
// В store мы сохраняем список авиакомпаний. Также должен быть метод получение
// имени авиа компании для вывода в разметке.

import aviaSalesService from "../services/airlines.services";

class AirlinesStore {
  constructor(api) {
    this.api = api;
    this._airlines = {};
  }

  async init() {
    const response = await this.api.airlines();
    this._airlines = this.updateData(response);
    return response;
  }

  updateData(response) {
    return response.reduce((acc, item) => {
      acc[item.code] = {
        code: item.code,
        // 3. Логотипы авиа компании можно получить
        // по адрему http://pics.avs.io/200/200/AIRLINES_CODE.png
        logo: `http://pics.avs.io/200/200/${item.code}.png`,
        name: !item.name ? item.name_translations.en : item.name
      };
      return acc;
    }, {});
  }

  getCompany(code) {
    const company = this._airlines[code];
    return company;
  }
}

const airlinesStore = new AirlinesStore(aviaSalesService);

export default airlinesStore;

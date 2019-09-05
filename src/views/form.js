import elements from "../config/ui";

class FormUi {
  constructor(el) {
    this.form = el.form;
    this.countryOrigin = el.countryOrigin;
    this.countryDestination = el.countryDestination;
    this.cityOrigin = el.cityOrigin;
    this.cityDestination = el.cityDestination;
    // Получаем dataPick-ры
    this.startDate = el.startDate;
    this.endDate = el.endDate;
  }

  renderCountries(countries) {
    const fragment = FormUi.generateSelectFragment(countries);
    const clone = fragment.cloneNode(true);

    this.countryOrigin.appendChild(fragment);
    this.countryDestination.appendChild(clone);
    // Делаем поля не активным, когда загружен список стран
    this.countryOrigin.disabled = false;
    this.countryDestination.disabled = false;
  }

  renderCities(selectName, cities) {
    this[selectName].innerHTML = "";
    // Делаем dataPick-ры и submit активным
    if (
      this.countryOrigin.value !== "select" &&
      this.countryDestination.value !== "select"
    ) {
      formUi.startDate.disabled = false;
      formUi.endDate.disabled = false;
      formUi.form.querySelector("[type='submit']").disabled = false;
    } else {
      formUi.startDate.disabled = true;
      formUi.endDate.disabled = true;
      formUi.form.querySelector("[type='submit']").disabled = true;
    }
    // Делаем поля не активным, если городов в списке нет
    if (!cities.length) {
      this[selectName].disabled = true;
      return;
    }
    const fragment = FormUi.generateSelectFragment(cities);
    this[selectName].appendChild(fragment);
    this[selectName].disabled = false;
    this[selectName].focus();
  }

  static generateSelectFragment(arr) {
    const fragment = document.createDocumentFragment();
    arr.forEach(({ name, code }) => {
      const option = FormUi.optionTemplate(name, code);
      fragment.appendChild(option);
    });

    return fragment;
  }

  static optionTemplate(label, value) {
    return new Option(label, value);
  }
}

const formUi = new FormUi(elements);

export default formUi;

import elements from "../config/ui";
// импортировать loactions store
class FavoritesUI {
  constructor(el) {
    this.favoritesList = el.favoritesList;
  }

  renderFavorites(list) {
    this.favoritesList.innerHTML = "";

    let fragment = "";
    list.forEach(item => {
      const template = FavoritesUI.listTemplate(item);
      fragment += template;
    });

    this.favoritesList.insertAdjacentHTML("afterbegin", fragment);

    // 3. Вывод количества избранных билетов в кнопку по которой вызывается
    // дропдаун
    this.favoritesList.closest(
      ".uk-dropdown"
    ).previousElementSibling.innerHTML = `Favorites: 
      <strong>${this.favoritesList.childElementCount}</strong>`;
  }

  // 2. В избранных билетах выводить название от куда куда летим, логотип
  // авиакомпании и время
  static listTemplate(item) {
    return `
      <li data-id="${item.id}">
        <div class="favorit-item">
          <div
            class="favorit-item-logo"
            style="background-image: url(${item.airlineLogo});"
          ></div>
          <div class="favorit-item-body">
            <button class="delete-favorite" data-id="${item.id}" type="button">
              Delete
            </button>
            <p><strong>${item.origin} - ${item.destination}</strong></p>
            <p><strong>${item.price}</strong></p>
            <p>
            ${item.departure_at}
            </p>
          </div>
        </div>
      </li>
    `;
  }
}

const favoritesUI = new FavoritesUI(elements);

export default favoritesUI;

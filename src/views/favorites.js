import elements from '../config/ui';
// импортировать loactions store
class FavoritesUI {
  constructor(el) {
    this.favoritesList = el.favoritesList;
  }

  renderFavorites(list) {
    this.favoritesList.innerHTML = '';

    let fragment = '';
    list.forEach(item => {
      const template = FavoritesUI.listTemplate(item);
      fragment += template;
    });

    this.favoritesList.insertAdjacentHTML('afterbegin', fragment);
    // поменять кол-во в разметке 
  }

  static listTemplate(item) {
    return `
      <li data-id="${item.id}">${item.departure_at}, ${item.airline}</li>
    `;
    // delete btn
    // airline logo
  }
}

const favoritesUI = new FavoritesUI(elements);

export default favoritesUI;

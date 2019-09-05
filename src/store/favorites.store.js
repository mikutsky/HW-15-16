class FavoritesStore {
  constructor() {
    this._favorites = {};
  }

  get favorites() {
    return Object.values(this._favorites);
  }

  addNewFavorit(item) {
    this._favorites[item.id] = item;
  }

  removeFavorit(item) {
    delete this._favorites[item.id];
  }
}

const favoritesStore = new FavoritesStore();

export default favoritesStore;

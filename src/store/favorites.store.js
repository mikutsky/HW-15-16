class FavoritesStore {
  constructor() {
    this._favorites = {};
  }

  get favorites() {
    return Object.values(this._favorites);
  }

  addNewFavorit(item) {
    this._favorites[item.id] = item;
    console.log(this._favorites);
  }

  // delete this._favorites[id];
}

const favoritesStore = new FavoritesStore();

export default favoritesStore;

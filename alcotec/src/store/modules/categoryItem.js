/* eslint-disable no-param-reassign */
import { baseDomain } from '../../constans';

const categoryItem = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    categoryItemCompare: {
      products: [],
    },
    categoryItem: {
      subCategory: [],
    },
    infinityPage: 2,
    numberProducts: {
      totalNumberOfFilteredItems: 0,
      totalQuantityOfGoods: 0,
    },
    search: {
      categories: [],
      products: [],
    },
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_CATEGORY_ITEM(state, { data, page }) {
      if (page === 1) {
        state.categoryItem.subCategory = data.products;
      } else {
        state.categoryItem.subCategory.push(...data.products);
      }

      state.numberProducts.totalNumberOfFilteredItems = data.totalNumberOfFilteredItems;
      state.numberProducts.totalQuantityOfGoods = data.totalQuantityOfGoods;
    },
    SET_CATEGORY_ITEM_COMPARE(state, data) {
      state.categoryItemCompare.products = data;
    },
    ADD_CATEGORY_ITEM_COMPARE(state, data) {
      state.categoryItemCompare.products.push(data);
    },
    DELETE_MODEL_COMPARE(state, id) {
      const filtered = state.categoryItemCompare.products.filter((product) => product.totalInfo.id !== +id);

      state.categoryItemCompare.products = filtered;

      const product = state.categoryItem.subCategory.find((good) => good.id === +id);

      if (product) product.compare = false;
    },
    DELETE_ALL_MODEL_COMPARE(state) {
      state.categoryItemCompare.products = [];
    },
    SET_SEARCH_RESULT(state, data) {
      state.search.categories = data.categories;
      state.search.products = data.products;
    },
    CLEAR_SEARCH_RESULT(state) {
      state.search.categories = [];
      state.search.products = [];
    },
  },
  actions: {
    async getCategoryItem({ commit }, {
      cb, categoryId, page = 1, filter = {}, PER_PAGE = 15, sorting = { sortBy: 'rating', isDesc: true }, error,
    }) {
      fetch(`${baseDomain}/products/${categoryId}`, {
        method: 'POST',
        body: JSON.stringify({
          sorting,
          page,
          perpage: PER_PAGE,
          filter,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.products) {
            error();
          } else {
            const subCategory = response.products.map((e) => {
              e.addedToBasket = 0;

              return e;
            });

            response.subCategory = subCategory;

            cb(response);
            commit('SET_CATEGORY_ITEM', { data: response, page });
          }
        })
        .catch((err) => console.error(err));
    },
    async getProduct({ commit }, { id, cb }) {
      fetch(`${baseDomain}/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.totalInfo) {
            response.totalInfo.compare = false;
            commit('ADD_CATEGORY_ITEM_COMPARE', response);
            cb(response);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
    async getSearchProductsAndCategories({ commit }, { searchValue, cb }) {
      fetch(`${baseDomain}/search?searchValue=${searchValue}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.categories) {
            commit('SET_SEARCH_RESULT', response);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default categoryItem;

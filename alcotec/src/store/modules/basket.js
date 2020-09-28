import axios from 'axios';
import path from 'ramda/src/path';
import { baseDomain } from '../../constans';

const basket = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    basket: [],
    commentProject: '',
    totalPrice: 0,
    recommendedProducts: {},
    numberProject: null,
    popups: {
      isLoading: false,
      text: '',
      statusPopup: false,
      statusSnackbar: false,
    },
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_BASKET(state, data, cb) {
      state.basket = data;
      if (!data.length) {
        state.numberProject = null;
      }
      if (cb) {
        cb();
      }
    },
    SET_POPUP(state, data) {
      if (data.success) {
        state.popups.statusSnackbar = true;
      } else {
        state.popups.statusPopup = true;
      }
      state.popups.text = data.text;
    },
    SET_POPUP_IS_LOADING(state) {
      state.popups.isLoading = !state.popups.isLoading;
    },
    SET_POPUP_IS_LOADING_FALSE(state) {
      state.popups.isLoading = false;
    },
    CLOSE_POPUP(state) {
      state.popups.statusPopup = false;
    },
    CLOSE_SNACKBAR(state) {
      state.popups.statusSnackbar = false;
    },
    SET_TOTAL_PRICE(state) {
      state.totalPrice = 0;
    },
    UPDATE_BASKET(state, item) {
      item.totalInfo.recommendedProductsStatus = false;
      state.basket.push(item);
    },
    APPEND_TOTAL_PRICE(state, sum) {
      state.totalPrice += sum;
    },
    DIFF_FROM_TOTAL_PRICE(state, diff) {
      if (state.totalPrice) {
        state.totalPrice -= diff;
      }
    },
    DELETE_BASKET_ITEM(state, product) {
      product.sale ?
        (state.totalPrice -= product.addedToBasket * product.sale) :
        (state.totalPrice -= product.addedToBasket * product.priceUAH);

      product.addedToBasket = 0;

      state.basket.forEach((item, index, totalBasket) => {
        const productBasket = JSON.parse(localStorage.productBasket || '[]');

        productBasket.forEach((e, i, totalProductBasket) => {
          if (product.id === e.id) {
            totalProductBasket.splice(i, 1);
          }
        });

        try {
          localStorage.productBasket = JSON.stringify(productBasket);
        } catch (e) {
          alert('Очистите LocalStorage.');
        }

        if (item.totalInfo.id === product.id) {
          totalBasket.splice(index, 1);
        }
      });
    },
    SET_PRODUCT_ITEM(state, data) {
      state.recommendedProducts = data;
    },
    SET_BASKET_PROJECT(state, project) {
      state.basket = [];
      const products = [];

      project.products.forEach((e) => {
        products.push({ id: e.id, addedToBasket: e.amount });
      });

      try {
        localStorage.productBasket = JSON.stringify(products);
        localStorage.projectId = JSON.stringify(project.id);
        localStorage.projectComment = JSON.stringify(project.comment);
      } catch (e) {
        alert('Очистите LocalStorage.');
      }

      state.numberProject = project.id;
    },
    SET_COMMENT_PROJECT(state, data) {
      state.commentProject = data;
    },
    SET_PROJECT_NUMBER(state, data) {
      state.numberProject = data;
    },
  },
  actions: {
    async getProduct({ commit }, { id, cb, count }) {
      fetch(`${baseDomain}/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.totalInfo) {
            if (count) {
              response.totalInfo.addedToBasket = count;
              commit('UPDATE_BASKET', response);
            } else {
              response.totalInfo.addedToBasket = 0;
              response.totalInfo.compare = false;
            }
            cb(response);
          }
        })
        .catch((err) => console.error(err));
    },
    async getRecommendetionProject({ commit, dispatch }, { addedProduct }) {
      const url = encodeURI('products_ids[]=' + addedProduct.join('&products_ids[]='));
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/recommend-project?${url}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'basket/getRecommendetionProject', addedProduct }, { root: true });
          } else if (response.success) {
            commit('SET_PRODUCT_ITEM', response.data);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default basket;

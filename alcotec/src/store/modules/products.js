/* eslint-disable no-param-reassign */
import { baseDomain } from '../../constans';

const products = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    product: {
      totalInfo: {
        title: '',
      },
    },
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
    productName(state) {
      return state.product.totalInfo.title;
    },
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_PRODUCT(state, data) {
      state.product = data;
    },
  },
  actions: {
    async getProduct({ commit }, { id, cb, error }) {
      fetch(`${baseDomain}/product/${id}`)
        .then((response) => response.json())
        .then((response) => {
          commit('SET_PRODUCT', response);
          if (response.totalInfo) {
            response.totalInfo.compare = false;
            response.totalInfo.addedToBasket = 0;
            cb();
          } else {
            error();
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default products;

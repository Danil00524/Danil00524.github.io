import axios from 'axios';
import { baseDomain } from '../../constans';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

const users = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    userData: {
      id: 0,
      isLoggedIn: false,
      userName: '',
    },
    checkout: {
      items: [],
      sumPrice: 0,
    },
    guestPopupStatus: false,
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
    isLoggedIn: (state) => {
      return state.userData.isLoggedIn;
    },
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_LOGIN_USER(state, data) {
      if (data && data.user && data.user.id) {
        state.userData.id = data.user.id;
        state.userData.userName = data.user.name;
        state.userData.isLoggedIn = true;
      }
    },
    SET_LOGOUT_USER(state) {
      state.userData.id = 0;
      state.userData.userName = '';
      state.userData.isLoggedIn = false;
    },
    CHANGE_GUEST_POPUP(state) {
      state.guestPopupStatus = !state.guestPopupStatus;
    },
  },
  actions: {
    async regUser({ commit }, data) {
      axios.post('/signup', { name: data.userData.name, phone: data.userData.phone, email: data.userData.email })
        .then((response) => {
          data.cb(response.data);
        })
        .catch((err) => console.error(err));
    },

    async loginUser({ commit }, { data, cb }) {
      fetch(`${baseDomain}/login`, {
        method: 'POST',
        body: JSON.stringify({ login: data.email, password: data.password })
      })
        .then((response) => response.json())
        .then((response) => {
          cb(response);
        })
        .catch((err) => console.error(err));
    },

    async recoveryPassword({ commit }, { email, cb }) {
      fetch(`${baseDomain}/recovery-password`, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
      })
        .then((response) => response.json())
        .then((response) => {
          cb(response);
        })
        .catch((e) => console.error(e))
    },

    async logoutUser({ commit, dispatch }, { cb }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetchPolyfill(`${baseDomain}/logout`, {
        method: 'POST',
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'users/logoutUser', cb }, { root: true });
          } else if (response.success) {
            commit('SET_LOGOUT_USER');
            cb();
          } else {
            throw response;
          }
        })
        .catch((e) => console.error(e));
    },

    async review({ commit }, { data, cb }) {
      const token = localStorage.alcotecUserInfo &&
        JSON.parse(localStorage.alcotecUserInfo).user &&
        JSON.parse(localStorage.alcotecUserInfo).user.token || '';
      fetch(`${baseDomain}/review`, {
        method: 'POST',
        headers: {
          'auth-token': token,
        },
        body: JSON.stringify({ type: data.type, text: data.text, url: data.url })
      })
        .then((response) => response.json())
        .then((response) => {
          cb(response);
        })
        .catch((err) => console.error(err));
    },

    async fastBuy({ commit }, { data, cb }) {
      fetch(`${baseDomain}/fast-buy`, {
        method: 'POST',
        body: JSON.stringify({ product: data.product, phone: data.phone, url: data.url }),
      })
        .then((response) => response.json())
        .then((response) => {
          cb(response);
        })
        .catch((err) => console.error(err));
    },
    async guestBuy({ commit }, { data, cb }) {
      fetch(`${baseDomain}/guest-basket`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          comment: data.text,
          products: data.products,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          cb(response);
        })
        .catch((err) => console.error(err));
    },
  },
};

export default users;

import { baseDomain } from '../../constans';

const promos = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    promos: [],
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные

  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_PROMO(state, data) {
      state.promos = data;
    },
  },
  actions: {
    async getPromo({ commit, dispatch, state }, cb) {
      const token = localStorage.alcotecUserInfo &&
        JSON.parse(localStorage.alcotecUserInfo).user &&
        JSON.parse(localStorage.alcotecUserInfo).user.token || '';

      fetch(`${baseDomain}/slides?per_page=8`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'promos/getPromo' }, { root: true });
          } else if (response.slides && !state.promos.length) {
            commit('SET_PROMO', response.slides);
            cb();
          } else {
            cb();
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default promos;

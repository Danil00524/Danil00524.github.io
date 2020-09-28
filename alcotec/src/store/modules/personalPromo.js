import { baseDomain } from '../../constans';

const personalPromo = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    personalPromo: [],
    countPage: null,
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_PERSONALPROMO(state, data) {
      data.personalPromo.forEach((e) => {
        e.additionalInfo.open = false;
      });

      state.personalPromo = data.personalPromo;
      state.countPage = data.countPage;
    },
  },
  actions: {
    async getPersonalPromo({ commit, dispatch }, { page = 1, PER_PAGE = 8, cb }) {
      const token = localStorage.alcotecUserInfo &&
        JSON.parse(localStorage.alcotecUserInfo).user &&
        JSON.parse(localStorage.alcotecUserInfo).user.token || '';

      fetch(`${baseDomain}/actions/page/${page}/per-page/${PER_PAGE}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'personalPromo/getPersonalPromo', page, PER_PAGE, cb }, { root: true });
          } else if (response.personalPromo) {
            commit('SET_PERSONALPROMO', response);
            cb(response);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default personalPromo;

import { baseDomain } from '../../constans';

const profiles = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    profileConfigure: {
      statusSidebar: false,
      sideBarFiltersProductItem: [],
      categoryProjects: [],
      rigthSidebarStatus: false,
    },
    profileInfo: {
      id: null,
      partner: null,
      fullName: null,
      phone: null,
      email: null,
      address: null,
      minMarga: null,
      manager: null,

    },
    profileError: {
      id: null,
      partner: null,
      fullName: null,
      phone: null,
      email: null,
      address: null,
      minMarga: null,
      manager: null,
      oldPassword: null,
      newPassword: null,
      newPasswordAgain: null,
    },
    activeCheckboxFilter: [],
    activeParseFilter: null,
    successRegPopup: false,
    editPage: {
      statusPopupSuccess: false,
    },
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
    categoryName: (state) => (id) => {
      const categories = state.profileConfigure.categoryProjects.reduce((prev, category) => {
        if (category.items) {
          return [...prev, ...category.items];
        } else {
          return [...prev];
        }
      }, []);
      const category = categories.find((item) => item.id === +id);

      return category;
    },
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    CHANGE_DIALOG(state) {
      state.successRegPopup = !state.successRegPopup;
    },
    CHANGE_SIDEBAR(state) {
      state.profileConfigure.rigthSidebarStatus = !state.profileConfigure.rigthSidebarStatus;
    },
    CHANGE_SIDEBAR_FILTER(state) {
      state.profileConfigure.statusSidebar = !state.profileConfigure.statusSidebar;
    },
    CLOSE_SIDEBAR_FILTER(state) {
      state.profileConfigure.statusSidebar = false;
    },
    SET_SIDEBAR_FILTERS(state, data) {
      const sidebarWithCheck = data.map((elem) => {
        elem.status = true;
        for (const key in elem.checkboxes) {
          elem.checkboxes[key].check = false;
        }
        if (elem.range) {
          elem.range.default[0] = elem.range.from;
          elem.range.default[1] = elem.range.to;
        }

        return elem;
      });

      // dataWithCheck - [{title: '', checkboxes: [{name: '', check: false}, {}, {}]}, {}, {}...]
      state.profileConfigure.sideBarFiltersProductItem = sidebarWithCheck;
    },
    UPDATE_SIDEBAR_FILTERS(state, data) {
      state.profileConfigure.sideBarFiltersProductItem.forEach((filter, indexFilter) => {
        filter.checkboxes && filter.checkboxes.forEach((checkboxes, indexCheckbox) => {
          if (data[indexFilter].checkboxes[indexCheckbox].availability !== undefined &&
            checkboxes.availability !== undefined &&
            checkboxes.availability !== data[indexFilter].checkboxes[indexCheckbox].availability) {
            checkboxes.availability = !checkboxes.availability;
          }
        });
      });
    },
    SET_CATEGORY_PROJECTS(state, data) {
      const categoryProjectsWithStatus = data.map((elem) => {
        elem.check = false;

        return elem;
      });

      state.profileConfigure.categoryProjects = categoryProjectsWithStatus;
    },
    SET_ACTIVE_CHECKBOX_FILTER(state, data) {
      state.activeCheckboxFilter = data;
    },
    SET_PROFILE_INFO(state, data) {
      state.profileInfo = data;
    },
    SET_PROFILE_ERROR(state, data) {
      state.profileError = data;
    },
    SET_CHANGED_PROFILE_SUCCESS(state) {
      state.editPage.statusPopupSuccess = true;
    },
    SET_CHANGED_PROFILE_CLOSE(state) {
      state.editPage.statusPopupSuccess = false;
    },
    SET_PARSE_FILTER(state, data) {
      state.activeParseFilter = data;
    },
  },
  actions: {
    async updateSidebarFilders({ commit, dispatch, state }, { cb, id, error }) {
      if (localStorage.alcotecUserInfo && JSON.parse(localStorage.alcotecUserInfo).user) {
        const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

        fetch(`${baseDomain}/filters/cat/${id}`, {
          headers: {
            'auth-token': token,
            'active-filters': JSON.stringify(state.activeParseFilter),
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success === false) {
              cb();
            } else {
              commit('UPDATE_SIDEBAR_FILTERS', response);
              cb();
            }
          })
          .catch((err) => console.error(err));
      } else {
        fetch(`${baseDomain}/filters/cat/${id}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.renew_jwt) {
              dispatch('refreshToken', { action: 'profiles/updateSidebarFilders', cb, id });
            } else {
              if (response.success === false) {
                cb();
              } else {
                commit('UPDATE_SIDEBAR_FILTERS', response);
                cb();
              }
            }
          })
          .catch((err) => console.error(err));
      }
    },
    async getSideBarFilters({ commit, dispatch }, { cb, id }) {
      if (localStorage.alcotecUserInfo && JSON.parse(localStorage.alcotecUserInfo).user) {
        const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

        fetch(`${baseDomain}/filters/cat/${id}`, {
          headers: {
            'auth-token': token,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success === false) {
              cb();
            } else {
              commit('SET_SIDEBAR_FILTERS', response);
              cb();
            }
          })
          .catch((err) => console.error(err));
      } else {
        fetch(`${baseDomain}/filters/cat/${id}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.renew_jwt) {
              dispatch('refreshToken', { action: 'profiles/getSideBarFilters', cb, id });
            } else {
              if (response.success === false) {
                cb();
              } else {
                commit('SET_SIDEBAR_FILTERS', response);
                cb();
              }
            }
          })
          .catch((err) => console.error(err));
      }
    },
    async getCategoryProjects({ commit, state }, cb) {
      if (!state.profileConfigure.categoryProjects.length) {
        fetch(`${baseDomain}/categories`)
          .then((response) => response.json())
          .then((response) => {
            if (response.length) {
              commit('SET_CATEGORY_PROJECTS', response);
              cb();
            } else {
              throw response;
            }
          })
          .catch((err) => console.error(err));
      } else {
        state.profileConfigure.categoryProjects.forEach((elem) => {
          elem.check = false;
        });

        cb();
      }
    },
    async getInfoProfile({ commit, dispatch }, { cb }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/profile`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.profile) {
            commit('SET_PROFILE_INFO', response.profile);
            cb();
          } else if (response.renew_jwt) {
            dispatch('refreshToken', { action: 'profiles/getInfoProfile', cb });
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
    async postChangedProfile({ dispatch }, { profile, token, cb }) {
      fetch(`${baseDomain}/profile`, {
        method: 'POST',
        headers: {
          'auth-token': token,
        },
        body: JSON.stringify({ profile }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('refreshToken', { action: 'profiles/postChangedProfile', profile, cb });
          } else {
            cb(response);
          }
        })
        .catch((e) => console.error(e));
    },
    async refreshToken({ dispatch, commit }, { action, ...rest }) {
      const { refresh } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/token-renew`, {
        method: 'POST',
        headers: {
          'auth-token': refresh,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const userInfo = JSON.parse(localStorage.alcotecUserInfo);

            userInfo.user.token = data.token;
            userInfo.user.refresh = data.refresh;
            localStorage.alcotecUserInfo = JSON.stringify(userInfo);

            dispatch(action, { token: data.token, ...rest }, { root: true });
          } else {
            commit('basket/SET_POPUP_IS_LOADING_FALSE', {}, { root: true });
            commit('users/SET_LOGOUT_USER', {}, { root: true });
            localStorage.alcotecUserInfo = JSON.stringify({});
          }
        })
        .catch((e) => console.error(e));
    },
  },
};

export default profiles;

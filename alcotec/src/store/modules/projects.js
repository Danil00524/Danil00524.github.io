/* eslint-disable no-param-reassign */
import axios from 'axios';
import { baseDomain } from '../../constans';

const projects = {
  namespaced: true,
  state: {
    margin: false,
    project: {},
    complectations: [],
    staticProject: {
      titlesTable(currency) {
        return {
          ru: ['№', 'Наименование', 'Программа', `Цена, ${currency}`, 'Количество', 'Скидка,%', `Сумма, ${currency}`, `Закупка, ${currency}`, 'Маржа,%', 'Комплектация', ''],
          ua: ['№', 'Найменування', 'Програма', `Ціна, ${currency}`, 'Кількість', 'Знижка,%', `Сума, ${currency}`, `Закупівля, ${currency}`, 'Маржа,%', 'Комплектація', ''],
        };
      },
      messageProjectOrderDate(date14, date) {
        return {
          ru: `Бесплатное хранение до ${date14} года (${date} + 14 дней)`,
          ua: `Безкоштовне зберігання до ${date14} року (${date} + 14 днів)`,
        };
      },
      descProjectOrderDate(currency) {
        return {
          ru: `Платное хранение за единицу 12 ${currency} в сутки`,
          ua: `Платне зберігання за одиницю 12 ${currency} на добу`,
        };
      },
    },
    delivery: [],
    orders: {
      orders: [],
      countPage: null,
    },
    projects: [],
    popups: {
      statusPopup: false,
      text: '',
    },
    countPage: 1,
  },
  mutations: {
    SET_PROJECT(state, data) {
      data.products.forEach((e) => {
        e.active = true;
      });
      state.project = data;
    },
    SET_PROJECTS(state, data) {
      data.projects.forEach((e) => {
        e.status.isShowed = false;
      });

      state.projects = data.projects;
      state.countPage = data.countPage;
    },
    SET_ORDERS(state, data) {
      state.orders.countPage = data.count_page;
      state.orders.orders = data.orders.map((order) => {
        order.isNotificationEnabled = false;
        order.exclamationMarkFill = '#000';
        const currentDate = new Date();
        const DAYS_14_IN_MS = 14 * 24 * 60 * 60 * 1000;
        const orderDate = new Date(order.date); // Если нет даты то будет "Invalid Date"

        if (currentDate.getTime() >= orderDate.getTime()) {
          // "Invalid Date".getTime() даст нам NaN -> любое сравнение с NaN даст false
          order.isNotificationEnabled = true;
          order.exclamationMarkFill = '#129227';
          if (currentDate.getTime() >= orderDate.getTime() + DAYS_14_IN_MS) {
            order.exclamationMarkFill = '#f00';
          }
        }

        return order;
      });
    },
    SET_COMPLECTATIONS(state, data) {
      state.complectations = data;
    },
    SET_DELIVERY(state, data) {
      state.delivery = data;
    },
    SET_MARGIN(state, flag) {
      state.margin = flag;
    },
    DELETE_PROJECT(state, id) {
      state.projects.forEach((project, index, projects) => {
        if (project.id === +id) {
          projects.splice(index, 1);
        }
      });
    },
    DELETE_PRODUCT(state, id) {
      state.project.products.forEach((product, index, products) => {
        if (product.id === +id) {
          products.splice(index, 1);
        }
      });
    },
    SET_POPUP(state, data) {
      if (data && data.text) {
        state.popups.text = data.text;
      }

      if (data && data.success) {
        state.popups.statusPopup = true;
      } else {
        state.popups.statusPopup = false;
      }
    },
  },
  actions: {
    async getComplectations({ commit, dispatch }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/complectations`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/getComplectations' }, { root: true });
          } else {
            commit('SET_COMPLECTATIONS', response.data);
          }
        })
        .catch((err) => console.error(err));
    },
    async getDelivery({ commit, dispatch }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/delivery`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/getDelivery' }, { root: true });
          } else {
            commit('SET_DELIVERY', response.data);
          }
        })
        .catch((err) => console.error(err));
    },
    async getProject({ commit, dispatch }, { id, cb }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/project/${id}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/getProject', id, cb }, { root: true });
          } else if (response.data) {
            commit('SET_PROJECT', response.data);
            cb(true);
          } else {
            cb(false);
          }
        })
        .catch((err) => console.error(err));
    },
    async getProjectsTable({ commit, dispatch }, { cb, page = 1, PER_PAGE = 6, sortData = false, searchValue = '', }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/projects?page=${page}&per_page=${PER_PAGE}&sort_date=${sortData}&search_value=${searchValue}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/getProjectsTable', cb, page, sortData, PER_PAGE, searchValue }, { root: true });
          } else {
            commit('SET_PROJECTS', response.data);
            cb();
          }
        })
        .catch((err) => console.error(err));
    },
    async getOrders({ commit, dispatch }, { page = 1, PER_PAGE = 7, sortDate = true }) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/orders?page=${page}&per_page=${PER_PAGE}&sort_date=${sortDate}`, {
        headers: {
          'auth-token': token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/getOrders', page, PER_PAGE, sortDate }, { root: true });
          } else {
            commit('SET_ORDERS', response.data);
          }
        })
        .catch((err) => console.error(err));
    },
    async sendingDataProject({ commit, dispatch }, { project, cb, token, url }) {
      fetch(`${baseDomain}/${url}`, {
        headers: {
          'auth-token': token,
        },
        method: 'POST',
        body: JSON.stringify(project),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/sendingDataProject', project, cb, url }, { root: true });
          } else {
            commit('SET_POPUP', response);
            cb(response);
          }
        })
        .catch((err) => console.error(err));
    },
    async deleteProject({ commit, dispatch }, id) {
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      fetch(`${baseDomain}/project`, {
        method: 'POST',
        headers: {
          'auth-token': token,
          'x-rest-method': 'DELETE',
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.renew_jwt) {
            dispatch('profiles/refreshToken', { action: 'projects/deleteProject', id }, { root: true });
          } else if (response.success) {
            commit('DELETE_PROJECT', id);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default projects;

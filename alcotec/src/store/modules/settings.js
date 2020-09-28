import { baseDomain } from '../../constans';

const settings = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    actualLang: {
      index: 'ru',
      text: 'РУС',
    },
    exchange: {
      usd: '',
      eur: '',
    },
    currency: {
      ua: 'грн',
      usd: '$',
      eur: '€',
    },
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные
    actualLang(state) {
      return state.actualLang.index;
    },
  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_EXCHANGE(state, data) {
      state.exchange = data;
    },
    SET_LANG(state, data) {
      state.actualLang = data;
    },
  },
  actions: {
    async getExchange({ commit }) {
      fetch(`${baseDomain}/exchange`)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            const exchange = {
              usd: '',
              eur: '',
            };

            exchange.usd = response.exchangeRate[1].saleRateNB;
            exchange.eur = response.exchangeRate[2].saleRateNB;
            commit('SET_EXCHANGE', exchange);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default settings;

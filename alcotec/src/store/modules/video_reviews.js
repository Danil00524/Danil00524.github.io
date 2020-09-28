import { baseDomain } from '../../constans';
import axios from 'axios';

const videoReviews = {
  namespaced: true,
  state: { // состояние приложения, данные, которые внутри приложения используются
    videoReviews: null,
  },
  getters: { // нужны для того чтобы вынимать какие то данные из общих данных приложения, из state, например если будет сложный объект с данными, чтобы не вытягивать каждый раз весь объект, мы можем здесь создать метод, который будет вытаскивать нам только нужные данные

  },
  mutations: { // нужны для того, чтобы описывать методы, которые будут изменять данные нашего приложения
    SET_VIDEOREVIEWS(state, data) {
      state.videoReviews = data;
    },
  },
  actions: {
    async getVideoReviews({ commit }, cb) {
      fetch(`${baseDomain}/video-reviews`)
        .then((response) => response.json())
        .then((response) => {
          if (response.length) {
            const videos = response.map((e) => {
              e.status1 = false;
              e.status2 = false;
              e.status3 = false;

              return e;
            });

            commit('SET_VIDEOREVIEWS', videos);
            cb(videos);
          } else {
            throw response;
          }
        })
        .catch((err) => console.error(err));
    },
  },
};

export default videoReviews;

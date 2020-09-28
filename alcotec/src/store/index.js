/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

import profiles from './modules/profiles';
import projects from './modules/projects';
import products from './modules/products';
import promos from './modules/promos';
import settings from './modules/settings';
import users from './modules/users';
import videoReviews from './modules/video_reviews';
import personalPromo from './modules/personalPromo';
import categoryItem from './modules/categoryItem';
import basket from './modules/basket';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    profiles, projects, promos, settings, users, videoReviews, products, categoryItem, basket, personalPromo,
  },
});

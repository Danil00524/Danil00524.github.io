<template>
  <div v-if="isLoggedIn" class="configurator__category">
    <router-link
      v-for="model in models"
      :key="model.id"
      :to="{
        path: `/profile/configurator/category/${model.categoryId}`,
        query: {
          brand: model.name,
        },
      }"
    >
      {{ model.name }}
      <span>{{ model.amount }}</span>
    </router-link>
  </div>
  <div v-else>
    <router-link
      v-for="model in models"
      :key="model.id"
      :to="{
        path: `/catalog/category/${model.categoryId}`,
        query: {
          brand: model.name,
        },
      }"
    >
      {{ model.name }}
      <span>{{ model.amount }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SimilarModels',
  props: {
    models: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.users.userData.isLoggedIn,
    }),
  },
};
</script>

<style lang="scss" scoped>
.configurator__category {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
  margin: 0 -10px;
}
a {
  margin: 0 10px;
  font-size: 18px;
  line-height: 25px;
  color: #1d1d1d;
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  & span {
    color: #9b9b9b;
    &:before {
      content: '(';
    }
    &:after {
      content: ')';
    }
  }
}

@media (max-width: 550px) {
  .configurator__category {
    justify-content: flex-start;
  }
}
</style>

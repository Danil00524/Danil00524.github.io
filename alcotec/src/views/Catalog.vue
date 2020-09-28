<template>
  <Configurator />
</template>

<script>
import Configurator from './Configurator.vue';
import { store } from '../store';

export default {
  name: 'Catalog',
  components: {
    Configurator,
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.categoryId) {
      store.dispatch('profiles/getSideBarFilters', {
        cb: () => {
          store.dispatch('profiles/getCategoryProjects', () => {
            next();
          });
        },
        id: to.params.categoryId,
      });
    } else {
      store.dispatch('profiles/getCategoryProjects', () => {
        next();
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <Configurator :current-route="currentRoute" />
</template>

<script>
import { store } from '../store';

import Configurator from './Configurator.vue';

export default {
  name: 'CategoryProductItem',
  components: {
    Configurator,
  },
  props: {},
  data() {
    return {
      currentRoute: this.$route.path.split('/').reverse()[1],
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('profiles/getSideBarFilters', {
      cb: () => {
        store.dispatch('profiles/getCategoryProjects', () => {
          next();
        });
      },
      id: to.params.categoryId,
    });
  },
};
</script>

<style lang="scss" scoped></style>

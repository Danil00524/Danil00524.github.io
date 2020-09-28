<template>
  <section class="configurator__position">
    <div class="card__container configurator__position-wrapper">
      <FilterSidebar v-if="filters.length" :status-product-item="statusProductItem" />
      <ConfigurationArea :status-product-item="statusProductItem" />
      <RigthSidebar />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store';

import FilterSidebar from '../components/FilterSidebar.vue';
import ConfigurationArea from '../components/ConfigurationArea.vue';
import RigthSidebar from '../components/Configurator/RigthSidebar.vue';

export default {
  name: 'Configurator',
  components: {
    FilterSidebar,
    ConfigurationArea,
    RigthSidebar,
  },
  props: {
    currentRoute: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      statusProductItem: false,
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.users.userData,
      activeCheckbox: (state) => state.profiles.activeCheckboxFilter,
      filters: (state) => state.profiles.profileConfigure.sideBarFiltersProductItem,
    }),
  },
  watch: {
    activeCheckbox: {
      handler() {
        if (this.categoryId) {
          this.$store.dispatch('profiles/updateSidebarFilders', {
            cb: () => {},
            id: this.categoryId,
            error: () => this.$router.push('/404-error'),
          });
        }
      },
    },
  },
  created() {
    if (this.currentRoute === 'category') {
      this.statusProductItem = true;
    } else {
      this.statusProductItem = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('profiles/getCategoryProjects', () => {
      next();
    });
  },
};
</script>

<style lang="scss" scoped>
.configurator__position-wrapper {
  display: flex;
}
.card__container {
  width: 100%;
}
@media (max-width: 340px) {
  .configurator__position-wrapper {
    display: block;
  }
}
</style>

<template>
  <div class="profile">
    <Tabs />
    <router-view />
    <ApproveDeleteCompare ref="ApproveDeleteCompare" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

import ApproveDeleteCompare from '../components/Popups/ApproveDeleteCompare.vue';
import Tabs from '../components/Tabs/Tabs.vue';

export default {
  name: 'Profile',
  components: {
    Tabs,
    ApproveDeleteCompare,
  },
  data() {
    return {
      radio: {
        name: 'all',
      },
      staticText,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.categoryItem.categoryItemCompare.products,
    }),
  },
  beforeRouteUpdate(to, from, next) {
    if (!this.products.length) {
      sessionStorage.categoryId = null;
    }

    if (
      !sessionStorage.categoryId ||
      (sessionStorage.categoryId === 'null' && to.params.categoryId)
    ) {
      sessionStorage.categoryId = to.params.categoryId;
    }

    if (
      this.products.length &&
      to.params.categoryId &&
      sessionStorage.categoryId !== to.params.categoryId
    ) {
      next(false);
      this.$refs.ApproveDeleteCompare.compareDeletePopup(to.path);
    } else {
      next();
    }
  },
};
</script>

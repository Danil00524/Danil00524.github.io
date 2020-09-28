<template>
  <v-app>
    <div
      id="app"
      class="app-custom"
      :class="{
        'of-hiden': sidebarStatus,
        disableFooter: disableFooterForCategory(),
      }"
    >
      <Header />
      <Breadcrumbs />
      <router-view />
      <Footer />
      <Overlay />
      <DefaultPopupOverlay />
      <DefaultSnackbar />
      <SuccessRecoveryPassword />
      <Review />
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import Header from './components/Header.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';
import Footer from './components/Footer.vue';
import DefaultPopupOverlay from './components/Popups/DefaultPopupOverlay.vue';
import Overlay from './components/Overlay.vue';
import DefaultSnackbar from './components/Popups/DefaultSnackbar.vue';
import SuccessRecoveryPassword from './components/Popups/SuccessRecoveryPassword.vue';
import Review from './components/Popups/Review.vue';

export default {
  name: 'App',
  components: {
    Review,
    Header,
    Breadcrumbs,
    Footer,
    DefaultPopupOverlay,
    Overlay,
    DefaultSnackbar,
    SuccessRecoveryPassword,
  },
  computed: {
    ...mapState({
      sidebarStatus: (state) =>
        state.profiles.profileConfigure.rigthSidebarStatus,
      allProducts: (state) =>
        state.categoryItem.numberProducts.totalNumberOfFilteredItems,
      categoryItem: (state) => state.categoryItem.categoryItem.subCategory,
    }),
  },
  created() {
    if (
      this.$route.query.recoverySuccess === 'true' ||
      this.$route.query.recoverySuccess === 'false'
    ) {
      this.$store.commit('profiles/SET_CHANGED_PROFILE_SUCCESS');
    }
  },
  methods: {
    disableFooterForCategory() {
      const { path, name } = this.$route;

      if (name === 'comparison' || path.includes('product')) {
        return false;
      }

      if (
        (path.includes('/profile/configurator/category') ||
          path.includes('/catalog/category')) &&
        this.categoryItem.length !== this.allProducts
      ) {
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: $bg;
}
.theme--light.v-application {
  background: none;
}
#app {
  font-family: 'Open Sans', sans-serif;
  color: $black;
}
.app-custom {
  position: relative;
  padding-bottom: 497px;
  min-height: 100vh;
  &.disableFooter {
    padding-bottom: 0px;
  }
}

@media (max-width: 980px) {
  .of-hiden {
    position: fixed;
    width: 100%;
  }
}
@media (max-width: 979px) {
  .app-custom {
    padding-bottom: 507px;
  }
}
@media (max-width: 920px) {
  .app-custom {
    padding-bottom: 650px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 700px) {
  .app-custom {
    padding-bottom: 727px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 655px) {
  .app-custom {
    padding-bottom: 749px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 638px) {
  .app-custom {
    padding-bottom: 756px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}

@media (max-width: 579px) {
  .app-custom {
    padding-bottom: 755px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 480px) {
  .app-custom {
    padding-bottom: 1034px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 425px) {
  .app-custom {
    padding-bottom: 1057px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}

@media (max-width: 362px) {
  .app-custom {
    padding-bottom: 1079px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
@media (max-width: 340px) {
  .app-custom {
    padding-bottom: 1106px;
    &.disableFooter {
      padding-bottom: 0px;
    }
  }
}
</style>

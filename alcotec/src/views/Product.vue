<template>
  <section class="card__product">
    <div class="card__container">
      <div class="card__product-main__wrapper">
        <div class="card__product-container">
          <div class="card__product-wrapper">
            <Slider :product="product" />
            <div class="card__product-characteristic">
              <InfoProduct :product="product" />
              <Tabs :product="product" />
            </div>
          </div>
        </div>
        <CollectionGoods v-if="product.collections" />
        <OtherGoods v-if="product.products" />
      </div>
      <RightSidebar class="card__product-wrapper_sidebar" />
    </div>
    <Compare />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store';

import Slider from '../components/Product/Slider.vue';
import InfoProduct from '../components/Product/InfoProduct.vue';
import Tabs from '../components/Product/Tabs.vue';
import OtherGoods from '../components/OtherGoods.vue';
import RightSidebar from '../components/Configurator/RigthSidebar.vue';
import CollectionGoods from '../components/CollectionGoods.vue';
import Compare from '../components/Compare.vue';

export default {
  name: 'Product',
  components: {
    Slider,
    Tabs,
    InfoProduct,
    OtherGoods,
    RightSidebar,
    CollectionGoods,
    Compare,
  },
  computed: {
    ...mapState({
      product: (state) => state.products.product,
      itemsCompare: (state) => state.categoryItem.categoryItemCompare.products,
      sidebarStatus: (state) =>
        state.profiles.profileConfigure.rigthSidebarStatus,
    }),
  },
  created() {
    if (this.itemsCompare.length) {
      const { id: productId } = this.product.totalInfo;
      const statusProductCompare = this.itemsCompare.find(
        (item) => item.totalInfo.id === productId,
      );

      if (statusProductCompare) {
        this.product.totalInfo.compare = true;
      } else {
        this.product.totalInfo.compare = false;
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch('products/getProduct', {
      id: to.params.productId,
      cb() {
        next();
      },
      error() {
        next('/404-error');
      },
    });
  },
};
</script>

<style lang="scss">
.card__product {
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  .card__container {
    width: 100%;
    display: flex;
    .card__product-main__wrapper {
      margin-right: auto;
      margin-left: auto;
    }
  }
}
.card__product-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0 15px;
}

.card__product-wrapper {
  display: flex;
  padding-top: 90px;
  padding-bottom: 60px;
  flex-wrap: wrap;
  position: relative;
  .card__product-slider {
    max-height: 575px;
  }
}
.sidebar__order-closed.card__product-wrapper_sidebar {
  height: 720px !important;
  right: -1px;
  margin-left: 0px;
}
.sidebar__order-closed.card__product-wrapper_sidebar.active {
  position: sticky !important;
}
.order-sidebar.card__product-wrapper_sidebar {
  top: 0px;
  right: -1px;
  z-index: 10;
  margin-top: 0px;
}
.order-sidebar.card__product-wrapper_sidebar.added-product-aside {
  margin-top: 8px;
}
.order-sidebar.card__product-wrapper_sidebar.added-product-aside.active {
  margin-top: 0px;
}
.order-sidebar.card__product-wrapper_sidebar {
  position: fixed !important;
}
.order-sidebar.card__product-wrapper_sidebar.active {
  position: fixed !important;
}
.order-sidebar.card__product-wrapper_sidebar.added-product-aside {
  height: 100vh !important;
  margin-top: 0px;
}
.card__product-wrapper_sidebar {
  position: sticky !important;
  top: 0px;
  right: 0;
  z-index: 1;
  height: auto !important;
  .sidebar__order-open-wrapper {
    height: auto;
  }
}
@media (max-width: 1275px) {
  .card__product-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .card__product-characteristic {
    margin-top: 30px;
  }
}

@media (max-width: 980px) {
  .card__product-wrapper {
    padding-top: 50px;
    padding-bottom: 40px;
  }
  .sidebar__order-closed.card__product-wrapper_sidebar {
    right: -74px;
    position: fixed !important;
    .sidebar__order-open-btn {
      top: 30%;
    }
  }
  .sidebar__order-closed.card__product-wrapper_sidebar.active {
    position: fixed !important;
    right: -74px;
  }
  .order-sidebar.card__product-wrapper_sidebar {
    right: 0px;
  }
}
</style>

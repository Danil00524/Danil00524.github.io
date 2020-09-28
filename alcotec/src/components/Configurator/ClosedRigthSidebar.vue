<template>
  <aside
    id="sidebar-closed-left"
    class="sidebar__order-closed"
    :class="{ active: statusScrollSidebar }"
    @click="changeStatusSidebar"
  >
    <button
      class="sidebar__order-open-btn icon-configuration-menu-left"
    ></button>
    <div class="sidebar__order-closed-wrapper">
      <div class="sidebar__closed-order-text">
        {{ text }}
      </div>
      <div class="sidebar__closed-order-price">
        {{ totalPrice }}
        <span>
          грн
        </span>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ClosedRigthSidebar',
  components: {},
  props: {
    text: {
      type: String,
      default: '',
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    logged: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      basket: (state) => state.basket.basket,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  watch: {
    basket: {
      handler(value) {
        if (value.length && this.logged) {
          const addedProduct = value.map((e) => {
            return `${e.totalInfo.id}`;
          });
          const productBasket = JSON.parse(localStorage.productBasket || '[]');

          if (addedProduct.length === productBasket.length) {
            this.$store.dispatch('basket/getRecommendetionProject', {
              addedProduct,
            });
          }
        }
      },
    },
  },
  data() {
    return {
      statusScrollSidebar: false,
    };
  },
  mounted() {
    this.handlerScrollSidebar();
    document.addEventListener('scroll', this.handlerScrollSidebar);
  },
  methods: {
    changeStatusSidebar() {
      this.$store.commit('profiles/CHANGE_SIDEBAR');
    },
    handlerScrollSidebar() {
      const { scrollTop } = document.documentElement;

      if (
        document.getElementById('header') &&
        document.getElementById('header').clientHeight &&
        document.getElementById('breadcrumbs') &&
        document.getElementById('breadcrumbs').clientHeight &&
        document.getElementById('personal__cabinet-top') &&
        document.getElementById('personal__cabinet-top').clientHeight
      ) {
        const header = document.getElementById('header').clientHeight;
        const breadcrumbs = document.getElementById('breadcrumbs').clientHeight;
        const personalCabinetTop = document.getElementById(
          'personal__cabinet-top',
        ).clientHeight;

        this.statusScrollSidebar =
          scrollTop > header + breadcrumbs + personalCabinetTop;
      } else if (
        document.getElementById('header') &&
        document.getElementById('header').clientHeight &&
        document.getElementById('breadcrumbs') &&
        document.getElementById('breadcrumbs').clientHeight
      ) {
        const header = document.getElementById('header').clientHeight;
        const breadcrumbs = document.getElementById('breadcrumbs').clientHeight;

        this.statusScrollSidebar = scrollTop > header + breadcrumbs;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar__order-closed {
  cursor: pointer;
  z-index: 2;
  margin-top: 8px;
  margin-left: 30px;
  border-radius: 4px;
  position: sticky;
  max-width: 74px;
  width: 100%;
  height: 720px;
  background: #a12c3a;
  box-shadow: -10px 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  right: 0px;
}
.sidebar__order-closed.active {
  top: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.sidebar__order-open-btn {
  padding: 14px 16px;
  font-size: 24px;
  position: absolute;
  top: 24px;
  right: 74px;
  background-color: #a12c3a;
  border-radius: 4px 0px 0px 4px;
  border: none;
  outline: none;
  font-size: 24px;
  z-index: 10;
  cursor: pointer;
  &:hover {
    &:before {
      transition: all 0.3s;
      opacity: 0.8;
    }
  }
}

.sidebar__order-closed-wrapper {
  display: flex;
  justify-content: space-around;
  writing-mode: vertical-rl;
}
.sidebar__closed-order-text {
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #dcc488;
  font-weight: bold;
}
.sidebar__closed-order-price {
  font-family: 'MagistralC';
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #dcc488;
  font-weight: bold;
  position: relative;
  &::before {
    font-size: 24px;
    position: absolute;
    top: -43px;
    left: 7px;
    font-family: 'icomoon';
    content: '\e91f';
  }
}

@media (max-width: 980px) {
  .sidebar__order-closed {
    position: fixed;
    top: 27%;
    right: -74px;
    .sidebar__order-open-btn {
      top: 65%;
      position: fixed;
      right: 0px;
    }
  }
}
</style>

<template>
  <aside
    v-if="sidebarStatus"
    id="sidebar-open-right"
    class="order-sidebar"
    :class="{
      active: statusScrollSidebar,
      'added-product-aside': basket.length,
    }"
  >
    <div
      :class="[
        'order-sidebar_wrapper',
        { active: sidebarStatus, 'added-product': basket.length },
      ]"
    >
      <div class="order-description">
        <button
          class="order-close-background"
          @click="$store.commit('profiles/CHANGE_SIDEBAR')"
        ></button>
        <span
          class="order-close-icon icon-configuration-menu"
          @click="$store.commit('profiles/CHANGE_SIDEBAR')"
        ></span>
        <div class="oreder-number-wrapper">
          <div v-if="isLoggedIn" class="oreder-number">
            {{ numberProject && `№${numberProject}` }}
          </div>
          <div v-else class="oreder-number" style="height: 28px;"></div>
        </div>
        <div v-if="isLoggedIn" class="oreder-description_text">
          <span class="order-sidebar-icon">
            <button
              class="icon-configuration-settings-rename icon-configuration-drop-down"
            >
              {{ staticText.text.rename[actualLang.index] }}
            </button>
            <input
              v-model="projectComment"
              type="text"
              :placeholder="
                staticText.rigthSidebar.placeholder[actualLang.index]
              "
            />
          </span>
        </div>
      </div>

      <div v-if="basket.length" class="sidebar__order-open-wrapper">
        <div
          v-for="(product, index) in basket"
          :key="product.totalInfo.id"
          class="sidebar__order-open-box"
        >
          <div class="sidebar__order-open-box-top">
            <button
              class="module__enter-client-close"
              @click="deleteFromProjectСross(product.totalInfo)"
            ></button>
            <span
              @click="
                goToProduct($route.params.categoryId, product.totalInfo.id)
              "
            >
              <div class="card__product-suptitle">
                {{ product.totalInfo.type[actualLang.index] }}
                <span class="sidebar__order-open-box-number">{{
                  (++index).toString().padStart(2, 0)
                }}</span>
              </div>
              <div class="card__product-title">
                {{ product.totalInfo.title }}
              </div>
            </span>
            <div class="sidebar__order-open-box-quantity">
              <button
                class="icon-project-minus"
                @click="deleteFromProjectMinus(product.totalInfo)"
              ></button>
              <span>
                {{ product.totalInfo.addedToBasket }}
              </span>
              <button
                class="icon-project-plus"
                @click="addToProject(product.totalInfo)"
              ></button>
              <div class="card__product-price-value">
                {{
                  product.totalInfo.sale
                    ? product.totalInfo.sale * product.totalInfo.addedToBasket
                    : product.totalInfo.priceUAH *
                      product.totalInfo.addedToBasket
                }}
                <span>грн</span>
              </div>
            </div>
          </div>

          <div
            v-if="
              product.totalInfo.recomendedProducts &&
                product.totalInfo.recomendedProducts.length &&
                isLoggedIn
            "
            class="sidebar__order-open-box-bottom"
          >
            <div class="sidebar__order-open-box-bottom-inner">
              <span>
                {{ staticText.rigthSidebar.recomendText[actualLang.index] }}
              </span>
              <span
                v-if="product.totalInfo.recommendedProductsStatus"
                class="icon-project-minus"
                @click="
                  product.totalInfo.recommendedProductsStatus = !product
                    .totalInfo.recommendedProductsStatus
                "
              ></span>
              <span
                v-else
                class="icon-project-plus"
                @click="
                  product.totalInfo.recommendedProductsStatus = !product
                    .totalInfo.recommendedProductsStatus
                "
              ></span>
              <transition name="bounce">
                <div
                  v-if="product.totalInfo.recommendedProductsStatus"
                  class="sidebar__order-open-box-bottom-items"
                >
                  <span
                    v-for="item in product.totalInfo.recomendedProducts"
                    :key="item.id"
                    class="sidebar__order-open-box-bottom-item"
                    @click="goToProduct(item.categoryId, item.id)"
                  >
                    <div class="models__item-img">
                      <img :src="`${baseDomainImg}${item.img}`" alt="" />
                    </div>
                    <div class="models__item-title">
                      {{ item.title }}
                    </div>
                    <div class="models__item-valuta">
                      {{ item.salePrice ? item.salePrice : item.priceUAH }} грн
                    </div>
                    <div class="models__item-subtitle">
                      {{ item.text[actualLang.index] }}
                    </div>
                  </span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="isLoggedIn" class="order-sidebar-notification">
        {{ staticText.rigthSidebar.text[actualLang.index] }}
      </div>
      <div v-else-if="!isLoggedIn" class="order-sidebar-notification">
        {{ staticText.guestBuy.emptyBasket[actualLang.index] }}
      </div>
      <WeRecommend v-if="isLoggedIn" />

      <div class="order-sidebar_price">
        <span class="price-text">
          {{ staticText.rigthSidebar.totalPrice[actualLang.index] }}
        </span>
        <div class="order-sidebar_price-valuta">
          <span class="price-summ">
            {{ changedTotalPrice ? changedTotalPrice : totalPrice }}
          </span>
          <p></p>
          <vSelect
            v-model="selected"
            transition
            :searchable="false"
            :clearable="false"
            :options="staticText.product.selectCurrency[actualLang.index]"
          />
        </div>
      </div>
      <div v-if="basket.length && isLoggedIn" class="order-sidebar_buttons">
        <a
          class="sidebar_projects_link"
          @click.prevent="$refs.handlerSaveProject.handlerSaveProject()"
        >
          <Button
            id="save"
            class="sidebar_projects_save"
            :text="staticText.rigthSidebar.button.save[actualLang.index]"
            @click.native="$store.commit('projects/SET_MARGIN', false)"
          />
        </a>
        <span @click.prevent="$refs.CatalogPopup.catalogPopup()">
          <Button
            id="check"
            class="sidebar_projects_check"
            :text="staticText.rigthSidebar.button.check[actualLang.index]"
            @click.native="$store.commit('projects/SET_MARGIN', true)"
          />
        </span>
      </div>
      <div v-if="!isLoggedIn && basket.length" class="order-sidebar_buttons">
        <Button
          id="guest"
          class="sidebar_projects_check"
          :text="staticText.rigthSidebar.button.guest[actualLang.index]"
          @click.native="openGuestPopup"
        />
      </div>
      <CatalogPopup ref="CatalogPopup" />
    </div>
    <handler-save-project ref="handlerSaveProject" />
    <GuestBuyPopup
      v-model="guestPopupStatus"
      :products-guest="guestBasket"
      :total="totalPrice"
    />
  </aside>
  <ClosedRigthSidebar
    v-else-if="!sidebarStatus"
    v-model="sidebarStatus"
    :text="sendText"
    :total-price="totalPrice"
    :logged="isLoggedIn"
  />
</template>

<script>
import vSelect from 'vue-select';
import { mapState } from 'vuex';
import { staticText } from '../../i18n';
import { baseDomainImg } from '../../constans';

import ClosedRigthSidebar from './ClosedRigthSidebar.vue';
import Button from '../Button.vue';
import CatalogPopup from '../Popups/CatalogPopup.vue';
import WeRecommend from './WeRecommend.vue';
import GuestBuyPopup from './GuestBuyPopup.vue';
import handlerSaveProject from '../../helpers/handlerSaveProject.vue';

export default {
  name: 'RigthSidebar',
  components: {
    Button,
    ClosedRigthSidebar,
    CatalogPopup,
    WeRecommend,
    handlerSaveProject,
    vSelect,
    GuestBuyPopup,
  },
  props: {},
  data() {
    return {
      selected: '',
      changedTotalPrice: 0,
      staticText,
      sidebarViewStatus: false,
      statusScrollSidebar: false,
      projectComment: '',
      baseDomainImg,
      closedText: '',
      popup: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.users.userData.isLoggedIn,
      basket: (state) => state.basket.basket,
      numberProject: (state) => state.basket.numberProject,
      totalPrice: (state) => state.basket.totalPrice,
      sidebarStatus: (state) =>
        state.profiles.profileConfigure.rigthSidebarStatus,
      guestPopupStatus: (state) => state.users.guestPopupStatus,
      actualLang: (state) => state.settings.actualLang,
      comment: (state) => state.basket.commentProject,
      exchange: (state) => state.settings.exchange,
    }),
    sendText: function () {
      let text = '';

      if (this.isLoggedIn) {
        text = staticText.rigthSidebar.closedSidebar[this.actualLang.index];
      } else {
        text = staticText.rigthSidebar.closedSidebarGuest[this.actualLang.index];
      }

      return text;
    },
    guestBasket: function () {
      const basket = [];

      if (!this.isLoggedIn) {
        this.basket.forEach((e) => {
          basket.push({
            id: e.totalInfo.id,
            name: e.totalInfo.title,
            price: e.totalInfo.priceUAH,
            quantity: e.totalInfo.addedToBasket,
          });
        });
      }

      return basket;
    },
  },
  watch: {
    projectComment: {
      handler(value) {
        this.$store.commit('basket/SET_COMMENT_PROJECT', value);
      },
    },
    comment: {
      handler(value) {
        this.projectComment = value;
      },
    },
    selected: {
      handler(value) {
        const usd = Number(this.exchange.usd).toFixed(2);
        const eur = Number(this.exchange.eur).toFixed(2);

        if (value === 'Доллар' || value === 'Долар') {
          this.changedTotalPrice = (this.totalPrice / usd).toFixed(2);
        } else if (value === 'Евро' || value === 'Євро') {
          this.changedTotalPrice = (this.totalPrice / eur).toFixed(2);
        } else if (value === 'Гривна' || value === 'Гривня') {
          this.changedTotalPrice = this.totalPrice;
        }
      },
    },
    totalPrice: {
      handler(value) {
        const usd = Number(this.exchange.usd).toFixed(2);
        const eur = Number(this.exchange.eur).toFixed(2);

        if (this.selected === 'Доллар' || this.selected === 'Долар') {
          this.changedTotalPrice = (value / usd).toFixed(2);
        } else if (this.selected === 'Евро' || this.selected === 'Євро') {
          this.changedTotalPrice = (value / eur).toFixed(2);
        } else if (this.selected === 'Гривна' || this.selected === 'Гривня') {
          this.changedTotalPrice = value;
        }
      },
    },
  },
  created() {
    this.selected = staticText.product.selectCurrency[this.actualLang.index][0];

    // if (this.isLoggedIn) this.handlerBasketLocalStorage();
    this.handlerBasketLocalStorage();

    this.handleView();
    window.addEventListener('resize', this.handleView);

    this.handlerScrollSidebar();
    document.addEventListener('scroll', this.handlerScrollSidebar);

    if (localStorage.projectComment) {
      const comment = JSON.parse(localStorage.projectComment);

      this.projectComment = comment;
    }
    if (localStorage.projectId) {
      const projectId = JSON.parse(localStorage.projectId);

      this.$store.commit('basket/SET_PROJECT_NUMBER', projectId);
    }
  },
  methods: {
    /**
     * Go to the product card page.
     * @author Danil Poznyakov <front.end.poznyakov@gmail.com>
     *
     * @param {number} categoryId - category products ID.
     * @param {number} id - Product ID.
     */
    goToProduct(categoryId: Number, id: Number) {
      this.$router.push(
        `/profile/configurator/category/${categoryId}/product/${id}`,
      );
      this.$store.commit('profiles/CHANGE_SIDEBAR');
    },
    openGuestPopup() {
      this.$store.commit('users/CHANGE_GUEST_POPUP');
    },
    /**
     * Localstorage recycle bin handler. Get the goods added earlier and make a
     * calculation of the total cost of the project. Add the received pro-invoice and goods to vuex.
     * @author Danil Poznyakov <front.end.poznyakov@gmail.com>
     *
     * @async
     * @function basket/getProduct
     * @param {number} id - Product ID.
     * @param {number} count - The number of products added to the project.
     */
    handlerBasketLocalStorage() {
      if (
        localStorage.productBasket &&
        localStorage.productBasket.length &&
        !this.basket.length
      ) {
        JSON.parse(localStorage.productBasket).forEach((e) => {
          this.$store.dispatch('basket/getProduct', {
            id: e.id,
            count: e.addedToBasket,
            cb: (data) => {
              let sum;
              const { addedToBasket, sale, priceUAH } = data.totalInfo;

              if (sale) {
                sum = sale * addedToBasket;
              } else {
                sum = priceUAH * addedToBasket;
              }

              this.$store.commit('basket/APPEND_TOTAL_PRICE', sum);
            },
          });
        });
      }
    },
    deleteFromProjectMinus(product) {
      if (product.addedToBasket > 1) {
        const diff = product.sale ? product.sale : product.priceUAH;

        product.addedToBasket > 1 ? (product.addedToBasket -= 1) : 1;

        let productBasket = JSON.parse(localStorage.productBasket || '[]');

        productBasket = productBasket.map((e) => {
          if (Number(e.id) === Number(product.id)) {
            e.addedToBasket > 1 ? (e.addedToBasket -= 1) : 1;
          }

          return { id: e.id, addedToBasket: e.addedToBasket };
        });

        try {
          localStorage.productBasket = JSON.stringify(productBasket);
        } catch (e) {
          alert('Очистите LocalStorage.');
        }

        this.$store.commit('basket/DIFF_FROM_TOTAL_PRICE', diff);
      }
    },
    addToProject(product) {
      product.addedToBasket += 1;
      let productBasket = JSON.parse(localStorage.productBasket || '[]');

      productBasket = productBasket.map((e) => {
        if (Number(e.id) === Number(product.id)) {
          e.addedToBasket += 1;
        }

        return { id: e.id, addedToBasket: e.addedToBasket };
      });

      try {
        localStorage.productBasket = JSON.stringify(productBasket);
      } catch (e) {
        alert('Очистите LocalStorage.');
      }

      this.$store.commit(
        'basket/APPEND_TOTAL_PRICE',
        product.sale ? product.sale : product.priceUAH,
      );
    },
    deleteFromProjectСross(product) {
      this.$store.commit('basket/DELETE_BASKET_ITEM', product);
    },
    handleView() {
      this.sidebarViewStatus = window.innerWidth >= 980 ? true : false;
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-sidebar {
  margin-top: 8px;
  position: sticky;
  max-width: 640px;
  width: 100%;
  height: 100%;
  background: #a12c3a;
  box-shadow: -10px 8px 20px rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  border-radius: 1px;
  z-index: 2;
  overflow-y: auto;

  scrollbar-color: #262626 rgba(0, 0, 0, 0.05);
  scrollbar-width: auto;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }
}
.order-sidebar.active {
  top: 0px;
  height: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
}
.order-sidebar.added-product-aside {
  top: 0px;
  height: 100vh;
  margin-bottom: 0px;
}

.order-close-background {
  position: absolute;
  top: 28px;
  left: 0px;
  width: 56px;
  height: 52px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px 0px 0px 4px;
  transform: rotate(-180deg);
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:hover ~ .order-close-icon {
    opacity: 0.8;
    transition: all 0.3s;
  }
}

.order-close-icon {
  cursor: pointer;
  position: absolute;
  left: 16px;
  top: 43px;
  font-size: 24px;
  &:hover {
    transition: all 0.3s;
    opacity: 0.8;
  }
}

.order-sidebar_wrapper {
  margin-left: 15px;
  padding-left: 15px;
  padding-bottom: 311px;
  margin-right: 15px;
  width: 100%;
  max-width: 364px;
  padding-right: 15px;
}
.order-sidebar_wrapper.added-product {
  margin-left: 0px;
  padding-bottom: 45px;
  max-width: 100%;
  .oreder-number-wrapper {
    margin-right: 21px;
  }
  .sidebar__order-open-wrapper {
    .sidebar__order-open-box-bottom-inner {
      width: 100%;
    }
  }
  .order-sidebar_price,
  .order-sidebar_buttons {
    margin-right: auto;
    margin-left: 25px;
    max-width: 335px;
    width: 100%;
  }

  .sidebar__order-open-box-bottom {
    scrollbar-color: #262626 rgba(0, 0, 0, 0.05);
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 4px;
      background-color: rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #262626;
    }
  }
  .icon-configuration-settings-comment {
    right: -21px;
    &:before {
      right: calc(28% - 8px);
    }
  }
}

.order-description {
  padding-top: 33px;
  margin-bottom: 33px;
}
.oreder-number-wrapper {
  display: flex;
  justify-content: space-between;
}
.icon-configuration-settings-comment {
  text-align: center;
  position: absolute;
  top: 30px;
  right: -49px;
  z-index: -1;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  background-color: #262626;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 16px;
  opacity: 0;
  transition: all 0.3s;
  &:before {
    right: calc(50% - 6px);
    top: -14px;
    position: absolute;
    transform: rotate(180deg);
    color: #262626;
  }
}
.icon-configuration-settings-rename {
  font-family: 'MagistralC';
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  position: absolute;
  letter-spacing: normal;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  line-height: 22px;
  color: #ffffff;
  background-color: #262626;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 8px 16px;
  opacity: 0;
  transition: all 0.3s;
  &:before {
    right: calc(50% - 6px);
    top: -14px;
    position: absolute;
    transform: rotate(180deg);
    color: #262626;
  }
}

.oreder-number {
  padding-left: 60px;
  font-family: 'MagistralC';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #dcc488;
}

.oreder-description_text {
  letter-spacing: 10px;
  padding-left: 60px;
}

.order-sidebar-icon {
  cursor: pointer;
  font-size: 20px;
  position: relative;

  &:hover .icon-configuration-settings-comment {
    z-index: 1;
    opacity: 1;
    transition: all 0.3s;
  }
  &:hover .icon-configuration-settings-rename {
    z-index: 1;
    opacity: 1;
    transition: all 0.3s;
  }
}

.oreder-description_text input {
  border: 1px solid transparent;
  padding: 6px 16px;
  margin-left: -17px;
  max-width: 258px;
  width: 100%;
  height: 28px;
  color: #dcc488;
  background: transparent;
  outline: none;
  font-family: 'MagistralC';
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  transition: all 0.3s;
  font-weight: bold;
  text-overflow: ellipsis;
}

.oreder-description_text input:hover {
  border: 1px solid #fff;
}

.oreder-description_text input::placeholder {
  opacity: 0.6;
  font-family: 'MagistralC';
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #fff;
}

.order-sidebar-notification {
  max-width: 334px;
  width: 100%;
  height: 104px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
  margin-bottom: 99px;
}

.order-sidebar_price {
  margin-bottom: 50px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  .price-summ {
    white-space: nowrap;
  }
}

.order-sidebar_price span {
  height: 23px;
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
}

.order-sidebar_buttons {
  display: flex;
  justify-content: space-between;
}

.main-content_item {
  max-width: 382px;
  width: 100%;
  height: 250px;
  background: #fff;
  margin-bottom: 30px;
  margin-right: 30px;
}

.main-content_image {
  text-align: center;
}

.main-content_select {
  max-width: 382px;
  width: 100%;
}

.main-content_select select {
  padding-right: 38px;
  position: relative;
  bottom: 57px;
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  background: #a12c3a;
  border: none;
  width: 382px;
  height: 56px;
}

.sidebar__order-open-wrapper {
  padding-left: 0px;
  height: auto;
  & div:last-child {
    margin-bottom: 0px;
  }
}
.sidebar__order-open-box {
  margin-bottom: 16px;
}
.sidebar__order-open-box-top {
  background: #ffffff;
  border-radius: 1px;
  padding: 22px 22px 16px 24px;
  position: relative;
  & .module__enter-client-close {
    position: absolute;
    z-index: 1;
    top: 0px;
    right: 0px;
    &::before {
      top: 14px;
      right: 8px;
    }
  }
  & .card__product-suptitle {
    cursor: pointer;
    padding-top: 26px;
    position: relative;
    & .sidebar__order-open-box-number {
      position: absolute;
      top: 0;
      left: 0;
      font-family: 'MagistralC';
      font-size: 80px;
      line-height: 91px;
      letter-spacing: 0.02em;
      font-weight: bold;
      color: rgba(155, 155, 155, 0.15);
    }
  }
  & .card__product-title {
    cursor: pointer;
    padding-bottom: 20px;
  }
}
.sidebar__order-open-box-number-1 {
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '\e900';
    font-family: 'icomoon';
    font-size: 80px;
    line-height: 91px;
    letter-spacing: 0.02em;
    color: rgba(155, 155, 155, 0.15);
  }
}
.sidebar__order-open-box-quantity {
  display: flex;
  align-items: center;
  & button {
    background-color: #fff;
    border: 1px solid #dcc488;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    padding: 12px;
  }
  & span:nth-child(2) {
    padding: 8.5px 0;
    border-top: 1px solid #dcc488;
    border-bottom: 1px solid #dcc488;
  }

  & button:nth-child(1) {
    border-right: none;
    padding-right: 19px;
    &:hover {
      &:before {
        transition: all 0.3s;
        color: black;
      }
    }
  }
  & button:nth-child(3) {
    border-left: none;
    padding-left: 19px;
    &:hover {
      &:before {
        transition: all 0.3s;
        color: black;
      }
    }
  }
}
.card__product-price-value {
  padding-left: 40px;
}

.sidebar__order-open-box-bottom-inner {
  background: rgba(255, 255, 255, 0.15);
  padding: 16px 18px 19px 19px;
  & span {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #ffffff;
    padding-left: 5px;
  }
  & .icon-project-minus,
  & .icon-project-plus {
    color: #fff;
    cursor: pointer;
  }
}
.sidebar__order-open-box-bottom-items {
  display: flex;
  padding-top: 11px;
  padding-bottom: 0;
  justify-content: space-between;
}
.sidebar__order-open-box-bottom-item {
  cursor: pointer;
  max-width: 180px;
  width: 100%;
  padding: 5px;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  & .models__item-img {
    min-height: 135px;
    max-height: 135px;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    background-color: #fff;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      max-height: 135px;
    }
  }
  & .models__item-title {
    font-family: 'MagistralC';
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.02em;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 36px;
    display: -webkit-box;
  }
  & .models__item-valuta {
    padding-top: 0;
    padding-bottom: 24px;
    font-family: 'MagistralC';
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.02em;
    color: #ffffff;
    font-weight: bold;
  }
  & .models__item-subtitle {
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
}
.sidebar__order-open-bottom {
  margin-top: 40px;
  max-width: 334px;
  width: 100%;
  margin-left: 22px;
  margin-bottom: 45px;
}
.sidebar__order-open-bottom-total {
  display: flex;
  justify-content: space-between;
  & .card__product-price-value {
    font-family: 'MagistralC';
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.02em;
    color: #ffffff;
    padding-left: 0;
  }
}
.sidebar__order-open-bottom-total-title {
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: bold;
}
.sidebar__order-open-bottom-btn {
  display: flex;
  justify-content: space-between;
  & .personal__cabinet-new_project {
    & button {
      background-color: #fff;
    }
  }
  & .personal__cabinet-new_project:nth-child(2) {
    & button {
      background-color: transparent;
      border: 1px solid #ffffff;
      color: #fff;
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@media (max-width: 1440px) {
  .order-sidebar {
    max-width: 460px;
    margin-left: 0;
  }
  .sidebar__order-open-box-bottom-item {
    & .models__item-img {
      min-height: 110px;
      max-height: 110px;
      & img {
        max-height: 110px;
      }
    }
    & .models__item-title {
      font-size: 14px;
    }
    & .models__item-valuta {
      padding-bottom: 16px;
      font-size: 14px;
    }
    & .models__item-subtitle {
      line-height: 18px;
    }
  }
}

@media (max-width: 1345px) {
  .order-sidebar_wrapper {
    max-width: fit-content;
  }
  .icon-configuration-settings-comment {
    top: 30px;
    right: -15px;
    color: #ffffff;
    background-color: #262626;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 8px 16px;
    opacity: 0;
    transition: all 0.3s;
    &:before {
      right: calc(20% - 6px);
      top: -14px;
      position: absolute;
      transform: rotate(180deg);
      color: #262626;
    }
  }
}
@media (max-width: 1285px) {
  .order-sidebar {
    top: 0px;
  }
}
@media (max-width: 1280px) {
  .order-sidebar {
    max-width: 438px;
  }
}
@media (max-width: 1207px) {
  .order-sidebar {
    position: fixed;
    height: fit-content;
    right: 0px;
    top: 0px;
    height: 100%;
    overflow-y: auto;
    z-index: 4;
    max-width: 50%;
    margin-top: 0px;
    .order-sidebar_wrapper {
      width: 100%;
      margin: 0 auto;
      .order-sidebar-notification {
        max-width: 100%;
      }
    }
  }
}
.sidebar__order-open-box-bottom-item {
  & .models__item-img {
    min-height: 135px;
    max-height: 135px;
    & img {
      max-height: 135px;
    }
  }
}
.sidebar_projects_check{

}
#guest {
  width: 100%;
  & /deep/ button {
    width: 100% ;
    max-width: 100%;
  }
}
@media (max-width: 980px) {
  .order-sidebar {
    max-width: 100%;
  }
  .order-sidebar {
    .order-sidebar_wrapper.added-product {
      .order-sidebar_price {
        margin-bottom: 40px;
      }
      .order-sidebar_buttons {
        margin-bottom: 30px;
      }
      .order-sidebar_price,
      .order-sidebar_buttons {
        margin-left: auto;
        max-width: 100%;
      }
    }
  }
  .order-sidebar_price {
    margin-bottom: 40px;
  }
}
@media (max-width: 500px) {
  .order-sidebar_wrapper.added-product {
    .sidebar__order-open-wrapper {
      .sidebar__order-open-box-bottom-inner {
        width: fit-content;
      }
    }
    .sidebar__order-open-box-bottom {
      overflow-x: auto;
      position: relative;
    }
  }
  .sidebar__order-open-box-bottom-item {
    width: 180px;
  }
}
@media (max-width: 414px) {
  .order-sidebar {
    .order-sidebar_wrapper.added-product {
      .order-sidebar_buttons {
        margin-bottom: 100px;
      }
    }
  }
}
@media (max-width: 400px) {
  .sidebar__order-open-box-top {
    & .card__product-title {
      font-size: 20px;
    }
    & .card__product-price-value {
      padding-left: 20px;
      font-size: 16px;
    }
  }
}
</style>

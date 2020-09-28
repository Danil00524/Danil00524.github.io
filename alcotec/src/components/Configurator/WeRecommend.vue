<template>
  <div
    v-if="
      recommendedProducts.products &&
        basket.length &&
        recommendedProducts.products.length
    "
    class="sidebar__order-open-box"
  >
    <div class="sidebar__order-open-box-bottom">
      <div class="sidebar__order-open-box-bottom-inner">
        <span>
          {{ staticText.rigthSidebar.weRecommend[actualLang.index] }}
        </span>
        <div class="sidebar__order-open-box-bottom-items">
          <span
            v-for="item in recommendedProducts.products"
            :key="item.id"
            @click="goToProduct(item.categoryId, item.id)"
            class="sidebar__order-open-box-bottom-item"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';
import { baseDomainImg } from '../../constans';

export default {
  name: 'WeRecommend',
  data() {
    return {
      staticText,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      basket: (state) => state.basket.basket,
      actualLang: (state) => state.settings.actualLang,
      recommendedProducts: (state) => state.basket.recommendedProducts,
    }),
  },
  watch: {
    basket: {
      handler(value) {
        if (value.length) {
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
  methods: {
    goToProduct(categoryId, id) {
      this.$router.push(
        `/profile/configurator/category/${categoryId}/product/${id}`,
      );
      this.$store.commit('profiles/CHANGE_SIDEBAR');
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar__order-open-box {
  margin-top: 20px;
}

.order-sidebar_wrapper.added-product {
  margin-right: 0px;
  padding-bottom: 45px;
  .oreder-number-wrapper {
    margin-right: 21px;
  }
  .sidebar__order-open-box-bottom-inner {
    width: 100%;
  }
  .order-sidebar_price,
  .order-sidebar_buttons {
    margin-right: 150px;
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

.oreder-number {
  padding-left: 48px;
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
  overflow-y: auto;
  height: auto;
  max-height: 100vh;
  scrollbar-color: #262626 #fff;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    background-color: #fff;
    height: 4px;
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }
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
      top: 0;
      right: 0px;
    }
  }
  & .card__product-suptitle {
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
    padding-bottom: 20px;
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
  & button:nth-child(1) {
    border-right: none;
    padding-right: 19px;
  }
  & button:nth-child(2) {
    border-left: none;
    padding-left: 19px;
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
}
.sidebar__order-open-box-bottom-items {
  display: flex;
  padding-top: 19px;
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
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    min-height: 135px;
    max-height: 135px;
    background-color: #fff;
    margin-bottom: 16px;
    align-items: center;
    display: flex;
    justify-content: center;
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
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    max-height: 57px;
    display: -webkit-box;
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
@media (max-width: 1440px) {
  .sidebar__order-open-box-bottom-item {
    & .models__item-img {
      max-height: 110px;
      min-height: 110px;
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
@media (max-width: 1207px) {
  .sidebar__order-open-box-bottom-item {
    & .models__item-img {
      min-height: 135px;
      max-height: 135px;
      & img {
        max-height: 135px;
      }
    }
  }
}
@media (max-width: 1138px) {
  .order-sidebar {
    max-width: 368px;
  }
  .order-sidebar_wrapper.added-product {
    .order-sidebar_price {
      flex-direction: column;
      & span:first-child {
        margin-bottom: 10px;
      }
    }
    .order-sidebar_buttons {
      & a:first-child {
        padding-right: 15px;
        margin-bottom: 20px;
      }
    }
  }
}
@media (max-width: 980px) {
  .order-sidebar {
    position: fixed;
    height: fit-content;
    right: 0px;
    top: -8px;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
    max-width: 100%;
    scrollbar-color: #262626 #fff;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      background-color: #fff;
      height: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #262626;
    }
    .order-sidebar_wrapper {
      max-width: 100%;
      margin-left: auto;
      width: 100%;
    }
    .order-sidebar_wrapper.added-product {
      padding-left: 15px;
      .order-sidebar_price {
        flex-direction: row;
      }
    }
  }
  .order-sidebar_price {
    margin-bottom: 40px;
  }
}
@media (max-width: 500px) {
  .order-sidebar_wrapper.added-product {
    .sidebar__order-open-box-bottom-inner {
      width: fit-content;
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
@media (max-width: 480px) {
  .order-sidebar {
    .order-sidebar_wrapper {
      .order-sidebar_price {
        flex-direction: column;
        & span:first-child {
          margin-bottom: 10px;
        }
      }
    }
    .order-sidebar_wrapper.added-product {
      .order-sidebar_price {
        flex-direction: column;
      }
    }
  }
}
</style>

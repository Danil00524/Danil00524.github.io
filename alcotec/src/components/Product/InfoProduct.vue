<template>
  <div>
    <div class="card__product-filter-wrapper">
      <div class="card__product-filter">
        <div
          v-for="model in product.silverModel"
          :key="model.id"
          class="card__product-filter-item_silver"
        >
          {{ model[actualLang.index] }}
        </div>
        <div
          v-for="model in product.redModel"
          :key="model.id"
          class="card__product-filter-item_red"
        >
          {{ model[actualLang.index] }}
        </div>
      </div>
      <Sale
        v-if="userData && userData.isLoggedIn && product.saleDate"
        :sale-date="product.saleDate"
      />
    </div>
    <div v-if="product.totalInfo.type" class="card__product-suptitle">
      {{ product.totalInfo.type[actualLang.index] }}
    </div>
    <div class="card__product-title-wrapper">
      <div class="card__product-title">
        {{ product.totalInfo.title }}
      </div>
      <div
        v-if="product.totalInfo.collection"
        class="card__product-title-rating"
      >
        {{ product.totalInfo.collection }}
      </div>
      <div class="card__product-title-stars">
        <RatingStars :rating="product.totalInfo.rating" />
      </div>
    </div>
    <div class="card__product-price">
      <div class="card__product-price-left">
        <div
          v-if="product.totalInfo.sale && productCurrency === 'грн'"
          class="card__product-price-value-wrapper"
        >
          <div class="card__product-price-value-strikethrough">
            {{ renderProductPrice(product.totalInfo) }}
            <span>{{ productCurrency }}</span>
          </div>
          <div class="card__product-price-value">
            {{ product.totalInfo.sale }}
            <span>{{ productCurrency }}</span>
          </div>
        </div>

        <div v-else class="card__product-price-value">
          {{ renderProductPrice(product.totalInfo) }}
          <span>{{ productCurrency }}</span>
        </div>

        <div class="card__product-price-retail">
          {{ product.totalInfo.availability[actualLang.index] }}
        </div>
      </div>
      <div class="card__product-price-line"></div>
      <div class="card__product-price-right">
        <div class="card__product-price-valuta">
          <vSelect
            v-model="selected"
            transition
            :searchable="false"
            :clearable="false"
            :options="staticText.product.selectCurrency[actualLang.index]"
          />
        </div>
      </div>
    </div>
    <div v-if="userData && userData.isLoggedIn" class="card__product-form">
      <form>
        <input v-model="countProduct" type="number" maxlength="3" />
        <button
          class="models__item-add_projects"
          @click.prevent="addToBasket(product.totalInfo)"
        >
          {{ staticText.product.buttons.addInProject[actualLang.index] }}
        </button>
        <CheckBox
          v-if="!maxNumberProductCompare"
          :id="'compare' + product.totalInfo.id"
          v-model="statusCompare"
          :name="'compare' + product.totalInfo.id"
          :text="staticText.product.buttons.addСomparison[actualLang.index]"
          :active-text="
            staticText.categoryItem.activeCheckbox[actualLang.index]
          "
          :disable="statusCompare ? true : false"
          @change="handlerCompare"
        />
        <label
          v-else
          class="checkbox disable"
          @click.prevent="showComparePopup"
        >
          <div class="checkbox__disable">
            <svg class="checkbox__img" viewBox="0 0 120.4 80.2">
              <polyline points="0,40.1 40.2,80.2 120.4,0 " />
            </svg>
          </div>
          <div class="checkbox__text">
            {{ staticText.categoryItem.checkbox[actualLang.index] }}
          </div>
        </label>
      </form>
    </div>
    <div v-if="userData && !userData.isLoggedIn">
      <dialog-popupsShops ref="PopupsShops"></dialog-popupsShops>
      <!--      <button @click.prevent="openModal">-->
      <button
        v-if="!inBasketIds(product.totalInfo.id)"
        @click.prevent="addToBasket(product.totalInfo)"
      >
        <Button :text="staticText.product.buttons.buy[actualLang.index]" />
      </button>
      <button v-else>
        <Button :text="staticText.guestBuy.inBasket[actualLang.index]" />
      </button>
    </div>
    <v-snackbar v-model="statusPopup" :timeout="4000">
      {{ staticText.popups[1][actualLang.index] }}
      <v-btn color="blue" text @click="statusPopup = false">
        {{ staticText.btns[1][actualLang.index] }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

import vSelect from 'vue-select';
import Button from '../Button.vue';
import Sale from './Sale.vue';
import RatingStars from '../RatingStars.vue';
import PopupsShops from './PopupsShops.vue';
import CheckBox from '../CheckBox.vue';

import 'vue-select/src/scss/vue-select.scss';

export default {
  name: 'InfoProduct',
  components: {
    Sale,
    Button,
    RatingStars,
    vSelect,
    'dialog-popupsShops': PopupsShops,
    CheckBox,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      productCurrency: 'грн',
      selected: '',
      transition: {
        type: String,
        default: 'fade',
      },
      countProduct: 1,
      statusPopup: false,
      staticText,
      maxNumberProductCompare: false,
      statusCompare: this.product.totalInfo.compare,
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.users.userData,
      basket: (state) => state.basket.basket,
      actualLang: (state) => state.settings.actualLang,
      exchange: (state) => state.settings.exchange,
      itemsCompare: (state) => state.categoryItem.categoryItemCompare.products,
    }),
  },
  created() {
    this.selected = staticText.product.selectCurrency[this.actualLang.index][0];

    if (localStorage.compareProducts) {
      const compareProducts = JSON.parse(localStorage.compareProducts);

      const statusProductCompare = compareProducts.find(
        (product) => this.product.totalInfo.id === product.totalInfo.id,
      );

      if (statusProductCompare) {
        this.statusCompare = true;
      }
    }
  },
  watch: {
    itemsCompare: {
      handler(value) {
        const status = value.find(
          (elem) => elem.totalInfo.id === this.product.totalInfo.id,
        );

        if (!status) {
          this.statusCompare = false;
        }

        setTimeout(() => {
          if (value.length !== 3) {
            this.maxNumberProductCompare = false;
          } else {
            this.maxNumberProductCompare = true;
          }
        }, 1000);
      },
    },
    product: {
      handler() {
        const status = this.itemsCompare.find(
          (elem) => elem.totalInfo.id === this.product.totalInfo.id,
        );

        if (!status) {
          this.statusCompare = false;
        } else {
          this.statusCompare = true;
        }
      },
    },
  },
  methods: {
    showComparePopup() {
      if (this.actualLang.index === 'ru') {
        this.$store.commit('basket/SET_POPUP', {
          success: true,
          text: 'Вы не можете добавить к сравнению более 3 товаров.',
        });
      } else {
        this.$store.commit('basket/SET_POPUP', {
          success: true,
          text: 'Ви не можете додати до порівняння більше 3 товарів',
        });
      }
    },
    handlerCompare() {
      const { id: productId } = this.product.totalInfo;
      const statusProductCompare = this.itemsCompare.find(
        (item) => item.totalInfo.id === productId,
      );

      if (this.statusCompare && !statusProductCompare) {
        this.$store.dispatch('categoryItem/getProduct', {
          id: productId,
          cb: (product) => {
            const compareProducts = JSON.parse(
              localStorage.compareProducts || '[]',
            );

            compareProducts.push(product);

            localStorage.compareProducts = JSON.stringify(compareProducts);
          },
        });
      } else {
        this.$store.commit(
          'categoryItem/DELETE_MODEL_COMPARE',
          Number(productId),
        );

        if (localStorage.compareProducts) {
          const compareProducts = JSON.parse(localStorage.compareProducts);

          const activeProductsForCompare = compareProducts.filter(
            (product) => productId !== product.totalInfo.id,
          );

          localStorage.compareProducts = JSON.stringify(
            activeProductsForCompare,
          );
        }
      }
    },
    renderProductPrice(product) {
      let price;

      this.selected === staticText.product.selectCurrency.ru[0] ||
      this.selected === staticText.product.selectCurrency.ua[0]
        ? ((price = product.priceUAH), (this.productCurrency = 'грн'))
        : this.selected === staticText.product.selectCurrency.ru[2] ||
          this.selected === staticText.product.selectCurrency.ua[2]
        ? ((price =
            product.priceUAH / this.exchange.eur.toString().slice(0, 5)),
          (this.productCurrency = '€'))
        : ((price =
            product.priceUAH / this.exchange.usd.toString().slice(0, 5)),
          (this.productCurrency = '$'));

      if (price) {
        return price.toFixed(2);
      }
    },
    openModal() {
      this.$refs.PopupsShops.modalOpened();
    },
    addToBasket(item) {
      if (this.countProduct >= 1) {
        this.$store.dispatch('basket/getProduct', {
          id: item.id,
          cb: (data) => {
            this.$store.commit(
              'basket/DIFF_FROM_TOTAL_PRICE',
              item.addedToBasket * item.priceUAH,
            );

            let { addedToBasket, sale, priceUAH, id } = data.totalInfo;
            let flag = true;
            const productBasket = JSON.parse(
              localStorage.productBasket || '[]',
            );

            this.basket.forEach((elem, index) => {
              if (id === elem.totalInfo.id) {
                flag = false;
                elem.totalInfo.addedToBasket += Number(this.countProduct);
                this.$store.commit(
                  'basket/APPEND_TOTAL_PRICE',
                  sale
                    ? sale * Number(this.countProduct)
                    : priceUAH * Number(this.countProduct),
                );

                productBasket[index].addedToBasket =
                  elem.totalInfo.addedToBasket;

                try {
                  localStorage.productBasket = JSON.stringify(productBasket);
                } catch (e) {
                  alert('Очистите LocalStorage.');
                }

                return;
              }
            });

            if (flag) {
              data.totalInfo.addedToBasket += Number(this.countProduct);
              const addedProduct = {
                id: data.totalInfo.id,
                addedToBasket: data.totalInfo.addedToBasket,
              };

              productBasket.push(addedProduct);
              try {
                localStorage.productBasket = JSON.stringify(productBasket);
              } catch (e) {
                alert('Очистите LocalStorage.');
              }

              this.$store.commit('basket/UPDATE_BASKET', data);
              this.$store.commit(
                'basket/APPEND_TOTAL_PRICE',
                data.totalInfo.sale
                  ? data.totalInfo.sale * Number(this.countProduct)
                  : data.totalInfo.priceUAH * Number(this.countProduct),
              );
            }
          },
        });
      } else {
        this.statusPopup = true;
      }
    },
    inBasketIds(id) {
      let inBasket = false;

      this.basket.forEach((e) => {
        if (e.totalInfo.id === id) {
          inBasket = true;
        }
      });

      return inBasket;
    },
  },
};
</script>

<style lang="scss">
.card__product-filter-wrapper {
  display: flex;
}
.card__product-filter {
  display: flex;
  font-family: 'MagistralC';
  font-size: 10px;
  line-height: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9b9b9b;
  padding-bottom: 16px;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
  max-width: 268px;
  margin-bottom: -8px;
}
.card__product-filter-item_silver {
  border: 1px solid #9b9b9b;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  height: fit-content;
}
.card__product-filter-item_red {
  padding: 8px;
  margin-right: 8px;
  color: #ff0000;
  margin-bottom: 8px;
  border: 1px solid #ff0000;
  height: fit-content;
}

.card__product-suptitle {
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
  padding-bottom: 8px;
}
.card__product-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  .card__product-title {
    max-width: 300px;
  }
}
.display__block {
  display: block;
}
.card__product-title {
  font-family: 'MagistralC';
  font-size: 24px;
  line-height: 27px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
}
.card__product-rating-wrapper {
  display: flex;
}
.card__product-title-rating {
  font-family: 'MagistralC';
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
  color: #dcc488;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
  max-width: 148px;
  width: 100%;
  text-align: right;
  word-break: normal;
}
.padding-left__none {
  padding-left: 0;
}
.padding-right__none {
  padding-right: 0;
}

.card__product-price {
  display: flex;
  padding-bottom: 25px;
}
.card__product-price-left {
  padding-right: 55px;
}
.card__product-price-value-wrapper {
  display: flex;
}
.card__product-price-value-strikethrough {
  font-family: 'MagistralC';
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.02em;
  text-decoration-line: line-through;
  color: #9b9b9b;
  font-weight: bold;
  padding-right: 16px;
}
.card__product-price-value {
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  padding-bottom: 4px;
  font-weight: bold;
  & span {
    padding-left: 5px;
  }
}
.card__product-price-retail {
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
}
.card__product-price-line {
  width: 1px;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.3);
}
.card__product-price-right {
  padding-left: 18px;
  padding-top: 4px;
}
.card__product-price-valuta {
  font-family: 'MagistralC';
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1d1d1d;
  font-weight: bold;
  .v-select {
    .vs__dropdown-toggle {
      width: 100px;
      height: 25px;
      border: none;
      .vs__actions {
        position: relative;
        margin-right: 10px;
        &::after {
          position: absolute;
          font-size: 9px;
          color: #1d1d1d;
          content: '\e92e';
          font-family: 'icomoon';
          top: 5px;
          left: 0px;
          /* z-index: 2; */
        }
        & svg {
          display: none;
        }
      }
      .vs__selected-options {
        .vs__selected {
          font-family: 'MagistralC';
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .vs__search::placeholder {
          font-weight: bold;
          font-family: 'MagistralC';
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      }
    }
    .vs__dropdown-menu {
      background: #1d1d1d;
      color: $white;
      min-width: 100px;
      padding: 0px;
      width: 100px !important;
      box-shadow: none;
      border: none;
      .vs__dropdown-option {
        color: $white;
        padding-left: 10px;
      }
      .vs__dropdown-option--highlight {
        background: $gold;
        color: #fff;
      }
    }
  }
}
.card__product-characteristic {
  .card__product-form {
    .models__item-add_projects {
      position: relative;
      font-family: 'MagistralC';
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #a12c3a;
      background-color: transparent;
      font-weight: bold;
      border: 1px solid #a12c3a;
      border-radius: 4px;
      padding: 12px 22px 10px 22px;
      outline: none;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: $main;
        color: #fff;
      }
      &:active {
        background-color: $black;
        color: $white;
        border: 1px solid $black;
      }
    }
    & form {
      display: flex;
      & input[type='number'] {
        border: 1px solid #1d1d1d;
        border-radius: 4px;
        outline: none;
        font-family: 'MagistralC';
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.02em;
        color: #1d1d1d;
        font-weight: bold;
        padding: 14px;
        padding-right: 0px;
        text-align: center;
        max-width: 65px;
        width: 100%;
        margin-right: 24px;
      }
      & input[type='checkbox'] {
        margin-left: 27px;
        align-self: center;
        cursor: pointer;
      }
      & label {
        align-self: center;
        padding-left: 30px;
        font-size: 13px;
        line-height: 18px;
        color: #1d1d1d;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 980px) {
  .card__product-characteristic {
    .card__product-form {
      & form {
        & input[type='number'] {
          padding-right: 14px;
        }
      }
    }
  }
}
@media (max-width: 604px) {
  .card__product-filter-wrapper {
    flex-wrap: wrap;
    justify-content: center;
    .card__product-filter {
      max-width: none;
    }
    .card__product-filter-box {
      margin-left: 0px;
      margin-bottom: 10px;
      margin-right: auto;
    }
  }
  .card__product-title-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    .card__product-title {
      margin-right: 20px;
    }
    .card__product-title-rating {
      padding-left: 0px;
      text-align: left;
    }
  }
}
@media (max-width: 468px) {
  .card__product-title-wrapper {
    padding-bottom: 0px;
    .card__product-title {
      margin-bottom: 10px;
    }
  }
}
@media (max-width: 466px) {
  .card__product-price-left {
    padding-right: 20px;
  }
}
@media (max-width: 400px) {
  .card__product-characteristic {
    .card__product-form {
      & form {
        flex-wrap: wrap;
        & label {
          padding-left: 0px;
          margin-top: 20px;
          margin-right: auto;
        }
      }
    }
  }
}
@media (max-width: 350px) {
  .card__product-characteristic {
    .card__product-form {
      & form {
        .models__item-add_projects {
          padding: 12px 7px;
        }
      }
    }
  }
}
</style>

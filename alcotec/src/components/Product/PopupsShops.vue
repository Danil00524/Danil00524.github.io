<template>
  <div>
    <v-dialog v-model="dialog" max-width="810px">
      <div class="module__where-to-buy">
        <a class="module__enter-client-close" @click="dialog = false"></a>
        <div class="module__where-to-buy-inner">
          <div class="module__where-to-buy-title">
            <span>{{ staticText.text.whereToBuy[actualLang.index] }}</span>
            {{ product.totalInfo.title }}
          </div>
          <div class="module__where-to-buy-subtitle">
            <div
              v-if="product.totalInfo.sale"
              class="card__product-price-value-wrapper"
            >
              <div class="card__product-price-value-strikethrough">
                {{ product.totalInfo.priceUAH }}
                <span>грн</span>
              </div>
              <div class="card__product-price-value">
                {{ product.totalInfo.sale }}
                <span>грн</span>
              </div>
            </div>

            <div v-else class="card__product-price-value">
              {{ product.totalInfo.priceUAH }}
              <span>грн</span>
            </div>
          </div>

          <div v-for="items in product.totalInfo.otherShops" :key="items.id">
            <div class="module__where-to-buy-item">
              <div class="module__where-to-buy-logo">
                <img :src="`${baseDomainImg}${items.imgShops}`" />
              </div>
              <div class="module__where-to-buy-name">
                <span>{{ items.nameShops[actualLang.index] }}</span>
              </div>
              <div class="module__where-to-buy-btn">
                <a target="_blank"
                   :href="items.url"
                > {{ staticText.btns[2][actualLang.index] }}
                </a>
              </div>
            </div>
            <div class="module__where-to-buy-line"></div>
          </div>

          <div class="module__where-to-buy-fast-buy">
            <form class="module__where-to-buy-fast-buy-form" @submit.prevent="fastBuy">
              <label class="module__where-to-buy-fast-buy-phone">
                <TheMask
                  v-model="dataSend.phone"
                  mask="+38 (0##) ### ## ##"
                  type="tel"
                  pattern="\D38 \D[0-9]{3}\D [0-9]{3} [0-9]{2} [0-9]{2}"
                  placeholder="+38 (050) 050 50 50"
                  required
                />
                <p v-if="errorValidate.phone" class="error-validate">
                  {{ errorValidate.phone }}
                </p>
              </label>
              <div class="module__where-to-buy-btn fast-buy-submit">
                <button
                  type="submit"
                  class="fast-buy-submit-btn"
                >
                  {{ staticText.fastBuy.btn[actualLang.index] }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="answerPopupFastBuy" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ answerPopupFastBuyMessage[actualLang.index] }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="answerPopupFastBuy = false">
            {{ staticText.btns[1][actualLang.index] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { TheMask } from 'vue-the-mask';
import { staticText } from '../../i18n';
import { baseDomainImg } from '../../constans';
import { store } from '../../store';


export default {
  name: 'PopupsShops',
  components: {
    TheMask,
  },
  data() {
    return {
      dialog: false,
      staticText,
      baseDomainImg,
      isLoading: false,
      answerPopupFastBuyMessage: {},
      answerPopupFastBuy: false,
      errorValidate: {
        phone: '',
      },
      dataSend: {
        url: '',
        phone: '',
        product: {
          id: '',
          name: '',
          price: '',
        },
      },
    };
  },
  computed: {
    ...mapState({
      product: (state) => state.products.product,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    modalOpened() {
      this.dialog = true;
    },
    fastBuy() {
      this.isLoading = true;
      if (!this.dataSend.phone.includes('+')) {
        const slicePhone = `+380${this.dataSend.phone}`;

        this.$set(this.dataSend, 'phone', slicePhone);
      }
      this.$set(this.dataSend, 'url', this.$route.fullPath);
      this.$set(this.dataSend.product, 'id', this.product.totalInfo.id);
      this.$set(this.dataSend.product, 'name', this.product.totalInfo.title);
      this.$set(this.dataSend.product, 'price', this.product.totalInfo.priceUAH);
      store.dispatch('users/fastBuy', {
        data: this.dataSend,
        cb: (data) => {
          if (data.success) {
            this.answerPopupFastBuyMessage = this.staticText.fastBuy.success;
            this.isLoading = false;
            this.answerPopupFastBuy = true;
          } else {
            this.answerPopupFastBuyMessage = data.message;
            this.isLoading = false;
            this.answerPopupFastBuy = true;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.module__where-to-buy {
  max-width: 810px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}
.module__where-to-buy-inner {
  padding: 46px 40px 22px 40px;
}
.module__enter-client-close {
  display: block;
  position: sticky;
  top: 0;
  &::before {
    top: 24px;
    right: 24px;
    content: '\e913';
    font-family: 'icomoon';
    color: #9b9b9b;
    font-size: 32px;
    /* position: absolute; */
  }
}
.module__where-to-buy-title {
  font-family: 'MagistralC';
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
  padding-bottom: 16px;
}
.module__where-to-buy-subtitle {
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  color: #9b9b9b;
  padding-bottom: 16px;
}
.module__where-to-buy-item {
  display: flex;
  padding: 24px 0;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.module__where-to-buy-btn {
  padding-top: 0;
  & a, button {
    border: 1px solid #a12c3a;
    border-radius: 4px;
    padding: 12px 16px 10px;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    user-select: none;

    &:hover {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
}
.module__where-to-buy-logo {
  max-width: 85px;
  width: 100px;
  text-align: center;
}
.module__where-to-buy-name {
  margin: 0 24px;
  max-width: 297px;
  width: 100%;
  & span {
    display: block;
    text-align: left;
  }
}
.module__where-to-buy-line {
  background-color: rgba(0, 0, 0, 0.1);
  max-width: 730px;
  width: 100%;
  height: 1px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.module__where-to-buy-fast-buy {
  & .module__where-to-buy-fast-buy-form {
    display: flex;
    padding: 24px 0;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    & .fast-buy-submit{
      & .fast-buy-submit-btn{
        width: 288px;
      }
    }
  }
  .error-validate {
    color: red;
    margin-left: 17px;
    padding-bottom: 20px;
    margin-top: -15px;
  }
  &-phone {
    border: 1px solid #9b9b9b;
    border-radius: 4px;
    color: #1d1d1d;
    outline: none;
    display: block;
    caret-color: #dcc488;
    padding: 12px 16px 10px;
    font-size: 13px;
    line-height: 15px;
    width: 300px;
  }

}

@media (max-width: 850px) {
  .module__where-to-buy-item {
    flex-direction: column;
    .module__where-to-buy-logo {
      margin-bottom: 10px;
    }
    .module__where-to-buy-name {
      margin-bottom: 10px;
      & span {
        text-align: center;
      }
    }
  }
  .module__where-to-buy-fast-buy {
    & .module__where-to-buy-fast-buy-form {
      flex-direction: column;
      & .fast-buy-submit{
        margin-top: 20px;
        & .fast-buy-submit-btn{
          width: 288px;
        }
      }
    }
    &-phone {
      width: 288px;
    }
  }
}
@media (max-width: 500px) {
  .module__enter-client-close {
    &::before {
      top: 5px;
      right: 5px;
    }
  }
  .card__product-price-value {
    font-size: 18px;
  }
  .module__where-to-buy-name {
    margin: 0px;
  }
  .module__where-to-buy-fast-buy {
    margin-bottom: 30px;
    & .module__where-to-buy-fast-buy-form {
      flex-direction: column;
      & .fast-buy-submit{
        width: 100%;
        & .fast-buy-submit-btn{
          width: 100%;
        }
      }
    }
    &-phone {
      width: 100%;
    }
  }
}
</style>

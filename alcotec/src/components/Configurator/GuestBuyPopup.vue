<template>
  <div>
    <v-dialog v-model="guestPopupStatus" max-width="810px">
      <div class="module__guest-buy">
        <a class="module__enter-client-close" @click="changeGuestPopup"></a>
        <div class="module__guest-buy-inner">
          <div class="module__guest-buy-title">
            <span>{{ staticText.guestBuy.title[actualLang.index] }}</span>
            {{ total }} грн.
          </div>

          <div class="module__guest-buy-content">
            <form class="module__guest-buy-form" @submit.prevent="guestBuy">
              <label class="module__guest-buy-input-name">
                {{ staticText.guestBuy.name[actualLang.index] }}
                <input
                  v-model="dataSend.name"
                  type="text"
                  autocomplete="on"
                />
              </label>
              <label class="module__guest-buy-input-phone">
                {{ staticText.guestBuy.phone[actualLang.index] }}
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
              <label class="module__guest-buy-input-email">
                {{ staticText.guestBuy.email[actualLang.index] }}
                <input
                  v-model="dataSend.email"
                  type="email"
                  autocomplete="on"
                />
              </label>
              <label class="module__guest-buy-input-address">
                {{ staticText.guestBuy.address[actualLang.index] }}
                <input
                  v-model="dataSend.address"
                  type="text"
                  autocomplete="on"
                />
              </label>
              <label class="module__guest-buy-input-text">
                {{ staticText.guestBuy.text[actualLang.index] }}
                <textarea
                  v-model="dataSend.text"
                  rows="2"
                  class="form__textarea"
                ></textarea>
              </label>
              <div class="module__guest-buy-btn">
                <button
                  type="submit"
                  class="guest-buy-submit-btn"
                >
                  {{ staticText.guestBuy.btn[actualLang.index] }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="answerGuestBuy" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ answerPopupGuestBuyMessage[actualLang.index] }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="answerGuestBuy = false">
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
  name: 'GuestBuyPopup',
  components: {
    TheMask,
  },
  props: {
    productsGuest: {
      type: Array,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      staticText,
      baseDomainImg,
      isLoading: false,
      answerPopupGuestBuyMessage: {},
      answerGuestBuy: false,
      errorValidate: {
        phone: '',
      },
      dataSend: {
        name: '',
        email: '',
        phone: '',
        address: '',
        text: '',
        products: {},
      },
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      guestPopupStatus: (state) => state.users.guestPopupStatus,
    }),
  },
  methods: {
    changeGuestPopup() {
      this.$store.commit('users/CHANGE_GUEST_POPUP');
    },
    guestBuy() {
      this.isLoading = true;
      if (!this.dataSend.phone.includes('+')) {
        const slicePhone = `+380${this.dataSend.phone}`;

        this.$set(this.dataSend, 'phone', slicePhone);
      }
      this.dataSend.products = this.productsGuest;
      store.dispatch('users/guestBuy', {
        data: this.dataSend,
        cb: (data) => {
          if (data.success) {
            this.answerPopupGuestBuyMessage = this.staticText.fastBuy.success;
            this.changeGuestPopup();
            this.isLoading = false;
            this.answerGuestBuy = true;
            this.$store.commit('basket/SET_BASKET', []);
            this.$store.commit('basket/SET_TOTAL_PRICE');
          } else {
            this.answerPopupGuestBuyMessage = data.message;
            this.changeGuestPopup();
            this.isLoading = false;
            this.answerGuestBuy = true;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.module__guest-buy {
  max-width: 810px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}
.module__guest-buy-inner {
  padding: 46px 40px 22px 40px;
}
.module__enter-client-close {
  display: block;
  position: relative;
  &::before {
    top: 24px;
    right: 24px;
    content: '\e913';
    font-family: 'icomoon';
    color: #9b9b9b;
    font-size: 32px;
    position: absolute;
  }
}
.module__guest-buy-title {
  font-family: 'MagistralC';
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
  padding-bottom: 16px;
}

.module__guest-buy-btn {
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
.module__guest-buy-form {
  display: flex;
  flex-wrap: wrap;
  label[class^="module__guest-buy-input-"] {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
    & input {
      width: 100%;
      margin-bottom: 24px;
      margin-top: 8px;
      /* max-width: 520px; */
      border: 1px solid #9b9b9b;
      border-radius: 4px;
      padding: 10px;
      font-size: 14px;
      line-height: 18px;
      color: #1d1d1d;
      outline: none;
      display: block;
      caret-color: #dcc488;
    }
  }
  label.module__guest-buy-input-text{
    width: 100%;
    .form__textarea{
      width: 100%;
      margin-bottom: 24px;
      margin-top: 8px;
      /* max-width: 520px; */
      border: 1px solid #9b9b9b;
      border-radius: 4px;
      padding: 10px;
      font-size: 14px;
      line-height: 18px;
      color: #1d1d1d;
      outline: none;
      display: block;
      caret-color: #dcc488;
    }
  }
  div.module__guest-buy-btn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

@media (max-width: 850px) {

}
@media (max-width: 500px) {
  .module__guest-buy-form {
    label[class^="module__guest-buy-input-"] {
      width: 100%;
      padding: 0;
      & input {
        width: 100%;
      }
    }
    div.module__guest-buy-btn{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

}
</style>

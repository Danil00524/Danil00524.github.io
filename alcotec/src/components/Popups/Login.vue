<template>
  <div>
    <PasswordRecovery ref="PasswordRecovery" />
    <v-dialog v-model="mainPopupLogin" max-width="520px">
      <div class="module__enter-client">
        <a
          class="module__enter-client-close"
          @click="mainPopupLogin = false"
        ></a>
        <div class="module__enter-client-inner">
          <div class="module__enter-client-title">
            {{ staticText.login.logTitle[actualLang.index] }}
          </div>
          <form @submit.prevent="submitLogin">
            <label class="module__enter-client-input-login">
              {{ staticText.login.loginText[actualLang.index] }}
              <input
                v-model="userData.email"
                type="text"
                autocomplete="on"
                required
              />
            </label>
            <label class="module__enter-client-input-password-incorrect">
              {{ staticText.login.passwordText[actualLang.index] }}
              <input v-model="userData.password" type="password" required />
            </label>
            <span @click="passRecovery">
              <a @click="changeStatusLoginPopup">
                {{ staticText.login.recoveryPass[actualLang.index] }}
              </a>
            </span>
            <label class="module__enter-client-input-btn">
              <input
                type="submit"
                :value="staticText.login.entrance[actualLang.index]"
              />
            </label>
          </form>
          <div class="module__enter-client-application">
            {{ staticText.login.forClient[actualLang.index] }}
            <span @click="changeStatusLoginPopup">
              <router-link :to="{ name: 'registration' }">
                {{ staticText.login.forReg[actualLang.index] }}
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </v-dialog>
    <v-dialog v-model="popupFailure" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ popupText }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="popupFailure = false">
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
import { store } from '../../store';

import { staticText } from '../../i18n';
import PasswordRecovery from './PasswordRecovery.vue';

export default {
  name: 'Login',
  components: {
    PasswordRecovery,
  },
  data() {
    return {
      popupFailure: false,
      popupText: '',
      mainPopupLogin: false,
      isLoading: false,
      userData: {
        email: '',
        password: '',
      },
      staticText,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    changeStatusLoginPopup() {
      this.mainPopupLogin = !this.mainPopupLogin;
    },
    submitLogin() {
      this.isLoading = true;
      this.changeStatusLoginPopup();
      store.dispatch('users/loginUser', {
        data: this.userData,
        cb: (data) => {
          this.popupText = data.text;
          if (data.success) {
            this.isLoading = false;
            try {
              localStorage.alcotecUserInfo = JSON.stringify(data);
            } catch (e) {
              alert('Очистите LocalStorage.');
            }
            this.$store.commit('users/SET_LOGIN_USER', data);
          } else {
            this.isLoading = false;
            this.popupFailure = true;
          }
        },
      });
    },
    passRecovery() {
      this.$refs.PasswordRecovery.openRecovery();
    },
  },
};
</script>

<style scoped lang="scss">
.module__enter-client {
  background-color: #fff;
  .module__enter-client-inner,
  .module__recovery-password-inner,
  .module__thanks-inner {
    padding: 60px 48px 48px 48px;
    & form {
      & label {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        text-transform: uppercase;
        color: #9b9b9b;
        width: 57px;
        height: 18px;
        padding-left: 20px;
        & input {
          display: block;
          margin-bottom: 18px;
          margin-top: 6px;
          max-width: 424px;
          width: 100%;
          padding: 17px;
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
          outline: none;
          border: 1px solid #9b9b9b;
          border-radius: 4px;
          caret-color: #dcc488;
          &:focus {
            border: 1px solid #dcc488;
          }
        }
      }
      .module__enter-client-input-password {
        & input {
          margin-bottom: 8px;
        }
      }
      .module__enter-client-input-password-incorrect {
        position: relative;
        & input {
          border: 1px solid #9b9b9b;
        }
      }
      .module__enter-client-input-btn {
        & input[type='submit'] {
          border: 1px solid #a12c3a;
          border-radius: 4px;
          font-family: 'MagistralC';
          font-size: 15px;
          line-height: 17px;
          text-align: center;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a12c3a;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: #1d1d1d;
            color: #fff;
            border: 1px solid #1d1d1d;
          }
        }
      }
      & a {
        margin-bottom: 26px;
        padding-left: 20px;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #1d1d1d;
        transition: all 0.3s;
        &:hover {
          color: #a12c3a;
        }
      }
    }
    .module__enter-client-application {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
      & span {
        & a {
          font-family: 'MagistralC';
          font-size: 16px;
          line-height: 18px;
          color: #a12c3a;
          padding-left: 16px;
          transition: all 0.3s;
          &:hover {
            color: #1d1d1d;
          }
        }
      }
    }
  }
  .module__enter-client-close {
    cursor: pointer;
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
    &:hover:before {
      transition: all 0.3s;
      color: #000;
    }
  }
  .module__enter-client-title,
  .module__recovery-password-title,
  .module__thanks-title {
    font-family: 'MagistralC';
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    text-align: center;
    padding-bottom: 48px;
    font-weight: bold;
  }
  .module__recovery-password-title {
    padding-bottom: 16px;
  }
  .module__recovery-password-subtitle,
  .module__thanks-subtitle {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #9b9b9b;
    padding-bottom: 42px;
  }
  .module__thanks-subtitle {
    padding-bottom: 0;
  }
}

@media (max-width: 535px) {
  .module__enter-client .module__enter-client-inner {
    padding: 46px;
  }
}
@media (max-width: 488px) {
  .module__enter-client .module__enter-client-inner {
    .module__enter-client-application {
      & span {
        display: block;
        & a {
          padding-left: 0px;
        }
      }
    }
  }
}
</style>

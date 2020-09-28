<template>
  <div>
    <RecoverySuccess ref="RecoverySuccess" />
    <v-dialog v-model="dialog" max-width="520px">
      <div class="module__recovery-password">
        <a class="module__enter-client-close" @click="dialog = false"></a>
        <div class="module__recovery-password-inner">
          <div class="module__recovery-password-title">
            {{ staticText.passwordRecovery.popupTitle[actualLang.index] }}
          </div>
          <div class="module__recovery-password-subtitle">
            {{ staticText.passwordRecovery.popupText[actualLang.index] }}
          </div>
          <form @submit.prevent="submitRecoveryPopup">
            <label class="module__recovery-password-input-login">
              {{ staticText.passwordRecovery.emailText[actualLang.index] }}
              <input
                v-model="userEmail"
                type="text"
                autocomplete="on"
                required
              />
            </label>
            <label class="module__recovery-password-input-btn">
              <input
                type="submit"
                :value="staticText.passwordRecovery.sendText[actualLang.index]"
              />
            </label>
          </form>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="popup.failurePopup" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ popup.text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="popup.failurePopup = false">
            {{ staticText.btns[1][actualLang.index] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="popup.isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RecoverySuccess from './RecoverySuccess.vue';
import { staticText } from '../../i18n';

export default {
  name: 'PasswordRecovery',
  components: {
    RecoverySuccess,
  },
  data() {
    return {
      userEmail: '',
      dialog: false,
      popup: {
        isLoading: false,
        text: '',
        failurePopup: false,
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
    openRecovery() {
      this.dialog = true;
    },
    submitRecoveryPopup() {
      this.popup.isLoading = true;

      this.$store.dispatch('users/recoveryPassword', {
        email: this.userEmail,
        cb: (data) => {
          this.popup.text = data.text;

          if (data.success) {
            this.dialog = false;
            this.popup.isLoading = false;
            this.$refs.RecoverySuccess.successRecovery();
          } else {
            this.popup.isLoading = false;
            this.popup.failurePopup = true;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.module__enter-client,
.module__recovery-password,
.module__thanks {
  border-radius: 1px;
  max-width: 520px;
  width: 100%;
  background-color: #fff;
}
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
        margin-bottom: 48px;
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
          transition: all 0.3s;
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
        transition: all 0.3s;
      }
    }
  }
}
.module__recovery-password-inner {
  padding: 60px 48px 60px 48px;
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
        margin: 0 auto;
        margin-bottom: 32px;
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
      }
    }
    .module__recovery-password-input-btn {
      padding: 0;
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
        margin: 0;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: $black;
          color: $white;
          border: 1px solid $black;
        }
      }
    }
  }
}
</style>

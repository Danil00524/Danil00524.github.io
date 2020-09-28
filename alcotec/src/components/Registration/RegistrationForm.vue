<template>
  <div class="main__registration-left">
    <div class="main__registration-input">
      <div class="main__registration-input-choose">
        {{ staticText.registrationForm.regTitle[actualLang.index] }}
      </div>

      <form @submit.prevent="clickToReg">
        <vSelect
          v-model="userData.group"
          transition
          :placeholder="staticText.registrationForm.items[actualLang.index][0]"
          :searchable="false"
          :clearable="false"
          :options="staticText.registrationForm.items[actualLang.index]"
          class="main__registration-select"
        />
        <div class="main__registration-input-title">
          {{ staticText.registrationForm.allData[actualLang.index] }}
        </div>
        <label class="main__registration-name">
          {{ staticText.registrationForm.nameSurname[actualLang.index] }}
          <input
            v-model="userData.name"
            type="text"
            autocomplete="on"
            :placeholder="placeholder[actualLang.index]"
            required
          />
          <p v-if="errorValidate.name" class="error-validate">
            {{ errorValidate.name }}
          </p>
        </label>
        <label class="main__registration-phone">
          {{ staticText.registrationForm.phoneNumber[actualLang.index] }}
          <TheMask
            v-model="userData.phone"
            mask="+38 (0##) ### ## ##"
            type="tel"
            placeholder="+38 (050) 050 50 50"
            required
          />
          <p v-if="errorValidate.phone" class="error-validate">
            {{ errorValidate.phone }}
          </p>
        </label>
        <label class="main__registration-email">
          {{ staticText.registrationForm.email[actualLang.index] }}
          <input
            v-model="userData.email"
            type="email"
            autocomplete="on"
            placeholder="email@gmail.com"
            required
          />
          <p v-if="errorValidate.email" class="error-validate">
            {{ errorValidate.email }}
          </p>
        </label>
        <div class="main__registration-btn">
          <Button
            type="submit"
            class="registration_btn"
            :text="staticText.registrationForm.reg[actualLang.index]"
          />
        </div>
      </form>
    </div>

    <v-dialog v-model="popup.failurePopup" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ popup.popupText }}
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
import vSelect from 'vue-select';
import { TheMask } from 'vue-the-mask';
import Button from '../Button.vue';
import { staticText } from '../../i18n';

import 'vue-select/src/scss/vue-select.scss';

export default {
  name: 'RegistrationForm',
  components: {
    Button,
    vSelect,
    TheMask,
  },
  data() {
    return {
      popup: {
        isLoading: false,
        failurePopup: false,
        popupText: '',
      },
      userData: {
        group: staticText.registrationForm.items.ru[0],
        name: '',
        phone: '',
        email: '',
      },
      errorValidate: {
        group: '',
        name: '',
        phone: '',
        email: '',
      },
      staticText,
      placeholder: {
        ru: 'Фамилия Имя Отчество',
        ua: "Прізвище Ім'я По батькові",
      },
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    clickToReg() {
      this.popup.isLoading = true;

      if (!this.userData.phone.includes('+')) {
        const slicePhone = `+380${this.userData.phone}`;

        this.userData.phone = slicePhone;
      }

      this.$store.dispatch('users/regUser', {
        userData: this.userData,
        cb: (data) => {
          if (data.success) {
            this.popup.popupText = data.text;

            setTimeout(() => {
              this.popup.isLoading = false;
              if (data.text) {
                this.$store.commit('profiles/CHANGE_DIALOG');
              }
              this.$router.push('/');
            }, 2000);
          } else {
            setTimeout(() => {
              this.errorValidate = data.validate;
              this.popup.popupText = data.text;

              this.popup.isLoading = false;
              this.popup.failurePopup = true;
            }, 2000);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
.main__registration-left {
  .error-validate {
    color: red;
    margin-left: 17px;
    padding-bottom: 20px;
    margin-top: -15px;
  }
  max-width: 524px;
  width: 100%;
  .main__registration-input {
    .main__registration-input-choose {
      padding-bottom: 32px;
      font-size: 24px;
      line-height: 34px;
      color: #1d1d1d;
    }
    .main__registration-select {
      max-width: 520px;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
      .vs__dropdown-toggle {
        border: 1px solid #9b9b9b;
        border-radius: 4px;
        padding-bottom: 0px;
        height: 56px;
        .vs__selected-options {
          display: flex;
          height: 56px;
          align-items: center;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 15px;
          .vs__selected {
            padding-left: 12px;
            padding-right: 12px;
            margin: 0px;
            height: 56px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .vs__search {
            padding-left: 12px;
            padding-right: 12px;
            margin: 0px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: auto;
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
          }
        }
        .vs__actions {
          position: relative;
          padding-right: 30px;
          &::after {
            position: absolute;
            font-size: 10px;
            color: #1d1d1d;
            content: '\e92e';
            font-family: 'icomoon';
            top: 50%;
            transform: translateY(-50%);
            left: 0px;
            z-index: 2;
          }
          & svg {
            display: none;
          }
        }
      }
      .vs__dropdown-menu {
        .vs__dropdown-option {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .vs__dropdown-option--highlight {
          background: $gold;
          color: #fff;
        }
      }
    }
    & form {
      max-width: 520px;
      .main__registration-input-title {
        font-size: 24px;
        line-height: 33px;
        color: #1d1d1d;
        padding-top: 48px;
        padding-bottom: 32px;
      }
      & label {
        padding-left: 17px;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        text-transform: uppercase;
        color: #9b9b9b;
        & input {
          margin-bottom: 24px;
          margin-top: 8px;
          max-width: 520px;
          width: 100%;
          border: 1px solid #9b9b9b;
          border-radius: 4px;
          padding: 17px;
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
          outline: none;
          display: block;
          caret-color: #dcc488;
          &:focus {
            border: 1px solid #dcc488;
          }
        }
      }
      .main__registration-btn {
        padding-left: 0;
      }
    }
  }
}

@media (max-width: 1240px) {
  .main__registration-left {
    max-width: 100%;
    .main__registration-input {
      .main__registration-input-choose {
        text-align: center;
      }
      .main__registration-select {
        max-width: 100%;
      }
      & form {
        max-width: 800px;
        margin: 0 auto;
        .main__registration-input-title {
          text-align: center;
        }
        & label {
          & input {
            max-width: 100%;
          }
        }
        .main__registration-btn {
          text-align: center;
        }
      }
    }
  }
}

@media (max-width: 587px) {
  .main__registration-left {
    .main__registration-input {
      .main__registration-input-choose {
        padding-bottom: 24px;
        font-size: 16px;
        line-height: 24px;
      }
      & form {
        .main__registration-input-title {
          padding-bottom: 24px;
          font-size: 16px;
          line-height: 24px;
          padding-top: 24px;
        }
        .main__registration-btn {
          text-align: center;
        }
      }
    }
  }
}
@media (max-width: 470px) {
  .main__registration-left {
    .main__registration-input {
      .main__registration-input-choose {
        font-size: 19px;
      }
      & form {
        .main__registration-input-title {
          font-size: 19px;
        }
      }
    }
  }
}
@media (max-width: 450px) {
  .main__registration-left {
    .main__registration-input {
      .main__registration-select {
        .vs__dropdown-toggle {
          height: 66px;
          .vs__selected-options {
            height: 66px;
            .vs__selected {
              height: 66px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 370px) {
  .main__registration-left {
    .main__registration-input {
      .main__registration-input-choose {
        font-size: 16px;
      }
      & form {
        .main__registration-input-title {
          font-size: 16px;
        }
      }
    }
  }
}
@media (max-width: 450px) {
  .main__registration-left {
    .main__registration-input {
      .main__registration-select {
        .vs__dropdown-toggle {
          height: 86px;
          .vs__selected-options {
            height: 86px;
            .vs__selected {
              height: 86px;
            }
          }
        }
      }
    }
  }
}
</style>

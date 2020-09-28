<template>
  <section class="edit-profile">
    <RecoverySuccess ref="RecoverySuccess" />
    <div class="container">
      <form @submit.prevent="saveChanged(profile)">
        <div class="edit-profile__title-wrapper">
          <ArrowGoBack :back-route-path="backRoutePath" />
          <div class="edit-profile__title">
            {{ staticText.editPage.title[actualLang.index] }}
          </div>
          <div class="edit-profile__btn-wrapper">
            <a href type="submit">
              <Button
                class="edit-profile__btn"
                :text="staticText.editPage.saveBtn[actualLang.index]"
              />
            </a>
          </div>
        </div>
        <div class="edit-profile__main-inner">
          <div class="edit-profile__main-wrapper">
            <h2>
              {{ staticText.editPage.generalTitle[actualLang.index] }}
            </h2>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.partner[actualLang.index] }}
              </span>
              <input
                v-model="profile.partner"
                class="edit-profile__input-text"
                type="text"
                :readonly="true"
              />
              <p v-if="profileError.name" class="error-validate">
                {{ profileError.name }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.fullName[actualLang.index] }}
              </span>
              <input
                v-model="profile.fullName"
                class="edit-profile__input-text"
                type="text"
                :placeholder="placeholder[actualLang.index]"
              />
              <p v-if="profileError.fullName" class="error-validate">
                {{ profileError.fullName }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.phone[actualLang.index] }}
                <span>*</span>
              </span>
              <TheMask
                v-model="profile.phone"
                mask="+38 (0##) ### ## ##"
                class="edit-profile__input-text"
                type="tel"
                placeholder="+38 (050) 050 50 50"
                required
              />
              <p v-if="profileError.phone" class="error-validate">
                {{ profileError.phone }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.email[actualLang.index] }}
                <span>*</span>
              </span>
              <input
                v-model="profile.email"
                class="edit-profile__input-text"
                type="email"
                required
                placeholder="email@gmail.com"
              />
              <p v-if="profileError.email" class="error-validate">
                {{ profileError.email }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.address[actualLang.index] }}
              </span>
              <input
                v-model="profile.address"
                class="edit-profile__input-text"
                type="text"
              />
              <p v-if="profileError.address" class="error-validate">
                {{ profileError.address }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.minMarga[actualLang.index] }}
              </span>
              <input
                v-model="profile.minMargin"
                class="edit-profile__input-text"
                type="text"
              />
              <p v-if="profileError.minMargin" class="error-validate">
                {{ profileError.minMargin }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.manager[actualLang.index] }}
              </span>
              <input
                v-model="profile.manager"
                class="edit-profile__input-text"
                type="text"
                disabled="disabled"
              />
              <p v-if="profileError.manager" class="error-validate">
                {{ profileError.manager }}
              </p>
            </label>
          </div>
          <div class="edit-profile__main-wrapper">
            <h2>
              {{ staticText.editPage.optionProfile[actualLang.index] }}
            </h2>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.oldPassword[actualLang.index] }}
              </span>
              <input
                v-model="profile.oldPassword"
                class="edit-profile__input-text"
                type="password"
              />
              <p v-if="profileError.oldPassword" class="error-validate">
                {{ profileError.oldPassword }}
              </p>
              <p>
                {{ staticText.editPage.oldPassword.text[actualLang.index] }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.newPassword[actualLang.index] }}
              </span>
              <input
                v-model="profile.newPassword"
                class="edit-profile__input-text"
                type="password"
              />
              <p v-if="profileError.newPassword" class="error-validate">
                {{ profileError.newPassword }}
              </p>
            </label>
            <label class="edit-profile__input-wrapper">
              <span class="edit-profile__labels-text">
                {{ staticText.editPage.newPasswordAgain[actualLang.index] }}
              </span>
              <input
                v-model="profile.newPasswordAgain"
                class="edit-profile__input-text"
                type="password"
              />
              <p v-if="profileError.newPasswordAgain" class="error-validate">
                {{ profileError.newPasswordAgain }}
              </p>
            </label>
          </div>
        </div>
      </form>
    </div>
    <v-dialog v-model="failurePopup" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="failurePopup = false">
            {{ staticText.btns[1][actualLang.index] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { TheMask } from 'vue-the-mask';
import { staticText } from '../i18n';

import RecoverySuccess from '../components/Popups/RecoverySuccess.vue';
import Button from '../components/Button.vue';
import ArrowGoBack from '../components/ArrowGoBack.vue';

export default {
  name: '',
  components: {
    Button,
    RecoverySuccess,
    ArrowGoBack,
    TheMask,
  },
  props: {},
  data() {
    return {
      backRoutePath: '/',
      isLoading: false,
      text: '',
      failurePopup: false,
      profile: {
        id: null,
        partner: null,
        fullName: null,
        phone: null,
        email: null,
        address: null,
        minMargin: null,
        manager: null,
        oldPassword: null,
        newPassword: null,
        newPasswordAgain: null,
      },
      placeholder: {
        ru: 'Фамилия Имя Отчество',
        ua: "Прізвище Ім'я По батькові",
      },
      staticText,
    };
  },
  computed: {
    ...mapState({
      profileInfo: (state) => state.profiles.profileInfo,
      profileError: (state) => state.profiles.profileError,
      actualLang: (state) => state.settings.actualLang,
      statusPopupSuccess: (state) => state.profiles.editPage.statusPopupSuccess,
    }),
  },
  watch: {
    statusPopupSuccess: {
      handler(value) {
        if (value) {
          this.$refs.RecoverySuccess.successRecovery();
        }
      },
    },
    profileInfo: {
      handler(value) {
        const {
          id,
          partner,
          fullName,
          phone,
          email,
          address,
          minMargin,
          manager,
        } = value;

        this.profile.id = id;
        this.profile.partner = partner;
        this.profile.fullName = fullName;
        this.profile.phone = phone;
        this.profile.email = email;
        this.profile.address = address;
        this.profile.minMargin = minMargin;
        this.profile.manager = manager;
      },
    },
  },
  created() {
    this.$store.dispatch('profiles/getInfoProfile', { cb: () => {} });
  },
  methods: {
    saveChanged(profile) {
      this.isLoading = true;
      const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

      if (!profile.phone.includes('+')) {
        const slicePhone = `+380${profile.phone}`;

        profile.phone = slicePhone;
      }

      this.$store.dispatch('profiles/postChangedProfile', {
        token,
        profile,
        cb: (data) => {
          this.text = data.text;
          if (data.success) {
            this.isLoading = false;
            this.$store.commit('profiles/SET_PROFILE_ERROR', {});
            this.$store.commit('profiles/SET_CHANGED_PROFILE_SUCCESS');
          } else {
            this.$store.commit('profiles/SET_PROFILE_ERROR', data.messages);
            this.isLoading = false;
          }
        },
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.backRoutePath = from.path;
    });
  },
};
</script>

<style lang="scss" scoped>
.edit-profile {
  background-color: #fff;
}
.edit-profile__title-wrapper {
  max-width: 1210px;
  width: 100%;
  display: flex;
  padding-top: 48px;
  padding-bottom: 40px;
  flex-wrap: wrap;
  & .icon-arrow-back {
    font-size: 30px;
    margin-top: 3px;
    &:before {
      transition: all 0.3s;
    }
    &:hover:before {
      color: #000;
    }
  }
  .edit-profile__title {
    font-family: 'MagistralC';
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    font-weight: bold;
    padding-bottom: 32px;
    margin-right: 40px;
  }
  .edit-profile__btn-wrapper {
    margin-left: auto;
  }
}
.edit-profile__main-inner {
  max-width: 1210px;
  width: 100%;
  padding-bottom: 60px;
  display: flex;
  justify-content: space-between;
  .edit-profile__main-wrapper {
    max-width: 520px;
    width: 100%;
    & h2 {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 33px;
      color: #1d1d1d;
      padding-bottom: 32px;
    }
  }
}

.edit-profile__input-wrapper {
  width: 100%;
  & p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 0px;
    color: #9b9b9b;
    padding-left: 18px;
    margin-top: -5px;
    padding-bottom: 24px;
  }
  .error-validate {
    font-family: 'MagistralC';
    font-weight: bold;
    color: red;
  }

  & .edit-profile__labels-text {
    padding-left: 17px;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    text-transform: uppercase;
    color: #9b9b9b;
    & span {
      color: red;
    }
  }
  & .edit-profile__input-text {
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

@media (max-width: 1100px) {
  .edit-profile__main-inner {
    flex-direction: column;
  }
  .edit-profile__title-wrapper,
  .edit-profile__main-inner {
    max-width: 100%;
    .edit-profile__main-wrapper {
      max-width: 60%;
      margin: 0 auto;
    }
  }
  .edit-profile__input-wrapper {
    & .edit-profile__input-text {
      max-width: 100%;
    }
  }
}
@media (max-width: 783px) {
  .edit-profile__btn-wrapper {
    margin: 0 auto;
  }
  .edit-profile__main-inner {
    .edit-profile__main-wrapper {
      max-width: 100%;
      margin: 0;
    }
  }
}
@media (max-width: 530px) {
  .edit-profile__title-wrapper {
    .edit-profile__title {
      font-size: 20px;
      margin-right: 0px;
    }
  }
}
@media (max-width: 500px) {
  .edit-profile__input-wrapper {
    & p {
      line-height: 14px;
      margin-top: -20px;
    }
  }
}
</style>

<template>
  <div id="header" class="header">
    <dialog-login ref="Login"></dialog-login>
    <handler-save-project ref="handlerSaveProject" />
    <div class="container">
      <div class="header-currency input-text">
        <div class="header-currency-title">
          <span>
            {{ staticText.headerTexts.exchangeRate[actualLang.index] }}
          </span>
        </div>
        <div class="header-currency-item">
          <span class="header-currency-item-value">
            {{ exchange.usd.toString().slice(0, 5) }}
          </span>
          <span>
            {{ staticText.headerTexts.dollarCurrency[actualLang.index] }}
          </span>
        </div>
        <div class="header-currency-item">
          <span class="header-currency-item-value">
            {{ exchange.eur.toString().slice(0, 5) }}
          </span>
          <span>
            {{ staticText.headerTexts.euroCurrency[actualLang.index] }}
          </span>
        </div>
      </div>
      <div class="header-info">
        <div
          :class="[
            'header-info-left',
            { 'header-info-left-user': userData.isLoggedIn },
          ]"
        >
          <div v-if="userData && !userData.isLoggedIn" class="header-info-logo">
            <router-link :to="{ name: 'home' }">
              <MainLogo />
            </router-link>
          </div>
          <div
            v-else
            :class="['header-info-user', { active: showUserMenu }]"
            @click="showUserMenu = !showUserMenu"
          >
            <h1 v-if="userData">
              {{ userData.userName }}
            </h1>
            <span class="icon-user-arrow"></span>
          </div>
          <UserMenu
            v-if="userData"
            :class="{ active: showUserMenu }"
            :user-name="userData.userName"
            :user-menu-links="staticText.userMenu"
            @closeMenu="showUserMenu = false"
          />
          <div
            v-if="showUserMenu"
            class="filter_overlay"
            @click="showUserMenu = !showUserMenu"
          ></div>
        </div>

        <div v-if="mobileView" class="icons-menu" @click="showNav = !showNav">
          <span
            v-if="!showMobileBtn"
            key="menu"
            class="icon-menu-button menu"
            @click="showMobileBtn = !showMobileBtn"
          ></span>
          <span
            v-else
            key="clear"
            class="icon-category-close clear"
            @click="showMobileBtn = !showMobileBtn"
          ></span>
        </div>

        <nav
          v-if="!mobileView"
          :class="[
            'header-info-menu-nav',
            { 'header-info-menu-nav-user': userData.isLoggedIn },
          ]"
        >
          <ul>
            <li
              v-for="menuItem of staticText.headerTexts.menu"
              :key="menuItem.name"
            >
              <router-link
                v-if="onlyLoginUser(menuItem)"
                class="header-info-menu-item"
                :to="{ path: `/${menuItem.name}` }"
              >
                {{ menuItem.text[actualLang.index] }}
              </router-link>
            </li>
          </ul>
        </nav>

        <nav
          v-else
          :class="[
            'header-info-menu-nav-mobile',
            { 'header-info-menu-nav-mobile-user': userData.isLoggedIn },
            { open: showNav },
          ]"
        >
          <ul>
            <li
              v-for="menuItem of staticText.headerTexts.menu"
              :key="menuItem.name"
            >
              <router-link
                v-if="onlyLoginUser(menuItem)"
                class="header-info-menu-item"
                :to="{ path: `/${menuItem.name}` }"
              >
                <span @click="(showNav = false), (showMobileBtn = false)">
                  {{ menuItem.text[actualLang.index] }}
                </span>
              </router-link>
            </li>
          </ul>
          <div
            class="header-info-right-profile-row profile-user"
            @click="logoutUser"
          >
            <span class="icon-exit-cabinet"></span>
            <span v-if="staticText.headerTexts.profile">
              {{ staticText.headerTexts.profile.logout[actualLang.index] }}
            </span>
          </div>
          <div class="header-info-right">
            <div class="header-info-right-lang">
              <div class="header-info-right-lang-titles">
                <div class="header-info-right-lang-title">
                  <span
                    :class="{ active: actualLang.index === 'ru' }"
                    @click="
                      changeLanguage(
                        staticText.headerTexts.profile.languages[0],
                      )
                    "
                  >
                    {{ staticText.headerTexts.profile.languages[0].text }}
                  </span>
                </div>
                <div class="header-info-right-lang-title">
                  <span
                    :class="{ active: actualLang.index === 'ua' }"
                    @click="
                      changeLanguage(
                        staticText.headerTexts.profile.languages[1],
                      )
                    "
                  >
                    {{ staticText.headerTexts.profile.languages[1].text }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="header-currency">
            <div class="header-currency-title">
              <span>
                {{ staticText.headerTexts.exchangeRate[actualLang.index] }}
              </span>
            </div>
            <div class="header-currency-item">
              <span class="header-currency-item-value">
                {{ exchange.usd.toString().slice(0, 5) }}
              </span>
              <span>
                {{ staticText.headerTexts.dollarCurrency[actualLang.index] }}
              </span>
            </div>
            <div class="header-currency-item">
              <span class="header-currency-item-value">
                {{ exchange.eur.toString().slice(0, 5) }}
              </span>
              <span>
                {{ staticText.headerTexts.euroCurrency[actualLang.index] }}
              </span>
            </div>
          </div>
        </nav>

        <div
          :class="[
            'header-info-right',
            { 'header-info-right-user': userData.isLoggedIn },
          ]"
        >
          <div class="header-info-right-lang">
            <div
              class="header-info-right-lang-title"
              @click="langPanel = !langPanel"
            >
              <span>{{ actualLang.text }}</span>
              <span class="icon-languages-icon"></span>
            </div>
            <div v-if="langPanel" class="header-info-right-lang-items">
              <div
                v-for="lang in staticText.headerTexts.profile.languages"
                :key="lang.index"
                class="header-info-right-lang-items-item"
                @click="changeLanguage(lang)"
              >
                <span>{{ lang.text }}</span>
              </div>
            </div>
          </div>

          <div class="header-info-right-profile">
            <div
              v-if="userData && !userData.isLoggedIn"
              class="header-info-right-profile-row profile-logo"
              @click="$refs.Login.changeStatusLoginPopup()"
            >
              <span class="icon-cabinet-icon"></span>
              <span v-if="staticText.headerTexts.profile">
                {{ staticText.headerTexts.profile.login[actualLang.index] }}
              </span>
            </div>
            <div
              v-else
              class="header-info-right-profile-row profile-user"
              @click="logoutUser"
            >
              <span class="icon-exit-cabinet"></span>
              <span v-if="staticText.headerTexts.profile">
                {{ staticText.headerTexts.profile.logout[actualLang.index] }}
              </span>
            </div>
          </div>
          <div
            v-if="userData && userData.isLoggedIn"
            class="header-info-right-checkout"
            @click="handlerCreateNewProject"
          >
            <span class="icon-delivery-truck"></span>
            <div v-if="checkout" class="header-info-right-checkout-info">
              <span>{{ basket }}</span>
              /
              <span>{{ totalPrice }} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="statusPopup" max-width="520px">
      <div class="module__thanks">
        <span
          class="module__enter-client-close"
          @click.prevent="statusPopup = false"
        ></span>
        <div class="module__thanks-inner">
          <div class="module__thanks-title">
            {{ staticTextHeader.popupTitle[actualLang.index] }}
          </div>
          <div class="models_add__popup">
            <a @click.prevent="handlerClickTruthy">
              {{ staticTextHeader.popupTextYes[actualLang.index] }}
            </a>
            <a @click.prevent="handlerClickFalsy">
              {{ staticTextHeader.popupTextNo[actualLang.index] }}
            </a>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store';

import UserMenu from './UserMenu.vue';
import MainLogo from '../assets/img/header/main-logo.svg?inline';
import Login from './Popups/Login.vue';
import handlerSaveProject from '../helpers/handlerSaveProject.vue';

import { staticText } from '../i18n';

export default {
  name: 'Header',
  components: {
    UserMenu,
    MainLogo,
    'dialog-login': Login,
    handlerSaveProject,
  },
  data() {
    return {
      langPanel: false,
      showUserMenu: false,
      linkForLoginUser: ['price'],
      showMobileBtn: false,
      mobileView: true,
      showNav: false,
      staticText,
      statusPopup: false,
      staticTextHeader: {
        popupTitle: {
          ru: 'Вы хотите сохранить текущий проект?',
          ua: 'Ви хочете зберегти поточний проект?',
        },
        popupTextYes: {
          ru: 'Да',
          ua: 'Так',
        },
        popupTextNo: {
          ru: 'Нет',
          ua: 'Нi',
        },
      },
      project: {},
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      userData: (state) => state.users.userData,
      isLoggedIn: (state) => state.users.userData.isLoggedIn,
      checkout: (state) => state.users.checkout,
      exchange: (state) => state.settings.exchange,
      basket: (state) => {
        let counter = 0;

        state.basket.basket.forEach((e) => {
          counter += e.totalInfo.addedToBasket;
        });

        return counter;
      },
      allProductInBasket: (state) => state.basket.basket,
      totalPrice: (state) => state.basket.totalPrice,
      comment: (state) => state.basket.commentProject,
    }),
  },
  created() {
    store.dispatch('settings/getExchange');
    this.handleView();
    window.addEventListener('resize', this.handleView);

    if (localStorage.alcotecActualLang) {
      const lang = JSON.parse(localStorage.alcotecActualLang);

      localStorage.alcotecActualLang = JSON.stringify(lang);
      store.commit('settings/SET_LANG', lang);
    }
  },
  methods: {
    handlerClickFalsy() {
      this.statusPopup = false;
      this.$store.commit('basket/SET_BASKET', []);
      this.$store.commit('basket/SET_TOTAL_PRICE');
      this.$store.commit('basket/SET_COMMENT_PROJECT', '');

      localStorage.productBasket = [];
      localStorage.projectComment = '';
      localStorage.projectId = null;
      this.$router.push('/profile/configurator');
    },
    handlerCreateNewProject() {
      if (this.basket) {
        this.statusPopup = true;
      } else if (!this.basket && this.$route.path !== '/profile/configurator') {
        this.$router.push('/profile/configurator').catch((err) => {});
      } else {
        return;
      }
    },
    handlerClickTruthy() {
      this.$refs.handlerSaveProject.handlerSaveProject();

      this.statusPopup = false;
    },
    logoutUser() {
      store.dispatch('users/logoutUser', {
        cb: () => {
          try {
            localStorage.alcotecUserInfo = '';
          } catch (e) {
            alert('Очистите LocalStorage.');
          }

          if (this.$route.path !== '/') {
            this.$router.push('/');
          }
        },
      });
    },
    changeLanguage(lang) {
      try {
        localStorage.alcotecActualLang = JSON.stringify(lang);
      } catch (e) {
        alert('Очистите LocalStorage.');
      }

      store.commit('settings/SET_LANG', lang);
      this.langPanel = false;
    },
    onlyLoginUser(link) {
      if (link.name === 'catalog' && this.isLoggedIn) {
        link.name = 'profile/configurator';
      } else if (link.name === 'profile/configurator' && !this.isLoggedIn) {
        link.name = 'catalog';
      }

      return this.userData && this.userData.isLoggedIn
        ? true
        : !this.linkForLoginUser.includes(link.name);
    },
    handleView() {
      this.mobileView = window.innerWidth <= 950;
    },
  },
};
</script>

<style scoped lang="scss">
.models_add__popup {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  & a {
    text-align: center;
    max-width: 140px;
    width: 100%;
    height: 40px;
    font-size: 13px;
    line-height: 15px;
    color: #a12c3a;
    background-color: transparent;
    border: 1px solid #a12c3a;
    padding: 12px 22px 10px 22px;
    margin-right: 7.5px;

    &:hover {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
  & a:last-child {
    margin-left: 7.5px;
    margin-right: 0px;
  }
}
.header-info-right-checkout {
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
}

.filter_overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.header {
  background-color: $main;
  z-index: 2;

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .input-text {
    padding-top: 16px;
  }

  &-currency {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: $white;
    font-weight: normal;

    &-title {
      margin-right: 8px;
    }

    &-item {
      margin-left: 16px;

      &-value {
        font-weight: 600;
        margin-right: 8px;
      }
    }
  }

  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    &-left {
      position: relative;
      .userMenu {
        top: calc(100%);
      }
      &-user {
        max-width: 142.78px;
        width: 100%;
      }
    }

    .icons-menu {
      .icon-menu-button:before {
        color: $white;
        font-size: 16px;
      }
      .icon-category-close:before {
        color: $white;
        font-size: 16px;
      }
    }

    &-logo {
      padding-bottom: 12px;
    }

    &-user {
      display: flex;
      align-items: center;
      padding-top: 17px;
      padding-bottom: 13px;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      h1 {
        margin-right: auto;
        max-width: 121px;
        font-size: 16px;
        width: 100%;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
      }

      span {
        transition: all 0.6s;
        z-index: 6;
      }
      &.active {
        h1 {
          color: $gold;
          transition: all 0.6s;
        }
        span {
          transform: rotate(180deg);
          &:before {
            color: $gold;
            transition: all 0.6s;
          }
        }
      }
    }

    &-menu-nav {
      & ul {
        & li {
          color: $white;
          display: inline-block;
          .header-info-menu-item {
            color: $white;
            margin: 0 0.85vw;
            text-decoration: none;
            font-family: 'MagistralC', sans-serif;
            font-size: 16px;
            line-height: 18px;
            letter-spacing: 0.03em;
            font-weight: bold;
            transition: all 0.3s;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
    &-menu-nav-mobile {
      position: absolute;
      z-index: -1;
      top: -505px;
      left: 0;
      right: 0;
      background-color: $main;
      transition: 1s top cubic-bezier(0.075, 0.82, 0.165, 1);
      .header-info-right-profile-row {
        display: none;
      }
      & ul {
        padding: 0 24px;
        & li {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          &:last-child {
            border-bottom: 0px;
          }
          .header-info-menu-item {
            color: $white;
            text-decoration: none;
            font-family: 'MagistralC', sans-serif;
            font-size: 16px;
            line-height: 18px;
            letter-spacing: 0.02em;
            font-weight: bold;
            padding: 15px 0px;
          }
        }
      }
      .header-info-right {
        padding-top: 17px;
        padding-bottom: 24px;
        display: flex;
        justify-content: center;
        .header-info-right-lang {
          .header-info-right-lang-titles {
            display: flex;
            .header-info-right-lang-title {
              display: block;
              padding-top: 4.5px;
              padding-bottom: 4.5px;
              & span {
                font-size: 16px;
                opacity: 0.4;
                &.active {
                  opacity: 1;
                }
              }
              &:last-child {
                border-right: 0px;
                margin-left: 1.6vw;
                & span {
                  margin-right: 0;
                  margin-left: 0.7vw;
                }
              }
            }
          }
        }
      }
      .header-currency {
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
      }
    }

    .open {
      z-index: 4;
      top: 96px;
      transition: 1s top cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .userMenu {
      display: none;
    }
    .header-info-left-user {
      .userMenu {
        display: block;
      }
    }

    &-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'MagistralC', sans-serif;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.04em;
      color: $white;
      font-family: 'MagistralC', sans-serif;
      font-weight: bold;

      &-lang {
        position: relative;

        &-title {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding-right: 1.6vw;
          border-right: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
          span {
            margin-right: 0.7vw;
            text-transform: uppercase;
          }

          .icon-languages-icon:before {
            position: relative;
            top: -1px;
          }
        }

        &-items {
          width: calc(100% - 1.6vw);
          position: absolute;
          top: calc(100% + 10px);
          left: -10px;
          border-radius: 5px;
          background: $main;
          padding: 10px;
          z-index: 1;

          &-item {
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
              opacity: 0.8;
            }
            &:first-child {
              margin-bottom: 10px;
            }
          }
        }
      }

      &-profile {
        text-transform: uppercase;
        padding-left: 1.6vw;

        &-row {
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
          .icon-cabinet-icon {
            margin-right: 0.5vw;
            &::before {
              position: relative;
              top: -2px;
            }
          }
          .icon-exit-cabinet {
            margin-right: 0.5vw;
            &:before {
              font-size: 18px;
              position: relative;
              top: -2px;
            }
          }
        }
      }

      &-checkout {
        border-left: 1px solid rgba(255, 255, 255, 0.4);
        margin-left: 1.6vw;
        padding-left: 1.6vw;
        display: flex;
        align-items: center;

        .icon-delivery-truck {
          &::before {
            position: relative;
            top: -2px;
            font-size: 22px;
          }
        }

        &-info {
          margin-left: 0.7vw;
        }
      }
    }
  }
}

@media (max-width: 1352px) {
  .header-info-left {
    .userMenu {
      top: calc(100% + 38px);
    }
  }
  .header-info-menu-nav-user {
    li:last-child {
      & a {
        margin-right: 0px;
      }
    }
  }
  .header-info-user {
    padding: 11px 0;
    & .icon-user-arrow {
      z-index: 1;
    }
  }
  .header-info-right-user {
    margin-left: auto;
    padding-bottom: 16px;
    padding-left: 5px;
    .header-info-right-lang {
      margin-left: 28px;
    }
  }
}
@media (max-width: 1235px) {
  .header-info-right {
    margin-left: auto;
    padding-left: 15px;
    padding-bottom: 16px;
    .header-info-right-lang {
      margin-left: 40px;
    }
  }
  .header-info-menu-nav {
    li:last-child {
      & a {
        margin-right: 0px;
      }
    }
  }
}
@media (max-width: 1220px) {
  .header-info-right {
    padding-left: 0;
  }
}
@media (max-width: 1174px) {
  .header-info-right {
    .header-info-right-lang {
      margin-left: 0px;
    }
  }
}
@media (max-width: 950px) {
  .header-info-left {
    .userMenu {
      top: calc(100% + 0px);
    }
  }
  .header-info {
    padding: 0 9px;
  }
  .header-currency {
    display: none;
  }
  .icons-menu {
    order: -1;
  }
  .header-info-left-user {
    margin-right: auto;
    margin-left: 40px;
  }
  .header-info-logo {
    padding: 19px 0;
  }
  .header-info-user {
    padding: 27.5px 0;
  }
  .header-info-right {
    padding-bottom: 0px;
    margin-left: 0;
  }
  .header-info-right-profile {
    padding-left: 0px;
  }
  .header-info-right-lang-title {
    display: none;
  }
  .header-info-right-profile-row {
    .icon-cabinet-icon {
      margin-right: 0px;
      &::before {
        font-size: 16px;
      }
    }
  }
  .profile-logo {
    & span:last-child {
      display: none;
    }
  }
  .profile-user {
    & span:first-child {
      display: none;
    }
  }
  .header-info-right-checkout-info {
    margin-left: 1vw;
  }
}
@media (max-width: 480px) {
  .header-info .open {
    top: 76px;
  }
  .header-info-left .userMenu {
    width: 280px;
    padding: 24px 16px;
    left: -15px;
  }
  .header-info-left-user {
    max-width: 110px;
    margin-left: 15px;
    .socialLinks {
      .socialLinks-item {
        & span:last-child {
          display: none;
        }
      }
    }
  }
  .header-info {
    padding: 0px;
  }
  .header-info-logo {
    padding: 9px 0;
  }
  .header-info-user {
    padding: 26.5px 0;
    & h1 {
      font-size: 13px;
      line-height: 23px;
      letter-spacing: 0.03em;
    }
  }
  .profile-user {
    &:last-child {
      display: none;
    }
  }
  .header-info-menu-nav-mobile {
    & ul {
      padding: 0 15px;
    }
    .header-currency {
      font-size: 12px;
      display: block;
      text-align: center;
      & div:nth-child(2) {
        margin-left: 0px;
      }
      .header-currency-title {
        padding-bottom: 10px;
        margin-right: 0px;
      }
      .header-currency-item {
        display: inline-block;
      }
    }
  }
  .header-info-menu-nav-mobile-user {
    & ul li:last-child {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .header-info-right-profile-row {
      padding-top: 20px;
      padding-left: 15px;
      display: block;
    }
    .profile-user {
      display: flex;
      font-family: 'MagistralC';
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: bold;
      color: #ffffff;
      .icon-exit-cabinet {
        display: block;
      }
    }
  }
  .header-info-right-checkout-info {
    margin-left: 2vw;
  }
  .header-info-right-checkout {
    border-left: 0px;
  }
}
</style>

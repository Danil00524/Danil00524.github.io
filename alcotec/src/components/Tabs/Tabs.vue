<template>
  <div class="personal__cabinet-top" id="personal__cabinet-top">
    <div class="custom-container">
      <div class="personal__cabinet-wrapper">
        <div class="personal__cabinet-menu">
          <ul>
            <li v-for="(tab, index) in staticText.tabs" :key="index">
              <router-link
                :to="{ path: tab.path }"
                @click="currentTab = tab.name"
              >
                {{ tab.name[actualLang.index] }}
              </router-link>
            </li>
          </ul>
        </div>
        <span @click="handlerCreateNewProject">
          <Button
            class="personal__cabinet-new_project"
            :class="{
              disable: checkDisableBtn(),
            }"
            :text="staticText.btns.btnCreate[actualLang.index]"
          />
        </span>
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
            {{ staticText.popups.popupSave[actualLang.index] }}
          </div>
          <div class="models_add__popup">
            <a
              @click.prevent="handlerClickTruthy('/profile/projects/project/')"
            >
              {{ staticText.popups.popupTextYes[actualLang.index] }}
            </a>
            <a @click.prevent="handlerClickFalsy">
              {{ staticText.popups.popupTextNo[actualLang.index] }}
            </a>
          </div>
        </div>
      </div>
    </v-dialog>

    <handler-save-project ref="handlerSaveProject" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';
import Button from '../Button.vue';
import handlerSaveProject from '../../helpers/handlerSaveProject.vue';

export default {
  name: 'Tabs',
  components: {
    Button,
    handlerSaveProject,
  },
  data() {
    return {
      statusPopup: false,
      currentTab: 'Проекты',
      staticText,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      basket: (state) => state.basket.basket,
    }),
  },
  methods: {
    checkDisableBtn() {
      if ((!this.basket.length, this.$route.path !== '/profile/configurator')) {
        return false;
      }

      return true;
    },
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
    handlerClickTruthy() {
      this.$refs.handlerSaveProject.handlerSaveProject();

      this.statusPopup = false;
    },
    handlerCreateNewProject() {
      if (this.basket.length) {
        this.statusPopup = true;
      } else if (
        !this.basket.length &&
        this.$route.path !== '/profile/configurator'
      ) {
        this.$router.push('/profile/configurator').catch((err) => {});
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.personal__cabinet-top {
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
  position: relative;
}
.personal__cabinet-wrapper {
  display: flex;
  justify-content: space-between;
}

.personal__cabinet-menu {
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
  & ul {
    & li {
      display: inline-block;
      color: #9b9b9b;
      & a {
        color: #9b9b9b;
        font-family: 'MagistralC';
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        padding: 0 20px 16px 20px;
        font-weight: bold;
        border-bottom: 2px solid transparent;
        transition: all 0.3s;
        &:hover {
          color: #1d1d1d;
        }
      }
    }
    & li + li {
      margin-left: -6px;
    }
  }
}
.personal__cabinet-menu .router-link-active {
  border-bottom: 2px solid #a12c3a;
  color: #1d1d1d;
}
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
      }
    }
  }
}
.module__thanks-title {
  padding-top: 36px;
  padding-bottom: 16px;
}

@media (max-width: 1048px) {
  .personal__cabinet-menu {
    overflow-x: auto;
    margin-right: 15px;
    & ul {
      width: max-content;
      & li {
        display: inline-block;
        color: #9b9b9b;
        & a {
          color: #9b9b9b;
          font-family: 'MagistralC';
          font-size: 16px;
          line-height: 18px;
          text-align: center;
          padding: 0 20px 8px 20px;
          margin-bottom: 8px;
          font-weight: bold;
        }
      }
      & li + li {
        margin-left: -6px;
      }
    }
  }
}
@media (max-width: 980px) {
  .personal__cabinet-menu {
    &::-webkit-scrollbar {
      height: 2px;
    }
  }
}
@media (max-width: 740px) {
  .personal__cabinet-wrapper {
    flex-wrap: wrap;
    justify-content: center;
  }
  .personal__cabinet-menu {
    margin-right: 0px;
  }
  .personal__cabinet-new_project {
    margin: 20px;
  }
}
</style>

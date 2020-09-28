<template>
  <div class="main__guest-footer">
    <nav class="footer__menu">
      <ul>
        <li
          v-for="(elem, index) in staticText.additionalMenu.menu"
          :key="index"
        >
          <router-link :to="{ name: elem.name }">
            {{ elem.text[actualLang.index] }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="main__guest-bottom-location">
      <v-select
        :searchable="false"
        :clearable="false"
        :placeholder="
          staticText.additionalMenu.office.placeholder[actualLang.index]
        "
        :options="staticText.additionalMenu.office[actualLang.index]"
        @input="setOffice"
      />
    </div>
    <div class="main__guest-bottom-phone">
      <a @click.prevent="" href="#">{{ phoneNumber }}</a>
    </div>
    <div class="main__guest-bottom-copyright">
      2019 Alcotec.com.ua.
      {{ staticText.additionalMenu.footer[actualLang.index] }}
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import { mapState } from 'vuex';
import { staticText } from '../../i18n';

export default {
  name: 'AdditionalNavigation',
  components: {
    vSelect,
  },
  data() {
    return {
      phoneNumber: '+38 (044) 500-26-26',
      staticText,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    setOffice(value) {
      switch (value) {
        case 'Харків':
        case 'Харьков':
          this.phoneNumber = '+38 (057) 766-10-97';
          break;
        case 'Киев (главный офис)':
        case 'Київ (головний офіс)':
          this.phoneNumber = '+38 (044) 500-26-26';
          break;
        case 'Днепр':
        case 'Дніпро':
          this.phoneNumber = '+38 (050) 356-64-12';
          break;
        case 'Львов':
        case 'Львів':
          this.phoneNumber = '+38 (050) 443-77-31';
          break;
        case 'Тернополь':
        case 'Тернопіль':
          this.phoneNumber = '+38 (095) 831-04-73';
          break;
        case 'Кропивницкий':
        case 'Кропивницький':
          this.phoneNumber = '+38 (0522) 59-50-39';
          break;
        case 'Винница':
        case 'Вінниця':
          this.phoneNumber = '+38 (0432) 55-03-88';
          break;
        case 'Одесса':
        case 'Одеса':
          this.phoneNumber = '+38 (067) 716-60-32';
          break;
        case 'Запорожье':
        case 'Запоріжжя':
          this.phoneNumber = '+38 (061) 286-87-51';
          break;
        case 'Херсон':
          this.phoneNumber = '+38 (0552) 42-44-46';
          break;
        case 'Кременчуг':
        case 'Кременчук':
          this.phoneNumber = '+38 (097) 322-99-22';
          break;
        case 'Луцк':
        case 'Луцьк':
          this.phoneNumber = '+38 (095) 831-04-73';
          break;
        case 'Ужгород':
          this.phoneNumber = '+38 (095) 275-59-67';
          break;
        default:
          this.phoneNumber = '+38 (044) 500-26-26';
      }
    },
  },
};
</script>

<style lang="scss">
.main__guest-footer {
  background-color: #a12c3a;
  width: 100%;
  max-width: 412px;
}
.footer__menu {
  & li {
    padding-top: 24px;
    & a {
      color: #ffffff;
      font-family: 'MagistralC';
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 0.02em;
      font-weight: bold;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & li:first-child {
    padding-top: 50px;
  }
}
.main__guest-bottom-location {
  padding-top: 40px;
  .v-select {
    font-family: 'MagistralC';
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #ffffff;
    margin-left: -9px;
    font-weight: bold;
    .vs__dropdown-toggle {
      max-width: 250px;
      width: 100%;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
      .vs__actions {
        position: relative;
        margin-right: 10px;
        &::after {
          position: absolute;
          font-size: 9px;
          color: #fff;
          content: '\e92e';
          font-family: 'icomoon';
          top: 5px;
          left: 0px;
          z-index: 2;
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
          color: $white;
        }
        .vs__search::placeholder {
          font-weight: bold;
          font-family: 'MagistralC';
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: $white;
        }
      }
    }
    .vs__dropdown-menu {
      background: $main;
      color: $white;
      max-width: 250px;
      max-height: 100px;
      width: 100%;
      overflow: auto;

      scrollbar-color: #262626 #fff;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        background-color: transparent;
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba($color: #fff, $alpha: 0.8);
      }
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

.main__guest-bottom-phone {
  padding-top: 9px;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  & a {
    color: #ffffff;
    font-weight: 300;
    font-size: 24px;
    line-height: 30px;
  }
}
.main__guest-bottom-copyright {
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  padding-top: 59px;
  padding-left: 20px;
  position: relative;
  &::before {
    position: absolute;
    font-family: 'icomoon';
    content: '\e91d';
    bottom: -1px;
    left: 0;
  }
}

@media (max-width: 1200px) {
  .main__guest-footer {
    max-width: none;
    text-align: center;
    padding-bottom: 50px;
  }
  .main__guest-bottom-copyright {
    width: 269px;
    margin: 0 auto;
  }
  .main__guest-bottom-location .v-select {
    margin: 0 auto;
    max-width: 225px;
  }
}
</style>

<template>
  <section class="personal__promotions">
    <div class="custom-container">
      <div class="personal__promotions-wrapper">
        <div class="personal__promotions-title">
          {{ staticText.headerTexts.menu[1].text[actualLang.index] }}
        </div>
        <div
          class="personal__promotions-container"
          :class="{ active: isActive }"
        >
          <div class="personal__promotions-items" :class="{ active: isActive }">
            <div
              v-for="personalPromo in allPromos"
              :key="personalPromo.id"
              class="personal__promotions-item"
              :class="{ active: personalPromo.additionalInfo.open }"
            >
              <div
                class="personal__promotions-item-img"
                @click="$vuetify.goTo(target, options)"
              >
                <a @click="showSidebar(personalPromo)">
                  <img :src="`${baseDomainImg}${personalPromo.img}`" />
                </a>
              </div>
              <div class="personal__promotions-item-inner">
                <div class="personal__promotions-item-date">
                  <div class="personal__promotions-item-date-left">
                    {{ personalPromo.date[actualLang.index].start }} -
                  </div>
                  <div class="personal__promotions-item-date-right">
                    {{ personalPromo.date[actualLang.index].finish }}
                  </div>
                </div>
                <div class="personal__promotions-item-title">
                  {{ personalPromo.title[actualLang.index] }}
                </div>
                <div
                  class="personal__promotions-item-more__details"
                  @click="$vuetify.goTo(target, options)"
                >
                  <a @click="showSidebar(personalPromo)">
                    {{ staticText.btns[4][actualLang.index] }}
                  </a>
                </div>
              </div>

              <div
                v-if="personalPromo.additionalInfo.open"
                id="first"
                class="personal__promotion-right"
              >
                <div class="personal__promotion-right-wrapper">
                  <div class="personal__promotion-right-top__img">
                    <div class="personal__promotion-right-top__img-btn">
                      <button @click="closeSidebar(personalPromo)"></button>
                    </div>
                    <img :src="`${baseDomainImg}${personalPromo.img}`" />
                  </div>
                  <div class="personal__promotions-item-text">
                    <div class="personal__promotions-item-date">
                      <div class="personal__promotions-item-date-left">
                        {{ personalPromo.date[actualLang.index].start }} -
                      </div>
                      <div class="personal__promotions-item-date-right">
                        {{ personalPromo.date[actualLang.index].finish }}
                      </div>
                    </div>
                    <div class="personal__promotions-item-title">
                      {{ personalPromo.title[actualLang.index] }}
                    </div>
                    <div
                      class="personal__promotions-item-subtitle"
                      v-html="
                        personalPromo.additionalInfo.text[actualLang.index]
                      "
                    ></div>
                    <div
                      v-if="personalPromo.additionalInfo.length"
                      class="personal__promotions-item-action"
                    >
                      {{ staticText.titles.personalPromo[actualLang.index] }}
                      <ul>
                        <li
                          v-for="(items, index) in personalPromo.additionalInfo
                            .shareProduct"
                          :key="index"
                        >
                          {{ items.model }}
                          <router-link
                            :to="{
                              path: `/catalog/category/${items.categoryId}/product/${items.productId}`,
                            }"
                          >
                            {{ staticText.btns[7][actualLang.index] }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="personal__promotion-right-bottom__img">
                    <img :src="personalPromo.additionalInfo.allImg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          v-if="countPage !== 1"
          :page="page"
          :page-count="countPage"
          @paginate="paginate"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store';
import { staticText } from '../i18n';
import { baseDomainImg } from '../constans';

import Pagination from '../components/Pagination.vue';

export default {
  name: 'PersonalPromo',
  components: {
    Pagination,
  },
  data() {
    return {
      page: 1,
      isActive: false,
      staticText,
      baseDomainImg,
      type: 'selector',
      selector: '#first',
      selections: ['#first'],
      duration: 400,
      offset: 20,
    };
  },
  computed: {
    ...mapState({
      allPromos: (state) => state.personalPromo.personalPromo,
      countPage: (state) => state.personalPromo.countPage,
      actualLang: (state) => state.settings.actualLang,
    }),
    target() {
      const value = this[this.type];

      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        selector: this.selector,
        duration: this.duration,
        offset: this.offset,
      };
    },
  },
  created() {
    this.page = this.$route.hash
      ? parseInt(this.$route.hash.split('#')[1], 10)
      : 1;

    store.dispatch('personalPromo/getPersonalPromo', {
      page: this.page,
      cb: (response) => {
        const activePromo = Number(this.$route.query.promo_id);

        response.personalPromo.forEach((promo) => {
          if (activePromo === promo.id) {
            this.showSidebar(promo);
          }
        });
      },
    });
  },
  methods: {
    paginate(value) {
      switch (value) {
        case 'left':
          this.page--;
          break;
        case 'right':
          this.page++;
          break;

        default:
          this.page = value;
          break;
      }

      store.dispatch('personalPromo/getPersonalPromo', {
        page: this.page,
        cb: () => {
          this.$router.push(`/promo#${this.page}`);
          this.isActive = false;
        },
      });
    },
    showSidebar(promo) {
      this.allPromos.forEach((e) => {
        e.additionalInfo.open = false;
        this.isActive = false;
      });

      promo.additionalInfo.open = true;
      this.isActive = true;
    },
    closeSidebar(promo) {
      this.allPromos.forEach((e) => {
        e.additionalInfo.open = false;
      });

      promo.additionalInfo.open = false;
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss">
.pagination {
  margin-top: 64px;
  padding-bottom: 80px;
  & ul {
    & li {
      & a {
        font-family: 'MagistralC';
        font-weight: bold;
      }
    }
  }
}
.personal__promotions-container {
  position: relative;
  &.active {
    min-height: 1700px;
  }
}
.personal__cabinet-top {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
}
.personal__promotions-wrapper {
  padding-top: 48px;
  position: relative;
}
.personal__promotions-title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
  padding-bottom: 32px;
}
.personal__promotion-inner {
  display: flex;
  flex-wrap: wrap;
}
.personal__promotion-left {
  width: 46%;
  padding-right: 15px;
}
.personal__promotions-items {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  justify-content: space-between;
  &.active {
    width: 56%;
  }
}
.personal__promotions-item {
  background-color: #fff;
  max-width: 382px;
  width: 100%;
  margin: 0 15px;
  margin-bottom: 40px;
  border: 1px solid transparent;

  &.active {
    border: 1px solid #a12c3a;
  }
}
.personal__promotions-item-inner {
  padding: 24px;
  max-height: 202px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.personal__promotions-item-img {
  & a {
    display: flex;
    justify-content: center;
    max-width: 382px;
    max-height: 235px;
    margin: 0 auto;
  }
  & img {
    max-height: 235px;
  }
}
.personal__promotions-item-text {
  max-width: 555px;
}

.personal__promotions-item-date {
  font-weight: 600;
  font-size: 14px;
  line-height: 25px;
  text-transform: uppercase;
  color: #dcc488;
  padding-bottom: 16px;
  display: flex;
  .personal__promotions-item-date-left {
    padding-left: 30px;
    position: relative;
    white-space: nowrap;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      font-family: 'icomoon';
      content: '\e947';
      font-size: 24px;
    }
  }
  .personal__promotions-item-date-right {
    padding-left: 5px;
    white-space: nowrap;
  }
}
.personal__promotions-item-title {
  font-family: 'MagistralC';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  min-height: 68px;
  line-height: 34px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  margin-bottom: 24px;
  text-align: left;
  max-width: 463px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.personal__promotions-item-more__details {
  & a {
    font-family: 'MagistralC';
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    font-weight: bold;
    position: relative;
    padding-left: 76px;
    transition: all 0.3s;
    &:hover {
      color: #721e27;
    }
    &::before {
      position: absolute;
      content: '';
      top: 7px;
      left: 0;
      width: 60px;
      height: 1px;
      background-color: #a12c3a;
    }
  }
}
.personal__promotion-right {
  width: 38%;
  display: flex;
  top: 0;
  right: 0;
  position: absolute;
  background-color: #fff;
  padding-bottom: 30px;
  max-height: calc(100% - 40px);
}
.personal__promotion-right-wrapper {
  background-color: #fff;
  padding: 30px;
  padding-bottom: 0px;
  overflow-y: auto;
  scrollbar-color: #262626 #fff;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }

  & .checkbox:last-child {
    margin-bottom: 24px;
  }
}
.personal__promotion-right-top__img,
.personal__promotion-right-bottom__img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 555px;
  max-height: 540px;
  width: 100%;
}
.personal__promotion-right-top__img {
  margin-bottom: 30px;
}
.personal__promotion-right-top__img-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  & button {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 4px;
    width: 56px;
    height: 56px;
    position: relative;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all 0.3s;
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
    &::before {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      font-family: 'icomoon';
      content: '\e913';
      font-size: 32px;
      color: #9b9b9b;
    }
  }
}

.personal__promotions-item-subtitle,
.personal__promotions-item-action {
  font-size: 18px;
  line-height: 28px;
  color: #1d1d1d;
  padding-bottom: 32px;
  & p span {
    font-size: 18px !important;
    line-height: 28px;
    color: #1d1d1d !important;
    padding-bottom: 32px;
  }
}
.personal__promotions-item-subtitle {
  overflow-x: auto;
  scrollbar-color: #262626 #fff;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }
}
.personal__promotions-item-action {
  padding-bottom: 47px;
  & ul {
    padding-left: 20px !important;
    list-style: decimal !important;
    & li {
      padding-top: 24px;
      padding-left: 16px;
      & a {
        font-family: 'MagistralC';
        line-height: 16px;
        text-align: center;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #a12c3a;
        font-weight: bold;
        padding-left: 24px;
        transition: all 0.3s;
        &:hover {
          color: #721e27;
        }
      }
    }
  }
}

@media (max-width: 1647px) {
  .personal__promotions-items {
    justify-content: space-evenly;
  }
}
@media (max-width: 1500px) {
  .personal__promotions-items {
    &.active {
      width: 50%;
    }
  }
  .personal__promotion-right {
    width: 50%;
  }
}
@media (max-width: 1008px) {
  .personal__promotions-item-action {
    & ul {
      & li {
        & a {
          padding-left: 0px;
          display: block;
          margin-top: 10px;
          text-align: left;
        }
      }
    }
  }
}
@media (max-width: 823px) {
  .personal__promotions-items {
    margin-left: 0;
    margin-right: 0px;
    justify-content: center;
    &.active {
      width: 100%;
    }
  }
  .personal__promotions-item {
    max-width: 100%;
    position: relative;
    .personal__promotions-item-img {
      max-width: 100%;
      & a {
        max-width: 100%;
      }
    }
    .personal__promotions-item-title {
      max-width: 100%;
    }
  }
  .personal__promotion-right {
    max-height: 100%;
    z-index: 1;
    width: 100%;
    box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.1);
  }
  .personal__promotion-right-wrapper {
    width: 100%;
  }
  .personal__promotion-right-top__img {
    max-width: 100%;
  }
}
@media (max-width: 509px) {
  .personal__promotion-right-top__img-btn {
    top: 5px;
    left: 5px;
    & button {
      width: 40px;
      height: 40px;
      &:before {
        font-size: 18px;
      }
    }
  }
}
@media (max-width: 500px) {
  .personal__promotions-item {
    .personal__promotions-item-img {
      & a {
        max-height: 200px;
        & img {
          max-height: 200px;
        }
      }
    }
  }
}
@media (max-width: 415px) {
  .personal__promotions-item-date {
    font-size: 12px;
  }
  .personal__promotions-item-inner {
    max-height: 220px;
    padding: 15px;
  }
}
@media (max-width: 367px) {
  .personal__promotions-item {
    margin-left: 0px;
    margin-right: 0px;
  }
  .personal__promotions-item-title {
    font-size: 20px;
  }
  .personal__promotions-title {
    font-size: 27px;
  }
  .personal__promotions-item-action {
    & ul {
      & li {
        & a {
          font-size: 14px;
        }
      }
    }
  }
}
</style>

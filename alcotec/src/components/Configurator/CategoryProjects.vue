<template>
  <div class="configurator__position-wrapper-items">
    <div v-if="!statusProductItem" class="models__container">
      <div
        v-for="(content, index) in categoryProjects"
        :key="index"
        class="main-content_item"
        :class="{ 'main-content_item-active': content.check }"
      >
        <div class="main-content-wrapper">
          <button @click="expand(index)">
            <div class="main-content_image">
              <img :src="`${baseDomainImg}${content.img}`" alt />
              <div class="main-content-select-wrapper">
                <div class="main-content_select">
                  {{ content.title[actualLang.index] }}
                </div>
                <span class="main-content_icon icon-category-arrow"></span>
              </div>
            </div>
          </button>
        </div>

        <div :style="{ height: height[index] }" class="main-content-dropdown">
          <div
            v-for="(item, i) in content.items"
            :key="i"
            class="main-content-dropdown-content"
          >
            <a @click="goToCategory(item.id)">
              {{ item.title[actualLang.index] }} {{ `(${item.models})` }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="models__container mw-compare-btn">
      <div
        v-for="item in categoryItem"
        :key="item.id"
        class="models__item"
        :class="{ active: userData.isLoggedIn }"
      >
        <ModelItem :item="item" />
        <BtnAddToBasket
          ontouchstart=""
          v-if="userData.isLoggedIn"
          class="models__item-add_project"
          :text="staticText.categoryItem.btn[actualLang.index]"
          :item="item"
        />

        <div
          v-if="userData.isLoggedIn && mobileView"
          class="card__product-form"
        >
          <form>
            <check-box
              v-if="!maxNumberProductCompare"
              :id="'compare' + item.id"
              v-model="item.compare"
              :name="'compare' + item.id"
              :text="staticText.categoryItem.checkbox[actualLang.index]"
              :active-text="
                staticText.categoryItem.activeCheckbox[actualLang.index]
              "
              :disable="item.compare ? true : false"
            />
            <label
              v-else
              class="checkbox disable"
              @click.prevent="showComparePopup"
            >
              <div class="checkbox__disable">
                <svg class="checkbox__img" viewBox="0 0 120.4 80.2">
                  <polyline points="0,40.1 40.2,80.2 120.4,0 " />
                </svg>
              </div>
              <div class="checkbox__text">
                {{ staticText.categoryItem.checkbox[actualLang.index] }}
              </div>
            </label>
          </form>
        </div>
        <div
          class="models__item models__item-hover"
          :class="{ guest: !userData.isLoggedIn }"
        >
          <ModelItem :item="item" class="models__inner models__inner-hover" />
          <BtnAddToBasket
            v-if="userData.isLoggedIn"
            ontouchstart=""
            class="models__item-add_project"
            :text="staticText.categoryItem.btn[actualLang.index]"
            :item="item"
          />

          <div
            v-if="userData.isLoggedIn && !mobileView"
            class="card__product-form"
          >
            <form>
              <check-box
                v-if="!maxNumberProductCompare"
                :id="'compare' + item.id"
                v-model="item.compare"
                :name="'compare' + item.id"
                :text="staticText.categoryItem.checkbox[actualLang.index]"
                :active-text="
                  staticText.categoryItem.activeCheckbox[actualLang.index]
                "
                :disable="item.compare ? true : false"
              />
              <label
                v-else
                class="checkbox disable"
                @click.prevent="showComparePopup"
              >
                <div class="checkbox__disable">
                  <svg class="checkbox__img" viewBox="0 0 120.4 80.2">
                    <polyline points="0,40.1 40.2,80.2 120.4,0 " />
                  </svg>
                </div>
                <div class="checkbox__text">
                  {{ staticText.categoryItem.checkbox[actualLang.index] }}
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
      <infinite-loading
        ref="infiniteLoading"
        spinner="waveDots"
        @infinite="infiniteHandler"
      >
        <span slot="no-more"> </span>
        <span slot="no-results"> </span>
        <span slot="error"> </span>
      </infinite-loading>
      <Compare />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';
import { baseDomainImg } from '../../constans';
import InfiniteLoading from 'vue-infinite-loading';

import ModelItem from '../ModelItem.vue';
import BtnAddToBasket from '../BtnAddToBasket.vue';
import Compare from '../Compare.vue';
import CheckBox from '../CheckBox.vue';

export default {
  name: 'CategoryProjects',
  components: {
    ModelItem,
    BtnAddToBasket,
    Compare,
    CheckBox,
    InfiniteLoading,
  },
  props: {
    statusProductItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      height: [],
      staticText,
      page: 1,
      mobileView: window.innerWidth <= 980,
      baseDomainImg,
      maxNumberProductCompare: false,
    };
  },
  computed: {
    ...mapState({
      categoryProjects: (state) =>
        state.profiles.profileConfigure.categoryProjects,
      categoryItem: (state) => state.categoryItem.categoryItem.subCategory,
      userData: (state) => state.users.userData,
      actualLang: (state) => state.settings.actualLang,
      activeCheckbox: (state) => state.profiles.activeCheckboxFilter,
      goodsCompare: (state) => state.categoryItem.categoryItemCompare.products,
    }),
  },
  watch: {
    activeCheckbox: {
      handler() {
        if (this.statusProductItem) {
          this.page = 2;
          this.$nextTick(() => {
            this.$refs.infiniteLoading.stateChanger.reset();
          });
        }
      },
    },
    goodsCompare: {
      handler(value) {
        setTimeout(() => {
          if (value.length !== 3) {
            this.maxNumberProductCompare = false;
          } else {
            this.maxNumberProductCompare = true;
          }
        }, 1000);
      },
    },
  },
  methods: {
    showComparePopup() {
      if (this.actualLang.index === 'ru') {
        this.$store.commit('basket/SET_POPUP', {
          success: true,
          text: 'Вы не можете добавить к сравнению более 3 товаров.',
        });
      } else {
        this.$store.commit('basket/SET_POPUP', {
          success: true,
          text: 'Ви не можете додати до порівняння більше 3 товарів',
        });
      }
    },
    goToCategory(id) {
      this.$router.push(`${this.$route.path}/category/${id}`);
    },
    infiniteHandler($state) {
      this.$store.dispatch('categoryItem/getCategoryItem', {
        cb: (list) => {
          if (list.subCategory.length) {
            ++this.page;
            $state.loaded();
          } else {
            $state.complete();
          }
        },
        error: () => this.$router.push('/404-error'),
        categoryId: this.$route.params.categoryId,
        page: this.page,
        filter: this.$route.query,
      });
    },
    expand(i) {
      if (this.categoryProjects[i].check === false) {
        this.categoryProjects.forEach((e, index) => {
          this.height[index] = '0';
          this.categoryProjects[index].check = false;
        });

        this.categoryProjects[i].check = true;

        this.height[i] = '100%';
      } else {
        this.categoryProjects[i].check = false;

        this.height[i] = '0';
      }
    },
  },
};
</script>

<style lang="scss">
.checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__fake {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__disable {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkbox__img {
    display: block;
    width: 11px;
    height: 10px;
    stroke: $white;
    fill: none;
    stroke-width: 15px;
    stroke-dasharray: 170;
    stroke-dashoffset: 170;
  }
  &__input ~ &__disable {
    background-color: $gold;
    border: 1px solid $gold;
    .checkbox__img {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.3s;
    }
  }
  &__text {
    margin-left: 10px;
  }
}
.main-content_item {
  background: #fff;
  margin-bottom: 30px;
  margin-right: 15px;
  margin-left: 15px;
  position: relative;
  max-width: 382px;
  width: 100%;
  max-height: 250px;
  .main-content-wrapper {
    max-height: 250px;
    position: relative;
    & button {
      width: 100%;
      .main-content_image {
        max-height: 250px;
        min-height: 250px;
        position: relative;
        & img {
          max-height: 250px;
        }
        .main-content-select-wrapper {
          position: absolute;
          bottom: 0;
          max-width: 382px;
          width: 100%;
          align-items: center;
          display: flex;
          justify-content: center;
          background-color: #a12c3a;
          padding: 16px;
          transition: all 0.3s;
          &:hover {
            background-color: #80121f;
          }
          .main-content_select {
            font-family: 'MagistralC';
            font-size: 20px;
            line-height: 23px;
            text-align: center;
            color: #ffffff;
            font-weight: bold;
          }
          .main-content_icon {
            margin-left: 16px;
            height: max-content;
            transition: all 0.3s;
          }
        }
      }
    }
  }

  .main-content-dropdown {
    height: 0;
    overflow: hidden;
    width: 100%;
    .main-content-dropdown-content {
      padding-bottom: 10px;
      & a {
        font-size: 13px;
        line-height: 18px;
        color: #1d1d1d;
        transition: all 0.3s;
        &:hover {
          color: #a12c3a;
        }
      }
    }
  }
}
.main-content_item-active {
  .main-content_icon {
    transform: rotate(180deg);
  }
  .main-content-dropdown {
    transition: padding-top 0.5s;
    padding: 24px 24px 14px 24px;
    height: auto !important;
    max-height: 100%;
    overflow-y: auto;
    z-index: 1;
    position: absolute;
    background: #ffffff;

    scrollbar-color: #262626 rgba(0, 0, 0, 0.05);
    scrollbar-width: thin;

    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.08);
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

    & .checkbox:last-child {
      margin-bottom: 24px;
    }
  }
}
.models__container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -15px;
  position: relative;
  .infinity-loading {
    /* display: contents; */
  }
}
.mw-compare-btn {
  min-height: 100vh;
  div:nth-last-child(3) {
    margin-bottom: 100px;
  }
  .models__item {
    .models__item-title {
      margin-bottom: 0;
    }
  }
  .compare {
    .goods__preview {
      margin-bottom: 0;
    }
  }
}

.configurator__position-top {
  display: flex;
  flex-direction: column;
}
.configurator__position-wrapper-items {
  position: relative;
  & .infinite-status-prompt {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
  display: flex;
  flex-direction: column;
}

.models__item {
  width: 271px;
  height: 352px;
  margin-bottom: 40px;
  margin-left: 17px;
  margin-right: 17px;
  position: relative;
  border-radius: 1px;
  .models__item-add_project {
    display: none;
    white-space: nowrap;
    position: absolute;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    background-color: transparent;
    font-weight: bold;
    border: 1px solid #a12c3a;
    border-radius: 4px;
    padding: 12px 22px 10px 22px;
    outline: none;
    cursor: pointer;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    &:active {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
  .card__product-form {
    display: none;
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    & form {
      display: flex;
      justify-content: center;
      & input[type='checkbox'] {
        margin-left: 0px !important;
        padding: 0;
        align-self: center;
        cursor: pointer;
      }
      & label {
        padding-left: 11px;
        align-self: center;
        font-size: 13px;
        line-height: 18px;
        color: #1d1d1d;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
}
.models__item-hover {
  width: 303px;
  height: 453px;
  position: absolute;
  top: 0;
  left: -33px;
  transition: all 0.3s;
  z-index: 2;
  box-shadow: 4px 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}
.models__item-hover.guest {
  height: 365px;
}
.models__item:hover .models__item-hover {
  visibility: visible;
  opacity: 1;
}
.models__inner {
  display: block;
  background-color: #ffffff;
  border-radius: 1px;
  text-align: center;
  position: relative;
  padding: 24px 17px;
  width: 100%;
  height: 100%;
}
.models__inner-hover {
  max-width: 303px;
  .models__inner-wrapper-left {
    left: 24px;
  }
  .models__inner-wrapper-right {
    right: 24px;
  }
}

.models__item-hover {
  .models__item-add_project {
    display: block;
    white-space: nowrap;
    position: absolute;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    background-color: transparent;
    font-weight: bold;
    border: 1px solid #a12c3a;
    border-radius: 4px;
    padding: 12px 22px 10px 22px;
    outline: none;
    cursor: pointer;
    bottom: 63px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;
    &:hover {
      background-color: $main;
      color: #fff;
    }
    &:active {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
  .card__product-form {
    display: block;
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    & form {
      display: flex;
      justify-content: center;
      & input[type='checkbox'] {
        margin-left: 0px !important;
        padding: 0;
        align-self: center;
        cursor: pointer;
      }
      & label {
        padding-left: 11px;
        align-self: center;
        font-size: 13px;
        line-height: 18px;
        color: #1d1d1d;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
}
@media (max-width: 1680px) {
  .main-content_item {
    max-width: 364px;
  }
}
@media (max-width: 1600px) {
  .main-content_item {
    max-width: 344px;
  }
}
@media (max-width: 1599px) {
  .main-content_item {
    max-width: 382px;
  }
}
@media (max-width: 1440px) {
  .models__item-hover.guest {
    height: 320px;
  }
  .models__item {
    width: 224px;
    height: 310px;
  }
  .models__item-hover {
    width: 257px;
    height: 420px;
    .models__item-img {
      max-width: 190px;
      width: 100%;
      height: 150px;
      margin-bottom: 18px;
      padding-bottom: 0;
      & img {
        max-height: 150px;
      }
    }
    .models__inner-wrapper-left {
      left: 24px;
    }
    .models__inner-wrapper-right {
      right: 25px;
    }
  }
}
@media (max-width: 1340px) {
  .main-content_item {
    max-width: 357px;
  }
}
@media (max-width: 1300px) {
  .models__item {
    margin-bottom: 20px;
  }
}
@media (max-width: 1280px) {
  .main-content_item-active {
    .main-content-dropdown {
      left: 0px;
    }
  }
}
@media (max-width: 1250px) {
  .models__item {
    margin-bottom: 10px;
  }
}
@media (max-width: 1207px) {
  .models__item {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .models__item-hover {
    width: 270px;
    .models__inner-wrapper-left {
      left: 31px;
    }
    .models__inner-wrapper-right {
      right: 31px;
    }
  }
}
@media (max-width: 1024px) {
  .main-content_item {
    max-width: 383px;
    .main-content-wrapper {
      & button {
        .main-content_image {
          .main-content-select-wrapper {
            max-width: 383px;
          }
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .models__item.active {
    height: 410px;
    .models__item-add_project {
      padding: 12px;
    }
    .models__item-add_project,
    .card__product-form {
      display: block;
    }
  }
  .mw-compare-btn {
    div:nth-last-child(3) {
      margin-bottom: 20px;
    }
  }
  .models__item-hover {
    display: none;
  }
}
@media (max-width: 825px) {
  .main-content_item {
    max-width: 354px;
  }
}
@media (max-width: 767px) {
  .main-content_item {
    max-width: 383px;
  }
}
@media (max-width: 731px) {
  .configurator__position-wrapper-items {
    .models__item {
      width: 45%;
      .models__inner {
        max-width: 100%;
      }
    }
  }
}
@media (max-width: 500px) {
  .configurator__position-wrapper-items {
    .models__item {
      width: 100%;
      .models__inner {
        max-width: 100%;
      }
    }
  }
}
@media (max-width: 440px) {
  .models__item {
    width: 100%;
  }
}
@media (max-width: 425px) {
  .main-content_item {
    .main-content-wrapper {
      & button {
        .main-content_image {
          min-height: auto;
        }
      }
    }
  }
}
@media (max-width: 411px) {
  .main-content_item-active {
    .main-content-dropdown {
      left: 0px;
    }
  }
}
</style>

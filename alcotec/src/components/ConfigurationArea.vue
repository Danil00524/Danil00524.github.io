<template>
  <div class="configurator__position-top login-container">
    <div v-if="!statusProductItem" class="configurator__position-title">
      <form>
        <div class="configurator-title-wrapper">
          <div class="configurator-title">
            {{ staticText.configurateArea.title[actualLang.index] }}
          </div>
          <div
            v-click-outside="hideSearchResult"
            class="configurator-search__wrapper"
            @click="toggleSearchResult"
          >
            <button
              @click.prevent="isActiveMemorySearch = !isActiveMemorySearch"
            >
              <Search
                v-model="searchValue"
                class="configurator-title-input"
                :placeholder="staticText.configurateArea.searchPlaceholder"
                :is-active-memory-search="isActiveMemorySearch"
              />
            </button>
            <div
              v-if="
                searchResult.categories.length || searchResult.products.length
              "
              class="configurator-search__wrapper_result"
            >
              <ul>
                <h4
                  v-if="
                    searchResult.categories && searchResult.categories.length
                  "
                >
                  {{ staticText.search.category[actualLang.index] }}
                </h4>
                <li
                  v-for="(searchItem, index) in searchResult.categories"
                  :key="index"
                  :class="{
                    'configurator__search-categories':
                      searchResult.products.length,
                  }"
                  @click.prevent="addToMemorySearch(searchItem)"
                >
                  <a @click.prevent="routeOnCategories(searchItem)">
                    {{ searchItem.title[actualLang.index] }}
                  </a>
                </li>

                <h4
                  v-if="searchResult.products && searchResult.products.length"
                >
                  {{ staticText.search.products[actualLang.index] }}
                </h4>
                <li
                  v-for="(searchItem, index) in searchResult.products"
                  :key="index + 10"
                  @click.prevent="addToMemorySearch(searchItem)"
                >
                  <a @click.prevent="routeOnProducts(searchItem)">
                    {{ searchItem.title[actualLang.index] }}
                  </a>
                </li>
              </ul>
            </div>
            <div
              v-else-if="isActiveMemorySearch"
              class="configurator-search__wrapper_result configurator-search__memory"
            >
              <span class="title-memory">
                {{ staticText.configurateArea.searchTitle[actualLang.index] }}
              </span>
              <ul>
                <li v-for="search in historySearch" :key="search.id">
                  <a
                    v-if="search.productId"
                    @click.prevent="routeOnProducts(search)"
                  >
                    <searchIcon class="search__icon" />
                    <span class="search__text">
                      {{ search.title[actualLang.index] }}
                    </span>
                  </a>
                  <a v-else @click.prevent="routeOnCategories(search)">
                    <searchIcon class="search__icon" />
                    <span class="search__text">
                      {{ search.title[actualLang.index] }}
                    </span>
                  </a>
                  <button
                    class="icon-close-small"
                    @click.prevent="deleteItemHistorySearch(search)"
                  ></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="statusProductItem" class="configurator__position-title_product">
      <ArrowGoBack
        v-if="userData.isLoggedIn"
        backRoutePath="/profile/configurator"
      />
      <ArrowGoBack v-else backRoutePath="/catalog" />
      <div class="configurator-title">
        {{ titleProductItem }}
      </div>
      <div
        v-click-outside="hideSearchResult"
        class="configurator-search__wrapper"
        @click="toggleSearchResult"
      >
        <button @click.prevent="isActiveMemorySearch = !isActiveMemorySearch">
          <Search
            v-model="searchValue"
            class="configurator-title-input"
            :placeholder="staticText.configurateArea.searchPlaceholder"
            :is-active-memory-search="isActiveMemorySearch"
          />
        </button>
        <div
          v-if="searchResult.categories.length || searchResult.products.length"
          class="configurator-search__wrapper_result"
        >
          <ul>
            <h4
              v-if="searchResult.categories && searchResult.categories.length"
            >
              {{ staticText.search.category[actualLang.index] }}
            </h4>
            <li
              v-for="(searchItem, index) in searchResult.categories"
              :key="index"
              :class="{
                'configurator__search-categories': searchResult.products.length,
              }"
              @click.prevent="addToMemorySearch(searchItem)"
            >
              <a @click.prevent="routeOnCategories(searchItem)">
                {{ searchItem.title[actualLang.index] }}
              </a>
            </li>

            <h4 v-if="searchResult.products && searchResult.products.length">
              {{ staticText.search.products[actualLang.index] }}
            </h4>
            <li
              v-for="(searchItem, index) in searchResult.products"
              :key="index + 10"
              @click.prevent="addToMemorySearch(searchItem)"
            >
              <a @click.prevent="routeOnProducts(searchItem)">
                {{ searchItem.title[actualLang.index] }}
              </a>
            </li>
          </ul>
        </div>
        <div
          v-else-if="isActiveMemorySearch"
          class="configurator-search__wrapper_result configurator-search__memory"
        >
          <span class="title-memory">
            {{ staticText.configurateArea.searchTitle[actualLang.index] }}
          </span>
          <ul>
            <li v-for="search in historySearch" :key="search.id">
              <a
                v-if="search.productId"
                @click.prevent="routeOnProducts(search)"
              >
                <searchIcon class="search__icon" />
                <span class="search__text">
                  {{ search.title[actualLang.index] }}
                </span>
              </a>
              <a v-else @click.prevent="routeOnCategories(search)">
                <searchIcon class="search__icon" />
                <span class="search__text">
                  {{ search.title[actualLang.index] }}
                </span>
              </a>
              <button
                class="icon-close-small"
                @click.prevent="deleteItemHistorySearch(search)"
              ></button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="configurator__position-filters">
      <div v-if="statusProductItem" class="configurator__position-filters-left">
        <div v-for="(elem, index) in activeCheckbox" :key="index">
          <span v-if="!elem.default">
            {{ elem.title[actualLang.index] }}
            <button
              class="icon-close-small"
              @click="clearOutItem(elem)"
            ></button>
          </span>
          <span v-else>
            {{ elem.name[actualLang.index] }}: {{ elem.default[0] }} -
            {{ elem.default[1] }}
            <button
              class="icon-close-small"
              @click="clearOutRange(elem)"
            ></button>
          </span>
        </div>
      </div>
      <div
        v-if="statusProductItem"
        class="configurator__position-filters-right"
      >
        <div class="configurator__position-filters-sort">
          <span class="sort-title">
            {{ staticText.configurator.textSort.title[actualLang.index] }}:
          </span>
          <div class="sort-btns">
            <button
              :class="{ active: isActiveBtnRating }"
              @click="onSortRating"
            >
              {{ staticText.configurator.textSort.rating[actualLang.index] }}
            </button>
            <button :class="{ active: isActiveBtnPrice }" @click="onSortPrice">
              {{ staticText.configurator.textSort.price[actualLang.index] }}
            </button>
            <button
              :class="{ active: isActiveBtnPopular }"
              @click="onSortPopular"
            >
              {{ staticText.configurator.textSort.popular[actualLang.index] }}
            </button>
          </div>

          <div class="icon-category-arrows">
            <button
              class="icon-category-arrow-up"
              :class="{ active: reverseSortTop }"
              @click.stop="onSortTop()"
            ></button>
            <button
              class="icon-category-arrow-down"
              :class="{ active: reverseSortBottom }"
              @click.stop="onSortButton()"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="activeCheckbox.length && statusProductItem"
      class="configurator__position-selected_goods"
    >
      <div class="configurator__position-selected__text">
        {{ staticText.configurateArea.filterText[actualLang.index] }}
        <span>{{ numberProducts.totalNumberOfFilteredItems }}</span>
        {{ staticText.configurateArea.filterTextFrom[actualLang.index] }}
        <span>{{ numberProducts.totalQuantityOfGoods }}</span>
      </div>
      <div
        class="configurator__position-selected-reset-btn"
        @click="cleanOutFilter(activeCheckbox, sideBarFiltersProductItem)"
      >
        <Button
          :text="staticText.configurateArea.buttonClear[actualLang.index]"
        />
      </div>
    </div>

    <CategoryProjects :status-product-item="statusProductItem" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ClickOutside from 'vue-click-outside';

import Button from './Button.vue';
import CategoryProjects from './Configurator/CategoryProjects.vue';
import Search from './Search.vue';
import ArrowGoBack from './ArrowGoBack.vue';

import { staticText } from '../i18n';

import searchIcon from '../assets/img/projects/search.svg?inline';

export default {
  name: 'ConfigurationArea',
  directives: {
    ClickOutside,
  },
  components: {
    ArrowGoBack,
    Button,
    CategoryProjects,
    Search,
    searchIcon,
  },
  props: {
    statusProductItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchValue: '',
      titleProductItem: '',
      isActiveBtnRating: true,
      isActiveBtnPrice: false,
      isActiveBtnPopular: false,
      reverseSortTop: false,
      reverseSortBottom: true,
      isActiveMemorySearch: false,
      historySearch: [],
      activeFilter: {},
      sortBy: 'rating',
      staticText,
      categoryId: this.$route.params.categoryId,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      sideBarFiltersProductItem: (state) =>
        state.profiles.profileConfigure.sideBarFiltersProductItem,
      textSort: (state) => state.settings.settings.configurator.textSort,
      userData: (state) => state.users.userData,
      categoryProjects: (state) =>
        state.profiles.profileConfigure.categoryProjects,
      categoryItem: (state) => state.categoryItem.categoryItem.subCategory,
      activeCheckbox: (state) => state.profiles.activeCheckboxFilter,
      numberProducts: (state) => state.categoryItem.numberProducts,
      searchResult: (state) => state.categoryItem.search,
    }),
  },
  watch: {
    sideBarFiltersProductItem: {
      handler: function(value) {
        // Отображаем активные фильтры.
        const filtered = value.reduce((acc, current) => {
          if (current.checkboxes) {
            const filter = current.checkboxes.filter((e) => e.check);

            return [...acc, ...filter];
          } else if (
            current.range.default[0] > current.range.from ||
            current.range.default[1] < current.range.to
          ) {
            const filter = [];

            filter.push(current.range);
            filter[0].name = current.title;
            filter[0].fieldName = current.fieldName;

            return [...acc, ...filter];
          } else {
            return acc;
          }
        }, []);

        this.$store.commit('profiles/SET_ACTIVE_CHECKBOX_FILTER', filtered);

        // Добавляем выбраные фильтры в query строку.
        this.activeFilter = {};

        this.activeCheckbox.forEach((e) => {
          if (e.fieldName === 'brand') {
            if (this.activeFilter[e.fieldName]) {
              this.activeFilter[e.fieldName] = `${
                this.activeFilter[e.fieldName]
              },${e.title[this.actualLang.index]}`;
            } else {
              this.activeFilter[e.fieldName] = `${
                e.title[this.actualLang.index]
              }`;
            }

            return;
          } else if (this.activeFilter[e.fieldName]) {
            this.activeFilter[e.fieldName] = `${
              this.activeFilter[e.fieldName]
            },${e.slag}`;
          } else if (e.default) {
            this.activeFilter[e.fieldName] = `${e.default[0]}-${e.default[1]}`;
          } else {
            this.activeFilter[e.fieldName] = e.slag;
          }
        });

        this.$router
          .push({
            query: this.activeFilter,
          })
          .catch((err) => {});

        if (this.categoryId) {
          this.$store.dispatch('categoryItem/getCategoryItem', {
            cb() {},
            categoryId: this.categoryId,
            filter: this.activeFilter,
            error: () => this.$router.push('/404-error'),
          });
        }

        this.$store.commit('profiles/SET_PARSE_FILTER', this.activeFilter);
      },
      deep: true,
    },
    searchValue: {
      handler: function(value) {
        if (value) {
          this.$store.dispatch('categoryItem/getSearchProductsAndCategories', {
            searchValue: value,
            cb: () => {},
          });
        } else {
          this.$store.commit('categoryItem/CLEAR_SEARCH_RESULT');
        }
      },
    },
    activeCheckbox: {
      handler(value) {
        if (this.categoryId) {
          this.$store.dispatch('profiles/updateSidebarFilders', {
            cb: () => {},
            id: this.categoryId,
            error: () => this.$router.push('/404-error'),
          });
        }
      },
    },
  },
  created() {
    this.$store.commit('categoryItem/CLEAR_SEARCH_RESULT');

    this.cleanOutFilter(this.activeCheckbox, this.sideBarFiltersProductItem);

    if (this.categoryId) {
      if (
        Object.keys(this.$route.query).length &&
        this.sideBarFiltersProductItem.length
      ) {
        // Парсим query строку, что бы получить активные фильтры.
        this.$store.commit(
          'profiles/SET_SIDEBAR_FILTERS',
          this.sideBarFiltersProductItem,
        );

        const filters = this.$route.query;
        const parseFilter = [];
        const rangeFilter = this.sideBarFiltersProductItem.map((elem) => {
          if (elem.range) {
            return elem.fieldName;
          }
        });

        for (const item in filters) {
          let slags;

          if (!rangeFilter.includes(item)) {
            slags = filters[item].split(',');
          } else {
            slags = filters[item].split(',');
            slags[0] = `${item}:${slags[0]}`;
          }

          parseFilter.push(...slags);
        }

        // Ставим фильтры в активное состояние.
        this.sideBarFiltersProductItem.forEach((e) => {
          if (e.fieldName === 'brand') {
            e.checkboxes.map((checkbox) => {
              if (
                parseFilter.includes(
                  String(checkbox.title[this.actualLang.index]),
                )
              ) {
                checkbox.check = true;
              }
            });
          } else if (e.checkboxes) {
            e.checkboxes.map((checkbox) => {
              if (parseFilter.includes(String(checkbox.slag))) {
                checkbox.check = true;
              }
            });
          } else if (e.range) {
            parseFilter.forEach((filter) => {
              if (filter.indexOf(e.fieldName) === 0) {
                const status = filter.split(':')[1].split('-');

                e.range.default[0] = status[0];
                e.range.default[1] = status[1];
              }
            });
          }
        });
      }

      // Находим нужную подкатегорию товаров что бы вывести заголовок.
      let itemCategory;

      this.categoryProjects.forEach((e) => {
        let result = [];

        if (e.items) {
          result = e.items.filter(
            (elem) => elem.id === Number(this.categoryId),
          );
        }

        if (result.length) {
          itemCategory = result;
        }
      });

      this.titleProductItem = itemCategory[0].title[this.actualLang.index];
    }

    this.historySearch = JSON.parse(localStorage.historySearch || '[]');
  },
  methods: {
    routeOnCategories(searchItem) {
      const path = this.userData.isLoggedIn
        ? `/profile/configurator/category/${searchItem.categoryId}`
        : `/catalog/category/${searchItem.categoryId}`;

      this.$store.commit('profiles/CLOSE_SIDEBAR_FILTER');
      this.$router.push(path).catch((err) => {});
      this.categoryId = searchItem.categoryId;
      this.$store.commit('categoryItem/CLEAR_SEARCH_RESULT');
      this.isActiveMemorySearch = false;

      this.$store.dispatch('categoryItem/getCategoryItem', {
        cb: (products) => {
          this.titleProductItem =
            products.subCategory[0].type.plural[this.actualLang.index];
        },
        error: () => {},
        categoryId: searchItem.categoryId,
      });

      this.$store.dispatch('profiles/getSideBarFilters', {
        cb: () => {},
        id: searchItem.categoryId,
      });
    },
    routeOnProducts(searchItem) {
      const path = this.userData.isLoggedIn
        ? `/profile/configurator/category/${searchItem.categoryId}/product/${searchItem.productId}`
        : `/catalog/category/${searchItem.categoryId}/product/${searchItem.productId}`;

      this.$router.push(path).catch((err) => {});
      this.$store.commit('categoryItem/CLEAR_SEARCH_RESULT');
      this.isActiveMemorySearch = false;
    },
    toggleSearchResult() {
      this.isActiveMemorySearch = true;
    },
    hideSearchResult() {
      this.searchValue = '';
      this.isActiveMemorySearch = false;
    },
    addToMemorySearch(item) {
      try {
        let flag = true;

        this.historySearch.forEach((e) => {
          if (
            e.title[this.actualLang.index] === item.title[this.actualLang.index]
          ) {
            flag = false;

            return;
          }
        });

        if (flag) {
          this.historySearch.unshift(item);
        }

        if (this.historySearch.length > 5) {
          this.historySearch = this.historySearch.slice(0, 5);
        }

        localStorage.historySearch = JSON.stringify(this.historySearch);
      } catch (e) {
        console.error('Очистите LocalStorage.');
      }
    },
    deleteItemHistorySearch(item) {
      this.historySearch.forEach((e, index) => {
        if (
          e.title[this.actualLang.index] === item.title[this.actualLang.index]
        ) {
          this.historySearch.splice(index, 1);
        }
      });

      try {
        localStorage.historySearch = JSON.stringify(this.historySearch);
      } catch (e) {
        alert('Очистите LocalStorage.');
      }
    },
    cleanOutFilter(activeCheckbox, sideBarFiltersProductItem) {
      this.$store.commit('profiles/SET_ACTIVE_CHECKBOX_FILTER', []);

      sideBarFiltersProductItem.forEach((e) => {
        if (e.range) {
          e.range.default = [e.range.from, e.range.to];
        } else if (e.checkboxes) {
          e.checkboxes.forEach((event) => {
            if (event.check === true) {
              event.check = false;
            }
          });
        }
      });
    },
    clearOutItem(item) {
      item.check = false;
    },
    clearOutRange(elem) {
      elem.default = [elem.from, elem.to];
    },
    onSortRating() {
      this.isActiveBtnRating = true;
      this.isActiveBtnPrice = false;
      this.isActiveBtnPopular = false;
      this.reverseSortTop = false;
      this.reverseSortBottom = true;
      this.sortBy = 'rating';

      // this.$router
      //   .push({
      //     query: {
      //       ...{ sortBy: this.sortBy },
      //       ...{ isDesc: this.reverseSortTop },
      //     },
      //   })
      //   .catch((err) => {});

      this.$store.dispatch('categoryItem/getCategoryItem', {
        cb() {},
        sorting: {
          sortBy: this.sortBy,
          isDesc: true,
        },
        categoryId: this.categoryId,
        filter: this.activeFilter,
      });
    },
    onSortPrice() {
      this.isActiveBtnRating = false;
      this.isActiveBtnPrice = true;
      this.isActiveBtnPopular = false;
      this.reverseSortTop = false;
      this.reverseSortBottom = true;
      this.sortBy = 'price';

      // const query = Object.assign(
      //   { sortBy: this.sortBy },
      //   { isDesc: this.reverseSortTop },
      //   this.$route.query,
      // );

      // console.log(this.sortBy);

      // this.$router
      //   .push({
      //     query: {
      //       ...{ sortBy: this.sortBy },
      //       ...{ isDesc: this.reverseSortTop },
      //     },
      //   })
      //   .catch((err) => {});

      this.$store.dispatch('categoryItem/getCategoryItem', {
        cb() {},
        sorting: {
          sortBy: this.sortBy,
          isDesc: true,
        },
        categoryId: this.categoryId,
        filter: this.activeFilter,
      });
    },
    onSortPopular() {
      this.isActiveBtnRating = false;
      this.isActiveBtnPrice = false;
      this.isActiveBtnPopular = true;
      this.reverseSortTop = false;
      this.reverseSortBottom = true;
      this.sortBy = 'popular';

      // this.$router
      //   .push({
      //     query: {
      //       ...{ sortBy: this.sortBy },
      //       ...{ isDesc: this.reverseSortTop },
      //     },
      //   })
      //   .catch((err) => {});

      this.$store.dispatch('categoryItem/getCategoryItem', {
        cb() {},
        sorting: {
          sortBy: this.sortBy,
          isDesc: true,
        },
        categoryId: this.categoryId,
        filter: this.activeFilter,
      });
    },
    onSortTop() {
      if (!this.reverseSortTop) {
        this.reverseSortTop = true;
        this.reverseSortBottom = false;

        // this.$router
        //   .push({
        //     query: {
        //       ...{ sortBy: this.sortBy },
        //       ...{ isDesc: this.reverseSortTop },
        //     },
        //   })
        //   .catch((err) => {});

        this.$store.dispatch('categoryItem/getCategoryItem', {
          cb() {},
          sorting: {
            sortBy: this.sortBy,
            isDesc: false,
          },
          categoryId: this.categoryId,
          filter: this.activeFilter,
        });
      }
    },
    onSortButton() {
      if (!this.reverseSortBottom) {
        this.reverseSortTop = false;
        this.reverseSortBottom = true;

        // this.$router
        //   .push({
        //     query: {
        //       ...{ sortBy: this.sortBy },
        //       ...{ isDesc: this.reverseSortTop },
        //     },
        //   })
        //   .catch((err) => {});

        this.$store.dispatch('categoryItem/getCategoryItem', {
          cb() {},
          sorting: {
            sortBy: this.sortBy,
            isDesc: true,
          },
          categoryId: this.categoryId,
          filter: this.activeFilter,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.configurator-search__wrapper {
  z-index: 3;
  position: relative;
  max-width: 400px;
  width: 100%;
  & button {
    max-width: 445px;
    width: 100%;
    .search.configurator-title-input {
      .icon-close-small {
        margin-right: 0px;
      }
    }
  }
  & .configurator-search__memory {
    & .icon-close-small {
      padding-right: 16px;
    }
    & .title-memory {
      padding-left: 24px;
      color: rgba(29, 29, 29, 0.6);
    }
    & ul {
      margin-top: 24px;
      padding-left: 20px;
      margin-bottom: 0px;
      background: rgba(196, 196, 196, 0.08);
      text-overflow: ellipsis;
      padding-right: 50px;
      & li {
        position: relative;
        & svg {
          margin-right: 24px;
        }
        .icon-close-small {
          position: absolute;
          padding-right: 0px;
          right: -30px;
          top: 10px;
        }

        & .search__text {
          text-overflow: ellipsis;
        }
      }
      & li a {
        padding: 9px 0px;
        color: #1d1d1d;
        font-weight: normal;
        text-align: center;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
      }
    }
  }
  & .search-value {
    position: absolute;
  }
  & .configurator-title-input {
    max-width: 445px;
    position: relative;
  }
  & .configurator-search__wrapper_result {
    position: absolute;
    top: 30px;
    z-index: 2;
    width: 100%;
    padding: 24px 20px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 4px 4px;
    & li {
      position: relative;
      padding-bottom: 16px;
      & button {
        max-width: none;
        width: auto;
      }
      & a {
        color: #1d1d1d;
      }
      &:last-child {
        padding-bottom: 0px;
      }
    }
    & h4 {
      font-family: 'MagistralC', sans-serif;
      text-decoration: underline;
      max-width: 400px;
      margin-bottom: 10px;
      color: $main;
    }
  }
}
.configurator-search__wrapper .configurator-search__memory {
  padding: 0px 0px;
  padding-top: 20px;
}
.configurator__position-top {
  padding-top: 40px;
}
.login-container {
  max-width: 1650px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
  padding-top: 40px;
}
.configurator__position-title {
  & form {
    .configurator-title-wrapper {
      display: flex;
      flex-wrap: wrap;
      .configurator-title {
        font-family: 'MagistralC';
        font-size: 32px;
        line-height: 37px;
        letter-spacing: 0.02em;
        color: #1d1d1d;
        font-weight: bold;
        padding-bottom: 32px;
        margin-right: 40px;
      }
    }
  }
}

.configurator__position-filters {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}
.configurator__position-filters-left {
  max-width: 600px;
  margin-left: -8px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
  & span {
    line-height: 19px;
    color: #9b9b9b;
    display: inline-block;
    padding: 6px 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    margin-left: 8px;
    width: max-content;
    & button {
      background: transparent;
      border: none;
      padding: 0;
      padding-left: 8px;
      outline: none;
      cursor: pointer;
    }
  }
}

.configurator__position-filters-sort {
  line-height: 19px;
  color: #9b9b9b;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    display: inline-block;
    background: transparent;
    outline: none;
    cursor: pointer;
    line-height: 19px;
    color: #9b9b9b;
    padding: 4px 10px;
    margin-left: 16px;
    border: none;
    border: 1px solid transparent;
    transition: all 0.4s;
    &:hover {
      color: #1d1d1d;
    }
    &.active {
      color: #a12c3a;
      border: 1px solid #a12c3a;
    }
    & + button {
      margin-left: 8px;
    }
  }
  .icon-category-arrows {
    display: inline-block;
    & button {
      margin-left: 8px;
    }
    button[class='icon-category-arrow-up'] {
      &::before {
        color: #9b9b9b;
      }
    }
    button[class='icon-category-arrow-up active'],
    button[class='icon-category-arrow-down active'] {
      font-size: 16px;
      font-weight: bold;
      border: 1px solid #a12c3a;
      padding: 8px;
      &::before {
        color: #a12c3a;
      }
    }
    button[class='icon-category-arrow-up'],
    button[class='icon-category-arrow-down'] {
      font-size: 16px;
      font-weight: bold;
      border: 1px solid #9b9b9b;
      padding: 8px;
    }
  }
}

.configurator__position-selected_goods {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.configurator__position-selected__text {
  font-size: 16px;
  line-height: 22px;
  color: #1d1d1d;
  padding-right: 24px;
}
.configurator__position-selected-reset-btn {
  padding: 0;
}

.configurator__position-title_product {
  display: flex;
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
  .configurator-title {
    font-family: 'MagistralC';
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    font-weight: bold;
    padding-bottom: 32px;
    margin-right: 40px;
  }
}
@media (max-width: 810px) {
  .configurator__position-title {
    & form {
      .configurator-title-wrapper {
        .configurator-title {
          padding-bottom: 10px;
        }
        .configurator-title-input {
          max-width: 100%;
        }
      }
    }
  }
}
@media (max-width: 680px) {
  .configurator-search__wrapper {
    max-width: 100%;
    & button {
      max-width: 100%;
      & .configurator-title-input {
        max-width: 100%;
        margin-bottom: 10px;
        .search__input {
          max-width: 100%;
        }
      }
    }
  }
  .configurator__position-title_product {
    flex-wrap: wrap;
  }
}
@media (max-width: 520px) {
  .icon-category-arrows {
    margin-top: 8px;
  }
  .configurator__position-filters-sort {
    text-align: left;
    & button {
      padding: 2px 5px;
      margin-left: 5px;
      & + button {
        margin-left: 3px;
      }
    }
    .icon-category-arrows {
      & button {
        margin-left: 5px;
      }
      button[class='icon-category-arrow-up active'],
      button[class='icon-category-arrow-down active'] {
        padding: 4px;
        &::before {
          color: #a12c3a;
        }
      }
      button[class='icon-category-arrow-up'],
      button[class='icon-category-arrow-down'] {
        padding: 4px;
      }
    }
  }
}
@media (max-width: 510px) {
  .configurator__position-title_product {
    .configurator-title {
      font-size: 20px;
      margin-right: 0;
      padding-bottom: 0px;
      text-align: center;
    }
  }
  .configurator__position-filters-sort {
    justify-content: flex-start;
    flex-wrap: wrap;
    & .sort-title {
      order: 1;
    }
    & button {
      padding: 2px 7px;
      margin-left: 5px;
      & + button {
        margin-left: 3px;
      }
    }
    .sort-btns {
      order: 3;
      margin-top: 5px;
      & button:first-child {
        margin-left: 0px;
      }
    }
    .icon-category-arrows {
      order: 2;
      margin-right: 5px;
      & button {
        margin-left: 5px;
      }
      button[class='icon-category-arrow-up active'],
      button[class='icon-category-arrow-down active'] {
        padding: 4px;
        &::before {
          color: #a12c3a;
        }
      }
      button[class='icon-category-arrow-up'],
      button[class='icon-category-arrow-down'] {
        padding: 4px;
      }
    }
  }
}
@media (max-width: 380px) {
  .configurator__position-title {
    & form {
      .configurator-title-wrapper {
        .configurator-title {
          margin-right: 0;
        }
      }
    }
  }
}
.configurator__position-filters {
  flex-direction: column;
}
@media (max-width: 340px) {
  .configurator__position-title {
    & form {
      .configurator-title-wrapper {
        .configurator-title {
          font-size: 29px;
        }
      }
    }
  }
}
</style>

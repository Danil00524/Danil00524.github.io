<template>
  <section class="section">
    <div ref="comparison" class="comparison">
      <div class="card__container compare__wrapper">
        <aside v-if="userData.isLoggedIn" class="left__sidebar-stub"></aside>
        <div class="custom-container ">
          <div class="configurator__position-top">
            <div
              id="configurator__position-title"
              class="configurator__position-title"
            >
              <div class="main__registration-title">
                <ArrowGoBack
                  :back-route-path="
                    `/profile/configurator/category/${this.$route.params.categoryId}`
                  "
                />
                {{ staticText.comparison.titleText[actualLang.index] }}
              </div>
              <div
                :class="[
                  'sidebar__compare-added-btn',
                  { 'sidebar__compare-added-btn-mr': userData.isLoggedIn },
                ]"
              >
                <router-link
                  tag="button"
                  type="button"
                  :to="{
                    path: `/profile/configurator/category/${$route.params.categoryId}`,
                  }"
                >
                  <span class="icon-category-plus"></span>
                  {{ staticText.comparison.addedProduct[actualLang.index] }}
                </router-link>
              </div>
            </div>
            <div
              :class="[
                'configurator__compare-overflow',
                { 'overflow-mr': userData.isLoggedIn },
              ]"
            >
              <div class="table__compare" @scroll="handlerScrollBottom">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div class="compare__item-param">
                          <div class="compare__item-param-inner">
                            <div
                              v-if="products.length"
                              class="compare__item-param-title"
                            >
                              {{ nameCategory }}
                              ({{ products.length }})
                            </div>
                            <div class="compare__item-param-btns">
                              <button
                                class="compare__item-param-trash"
                                @click="deleteAllModelCompare"
                              >
                                <span class="icon-compare-trash"></span>
                                {{
                                  staticText.comparison.clearList[
                                    actualLang.index
                                  ]
                                }}
                              </button>
                              <button
                                class="compare__item-param-print"
                                @click="print"
                              >
                                <span class="icon-compare-printer"></span>
                                {{
                                  staticText.comparison.ViewForPrinting[
                                    actualLang.index
                                  ]
                                }}
                              </button>
                            </div>
                            <div class="compare__item-param-radio">
                              <form>
                                <radio-button
                                  value="all"
                                  :name="radio"
                                  :text="
                                    staticText.comparison.checkBoxAllFields[
                                      actualLang.index
                                    ]
                                  "
                                  class="radio_compare"
                                />
                                <radio-button
                                  value="diff"
                                  :name="radio"
                                  :text="
                                    staticText.comparison
                                      .checkBoxProductDifferences[
                                      actualLang.index
                                    ]
                                  "
                                  class="radio_compare"
                                />
                              </form>
                            </div>
                          </div>
                        </div>
                      </th>
                      <th
                        v-for="item in products"
                        :key="item.id"
                        class="models__item models__item_compare"
                      >
                        <ModelItem
                          :item="item.totalInfo"
                          :product-img="item.img[0].url"
                          :compare="true"
                          :class="{
                            models__inner_padding: !userData.isLoggedIn,
                          }"
                          @deleteModelCompare="
                            deleteModelCompare(item.totalInfo.id)
                          "
                        />
                        <BtnAddToBasket
                          ontouchstart=""
                          v-if="userData.isLoggedIn"
                          class="models__item-add_project"
                          :text="staticText.btns[5][actualLang.index]"
                          :item="item.totalInfo"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr :class="{ fixed: statusScrollSidebar }">
                    </tr> -->
                    <tr
                      v-for="(specification, index) in specifications"
                      :key="index"
                    >
                      <td>{{ specification.title }}</td>
                      <td
                        v-for="(product, i) in specification.products"
                        :key="i"
                      >
                        {{ product.value[actualLang.index] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <RigthSidebar />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../store';
import { staticText } from '../i18n';

import RigthSidebar from '../components/Configurator/RigthSidebar.vue';
import ModelItem from '../components/ModelItem.vue';
import RadioButton from '../components/RadioButton.vue';
import BtnAddToBasket from '../components/BtnAddToBasket.vue';
import ArrowGoBack from '../components/ArrowGoBack.vue';

export default {
  name: 'Configurator',
  components: {
    RigthSidebar,
    ModelItem,
    RadioButton,
    BtnAddToBasket,
    ArrowGoBack,
  },
  data() {
    return {
      radio: {
        name: 'all',
      },
      staticText,
      statusScrollSidebar: false,
      bottomScroll: 0,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.categoryItem.categoryItemCompare.products,
      subCategory: (state) => state.categoryItem.categoryItem.subCategory,
      actualLang: (state) => state.settings.actualLang,
      userData: (state) => state.users.userData,
    }),
    nameCategory() {
      if (this.products.length) {
        return this.products[0].totalInfo.type.plural[this.actualLang.index];
      } else {
        return '';
      }
    },
    specifications() {
      const specificationsTitles = [];

      this.products.forEach((elem) => {
        elem.characteristics.techCharacteristics &&
          elem.characteristics.techCharacteristics.forEach((characteristic) => {
            if (
              !specificationsTitles.includes(
                characteristic.title[this.actualLang.index],
              )
            ) {
              specificationsTitles.push(
                characteristic.title[this.actualLang.index],
              );
            }
          });
      });

      this.products.forEach((elem) => {
        elem.characteristics.gabarite &&
          elem.characteristics.gabarite.forEach((gabarit) => {
            if (
              !specificationsTitles.includes(
                gabarit.title[this.actualLang.index],
              )
            ) {
              specificationsTitles.push(gabarit.title[this.actualLang.index]);
            }
          });
      });

      return specificationsTitles
        .map((title) => {
          const localProducts = this.products.reduce((prev, product) => {
            const specTechCharacteristics =
              (product.characteristics.techCharacteristics &&
                product.characteristics.techCharacteristics.filter(
                  (value) => value.title[this.actualLang.index] === title,
                )) ||
              [];

            const specGabarite =
              (product.characteristics.gabarite &&
                product.characteristics.gabarite.filter(
                  (value) => value.title[this.actualLang.index] === title,
                )) ||
              [];

            if (
              (!specTechCharacteristics.length && !specGabarite.length) ||
              (specTechCharacteristics.length &&
                specGabarite.length &&
                specGabarite[0].value[this.actualLang.index] &&
                specTechCharacteristics[0].value[this.actualLang.index])
            ) {
              const notCharacteristic = [
                { title: { ru: '-', ua: '-' }, value: { ru: '-', ua: '-' } },
              ];

              return [...prev, ...notCharacteristic];
            }

            return [...prev, ...specTechCharacteristics, ...specGabarite];
          }, []);

          let specification = {
            title,
            products: localProducts,
          };

          const similar = localProducts.reduce((prev, product) => {
            if (
              product &&
              prev &&
              prev.value[this.actualLang.index] ===
                product.value[this.actualLang.index]
            ) {
              return product;
            } else {
              return false;
            }
          });

          if (
            this.radio.name === 'diff' &&
            localProducts.length > 1 &&
            similar
          ) {
            specification = null;
          }

          return specification;
        })
        .filter((row) => row);
    },
  },
  mounted() {
    this.handlerScrollSidebar();
    document.addEventListener('scroll', this.handlerScrollSidebar);
  },
  created() {
    if (localStorage.compareProducts) {
      const compareProducts = JSON.parse(localStorage.compareProducts);

      this.$store.commit(
        'categoryItem/SET_CATEGORY_ITEM_COMPARE',
        compareProducts,
      );
    }
  },
  methods: {
    handlerScrollBottom(e) {
      this.bottomScroll = e.target.scrollLeft;
    },
    handlerScrollTop(e) {
      e.target.scrollLeft = this.bottomScroll;
    },
    handlerScrollSidebar() {
      const { scrollTop } = document.documentElement;

      if (
        document.getElementById('header') &&
        document.getElementById('header').clientHeight &&
        document.getElementById('breadcrumbs') &&
        document.getElementById('breadcrumbs').clientHeight &&
        document.getElementById('personal__cabinet-top') &&
        document.getElementById('personal__cabinet-top').clientHeight &&
        document.getElementById('configurator__position-title') &&
        document.getElementById('configurator__position-title').clientHeight
      ) {
        const header = document.getElementById('header').clientHeight;
        const breadcrumbs = document.getElementById('breadcrumbs').clientHeight;
        const personalCabinetTop = document.getElementById(
          'personal__cabinet-top',
        ).clientHeight;
        const configuratorPositionTitle = document.getElementById(
          'configurator__position-title',
        ).clientHeight;

        this.statusScrollSidebar =
          scrollTop >
          header +
            breadcrumbs +
            personalCabinetTop +
            configuratorPositionTitle +
            62;
      }
    },
    print() {
      window.print();
    },
    deleteModelCompare(productId) {
      this.$store.commit(
        'categoryItem/DELETE_MODEL_COMPARE',
        Number(productId),
      );

      if (localStorage.compareProducts) {
        const compareProducts = JSON.parse(localStorage.compareProducts);

        const activeProductsForCompare = compareProducts.filter(
          (product) => productId !== product.totalInfo.id,
        );

        localStorage.compareProducts = JSON.stringify(activeProductsForCompare);
      }
    },
    deleteAllModelCompare() {
      this.$store.commit('categoryItem/DELETE_ALL_MODEL_COMPARE');
      localStorage.compareProducts = [];
      sessionStorage.categoryId = null;
    },
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('categoryItem/getCategoryItem', {
      cb() {
        next();
      },
      categoryId: to.params.categoryId,
      error: () => next('/404-error'),
    });
  },
};
</script>

<style lang="scss" scoped>
.models__item-add_project {
  bottom: 59px;
  &:hover {
    background-color: $black;
    color: $white;
    border: 1px solid $black;
  }
  &:active {
    background-color: $black;
    color: $white;
    border: 1px solid $black;
  }
}

.card__container {
  width: 100%;
}

.left__sidebar-stub {
  margin-top: 8px;
  margin-right: 30px;
  border-radius: 4px;
  max-width: 74px;
  width: 100%;
  height: 720px;
}

.compare__wrapper {
  display: flex;
  justify-content: space-between;
}

.configurator__position-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 48px;
}
.sidebar__compare-added-btn {
  transition: all 0.3s;
  & button {
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    font-weight: bold;
    padding: 0;
    & span {
      font-size: 14px;
      padding-right: 29px;
      &::before {
        color: #a12c3a;
      }
    }
  }
  &:hover {
    opacity: 0.8;
  }
}
.models__container {
  padding-bottom: 0;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0;
  min-height: auto;
  & div.compare__item:nth-child(3) {
    margin-left: 15px;
    margin-right: 15px;
  }
}
.compare__item-param {
  min-width: max-content;
}
.compare__item-param-radio {
  padding-top: 40px;
}
.compare__item-param-title {
  font-family: 'MagistralC';
  font-size: 16px;
  line-height: 18px;
  color: #1d1d1d;
  font-weight: bold;
}
.compare__item-param-btns {
  padding-top: 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & button {
    cursor: pointer;
    display: block;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1d1d1d;
    font-weight: bold;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    transition: all 0.3s;
    text-align: left;
    & span {
      font-size: 18px;
      padding-right: 8px;
    }
    & + button {
      margin-top: 24px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
.configurator__compare-overflow {
  overflow: auto;
  max-height: 100vh;
  scrollbar-color: #262626 transparent;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }
  margin-bottom: 20px;
}
.table__compare {
  padding-bottom: 20px;

  & table {
    border-collapse: collapse;
    width: 100%;
    max-width: fit-content;
    & thead {
      display: block;
      background-color: #e5e5e5;
      position: sticky;
      top: 0;
      z-index: 1;
      & tr {
        text-align: center;
        & th {
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
          padding: 12px 10px;
          width: 25%;
          &:first-child {
            border-left: none;
            text-align: left;
            padding-left: 0;
            padding-right: 0;
            background-color: #e5e5e5;
            position: sticky;
            left: 0;
            z-index: 2;
          }
        }
      }
      & tr:first-child {
        & th {
          border: none;
          padding-bottom: 35px;
          height: 473px;
        }
        .models__item_compare {
          padding-bottom: 36px;
          .models__inner {
            padding-bottom: 0px;
            max-width: 100%;
          }
        }
      }
    }
    & tbody {
      display: block;
      scrollbar-color: #262626 transparent;
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
      & tr {
        text-align: center;
        & td {
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
          padding: 12px 10px;
          width: 25%;
          &:first-child {
            text-align: left;
            background-color: #e5e5e5;
            position: sticky;
            left: 0;
            padding-left: 0px;
            border-left: none;
          }
        }
      }
    }
  }
}

@media print {
  /* здесь будут стили для печати */
  .configurator__position-title {
    display: none;
  }
  .compare__item-param-btns {
    display: none;
  }
  .compare__item-param-radio {
    display: none;
  }
}
@media (max-width: 1885px) {
  .configurator__position-title {
    padding-right: 15px;
  }
}
@media (max-width: 1680px) {
  .left__sidebar-stub {
    display: none;
  }
}
@media (max-width: 1599px) {
  .sidebar__compare-added-btn-mr {
    margin-right: 120px;
  }
  .overflow-mr {
    margin-right: 60px;
  }

  .configurator__position-title {
    padding-right: 0px;
  }
  .sidebar__order-closed {
    position: absolute;
    right: 0px;
    z-index: 6;
  }
  .sidebar__order-closed.active,
  .order-sidebar {
    position: fixed;
    right: 0px;
    z-index: 6;
  }
  .order-sidebar,
  .order-sidebar.active {
    height: auto;
  }
  .order-sidebar.added-product-aside.active {
    height: 100%;
  }
}
@media (max-width: 1440px) {
  .table__compare {
    & table {
      & thead {
        & tr {
          & th {
            height: 430px;
          }
        }
        & tr:first-child {
          & th {
            height: 430px;
          }
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .sidebar__compare-added-btn-mr {
    margin-right: 0px;
  }
  .sidebar__order-closed,
  .sidebar__order-closed.active {
    position: fixed;
    right: -74px;
  }
  .overflow-mr {
    margin-right: 0px;
  }
  .order-sidebar {
    height: 100vh;
  }
}
@media (max-width: 840px) {
  .configurator__position-title {
    flex-direction: column;
    .main__registration-title {
      padding-bottom: 20px;
    }
    .sidebar__compare-added-btn {
      padding-bottom: 20px;
    }
  }
}
@media (max-width: 587px) {
  .main__registration-title {
    font-size: 32px;
  }
}
@media (max-width: 520px) {
  .compare__item-param {
    min-width: auto;
    margin-right: 10px;
  }
  .compare__item-param-title {
    font-size: 10px;
    line-height: 12px;
  }
  .compare__item-param-btns {
    padding-top: 48px;
    padding-bottom: 40px;
    & button {
      font-size: 10px;
      line-height: 12px;
      & span {
        font-size: 13px;
        padding-right: 0px;
      }
    }
  }
  .table__compare {
    & table {
      & thead {
        & tr:first-child {
          & th {
            width: 7%;
          }
        }
      }
      & tbody {
        & tr {
          & td {
            font-size: 10px;
            line-height: 12px;
            &:first-child {
              width: 7%;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 434px) {
  .main__registration-title {
    font-size: 24px;
  }
  .models__item_compare {
    .models__item-add_project {
      padding: 12px;
    }
    .models__item-title {
      font-size: 15px;
    }
  }
  .sidebar__compare-added-btn {
    .router-link-active {
      font-size: 9px;
    }
    .icon-category-plus {
      padding-right: 10px;
    }
  }
  .table__compare {
    & table {
      & thead {
        & tr:first-child {
          .models__item_compare {
            padding-bottom: 20px;
          }
        }
      }
      & tbody {
        & tr {
          & td {
            font-size: 10px;
            line-height: 12px;
            &:first-child {
              width: 3%;
            }
          }
        }
      }
    }
  }
  .models__item-add_project {
    bottom: 50px;
  }
}
</style>

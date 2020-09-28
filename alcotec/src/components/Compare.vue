<template>
  <div
    v-if="goodsCompare.length && $route.path.includes('category') && isLoggedIn"
    class="compare"
    :class="{ compare_collapsed: height == 0 }"
  >
    <button
      type="button"
      class="compare__button"
      @click="height = height ? 0 : 'initial'"
    >
      {{ staticText.btns[8][actualLang.index] }}
      <span class="compare__icon icon-category-arrow"></span>
    </button>
    <div class="goods" :style="{ height: height }">
      <ul class="goods__list">
        <li v-for="good in goodsCompare" :key="good.id" class="goods__item">
          <div class="goods__preview">
            <img
              :src="`${baseDomainImg}${good.img[0].url}`"
              alt="goods-preview"
              class="goods__img"
            />
          </div>
          <div class="goods__text">
            <div class="goods__desc">
              {{ good.totalInfo.type[actualLang.index] }}
            </div>
            <div class="goods__name">
              {{ good.totalInfo.title }}
            </div>
          </div>
          <button
            type="button"
            class="goods__close icon-close-small"
            @click.prevent="deleteModelCompare(good.totalInfo.id)"
          ></button>
        </li>
      </ul>
      <router-link
        :to="{
          path: `/profile/configurator/category/${$route.params.categoryId}/comparison`,
        }"
        tag="button"
        type="button"
        class="goods__button"
      >
        {{ staticText.btns[8][actualLang.index] }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';
import { baseDomainImg } from '../constans';

export default {
  name: 'Compare',
  data() {
    return {
      height: 0,
      staticText,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      goodsCompare: (state) => state.categoryItem.categoryItemCompare.products,
      actualLang: (state) => state.settings.actualLang,
      isLoggedIn: (state) => state.users.userData.isLoggedIn,
      goods: (state) => state.categoryItem.categoryItem.subCategory,
    }),
  },
  watch: {
    goods: {
      handler(value) {
        value.forEach((good) => {
          const statusGood = this.goodsCompare.find(
            (goodCompare) =>
              Number(goodCompare.totalInfo.id) === Number(good.id),
          );

          if (good.compare && !statusGood) {
            this.$store.dispatch('categoryItem/getProduct', {
              id: good.id,
              cb: (product) => {
                const compareProducts = JSON.parse(
                  localStorage.compareProducts || '[]',
                );

                compareProducts.push(product);

                localStorage.compareProducts = JSON.stringify(compareProducts);
              },
            });
          } else if (!good.compare && !statusGood) {
            this.deleteModelCompare(good.id);

            if (localStorage.compareProducts) {
              const compareProducts = JSON.parse(localStorage.compareProducts);

              const activeProductsForCompare = compareProducts.filter(
                (product) => good.id !== product.totalInfo.id,
              );

              localStorage.compareProducts = JSON.stringify(
                activeProductsForCompare,
              );
            }
          } else if (!good.compare && statusGood) {
            good.compare = true;
          }
        });
      },
      deep: true,
    },
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
  },
};
</script>
<style lang="scss" scoped>
.compare {
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 2;
  padding: 0 15px;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  &_collapsed {
    height: auto;
    .compare__button {
      border-radius: 4px 4px 0px 0px;
      .compare__icon {
        transform: none;
      }
    }
    .goods {
      border: none;
    }
  }
  &__button {
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 20px 30px;
    border-radius: 4px 4px 0px 0px;
    background-color: $main;
    font-family: 'MagistralC';
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #fff;
    transition: all 0.3s;
    margin-top: 25px;
    &:hover {
      background-color: $black;
    }
  }
  &__icon {
    transition: all 0.3s;
    margin-left: 16px;
    transform: rotate(180deg);
    &:before {
      color: #fff;
    }
  }
}
.goods {
  transition: height 0.1s;
  box-sizing: border-box;
  border: 1px solid $main;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1495px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  overflow-y: auto;
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
  &__list {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: auto;
    max-width: 1220px;
    width: 100%;
  }
  &__item {
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 32px 24px;
    position: relative;
    cursor: pointer;
    max-width: 304px;
    width: 100%;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  &__close {
    cursor: pointer;
    border: none;
    outline: none;
    position: absolute;
    right: 22px;
    background: transparent;
    top: 22px;
    font-size: 18px;
    &:hover,
    &:focus {
      &:after {
        width: 3px;
      }
      &:before {
        height: 3px;
      }
    }
  }
  &__preview {
    margin-right: 24px;
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
  }
  &__img {
    display: block;
    max-width: 68px;
    max-height: 68px;
  }
  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__desc {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #9b9b9b;
    margin-bottom: 8px;
    max-width: 145px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__name {
    font-family: 'MagistralC';
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    font-weight: bold;
    text-align: left;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
  }
  &__button {
    border-radius: 4px;
    padding: 12px 16px;
    background-color: #000;
    color: #fff;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 30px;
    transition: all 0.3s;
    &:hover {
      background-color: $main;
    }
    & span {
      transform: rotate(180deg);
      &:before {
        transform: rotate(180deg);
      }
    }
  }
}

@media (max-width: 1732px) {
  .goods {
    max-width: 1190px;
  }
}
@media (max-width: 1285px) {
  .goods {
    max-width: 1010px;
  }
}
@media (max-width: 1200px) {
  .goods__item {
    padding: 15px;
  }
  .goods__button {
    margin-right: 0px;
    margin-left: 0;
    margin-bottom: 10px;
  }
}
@media (max-width: 1024px) {
  .goods {
    max-width: 760px;
  }
}

@media (max-width: 980px) {
  .goods {
    &__close {
      top: 15px;
    }
  }
}

@media (max-width: 800px) {
  .goods {
    max-width: 750px;
  }
}
@media (max-width: 768px) {
  .compare {
    padding: 0px;
  }
  .goods {
    max-width: 730px;
  }
}
</style>

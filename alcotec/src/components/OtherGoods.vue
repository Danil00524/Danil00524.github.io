<template>
  <section class="models_goods">
    <div class="card__product-container">
      <div class="models__title">
        {{ staticText.product.otherModel[actualLang.index] }}
      </div>
      <div class="models__items">
        <div class="models__btn">
          <div class="models__btn-title">
            {{ product.totalInfo.type.plural[actualLang.index] }}
          </div>
          <SimilarModels :models="product.models" />
        </div>
        <v-slide-group show-arrows center-active>
          <v-slide-item v-model="model">
            <div class="models__container">
              <ModelItem
                v-for="product in product.products"
                :key="product.id"
                :item="product"
                :other-model="true"
              />
            </div>
          </v-slide-item>
        </v-slide-group>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

import SimilarModels from './SimilarModels.vue';
import ModelItem from './ModelItem.vue';

export default {
  name: 'OtherGoods',
  components: {
    SimilarModels,
    ModelItem,
  },
  data() {
    return {
      model: null,
      staticText,
    };
  },
  computed: {
    ...mapState({
      product: (state) => state.products.product,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss">
.models_goods {
  padding-bottom: 67px;
  .models__items {
    max-width: 1110px;
    margin: 0 auto;
  }

  .v-slide-group__prev {
    position: absolute;
    left: -32px;
    top: 40%;
    min-width: 0;
    & i {
      width: 16px;
      height: 28px;
      background-image: url('../assets/img/product/btn_prev.png');
    }
    &.v-slide-group__prev--disabled {
      opacity: 0.5;
    }
  }

  .v-slide-group__next {
    position: absolute;
    right: -32px;
    top: 40%;
    min-width: 0;
    & i {
      width: 16px;
      height: 28px;
      background-image: url('../assets/img/product/btn_next.png');
    }
    &.v-slide-group__next--disabled {
      opacity: 0.5;
    }
  }

  .models__container {
    justify-content: space-between;
    flex-wrap: nowrap;
    margin: 0 -7.5px;
    min-height: auto;
    & a {
      margin: 12.5px;
    }
  }
  .models__title {
    font-family: 'MagistralC';
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    padding-top: 40px;
    padding-bottom: 42px;
    font-weight: bold;
  }
  .models__btn {
    display: flex;
    padding-bottom: 20px;
  }
  .models__btn-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #1d1d1d;
    padding-right: 40px;
  }
  .models__inner,
  .compare__item-inner {
    padding: 24px 34px;
    background-color: #ffffff;
    border-radius: 1px;
    text-align: center;
    max-width: 257px;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .models__item-img {
    & img {
      max-height: 180px;
    }
  }
  .models__item-star {
    padding-bottom: 17px;
  }

  .models__item-title,
  .models__item-valuta {
    font-family: 'MagistralC';
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    font-weight: bold;
  }
  .models__item-valuta {
    padding-top: 16px;
    padding-bottom: 4px;
    & span {
      margin-left: 5px;
    }
  }
  .models__item-subtitle {
    font-size: 10px;
    line-height: 14px;
    color: #9b9b9b;
    white-space: normal;
  }
}
@media (max-width: 1440px) {
  .models_goods {
    .models__container {
      flex-wrap: nowrap;
      .models__inner {
        width: 257px;
        .models__item-img {
          & img {
            max-height: 140px;
          }
        }
      }
    }
  }
}
@media (max-width: 1220px) {
  .models_goods {
    .models__items {
      max-width: 980px;
      .models__container {
        .models__inner {
          width: 224px;
        }
      }
    }
  }
}
@media (max-width: 1090px) {
  .models_goods {
    .models__items {
      max-width: 830px;
      .models__container {
        .models__inner {
          width: 253px;
        }
      }
    }
  }
}

@media (max-width: 980px) {
  .models_goods {
    .models__title {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
}

@media (max-width: 900px) {
  .models_goods {
    .models__items {
      margin: 0 30px;
      max-width: 760px;
      .models__container {
        .models__inner {
          width: 50%;
          min-width: 355px;
          max-width: 355px;
        }
      }
    }
  }
  .v-slide-group__prev {
    left: 30px;
    z-index: 1;
  }
  .v-slide-group__next {
    right: 30px;
  }
}

@media (max-width: 850px) {
  .models_goods {
    .models__items {
      max-width: 600px;
      .models__container {
        .models__inner {
          width: 50%;
          min-width: 275px;
          max-width: 275px;
        }
      }
    }
  }
}

@media (max-width: 848px) {
  .models__btn {
    flex-direction: column;
    .models__btn-title {
      padding-right: 0px;
      padding-bottom: 15px;
    }
  }
  .models_goods {
    .models__container {
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 -0.5px;
      & a {
        margin: 12.5px;
      }
    }
  }
}

@media (max-width: 768px) {
  .models_goods {
    .models__items {
      .models__container {
        .models__inner {
          width: 345px;
        }
      }
    }
  }
}
@media (max-width: 720px) {
  .models_goods {
    .models__items {
      .models__container {
        .models__inner {
          width: 320px;
        }
      }
    }
  }
}

@media (max-width: 690px) {
  .models_goods {
    .models__items {
      max-width: 500px;
      .models__container {
        .models__inner {
          width: 50%;
          min-width: 225px;
          max-width: 225px;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .models_goods {
    .models__items {
      margin: 0 auto;
      max-width: 380px;
      .models__container {
        .models__inner {
          width: 100%;
          min-width: 355px;
          max-width: 355px;
        }
      }
    }
  }
}

@media (max-width: 455px) {
  .models_goods {
    .models__items {
      margin: 0 auto;
      max-width: 325px;
      .models__container {
        .models__inner {
          width: 100%;
          min-width: 300px;
          max-width: 300px;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .models_goods {
    .models__items {
      max-width: 290px;
      .models__container {
        .models__inner {
          min-width: 265px;
          max-width: 265px;
        }
      }
    }
  }
}
@media (max-width: 360px) {
  .models_goods {
    .v-slide-group__prev {
      left: -10px;
    }
    .v-slide-group__next {
      right: -10px;
    }
  }
}
</style>

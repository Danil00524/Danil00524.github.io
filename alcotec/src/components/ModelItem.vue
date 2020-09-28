<template>
  <router-link
    :to="
      compare
        ? {
            path: `/profile/configurator/category/${$route.params.categoryId}/product/${item.id}`,
          }
        : {
            path: otherModel
              ? `${$route.path.replace(/product\/\d+/, `product/${item.id}`)}`
              : `${$route.path}/product/${item.id}`,
          }
    "
    class="models__inner"
  >
    <button
      ontouchstart=""
      v-if="compare"
      type="button"
      class="models__close"
      @click.prevent="$emit('deleteModelCompare')"
    ></button>
    <div v-if="!compare" class="models__inner-wrapper-left">
      <div
        v-for="model in item.silverStatus"
        :key="model.id"
        class="models__inner-protect"
      >
        {{ model[actualLang.index] }}
      </div>
    </div>
    <div v-if="!compare" class="models__inner-wrapper-right">
      <div
        v-for="model in item.redStatus"
        :key="model.id"
        class="models__inner-sale"
      >
        {{ model[actualLang.index] }}
      </div>
    </div>
    <div class="models__item-img">
      <img v-if="productImg" :src="`${baseDomainImg}${productImg}`" alt="" />
      <img v-else :src="`${baseDomainImg}${item.img}`" alt="" />
    </div>

    <RatingStars :rating="item.rating" class="models__item-star" />

    <div class="models__item-title">
      {{ item.title }}
    </div>
    <div v-if="item.sale" class="card__product-price-value-wrapper">
      <div class="card__product-price-value-strikethrough">
        {{ item.priceUAH }}
        <span>грн</span>
      </div>
      <div class="card__product-price-value">
        {{ item.sale }}
        <span>грн</span>
      </div>
    </div>

    <div v-else class="card__product-price-value-wrapper">
      <div class="card__product-price-value">
        {{ item.priceUAH }}
        <span>грн</span>
      </div>
    </div>

    <div class="models__item-subtitle">
      {{ item.availability[actualLang.index] }}
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';
import { baseDomainImg } from '../constans';

import RatingStars from './RatingStars.vue';

export default {
  name: 'ModelItem',
  components: {
    RatingStars,
  },
  props: {
    compare: {
      type: Boolean,
      default: false,
    },
    otherModel: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
    productImg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      staticText,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss">
.models__item.models__item_compare {
  .models__item-add_project {
    display: block;
  }
  .models__inner {
    .models__item-title {
      max-width: inherit;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      padding-bottom: 0;
      margin-bottom: 20px;
    }
    .models__close {
      cursor: pointer;
      display: block;
      border: none;
      outline: none;
      background-color: transparent;
      position: absolute;
      top: 22px;
      right: 22px;
      width: 18px;
      height: 18px;
      &:after {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        background-color: #9b9b9b;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #9b9b9b;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
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
    .models__item-hover {
      .card__product-form {
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
  }
  .models__inner.models__inner_padding {
    padding-bottom: 24px;
  }
}
.models__inner {
  padding: 24px 17px;
  max-width: 271px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 1px;
  text-align: center;
  position: relative;
  .models__inner-wrapper-left {
    position: absolute;
    left: 8px;
    top: 8px;
    .models__inner-protect {
      background-color: #fff;
      font-family: 'MagistralC';
      font-size: 10px;
      line-height: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #9b9b9b;
      border: 1px solid #9b9b9b;
      border-radius: 1px;
      padding: 6px 8px;
      margin-bottom: 8px;
      width: max-content;
      font-weight: bold;
    }
  }
  .models__inner-wrapper-right {
    position: absolute;
    top: 8px;
    right: 8px;
    .models__inner-sale {
      margin-left: auto;
      width: max-content;
      font-family: 'MagistralC';
      margin-bottom: 8px;
      font-size: 10px;
      line-height: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #ff0000;
      border: 1px solid #ff0000;
      border-radius: 1px;
      padding: 6px 8px;
      font-weight: bold;
    }
  }
  .models__item-img {
    max-width: 200px;
    min-width: 200px;
    width: 100%;
    min-height: 180px;
    max-height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 18px;
    padding-bottom: 0;
    & img {
      max-height: 180px;
    }
  }
  .models__item-star {
    padding-bottom: 17px;
  }
  .models__item-title {
    font-family: 'MagistralC';
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    font-weight: bold;
    padding-bottom: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .card__product-price-value-wrapper {
    align-items: center;
    justify-content: center;
    padding-bottom: 4px;
    .card__product-price-value-strikethrough {
      font-family: 'MagistralC';
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.02em;
      text-decoration-line: line-through;
      color: #9b9b9b;
      font-weight: bold;
      padding-right: 48px;
    }
    .card__product-price-value {
      font-family: 'MagistralC';
      letter-spacing: 0.02em;
      color: #1d1d1d;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      padding-bottom: 0px;
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
  .models__inner {
    max-width: 224px;
    height: 100%;
    .models__inner-wrapper-left {
      .models__inner-protect {
        font-size: 9px;
        line-height: 9px;
        margin-bottom: 5px;
        padding: 4px 8px;
      }
    }
    .models__inner-wrapper-right {
      .models__inner-sale {
        font-size: 9px;
        line-height: 9px;
        margin-bottom: 5px;
        padding: 4px 8px;
      }
    }
    .models__item-img {
      min-height: 140px;
      max-height: 140px;
      & img {
        max-height: 140px;
      }
    }
    .models__item-star {
      padding-bottom: 17px;
    }
    .models__item-title {
      font-size: 16px;
      line-height: 16px;
    }
    .card__product-price-value-wrapper {
      .card__product-price-value-strikethrough {
        font-size: 12px;
        line-height: 12px;
      }
      .card__product-price-value {
        font-size: 15px;
        line-height: 15px;
      }
    }
    .models__item-subtitle {
      font-size: 10px;
      line-height: 14px;
      color: #9b9b9b;
    }
  }
}
@media (max-width: 440px) {
  .models__inner {
    max-width: 100%;
  }
}
@media (max-width: 434px) {
  .models__item_compare {
    .models__item-title {
      font-size: 15px;
    }
  }
}
</style>

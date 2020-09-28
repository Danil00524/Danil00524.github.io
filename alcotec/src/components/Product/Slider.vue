<template>
  <div>
    <slick
      v-if="product.img.length > 1"
      ref="slick"
      class="card__product-slider"
      :options="slickOptions"
    >
      <div v-for="slide in product.img" :key="slide.id">
        <div v-if="!slide.video" class="card__product-slider-img">
          <img
            :src="`${baseDomainImg}${slide.url}`"
            alt
            @click="showModal = true"
          />
        </div>
        <div v-else class="card__product-slider-video">
          <iframe
            :src="`https://www.youtube.com/embed/${slide.video}`"
            alt
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </slick>
    <div v-else class="card__product-slider no-previews">
      <div class="card__product-slider-img">
        <img :src="`${baseDomainImg}${product.img[0].url}`" alt="" />
      </div>
    </div>

    <div
      class="product-instruction"
      :class="{ onePhoto: product.img.length === 1 }"
    >
      <a
        v-if="product.totalInfo.urlInstruction"
        :href="`${baseDomainImg}${product.totalInfo.urlInstruction}`"
        download=""
      >
        <span class="icon-pdf-icon specifications__img"></span>
        {{ staticText.btn[actualLang.index] }}
      </a>
      <a v-else href="#" class="disable" @click.prevent="">
        <span class="icon-pdf-icon specifications__img"></span>
        {{ staticText.btn[actualLang.index] }}
      </a>
    </div>
    <ModalSlider
      v-if="showModal"
      :product="product"
      @closeModal="showModal = false"
    />
  </div>
</template>

<script>
import Slick from 'vue-slick';
import { mapState } from 'vuex';
import { baseDomainImg } from '../../constans';

import ModalSlider from './ModalSlider.vue';

export default {
  name: 'Slider',
  components: {
    Slick,
    ModalSlider,
  },
  data() {
    return {
      staticText: {
        btn: {
          ru: 'Скачать инструкцию',
          ua: 'Завантажити iнструкцiю',
        },
      },
      slickOptions: {
        prevArrow: `<button class="slick-prev" type="button">
            <span></span>
          </button>`,
        nextArrow: `<button class="slick-next" type="button">
            <span></span>
          </button>`,
        dots: true,
        customPaging: (slick, index) => {
          if (this.product.img[index].url) {
            return `
            <button type="button" class="slick__control">
              <img src="${this.baseDomainImg}${this.product.img[index].url}" alt />
            </button>`;
          } else {
            return `
            <button type="button" class="slick__control">
              <img src="${require('../../assets/img/product/card__product-slider-previews-img-5.jpg')}" alt />
            </button>`;
          }
        },
      },
      url: '',
      showModal: false,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      product: (state) => state.products.product,
    }),
  },
  watch: {
    product: {
      handler() {
        this.reInit();
      },
    },
  },
  methods: {
    reInit() {
      const currIndex = this.$refs.slick.currentSlide();

      this.$refs.slick.destroy();
      this.$nextTick(() => {
        this.$refs.slick.create();
        this.$refs.slick.goTo(currIndex, true);
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/slick-carousel/slick/slick.scss';
.product-instruction {
  margin-top: 30px;
  margin-left: 70px;
  text-align: center;
  & span {
    padding-right: 5px;
  }
  & a {
    color: $main;
    font-family: 'MagistralC';
    font-weight: bold;
    font-size: 16px;
    &.disable {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
  &.onePhoto {
    margin-left: 0px;
  }
}

.card__product-slider {
  display: flex;
  margin-left: 100px;
  margin-right: 30px;
  position: relative;
  max-width: 455px;
  min-width: 455px;
  width: 100%;

  .slick-arrow {
    padding: 10px;
    color: #dcc488;
    margin-top: 40px;
    z-index: 1;
  }
  .slick-next {
    right: 15px;
    padding-left: 0;
    padding-right: 0px;
  }
  .slick-prev {
    left: 15px;
    padding-left: 0;
    padding-right: 0px;
    width: 23px;
  }

  .slick-next span:before {
    font-family: 'icomoon';
    content: '\e93f';
    font-size: 23px;
  }
  .slick-prev span:before {
    font-family: 'icomoon';
    font-size: 23px;
    content: '\e944';
  }
  .slick-dots {
    position: absolute;
    top: 0;
    padding: 0;
    left: -100px;
    display: block;
    max-height: 575px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    cursor: move;

    scrollbar-color: #262626 transparent;
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
      background-color: rgba($color: #262626, $alpha: 1);
    }

    li {
      width: 68px;
      height: 68px;
      padding: 0px;
      background-color: #fff;
      border: 1px solid transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #fff;
        border: 1px solid #dcc488;
      }
    }

    & li + li {
      margin-top: 16px;
    }

    .slick-active {
      border: 1px solid #dcc488;
      &:before {
        content: '';
        width: 0px;
        height: 0px;
        background-color: transparent;
      }
    }

    .slick__control {
      max-width: 68px;
      min-width: 68px;
      width: 100%;
      height: 68px;
      & img {
        background-position: cover;
        background-repeat: no-repeat;
        background-size: cover;
        max-width: 57px;
        max-height: 57px;
        text-align: center;
        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid #fff;
        margin: 0 auto;
      }
    }
  }
  .card__product-slider-img {
    background-color: #fff;
    display: flex;
    align-items: center;
    min-height: 575px;
    justify-content: center;
    width: 100%;
    padding: 112px 40px;
    & img {
      cursor: pointer;
      max-height: 348px;
    }
  }
  .card__product-slider-video {
    background-color: #fff;
    display: flex;
    align-items: center;
    height: 575px;
    width: 100%;
    padding: 112px 40px;
    & iframe {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
.no-previews {
  margin-left: 0px;
  margin-bottom: 0;
}
.module-card__product-inner {
  .card__product-slider {
    .slick-dots {
      max-height: 452px;
    }
  }
}

@media (max-width: 1200px) {
  .card__product-slider {
    margin-right: 0px;
    max-width: 468px;
  }
}

@media (max-width: 1000px) {
  .module-card__product-inner {
    .card__product-slider {
      .slick-dots {
        max-height: 400px;
      }
    }
  }
  .modal-mask {
    .card__product-slider-video {
      & iframe {
        height: 400px;
      }
    }
    .card__product-slider-img {
      & img {
        max-height: 400px;
      }
    }
  }
}
@media (max-width: 700px) {
  .modal-mask {
    .card__product-slider {
      .slick-dots {
        top: auto;
        bottom: -140px;
        left: 0;
        right: 0;
        display: flex;
        overflow-x: auto;
        & li {
          margin: 10px;
          & + li {
            margin-top: 0px;
          }
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .product-instruction {
    margin-left: 0px;
  }
  .card__product-slider {
    margin: 0 auto;
    margin-bottom: 100px;

    .slick-dots {
      top: auto;
      bottom: -100px;
      left: 0;
      right: 0;
      display: flex;
      padding-right: 0px;
      overflow-x: auto;

      & li {
        margin: 10px;
        margin-top: 0px;
        & button {
          width: max-content;
        }
        & + li {
          margin-top: 0px;
        }
      }
    }
    .card__product-slider-img {
      min-height: 400px;
      padding: 0;
      & img {
        max-height: 400px;
      }
    }
    .card__product-slider-video {
      height: 400px;
      padding: 0px;
      & iframe {
        cursor: pointer;
        width: 375px;
        height: 348px;
        border: none;
        margin: 0 auto;
      }
    }
  }
  .no-previews {
    margin-bottom: 0;
  }
  .modal-mask {
    .card__product-slider {
      .slick-dots {
        bottom: -140px;
      }
      .card__product-slider-video {
        & iframe {
          height: 250px;
        }
      }
      .card__product-slider-img {
        & img {
          max-height: 250px;
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .card__product-slider {
    max-width: 400px;
    min-width: 400px;
    .slick-prev,
    .slick-next {
      display: none !important;
    }
  }
}
@media (max-width: 440px) {
  .card__product-slider {
    max-width: 360px;
    min-width: 360px;
  }
}
@media (max-width: 420px) {
  .modal-mask {
    .card__product-slider {
      .slick-dots {
        bottom: -100px;
        & li {
          margin: 5px;
        }
      }
    }
  }
}
@media (max-width: 400px) {
  .card__product-slider {
    max-width: 320px;
    min-width: 320px;
    .card__product-slider-img {
      min-height: 320px;
      padding: 0;
      & img {
        max-height: 320px;
      }
    }
    .card__product-slider-video {
      height: 320px;
      padding: 0px;
      & iframe {
        cursor: pointer;
        width: 320px;
        height: 320px;
        border: none;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 350px) {
  .card__product-slider {
    max-width: 300px;
    min-width: 300px;
  }
}
@media (max-width: 340px) {
  .card__product-slider {
    .card__product-slider-img {
      min-height: 288px;
      padding: 0;
      & img {
        max-height: 288px;
      }
    }
    .card__product-slider-video {
      height: 288px;
      padding: 0px;
      & iframe {
        cursor: pointer;
        width: 288px;
        height: 288px;
        border: none;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 330px) {
  .card__product-slider {
    max-width: 290px;
    min-width: 290px;
  }
}
</style>

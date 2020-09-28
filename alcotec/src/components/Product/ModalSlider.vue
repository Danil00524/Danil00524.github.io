<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="module-card__product-inner">
            <div
              class="module__enter-client-close"
              @click="$emit('closeModal')"
            ></div>
            <div class="module-card__product-suptitle">
              {{ product.totalInfo.type[actualLang.index] }}
            </div>
            <div class="module-card__product-title">
              {{ product.totalInfo.title }}
            </div>
            <slick class="card__product-slider" :options="slickOptions">
              <div v-for="slide in product.img" :key="slide.id">
                <div v-if="!slide.video" class="card__product-slider-img">
                  <img :src="`${baseDomainImg}${slide.url}`" alt />
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
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Slick from 'vue-slick';

import { mapState } from 'vuex';
import { baseDomainImg } from '../../constans';

export default {
  name: 'ModalSlider',
  components: {
    Slick,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      slickOptions: {
        prevArrow: null,
        nextArrow: null,
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
      showModal: false,
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

<style lang="scss" scoped>
@import '../../../node_modules/slick-carousel/slick/slick.scss';

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 1140px;
  width: 100%;
  height: 640px;
  margin: 0px auto;
  padding: 62px 64px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.module__enter-client-close {
  top: -70px;
  right: -60px;
}

.module-card__product-suptitle,
.module-card__product-title {
  text-align: center;
  font-style: normal;
  color: #1d1d1d;
}

.module-card__product-suptitle {
  font-weight: normal;
  font-size: 16px;
  font-family: 'Open Sans';
  line-height: 22px;
  padding-bottom: 10px;
}

.module-card__product-title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.02em;
  font-weight: bold;
  padding-bottom: 16px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: table;
  transition: opacity 0.3s ease;
  .card__product-slider-img {
    position: relative;
    padding: 0px;
    background-color: transparent;
    max-width: 487px;
    width: 100%;
    min-height: 452px;
    max-height: 452px;
    margin: 0 auto;
    & img {
      display: block;
      max-height: 452px;
    }
  }
  .card__product-slider {
    padding: 0px;
    background: transparent;
    display: flex;
    margin-left: 85px;
    position: relative;
    max-width: 850px;
    justify-content: center;
    max-height: 452px;
  }
  .card__product-slider-video {
    padding: 0px;
    background: transparent;
    justify-content: center;
    width: 100%;
    max-height: 452px;
    height: 100%;
    max-width: 487px;
    margin: 0 auto;
    & iframe {
      max-width: 487px;
      width: 100%;
      height: 452px;
    }
  }
}

@media (max-width: 1200px) {
  .modal-container {
    max-width: 900px;
  }
  .modal-mask {
    .card__product-slider {
      max-width: 700px;
      min-width: auto;
    }
  }
}
@media (max-width: 1000px) {
  .modal-container {
    max-width: 700px;
  }
  .modal-mask {
    .card__product-slider {
      max-width: 500px;
    }
    .card__product-slider-video {
      max-height: 400px;
      & iframe {
        height: 400px;
      }
    }
    .card__product-slider-img {
      max-height: 400px;
      min-height: 400px;
      & img {
        max-height: 400px;
      }
    }
  }
}
@media (max-width: 700px) {
  .modal-container {
    max-width: 550px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 100px;
  }
  .modal-mask {
    .module__enter-client-close {
      right: -20px;
    }
    .module-card__product-title {
      font-size: 24px;
    }
    .card__product-slider {
      max-width: 100%;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    .card__product-slider-video {
      max-height: 330px;
      & iframe {
        height: 330px;
      }
    }
    .card__product-slider-img {
      max-height: 330px;
      min-height: 330px;
      & img {
        max-height: 330px;
      }
    }
  }
}
@media (max-width: 600px) {
  .modal-container {
    // max-width: 400px;
    height: 550px;
  }
  .modal-mask {
    .module__enter-client-close {
      right: -20px;
    }
    .module-card__product-title {
      font-size: 24px;
    }
    .card__product-slider {
      max-width: 400px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    .card__product-slider-video {
      max-height: 250px;
      & iframe {
        height: 250px;
      }
    }
    .card__product-slider-img {
      max-height: 250px;
      min-height: 250px;
      & img {
        max-height: 250px;
      }
    }
  }
}
@media (max-width: 481px) {
  .modal-container {
    padding-bottom: 50px;
  }
}
@media (max-width: 420px) {
  .modal-container {
    max-width: 320px;
  }
}
</style>

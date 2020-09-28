<template>
  <section class="personal__cabinet-slider-main">
    <div class="slick" ref="slick">
      <slick ref="slick" :options="slickOptions">
        <router-link
          v-for="slide in slides"
          :key="slide.id"
          :to="{
            path: `/profile/promo?promo_id=${slide.id}#${slide.page}`,
          }"
        >
          <div class="personal__cabinet-slider">
            <div class="personal__cabinet-slider-left">
              <div
                v-if="slide.imgLeft"
                class="personal__cabinet-slider-left-img"
              >
                <img :src="`${baseDomainImg}${slide.imgLeft}`" alt />
              </div>
              <div class="personal__cabinet-slider-left-subtitle">
                {{ staticText.text[1][actualLang.index] }}
                {{ slide.period.from }}
                по
                {{ slide.period.to }}
              </div>
              <div class="personal__cabinet-slider-left-title">
                {{ slide.title[actualLang.index] }}
              </div>
            </div>
            <div class="personal__cabinet-slider-right">
              <div
                v-if="slide.imgRight"
                class="personal__cabinet-slider-right-img"
              >
                <img :src="`${baseDomainImg}${slide.imgRight}`" alt />
              </div>
            </div>
          </div>
        </router-link>
      </slick>
    </div>
  </section>
</template>

<script>
import Slick from 'vue-slick';
import { mapState } from 'vuex';
import { staticText } from '../../i18n';
import { baseDomainImg } from '../../constans';

export default {
  name: 'PromoSlider',
  components: {
    Slick,
  },
  data() {
    return {
      staticText,
      baseDomainImg,
      slickOptions: {
        prevArrow: `<button class="slick-prev" type="button">
            <img src="${require('../../assets/img/projects/slider-arrow-preview.png')}" alt />
          </button>`,
        nextArrow: `<button class="slick-next" type="button">
            <img src="${require('../../assets/img/projects/slider-arrow-next.png')}" alt />
          </button>`,
        dots: true,
        customPaging: (slick, index) => {
          return `
            <button type="button" class="slick__control">
              <img src="${this.baseDomainImg}${this.slides[index].imgRight}" alt />
            </button>
          `;
        },
        // Any other options that can be got from plugin documentation
      },
    };
  },
  computed: {
    ...mapState({
      slides: (state) => state.promos.promos,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  mounted() {
    const lastSlide = this.$refs['slick'];
    const slickDots = lastSlide.querySelector('.slick-dots');
    const li = document.createElement('li');
    const button = `
                  <div class="personal__cabinet-slider-item-action">
                    <a class="go" href>
                      ${this.staticText.text.allPromos[this.actualLang.index]}
                    </a>
                  </div>
                `;
    li.innerHTML = button;
    const a = li.querySelector('.go');

    a.addEventListener('click', (e) => {
      e.preventDefault();
      this.$router.push('/profile/promo');
    });
    slickDots.append(li);
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/slick-carousel/slick/slick.scss';
.go {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.personal__cabinet-container {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 80px;
}
.personal__cabinet-slider {
  display: flex;
  cursor: pointer;
}
.personal__cabinet-slider-left {
  max-width: 565px;
  width: 100%;
  background-color: #fff;
  padding-left: 76px;
  position: relative;
}
.personal__cabinet-slider-left-img {
  min-height: 170px;
  & img {
    display: block;
    max-height: 170px;
    max-width: 150px;
  }
}
.personal__cabinet-slider-left-subtitle {
  line-height: 19px;
  color: #9b9b9b;
  padding-top: 24px;
  padding-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.personal__cabinet-slider-left-title {
  font-family: 'MagistralC';
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #1d1d1d;
  max-width: 467px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.personal__cabinet-slider-right {
  max-width: 565px;
  width: 100%;
  position: relative;
  min-height: 292px;
  max-height: 292px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.personal__cabinet-slider-right-img {
  max-width: 570px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 292px;
  & img {
    display: block;
    max-height: 292px;
  }
}
.slick-dots {
  display: flex;
  li {
    width: 136px;
    height: 102px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 19px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & button {
      display: block;
    }
    &:last-child {
      height: 100%;
      width: auto;
      border: none;
      padding: 0;
      .personal__cabinet-slider-item-action {
        height: 102px;
        width: 178px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        cursor: pointer;
        padding: 31px 29px;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          font-family: 'MagistralC';
          font-size: 15.7px;
          line-height: 18px;
          max-height: 18px;
          text-align: center;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a12c3a !important;
          font-weight: bold;
          transition: all 0.3s;
          white-space: nowrap;
          overflow: hidden;
          display: block;
          &:hover {
            color: #c94353 !important;
          }
        }
      }
    }
  }
}
li.slick-active {
  position: relative;
  &:before {
    content: '';
    width: 136px;
    height: 4px;
    background-color: #dcc488;
    position: absolute;
    bottom: 0px;
    left: -1px;
  }
}

.slick__control {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 96px;
    max-height: 70px;
    display: block;
  }
}
.slick-arrow {
  transform: translateY(-50%);
  position: absolute;
  top: calc(50% - 50px);
  z-index: 1;
  img {
    display: block;
  }
}
.slick-next {
  right: 10px;
}
.slick-prev {
  left: 10px;
}
.slick {
  position: relative;
  max-width: 1130px;
  width: 100%;
}
.personal__cabinet-slider-main {
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 80px;
}

@media (max-width: 1130px) {
  .personal__cabinet-slider-main {
    padding-bottom: 0px;
    .personal__cabinet-slider {
      justify-content: center;
      .personal__cabinet-slider-left {
        display: none;
      }
      .personal__cabinet-slider-right {
        max-width: 100%;
        .personal__cabinet-slider-right-img {
          max-width: 100%;
          & img {
            max-width: 100%;
          }
        }
      }
    }
    .slick {
      .slick-slider {
        .slick-arrow {
          display: none !important;
        }
        .slick-dots {
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
          & li {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}

@media (max-width: 440px) {
  .slick-dots {
    li {
      &:last-child {
        .personal__cabinet-slider-item-action {
          width: 136px;
          padding: 31px 8px;
        }
      }
    }
  }
}

@media (max-width: 425px) {
  .personal__cabinet-slider-main {
    .personal__cabinet-slider-right {
      min-height: 250px;
      .personal__cabinet-slider-right-img {
        max-height: 250px;
        & img {
          max-height: 250px;
        }
      }
    }
  }
}
@media (max-width: 375px) {
  .personal__cabinet-slider-main {
    .personal__cabinet-slider-right {
      min-height: 200px;
      .personal__cabinet-slider-right-img {
        max-height: 200px;
        & img {
          max-height: 200px;
        }
      }
    }
  }
}
</style>

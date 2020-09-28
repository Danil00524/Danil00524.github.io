<template>
  <hooper :autoPlay="true" :playSpeed="7000" class="hooper__main__gues-slider">
    <slide v-for="promo in promos" :key="promo.id">
      <div class="main__gues-slider">
        <div class="main__guest-slider-left">
          <div class="main__guest-slider-left-img">
            <img
              v-if="promo.imgLeft"
              :src="`${baseDomainImg}${promo.imgLeft}`"
              alt
            />
          </div>
          <div class="main__guest-slider-left-subtitle">
            {{ staticText.text[1][actualLang.index] }}
            {{ promo.period.from }} по
            {{ promo.period.to }}
          </div>
          <div class="main__guest-slider-left-title">
            {{ promo.title[actualLang.index] }}
          </div>
        </div>
        <div class="main__guest-slider-right">
          <div class="main__guest-slider-right-img">
            <img
              v-if="promo.imgRight"
              :src="`${baseDomainImg}${promo.imgRight}`"
              alt
            />
            <div class="main__guest-slider-action">
              <router-link
                :to="{
                  path: `/promo?promo_id=${promo.id}#${promo.page}`,
                }"
              >
                {{ staticText.btns[3][actualLang.index] }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </slide>
    <hooper-pagination slot="hooper-addons" />
  </hooper>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

import { mapState } from 'vuex';
import { store } from '../store';
import { staticText } from '../i18n';
import { baseDomainImg } from '../constans';

export default {
  name: 'Slider',
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  data() {
    return {
      staticText,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      promos: (state) => state.promos.promos,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  created() {
    store.dispatch('promos/getPromo', () => {});
  },
};
</script>

<style lang="scss">
.hooper {
  height: 100%;
  outline: none;
}
.hooper-indicator {
  list-style: none;
  border-radius: 0;
  margin: 0;
  outline: none;
}
.hooper__main__gues-slider {
  width: 1188px;
  .hooper-pagination {
    left: 0;
    right: 100%;
    padding: 0;
    bottom: 23px;
  }
  .hooper-indicators {
    & li + li {
      margin-left: 10px;
    }
  }
  .hooper-indicator {
    width: 10px;
    height: 10px;
    border: 1px solid #dcc488;
    transition: all 0.3s;
    &:hover {
      background-color: #dcc488;
    }
  }
  .hooper-indicator.is-active {
    background-color: #dcc488;
  }
}

.main__gues-slider {
  display: flex;
  position: relative;
  max-width: 1208px;
  width: 100%;
  cursor: pointer;
}
.main__guest-slider-left {
  max-width: 568px;
  width: 100%;
  background-color: #fff;
}
.main__guest-slider-left-img {
  min-height: 200px;
  text-align: left;
  & img {
    display: block;
    max-width: 250px;
    max-height: 200px;
  }
}
.main__guest-slider-left-subtitle {
  line-height: 19px;
  color: #9b9b9b;
  padding-top: 24px;
  padding-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.main__guest-slider-left-title {
  font-family: 'MagistralC';
  font-weight: bold;
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: #1d1d1d;
  max-width: 493px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.main__guest-slider-dots {
  padding-top: 45px;
  padding-bottom: 24px;
  display: flex;
  position: relative;
  & li {
    width: 10px;
    height: 10px;
    list-style: none;
    border: 1px solid #dcc488;
    &:first-child {
      background-color: #dcc488;
    }
  }
  & li + li {
    margin-left: 10px;
  }
}
.main__guest-slider-right {
  max-width: 640px;
  width: 100%;
  min-height: 412px;
  max-height: 412px;
  display: flex;
  align-items: flex-start;
  position: relative;
  background-color: #fff;
}
.main__guest-slider-right-img {
  display: flex;
  justify-content: flex-end;
  max-width: 640px;
  width: 100%;
  & img {
    display: block;
    max-height: 412px;
  }
}
.main__guest-slider-action {
  position: absolute;
  bottom: 0px;
  right: 0;
  color: #ffffff;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  & a {
    color: #ffffff;
    background-color: #1d1d1d;
    padding: 24px 40px 24px 116px;
    font-family: 'MagistralC';
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    position: relative;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 370px;

    &::before {
      position: absolute;
      content: '';
      width: 60px;
      height: 1px;
      background-color: #fff;
      top: 32px;
      left: 40px;
    }
  }
}

@media (max-width: 1600px) {
  .hooper__main__gues-slider {
    width: 1000px;
  }
}
@media (max-width: 1420px) {
  .hooper__main__gues-slider {
    width: 930px;
  }
}
@media (max-width: 1360px) {
  .hooper__main__gues-slider {
    width: 880px;
  }
}
@media (max-width: 1285px) {
  .hooper__main__gues-slider {
    width: 783px;
  }
}

@media (max-width: 1200px) {
  .hooper__main__gues-slider {
    width: 1150px;
  }
  .main__guest-top-architectors {
    padding-bottom: 50px;
  }
}
@media (max-width: 1160px) {
  .hooper__main__gues-slider {
    width: 1000px;
  }
}
@media (max-width: 1075px) {
  .hooper__main__gues-slider {
    width: 950px;
  }
}
@media (max-width: 1000px) {
  .hooper__main__gues-slider {
    width: 900px;
  }
}
@media (max-width: 919px) {
  .hooper__main__gues-slider {
    margin: 0 -15px;
    .hooper-pagination {
      left: 23px;
    }
  }
  .main__gues-slider {
    flex-wrap: wrap;
    .main__guest-slider-left {
      display: none;
    }
    .main__guest-slider-right {
      max-width: 100%;
      .main__guest-slider-right-img {
        max-width: 100%;
        justify-content: center;
        min-height: auto;
        .main__guest-slider-right-img {
          max-width: 100%;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .hooper__main__gues-slider {
    .hooper-pagination {
    }
  }
  .main__guest-slider-action {
    & a {
      padding: 15px;
      &::before {
        display: none;
      }
    }
  }
}

@media (max-width: 450px) {
  .hooper__main__gues-slider {
    .hooper-pagination {
      left: 23px;
      bottom: 60px;
    }
  }
}
@media (max-width: 400px) {
  .main__guest-slider-action {
    & a {
      line-height: 12px;
      font-size: 12px;
    }
  }
  .socialLinks-item {
    & span:last-child {
      display: none;
    }
  }
}
</style>

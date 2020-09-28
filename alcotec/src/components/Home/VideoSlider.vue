<template>
  <div class="main__guest-bottom-slider">
    <div class="main__guest-slider-video__overview">
      <div class="main__guest-slider-video__overview-suptitle">
        {{ staticText.videosBlock.title[actualLang.index] }}
      </div>
      <div class="main__guest-slider-video__overview-title">
        <router-link :to="titleLink">
          {{ titleSlide }}
        </router-link>
      </div>
      <a
        href="https://www.youtube.com/channel/UCmVdgNHsyFS8U4s7ayopYPQ/videos"
        class="main__guest-slider-see__all"
        target="_blank"
      >
        {{ staticText.videosBlock.showAll[actualLang.index] }}
      </a>
    </div>

    <hooper
      class="hooper__main__guest-bottom-slider"
      :progress="true"
      :auto-play="true"
      :play-speed="7000"
      @slide="updateCarousel"
    >
      <hooper-navigation slot="hooper-addons" />
      <slide v-for="(slide, index) in videoReviews" :key="index">
        <div
          class="main__guest-slider-left-video__box item-slide"
          :class="{
            withOutOne: !videoReviews[index + 1],
            withOutTwo: !videoReviews[index + 2],
          }"
        >
          <iframe
            v-if="!slide.status1"
            :srcdoc="
              `<!DOCTYPE html><img src='https://img.youtube.com/vi/${slide.video}/maxresdefault.jpg'
              style='
              position: absolute;
              width: 100%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              '/>`
            "
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            allowfullscreen
          ></iframe>
          <iframe
            v-else
            :src="`https://www.youtube.com/embed/${slide.video}?autoplay=1`"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
            allow="autoplay"
            allowfullscreen
          ></iframe>

          <div
            v-if="!slide.status1"
            class="btn-play"
            @click="slide.status1 = !slide.status1"
          ></div>
        </div>

        <div
          v-if="videoReviews[index + 1] && videoReviews[index + 1].video"
          class="main__guest-slider-right-video__box"
          :class="{ withOutTwo: !videoReviews[index + 2] }"
        >
          <div
            class="item-slide"
            :class="{ withOutTwo: !videoReviews[index + 2] }"
          >
            <iframe
              v-if="!videoReviews[index + 1].status2"
              class="main__guest-slider-right-video__box-top"
              :srcdoc="
                `<!DOCTYPE html><img src='https://img.youtube.com/vi/${
                  videoReviews[index + 1].video
                }/maxresdefault.jpg'
              style='
              position: absolute;
              width: 100%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              '/>`
              "
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              allowfullscreen
            ></iframe>
            <iframe
              v-else
              class="main__guest-slider-right-video__box-top"
              :src="
                `https://www.youtube.com/embed/${
                  videoReviews[index + 1].video
                }?autoplay=1`
              "
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              allow="autoplay"
              allowfullscreen
            ></iframe>

            <div
              v-if="!videoReviews[index + 1].status2"
              class="btn-play"
              @click="
                videoReviews[index + 1].status2 = !videoReviews[index + 1]
                  .status2
              "
            ></div>
          </div>

          <div
            v-if="videoReviews[index + 2] && videoReviews[index + 1].video"
            class="item-slide"
          >
            <iframe
              v-if="!videoReviews[index + 2].status3"
              class="main__guest-slider-right-video__box-bottom"
              :srcdoc="
                `<!DOCTYPE html><img src='https://img.youtube.com/vi/${
                  videoReviews[index + 2].video
                }/maxresdefault.jpg'
              style='
              position: absolute;
              width: 100%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              '/>`
              "
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              allowfullscreen
            ></iframe>

            <iframe
              v-else
              class="main__guest-slider-right-video__box-bottom"
              :src="
                `https://www.youtube.com/embed/${
                  videoReviews[index + 2].video
                }?autoplay=1`
              "
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              allow="autoplay"
              allowfullscreen
            ></iframe>

            <div
              v-if="!videoReviews[index + 2].status3"
              class="btn-play"
              @click="
                videoReviews[index + 2].status3 = !videoReviews[index + 2]
                  .status3
              "
            ></div>
          </div>
        </div>
      </slide>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';

import { mapState } from 'vuex';
import { store } from '../../store';
import { staticText } from '../../i18n';

export default {
  name: 'VideoSlider',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  data() {
    return {
      staticText,
      titleSlide: '',
      titleLink: '',
    };
  },
  computed: {
    ...mapState({
      videoReviews: (state) => state.videoReviews.videoReviews,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  created() {
    store.dispatch('videoReviews/getVideoReviews', (data) => {
      this.titleSlide = data[0].title[this.actualLang.index];
      this.titleLink = data[0].link;
    });
  },
  methods: {
    updateCarousel(payload) {
      if (this.videoReviews) {
        this.videoReviews.forEach((e) => {
          e.status1 = false;
          e.status2 = false;
          e.status3 = false;
        });

        this.titleSlide = this.videoReviews[payload.currentSlide].title[
          this.actualLang.index
        ];
        this.titleLink = this.videoReviews[payload.currentSlide].link;
      }
    },
  },
};
</script>

<style lang="scss">
.hooper {
  height: auto;
  .hooper-list {
    .hooper-track {
      & li {
        display: flex;
        width: 100% !important;
      }
    }
    .hooper-navigation {
      .hooper-prev,
      .hooper-next {
        outline: none;
      }
      .hooper-prev,
      .hooper-next {
        width: 40px;
        height: 40px;
        transition: all 0.3s;
        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '\e944';
          font-family: 'icomoon';
          z-index: 10;
          color: #dcc488;
        }
        & svg {
          display: none;
        }
      }
      .hooper-next {
        &::before {
          content: '\e93f';
        }
      }
      .hooper-prev.is-disabled,
      .hooper-next .is-disabled {
        opacity: 0.3;
      }
    }
  }
}

.hooper__main__guest-bottom-slider {
  width: 997px;
  height: 480px;
  .hooper-navigation {
    .hooper-prev,
    .hooper-next {
      top: 60%;
    }
    .hooper-prev,
    .hooper-next {
      left: -314px;
      border: 1px solid #dcc488;
      &::before {
        font-size: 20px;
      }
    }
    .hooper-next {
      left: -254px;
    }
  }
}

.main__guest-bottom-slider {
  display: flex;
  background: #f4f4f4;
  width: 100%;
}
.main__guest-slider-video__overview {
  padding-left: 50px;
  padding-right: 50px;
  max-width: 361px;
  width: 100%;
}
.main__guest-slider-video__overview-suptitle {
  line-height: 19px;
  color: #1d1d1d;
  padding-top: 50px;
}
.main__guest-slider-video__overview-title {
  & a {
    color: #1d1d1d;
    font-family: 'MagistralC';
    font-size: 24px;
    transition: all 0.3s;
    line-height: 34px;
    letter-spacing: 0.02em;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    text-transform: uppercase;
    max-height: 175px;
    max-width: 260px;
    min-height: 175px;
    &:hover {
      color: #a12c3a;
    }
  }
  margin-top: 24px;
  margin-bottom: 45px;
}
.main__guest-slider-arrow-preview {
  content: '';
  background: url(../../assets/img/main_page/slider-arrow-preview.svg);
  width: 40px;
  height: 40px;
}
.main__guest-slider-arrow-next {
  content: '';
  background: url(../../assets/img/main_page/slider-arrow-next.svg);
  margin-left: 20px;
  width: 40px;
  height: 40px;
}
.main__guest-slider-see__all {
  display: block;
  font-family: 'MagistralC';
  line-height: 16px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #1d1d1d;
  padding-left: 76px;
  margin-top: 160px;
  position: relative;
  font-weight: bold;
  transition: all 0.3s;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    color: #a12c3a;
  }
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 1px;
    left: 0;
    bottom: 8px;
    background-color: #a12c3a;
  }
}
.main__guest-slider-left-video__box {
  max-width: 628px;
  width: 100%;
  & iframe {
    width: 100%;
    height: 480px;
    border: none;
  }
}
.main__guest-slider-left-video__box.item-slide.withOutOne.withOutTwo {
  max-width: 100%;
}
.main__guest-slider-left-video__box.item-slide.withOutTwo {
  max-width: 50%;
}
.main__guest-slider-right-video__box.withOutTwo {
  max-width: 50%;
  height: 100%;
  .item-slide.withOutTwo {
    height: 100%;
    & iframe {
      height: 100%;
    }
  }
}
.main__guest-slider-right-video__box {
  display: flex;
  flex-direction: column;
  max-width: 369px;
  width: 100%;
  height: 240px;
  .item-slide {
    height: inherit;
    & iframe {
      height: 240px;
      width: 100%;
      border: none;
    }
  }
}
.item-slide {
  position: relative;
}
.btn-play {
  background-image: url('../../assets/img/play_button.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 80px;
  width: 80px;
  top: 50%;
  left: 50%;
  margin-left: -45px;
  margin-top: -30px;
  position: absolute;
  background-position: 50% 50%;
  cursor: pointer;
}

@media (max-width: 1700px) {
  .hooper__main__guest-bottom-slider {
    width: 912px;
  }
  .main__guest-slider-left-video__box.item-slide {
    max-width: 100%;
  }
  .main__guest-slider-left-video__box.item-slide.withOutTwo {
    max-width: 100%;
  }
  .main__guest-slider-right-video__box {
    display: none;
  }
}
@media (max-width: 1600px) {
  .hooper__main__guest-bottom-slider {
    width: 827px;
  }
}
@media (max-width: 1536px) {
  .hooper__main__guest-bottom-slider {
    width: 748px;
  }
}
@media (max-width: 1440px) {
  .hooper__main__guest-bottom-slider {
    width: 663px;
  }
}
@media (max-width: 1366px) {
  .hooper__main__guest-bottom-slider {
    width: 578px;
  }
}
@media (max-width: 1280px) {
  .hooper__main__guest-bottom-slider {
    width: 493px;
  }
}
@media (max-width: 1200px) {
  .main__guest-bottom-slider {
    order: -1;
  }
  .hooper__main__guest-bottom-slider {
    width: 839px;
  }
}
@media (max-width: 919px) {
  .main__guest-bottom-slider {
    flex-wrap: wrap;
  }
  .hooper__main__guest-bottom-slider {
    width: 919px;
  }
  .main__guest-slider-video__overview {
    max-width: 100%;
  }
  .main__guest-slider-left-video__box {
    & iframe {
      height: 100%;
    }
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev,
  .hooper .hooper-list .hooper-navigation .hooper-next {
    top: -35%;
    left: 35%;
  }
  .hooper .hooper-list .hooper-navigation .hooper-next {
    left: 60%;
  }
  .main__guest-slider-see__all {
    padding-bottom: 50px;
    &:before {
      bottom: 57px;
    }
  }
  .main__guest-slider-video__overview-title {
    max-width: 100%;
    & a {
      min-height: 68px;
      max-width: 100%;
      -webkit-line-clamp: 2;
    }
  }
}
@media (max-width: 700px) {
  .hooper__main__guest-bottom-slider {
    height: 400px;
  }
  .main__guest-slider-video__overview-title {
    margin-bottom: 24px;
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev,
  .hooper .hooper-list .hooper-navigation .hooper-next {
    top: -40%;
  }
}
@media (max-width: 600px) {
  .hooper__main__guest-bottom-slider {
    height: 350px;
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev,
  .hooper .hooper-list .hooper-navigation .hooper-next {
    top: -45%;
  }
}
@media (max-width: 500px) {
  .hooper__main__guest-bottom-slider {
    height: 300px;
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev,
  .hooper .hooper-list .hooper-navigation .hooper-next {
    top: -50%;
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev {
    left: 25%;
  }
}
@media (max-width: 400px) {
  .hooper__main__guest-bottom-slider {
    height: 250px;
  }
  .hooper .hooper-list .hooper-navigation .hooper-prev,
  .hooper .hooper-list .hooper-navigation .hooper-next {
    top: -60%;
  }
}
@media (max-width: 360px) {
  .main__guest-slider-video__overview {
    padding: 0 35px;
  }
}
</style>

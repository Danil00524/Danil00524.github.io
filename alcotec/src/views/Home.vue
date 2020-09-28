<template>
  <section class="main-page">
    <RegistrationSuccess v-if="successPopup" ref="RegistrationSuccess" />
    <div class="main__guest-top">
      <div class="custom-container">
        <div class="main__guest-wrapper-top">
          <SliderAction />
          <BecomeArchitectors />
        </div>
      </div>
    </div>
    <div class="main__guest-bottom">
      <div class="custom-container-outside">
        <div class="main__page-container main__guest-wrapper-bottom">
          <AdditionalNavigation />
          <VideoSlider />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import SliderAction from '../components/SliderAction.vue';
import BecomeArchitectors from '../components/Home/BecomeArchitectors.vue';
import AdditionalNavigation from '../components/Home/AdditionalNavigation.vue';
import VideoSlider from '../components/Home/VideoSlider.vue';
import RegistrationSuccess from '../components/Popups/RegistrationSuccess.vue';

export default {
  name: 'Home',
  components: {
    SliderAction,
    BecomeArchitectors,
    AdditionalNavigation,
    VideoSlider,
    RegistrationSuccess,
  },
  computed: {
    ...mapState({
      successPopup: (state) => state.profiles.successRegPopup,
    }),
  },
};
</script>

<style lang="scss">
.main-page {
  margin-bottom: -497px;
}
.custom-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.main__page-container {
  width: 100%;
  margin-left: auto;
}
.custom-container-outside {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
}
.main__guest-top {
  background-color: #fff;
}
.main__guest-wrapper-top {
  display: flex;
}
.main__guest-bottom {
  background-color: #a12c3a;
}
.main__guest-wrapper-bottom {
  display: flex;
}
@media (max-width: 1200px) {
  .custom-container-outside {
    padding-left: 0;
  }
  .main-page {
    margin-bottom: -525px;
  }
  .main__guest-wrapper-top {
    justify-content: center;
    flex-wrap: wrap;
  }
  .main__guest-wrapper-bottom {
    flex-wrap: wrap;
  }
}
@media (max-width: 920px) {
  .main-page {
    margin-bottom: -650px;
  }
}
@media (max-width: 700px) {
  .main-page {
    margin-bottom: -753px;
  }
}
@media (max-width: 655px) {
  .main-page {
    margin-bottom: -775px;
  }
}
@media (max-width: 638px) {
  .main-page {
    margin-bottom: -782px;
  }
}
@media (max-width: 480px) {
  .main-page {
    margin-bottom: -1035px;
  }
}
@media (max-width: 425px) {
  .main-page {
    margin-bottom: -1057px;
  }
}
@media (max-width: 362px) {
  .main-page {
    margin-bottom: -1079px;
  }
}
@media (max-width: 332px) {
  .main-page {
    margin-bottom: -1106px;
  }
}
</style>

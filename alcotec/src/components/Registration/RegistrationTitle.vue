<template>
  <div>
    <div class="main__registration-title">
      <ArrowGoBack backRoutePath="/" />
      {{ staticText.titles.regTitle[actualLang.index] }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArrowGoBack from '../ArrowGoBack.vue';
import { staticText } from '../../i18n';

export default {
  name: 'RegistrationTitle',
  components: {
    ArrowGoBack,
  },
  data() {
    return {
      staticText,
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
.main__registration-title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 37px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  padding-bottom: 40px;
  position: relative;
  font-weight: bold;
  & button {
    padding-right: 17px;
    color: #9b9b9b;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    &:before {
      transition: all 0.3s;
    }
    &:hover:before {
      color: #000;
    }
  }
}

@media (max-width: 587px) {
  .main__registration-title {
    font-size: 25px;
  }
}
@media (max-width: 470px) {
  .main__registration-title {
    font-size: 19px;
  }
}
@media (max-width: 370px) {
  .main__registration-title {
    font-size: 16px;
  }
}
</style>

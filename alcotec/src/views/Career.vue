<template>
  <div class="career">
    <div class="custom-container">
      <h1 class="about_title">{{ brand[actualLang.index] }}</h1>
      <div class="under__construction">
        {{ inDevelop[actualLang.index] }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

export default {
  name: 'Career',
  data() {
    return {
      brand: staticText.additionalMenu.menu[2].text,
      inDevelop: staticText.titles.inDevelop,
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
.career {
  margin: 0;
  background-color: #ffffff;
  min-height: 32.5vh;
}
.about_title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
  padding-bottom: 32px;
  padding-top: 32px;
}
p {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #1d1d1d;
  padding-bottom: 32px;
}
</style>

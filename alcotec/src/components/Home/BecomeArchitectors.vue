<template>
  <div class="main__guest-top-architectors">
    <div class="main__guest-top-architectors-title">
      <router-link to="/registration">
        {{ staticText.socialBlock.text[actualLang.index] }}
      </router-link>
    </div>
    <div class="socialLinks__connect-to-us">
      {{ staticText.socialBlock.joinUs[actualLang.index] }}
    </div>
    <SocialLinks class="socialLinks-before-close" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SocialLinks from '../SocialLinks.vue';
import { staticText } from '../../i18n';

export default {
  name: 'BecomeArchitectors',
  components: {
    SocialLinks,
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
.socialLinks__connect-to-us {
  line-height: 19px;
  color: $dark_gray;
  padding-bottom: 32px;
  margin-top: 6px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.main__guest-top-architectors {
  max-width: 412px;
  width: 100%;
  background-color: #fff;
  padding-left: 50px;
  .socialLinks {
    .socialLinks-before {
      display: none !important;
    }
  }
}
.main__guest-top-architectors-title {
  padding-top: 50px;
  min-height: 280px;
  max-height: 280px;
  & a {
    text-decoration: underline;
    color: #1d1d1d;
    font-family: 'MagistralC';
    font-size: 32px;
    line-height: 44px;
    font-weight: bold;
    transition: all 0.3s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    &:hover {
      opacity: 0.8;
    }
  }
}
.main__guest-top-architectors-subtitle {
  line-height: 19px;
  color: #9b9b9b;
  padding-bottom: 64px;
}
.main__guest-top-architectors-icon {
  & a {
    color: #1d1d1d;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.02em;
    transition: all 0.3s;
    position: relative;
    & + a {
      margin-left: 37px;
    }
    &:hover {
      color: #a12c3a;
    }
    &:before {
      font-family: 'icomoon';
      content: '\e92a';
      position: absolute;
      font-size: 24px;
      bottom: 26px;
      left: 0;
    }
    &:nth-child(2)::before {
      content: '\e923';
    }
    &:nth-child(3)::before {
      content: '\e94d';
    }
    &:nth-child(4)::before {
      content: '\e948';
    }
  }
}

@media (max-width: 1200px) {
  .main__guest-top-architectors {
    padding-left: 0px;
    max-width: 700px;
    text-align: center;
    .socialLinks-items {
      justify-content: center;
    }
  }
  .main__guest-top-architectors-title {
    min-height: 120px;
  }
}
</style>

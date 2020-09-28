<template>
  <div>
    <div class="main__registration-membere">
      <div class="main__registration-membere-title">
        {{ staticText.registrationRight.topText[actualLang.index] }}
      </div>
      <div class="main__registration-membere-subtitle">
        {{ staticText.registrationRight.cardAdvantage[actualLang.index] }}
      </div>
      <div class="main__registration-membere-inner">
        <div class="main__registration-membere-inner-left">
          <ul>
            <li>
              {{ staticText.registrationRight.cardAdvantageFirst[actualLang.index] }}
            </li>
            <li>
              {{ staticText.registrationRight.cardAdvantageSecond[actualLang.index] }}
            </li>
            <li>
              {{ staticText.registrationRight.cardAdvantageThird[actualLang.index] }}
            </li>
            <li>
              {{ staticText.registrationRight.cardAdvantageFourth[actualLang.index] }}
            </li>
          </ul>
        </div>
        <div class="main__registration-membere-inner-right">
          <ul>
            <li>
              {{ staticText.registrationRight.cardAdvantageFifth[actualLang.index] }}
            </li>
            <li>
              {{ staticText.registrationRight.cardAdvantageSixth[actualLang.index] }}
            </li>
            <li>
              {{ staticText.registrationRight.cardAdvantageSeventh[actualLang.index] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

export default {
  name: 'RegistrationRight',
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
.main__registration-membere {
  max-width: 855px;
  width: 100%;
  margin-top: 95px;
}
.main__registration-membere-title {
  font-size: 16px;
  line-height: 26px;
  color: #1d1d1d;
  width: 100%;
  max-width: 658px;
}
.main__registration-membere-subtitle {
  padding-top: 38px;
  padding-bottom: 27px;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #1d1d1d;
}
.main__registration-membere-inner {
  display: flex;
  font-size: 16px;
  line-height: 26px;
  justify-content: space-between;
  color: #1d1d1d;
  & li {
    padding-bottom: 26px;
  }
}
.main__registration-membere-inner-left,
.main__registration-membere-inner-right {
  width: 100%;
  & ul {
    & li {
      position: relative;
      &::before {
        position: absolute;
        color: rgba(220, 196, 136, 0.4);
        top: 5px;
        left: 0;
        content: '\e900';
        font-family: 'icomoon';
        font-size: 40px;
      }
    }
  }
}
.main__registration-membere-inner-left {
  padding-right: 35px;
  & ul {
    & li:nth-child(2)::before {
      content: '\e901';
      font-size: 54px;
      top: 0;
    }
    & li:nth-child(3)::before {
      content: '\e902';
      font-size: 54px;
      top: 0;
    }
    & li:nth-child(4)::before {
      content: '\e903';
      font-size: 54px;
      top: 0;
    }
  }
}
.main__registration-membere-inner-right {
  padding-left: 13px;
  & ul {
    & li:nth-child(1)::before {
      content: '\e904';
      font-size: 54px;
      top: 0;
    }
    & li:nth-child(2)::before {
      content: '\e905';
      font-size: 54px;
      top: 0;
    }
    & li:nth-child(3)::before {
      content: '\e906';
      font-size: 54px;
      top: 0;
    }
  }
}
@media (max-width: 1430px) {
  .main__registration-membere-inner {
    flex-direction: column;
  }
  .main__registration-membere-inner-left,
  .main__registration-membere-inner-right {
    padding: 0px;
  }
}
@media (max-width: 1240px) {
  .main__registration-membere {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 30px;
    .main__registration-membere-title {
      max-width: 100%;
    }
  }
}
@media (max-width: 920px) {
  .main__registration-membere {
    display: none;
  }
}
</style>

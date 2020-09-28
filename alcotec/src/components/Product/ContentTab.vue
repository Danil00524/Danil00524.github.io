<template>
  <div class="card__product-description">
    <div
      v-if="content.name === `TotalDescription`"
      class="card__totalInfo-wrapper"
    >
      <p v-html="content.text[actualLang.index]"></p>
      <div
        v-for="(elem, index) in content.description"
        :key="index"
        class="card__totalInfo"
      >
        <div class="card__totalInfo_name">
          {{ elem.title[actualLang.index] }}
        </div>
        <div class="card__totalInfo_dots"></div>
        <div class="card__totalInfo_value">
          {{ elem.value[actualLang.index] }}
        </div>
      </div>
    </div>

    <div
      v-if="content.name === `Characteristics`"
      class="card__characteristics-wrapper"
    >
      <div class="card__product-description-specifications">
        <h4 v-if="content.techCharacteristics">
          {{ content.titleText[0].title[actualLang.index] }}
        </h4>
        <ul v-if="content.techCharacteristics" class="card__product_tech-characteristic">
          <li v-for="(elem, index) in content.techCharacteristics" :key="index">
            {{ elem.title[actualLang.index] }}
            <span>{{ elem.value[actualLang.index] }}</span>
          </li>
        </ul>
        <h4 v-if="content.gabarite" class="card__product-description-dimensions">
          {{ content.titleText[1].title[actualLang.index] }}
        </h4>
        <ul v-for="(elem, index) in content.gabarite" :key="index">
          <li>
            {{ elem.title[actualLang.index] }}
            <span>{{ elem.value[actualLang.index] }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="content.name === `Features`" class="card__features-wrapper">
      <h4>{{ content.text[actualLang.index] }}</h4>
      <ul class="card__features">
        <li v-for="(value, index) in content.allFeatures" :key="index">
          {{ value[actualLang.index] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContentTab',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss" scoped>
.card__product-description {
  width: 555px;
  & p {
    line-height: 24px;
    color: #1d1d1d;
    margin: 0;
    padding-bottom: 32px;
  }
  .card__totalInfo-wrapper .card__totalInfo {
    line-height: 24px;
    color: $black;
    display: flex;
    .card__totalInfo_name,
    .card__totalInfo_value {
      white-space: nowrap;
    }
    .card__totalInfo_dots {
      width: 100%;
      border-bottom: 1px dotted rgba(0, 0, 0, 0.3);
      margin: 0px 10px 7px 10px;
    }
  }
}
.card__characteristics-wrapper {
  & h4 {
    font-family: 'MagistralC';
    font-size: 16px;
    line-height: 18px;
    color: #1d1d1d;
    font-weight: bold;
    border: none;
    padding-bottom: 12px;
    margin: 0px;
  }
  .card__product-description-specifications,
  .card__product-description-dimensions {
    & ul {
      & li {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 19px;
        color: #1d1d1d;
        border-top: 1px dashed rgba(0, 0, 0, 0.1);
        border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        padding-top: 16px;
        padding-bottom: 16px;
      }
    }
  }
  .card__product-description-specifications {
    & .card__product_tech-characteristic {
      padding-bottom: 32px;
    }
    & ul {
      & li:first-child {
        border-top: none;
      }
    }
  }
}
.card__features-wrapper {
  & h4 {
    font-family: 'MagistralC';
    font-size: 16px;
    line-height: 18px;
    color: #1d1d1d;
    font-weight: bold;
    margin: 0px;
  }
  & ul {
    padding-left: 15px;
    list-style-image: url('../../assets/img/product/list-style-features.png');
    & li {
      line-height: 24px;
      color: #1d1d1d;
      padding-top: 24px;
      padding-left: 20px;
    }
  }
}

@media (max-width: 604px) {
  .card__product-description {
    width: 100%;
  }
}
</style>

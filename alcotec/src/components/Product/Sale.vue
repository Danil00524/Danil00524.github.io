<template>
  <div class="card__product-filter-box">
    <div class="card__product-filter-box-title">
      {{ staticText.sale[1][actualLang.index] }}
    </div>
    <div class="card__product-filter-box-time">
      <div class="card__product-filter-box-item">
        <span>{{ actualTime[0] }} </span>
        {{ staticText.sale[2][actualLang.index] }}
      </div>
      <div class="card__product-filter-box-item">
        <span>{{ actualTime[1] }} </span>
        {{ staticText.sale[3][actualLang.index] }}
      </div>
      <div class="card__product-filter-box-item">
        <span>{{ actualTime[2] }}</span>
        {{ staticText.sale[4][actualLang.index] }}
      </div>
      <div class="card__product-filter-box-item">
        <span>{{ actualTime[3] }}</span>
        {{ staticText.sale[5][actualLang.index] }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

export default {
  name: 'Sale',
  props: {
    saleDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      time: '',
      staticText,
    };
  },
  computed: {
    actualTime() {
      return this.time.split('/');
    },
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  mounted() {
    setInterval(() => {
      const now = moment();
      const finish = moment(this.saleDate, 'DD.MM.YY');

      this.time = moment(moment(finish).diff(moment(now))).format(
        'DD/hh/mm/ss',
      );
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.card__product-filter-box {
  border: 1px solid #ff0000;
  padding: 19px 27px 16px 27px;
  margin-left: 23px;
}
.card__product-filter-box-title {
  padding-left: 50px;
  font-size: 12px;
  line-height: 16px;
  color: #ff0000;
  padding-bottom: 15px;
  position: relative;
  &::before {
    position: absolute;
    content: '\e927';
    font-family: 'icomoon';
    color: #9b9b9b;
    left: 16px;
    top: -3px;
    font-size: 18px;
  }
}
.card__product-filter-box-time {
  display: flex;
}
.card__product-filter-box-item {
  font-size: 12px;
  line-height: 16px;
  color: #1d1d1d;
  position: relative;
  & span {
    display: block;
    text-align: center;
    font-family: 'MagistralC';
    font-size: 10px;
    line-height: 11px;
    text-align: center;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: bold;
    padding-bottom: 2px;
  }
  & + .card__product-filter-box-item {
    margin-left: 19px;
  }
  &:first-child::before {
    content: none;
  }
  &::before {
    position: absolute;
    top: 0;
    left: -11px;
    content: ':';
  }
}
</style>

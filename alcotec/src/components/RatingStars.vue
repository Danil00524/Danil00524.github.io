<template>
  <ul>
    <li
      v-for="n in STARS_AMOUNT"
      :key="n"
      :class="{
        'rating-active': checkRating(n),
        'half-star': checkHalfRating(n),
      }"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      STARS_AMOUNT: 5,
    };
  },
  methods: {
    checkRating(n) {
      return this.rating - n >= 0;
    },
    checkHalfRating(n) {
      if (Math.round(this.rating) - n >= 0 && Math.round(this.rating) === n) {
        const dotStatus = String(this.rating - n).includes('.');

        if (dotStatus) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  & li {
    display: inline-block;
    position: relative;
    margin-left: 20px;
    &::before {
      position: absolute;
      content: '\e92c';
      font-family: 'icomoon';
      color: #dcc488;
      font-size: 18px;
      top: -22px;
      left: -12px;
    }
  }
  .rating-active {
    display: inline-block;
    position: relative;
    margin-left: 20px;
    &::before {
      position: absolute;
      content: '\e925';
      font-family: 'icomoon';
      color: #dcc488;
      font-size: 18px;
      top: -22px;
      left: -12px;
    }
  }
  .half-star {
    &::before {
      content: '\e926';
      font-family: 'icomoon';
    }
  }
}

@media (max-width: 466px) {
  ul {
    & li {
      &::before {
        top: -22px;
        left: -20px;
      }
    }

    .rating-active {
      &::before {
        top: -17px;
        left: -20px;
      }
    }
    .half-start {
      &::before {
        top: -17px;
        left: -20px;
      }
    }
  }
}
</style>

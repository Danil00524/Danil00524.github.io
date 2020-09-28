<template>
  <label class="radio">
    <input
      v-model="name.name"
      class="radio__input visually-hidden"
      type="radio"
      :value="value"
    />
    <div class="radio__fake"></div>
    <div v-if="text.length" class="radio__text">{{ text }}</div>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: Object,
      default: () => {},
    },
    text: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
.radio {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__text {
    margin-left: 5px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: $dark_gray;
  }
  &__fake {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid $gold;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: transparent;
    }
  }
  &__input:checked ~ &__fake:before {
    background-color: $gold;
    transition: background-color 0.3s;
  }
  &_compare {
    margin-bottom: 24px;
    .radio__text {
      font-family: 'MagistralC';
      font-size: 13px;
      line-height: 15px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1d1d1d;
      font-weight: bold;
    }
    .radio__fake {
      margin-right: 10px;
    }
  }
}

@media (max-width: 520px) {
  .radio_compare {
    .radio__fake {
      width: 15px;
      min-width: 15px;
      height: 15px;
      margin-right: 5px;
      &::before {
        width: 7px;
        height: 7px;
      }
    }
    .radio__text {
      font-size: 10px;
      line-height: 10px;
      margin-left: 0px;
    }
  }
}

@media (max-width: 450px) {
  .price {
    .radio {
      &__text {
        font-size: 10px;
      }
    }
  }
}
</style>

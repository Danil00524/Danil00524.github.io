<template>
  <div class="checkbox-wrapper">
    <div class="config-sidebar_title">
      {{ value.title[actualLang.index] }}
      <span
        v-if="value.status"
        class="icon-project-minus"
        @click="value.status = !value.status"
      ></span>
      <span
        v-else
        class="icon-category-plus"
        @click="value.status = !value.status"
      ></span>
    </div>

    <div
      v-if="value.alphabet"
      class="alphabet"
      :class="{ disable: !value.status }"
    >
      <button
        v-for="(elem, index) in newAlphabet"
        :key="index"
        :class="{ active: elem.status }"
        @click.prevent="filterBrand(elem)"
      >
        {{ elem.name }}
      </button>
    </div>

    <div
      v-if="value.type === 'checkbox'"
      class="checkboxes"
      :class="{ disable: !value.status }"
    >
      <div v-for="(elem, index) in checkboxes" :key="index">
        <CheckBox
          :id="'filter' + index"
          v-model="elem.check"
          :name="'filter' + elem.title[actualLang.index]"
          :text="elem.title[actualLang.index]"
        />
      </div>
    </div>

    <div
      v-if="value.type === 'alphabet'"
      class="checkboxes"
      :class="{ disable: !value.status }"
    >
      <div v-for="(elem, index) in checkboxes" :key="index">
        <CheckBox
          :id="'filter' + index"
          v-model="elem.check"
          :name="'filter' + elem.title[actualLang.index]"
          :text="elem.title[actualLang.index]"
          :availability="elem.availability"
        />
      </div>
    </div>

    <div v-if="value.type === 'btn'" :class="{ disable: !value.status }">
      <div class="checkboxes-inner">
        <span
          v-for="(elem, index) in checkboxes"
          :key="index"
          class="config-sidebar_color"
          :class="{ active: elem.check, disableLayout: !elem.availability }"
          @click.stop="elem.availability ? (elem.check = !elem.check) : null"
        >
          {{ elem.title[actualLang.index] }}
          <button
            class="icon-category-plus"
            :class="{ active: elem.check }"
          ></button>
        </span>
      </div>
    </div>

    <div
      v-if="value.range"
      class="checkboxes-range"
      :class="{ disable: !value.status }"
    >
      <div class="price">
        <span>{{ value.range.from }} {{ value.text }}</span>
        -
        <span>{{ value.range.to }} {{ value.text }}</span>
      </div>
      <div class="range-container">
        <v-range-slider
          v-model="value.range.default"
          :max="value.range.to"
          :min="value.range.from"
          hide-details
          class="align-center"
        >
          <template v-slot:prepend>
            <v-text-field
              v-model="value.range.default[0]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
            <span class="subheading">{{ value.text }}</span>
          </template>
          <template v-slot:append>
            <v-text-field
              v-model="value.range.default[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>
            <span class="subheading">{{ value.text }}</span>
          </template>
        </v-range-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CheckBox from './CheckBox.vue';

export default {
  name: 'BaseCheckbox',
  components: {
    CheckBox,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      checkboxes: null,
      slider: 40,
      newAlphabet: [],
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      activeFilter: (state) => state.categoryItem.activeFilter,
    }),
  },
  created() {
    this.checkName();
    this.addStatusAlphabet();
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    checkName() {
      if (this.value.checkboxes) {
        this.checkboxes = this.value.checkboxes.map((e) => {
          if (e.name) {
            return e;
          }
          e.name = e[this.actualLang.index];

          return e;
        });
      }
    },
    addStatusAlphabet() {
      if (this.value.checkboxes && this.value.type === 'alphabet') {
        this.newAlphabet = this.value.alphabet.map((e) => {
          return { name: e, status: false };
        });
      }
    },
    filterBrand(word) {
      if (word.status) {
        word.status = false;

        this.checkboxes = this.value.checkboxes;
      } else {
        this.newAlphabet.forEach((e) => {
          e.status = false;
        });

        word.status = true;

        this.checkboxes = this.value.checkboxes.filter((e) => {
          return e.title[this.actualLang.index]
            .toLowerCase()[0]
            .includes(word.name.toLowerCase());
        });
      }
    },
  },
};
</script>

<style lang="scss">
.checkbox-wrapper {
  margin-right: 30px;
  width: 100%;
  max-width: 290px;
  margin-left: auto;
  padding-left: 15px;
  & .disable {
    display: none;
  }
}

.config-sidebar_title {
  padding: 24px 0;
  font-family: 'MagistralC';
  font-size: 16px;
  line-height: 18px;
  color: #1d1d1d;
  font-weight: bold;
  position: relative;
  padding-right: 19px;

  .icon-project-minus:before,
  .icon-category-plus:before {
    position: absolute;
    top: 25px;
    right: 0;
    width: 14px;
    height: 2px;
    cursor: pointer;
    color: #9b9b9b;
  }
}

.checkboxes-range {
  max-width: 335px;
  .price {
    margin-bottom: 37px;
    & span {
      font-size: 14px;
      line-height: 19px;
      color: rgba(29, 29, 29, 0.6);
    }
    margin-bottom: 40px;
  }
  .v-input.align-center.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.theme--light.v-input__slider.v-input--range-slider {
    position: relative;
    .v-input__prepend-outer,
    .v-input__append-outer {
      position: absolute;
      margin: 0px;
      top: -14px;
      .subheading {
        position: absolute;
        left: 55px;
        font-size: 16px;
        line-height: 22px;
        color: #1d1d1d;
      }
      .v-input--is-focused {
        display: none;
      }
      .v-input__slot {
        &:before {
          display: none;
        }
        .v-text-field__slot {
          & input {
            margin: 0px;
            padding: 0px;
            width: 60px;
            text-align: left;
            font-size: 16px;
            line-height: 22px;
            color: #1d1d1d;
          }
          & input[type='number']::-webkit-inner-spin-button,
          & input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
        &:after {
          display: none;
        }
      }
    }
    .v-input__control {
      .v-input__slot {
        .v-slider.v-slider--horizontal.theme--light {
          margin: 0px;
          & div:last-child {
            .v-slider__thumb.primary {
              background-color: #dcc488 !important;
              &:before {
                display: none;
              }
            }
          }
          .v-slider__track-container {
            .v-slider__track-background.primary.lighten-3 {
              background-color: rgba(155, 155, 155, 0.3) !important;
              border-color: orange !important;
            }
            .v-slider__track-fill.primary {
              background: rgba(38, 38, 38, 0.5) !important;
            }
          }
          .v-slider__thumb-container.primary--text {
            .v-slider__thumb {
              left: 0px;
              background-color: #262626 !important;
              &::before {
                display: none;
              }
            }
          }
        }
        .v-slider
          .v-slider--horizontal
          .v-slider--focused
          .v-slider--active
          .theme--light {
          .v-slider__thumb-container
            .v-slider__thumb-container--active
            .v-slider__thumb-container--focused
            .primary--text {
            display: none;
          }
        }
      }
    }
    .v-input__prepend-outer {
      left: -1px;
    }
    .v-input__append-outer {
      right: 30px;
      .subheading {
        color: #dcc488;
        left: 65px;
      }
      .v-input__slot {
        .v-text-field__slot {
          justify-content: flex-end;
          & input {
            text-align: right;
            color: #dcc488;
          }
        }
      }
    }
  }
}

.checkboxes {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 400px;

  scrollbar-color: #262626 rgba(0, 0, 0, 0.05);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }

  & .checkbox:last-child {
    margin-bottom: 24px;
  }
}

.checkboxes-inner {
  margin-left: -15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.checkboxes input {
  margin-bottom: 20px;
  margin-right: 26px;
}

.alphabet {
  max-width: 292px;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
}

.alphabet button {
  cursor: pointer;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  border: 1px solid transparent;
  font-size: 16px;
  line-height: 30px;
  padding: 0px 9px;
  &.active {
    border: 1px solid $main;
    border-radius: 100%;
  }
}

.brand {
  width: 350px;
  height: 240px;
  overflow-y: scroll;
  margin-bottom: 15px;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.v-input.align-center.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.theme--light.v-input__slider.v-input--range-slider {
  position: relative;
  .v-input__prepend-outer,
  .v-input__append-outer {
    position: absolute;
    margin: 0px;
    top: -14px;
    .subheading {
      position: absolute;
      left: 50px;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
    }
    .v-input--is-focused {
      display: none;
    }
    .v-input__slot {
      &:before {
        display: none;
      }
      .v-text-field__slot {
        & input {
          margin: 0px;
          padding: 0px;
          width: 60px;
          text-align: left;
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
        }
        & input[type='number']::-webkit-inner-spin-button,
        & input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      &:after {
        display: none;
      }
    }
  }
  .v-input__control {
    .v-input__slot {
      .v-slider.v-slider--horizontal.theme--light {
        margin: 0px;
        & div:last-child {
          .v-slider__thumb.primary {
            background-color: #dcc488 !important;
            &:before {
              display: none;
            }
          }
        }
        .v-slider__track-container {
          .v-slider__track-background.primary.lighten-3 {
            background-color: rgba(155, 155, 155, 0.3) !important;
            border-color: orange !important;
          }
          .v-slider__track-fill.primary {
            background: rgba(38, 38, 38, 0.5) !important;
          }
        }
        .v-slider__thumb-container.primary--text {
          .v-slider__thumb {
            left: 0px;
            background-color: #262626 !important;
            &::before {
              display: none;
            }
          }
        }
      }
      .v-slider
        .v-slider--horizontal
        .v-slider--focused
        .v-slider--active
        .theme--light {
        .v-slider__thumb-container
          .v-slider__thumb-container--active
          .v-slider__thumb-container--focused
          .primary--text {
          display: none;
        }
      }
    }
  }
  .v-input__prepend-outer {
    left: -1px;
  }
  .v-input__append-outer {
    right: 30px;
    .subheading {
      color: #dcc488;
      left: 65px;
    }
    .v-input__slot {
      .v-text-field__slot {
        justify-content: flex-end;
        & input {
          text-align: right;
          color: #dcc488;
        }
      }
    }
  }
}

.config-sidebar_color {
  cursor: pointer;
  &.disableLayout {
    color: #9b9b9b;
    cursor: not-allowed;
    & button {
      cursor: not-allowed;
    }
  }
  .icon-category-plus:before {
    content: '\e911';
    color: #9b9b9b;
  }
  width: max-content;
  transition: all 0.3s;
  border: 1px solid #9b9b9b;
  padding: 7px 11px 6px 8px;
  font-size: 13px;
  display: inline-block;
  line-height: 18px;
  color: #1d1d1d;
  margin-left: 16px;
  margin-bottom: 16px;
  &.active {
    background-color: #dcc488;
    border: 1px solid #dcc488;
    color: #fff;
  }
  & button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding-left: 11px;
    padding-right: 0;
    &.icon-category-plus.active:before {
      content: '\e910';
      color: #fff;
    }
  }
}
@media (max-width: 1700px) {
  .checkbox-wrapper {
    max-width: -moz-available;
    max-width: -webkit-stretch;
    max-width: stretch;
  }
}
</style>

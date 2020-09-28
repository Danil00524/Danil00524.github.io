<template>
  <div>
    <div class="module__side-sticker" @click="changeStatusReviewPopup">
      <p class="module__side-sticker-text">
        {{ staticText.review.sticker[actualLang.index] }}
      </p>
    </div>
    <v-dialog v-model="mainPopupReview" max-width="520px">
      <div class="module__client-review">
        <a
          class="module__client-review-close"
          @click="mainPopupReview = false"
        ></a>
        <div class="module__client-review-inner">
          <div class="module__client-review-title">
            {{ staticText.review.reviewTitle[actualLang.index] }}
          </div>
          <form @submit.prevent="submitReview">
            <label class="module__client-review-labels">
              {{ staticText.review.chooseTitle[actualLang.index] }}
            </label>
            <vSelect
              v-model="reviewData.type"
              transition
              :placeholder="staticText.review.chooseTitle[actualLang.index]"
              :searchable="false"
              :clearable="false"
              :options="staticText.review.chooseOption[actualLang.index]"
              class="module__review-type-select"
              style="margin-bottom: 15px;"
              required
            />

            <label class="module__client-review-labels">
              {{ staticText.review.moreDetailTitle[actualLang.index] }}
              <!--              <input v-model="userData.password" type="password" required />-->
              <textarea
                v-model="reviewData.text"
                rows="4"
                class="form__textarea"
                required
              ></textarea>
            </label>

            <label class="module__client-review-input-btn">
              <input
                type="submit"
                :value="staticText.review.submit[actualLang.index]"
              />
            </label>
          </form>
        </div>
      </div>
    </v-dialog>
    <v-dialog v-model="answerPopupReview" width="500">
      <v-card>
        <v-card-text> </v-card-text>
        <v-card-text>
          {{ answerPopupReviewMessage[actualLang.index] }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="answerPopupReview = false">
            {{ staticText.btns[1][actualLang.index] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { store } from '../../store';
import vSelect from 'vue-select';

import { staticText } from '../../i18n';
import 'vue-select/src/scss/vue-select.scss';

export default {
  name: 'Review',
  components: {
    vSelect,
  },
  data() {
    return {
      mainPopupReview: false,
      answerPopupReview: false,
      answerPopupReviewMessage: {},
      isLoading: false,
      reviewData: {
        type: '',
        text: '',
        url: '',
      },
      staticText,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  methods: {
    changeStatusReviewPopup() {
      this.mainPopupReview = !this.mainPopupReview;
    },
    submitReview() {
      this.isLoading = true;
      this.changeStatusReviewPopup();
      this.$set(this.reviewData, 'url', this.$route.fullPath);
      store.dispatch('users/review', {
        data: this.reviewData,
        cb: (data) => {
          if (data.success) {
            this.answerPopupReviewMessage = this.staticText.review.success;
            this.isLoading = false;
            this.answerPopupReview = true;
          } else {
            this.answerPopupReviewMessage = data.message;
            this.isLoading = false;
            this.answerPopupReview = true;
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.module__client-review {
  background-color: #fff;
  .module__client-review-inner,
  .module__recovery-password-inner,
  .module__thanks-inner {
    padding: 60px 48px 48px 48px;
    & form {
      & label {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        text-transform: uppercase;
        color: #9b9b9b;
        width: 57px;
        height: 18px;
        padding-left: 20px;
        & input {
          display: block;
          margin-bottom: 18px;
          margin-top: 6px;
          max-width: 424px;
          width: 100%;
          padding: 17px;
          font-size: 16px;
          line-height: 22px;
          color: #1d1d1d;
          outline: none;
          border: 1px solid #9b9b9b;
          border-radius: 4px;
          caret-color: #dcc488;
          &:focus {
            border: 1px solid #dcc488;
          }
        }
      }
      .module__client-review-select-type {
        & input,
        textarea {
          margin-bottom: 8px;
        }
      }
      .module__client-review-labels {
        position: relative;
        & input,
        textarea {
          border: 1px solid #9b9b9b;
          width: 100%;
        }
      }
      .module__client-review-input-btn {
        & input[type='submit'] {
          border: 1px solid #a12c3a;
          border-radius: 4px;
          font-family: 'MagistralC';
          font-size: 15px;
          line-height: 17px;
          text-align: center;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a12c3a;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: #1d1d1d;
            color: #fff;
            border: 1px solid #1d1d1d;
          }
        }
      }
      & a {
        margin-bottom: 26px;
        padding-left: 20px;
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        color: #1d1d1d;
        transition: all 0.3s;
        &:hover {
          color: #a12c3a;
        }
      }
    }
    .module__client-review-application {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: #1d1d1d;
      & span {
        & a {
          font-family: 'MagistralC';
          font-size: 16px;
          line-height: 18px;
          color: #a12c3a;
          padding-left: 16px;
          transition: all 0.3s;
          &:hover {
            color: #1d1d1d;
          }
        }
      }
    }
  }
  .module__client-review-close {
    cursor: pointer;
    display: block;
    position: relative;
    &::before {
      top: 24px;
      right: 24px;
      content: '\e913';
      font-family: 'icomoon';
      color: #9b9b9b;
      font-size: 32px;
      position: absolute;
    }
    &:hover:before {
      transition: all 0.3s;
      color: #000;
    }
  }
  .module__client-review-title,
  .module__thanks-title {
    font-family: 'MagistralC';
    font-size: 28px;
    line-height: 31px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
    text-align: center;
    padding-bottom: 28px;
    font-weight: bold;
  }
  .module__recovery-password-title {
    padding-bottom: 16px;
  }
  .module__recovery-password-subtitle,
  .module__thanks-subtitle {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #9b9b9b;
    padding-bottom: 42px;
  }
  .module__thanks-subtitle {
    padding-bottom: 0;
  }
}

.module__review-type-select {
  max-width: 520px;
  font-size: 16px;
  line-height: 22px;
  color: #1d1d1d;
  .vs__dropdown-toggle {
    border: 1px solid #9b9b9b;
    border-radius: 4px;
    padding-bottom: 0px;
    height: 56px;
    .vs__selected-options {
      display: flex;
      height: 56px;
      align-items: center;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 15px;
      .vs__selected {
        padding-left: 12px;
        padding-right: 12px;
        margin: 0px;
        height: 56px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .vs__search {
        padding-left: 12px;
        padding-right: 12px;
        margin: 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: auto;
        scrollbar-color: #262626 #fff;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
          background-color: #fff;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          background-color: #fff;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #262626;
        }
      }
    }
    .vs__actions {
      position: relative;
      padding-right: 30px;
      &::after {
        position: absolute;
        font-size: 10px;
        color: #1d1d1d;
        content: '\e92e';
        font-family: 'icomoon';
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
        z-index: 2;
      }
      & svg {
        display: none;
      }
    }
  }
  .vs__dropdown-menu {
    .vs__dropdown-option {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .vs__dropdown-option--highlight {
      background: $gold;
      color: #fff;
    }
  }
}

.module__side-sticker {
  background-color: $main;
  width: 40px;
  height: 105px;
  position: fixed;
  bottom: 20px;
  right: 0;
  border-radius: 10px 0 0 10px;
  font-weight: 600;
  color: $gold;
  font-family: 'MagistralC';
  writing-mode: tb-rl;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
  & .module__side-sticker-text {
    letter-spacing: 0.6px;
    margin-top: -0.6px;
    white-space: nowrap;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    padding: 16px 0;
    margin-right: 10px;
  }
}

.form__textarea {
  border: 1px solid $dark_gray;
  border-radius: 4px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: $black;
  padding: 17px;
  resize: none;
  caret-color: $gold;
  &:focus {
    border: 1px solid $gold;
  }
}

@media (max-width: 535px) {
  .module__client-review .module__client-review-inner {
    padding: 46px;
  }
  .module__side-sticker {
    bottom: 20px;
  }
}
@media (max-width: 488px) {
  .module__client-review .module__client-review-inner {
    .module__client-review-application {
      & span {
        display: block;
        & a {
          padding-left: 0px;
        }
      }
    }
  }
}
</style>

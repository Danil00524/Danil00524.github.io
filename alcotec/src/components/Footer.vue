<template>
  <div v-if="validation()" class="footer p4">
    <div class="container">
      <div class="footer-top">
        <div
          class="footer-top-left"
          v-if="staticText.footerTexts && staticText.footerTexts.contacts"
        >
          <div class="footer-top-title">
            <h4>
              {{ staticText.footerTexts.contacts.title[actualLang.index] }}
            </h4>
          </div>
          <AddressSelect
            v-if="staticText.footerTexts.contacts"
            :actualLang="actualLang.index"
            :addresses="staticText.footerTexts.contacts.items"
          />
        </div>
        <div
          v-if="staticText.footerTexts && staticText.footerTexts.linksTitle"
          class="footer-top-center"
        >
          <div class="footer-top-title">
            <h4>{{ staticText.footerTexts.linksTitle[actualLang.index] }}</h4>
          </div>
          <div class="footer-top-center-links">
            <router-link
              v-for="(item, index) of staticText.footerTexts.menu"
              :key="item.name"
              :to="{ name: item.name }"
              :class="[
                'footer-top-center-links-item',
                `footer-links-item-order-${index}`,
              ]"
            >
              {{ item.text[actualLang.index] }}
            </router-link>
          </div>
        </div>
        <div
          v-if="staticText.footerTexts && staticText.footerTexts.socialTitle"
          class="footer-top-right"
        >
          <div class="footer-top-title">
            <h4>{{ staticText.footerTexts.socialTitle[actualLang.index] }}</h4>
          </div>
          <SocialLinks
            class="footer-top-right__social-links"
            :white-color="true"
          />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-row">
          <div
            v-if="staticText.footerTexts && staticText.footerTexts.rulesText"
            class="footer-bottom-row-left"
          >
            <span
              >&copy;{{
                staticText.footerTexts.rulesText[actualLang.index]
              }}</span
            >
          </div>
          <div
            v-if="staticText.footerTexts && staticText.footerTexts.devTitle"
            class="footer-bottom-row-right"
          >
            <span class="footer-bottom-row-right-text">
              {{ staticText.footerTexts.devTitle[actualLang.index] }}
            </span>
            <a href="https://proarea.co/" target="_blank">
              <ProareaLogo />
            </a>
          </div>
        </div>
        <div class="footer-bottom-row">
          <div
            v-if="staticText.footerTexts && staticText.footerTexts.footnote"
            class="footer-bottom-row-left"
          >
            <span>{{ staticText.footerTexts.footnote[actualLang.index] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

import SocialLinks from './SocialLinks.vue';
import AddressSelect from './AddressSelect.vue';
import ProareaLogo from '../assets/img/proarea-logo.svg?inline';

export default {
  name: 'Footer',
  components: {
    SocialLinks,
    AddressSelect,
    ProareaLogo,
  },
  data() {
    return {
      staticText,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      allProducts: (state) =>
        state.categoryItem.numberProducts.totalNumberOfFilteredItems,
      categoryItem: (state) => state.categoryItem.categoryItem.subCategory,
    }),
  },
  methods: {
    validation() {
      const { path, name } = this.$route;
      const lengthItem = this.categoryItem.length;
      const allLengthItem = this.allProducts;

      if (name === 'comparison' || path.includes('product')) {
        return true;
      }

      if (
        (path.includes('/profile/configurator/category') ||
          path.includes('/catalog/category')) &&
        lengthItem === allLengthItem
      ) {
        return true;
      } else if (
        (path.includes('/profile/configurator/category') ||
          path.includes('/catalog/category')) &&
        lengthItem !== allLengthItem
      ) {
        return false;
      } else if (name !== 'home') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  min-height: 418px;
  background-color: #a12c3a;
  color: $white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h4 {
    color: $white;
    font-family: 'MagistralC';
  }

  &-top {
    display: flex;
    justify-content: space-between;
    padding: 55px 0;

    &-title {
      margin-bottom: 30px;
    }

    &-left {
      width: 34%;
      padding-right: 15px;
      .addressSelect {
        .addressSelect-info {
          .addressSelect-info-location {
            min-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }

    &-center {
      width: 43%;
      padding-right: 15px;

      &-links {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        color: $white;

        &-item {
          width: 50%;
          margin-bottom: 15px;
          text-decoration: none;
          font-size: 16px;
          line-height: 22px;
          color: $white;
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    &-right {
      width: 23%;
    }
  }

  &-bottom {
    width: 100%;
    padding: 40px 0 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:first-child {
        margin-bottom: 15px;
      }

      &-left {
        & span {
          color: $white;
        }
      }

      &-right {
        &-text {
          margin-right: 15px;
          color: $white;
        }
      }
    }
  }
  .socialLinks {
    .socialLinks-items {
      flex-wrap: wrap;
    }
    &-item {
      margin-bottom: 32px;
      color: #fff;
      &:hover {
        color: $black;
      }
    }
  }
}

@media (max-width: 1450px) {
  .footer-top-right__social-links .socialLinks-items {
    max-width: 200px;
  }
}

@media (max-width: 920px) {
  .footer-top {
    padding-left: 9px;
    padding-right: 9px;
    padding-top: 8px;
    display: block;
    .footer-top-title {
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      & h4 {
        font-size: 16px;
        margin-top: 40px;
        margin-bottom: 8px;
      }
    }
    .footer-top-left {
      position: relative;
      width: 100%;
      padding-right: 0px;
      .addressSelect {
        .addressSelect-info {
          display: flex;
          flex-direction: column;
          .addressSelect-info-location {
            position: absolute;
            top: 16px;
            right: 86px;
            max-width: 299px;
          }
          .addressSelect-info-timetable {
            display: flex;
            align-items: baseline;
            .addressSelect-info-timetable-days {
              margin-top: 0px;
              font-size: 10px;
            }
            & br {
              display: none;
            }
            .addressSelect-info-timetable-time {
              margin-left: 16px;
            }
          }
        }
      }
    }
    .footer-top-center {
      width: 100%;
      padding-right: 0px;
      .footer-top-center-links {
        .footer-top-center-links-item {
          width: 33.333%;
        }
        .footer-links-item-order-0 {
          order: 0;
        }
        .footer-links-item-order-1 {
          order: 2;
        }
        .footer-links-item-order-2 {
          order: 3;
        }
        .footer-links-item-order-3 {
          order: 5;
        }
        .footer-links-item-order-4 {
          order: 6;
        }
        .footer-links-item-order-5 {
          order: 7;
        }
        .footer-links-item-order-6 {
          order: 1;
        }
        .footer-links-item-order-7 {
          order: 8;
        }
        .footer-links-item-order-8 {
          order: 4;
        }
      }
    }
    .footer-top-right {
      width: 100%;
      .footer-top-title {
        display: none;
      }
      .socialLinks-items {
        margin-top: 40px;
        .socialLinks-item {
          & span:last-child {
            display: none;
          }
        }
      }
    }
  }
  .footer-bottom {
    padding-left: 9px;
    padding-right: 9px;
    border-top: 0px;
    padding-top: 0px;
    padding-bottom: 16px;
    .footer-bottom-row-left {
      max-width: 480px;
    }
  }
}
@media (max-width: 700px) {
  .footer-top
    .footer-top-left
    .addressSelect
    .addressSelect-info
    .addressSelect-info-location {
    position: static;
  }
}
@media (max-width: 480px) {
  .footer-top {
    text-align: center;
    padding-bottom: 48px;
    padding-left: 0;
    padding-right: 0px;
  }
  .footer-top .footer-top-title {
    margin-bottom: 20px;
    & h4 {
      font-size: 18px;
    }
  }
  .footer-top .addressSelect-title {
    margin: 0 auto;
    width: 162px;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  .footer-top
    .footer-top-left
    .addressSelect
    .addressSelect-info
    .addressSelect-info-location {
    min-height: 102px;
    & span {
      font-size: 14px;
    }
    max-width: 303px;
    margin: 0 auto;
    padding: 24px 0;
  }
  .footer-top
    .footer-top-left
    .addressSelect
    .addressSelect-info
    .addressSelect-info-timetable {
    margin: 0 auto;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-top-center-links-item {
    width: 100%;
    margin-bottom: 20px;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-2 {
    order: 1;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-4 {
    order: 2;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-6 {
    order: 3;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-8 {
    order: 4;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-5 {
    order: 5;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-1 {
    order: 6;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-3 {
    order: 7;
  }
  .footer-top
    .footer-top-center
    .footer-top-center-links
    .footer-links-item-order-7 {
    order: 8;
  }
  .socialLinks {
    margin: 0 auto;
    width: 192px;
  }
  .footer-bottom {
    position: relative;
    text-align: center;
    padding-bottom: 56px;
    padding-left: 0px;
    padding-right: 0px;
    .footer-bottom-row {
      display: block;
      .footer-bottom-row-right {
        position: absolute;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
      }
    }
  }
}
@media (max-width: 362px) {
  .footer-bottom .footer-bottom-row-left {
    max-width: 264px;
    margin: 0 auto;
  }
  .footer-bottom-row-right {
    display: inline-table;
  }
}

@media (max-width: 340px) {
  .footer-top {
    .footer-top-left {
      .addressSelect {
        .addressSelect-info {
          .addressSelect-info-location {
            min-height: 129px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="card__product-tabs">
    <div class="tabs__wrapper">
      <div class="tabs">
        <div
          v-for="tab in staticText.productTabs[actualLang.index]"
          :key="tab"
          :class="[
            'tab',
            {
              active: currentTab === tab,
              disable:
                (!product.features &&
                  tab === staticText.productTabs[actualLang.index][2]) ||
                (!product.characteristics &&
                  tab === staticText.productTabs[actualLang.index][1]),
            },
          ]"
          @click="setTab(tab)"
        >
          {{ tab }}
        </div>
      </div>
      <div class="tab_content">
        <ContentTab
          v-if="currentTab === staticText.productTabs[actualLang.index][0]"
          :content="product.totalDescription"
        />
        <ContentTab
          v-if="
            currentTab === staticText.productTabs[actualLang.index][1] &&
              product.characteristics
          "
          :content="product.characteristics"
        />
        <ContentTab
          v-if="
            currentTab === staticText.productTabs[actualLang.index][2] &&
              product.features
          "
          :content="product.features"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../../i18n';

import ContentTab from './ContentTab.vue';

export default {
  name: 'Tabs',
  components: {
    ContentTab,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      totalInfo: null,
      characteristics: null,
      features: null,
      staticText,
      currentTab: '',
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  watch: {
    actualLang: {
      handler(value) {
        this.currentTab = this.staticText.productTabs[value.index][0];
      },
    },
  },
  created() {
    this.setTab();
  },
  methods: {
    setTab(tab) {
      this.currentTab = this.staticText.productTabs[this.actualLang.index][0];

      if (
        tab &&
        this.product &&
        !this.product.features &&
        tab === this.staticText.productTabs[this.actualLang.index][2]
      ) {
        return false;
      } else if (
        tab &&
        this.product &&
        !this.product.characteristics &&
        tab === this.staticText.productTabs[this.actualLang.index][1]
      ) {
        return false;
      } else {
        if (tab) {
          this.currentTab = tab;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  padding-top: 56px;
  padding-bottom: 40px;
}
.tabs__wrapper .tab {
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: rgba(29, 29, 29, 0.5);
  padding: 10px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  width: 37%;
  transition: all 0.3s;
  &:hover {
    color: #1d1d1d;
  }
  &.disable {
    cursor: not-allowed;
    color: rgba(29, 29, 29, 0.5);
    &:hover {
      color: rgba(29, 29, 29, 0.5);
    }
  }
}
.tab.active {
  color: #1d1d1d;
  border-bottom: 2px solid #dcc488;
  &.disable {
    cursor: not-allowed;
    color: rgba(29, 29, 29, 0.5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 604px) {
  .tabs {
    flex-direction: column;
    align-items: center;
  }
  .tabs__wrapper .tab {
    text-align: center;
    width: 50%;
  }
}
@media (max-width: 400px) {
  .tabs__wrapper .tab {
    padding: 10px 0px;
  }
}
</style>

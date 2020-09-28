<template>
  <aside
    v-if="statusSidebar && statusProductItem"
    id="sidebar-open-left"
    class="sidebar__filters-opened"
    :class="{
      active: statusScrollSidebar,
      'sidebar__filters-opened_active-filter': activeCheckbox.length,
    }"
  >
    <button
      class="sidebar__filters-open-btn icon-configuration-menu-left"
      @click="changeStatusFilterSidebar"
    ></button>
    <div class="sidebar__filters-opened-wrapper">
      <BaseCheckbox
        v-for="(elem, index) in sideBarFiltersProductItem"
        :key="index"
        :value="elem"
      />
    </div>

    <div
      v-if="activeCheckbox.length"
      class="filter-sidebar__position-selected_goods"
    >
      <div class="filter-sidebar__position-selected__text">
        {{ staticText.configurateArea.filterText[actualLang.index] }}
        <span>{{ numberProducts.totalNumberOfFilteredItems }}</span>
        {{ staticText.configurateArea.filterTextFrom[actualLang.index] }}
        <span>{{ numberProducts.totalQuantityOfGoods }}</span>
      </div>
      <div
        class="filter-sidebar__position-selected-reset-btn"
        @click="cleanOutFilter(activeCheckbox, sideBarFiltersProductItem)"
      >
        <Button
          :text="staticText.configurateArea.buttonClear[actualLang.index]"
        />
      </div>
    </div>
  </aside>
  <ClosedFilterConfigurator
    v-else-if="!statusSidebar && statusProductItem && sideBarFiltersProductItem.length"
    v-model="statusSidebar"
  />
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

import BaseCheckbox from './BaseCheckbox.vue';
import ClosedFilterConfigurator from './ClosedFilterConfigurator.vue';
import Button from './Button.vue';

export default {
  name: 'FilterSidebar',
  components: {
    BaseCheckbox,
    ClosedFilterConfigurator,
    Button,
  },
  props: {
    statusProductItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statusViewSidebar: false,
      statusScrollSidebar: false,
      staticText,
    };
  },
  computed: {
    ...mapState({
      statusSidebar: (state) => state.profiles.profileConfigure.statusSidebar,
      actualLang: (state) => state.settings.actualLang,
      activeCheckbox: (state) => state.profiles.activeCheckboxFilter,
      sideBarFiltersProductItem: (state) =>
        state.profiles.profileConfigure.sideBarFiltersProductItem,
      numberProducts: (state) => state.categoryItem.numberProducts,
    }),
  },
  created() {
    const filters = this.$route.query;
    const parseFilter = [];

    for (const item in filters) {
      let slags;

      if (
        item !== 'range-price' &&
        item !== 'performance-cube' &&
        item !== 'mounting-width'
      ) {
        slags = filters[item].split(',');
      } else {
        slags = filters[item].split(',');
        slags[0] = `${item}: ${slags[0]}`;
      }

      parseFilter.push(...slags);
    }

    this.sideBarFiltersProductItem.forEach((e) => {
      if (e.checkboxes) {
        e.checkboxes.map((checkbox) => {
          if (parseFilter.includes(checkbox.slag)) {
            checkbox.check = true;
          }
        });
      } else if (e.range) {
        parseFilter.forEach((filter) => {
          if (filter.indexOf(e.fildName) === 0) {
            const status = filter.split(':')[1].split('-');

            e.range.default[0] = status[0];
            e.range.default[1] = status[1];
          }
        });
      }
    });

    this.handleView();
    window.addEventListener('resize', this.handleView);

    this.handlerScrollSidebar();
    document.addEventListener('scroll', this.handlerScrollSidebar);
  },
  methods: {
    changeStatusFilterSidebar() {
      this.$store.commit('profiles/CHANGE_SIDEBAR_FILTER');
    },
    handleView() {
      this.statusViewSidebar = window.innerWidth >= 980 ? true : false;
    },
    handlerScrollSidebar() {
      const { scrollTop } = document.documentElement;

      if (
        document.getElementById('header') &&
        document.getElementById('header').clientHeight &&
        document.getElementById('breadcrumbs') &&
        document.getElementById('breadcrumbs').clientHeight &&
        document.getElementById('personal__cabinet-top') &&
        document.getElementById('personal__cabinet-top').clientHeight
      ) {
        const header = document.getElementById('header').clientHeight;
        const breadcrumbs = document.getElementById('breadcrumbs').clientHeight;
        const personalCabinetTop = document.getElementById(
          'personal__cabinet-top',
        ).clientHeight;

        this.statusScrollSidebar =
          scrollTop > header + breadcrumbs + personalCabinetTop;
      } else if (
        document.getElementById('header') &&
        document.getElementById('header').clientHeight &&
        document.getElementById('breadcrumbs') &&
        document.getElementById('breadcrumbs').clientHeight
      ) {
        const header = document.getElementById('header').clientHeight;
        const breadcrumbs = document.getElementById('breadcrumbs').clientHeight;

        this.statusScrollSidebar = scrollTop > header + breadcrumbs;
      }
    },
    cleanOutFilter(activeCheckbox, sideBarFiltersProductItem) {
      this.$store.commit('profiles/SET_ACTIVE_CHECKBOX_FILTER', []);
      this.changeStatusFilterSidebar();

      sideBarFiltersProductItem.forEach((e) => {
        if (e.range) {
          e.range.default = [e.range.from, e.range.to];
        } else if (e.checkboxes) {
          e.checkboxes.forEach((event) => {
            if (event.check === true) {
              event.check = false;
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar__filters-opened {
  padding-top: 20px;
  margin-top: 8px;
  position: sticky;
  max-width: 320px;
  width: 100%;
  background: #fff;
  margin-right: 15px;
  margin-bottom: 8px;
  padding-bottom: 15px;
  z-index: 2;
  height: auto;
  overflow-y: auto;

  scrollbar-color: #262626 rgba(0, 0, 0, 0.05);
  scrollbar-width: auto;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #262626;
  }
}
.sidebar__filters-opened.active {
  top: 0px;
  height: 100vh;
  margin-top: 0px;
  margin-bottom: 0px;
}
.sidebar__filters-opened-mw {
  max-width: 428px;
}

.sidebar__filters-open-btn {
  z-index: 1;
  position: absolute;
  top: 24px;
  right: 0;
  background-color: #a12c3a;
  padding: 14px 16px;
  font-size: 24px;
  border-radius: 4px 0px 0px 4px;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    &:before {
      transition: all 0.3s;
      opacity: 0.8;
    }
  }
}
.filter-sidebar__position-selected_goods {
  display: none;
}
@media (max-width: 1440px) {
  .sidebar__filters-opened {
    margin-right: 0;
  }
}

@media (max-width: 1207px) {
  .sidebar__filters-opened {
    width: 50%;
    max-width: 100%;
    position: fixed;
    left: 0px;
    z-index: 100;
    top: -8px;
    overflow-y: auto;
    height: 100%;
  }
}
@media (max-width: 980px) {
  .filter-sidebar__position-selected_goods {
    position: fixed;
    bottom: 0;
    z-index: 15;
    width: 100%;
    background-color: $main;
    color: #fff;
    padding: 15px 15px 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'MagistralC';
    font-weight: bold;
    .filter-sidebar__position-selected-reset-btn button {
      padding: 5px;
    }
  }
  .sidebar__filters-opened {
    width: 100%;
  }
  .sidebar__filters-opened_active-filter {
    padding-bottom: 100px;
  }
}
</style>

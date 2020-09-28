<template>
  <aside
    id="sidebar-closed-left"
    class="sidebar__filters-closed"
    :class="{ active: statusScrollSidebar }"
    @click="changeStatusFilterSidebar"
  >
    <button class="sidebar__filters-open-btn icon-configuration-menu"></button>
    <div class="sidebar__filters-closed-wrapper">
      <div class="sidebar__closed-filters-text">
        {{ staticText.configurateArea.closeFilterName[actualLang.index] }}
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

export default {
  name: 'ClosedFilterConfigurator',
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  data() {
    return {
      statusScrollSidebar: false,
      staticText,
    };
  },
  mounted() {
    this.handlerScrollSidebar();
    document.addEventListener('scroll', this.handlerScrollSidebar);
  },
  methods: {
    changeStatusFilterSidebar() {
      this.$store.commit('profiles/CHANGE_SIDEBAR_FILTER');
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
  },
};
</script>

<style lang="scss" scoped>
.sidebar__filters-closed {
  cursor: pointer;
  position: sticky;
  max-width: 74px;
  width: 100%;
  background: #fff;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  margin-right: 30px;
  height: 100vh;
  z-index: 3;
}
.sidebar__filters-closed.active {
  top: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.sidebar__filters-open-btn {
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
.sidebar__filters-closed-wrapper {
  display: flex;
  margin-top: 216px;
  justify-content: flex-end;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.sidebar__closed-filters-text {
  font-family: 'MagistralC';
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #a12c3a;
  font-weight: bold;
}

@media (max-width: 980px) {
  .sidebar__filters-closed {
    position: absolute;
    left: -74px;
    height: 100vh;
    .sidebar__filters-open-btn {
      position: fixed;
      top: 65%;
      left: 0;
      z-index: 1;
      width: 55px;
      border-radius: 0px 4px 4px 0px;
    }
  }
}
</style>

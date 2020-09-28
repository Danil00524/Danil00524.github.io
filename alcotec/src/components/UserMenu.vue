<template>
  <div class="userMenu">
    <h3 class="userMenu-name">{{ userName }}</h3>
    <div class="userMenu-links">
      <router-link
        v-for="link of userMenuLinks"
        :key="link.name"
        class="userMenu-links-item"
        :to="{ path: link.path }"
      >
        <span @click="$emit('closeMenu')">{{ link.text[actualLang.index] }}</span>
      </router-link>
    </div>
    <SocialLinks class="user-menu" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SocialLinks from './SocialLinks.vue';

export default {
  name: 'UserMenu',
  components: {
    SocialLinks,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    userMenuLinks: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style scoped lang="scss">
.userMenu {
  z-index: -1;
  position: absolute;
  top: calc(100% + 14px);
  left: 0;
  background-color: $white;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  padding: 32px 24px;
  transition: all 0.6s;
  opacity: 0;
  max-width: 383px;

  &.active {
    opacity: 1;
    z-index: 100;
  }

  h3 {
    font-family: 'MagistralC', sans-serif;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-name {
    margin-bottom: 24px;
  }
  &-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-item {
      color: $black;
      text-decoration: none;
      margin-bottom: 16px;
      padding: 0.5px;
      width: 100%;
      font-size: 16px;
      width: max-content;

      span {
        width: max-content;
        border-bottom: 1px solid transparent;
        padding-bottom: 3px;
        transition: all 0.3s;
        &:hover {
          font-weight: bold;
          border-bottom: 1px solid $main;
        }
      }

      &:last-child {
        margin-top: 4px;
        margin-bottom: 32px;
        padding: 24.5px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>

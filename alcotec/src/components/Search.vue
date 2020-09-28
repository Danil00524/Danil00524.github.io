<template>
  <div class="search">
    <searchIcon class="search__icon" />
    <input
      :value="valueInput"
      class="search__input"
      type="text"
      :placeholder="placeholder[actualLang.index]"
      @input="$emit('input', $event.target.value)"
    />
    <button
      v-if="valueInput || isActiveMemorySearch"
      class="icon-close-small"
      @click.prevent="$emit('input', '')"
    ></button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import searchIcon from '../assets/img/projects/search.svg?inline';

export default {
  name: 'Search',
  components: {
    searchIcon,
  },
  model: {
    prop: 'valueInput',
    event: 'input',
  },
  props: {
    valueInput: {
      type: String,
      default: '',
    },
    placeholder: {
      type: Object,
      default: () => {},
    },
    isActiveMemorySearch: Boolean,
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss">
.search {
  & .icon-close-small {
    margin-right: 21px;
  }
  max-width: 390px;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 20px;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &__icon {
    margin-right: 30px;
    cursor: pointer;
  }
  &__input {
    outline: none;
    width: 100%;
    border: none;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: #9b9b9b;
  }
}

.configurator-title-input {
  background-color: #fff;
  border-radius: 4px;
  padding: 0px;
  align-items: center;
  height: fit-content;
  border-bottom: none;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 1px 10px 0px rgba(110, 106, 106, 0.75);
  }
  .search__icon {
    margin-left: 16px;
    margin-right: 0px;
  }
  .search__input {
    max-width: 430px;
    width: 100%;
    font-size: 13px;
    line-height: 18px;
    padding: 8px 18px;
    padding-right: 53px;
    color: #1d1d1d;
    &::placeholder {
      color: #9b9b9b;
    }
  }
}

.configurator-search__wrapper {
  & button {
    .search.configurator-title-input {
      position: relative;
      .icon-close-small {
        position: absolute;
        margin-right: 0px;
        right: 20px;
        top: 10px;
      }
    }
  }
}

@media (max-width: 680px) {
  .configurator-search__wrapper {
    .search__input {
      max-width: 100%;
    }
  }
}
</style>

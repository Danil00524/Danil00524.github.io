<template>
  <div class="pagination">
    <button
      class="pagination__button"
      :disabled="page == 1"
      @click.prevent="$emit('paginate', 'left')"
    >
      <arrowLeftIcon
        :fill="page == 1 ? arrowFill : arrowFillRed"
        :fill-opacity="page == 1 ? 0.6 : 1"
        class="pagination__icon pagination__icon_left"
      />
      {{ staticText.arrowPrev[actualLang.index] }}
    </button>
    <ul class="pagination__list">
      <span v-if="firstPage" class="pagination__item-inner first">
        <li class="pagination__item">
          <a
            href
            class="pagination__number"
            @click.prevent="$emit('paginate', firstPage)"
          >
            {{ firstPage }}
          </a>
        </li>
        <span class="pagination__item_dots">...</span>
      </span>

      <li
        v-for="currentPage in slicePageCount"
        :key="currentPage"
        class="pagination__item"
        :class="{ pagination__item_active: page == currentPage }"
      >
        <a
          href
          class="pagination__number"
          @click.prevent="$emit('paginate', currentPage)"
        >
          {{ currentPage }}
        </a>
      </li>

      <span v-if="lastPage" class="pagination__item-inner last">
        <span class="pagination__item_dots">...</span>
        <li class="pagination__item">
          <a
            href
            class="pagination__number"
            @click.prevent="$emit('paginate', lastPage)"
          >
            {{ lastPage }}
          </a>
        </li>
      </span>
    </ul>
    <button
      class="pagination__button"
      :disabled="page >= pageCount"
      @click.prevent="$emit('paginate', 'right')"
    >
      {{ staticText.arrowNext[actualLang.index] }}
      <arrowRightIcon
        :fill="page >= pageCount ? arrowFill : arrowFillRed"
        :fill-opacity="page >= pageCount"
        class="pagination__icon pagination__icon_right"
      />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import arrowLeftIcon from '../assets/img/projects/arrow-left.svg?inline';
import arrowRightIcon from '../assets/img/projects/arrow-right.svg?inline';

export default {
  name: 'Pagination',
  components: {
    arrowLeftIcon,
    arrowRightIcon,
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      staticText: {
        arrowNext: {
          ru: 'Следующая',
          ua: 'Наступна',
        },
        arrowPrev: {
          ru: 'Предыдущая',
          ua: 'попередня',
        },
      },
      arrowFill: '#9B9B9B',
      arrowFillRed: '#A12C3A',
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
    slicePageCount() {
      let page = this.page;
      const nearPageCount = [];

      for (let i = 1; i <= this.pageCount; i++) {
        if (i === this.page) {
          nearPageCount.push(i);
        } else if (i === page + 1) {
          nearPageCount.push(i);
        } else if (i === page - 1) {
          nearPageCount.push(i);
        }
      }

      return nearPageCount;
    },
    firstPage() {
      if (this.page > 3) {
        return 1;
      } else {
        return 0;
      }
    },
    lastPage() {
      if (this.page < this.pageCount - 2) {
        return this.pageCount;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 40px;
    & .pagination__item-inner.first {
      position: relative;
      & .pagination__item_dots {
        position: absolute;
        right: 10px;
        top: 15px;
      }
      & .pagination__item {
        margin-right: 30px;
      }
    }
    & .pagination__item-inner.last {
      position: relative;
      & .pagination__item_dots {
        position: absolute;
        left: -2px;
        top: 15px;
      }
      & .pagination__item {
        margin-left: 20px;
      }
    }
  }
  &__item {
    width: 32px;
    height: 32px;
    border: 1px solid #9b9b9b;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    &:hover {
      border-color: #a12c3a;
      .pagination__number {
        color: #a12c3a;
      }
    }
    & .pagination__number {
      transition: all 0.3s;
      &:hover {
        color: #a12c3a;
      }
    }
    &_active {
      border-color: #a12c3a;
      .pagination__number {
        color: #a12c3a;
      }
    }
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__number {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 13px;
    line-height: 32px;
    text-align: center;
    letter-spacing: 0.16em;
    color: #9b9b9b;
  }
  &__button {
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-family: 'MagistralC';
    font-weight: bold;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a12c3a;
    transition: all 0.3s;
    &:hover {
      color: #7a232d;
    }
    &[disabled] {
      color: #9b9b9b;
      opacity: 0.6;
    }
  }
  &__icon {
    &_left {
      margin-right: 15px;
    }
    &_right {
      margin-left: 15px;
    }
  }
}

@media (max-width: 521px) {
  .pagination {
    & button {
      display: none;
    }
  }
}
</style>

<template>
  <section class="section">
    <div class="container">
      <div class="orders__title">
        {{ staticText.orders.title[actualLang.index] }}
      </div>
      <div class="orders">
        <table class="orders__table table">
          <thead class="table__head">
            <tr>
              <th>{{ staticText.orders.th[0][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[1][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[2][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[3][actualLang.index] }}</th>
              <th class="sort-date">
                <div>{{ staticText.orders.th[4][actualLang.index] }}</div>
                <button
                  class="sort-date__button"
                  :style="arrowRotate"
                  @mouseover="arrowFill = '#000'"
                  @mouseleave="arrowFill = '#9B9B9B'"
                  @click="sortFromDate"
                >
                  <arrowIcon class="arrow" :fill="arrowFill" />
                </button>
              </th>
              <th>{{ staticText.orders.th[5][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[6][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[7][actualLang.index] }}</th>
              <th>{{ staticText.orders.th[8][actualLang.index] }}</th>
            </tr>
          </thead>
          <tbody class="table__body">
            <tr v-for="order in orders" :key="order.id">
              <td class="table__body_number-project">
                <router-link
                  :to="`/profile/projects/project/${order.numberProject}`"
                >
                  {{ order.numberProject }}
                </router-link>
              </td>
              <td>
                {{ order.id }}
              </td>
              <td>
                {{ order.price }}
              </td>
              <td>
                {{ order.purchase }}
              </td>
              <td>
                <div class="notification">
                  <span
                    class="notification__text"
                    :class="{
                      notification__text_color_green:
                        order.exclamationMarkFill === '#129227',
                      notification__text_color_red:
                        order.exclamationMarkFill === '#f00',
                    }"
                  >
                    {{ order.date }}
                  </span>
                  <exclamationMarkIcon
                    v-if="order.isNotificationEnabled"
                    height="16"
                    width="16"
                    viewBox="0 0 24 24"
                    :fill="order.exclamationMarkFill"
                    class="notification__icon"
                    @mouseover="
                      (hoverWarnings = true), (hoverWarningsId = order.id)
                    "
                    @mouseleave="
                      (hoverWarnings = false), (hoverWarningsId = null)
                    "
                  />
                  <transition name="slide-fade">
                    <div
                      v-if="
                        order.isNotificationEnabled &&
                          hoverWarnings &&
                          hoverWarningsId === order.id
                      "
                      class="notification__hover-warning"
                    >
                      Платное хранение с {{ renderDate(order.date) }}
                    </div>
                  </transition>
                </div>
              </td>
              <td>{{ order.status && order.status[actualLang.index] }}</td>
              <td class="table__comment">{{ order.comment }}</td>
              <td>{{ order.paid && order.paid[actualLang.index] }}</td>
              <td>{{ (order.price - order.purchase).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Pagination :page="page" :page-count="countPage" @paginate="paginate" />
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

import arrowIcon from '../assets/img/projects/arrow.svg?inline';
import exclamationMarkIcon from '../assets/img/projects/exclamation_mark.svg?inline';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'Orders',
  components: {
    arrowIcon,
    exclamationMarkIcon,
    Pagination,
  },
  data() {
    return {
      arrowFill: '#9B9B9B',
      arrowRotate: 'transform: rotate(0deg)',
      direction: 'increase',
      page: 1,
      hoverWarnings: false,
      hoverWarningsId: null,
      staticText,
    };
  },
  computed: {
    ...mapState({
      orders: (state) => state.projects.orders.orders,
      countPage: (state) => state.projects.orders.countPage,
      actualLang: (state) => state.settings.actualLang,
    }),
  },
  created() {
    this.page = this.$route.hash
      ? parseInt(this.$route.hash.split('#')[1], 10)
      : 1;

    this.$store.dispatch('projects/getOrders', {
      page: this.page,
      sortDate: true,
    });
  },
  methods: {
    renderDate(data) {
      data = data.split('-');

      data = new Date(data[0], +data[1] - 1, +data[2] + 7, 168, 0, 0, 0);

      data = [data.getDate(), data.getMonth() + 1, data.getFullYear()];

      data = data
        .reverse()
        .join('-')
        .replace(/(^|\/)(\d)(?=\/)/g, '$7$2');

      return data;
    },
    sortFromDate() {
      if (this.direction === 'increase') {
        this.$store.dispatch('projects/getOrders', {
          page: this.page,
          sortDate: false,
        });

        this.direction = 'decrease';
        this.arrowRotate = 'transform: rotate(180deg)';
      } else {
        this.$store.dispatch('projects/getOrders', {
          page: this.page,
          sortDate: true,
        });

        this.direction = 'increase';
        this.arrowRotate = 'transform: rotate(0deg)';
      }
    },
    paginate(value) {
      switch (value) {
        case 'left':
          this.page--;
          break;
        case 'right':
          this.page++;
          break;

        default:
          this.page = value;
          break;
      }

      this.$store.dispatch('projects/getOrders', {
        page: this.page,
        sortDate: this.direction === 'increase' ? true : false,
      });

      this.$router.push(`/profile/orders#${this.page}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.section {
  font-family: 'MagistralC';
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  background-color: #fff;
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
.orders {
  overflow-x: auto;
  overflow-y: hidden;
  margin-right: auto;
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
  &__table {
    width: 100%;
    margin-bottom: 32px;
    white-space: nowrap;
  }
  &__title {
    font-family: 'MagistralC';
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: $black;
    font-weight: bold;
    margin-bottom: 32px;
  }
}
.table {
  border-collapse: collapse;
  &__head {
    background: #ffffff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
  }
  &__body {
    tr:hover {
      background: rgba(161, 44, 58, 0.05);
    }
    .table__body_number-project a {
      color: $black;
      &:hover {
        transition: all 0.3s;
        color: $main;
      }
    }
  }
  th {
    white-space: nowrap;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    text-transform: uppercase;
    color: $black;
    padding: 25px 20px;
    &:nth-child(6) {
      text-align: left;
    }
    &:nth-child(7) {
      text-align: left;
    }
  }
  td {
    white-space: nowrap;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: right;
    color: $black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px 20px;
    &:nth-child(6) {
      text-align: left;
    }
    &:nth-child(7) {
      text-align: left;
    }
  }
  &__comment {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      max-width: 100%;
    }
  }
}
.notification {
  position: relative;
  display: inline-flex;
  align-items: center;
  &__text {
    white-space: nowrap;
    &_color_green {
      color: #129227;
    }
    &_color_red {
      color: #f00;
    }
  }
  &__icon {
    margin-left: 8px;
    cursor: pointer;
  }
}
.sort-date {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__button {
    outline: none;
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0;
    margin-left: 10px;
    background-color: #fff;
    border: 1px solid #9b9b9b;
    cursor: pointer;
    &:hover {
      border-color: #000;
    }
  }
}

.notification__hover-warning {
  position: absolute;
  background-color: black;
  color: #fff;
  padding: 10px 15px;
  text-align: center;
  border-radius: 3px;
  left: -5px;
  top: 20px;
  z-index: 2;
  width: 200px;
  white-space: normal;
}
@media (max-width: 350px) {
  .orders {
    &__title {
      font-size: 29px;
    }
  }
}
</style>

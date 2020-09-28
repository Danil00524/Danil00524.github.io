<template>
  <div>
    <div class="project__card-container">
      <promo-slider v-if="slides.length" />
    </div>
    <div id="project__card" class="project__card-wrapper">
      <div class="project__card-container">
        <div class="projects__header">
          <div class="project-title">
            {{ staticText.projects.title[actualLang.index] }}
          </div>
          <Search
            v-model="searchValue"
            class="projects__search"
            :placeholder="staticText.projects.placeholder"
          />
        </div>
        <section class="section">
          <div class="projects">
            <div
              v-if="isNotificationEnabled"
              class="projects__notification notification"
            >
              <div class="notification__staticProjects">
                <exclamationMarkIcon
                  :fill="exclamationMarkFill"
                  class="notification__icon"
                />
                <div class="notification__text">
                  <span class="notification__desc">
                    {{
                      staticText.projects.notification.desc[actualLang.index]
                    }}
                  </span>
                  <router-link to="/profile/orders" class="notification__link">
                    {{
                      staticText.projects.notification.link[actualLang.index]
                    }}
                  </router-link>
                </div>
              </div>
              <button
                type="button"
                class="notification__close"
                @click="isNotificationEnabled = false"
              ></button>
            </div>
            <table class="projects__table table">
              <thead class="table__head">
                <tr>
                  <th>{{ staticText.projects.th[0][actualLang.index] }}</th>
                  <th>{{ staticText.projects.th[1][actualLang.index] }}</th>
                  <th class="sort-date">
                    <div>{{ staticText.projects.th[2][actualLang.index] }}</div>
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
                  <th>{{ staticText.projects.th[3][actualLang.index] }}</th>
                  <th>{{ staticText.projects.th[4][actualLang.index] }}</th>
                  <th>{{ staticText.projects.th[5][actualLang.index] }}</th>
                  <th>{{ staticText.projects.th[6][actualLang.index] }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table__body">
                <tr
                  v-for="project in projects"
                  :key="project.id"
                  :class="{ isShowedStatus: project.status.isShowed }"
                  @dblclick="clickRow(project.id)"
                >
                  <td>
                    <router-link
                      :to="`/profile/projects/project/${project.id}`"
                    >
                      {{ project.id }}
                    </router-link>
                  </td>
                  <td>
                    <div>{{ project.order.number }}</div>
                    <div v-if="project.order.status">
                      {{ project.order.status[actualLang.index] }}
                    </div>
                  </td>
                  <td>{{ project.date }}</td>
                  <td>{{ project.client.name }}</td>
                  <td>
                    <div
                      v-for="(product, index) in project.products"
                      :key="index"
                    >
                      {{ product }}
                    </div>
                  </td>
                  <td>{{ project.price }}</td>
                  <td>
                    <div v-if="!project.status.isShowed" class="comment">
                      {{ project.order.comment }}
                    </div>
                    <div
                      v-if="project.status.isShowed && project.status.name"
                      class="project"
                    >
                      {{ project.status.name[actualLang.index] }}
                    </div>
                  </td>
                  <td>
                    <button
                      v-if="!project.status.isShowed"
                      class="button button_dots"
                      @click.stop="showStatusProject(project.id)"
                    >
                      <span></span>
                    </button>
                    <basket
                      v-if="
                        project.status.isShowed &&
                          project.status.name[actualLang.index] === 'Проект'
                      "
                      fill="#A12C3A"
                      class="basket"
                      @click.prevent="projectDeleteAddPopup(project.id)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ApproveDeletePopup ref="ApproveDeletePopup" />
        </section>
        <Pagination :page="page" :page-count="countPage" @paginate="paginate" />
      </div>
    </div>

    <v-snackbar v-model="popups.statusPopup" :timeout="4000">
      {{ popups.text }}
      <v-btn color="blue" text @click="$store.commit('projects/SET_POPUP')">
        {{ staticText.btns[1][actualLang.index] }}
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { store } from '../store';
import { staticText } from '../i18n';

import arrowIcon from '../assets/img/projects/arrow.svg?inline';
import exclamationMarkIcon from '../assets/img/projects/exclamation_mark.svg?inline';
import basket from '../assets/img/projects/basket.svg?inline';
import ApproveDeletePopup from '../components/Popups/ApproveDeletePopup.vue';

import Pagination from '../components/Pagination.vue';
import Search from '../components/Search.vue';

import PromoSlider from '../components/Projects/PromoSlider.vue';

export default {
  name: 'Projects',
  components: {
    arrowIcon,
    exclamationMarkIcon,
    basket,
    Pagination,
    Search,
    PromoSlider,
    ApproveDeletePopup,
  },
  data() {
    return {
      arrowFill: '#9B9B9B',
      arrowRotate: 'transform: rotate(0deg)',
      direction: 'increase',
      isNotificationEnabled: false,
      exclamationMarkFill: '#129227',
      page: 1,
      listSize: 6,
      searchValue: '',
      sortData: false,
      staticText,
    };
  },
  computed: {
    ...mapState({
      slides: (state) => state.promos.promos,
      projects: (state) => state.projects.projects,
      countPage: (state) => state.projects.countPage,
      staticProjects: (state) => state.projects.staticProjects,
      actualLang: (state) => state.settings.actualLang,
      popups: (state) => state.projects.popups,
    }),
  },
  watch: {
    searchValue(searchValue) {
      let timeoutID;

      timeoutID = setTimeout(() => {
        if (searchValue !== this.searchValue) {
          return clearTimeout(timeoutID);
        }
        this.$store.commit('basket/SET_POPUP_IS_LOADING');

        this.$store.dispatch('projects/getProjectsTable', {
          cb: () => {
            this.$store.commit('basket/SET_POPUP_IS_LOADING');
            this.paginate(1);
          },
          page: 1,
          searchValue,
          sortData: this.sortData,
        });
      }, 700);
    },
  },
  created() {
    this.page = this.$route.hash
      ? parseInt(this.$route.hash.split('#')[1], 10)
      : 1;

    this.$store.dispatch('projects/getProjectsTable', {
      cb: () => {},
      page: this.page,
      sortData: this.sortData,
      searchValue: this.searchValue,
    });
  },
  mounted() {
    document.addEventListener('click', this.closeShowedStatus);
  },
  destroyed() {
    document.removeEventListener('click', this.closeShowedStatus);
  },
  methods: {
    clickRow(id) {
      this.$router.push(`/profile/projects/project/${id}`);
    },
    projectDeleteAddPopup(id) {
      this.$refs.ApproveDeletePopup.projectDeletePopup(id);
    },
    sortFromDate() {
      if (this.direction === 'increase') {
        this.$store.commit('basket/SET_POPUP_IS_LOADING');
        this.sortData = true;

        this.$store.dispatch('projects/getProjectsTable', {
          cb: () => {
            this.$store.commit('basket/SET_POPUP_IS_LOADING');
            this.direction = 'decrease';
            this.arrowRotate = 'transform: rotate(180deg)';
          },
          sortData: this.sortData,
          page: this.page,
          searchValue: this.searchValue,
        });
      } else {
        this.$store.commit('basket/SET_POPUP_IS_LOADING');
        this.sortData = false;

        this.$store.dispatch('projects/getProjectsTable', {
          cb: () => {
            this.$store.commit('basket/SET_POPUP_IS_LOADING');
            this.direction = 'increase';
            this.arrowRotate = 'transform: rotate(0deg)';
          },
          sortData: this.sortData,
          page: this.page,
          searchValue: this.searchValue,
        });
      }
    },
    showStatusProject(id) {
      this.projects.forEach((project) => {
        if (project.id === id) {
          project.status.isShowed = true;
        } else {
          project.status.isShowed = false;
        }
      });
    },
    deleteProject(id) {
      store.dispatch('projects/deleteProject', id);
    },
    closeShowedStatus() {
      this.projects.forEach((project) => {
        project.status.isShowed = false;
      });
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

      this.$store.dispatch('projects/getProjectsTable', {
        cb: () => {},
        page: this.page,
        sortData: this.sortData,
        searchValue: this.searchValue,
      });

      const hashPage = this.$route.hash
        ? parseInt(this.$route.hash.split('#')[1], 10)
        : null;

      if (hashPage !== this.page) {
        this.$router.push(`/profile/projects#${this.page}`);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('promos/getPromo', () => {
      store.dispatch('projects/getProjectsTable', {
        cb: () => {
          next((vm) => {
            const currentDate = new Date();
            const DAYS_14_IN_MS = 14 * 24 * 60 * 60 * 1000;

            vm.projects.forEach((project) => {
              const orderDate = new Date(project.order.date); // Если нет даты то будет "Invalid Date"

              if (currentDate.getTime() >= orderDate.getTime()) {
                // "Invalid Date".getTime() даст нам NaN -> любое сравнение с NaN даст false
                vm.isNotificationEnabled = true;
                if (
                  currentDate.getTime() >=
                  orderDate.getTime() + DAYS_14_IN_MS
                ) {
                  vm.exclamationMarkFill = '#f00';
                }
              }
            });
          });
        },
        page: 1,
        sortData: false,
        searchValue: '',
      });
    });
  },
};
</script>
<style lang="scss">
.project__card-wrapper {
  background-color: #fff;
}
.project__card-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
  .projects__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 80px;
    margin-bottom: 19px;
    .projects__search {
      transition: all 0.3s;
      &:hover {
        border-bottom: 1px solid rgb(0, 0, 0);
      }
    }
    .project-title {
      padding-right: 15px;
      font-family: 'MagistralC';
      font-size: 32px;
      line-height: 37px;
      letter-spacing: 0.02em;
      color: #1d1d1d;
      font-weight: bold;
    }
  }
  .section {
    font-family: 'MagistralC';
    overflow-x: auto;
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
  .projects {
    width: 1140px;
    &__notification {
      padding: 20px 35px;
      background: rgba(161, 44, 58, 0.05);
      margin-bottom: 20px;
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #1d1d1d;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__table {
      width: 100%;
      cursor: pointer;
    }
  }
  .notification {
    &__icon {
      margin-right: 15px;
    }
    &__staticProjects {
      display: flex;
      align-items: center;
    }
    &__text {
      display: flex;
      align-items: center;
    }
    &__desc {
      display: block;
      margin-right: 5px;
    }
    &__link {
      display: block;
      color: #1d1d1d;
      border-bottom: 1px solid #000;
      &:hover {
        color: #a12c3a;
        border-color: #a12c3a;
      }
    }
    &__close {
      cursor: pointer;
      display: block;
      border: none;
      outline: none;
      background-color: transparent;
      flex-shrink: 0;
      position: relative;
      width: 14px;
      height: 14px;
      &:after {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        background-color: #9b9b9b;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #9b9b9b;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &:hover,
      &:focus {
        &:after {
          width: 3px;
        }
        &:before {
          height: 3px;
        }
      }
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
      tr.isShowedStatus {
        background: rgba(161, 44, 58, 0.05);
      }
      a {
        color: #1d1d1d;
        &:hover {
          color: #a12c3a;
          text-decoration: underline;
        }
      }
      .project {
        font-family: 'MagistralC';
        font-weight: bold;
        font-size: 10px;
        line-height: 11px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #a12c3a;
        border: 1px solid #a12c3a;
        border-radius: 1px;
        display: inline-block;
        padding: 6px 8px;
        &:hover {
          text-decoration: none;
          color: #a12c3a;
        }
      }
      .comment {
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all .4s;
        &:hover {
          white-space: pre-line;
        }
      }
    }
    th {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      text-transform: uppercase;
      color: #1d1d1d;
      padding: 25px 0;
    }
    td {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #1d1d1d;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 25px 0;
      &:last-child {
        position: relative;
      }
    }
  }
  .title {
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: #1d1d1d;
  }
  .basket {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 40%;
    right: 15px;
  }
  .button {
    width: 4px;
    height: 16px;
    cursor: pointer;
    display: block;
    border: none;
    outline: none;
    background-color: transparent;
    position: absolute;
    top: 40%;
    right: 15px;
    span {
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #9b9b9b;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #9b9b9b;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
    }
    &:before {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #9b9b9b;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
    }
    &:hover,
    &:focus {
      &:after,
      &:before,
      span {
        background-color: #000;
      }
    }
  }
  .sort-date {
    display: flex;
    align-items: center;
    justify-content: center;
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
  .pagination {
    margin-top: 64px;
    padding-bottom: 80px;
    & ul {
      & li {
        & a {
          font-family: 'MagistralC';
          font-weight: bold;
        }
      }
    }
  }
}
.button_dots {
  padding: 0 10px;
}

@media (max-width: 521px) {
  .projects__header {
    .project-title {
      padding-bottom: 15px;
    }
  }
}
@media (max-width: 400px) {
  .projects__header {
    .search.projects__search {
      padding-left: 0;
      .search__icon {
        display: none;
      }
      & input {
        text-align: center;
      }
    }
  }
}
</style>

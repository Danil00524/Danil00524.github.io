<template>
  <div v-if="crumbs.length > 1" class="breadcrumbs not-found" id="breadcrumbs">
    <div class="container">
      <div class="breadcrumbs__wrapper">
        <ul class="breadcrumbs__list ">
          <li
            v-for="(breadcrumb, index) in crumbs"
            :key="index"
            class="breadcrumbs-items"
          >
            <span v-if="index >= crumbs.length - 1">
              {{
                breadcrumb.text[actualLang.index]
                  ? breadcrumb.text[actualLang.index]
                  : breadcrumb.text
              }}
            </span>
            <router-link
              v-else
              class="breadcrumbs-items_page"
              :to="breadcrumb.to"
            >
              {{
                breadcrumb.text[actualLang.index]
                  ? breadcrumb.text[actualLang.index]
                  : breadcrumb.text
              }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Breadcrumbs',
  computed: {
    crumbs() {
      const { categoryId, productId } = this.$route.params;

      let productName;

      let categoryName;

      if (categoryId) {
        const category = this.$store.getters['profiles/categoryName'](
          categoryId,
        );

        categoryName = category ? category.title[this.actualLang.index] : '';
      }
      if (productId) {
        productName = this.$store.getters['products/productName'];
      }

      let matched = [...this.$route.matched];

      const lastMatch = matched.length ? matched[matched.length - 1] : null;

      if (lastMatch && lastMatch.path[lastMatch.path.length - 1] === '/') {
        matched.pop();
      }

      if (
        this.$route.path === '/' ||
        this.$route.matched[0].components.default.name === 'PageNotFound'
      ) {
        matched = [];
      }
      const breadcrumbs = matched.reduce(
        (breadcrumbArray, match) => {
          let text;

          let { path } = match;

          if (match.meta.breadCrumb) {
            text = match.meta.breadCrumb.name;
          } else {
            text = path;
          }

          if (match.meta.breadCrumb.dynamic) {
            if (match.path.indexOf('categoryId') !== -1) {
              text = categoryName;
              path = match.path.replace(/:categoryId/, categoryId);
            }
            if (path.indexOf('productId') !== -1) {
              text = productName;
              path = path.replace(/:productId/, productId);
            }
          }

          breadcrumbArray.push({
            path: path,
            to: path,
            text,
          });

          return breadcrumbArray;
        },
        [
          {
            path: '',
            to: '/',
            text: {
              ru: 'Главная',
              ua: 'Головна',
            },
          },
        ],
      );

      return breadcrumbs;
    },
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss">
.breadcrumbs {
  background-color: #fff;
  padding-top: 24px;
  padding-left: 15px;
  padding-right: 15px;
  .container {
    padding-bottom: 15px;
    .breadcrumbs__wrapper {
      padding: 0px;
      padding-bottom: 10px;
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
      .breadcrumbs__list {
        width: max-content;
        & li {
          display: inline-block;
        }
        & li + li {
          margin-left: 32px;
        }
      }
      .breadcrumbs-items {
        font-weight: 600;
        line-height: 19px;
        color: #1d1d1d;
        position: relative;
        &:before {
          position: absolute;
          content: '/';
          top: 1px;
          left: -21px;
          color: #1d1d1d;
        }
        &:first-child:before {
          content: '';
        }
        .breadcrumbs-items_page {
          font-weight: 600;
          line-height: 19px;
          color: #1d1d1d;
        }
        .router-link-active {
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
        }
        &:last-child {
          color: rgba(29, 29, 29, 0.6);
        }
      }
    }
  }
}
@media (max-width: 980px) {
  .breadcrumbs {
    .container {
      .breadcrumbs__wrapper {
        &::-webkit-scrollbar {
          height: 2px;
        }
      }
    }
  }
}
</style>

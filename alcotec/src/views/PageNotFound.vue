<template>
  <section class="not-found">
    <div class="container">
      <div class="not-found__wrapper">
        <div class="not-found__inner">
          <div class="not-found__inner-title">
            404<span>{{ errorText[actualLang.index] }}</span>
          </div>
          <div class="not-found__inner-subtitle">
            {{ pageNotFoundText[actualLang.index] }}
          </div>
          <router-link v-if="isLoggedIn" to="/profile/projects">
            <Button
              :text="btnCreateUser[actualLang.index]"
            />
          </router-link>
          <router-link
            v-else
            :to="{ name: 'home' }"
          >
            <Button :text="btnCreate[actualLang.index]" />
          </router-link>
        </div>
        <div class="not-found__wrapper-img">
          <img src="../assets/img/404-error.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Button from '../components/Button.vue';

export default {
  name: 'PageNotFound',
  components: {
    Button,
  },
  data() {
    return {
      btnCreateUser: {
        ru: 'Проекты',
        ua: 'Проекти',
      },
      btnCreate: {
        ru: 'Вернутся на главную',
        ua: 'Повернутися на головну',
      },
      errorText: {
        ru: 'ошибка',
        ua: 'помилка',
      },
      pageNotFoundText: {
        ru:
          'Извините, мы не нашли эту страницу! Может быть, ссылка устарела или страница удалена.',
        ua:
          'Вибачте, ми не знайшли цієї сторінки! Можливо, посилання застаріле або сторінку видалено.',
      },
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
      isLoggedIn: (state) => state.users.userData.isLoggedIn,
    }),
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  background-color: #fff;
  box-shadow: -20px -6px 25px -12px rgba(0, 0, 0, 0.75);
  padding-bottom: 80px;
  .not-found__wrapper {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    .not-found__inner {
      margin-left: 240px;
      max-width: 570px;
      width: 100%;
      z-index: 1;
      .not-found__inner-title {
        font-family: 'MagistralC';
        font-style: normal;
        font-weight: bold;
        font-size: 230px;
        line-height: 262px;
        color: #191919;
        & span {
          font-size: 30px;
        }
      }
      .not-found__inner-subtitle {
        font-size: 16px;
        line-height: 26px;
        color: #000000;
        margin-bottom: 73px;
      }
    }
    .not-found__wrapper-img {
      position: absolute;
      top: 0;
      right: 0px;
      z-index: 0;
    }
  }
}

@media (max-width: 1100px) {
  .not-found .not-found__wrapper .not-found__inner {
    margin-left: 0px;
  }
  .not-found {
    .not-found__wrapper {
      .not-found__wrapper-img {
        display: none;
      }
    }
  }
}
@media (max-width: 767px) {
  .not-found {
    .not-found__wrapper {
      padding-top: 80px;
      justify-content: center;
      height: auto;
      .not-found__inner {
        text-align: center;
        .not-found__inner-title {
          font-size: 150px;
          line-height: 150px;
          & span {
            font-size: 30px;
          }
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .not-found .not-found__wrapper .not-found__inner .not-found__inner-title {
    font-size: 90px;
    line-height: 90px;
  }
}
</style>

<template>
  <div class="partners">
    <div class="custom-container">
      <h1 class="about_title">{{ brand[actualLang.index] }}</h1>
      <!-- <div class="under__construction">
        {{ inDevelop[actualLang.index] }}
      </div> -->
      <div class="partners__content">
        <div class="partners__content-title">
          Информация для партнеров
        </div>
        <p class="partners__content-text">
          Группа компаний "Алкотек" поставляет бытовую технику партнерам мелкими
          и крупными оптом, а розничным покупателям - через сеть собственных
          интернет-магазинов.
        </p>
        <ul class="partners__content-list">
          <span class="partners__content-text-title"
            >Нашими партнерами являются:</span
          >
          <li>кухонные студии,</li>
          <li>архитектурные бюро,</li>
          <li>мебельные салоны,</li>
          <li>интернет-магазины,</li>
          <li>розничными магазины,</li>
          <li>национальные строительные сети DIY,</li>
          <li>производители мебели.</li>
        </ul>
        <p class="partners__content-text">
          <span class="partners__content-text-title"
            >Архитекторов и дизайнеров интерьеров</span
          >
          по вопросам сотрудничества просим обращаться к менеджеру, ведущему
          проект "Архиклуб Алкотек", Наталье Гореловой.
        </p>
        <span class="partners__content-text-phone"
          >Телефон <a href="tel:+380445002626">+38 044 500 26 26</a> (внутренний
          104 - в тоновом режиме).</span
        >
        <span class="partners__content-text-email"
          >Е-mail:
          <a href="mailto:gorelova@alcotec.com.ua"
            >gorelova@alcotec.com.ua</a
          ></span
        >
        <p class="partners__content-text">
          <span class="partners__content-text-title">Для производителей</span>
          Мы ждём ваши предложения о сотрудничестве по телефону в Киеве:
          <a href="tel:+380445002626">+38 (044) 500-26-26</a>.
        </p>
        <ul class="partners__content-list">
          <span class="partners__content-text-title"
            >Для всех своих партнеров мы обеспечиваем:</span
          >
          <li>развитие дилерской сети по Украине;</li>
          <li>своевременную доставку товаров по всей Украине;</li>
          <li>поддержку финансовой и материальной базы;</li>
          <li>специальные условия на выставочные образцы продукции;</li>
          <li>профессионализм, компетентность и ответственность.</li>
        </ul>
        <ul class="partners__content-list--number">
          <span class="partners__content-text-title"
            >Как стать партнером "Алкотек"?
          </span>
          <li>
            Позвонить нам по телефону в Киеве <a href="tel:+380445002626">+38 (044) 500-26-26</a> (после
            включения автоответчика в тоновом режиме набрать 5 - для связи с
            секретарем).
          </li>
          <li>
            Заключить договор о сотрудничестве в Киеве или любом из наших
            <router-link to="/contacts">региональных представительств</router-link>.
          </li>
          <li>
            Получить карточку партнера и индивидуальный on-line доступ в
            информационные разделы этого сайта.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

export default {
  name: 'Partners',
  components: {},
  data() {
    return {
      brand: staticText.headerTexts.menu[3].text,
      inDevelop: staticText.titles.inDevelop,
    };
  },
  computed: {
    ...mapState({
      actualLang: (state) => state.settings.actualLang,
    }),
  },
};
</script>

<style lang="scss" scoped>
.partners {
  margin: 0;
  background-color: #ffffff;
  min-height: 32.5vh;
}
.about_title {
  font-family: 'MagistralC';
  font-size: 32px;
  line-height: 42px;
  letter-spacing: 0.02em;
  color: #1d1d1d;
  font-weight: bold;
  padding-bottom: 32px;
  padding-top: 32px;
}
p {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #1d1d1d;
  padding-bottom: 32px;
}
.partners__content{
  padding-bottom: 30px;
  & a:visited{
    color: blue;
  }
}
.partners__content-title {
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1d1d1d;
  padding-bottom: 32px;
}
.partners__content-text {
  padding-top: 20px;
}
.partners__content-list {
  list-style: inside;
}
.partners__content-text-title {
  font-weight: bold;
}
.partners__content-text-phone,
.partners__content-text-email {
  display: block;
}
.partners__content-list--number{
  padding-top: 20px;
  list-style: decimal;
  & li{
    margin-top: 10px;
    margin-left: 14px;
  }
}
</style>

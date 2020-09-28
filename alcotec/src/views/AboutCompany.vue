<template>
  <div class="about_company">
    <div class="custom-container">
      <h5 class="about_title">
        {{ brand[actualLang.index] }}
      </h5>
      <p>
        Группа компаний &laquo;Алкотек&raquo; 19&nbsp;лет работает на украинском
        рынке и на сегодняшний день является безусловным лидером по оптовой
        продаже крупной отдельностоящей, встраиваемой и мелкой бытовой техники
        более 40 известнейших
        <router-link to="../brands">
          торговых марок
        </router-link>
        в 14 крупных
        <router-link to="../contacts">
          городах
        </router-link>
        Украины.<br />
        <br />
        Мы ориентированы на надежное и долгосрочное сотрудничество с оптовыми
        партнерами, а также дизайнерами, архитекторами, салонами-магазинами,
        интернет-магазинами.<br />
        <br />
        ГК Алкотек является украино-швейцарским предприятием и предлагает
        качественную бытовую технику оптом, а также:<br />
        - квалифицированные маркетинговые услуги;<br />
        - сервисные услуги;<br />
        - дизайнерские услуги;<br />
        - комплексные решения для комплектации кухни (в том числе немецкую
        <a href="http://alcotec.com.ua/news/index/newsId/86">
          кухонную мебель Nolte
        </a>
        и итальянские
        <a href="http://alcotec.com.ua/news/index/newsId/87">кухни Scavolini </a
        >);<br />
        - надежное хранение техники и
        <router-link to="../delivery">
          логистические услуги </router-link
        >;<br />
        - ценовую стабильность (а для постоянных клиентов &ndash; гибкую систему
        скидок).<br />
        <br />
        &laquo;Alcotec&raquo; имеет эксклюзивные права на ряд европейских
        брендов, а поставляемая техника новая и обеспечена гарантией
        производителя (гарантийным и постгарантийным обслуживанием в
        авторизованных
        <router-link to="../services">
          сервисных центрах
        </router-link>
        Украины).<br />
        <br />
        Профессионализм и квалификация наших сотрудников постоянно повышаются на
        обучающих семинарах в Украине и за рубежом.<br />
        <br />
        Для поддержки украинского строительного бизнеса Alcotec вступила в
        <a href="http://alcotec.com.ua/news/index/newsId/81">
          Украинскую строительную ассоциацию
        </a>
        , а для архитекторов и дизайнеров мы разработали и продвигаем проект:
        &laquo;
        <router-link to="../registration">
          Клуб архитекторов и дизайнеров
        </router-link>
        &laquo;Алкотек&raquo;;<br />
        <br />
        Активность компании выражается также в общественно-социальных проектах,
        таких как
        <a href="http://alcotec.com.ua/news/index/newsId/80">ZaMeNa </a>
        старой бытовой техники на новую, и благотворительной деятельности
        (поддержка детских домов и строительство церкви под Киевом). <br />
        <br />
        Будем рады слышать Вас по телефонам: +38 (044) 500-26-26 (внутр.
        5)&nbsp;в рабочее время (пн.-пт. 9.00-18.00).<br />
        Центральный офис:<br />
        Украина, 04119, г. Киев, ул. Дегтярёвская 25а, корпус 1, секция №3.<br />
        <br />
        Контакты региональных офисов Alcotec смотрите на странице
        <router-link to="../contacts">
          Контакты </router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

export default {
  name: 'AboutCompany',
  data() {
    return {
      brand: staticText.additionalMenu.menu[0].text,
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
.about_company {
  margin-bottom: 0;
  padding-bottom: 0;
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
</style>

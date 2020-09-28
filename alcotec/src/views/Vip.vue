<template>
  <div class="vip">
    <div class="custom-container">
      <h4 class="about_title">VIP-консталтинг</h4>
      <p>
        Покупая дорогую бытовую технику, хочется не только украсить дом, но и
        использовать все функциональные возможности прибора для получения
        идеального результата. ВИП-консалтинг от специалистов Группы компаний
        "Алкотек" предоставит компплекс услуг по практическому применению Вашей
        техники:
        <br />
        1) функциональные возможности прибора,
        <br />
        2) правильный уход за прибором.
        <br /><br />
        Консультации предоставляются для брендов: Miele, Kuppersbusch, AEG.
        Категории техники: варочные поверхности, духовые шкафы, кофемашины,
        холодильное оборудование (в т.ч. винные шкафы), вытяжки, стиральные
        машины, посудомоечные машины.
        <br /><br />
        Стоимость услуги фиксированная: 799 гривен за выезд одного специалиста,
        вне зависимости от количества бытовых приборов. Консультации
        осуществляются для покупателей Киева и пригорода. Время на консалтинг
        варьируется от бренда, модели техники и количества приборов.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vip',
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.vip{
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
</style>

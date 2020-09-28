<template>
  <div class="brands">
    <div class="custom-container">
      <h1 class="about_title">{{ header[actualLang.index] }}</h1>
      <p>{{ description[actualLang.index] }}</p>
      <div class="flex-brands table-container" role="table">
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/asko"><img alt="" :src="`${baseDomainImg}/public/uploads/1504169324.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/hotpoint"><img alt="" :src="`${baseDomainImg}/public/uploads/1504083038.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://zirtal.com"><img alt="" :src="`${baseDomainImg}/public/uploads/1576238712.png`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/blanco"><img alt="" :src="`${baseDomainImg}/public/uploads/1504163448.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/electrolux"><img alt="" :src="`${baseDomainImg}/public/uploads/1504273727.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/aeg"><img alt="" :src="`${baseDomainImg}/public/uploads/1504087860.png`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/gaggenau"><img alt="" :src="`${baseDomainImg}/public/images/gaggenau(1).jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/gorenje"><img alt="" :src="`${baseDomainImg}/public/uploads/1504164331.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/hansa"><img alt="" :src="`${baseDomainImg}/public/uploads/1504083568.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/liebherr"><img alt="" :src="`${baseDomainImg}/public/uploads/1504164544.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/miele"><img alt="" :src="`${baseDomainImg}/public/uploads/1504169520.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/restart"><img alt="" :src="`${baseDomainImg}/public/uploads/1504165403.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/smeg"><img alt="" :src="`${baseDomainImg}/public/uploads/1504167098.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/indesit"><img alt="" :src="`${baseDomainImg}/public/uploads/1504088609.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/viking"><img alt="" :src="`${baseDomainImg}/public/uploads/1504167528.png`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/wolf"><img alt="" :src="`${baseDomainImg}/public/uploads/1504169149.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/sencor"><img alt="" :src="`${baseDomainImg}/public/images/sencor.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/ilve"><img alt="" :src="`${baseDomainImg}/public/uploads/1504167353.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/catalog/brand/35"><img alt="" :src="`${baseDomainImg}/public/uploads/1504168945.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/kupersbusch"><img alt="" :src="`${baseDomainImg}/public/uploads/1504168780.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/zanussi"><img alt="" :src="`${baseDomainImg}/public/uploads/1504168023.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/siemens"><img alt="" :src="`${baseDomainImg}/public/uploads/1504167721.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/gutmann"><img alt="" :src="`${baseDomainImg}/public/uploads/1504168618.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/bosch"><img alt="" :src="`${baseDomainImg}/public/uploads/1504167897.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/berghoff"><img alt="" :src="`${baseDomainImg}/public/uploads/1504164046.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/kitchenaid"><img alt="" :src="`${baseDomainImg}/public/uploads/1539951837.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/teka"><img alt="" :src="`${baseDomainImg}/public/uploads/1534775471.png`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/candy"><img alt="" :src="`${baseDomainImg}/public/uploads/1504081410.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/delonghi"><img alt="" :src="`${baseDomainImg}/public/uploads/1504172395.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/kenwood"><img alt="" :src="`${baseDomainImg}/public/uploads/1504171418.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/redmond"><img alt="" :src="`${baseDomainImg}/public/uploads/1551267735.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/samsung"><img alt="" :src="`${baseDomainImg}/public/uploads/1341497377.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/profieurope"><img alt="" :src="`${baseDomainImg}/public/uploads/1539873792.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="https://alcotec.com.ua/page/whirlpool"><img alt="" :src="`${baseDomainImg}/public/uploads/1504087433.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/nolte"><img alt="" :src="`${baseDomainImg}/public/images/logo_nolte.png`"/></a></div>
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/scavolini"><img alt="" :src="`${baseDomainImg}/public/uploads/1397724104.jpg`" /></a></div>
        </div>
        <div class="flex-table row" role="rowgroup">
          <div class="flex-cell" role="cell"><a href="http://alcotec.com.ua/page/alternotti"><img alt="" :src="`${baseDomainImg}/public/uploads/1397726031.jpg`" /></a></div>
          <div class="flex-cell" role="cell"><a href="javascript:void(0);"><img alt="" :src="`${baseDomainImg}/public/images/insinkerator.png`" /></a></div>
          <div class="flex-cell mobile-none" role="cell">&nbsp;</div>
          <div class="flex-cell mobile-none" role="cell">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';
import { baseDomainImg } from '../constans';

export default {
  name: 'Brands',
  data() {
    return {
      // inDevelop: staticText.titles.inDevelop,
      header: staticText.headerTexts.menu[2].header,
      description: staticText.headerTexts.menu[2].description,
      baseDomainImg,
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
.brands {
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

.table-container {
  display: block;
  margin: 2em auto 0 auto;
  width: 90%;
  max-width: 600px;
  padding-bottom: 50px;
}

.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px $main;
  transition: 0.5s;
  & div {
    box-sizing: border-box;
  }
}
.flex-table.row {
  border-bottom: 1px solid $main;
  border-left: 1px solid $main;
  border-right: 1px solid $main;
  align-items: center;
  justify-content: center;
  &:first-of-type{
    border-top: 1px solid $main;
  }
}

.flex-cell {
  width: calc(100% / 4); //1px = border right
  text-align: center;
  border-right: 1px solid $main;
  padding: 0.5em;
  height: 80px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    background: #F5F5F5;
    transition: 500ms;
    & img{
      opacity: 0.5;
    }
  }
  //flex: 1 1 33.3%;
  &:last-child {
    border-right: none;
  }
  & a{
    & img{
      max-height: calc(80px - 1em);
      width: auto;
    }
  }
}

@media all and (max-width: 767px) {
  .flex-row {
    width: 100%; //1px = border right
  }
}

@media all and (max-width: 430px) {

  .flex-table {
    .flex-row {
      border-bottom: 0;
    }
    .flex-row:last-of-type {
      border-bottom: 1px solid $main;
    }
  }

  .flex-row {
    width: 100%; //1px = border right
  }

  .flex-cell {
    width: 50%; //1px = border right
    &:nth-child(2){
      border-right: none;
    }
    &:nth-child(2){
      border-right: none;
    }
    &:nth-child(-n+2){
      border-bottom: 1px solid $main;
    }
  }
  .flex-cell.mobile-none {
    display: none;
  }
}
</style>

<template>
  <div class="contacts">
    <div class="custom-container">
      <h1 class="about_title">{{ brand[actualLang.index] }}</h1>
      <p>
        Офис: Киев, 04119, ул. Дегтярёвская 25-А, ЖК "Cosmopolitan", корпус 1,
        секция 3, офис 413 <br />
        Ждем Вас с 9-00 до 18-00 с понедельника по пятницу.<br />
        Очень просим время визита согласовывать заранее, чтоб сэкономить Ваше
        время на ожидание оформления документов.<br />
        Склад находится в районе Куреневки. <br />
        Будем рады слышать Вас по телефонам: +38 (044) 500-26-26 При звонке
        сообщите секретарю, кому или по какому вопросу Вы звоните, и Вас
        переключат на менеджера. Либо наберите внутренний номер Вашего менеджера
        самостоятельно. Телефон для обсуждения вопросов сотрудничества и
        рекламы: (044) 500-26-26 (внутр. 206).
      </p>
      <div class="contacts-table-title">
        Региональные представительства
      </div>
      <div class="contacts-table">
        <table border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th>Город</th>
              <th>ФИО руководителя представительства</th>
              <th>e-mail</th>
              <th>Телефон</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ДНЕПР</td>
              <td>Попович Сергей</td>
              <td>
                <a href="mailto:dnepr1@alcotec.com.ua">dnepr1@alcotec.com.ua</a>
              </td>
              <td><a href="tel:+380503566412">(050) 356-64-12</a></td>
              <td>
                <a href="https://goo.gl/maps/T1XgZHrJt2t" target="_blank"
                  >49044, ул.Гоголя,15-в офис 18</a
                >
              </td>
            </tr>
            <tr>
              <td>ХАРЬКОВ</td>
              <td>Цисон Максим</td>
              <td>
                <a href="mailto:kharkov@alcotec.com.ua"
                  >kharkov@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+3805033234787">(050) 323-47-87</a>
                <a href="tel:+380577661097">(057) 766-10-97</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/fbPwy2DTzez" target="_blank"
                  >61140, пр. Фонвизина 18, офис 215</a
                >
              </td>
            </tr>
            <tr>
              <td>ЛЬВОВ</td>
              <td>Савин Максим</td>
              <td>
                <a href="mailto:max@alcotec.lviv.ua">max@alcotec.lviv.ua</a>
                <a href="mailto:office@alcotec.lviv.ua"
                  >office@alcotec.lviv.ua</a
                >
              </td>
              <td>
                <a href="tel:+380504437731">(050) 443-77-31</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/rxFniLNB3Gt" target="_blank"
                  >79035, ул. Зелена 149, корп. 4, оф. 217</a
                >
              </td>
            </tr>
            <tr>
              <td>ТЕРНОПОЛЬ</td>
              <td>Ярич Валерий</td>
              <td>
                <a href="mailto:valerij_te@alcotec.lviv.ua"
                  >valerij_te@alcotec.lviv.ua</a
                >
              </td>
              <td>
                <a href="tel:+380958310473">(095) 831-04-73</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/5D9Z4Txcrck" target="_blank"
                  >46023, пр. Злуки 4, кв. 78
                </a>
              </td>
            </tr>
            <tr>
              <td>КРОПИВНИЦКИЙ</td>
              <td>Игнатьев Денис</td>
              <td>
                <a href="mailto:kirovograd@alcotec.com.ua"
                  >kirovograd@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380504180295">(050) 418-02-95</a>
                <a href="tel:+380522595039">(0522) 59-50-39</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/QBUb82CoF6U2" target="_blank"
                  >25015, ул. Черновола 1-б
                </a>
              </td>
            </tr>
            <tr>
              <td>ВИННИЦА</td>
              <td>Кичмаренко Владимир</td>
              <td>
                <a href="mailto:vinnitsa@alcotec.com.ua"
                  >vinnitsa@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380504436229">(050) 443-62-29</a>
                <a href="tel:+380432550388">(0432) 55-03-88</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/WC1eG2rJERk" target="_blank"
                  >21021, ул. 600-летия 17, корп. 21
                </a>
              </td>
            </tr>
            <tr>
              <td>ОДЕССА</td>
              <td>Доманюк Сергей</td>
              <td>
                <a href="mailto:odessa_sergey@alcotec.com.ua"
                  >odessa_sergey@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380503860950">(050) 386-09-50</a>
                <a href="tel:+380677166032">(067) 716-60-32</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/P4s1Wt8UuEC2" target="_blank"
                  >65009, ул. Фонтанская дорога 11, оф. 516
                </a>
              </td>
            </tr>
            <tr>
              <td>ЗАПОРОЖЬЕ</td>
              <td>Коростелев Андрей</td>
              <td>
                <a href="mailto:korostelev@alcotec.com.ua"
                  >korostelev@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380503587026">(050) 358-70-26</a>
                <a href="tel:+380612868751">(061) 286-87-51</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/AZEstYPBtao" target="_blank"
                  >69000, ул. Северное шоссе 4, каб. 307
                </a>
              </td>
            </tr>
            <tr>
              <td>ХЕРСОН</td>
              <td>Кириченко Александр</td>
              <td>
                <a href="mailto:kherson@alcotec.com.ua"
                  >kherson@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380958800477">(095) 880-04-77</a>
                <a href="tel:+380552424446">(0552) 42-44-46</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/hyJDfcLgAZ92" target="_blank"
                  >73000, ул. Гирского 29, оф. 1
                </a>
              </td>
            </tr>
            <tr>
              <td>КРЕМЕНЧУГ</td>
              <td>Лихонос Дмитрий</td>
              <td>
                <a href="mailto:kremenchug@alcotec.com.ua"
                  >kremenchug@alcotec.com.ua</a
                >
              </td>
              <td>
                <a href="tel:+380504459133">(050) 445-91-33</a>
                <a href="tel:+380552424446">(0552) 42-44-46</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/hyJDfcLgAZ92" target="_blank"
                  >73000, ул. Гирского 29, оф. 1
                </a>
              </td>
            </tr>
            <tr>
              <td>ЛУЦК</td>
              <td>Ярич Валерий</td>
              <td>
                <a href="mailto:valerij_te@alcotec.lviv.ua"
                  >valerij_te@alcotec.lviv.ua</a
                >
              </td>
              <td>
                <a href="tel:+380958310473">(095) 831-04-73</a>
              </td>
              <td>
                <a href="https://goo.gl/maps/5D9Z4Txcrck" target="_blank"
                  >46023, пр. Злуки 4, кв. 78
                </a>
              </td>
            </tr>
            <tr>
              <td>УЖГОРОД</td>
              <td>Бочкор Антон</td>
              <td>
                <a href="mailto:anton_uz@alcotec.lviv.ua"
                  >anton_uz@alcotec.lviv.ua</a
                >
              </td>
              <td>
                <a href="tel:+380952755967">(095) 275-59-67</a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { staticText } from '../i18n';

export default {
  name: 'Contacts',
  data() {
    return {
      brand: staticText.titles.contactsKiev,
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
.contacts {
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
.contacts-table-title {
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 26px;
  line-height: 26px;
  color: #1d1d1d;
  padding-bottom: 32px;
}
.contacts-table {
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
  padding-bottom: 32px;
  & table {
    width: 100%;
    & thead {
      & tr {
        height: 54px;
        & th {
          font-family: 'Open Sans';
          font-size: 16px;
          line-height: 26px;
          color: #1d1d1d;
          text-align: center;
          white-space: nowrap;
          padding: 0 15px;
        }
      }
    }
    & tbody {
      & tr {
        height: 54px;
        & td {
          font-family: 'Open Sans';
          font-size: 16px;
          line-height: 26px;
          color: #1d1d1d;
          text-align: center;
          white-space: nowrap;
          padding: 0 15px;
          & a {
            color: #1d1d1d;
            display: block;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

<template>
  <section class="section">
    <div class="custom-container">
      <header class="project__header header">
        <div class="header__left">
          <ArrowGoBack :back-route-path="backRoutePath" />
          <span class="project__title">
            {{ staticText.project.titleProject[actualLang.index] }}
            {{ project.id }}
          </span>
        </div>
        <div class="header__right specifications">
          <div class="specifications__title">
            {{ staticText.project.titleSpecification[actualLang.index] }}
          </div>
          <ul class="specifications__list">
            <li class="specifications__item">
              <a
                class="specifications__link"
                @click.prevent="
                  routeSpecifications(
                    `${baseDomain}/project/pdf-full/${project.id}?`,
                  )
                "
              >
                <span class="icon-pdf-icon specifications__img"></span>
                <span>
                  {{
                    staticText.project.titleSpecifications[1].title[
                      actualLang.index
                    ]
                  }}
                </span>
              </a>
            </li>

            <li class="specifications__item">
              <a
                class="specifications__link"
                @click.prevent="
                  routeSpecifications(
                    `${baseDomain}/project/pdf-min/${project.id}?`,
                  )
                "
              >
                <span class="icon-pdf-icon specifications__img"></span>
                <span>
                  {{
                    staticText.project.titleSpecifications[2].title[
                      actualLang.index
                    ]
                  }}
                </span>
              </a>
            </li>

            <li class="specifications__item">
              <a
                class="specifications__link"
                @click.prevent="
                  routeSpecifications(
                    `${baseDomain}/project/pdf-full/${project.id}?noprice=1&`,
                  )
                "
              >
                <span class="icon-pdf-icon specifications__img"></span>
                <span>
                  {{
                    staticText.project.titleSpecifications[3].title[
                      actualLang.index
                    ]
                  }}
                </span>
              </a>
            </li>

            <li class="specifications__item">
              <a
                class="specifications__link"
                @click.prevent="
                  routeSpecifications(
                    `${baseDomain}/project/pdf-min/${project.id}?noprice=1&`,
                  )
                "
              >
                <span class="icon-pdf-icon specifications__img"></span>
                <span>
                  {{
                    staticText.project.titleSpecifications[4].title[
                      actualLang.index
                    ]
                  }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <main class="main">
        <ul class="project__comments comments">
          <li class="comments__item">
            <div class="comments__title">
              {{ staticText.project.commentProject[actualLang.index] }}
            </div>
            <label class="comments__label">
              <input
                v-model="project.comment"
                type="text"
                class="comments__input input"
              />
              <span class="icon-icon-pencil comments__icon"></span>
            </label>
          </li>
          <li class="comments__item">
            <div class="comments__title">
              {{ staticText.project.titlePrintSpecification[actualLang.index] }}
            </div>
            <label class="comments__label">
              <input
                v-model="project.title"
                type="text"
                class="comments__input input"
              />
              <span class="icon-icon-pencil comments__icon"></span>
            </label>
          </li>
        </ul>

        <div class="project__wrapper">
          <table class="project__table table">
            <thead class="table__head">
              <tr>
                <th v-for="(th, index) in titlesTable" :key="index">
                  {{ th }}
                </th>
              </tr>
            </thead>
            <tbody class="table__body">
              <tr
                v-for="(product, index) in project.products"
                :key="product.id"
                class="product"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <router-link
                    :to="
                      `/profile/configurator/category/${product.category_id}/product/${product.id}`
                    "
                    class="product__name"
                  >
                    <div class="product__preview">
                      <img
                        class="product__img"
                        :src="`${baseDomainImg}${product.img}`"
                        alt="preview"
                      />
                    </div>
                    <div class="product__text">
                      {{ product.name }}
                    </div>
                  </router-link>
                </td>
                <td>{{ product.program }}</td>
                <td>{{ product.sale ? product.sale : product.price }}</td>
                <td>
                  <div class="product__amount">
                    <button
                      class="product__button product__button_dec"
                      @click="
                        product.amount =
                          product.amount > 0 ? --product.amount : 0
                      "
                    ></button>
                    <span class="product__text">{{ product.amount }}</span>
                    <button
                      class="product__button"
                      @click="product.amount++"
                    ></button>
                  </div>
                </td>
                <td class="product__discount">
                  <div
                    class="discount"
                    :class="{ discount_error: discountError[index] }"
                  >
                    <input
                      v-model="product.discount"
                      type="text"
                      class="product__input input input_form"
                      @keydown="keyDown"
                      @keyup="keyUp($event, index)"
                    />
                    <div class="discount__error">
                      {{ staticText.project.errorText[actualLang.index] }}
                    </div>
                  </div>
                </td>
                <td>{{ Math.round(calculateTotalPrice(product)) }}</td>
                <td v-if="margin">
                  {{ product.purchase * product.amount }}
                </td>
                <td v-if="margin">
                  {{ product.amount ? calculateProductMargin(product) : 0 }}
                </td>
                <td>
                  <div class="product__complectation">
                    <select v-model="product.complectation_id" class="select">
                      <option
                        v-for="(complectation, i) in complectations"
                        :key="i"
                        :value="complectation.id"
                        :selected="
                          complectation.id === product.complectation_id
                        "
                      >
                        {{ complectation.name[actualLang.index] }}
                      </option>
                    </select>
                    <check-box v-model="product.active" />
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="product__delete"
                    @click="deleteProduct(product.id)"
                  ></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="project__add add"
          @click.prevent="handlerAddProduct(project)"
        >
          <a href class="add__link">
            <span class="add__icon"></span>
            {{ staticText.project.titleAddProject[actualLang.index] }}
          </a>
        </div>
        <div class="project__price price">
          <table class="price__table">
            <thead>
              <tr>
                <th></th>
                <th>
                  <radio-button value="main" :name="radio" text="Основа" />
                </th>
                <th>
                  <radio-button
                    value="option1"
                    :name="radio"
                    text="Вариант 1"
                  />
                </th>
                <th>
                  <radio-button
                    value="option2"
                    :name="radio"
                    text="Вариант 2"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ staticText.project.titleSum[actualLang.index] }}</td>
                <td>{{ sumProject.main }} {{ currency.ua }}</td>
                <td>{{ sumProject.option1 }} {{ currency.ua }}</td>
                <td>{{ sumProject.option2 }} {{ currency.ua }}</td>
              </tr>
              <tr>
                <td>
                  {{ staticText.project.titleDiscount[actualLang.index] }}
                </td>
                <td>
                  <div class="price__discount">
                    <input
                      :value="sumProject.mainDiscount"
                      type="text"
                      class="price__input input input_form"
                      :readonly="true"
                    />
                  </div>
                </td>
                <td>
                  <div class="price__discount">
                    <input
                      :value="sumProject.option1Discount"
                      type="text"
                      class="price__input input input_form"
                      :readonly="true"
                    />
                  </div>
                </td>
                <td>
                  <div class="price__discount">
                    <input
                      :value="sumProject.option2Discount"
                      type="text"
                      class="price__input input input_form"
                      :readonly="true"
                    />
                  </div>
                </td>
              </tr>
              <tr v-if="margin">
                <td>
                  {{ staticText.project.titlePurchase[actualLang.index] }}
                </td>
                <td>{{ sumProject.mainPurchase }} {{ currency.ua }}</td>
                <td>{{ sumProject.option1Purchase }} {{ currency.ua }}</td>
                <td>{{ sumProject.option2Purchase }} {{ currency.ua }}</td>
              </tr>
              <tr v-if="margin">
                <td>{{ staticText.project.titleMargin[actualLang.index] }}</td>
                <td>{{ sumProject.mainMargin }} %</td>
                <td>{{ sumProject.option1Margin }} %</td>
                <td>{{ sumProject.option2Margin }} %</td>
              </tr>
              <tr>
                <td>
                  <span class="price__text">
                    {{ staticText.project.titleTotalProject[actualLang.index] }}
                  </span>
                </td>
                <td>{{ sumProject.mainWithDiscount }} {{ currency.ua }}</td>
                <td>{{ sumProject.option1WithDiscount }} {{ currency.ua }}</td>
                <td>{{ sumProject.option2WithDiscount }} {{ currency.ua }}</td>
              </tr>
            </tbody>
          </table>
          <div class="project__change">
            <button
              v-if="margin"
              type="button"
              class="project__button"
              @click="$store.commit('projects/SET_MARGIN', false)"
            >
              {{ staticText.project.titleButtonWithMargin[actualLang.index] }}
            </button>
            <button
              v-if="!margin"
              type="button"
              class="project__button"
              @click.prevent="statusWarningOpenMargin = true"
            >
              {{
                staticText.project.titleButtonWithoutMargin[actualLang.index]
              }}
            </button>
          </div>
        </div>
        <div class="project__total total">
          <table class="total__table">
            <tbody>
              <tr>
                <td>
                  {{ staticText.project.titleDelivery[actualLang.index] }}
                </td>
                <td>
                  <select
                    v-model="project.delivery_id"
                    class="select select_delivery"
                  >
                    <option
                      v-for="delivery in delivery"
                      :key="delivery.id"
                      :value="delivery.id"
                      :selected="delivery.id === project.delivery_id"
                    >
                      {{ delivery.name[actualLang.index] }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  {{ staticText.project.titleConnection[actualLang.index] }}
                </td>
                <td>
                  <div class="total__delivery">
                    <input
                      v-model="count"
                      type="text"
                      class="total__input input input_form"
                      @keydown="keyDown"
                      @keyup="keyUpConnection($event)"
                    />
                    <span class="total__text">
                      {{ staticText.project.titleCount[actualLang.index] }}
                    </span>
                    <span class="total__icon"></span>
                    <span class="total__text">
                      {{ PRICE_CONNECTION_PRODUCT }} {{ currency.ua }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{ staticText.project.titleTotal[actualLang.index] }}</td>
                <td>
                  {{
                    sumProject.totalWithDiscount +
                      count * PRICE_CONNECTION_PRODUCT
                  }}
                  {{ currency.ua }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <form class="project__form form">
        <div class="form__title">
          {{ staticText.project.titleProjectOrder[actualLang.index] }}
          {{ project.id }}
        </div>
        <div class="form__row">
          <span class="form__subtitle">
            {{ staticText.project.titleProjectClientName[actualLang.index] }}
            <span>*</span>
          </span>
          <input
            v-model="projectForm.name"
            type="text"
            class="form__input input"
          />
        </div>
        <div class="form__row">
          <span class="form__subtitle">
            {{ staticText.project.titleProjectClientPhone[actualLang.index] }}
            <span>*</span>
          </span>
          <TheMask
            v-model="projectForm.phone"
            class="form__input input"
            mask="+38 (0##) ### ## ##"
            type="tel"
            placeholder="+38 (050) 050 50 50"
            required
          />
        </div>
        <div class="form__row">
          <span class="form__subtitle">
            {{ staticText.project.titleProjectClientEmail[actualLang.index] }}
            <span>*</span>
          </span>
          <input
            v-model="projectForm.email"
            type="text"
            class="form__input input"
          />
        </div>
        <div class="form__row form__calendar">
          <span class="form__subtitle">
            {{ staticText.project.titleProjectOrderDate[actualLang.index] }}
            <span>*</span>
          </span>
          <div class="form__date">
            <input
              v-model="projectForm.date"
              type="text"
              placeholder="ДД.ММ.ГГГГ"
              class="form__input form__input_date input"
              :readonly="true"
            />
            <button
              type="button"
              class="form__button-date icon-calendar-icon"
              @click.stop="showPicker = !showPicker"
            ></button>

            <span v-if="project.order.date" class="message">
              {{ messageProjectOrderDate }}
            </span>
            <v-date-picker
              v-if="showPicker"
              ref="picker"
              v-model="picker"
              :show-current="true"
              :allowed-dates="allowedDatesDelivery"
              color="#A12C3A"
              locale="ru"
              first-day-of-week="1"
              @input="formatDate"
              @change="closeDatePicker"
            >
            </v-date-picker>
          </div>
          <span class="form__desc">
            {{
              staticProject.descProjectOrderDate(currency.ua)[actualLang.index]
            }}
          </span>
        </div>
        <div class="form__row form__delivery">
          <div class="form__subtitle">
            {{ staticText.project.titleProjectDelivery[actualLang.index] }}
            <span>*</span> /
            <router-link to="/delivery" class="link">
              {{
                staticText.project.titleProjectDeliveryLink[actualLang.index]
              }}
            </router-link>
          </div>
          <div class="form__date">
            <input
              :readonly="true"
              :value="
                Number(project.delivery_id) === 1
                  ? staticText.delivery[1][actualLang.index]
                  : Number(project.delivery_id) === 2
                  ? staticText.delivery[2][actualLang.index]
                  : staticText.delivery[3][actualLang.index]
              "
              type="text"
              class="form__input input"
            />
            <span
              v-if="
                project.delivery_id ===
                  delivery_id('Доставка на склад покупателя') ||
                  (project.delivery_id ===
                    delivery_id('Доставка до складу покупця') &&
                    sumProject.totalWithDiscount > 50000)
              "
              class="message"
            >
              {{ staticText.text.delivery[1][actualLang.index] }}
            </span>
            <span
              v-if="
                project.delivery_id ===
                  delivery_id('Доставка на склад покупателя') ||
                  (project.delivery_id ===
                    delivery_id('Доставка до складу покупця') &&
                    sumProject.totalWithDiscount <= 50000)
              "
              class="message"
            >
              {{ staticText.text.delivery[2][actualLang.index] }} 250 грн
            </span>
          </div>
        </div>
        <div
          v-if="
            project.delivery_id === delivery_id('Доставка Новой Почтой') ||
              project.delivery_id === delivery_id('Доставка Новою Поштою')
          "
          class="form__row"
        >
          <span class="form__subtitle">
            {{ staticText.project.titleCity[actualLang.index] }}
          </span>
          <input v-model="project.city" type="text" class="form__input input" />
        </div>
        <div
          v-if="
            project.delivery_id === delivery_id('Доставка Новой Почтой') ||
              project.delivery_id === delivery_id('Доставка Новою Поштою')
          "
          class="form__row"
        >
          <span class="form__subtitle">
            {{ staticText.project.titlePostcode[actualLang.index] }}
          </span>
          <input
            v-model="project.postcode"
            type="text"
            class="form__input input"
          />
        </div>
        <div class="form__row">
          <span class="form__subtitle">
            {{ staticText.project.titleProjectOrderComment[actualLang.index] }}
          </span>
          <textarea
            v-model="project.order.comment"
            rows="6"
            class="form__textarea"
          ></textarea>
        </div>
        <p class="error-validate" v-if="formErrors.length">
          <b>{{ staticText.titles.error[actualLang.index] }}</b>
        </p>
        <div class="form__row form__row_buttons">
          <button
            type="button"
            :class="{ disable: project.is_order }"
            class="form__button buttons"
            @click.self.stop="dropdownActive = !dropdownActive"
          >
            {{ staticText.project.titleProjectButtonSave[actualLang.index] }}
            <ul
              class="buttons__dropdown dropdown"
              :class="{ dropdown_active: dropdownActive }"
            >
              <li class="dropdown__item">
                <button
                  type="button"
                  class="form__btn"
                  @click="handlerSaveBtn('project')"
                >
                  {{
                    staticText.project.titleProjectButtonSaveChanges[
                      actualLang.index
                    ]
                  }}
                </button>
              </li>
              <li class="dropdown__item">
                <button
                  type="button"
                  class="form__btn"
                  @click="handlerSaveBtn('project', true)"
                >
                  {{
                    staticText.project.titleProjectButtonSaveNewProject[
                      actualLang.index
                    ]
                  }}
                </button>
              </li>
            </ul>
          </button>
          <button
            type="button"
            :class="{ disable: project.is_order }"
            class="form__button"
            @click="handlerWarningPopup"
          >
            {{
              staticText.project.titleProjectButtonCheckout[actualLang.index]
            }}
          </button>
        </div>
        <div class="form__row">
          <span class="form__text">
            {{ staticText.project.titleProjectOrderDesc[actualLang.index] }}
          </span>
        </div>
      </form>
    </div>

    <v-dialog v-model="statusWarningOpenMargin" max-width="520px">
      <div class="module__thanks">
        <span
          class="module__enter-client-close"
          @click.prevent="statusWarningOpenMargin = false"
        ></span>
        <div class="module__thanks-inner">
          <div class="module__thanks-title">
            {{ staticText.popups.popupTitle[actualLang.index] }}
          </div>
          <div class="models_add__popup">
            <a @click.stop="handlerCheckMargin">
              {{ staticText.popups.popupTextYes[actualLang.index] }}
            </a>
            <a @click.prevent="statusWarningOpenMargin = false">
              {{ staticText.popups.popupTextNo[actualLang.index] }}
            </a>
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="statusWarningSavePopup" max-width="520px">
      <div class="module__thanks">
        <span
          class="module__enter-client-close"
          @click.prevent="statusWarningSavePopup = false"
        ></span>
        <div class="module__thanks-inner">
          <div class="module__thanks-title">
            {{ staticText.text[2][actualLang.index] }}
          </div>
          <div class="models_add__popup">
            <a @click.stop="handlerSaveBtn('project/order')">
              {{ staticText.btns[10][actualLang.index] }}
            </a>
            <a @click.prevent="statusWarningSavePopup = false">
              {{ staticText.btns[9][actualLang.index] }}
            </a>
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text> </v-card-text>

        <v-card-text>
          {{ popupText }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ staticText.btns[1][actualLang.index] }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { TheMask } from 'vue-the-mask';
import { store } from '../store';
import { staticText } from '../i18n';
import { baseDomain, baseDomainImg } from '../constans';

import CheckBox from '../components/CheckBox.vue';
import RadioButton from '../components/RadioButton.vue';
import ArrowGoBack from '../components/ArrowGoBack.vue';

export default {
  name: 'Project',
  components: {
    CheckBox,
    RadioButton,
    ArrowGoBack,
    TheMask,
  },
  data() {
    return {
      backRoutePath: '/profile/projects',
      dialog: false,
      popupText: '',
      PRICE_CONNECTION_PRODUCT: 200,
      count: 0,
      showPicker: false,
      picker: '',
      dropdownActive: false,
      discountError: [],
      radio: {
        name: 'main',
      },
      staticText,
      formErrors: [],
      statusWarningSavePopup: false,
      statusWarningOpenMargin: false,
      token: JSON.parse(localStorage.alcotecUserInfo).user.token,
      baseDomain,
      baseDomainImg,
    };
  },
  computed: {
    ...mapState({
      currency: (state) => state.settings.currency,
      project: (state) => state.projects.project,
      staticProject: (state) => state.projects.staticProject,
      margin: (state) => state.projects.margin,
      complectations: (state) => state.projects.complectations,
      delivery: (state) => state.projects.delivery,
      actualLang: (state) => state.settings.actualLang,
      profileInfo: (state) => state.profiles.profileInfo,
    }),
    titlesTable() {
      return this.staticProject
        .titlesTable(this.currency.ua)
        [this.actualLang.index].filter((title) => {
          if (
            title.toLowerCase().indexOf('маржа') !== -1 ||
            title.toLowerCase().indexOf('закупка') !== -1 ||
            title.toLowerCase().indexOf('закупівля') !== -1
          ) {
            if (this.margin) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        });
    },
    date14() {
      let date;

      if (this.project.order.date) {
        const array = this.project.order.date.split('.');
        const newDate = [];

        newDate.push(array[1]);
        newDate.push(array[0]);
        newDate.push(array[2]);
        date = newDate.join('.');
      }

      const currentDate = this.picker ? new Date(this.picker) : new Date(date);

      currentDate.setDate(currentDate.getDate() + 14);

      const DD =
        parseInt(currentDate.getDate(), 10) < 10
          ? `0${currentDate.getDate() + 1}`
          : currentDate.getDate() + 1;
      const MM =
        parseInt(currentDate.getMonth(), 10) + 1 < 10
          ? `0${parseInt(currentDate.getMonth(), 10) + 1}`
          : parseInt(currentDate.getMonth(), 10) + 1;
      const YYYY = currentDate.getFullYear();

      return `${DD - 1}.${MM}.${YYYY}`;
    },
    sumProject() {
      let complectation = {
        main: 0,
        option1: 0,
        option2: 0,
        total: 0,
        mainWithDiscount: 0,
        option1WithDiscount: 0,
        option2WithDiscount: 0,
        totalWithDiscount: 0,
        mainDiscount: 0,
        option1Discount: 0,
        option2Discount: 0,
        mainPurchase: 0,
        option1Purchase: 0,
        option2Purchase: 0,
        mainMargin: 0,
        option1Margin: 0,
        option2Margin: 0,
      };

      complectation = this.project.products.reduce((prev, product) => {
        if (product.active) {
          const totalProductPrice =
            product.amount * (product.sale ? product.sale : product.price);
          const totalProductPriceWithDiscount = this.calculateTotalPrice(
            product,
          );

          this.calculateProductMargin(product);

          const comp =
            this.complectations.find(
              (c) => +c.id === +product.complectation_id,
            ) || {};

          switch (comp.name && comp.name[this.actualLang.index]) {
            case 'Вариант 1':
            case 'Варіант 1':
              prev.option1 += totalProductPrice;
              prev.option1WithDiscount += totalProductPriceWithDiscount;
              prev.option1Purchase += product.purchase * product.amount;
              break;
            case 'Вариант 2':
            case 'Варіант 2':
              prev.option2 += totalProductPrice;
              prev.option2WithDiscount += totalProductPriceWithDiscount;
              prev.option2Purchase += product.purchase * product.amount;
              break;
            default:
              prev.main += totalProductPrice;
              prev.mainWithDiscount += totalProductPriceWithDiscount;
              prev.mainPurchase += product.purchase * product.amount;
              break;
          }
        }

        return prev;
      }, complectation);

      complectation.option1 = complectation.main + complectation.option1;
      complectation.option2 = complectation.main + complectation.option2;

      complectation.option1WithDiscount = Math.round(
        complectation.mainWithDiscount + complectation.option1WithDiscount,
      );
      complectation.option2WithDiscount = Math.round(
        complectation.mainWithDiscount + complectation.option2WithDiscount,
      );
      complectation.mainWithDiscount = Math.round(
        complectation.mainWithDiscount,
      );

      complectation.option1Purchase =
        complectation.mainPurchase + complectation.option1Purchase;
      complectation.option2Purchase =
        complectation.mainPurchase + complectation.option2Purchase;

      switch (this.radio.name) {
        case 'option1':
          complectation.total = complectation.option1;
          complectation.totalWithDiscount = complectation.option1WithDiscount;
          break;
        case 'option2':
          complectation.total = complectation.option2;
          complectation.totalWithDiscount = complectation.option2WithDiscount;
          break;
        default:
          complectation.total = complectation.main;
          complectation.totalWithDiscount = complectation.mainWithDiscount;
          break;
      }

      // Расчет общей скидки
      complectation.mainDiscount =
        complectation.main === 0
          ? 0
          : (
              ((complectation.main - complectation.mainWithDiscount) * 100) /
              complectation.main
            ).toFixed(1);
      complectation.option1Discount =
        complectation.option1 === 0
          ? 0
          : (
              ((complectation.option1 - complectation.option1WithDiscount) *
                100) /
              complectation.option1
            ).toFixed(1);
      complectation.option2Discount =
        complectation.option2 === 0
          ? 0
          : (
              ((complectation.option2 - complectation.option2WithDiscount) *
                100) /
              complectation.option2
            ).toFixed(1);

      // Расчет общей маржи
      complectation.mainMargin =
        complectation.mainWithDiscount === 0
          ? 0
          : (
              ((complectation.mainWithDiscount - complectation.mainPurchase) /
                complectation.mainWithDiscount) *
              100
            ).toFixed(2);
      complectation.option1Margin =
        complectation.option1WithDiscount === 0
          ? 0
          : (
              ((complectation.option1WithDiscount -
                complectation.option1Purchase) /
                complectation.option1WithDiscount) *
              100
            ).toFixed(2);
      complectation.option2Margin =
        complectation.option2WithDiscount === 0
          ? 0
          : (
              ((complectation.option2WithDiscount -
                complectation.option2Purchase) /
                complectation.option2WithDiscount) *
              100
            ).toFixed(2);

      return complectation;
    },
    messageProjectOrderDate() {
      return this.staticProject.messageProjectOrderDate(
        this.date14,
        this.project.order.date,
      )[this.actualLang.index];
    },
    projectForm() {
      return {
        phone: this.project.client.phone || this.profileInfo.phone,
        email: this.project.client.email || this.profileInfo.email,
        name: this.project.client.name || this.profileInfo.partner,
        date: this.project.order.date,
      };
    },
  },
  created() {
    this.$store.dispatch('projects/getComplectations');
    this.$store.dispatch('projects/getDelivery');

    this.$store.dispatch('profiles/getInfoProfile', {
      cb: () => {},
    });
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  destroyed() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    handlerCheckMargin() {
      this.$store.commit('projects/SET_MARGIN', true);
      this.statusWarningOpenMargin = false;
    },
    routeSpecifications(path) {
      this.$store.dispatch('profiles/getInfoProfile', {
        cb: () => {
          const newToken =
            localStorage.alcotecUserInfo &&
            JSON.parse(localStorage.alcotecUserInfo).user.token;

          const pathWithToken = `${path}auth-token=${newToken}`;

          window.open(pathWithToken, '_blank');
        },
      });
    },
    allowedDatesDelivery(val) {
      const mounth =
        parseInt(val.split('-')[1], 10) >= new Date().getMonth() + 1;
      const nextMounth =
        parseInt(val.split('-')[1], 10) > new Date().getMonth() + 1;
      const days = parseInt(val.split('-')[2], 10) >= new Date().getDate();

      if (!mounth) {
        return false;
      } else if (mounth && nextMounth) {
        return true;
      } else {
        return days;
      }
    },
    handlerWarningPopup() {
      if (this.project && this.project.is_order) {
        this.popupText = {
          ru: 'Вы не можете редактировать данный заказ',
          ua: 'Ви не можете редагувати дане замовлення',
        }[this.actualLang.index];
        this.dialog = true;

        return;
      } else if (!this.checkError() && this.validationForm()) {
        this.statusWarningSavePopup = !this.statusWarningSavePopup;
      }
    },
    validationForm() {
      this.formErrors = [];

      if (
        this.projectForm.phone &&
        this.projectForm.name &&
        this.projectForm.email &&
        this.projectForm.date
      ) {
        return true;
      }

      if (!this.projectForm.phone) {
        this.formErrors.push('Телефон.');
      } else if (!this.projectForm.name) {
        this.formErrors.push('Покупатель.');
      } else if (!this.projectForm.email) {
        this.formErrors.push('Ваша электронная почта.');
      } else if (!this.projectForm.date) {
        this.formErrors.push('Заказ на дату.');
      }

      return false;
    },
    closeDatePicker() {
      this.showPicker = false;
    },
    delivery_id(name) {
      const delivery = this.delivery.find(
        (d) => d.name[this.actualLang.index] === name,
      );

      return delivery && delivery.id;
    },
    parseProject(deleteId = false) {
      const parseProducts = this.project.products.map((e) => {
        return {
          id: e.id,
          priceUAH: e.price,
          sale: e.sale ? e.sale : 0,
          count: e.amount,
          discount: e.discount,
          complectation_id: e.complectation_id,
          purchase: e.purchase,
        };
      });

      let withOutSomeField;

      if (deleteId) {
        withOutSomeField = ({ products, id, ...rest }) => rest;
      } else {
        withOutSomeField = ({ products, ...rest }) => rest;
      }

      const parseProject = withOutSomeField(this.project);

      parseProject.products = parseProducts;

      if (!this.projectForm.phone.includes('+')) {
        const slicePhone = `+380${this.projectForm.phone}`;

        this.projectForm.phone = slicePhone;
      }

      parseProject.client = this.projectForm;

      return parseProject;
    },
    handlerSaveBtn(url, deleteId = false) {
      if (this.project && this.project.is_order) {
        this.popupText = {
          ru: 'Вы не можете редактировать данный заказ',
          ua: 'Ви не можете редагувати дане замовлення',
        }[this.actualLang.index];
        this.dialog = true;

        return;
      } else if (!this.checkError() && this.validationForm()) {
        this.project.price =
          this.sumProject.totalWithDiscount +
          this.count * this.PRICE_CONNECTION_PRODUCT;
        this.$store.commit('basket/SET_POPUP_IS_LOADING');
        const { token } = JSON.parse(localStorage.alcotecUserInfo).user;

        this.$store.dispatch('projects/sendingDataProject', {
          url,
          token,
          project: this.parseProject(deleteId),
          cb: (data) => {
            if (data.success) {
              this.popupText = data.text;
              this.$router.push('/profile/projects');
              this.$store.commit('basket/SET_POPUP_IS_LOADING');
            } else {
              this.popupText = data.text;
              this.$store.commit('basket/SET_POPUP_IS_LOADING');
              this.dialog = true;
            }
          },
        });
      }
    },
    checkError() {
      let error = false;

      this.discountError.forEach((e) => {
        if (e) {
          error = true;
        }
      });

      return error;
    },
    formatDate(value) {
      const [YYYY, MM, DD] = value.split('-');

      this.project.order.date = `${DD}.${MM}.${YYYY}`;
    },
    calculateProductMargin(product) {
      const productDiscount = isNaN(parseInt(product.discount, 10))
        ? 0
        : parseInt(product.discount, 10);

      const priceWithDiscount =
        ((product.sale ? product.sale : product.price) *
          (100 - productDiscount)) /
        100;

      const margin =
        ((priceWithDiscount - product.purchase) / priceWithDiscount) * 100;

      return margin.toFixed(2);
    },
    calculateTotalPrice(product) {
      // eslint-disable-next-line no-restricted-globals
      const productDiscount = isNaN(parseInt(product.discount, 10))
        ? 0
        : parseInt(product.discount, 10);

      const productPrice =
        (product.sale ? product.sale : product.price) -
        ((product.sale ? product.sale : product.price) * productDiscount) / 100;

      return product.amount * productPrice;
    },
    deleteProduct(id) {
      store.commit('projects/DELETE_PRODUCT', id);
    },
    closeDropdown(e) {
      this.dropdownActive = false;
      if (
        this.$refs.picker &&
        e.target.closest('.v-picker') !== this.$refs.picker.$el
      ) {
        this.showPicker = false;
      }
    },
    filterInput(e, regexp) {
      if (e.target.tagName === 'INPUT') {
        const code = e.keyCode;

        if (code < 32 || e.ctrlKey || e.altKey) return true;
        const char = String.fromCharCode(
          code >= 96 && code <= 105 ? code - 48 : code,
        );

        if (!regexp.test(char)) return false;
      }

      return true;
    },
    keyDown(e) {
      if (!this.filterInput(e, /\d/)) {
        e.preventDefault();
      }
    },
    keyUp(e, i) {
      e.target.value =
        e.target.value === '' ? '' : parseInt(e.target.value, 10);
      if (e.target.value > 20) {
        this.discountError[i] = true;
        this.discountError.reverse().reverse();
      } else {
        this.discountError[i] = false;
        this.discountError.reverse().reverse();
      }
    },
    keyUpConnection(e) {
      e.target.value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
      this.count =
        e.target.value > this.project.products.length
          ? this.project.products.length
          : e.target.value;
    },
    handlerAddProduct(project) {
      this.$store.commit('basket/SET_BASKET_PROJECT', project);
      this.$store.commit('basket/SET_TOTAL_PRICE', project);
      this.$router.push('/profile/configurator');
    },
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('projects/getProject', {
      id: to.params.id,
      cb: (status) => {
        if (status) {
          next((vm) => {
            vm.backRoutePath = from.path;
          });
        } else {
          next('/404-error');
        }
      },
    });
  },
};
</script>
<style lang="scss" scoped>
.models_add__popup {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  & a {
    transition: all 0.4s;
    font-family: 'MagistralC';
    font-weight: bold;
    text-align: center;
    max-width: 140px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    line-height: 15px;
    color: #a12c3a;
    background-color: transparent;
    border: 1px solid #a12c3a;
    padding: 12px 22px 10px 22px;
    margin-right: 7.5px;

    &:hover {
      background-color: $black;
      color: $white;
      border: 1px solid $black;
    }
  }
  & a:last-child {
    margin-left: 7.5px;
    margin-right: 0px;
  }
}
.error-validate {
  color: red;
  font-family: 'MagistralC';
  font-weight: bold;
  font-size: 17px;
  padding-bottom: 20px;
  text-align: center;
}
.section {
  background-color: #fff;
  padding-top: 40px;
  padding-bottom: 88px;
  display: flex;
  justify-content: center;
}
.project {
  &__title {
    font-family: 'MagistralC';
    font-weight: bold;
    font-size: 32px;
    line-height: 37px;
    letter-spacing: 0.02em;
    color: $black;
  }
  &__header {
    margin-bottom: 40px;
  }
  &__comments {
    margin-bottom: 40px;
  }
  &__wrapper {
    position: relative;
    margin-bottom: 46px;
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
    & .project__table {
      max-width: 100%;
      width: 100%;
    }
  }
  &__add {
    margin-bottom: 36px;
    padding-left: 6px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__button {
    border: 1px solid $dark_gray;
    border-radius: 4px;
    padding: 12px 24px;
    font-family: 'MagistralC';
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background-color: #262626;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: #262626;
    }
  }
  &__price {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 32px;
    margin-bottom: 22px;
  }
  &__change {
    display: flex;
    justify-content: flex-end;
  }
  &__total {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 22px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 48px;
  }
}
.product {
  &__name {
    display: inline-flex;
    align-items: center;
  }
  &__preview {
    width: 80px;
    height: 75px;
    max-width: 80px;
    max-height: 75px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__img {
    max-width: 80px;
    max-height: 75px;
  }
  &__text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &__button {
    width: 24px;
    height: 24px;
    border: 1px solid $black;
    position: relative;
    margin-left: 14px;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 2px;
      width: 10px;
      background-color: $black;
      transform: translate(-50%, -50%);
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 10px;
      width: 2px;
      background-color: $black;
      transform: translate(-50%, -50%);
    }
    &_dec {
      margin-left: 0;
      margin-right: 14px;
      &:after {
        content: none;
      }
    }
    &:hover {
      background-color: $dark_gray;
    }
  }
  &__amount {
    display: inline-flex;
    align-items: center;
  }
  &__input {
    width: 63px;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
  }
  &__delete {
    margin-left: 18px;
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
  &__complectation {
    display: flex;
    align-items: center;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__left {
    padding-right: 15px;
    display: flex;
  }
}
.specifications {
  display: flex;
  align-items: center;
  &__title {
    margin-right: 40px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: $dark_gray;
  }
  &__list {
    display: flex;
    align-items: center;
  }
  &__item {
    margin-right: 32px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__link {
    display: flex;
    align-items: center;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1d1d1d;
    font-weight: bold;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  &__img {
    margin-right: 10px;
  }
}
.input {
  border: 1px solid $dark_gray;
  border-radius: 4px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: $black;
  padding: 17px;
  &_form {
    font-size: 14px;
    line-height: 19px;
    padding: 8px;
  }
}
.comments {
  display: flex;
  &__item {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    text-transform: uppercase;
    color: $dark_gray;
    margin-bottom: 8px;
    padding-left: 17px;
  }
  &__label {
    position: relative;
  }
  &__input {
    padding-right: 54px;
    max-width: 380px;
    width: 100%;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: 19px;
    transform: translateY(-50%);
  }
}
.table {
  border-collapse: collapse;
  color: $black;
  &__head {
    background: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
  }
  th {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    text-transform: uppercase;
    color: $black;
    padding: 25px;
  }
  td {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: $black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px 0;
    &:last-child {
      position: relative;
    }
    &:nth-child(2) {
      text-align: left;
      max-width: 150px;
    }
  }
}
.price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &__title {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  &__text {
    text-transform: uppercase;
  }
  &__discount {
    display: inline-flex;
    align-items: center;
  }
  &__button {
    border: 1px solid $dark_gray;
    border-radius: 4px;
    padding: 12px 24px;
    font-family: 'MagistralC';
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background-color: #fff;
    color: $dark_gray;
    font-weight: bold;
    &:hover {
      background-color: $dark_gray;
      color: #fff;
    }
  }
  &__input {
    width: 100px;
    margin-right: 10px;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
  }
  &__table {
    max-width: 700px;
    width: 100%;
    border-collapse: collapse;
    color: $black;
    margin-bottom: 22px;
    th {
      padding-top: 10px;
      padding-bottom: 10px;
      &:nth-child(2) {
        padding-left: 40px;
      }
    }
    td {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      text-align: left;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
      &:first-child {
        max-width: 290px;
        text-align: right;
      }
      &:nth-child(2) {
        padding-left: 40px;
        max-width: 160px;
      }
      &:nth-child(3) {
        max-width: 120px;
      }
      &:nth-child(4) {
        max-width: 100px;
        & input {
          margin-right: 0px;
        }
      }
    }
  }
}
.total {
  &__delivery {
    display: inline-flex;
    align-items: center;
  }
  &__text {
    white-space: nowrap;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__icon {
    display: block;
    border: none;
    outline: none;
    background-color: transparent;
    flex-shrink: 0;
    position: relative;
    width: 9px;
    height: 9px;
    &:after {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background-color: $dark_gray;
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
      background-color: $dark_gray;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    margin-right: 10px;
  }
  &__input {
    width: 63px;
    margin-right: 8px;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
  }
  &__table {
    border-collapse: collapse;
    color: $black;
    td {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      text-align: left;
      padding-left: 40px;
      padding-top: 10px;
      padding-bottom: 10px;
      &:first-child {
        text-align: right;
      }
    }
  }
}
.select {
  cursor: pointer;
  width: 100%;
  max-width: 118px;
  font-family: 'Open Sans';
  font-size: 14px;
  line-height: 19px;
  padding: 8px;
  margin: 0;
  margin-right: 10px;
  border: 1px solid $dark_gray;
  border-radius: 4px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url('../assets/img/projects/arrow-drop-down-24px.svg');
  background-repeat: no-repeat, repeat;
  background-position: right 0.1em top 50%, 0 0;
  background-color: transparent;
  &_delivery {
    width: 100%;
    max-width: 258px;
  }
}
.add {
  display: flex;
  .add__link {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: $main !important;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.16em;
    font-weight: bold;
  }
  &__icon {
    width: 14px;
    height: 14px;
    position: relative;
    margin-right: 29px;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      height: 2px;
      width: 14px;
      background-color: $main;
      transform: translateY(-50%);
    }
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      height: 14px;
      width: 2px;
      background-color: $main;
      transform: translateX(-50%);
    }
  }
}
.form {
  display: flex;
  flex-direction: column;
  max-width: 520px;
  width: 100%;
  &__title {
    font-family: 'MagistralC';
    font-weight: bold;
    font-size: 24px;
    line-height: 27px;
    letter-spacing: 0.02em;
    color: $black;
    margin-bottom: 32px;
  }
  &__row {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
      flex-direction: row;
    }
    &_buttons {
      flex-direction: row;
      align-items: center;
    }
  }
  &__text {
    font-style: normal;
    font-size: 16px;
    line-height: 26px;
  }
  &__subtitle {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    text-transform: uppercase;
    color: $dark_gray;
    padding-left: 17px;
    margin-bottom: 6px;
  }
  &__desc {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: $dark_gray;
    padding-left: 17px;
    margin-top: 8px;
  }
  &__date {
    position: relative;
  }
  &__input {
    width: 100%;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
    &_date {
      padding-right: 36px;
    }
  }
  &__button {
    border: 1px solid $main;
    border-radius: 4px;
    padding: 12px 24px;
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background-color: #fff;
    color: $main;
    font-weight: bold;
    &:first-child {
      margin-right: 40px;
      display: flex;
      align-items: center;
      &:after {
        content: '\e92e';
        font-family: 'icomoon';
        display: block;
        font-size: 10px;
        margin-left: 30px;
        margin-bottom: 3px;
        width: 10px;
        height: 10px;
        transition: all 0.2s;
      }
      &:hover:after {
        color: $white;
      }
      &:active {
        color: $white;
      }
    }
    &:last-child:hover {
      background-color: $main;
      color: #fff;
    }

    transition: all 0.3s;
    &:hover {
      background-color: $main;
      color: $white;
    }
    &:active {
      background-color: $main;
      color: $white;
    }
  }
  &__btn {
    font-family: 'MagistralC';
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $main;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
  &__button-date {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
  }
  &__textarea {
    border: 1px solid $dark_gray;
    border-radius: 4px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: $black;
    padding: 17px;
    resize: none;
    caret-color: #dcc488;
    &:focus {
      border: 1px solid #dcc488;
    }
  }
}
.buttons {
  position: relative;
  .dropdown {
    padding-left: 24px;
    box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.75);
  }
}
.dropdown {
  max-width: 308px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  position: absolute;
  background-color: #fff;
  top: calc(100% + 2px);
  left: -9999px;
  border-radius: 4px;
  z-index: 10;
  &__item {
    text-align: left;
    margin-bottom: 24px;
    &:last-child {
      text-align: left;
      margin-bottom: 0;
    }
  }
  &_active {
    left: 0;
  }
}
.message {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  position: absolute;
  white-space: nowrap;
  background-color: #000;
  top: 50%;
  transform: translateY(-50%);
  left: 108%;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  display: block;
  &:after {
    content: '';
    display: block;
    border-top: 11px solid transparent;
    border-right: 11px solid #000;
    border-bottom: 11px solid transparent;
    border-left: 0px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    right: 100%;
    top: 50%;
    margin-top: -11px;
  }
}

.icon-pdf-icon {
  font-size: 18px;
}
.icon-icon-pencil {
  font-size: 20px;
}
.icon-calendar-icon {
  font-size: 22px;
}
.discount {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &__error {
    color: $red;
    position: absolute;
    top: 100%;
    left: -9999px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  &_error {
    .input {
      border-color: $red;
      color: $red;
    }
    .discount__error {
      left: 50%;
    }
  }
}
.v-picker {
  position: absolute;
  top: 0;
  left: 102%;
  z-index: 1;
}
.form__row_buttons {
  justify-content: space-between;
}
.form__subtitle span {
  color: red;
}
.form__subtitle .link {
  color: $main;
}

.module__thanks-title {
  font-size: 18px;
  line-height: 20px;
}

.product__name {
  color: black;
}

.form__button.disable {
  border: 1px solid #fff;
  color: #fff;
  background-color: #c4c4c4;
  cursor: not-allowed;
  &:hover {
    border: 1px solid #fff;
    color: #fff;
    background-color: #c4c4c4;
  }
}

@media (max-width: 1399px) {
  .header__right {
    margin-top: 20px;
  }
}
@media (max-width: 1100px) {
  .message {
    white-space: normal;
    left: 8px;
    top: 85px;
    &:after {
      display: none;
    }
  }
  .form__calendar {
    margin-bottom: 57px;
    .message {
      top: 110px;
    }
  }
  .form__delivery {
    margin-bottom: 57px;
  }
}

@media (max-width: 920px) {
  .v-picker {
    top: 101%;
    left: 50%;
    transform: translateX(-50%);
  }
  .header__right {
    margin-left: auto;
  }
  .specifications__list {
    display: block;
  }
  .project__comments {
    justify-content: center;
  }
  .project__add {
    justify-content: center;
  }
  .project__total {
    justify-content: flex-start;
  }
  .price__table,
  .project__change {
    margin: 0 auto;
  }
  .price__table {
    max-width: 700px;
    width: 100%;
  }
  .total__table {
    margin: 0 auto;
  }
  .project__form {
    max-width: none;
  }
  .form__row_buttons {
    justify-content: space-between;
  }
}
@media (max-width: 604px) {
  .project__comments {
    flex-direction: column;
  }
  .comments__item {
    display: block;
    margin-right: 0px;
    &:first-child {
      margin-bottom: 20px;
    }
  }
  .comments__input {
    max-width: none;
    padding-right: 0px;
  }
}
@media (max-width: 520px) {
  .project__title {
    font-size: 24px;
  }
  .module__thanks .module__thanks-inner .module__thanks-title {
    font-size: 16px;
    padding-top: 0px;
    padding-bottom: 0px;
    line-height: 20px;
  }
  .models_add__popup a {
    padding: 10px 12px 10px 12px;
    margin-right: 7.5px;
    height: 37px;
    font-size: 13px;
  }
}
@media (max-width: 500px) {
  .form__calendar {
    margin-bottom: 75px;
    .message {
      top: 120px;
    }
  }
}
@media (max-width: 470px) {
  .form__row_buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
  .form__button:first-child {
    margin-right: 0px;
    margin-right: 5px;
  }
  .form__button:last-child {
    margin-left: 5px;
  }
}
@media (max-width: 460px) {
  .price {
    &__input {
      width: 60px;
      font-size: 10px;
    }
    &__table {
      th {
        &:nth-child(2) {
          padding-left: 10px;
        }
      }
      td {
        font-size: 10px;
        width: 15%;
        &:first-child {
          max-width: 40px;
          text-align: left;
        }
        &:nth-child(2) {
          padding-left: 10px;
        }
      }
    }
  }
  .total {
    &__input {
      font-size: 10px;
    }
    &__table {
      tr {
        td {
          &:first-child {
            padding-left: 0px;
          }
        }
      }
      td {
        font-size: 10px;
        text-align: left;
        padding-left: 10px;
        &:first-child {
          text-align: left;
        }
      }
    }
  }
  .select {
    cursor: pointer;
    font-size: 10px;
    &_delivery {
      max-width: 195px;
    }
  }
}
@media (max-width: 440px) {
  .form__row_buttons {
    flex-direction: column;
  }
  .form__button:first-child {
    margin-bottom: 10px;
    margin-right: 0px;
    width: 210px;
  }
  .form__button:last-child {
    margin-left: 0px;
  }
  .specifications__title {
    margin-right: 20px;
  }
}
@media (max-width: 412px) {
  .project__title,
  .form__title {
    font-size: 18px;
  }
  .comments__title {
    padding-left: 0px;
  }
  .form__subtitle {
    padding-left: 0px;
  }
  .form__desc {
    padding-left: 0px;
    font-size: 13px;
  }
  .form__text {
    text-align: center;
  }
  .link {
    color: $main;
    &:hover {
      text-decoration: underline;
    }
  }
  .message {
    left: 0;
  }
}
@media (max-width: 325px) {
  .form__calendar {
    .message {
      top: 135px;
    }
  }
}
</style>

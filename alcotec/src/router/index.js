import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Registration from '../views/Registration.vue';
import Profile from '../views/Profile.vue';
import Projects from '../views/Projects.vue';
import Orders from '../views/Orders.vue';
import Training from '../views/Training.vue';
import PersonalPromo from '../views/PersonalPromo.vue';
import Configurator from '../views/Configurator.vue';
import Edit from '../views/Edit.vue';
import Product from '../views/Product.vue';
import Catalog from '../views/Catalog.vue';
import Promo from '../views/Promo.vue';
import Brands from '../views/Brands.vue';
import Partners from '../views/Partners.vue';
import Vip from '../views/Vip.vue';
import Price from '../views/Price.vue';
import Delivery from '../views/Delivery.vue';
import Contacts from '../views/Contacts.vue';
import Contracts from '../views/Contracts.vue';
import PartnerPrograms from '../views/PartnerPrograms.vue';
import Services from '../views/Services.vue';
import News from '../views/News.vue';
import Career from '../views/Career.vue';
import AboutCompany from '../views/AboutCompany.vue';
import Project from '../views/Project.vue';
import CategoryProductItem from '../views/CategoryProductItem.vue';
import gateway from '../components/gateway.vue';
import Return from '../views/Return.vue';
import TermsPayment from '../views/TermsPayment.vue';
import ContractOffer from '../views/ContractOffer.vue';
import Comparison from '../views/Comparison.vue';
import InfoPromo from '../views/InfoPromo.vue';
import PageNotFound from '../views/PageNotFound.vue';

import { store } from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Регистрация',
          ua: 'Реєстрація',
        },
      },
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    redirect: { path: '/profile/projects' },
    meta: {
      breadCrumb: {
        name: {
          ru: 'Личный кабинет',
          ua: 'Особистий кабінет',
        },
      },
      requiresAuth: true,
    },
    children: [
      {
        path: 'projects',
        component: gateway,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Проекты',
              ua: 'Проекти',
            },
          },
        },
        children: [
          {
            path: '',
            component: Projects,
          },
          {
            path: 'project/:id',
            component: Project,
            meta: {
              breadCrumb: {
                name: {
                  ru: 'Карточка проекта',
                  ua: 'Картка проекту',
                },
              },
            },
          },
        ],
      },
      {
        path: 'orders',
        name: 'orders',
        component: Orders,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Заказы поставщику',
              ua: 'Замовлення постачальнику',
            },
          },
        },
      },
      {
        path: 'training',
        name: 'training',
        component: Training,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Обучение',
              ua: 'Навчання',
            },
          },
        },
      },
      {
        path: 'promo',
        name: 'personalPromo',
        component: PersonalPromo,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Персональные акции',
              ua: 'Персональні акції',
            },
          },
        },
      },
      {
        path: 'configurator',
        component: gateway,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Конфигуратор',
              ua: 'Конфігуратор',
            },
          },
        },
        children: [
          {
            path: '',
            component: Configurator,
          },
          {
            path: 'category/:categoryId',
            component: gateway,
            meta: {
              breadCrumb: {
                name: {
                  ru: 'Название подкатегории',
                  ua: 'Назва підкатегорії',
                },
                dynamic: true,
              },
            },
            children: [
              {
                path: '',
                component: CategoryProductItem,
              },
              {
                path: 'comparison',
                name: 'comparison',
                component: Comparison,
                meta: {
                  breadCrumb: {
                    name: {
                      ru: 'Сравнение товаров',
                      ua: 'Порівняння товарів',
                    },
                  },
                },
              },
              {
                path: 'product/:productId',
                component: Product,
                meta: {
                  breadCrumb: {
                    name: {
                      ru: 'Продукт',
                      ua: 'Продукт',
                    },
                    dynamic: true,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: 'edit',
        name: 'edit',
        component: Edit,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Редактирование',
              ua: 'Редагування',
            },
          },
        },
      },
    ],
  },
  {
    path: '/catalog',
    component: gateway,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Каталог',
          ua: 'Каталог',
        },
      },
    },
    children: [
      {
        path: '',
        component: Catalog,
      },
      {
        path: 'category/:categoryId',
        component: gateway,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Название подкатегории',
              ua: 'Назва підкатегорії',
            },
            dynamic: true,
          },
        },
        children: [
          {
            path: '',
            component: CategoryProductItem,
          },
          {
            path: 'product/:productId',
            name: 'product',
            component: Product,
            meta: {
              breadCrumb: {
                name: 'Продукт',
                dynamic: true,
              },
            },
          },
        ],
      },
    ],
  },
  {
    path: '/promo',
    component: gateway,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Акции',
          ua: 'Акції',
        },
      },
    },
    children: [
      {
        path: '',
        component: Promo,
      },
      {
        path: 'infoPromo/:id',
        name: 'infoPromo',
        component: InfoPromo,
        meta: {
          breadCrumb: {
            name: {
              ru: 'Персональные акции',
              ua: 'Персональні акції',
            },
            dynamic: true,
          },
        },
      },
    ],
  },
  {
    path: '/brands',
    name: 'brands',
    component: Brands,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Бренды',
          ua: 'Бренди',
        },
      },
    },
  },
  {
    path: '/partners',
    name: 'partners',
    component: Partners,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Партнеры',
          ua: 'Партнери',
        },
      },
    },
  },
  {
    path: '/vip',
    name: 'vip',
    component: Vip,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Vip-консалтинг',
          ua: 'Vip-консалтинг',
        },
      },
    },
  },
  {
    path: '/price',
    name: 'price',
    component: Price,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Прайс-листы',
          ua: 'Прайс-листи',
        },
      },
    },
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: Delivery,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Доставка',
          ua: 'Доставка',
        },
      },
    },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Контакты',
          ua: 'Контакти',
        },
      },
    },
  },
  {
    path: '/aboutCompany',
    name: 'aboutCompany',
    component: AboutCompany,
    meta: {
      breadCrumb: {
        name: {
          ru: 'О компании',
          ua: 'Про компанію',
        },
      },
    },
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Новости',
          ua: 'Новини',
        },
      },
    },
  },
  {
    path: '/return',
    name: 'return',
    component: Return,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Условия возврата',
          ua: 'Умови повернення',
        },
      },
    },
  },
  {
    path: '/termsPayment',
    name: 'termsPayment',
    component: TermsPayment,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Условия оплаты',
          ua: 'Умови оплати',
        },
      },
    },
  },
  {
    path: '/contractOffer',
    name: 'contractOffer',
    component: ContractOffer,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Условия оферты',
          ua: 'Договiр оферти',
        },
      },
    },
  },
  {
    path: '/career',
    name: 'career',
    component: Career,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Карьера с Alcotec',
          ua: 'Кар`ера з Alcotec',
        },
      },
    },
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Сервисы',
          ua: 'Сервіси',
        },
      },
    },
  },
  {
    path: '/partnerPrograms',
    name: 'partnerPrograms',
    component: PartnerPrograms,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Партнерские программы',
          ua: 'Партнерські програми',
        },
      },
    },
  },
  {
    path: '/contracts',
    name: 'contracts',
    component: Contracts,
    meta: {
      breadCrumb: {
        name: {
          ru: 'Договора сотрудничества',
          ua: 'Договори співпраці',
        },
      },
    },
  },
  {
    path: '*',
    component: PageNotFound,
    meta: {
      breadCrumb: {
        name: {
          ru: '404 ERROR',
          ua: '404 ERROR',
        },
      },
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path.includes('profile/projects') && to.hash) {
      const projects = document.querySelector('#project__card').clientHeight;

      return { x: 0, y: projects - 200 };
    }
    const el = document.querySelector('#sidebar-open-left');

    if (!el) {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeResolve((to, from, next) => {
  if (to.params.categoryId) {
    store.dispatch('profiles/getCategoryProjects', () => {
      if (to.params.productId) {
        store.dispatch('products/getProduct', {
          id: to.params.productId,
          cb() {
            next();
          },
          error() {
            next('/404-error');
          },
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (localStorage.alcotecUserInfo && Object.keys(localStorage.alcotecUserInfo)) {
    const user = JSON.parse(localStorage.alcotecUserInfo);

    store.commit('users/SET_LOGIN_USER', user);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу home
    if (!store.getters['users/isLoggedIn']) {
      const { categoryId, productId } = to.params;

      if (to.path === '/profile/configurator') {
        next('/catalog');
      } else if (productId) {
        next({
          path: `/catalog/category/${categoryId}/product/${productId}`,
          replace: true,
          query: to.query,
        });
      } else if (!productId && categoryId) {
        next({
          path: `/catalog/category/${categoryId}`,
          replace: true,
          query: to.query,
        });
      } else {
        next('/404-error');
      }
    } else {
      next();
    }
  } else {
    next(); // всегда так или иначе нужно вызвать next()!
  }
});

export default router;

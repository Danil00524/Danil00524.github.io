import React from 'react';

import SideBarCategoryBlock from './components/SideBarCategoryBlock';
import SideBarBlogBlock from './components/SideBarBlogBlock';
import ContactsBlock from "../../components/ContactsBlock";

import './Aside.scss';

const categories = [
  {
    id: 1,
    imgPath: require('../../img/sidebar-categories-item-1.jpg'),
    title: "Бани из клееного бруса",
    href: "/catalog",
    contentType: "Бани"
  },
  {
    id: 2,
    imgPath: require('../../img/sidebar-categories-item-2.svg'),
    title: "Дома из лиственницы",
    href: "/catalog",
    contentType: "Дома"
  },
  {
    id: 3,
    imgPath: require('../../img/sidebar-categories-item-3.svg'),
    title: "Беседки из сосны",
    href: "/catalog",
    contentType: "Беседки"
  },
];

const Aside = ({ articles }) => {
  if (articles) {
    const lastArticles = articles.slice(-3);

    return (
      <aside className="aside flex-shrink-0">
        <div className="aside-content">
          <section className="categories d-flex flex-column flex-sm-row flex-xl-column">
            {categories.map(elem => {
              return <SideBarCategoryBlock elem={elem} key={elem.id} />
            })}
          </section>
          <section className="blog">
            <h5 className="title title-md">Блог</h5>
            <div className="d-flex flex-column flex-sm-row flex-xl-column flex-wrap">
              {lastArticles.map(elem => {
                return <SideBarBlogBlock article={elem} key={elem.id} />
              })}
            </div>
          </section>
          <ContactsBlock titleSize='md' />
        </div>
      </aside>
    )
  } else {
    return null;
  }
};

export default Aside;

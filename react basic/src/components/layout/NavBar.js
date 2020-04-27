import React from 'react';
import {NavLink} from "react-router-dom";
import Search from "./header/Search";

const NavBar = ({inHeader = false, className = ''}) => {
  const navs = [
    {
      url: "/about-us",
      name: "О компании"
    },
    {
      url: "/services",
      name: "Услуги"
    },
    {
      url: "/catalog",
      name: "Проекты"
    },
    {
      url: "/blog",
      name: "Блог"
    },
    {
      url: "/contacts",
      name: "Контакты"
    },
  ];
  
  return (
      <nav className={`navbar position-relative ${className}`}>
        <ul className="nav-list">
          {navs.map((navItem, index) => {
            return (
                <li className="list-item" key={index}>
                  <NavLink
                      className="list-item-link"
                      activeClassName='active'
                      to={navItem.url}>
                    {navItem.name}
                  </NavLink>
                </li>);
          })}
        </ul>
        {inHeader ? <Search/> : ''}
      </nav>
  )
};

export default NavBar;

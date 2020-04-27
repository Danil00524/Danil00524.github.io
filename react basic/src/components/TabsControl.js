import React from "react";

import './scss/TabsControl.scss';

const TabsControl = ({tabsList = [], setContent, className, activeTabIndex = 0, theme}) => {

  const changeActiveClass = (e) => {
    document.querySelector('.tabs-control .list-item.active').classList.remove('active');
    e.target.classList.add('active');
    setContent(e.target.innerHTML);
  };

  return (
      <nav className={`tabs-control ${(className || '')} ${(theme || '')}`}>
        <ul className="control-list d-flex">
          {
            tabsList.map((item, index) => {
              return (
                  <li className={`list-item ${index === activeTabIndex ? 'active' : ''}`}
                      onClick={e => changeActiveClass(e)}
                      key={index}
                  >
                    {item}
                  </li>
              );
            })
          }
        </ul>
      </nav>
  );
};

export default TabsControl;

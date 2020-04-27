import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './Header.scss';

import MainLogo from "../MainLogo";
import NavBar from "../NavBar";
import Button from "../../Button";
import SvgSet from "../../../img/SvgSet";
import { slide as Menu } from 'react-burger-menu';
import {useBreakpoint} from "../../Breakpoints";
import SocialsBlock from "../SocialsBlock";


const Header = ({showButton, theme, isCustomContainer, className}) => {
  const breakpoints = useBreakpoint();
  
  const [isMobileMenuOpen, toggleMobileMenu] = useState(false);
  
  return (
    <>
      <header className={`header ${theme && !breakpoints.xl ? theme : ''} ${breakpoints.xl ? 'mobile' : ''} d-flex align-items-center flex-shrink-0 w-100 ${(className || '')}`}>
        <div className={`${isCustomContainer ? 'custom-container' : 'container'} d-flex align-items-center w-100`}>
          <div className="mobile-menu-wrapper d-block d-xl-none">
            <Menu
              customBurgerIcon={<SvgSet icon="burger"/>}
              customCrossIcon={ <SvgSet icon="close-mobile"/> }
              
            >
              <NavBar className="text-color-darkbrown" inHeader={false}/>
              <div className="mobile-bottom-info d-flex flex-column align-items-center mt-auto text-color-darkbrown">
                <a href="tel:88007503245" className="phone-number">8 800 750 32 45</a>
                <Button className="rounded stroked transparent black-text" text="Заказать звонок"/>
                <SocialsBlock className="black-icons"/>
              </div>
            </Menu>
          </div>
          
          <MainLogo/>
          <NavBar className="d-none d-xl-flex" inHeader={true}/>
          <Link className="header-link d-none d-xl-block" to="/catalog">
            {showButton ? <Button className={`rounded stroked transparent ${theme === 'white' ? 'white-text' : 'black-text'} slim`} text={'Выбрать проект'}/> : ''}
          </Link>
        </div>
      </header>
      </>
  )
};
export default Header;

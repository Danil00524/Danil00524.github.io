import React, {useState} from 'react';

import './Service.scss';

import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import InstagramSection from "../../components/InstagramSection";
import Articles from "../../containers/Articles";
import AdvantagesSection from "../../components/AdvantagesSection";
import ServiceHOC from './ServiceHOC'
import ServiceHeroSection from './components/ServiceHeroSection'
import ServicePageBackground from "./components/ServicePageBackground";

import {SideBarProvider} from "../../components/SideBarContext";
import Sidebar from "react-sidebar";
import CallButton from "../../components/CallButton";

const Service = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('sideBarContent');

  const state = {
    sidebarIsOpen,
    setSidebarIsOpen,
    sidebarContent,
    setSidebarContent
  };

  return (
      <>
        <Sidebar
            sidebar={sidebarContent}
            open={sidebarIsOpen}
            onSetOpen={setSidebarIsOpen}
            pullRight={true}
            rootClassName="sidebar-root"
            sidebarClassName="sidebar"
            contentClassName="sidebar-content"
            overlayClassName="sidebar-overlay"
        >
          <div className='service-page text-color-white bg-color-darkbrown position-relative'>
            <ServicePageBackground/>
            <Header theme="white" showButton={true}/>
            <ServiceHeroSection/>
            <SideBarProvider value={state}>
              <ServiceHOC/>
            </SideBarProvider>
            <Articles/>
            <InstagramSection/>
            <AdvantagesSection/>
            <Footer/>
          </div>
        </Sidebar>
        <CallButton/>
      </>
  )
};

export default Service;

import React from 'react';
import './components/ContactsPopup.scss';

import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import Subscription from "./components/Subscription";
import InstagramSection from "../../components/InstagramSection";
import AdvantagesSection from "../../components/AdvantagesSection";
import Map from "./components/Map"
import CallButton from "../../components/CallButton";


const ContactsPage = (props) => {
    const houseId = props.history.location.state;

    return (
        <div className="contacts-page">
            <Header theme={'black'} showButton={true}/>
            <Subscription houseId={houseId} />
            <Map />
            <InstagramSection />
            <AdvantagesSection />
            <Footer />
            <CallButton />
        </div>
    )
};

export default ContactsPage;

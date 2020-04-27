import React from 'react';
import './scss/ContactsBlock.scss'

const ContactsBlock = (props) => {
    return (
        <div className="contacts-block d-flex flex-column">
          <span className={`title title-${props.titleSize ? props.titleSize : 'lg'}`}>Контакты</span>
          <span className="address">Москва, ул. Островная 23,<br/> Гольф-Клуб, оф. 225</span>
          <a href="mailto:woodland@gmail.com" className="email">woodland@gmail.com</a>
          <a href="tel:88007503245" className="phone-number">8 800 750 32 45</a>
        </div>
    )
};

export default ContactsBlock;

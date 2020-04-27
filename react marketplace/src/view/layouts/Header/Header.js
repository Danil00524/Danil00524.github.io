import React from 'react'
import './styles.scss'

import {ReactComponent as Logo} from "../../../assets/logo/what_salon_log.svg";

export default function Header(props) {
    return (
        <header className={'logo-wrapper'}>
            <Logo />
        </header>
    )
}

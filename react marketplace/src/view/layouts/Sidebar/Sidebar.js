import React from 'react'
import './styles.scss'

export default function Sidebar(props) {
    return (
        <div className={'sidebar-controll-filter-group'}>{props.children}</div>
    )
}
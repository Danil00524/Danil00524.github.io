import React from 'react'
import './styles.scss'

export default function MapPlaceholder(props) {
    return (
        <div className={'map-placeholder'}>
            {props.children}
        </div>
    )
}
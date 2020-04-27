import React from 'react'
import DatePickerComponent from "react-datepicker";
import {ReactComponent as CalendarIcon} from "../../../../assets/icon/Calenar.svg";
import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'

function DatePicker({value, onChange, disabled}) {
    return (
        <div className={'input-wrapper-icon'}>
            <DatePickerComponent
                selected={value}
                onChange={onChange}
                disabled={disabled}
                className={'input-text-component input-text-component--datepicker'}
            />
            <div className={'icon-input-box'}>
                <CalendarIcon />
            </div>
        </div>
    )
}

export default DatePicker
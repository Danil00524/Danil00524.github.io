import React from 'react'
import {FilterContextProvider} from './FilterContextProvider'
//components
import FilterSalonByCategoryForm from './FilterSalonByCategoryForm'
import FilterSalonByCategoryList from "./FilterSalonByCategoryList";
import SalonsOnTheMap from "./SalonsOnTheMap";
//
import './styles.scss'

export default function FilterSalon(props) {
    return (
        <FilterContextProvider>
            {props.children}
        </FilterContextProvider>
    )
}

FilterSalon.Form = FilterSalonByCategoryForm;
FilterSalon.SalonsList = FilterSalonByCategoryList;
FilterSalon.Map = SalonsOnTheMap;
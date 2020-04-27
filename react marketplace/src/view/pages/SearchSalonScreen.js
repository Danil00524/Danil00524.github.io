import React from 'react'
import Sidebar from '../layouts/Sidebar/Sidebar'
import MapPlaceholder from "../layouts/MapPlaceholder/MapPlaceholder";
// import FilterSalonByCategoryForm from '../features/filter/FilterSalonByCategoryForm'
import FilterSalon from '../features/filter';
import Header from '../layouts/Header/Header';

export default function SearchSalonScreen(props) {
    return (
        <>
            <div>
                <Header />
            </div>
            <FilterSalon>
                <Sidebar>
                    <FilterSalon.Form />
                    <FilterSalon.SalonsList />
                </Sidebar>
                <MapPlaceholder>
                    <FilterSalon.Map />
                </MapPlaceholder>
            </FilterSalon>
        </>
    )
}

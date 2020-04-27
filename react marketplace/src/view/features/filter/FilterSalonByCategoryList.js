import React from 'react';
import { useFilteredSalons, useFilteredSalonLoading } from './FilterContextProvider';
import SalonCard from './components/SalonCards/SalonCard'

export default function FilterSalonByCategoryForm(props) {
    const salons = useFilteredSalons();
    const {isLoading} = useFilteredSalonLoading()
    // TODO: fix this tem style solution in more appropriate way
    return (
        <div style={{ 'height' : 'calc(100vh - 330px)', overflow: 'auto', marginRight: '-20px' }}>
            <div>
                {isLoading && <div>Loading...</div>}
                {Object.keys(salons.collection).length > 0 &&
                    Object.values(salons.collection).map(salon => <SalonCard key={salon.id} {...salon} />)}
            </div>
        </div>
    );
}

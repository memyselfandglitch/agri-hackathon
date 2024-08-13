import React, { useState, useEffect } from 'react';
import FilterAccordion from './FilterAccordion';
import { useLocation } from 'react-router-dom';

const FilterSidediv = ({ onDistanceChange }) => {
    const [distance, setDistance] = useState(1000);

    const handleDistanceChange = (newDistance) => {
        setDistance(newDistance);
        if (onDistanceChange) {
            onDistanceChange(newDistance); // Notify the parent about the distance change
        }
    };

    // This useEffect is used to call the `onDistanceChange` prop with the initial distance value
    useEffect(() => {
        if (onDistanceChange) {
            onDistanceChange(distance);
        }
    }, [distance, onDistanceChange]);

    console.log("side div", distance)

    return (
        <React.Fragment>
            <div style={{ fontWeight: 300, fontSize: '19px', padding: '10px 0 10px 10px', color: '#555b54', display: 'block', fontFamily: 'Tahoma, Geneva, sans-serif' }}>
                FILTER
            </div>
            <hr style={{ marginTop: '2px', marginBottom: '5px' }}></hr>
            <FilterAccordion
                onDistanceChange={handleDistanceChange}
            />
        </React.Fragment>
    );
};

export default FilterSidediv;

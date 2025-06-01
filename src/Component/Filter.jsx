import React, { useRef } from 'react';
import './Filter.css';
import Today from '../Assets/Filter/Today';
import Tomorrow from '../Assets/Filter/Tomorrow';
import WeekEnd from '../Assets/Filter/WeekEnd';
import Month from '../Assets/Filter/Month';
import International from '../Assets/Filter/International';
import { useNavigate } from 'react-router-dom';

const Filter = () => {
    const navigate = useNavigate();

    const filters = [
        { label: 'Today', value: 'today', icon: <Today /> },
        { label: 'Tomorrow', value: 'tomorrow', icon: <Tomorrow /> },
        { label: 'This Weekend', value: 'this-weekend', icon: <WeekEnd /> },
        { label: 'This Month', value: 'this-month', icon: <Month /> },
        { label: 'International', value: 'international', icon: <International /> },
    ];

    const handleFilterClick = (filterValue) => {
        navigate('/events-search', { state: { filterValue } });
    };
    const sliderRef = useRef(null);

    return (
        <div className="filter-container">
            <div className="filter-title">Filter events by</div>
            <div className="filter-buttons" ref={sliderRef} >
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        className="filter-button"
                        onClick={() => handleFilterClick(filter.value)}
                    >
                        <span className="filter-icon">{filter.label}</span>
                        {filter.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;

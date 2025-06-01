import React, { useState } from 'react';
import './FilterEventByCountry.css';
import USA from '../../Assets/FilterEventByCountry/USA';
import Singapur from '../../Assets/FilterEventByCountry/Singapur';
import Philipines from '../../Assets/FilterEventByCountry/Philipines';
import Indonasia from '../../Assets/FilterEventByCountry/Indonasia';
import China from '../../Assets/FilterEventByCountry/China';
import Botswana from '../../Assets/FilterEventByCountry/Botswana';
import NetherLand from '../../Assets/FilterEventByCountry/NetherLand';
import UK from '../../Assets/FilterEventByCountry/UK';

const countries = [
    { name: 'USA', flag: <USA /> },
    { name: 'Singapore', flag: <Singapur /> },
    { name: 'Philippines', flag: <Philipines /> },
    { name: 'Indonesia', flag: <Indonasia /> },
    { name: 'China', flag: <China /> },
    { name: 'Botswana', flag: <Botswana /> },
    { name: 'Netherlands', flag: <NetherLand /> },
    { name: 'UK', flag: <UK /> }
];

const FilterEventByCountery = ({ onFilter }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        onFilter(country);
    };

    return (
        <div className="event-filter">
            <h3 className='title' >Browse event by country</h3>
            <div className="flags-container">
                {countries.map((country, index) => (
                    <div
                        key={index}
                        className={`flag-item ${selectedCountry === country.name ? 'selected' : ''}`}
                        onClick={() => handleCountryClick(country.name)}
                    >
                        <div className='filter-flags' >
                            {country.flag}
                        </div>
                        <span className='country-name' >{country.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterEventByCountery;

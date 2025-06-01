import React, { useRef } from 'react';
import './IndustrySelection.css';
// import Fintech from '../Assets/IndustrySelection/Fintech.jpg'
// import EdTech from '../Assets/IndustrySelection/EdTech.jpg'
// import Ecommerce from '../Assets/IndustrySelection/Ecommerce.jpg'
// // import Ecommerce from '../Assets/LandingPage/Cards/Ecommerce'
// import DeepTech from '../Assets/IndustrySelection/DeepTech.jpg'
// import AirTech from '../Assets/IndustrySelection/AirTech.jpg'
// import Logistic from '../Assets/IndustrySelection/logistic.jpg'
// import Startupevents from '../Assets/IndustrySelection/startupevents.png'
import { useNavigate } from 'react-router-dom';

const industries = [
    { label: 'All', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1725700488/Industry_Filter_card_xlunos.png' },
    { label: 'EdTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930763/Industry_Filter_card_12_ybes8i.jpg' },
    { label: 'Fintech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724929897/rqnra3jouhjxgbpom55s.jpg' },
    // { label: 'Ecommerce', image: <Ecommerce /> },
    { label: 'Ecommerce', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930764/Industry_Filter_card_13_ttd2lb.jpg' },
    { label: 'Deeptech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930483/Industry_Filter_card_3_jgfvcy.jpg' },
    { label: 'LogisticTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930483/Industry_Filter_card_4_vebcsv.jpg' },
    // { label: 'AirTech', image: AirTech },
];

const IndustrySelection = ({ onIndustryChange, eventData, setFilteredEventData }) => {
    const navigate = useNavigate();

    const navigateToIndustry = () => {
        navigate('/industry', { state: { eventData } });
    }

    const handleFilterClick = (industry) => {
        navigate('/events-search', { state: { industry } });
    };
    const sliderRef = useRef(null);
    console.log("industry selection", eventData)

    return (
        <div className="industry-selection">
            <div className="industry-header">
                <h2 className='industry-title'>Explore by industry</h2>
                <button onClick={navigateToIndustry} className="view-all">View all</button>
            </div>
            <div className="industry-grid" ref={sliderRef} >
                {industries.map((industry, index) => (
                    <div
                        key={index}
                        className="industry-card"
                        onClick={() => handleFilterClick(industry.label)}
                    >
                        {/* {industry.image} ||  */}
                        <img src={industry.image} className='industry-selection-images' alt={`industry.image`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndustrySelection;

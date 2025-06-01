import React, { useRef } from 'react'
import EventCard from '../EventCard'
import { Link, useNavigate } from 'react-router-dom'
import EventsCard from '../NewsCards/EventsCard';

function D2CComponent({ eventData, title }) {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const handleFilterClick = (title) => {
        navigate('/events-search', { state: { industry: title } });
    };

    const titleMapping = {
        "AI/AR/VR": "AR/VR",
        "All": "Startup Events",
    };

    // Use the mapping object to get the modified title
    const modifiedTitle = titleMapping[title] || title;

    return (
        <div className="industry-selection">
            <div className="industry-header">
                <h2 className='industry-title'>{modifiedTitle} Events</h2>
                <div onClick={() => handleFilterClick(title)} className="view-all">View all</div>
            </div>
            <div className='custom-slider' ref={sliderRef}>
                {eventData.map((event, index) => (
                    <div className='slider-card' key={index}>
                        <EventsCard event={event} />
                    </div>
                ))}
            </div>
            <div className="industry-grid-d2c" ref={sliderRef}>
                {eventData.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    )
}

export default D2CComponent
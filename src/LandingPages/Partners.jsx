import React from 'react'
import { useNavigate } from 'react-router-dom'
import Dates from '../Assets/EventDetails/Date'
import InternationalPartner from '../Assets/Partners/InternationPartner.jpg';
import InternationalPartnerImage from '../Assets/Partners/InternationalPartnerImage.jpg';
import IndianPartner from '../Assets/Partners/IndianPartner.jpg'
import Ecell from '../Assets/Partners/ECell.jpg'
import LocationPopup from './LocationPopup';




const UpcomingEvents = ({ events }) => {
    const navigate = useNavigate();

    const sanitizeEventNameForURL = (eventname) => {
        return eventname
            .toLowerCase()
            .replace(/\|/g, '-')             // Replace each '|' with a single '-'
            .replace(/[^a-z0-9'-]+/g, '-')   // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
            .replace(/--+/g, '-')            // Replace multiple consecutive hyphens with a single hyphen
            .replace(/^-|-$/g, '');   // Remove any non-word characters except dashes
    };

    const handleCardClick = (eventname) => {
        const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];
        if (!recentlyViewed.includes(eventname)) {
            recentlyViewed.push(sanitizeEventNameForURL(eventname));
            sessionStorage.setItem('recentlyViewedEvents', JSON.stringify(recentlyViewed.slice(-5)));
        }
        navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
    };


    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getUTCMonth()];
        const year = date.getUTCFullYear().toString().slice(-2);

        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // 4-20 are all 'th'
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${daySuffix(day)} ${month} '${year}`;
    }

    return (
        <div className='upcoming-events-container'>
            <div className='upcoming-events-contain'>
                <h2 className='upcoming-events-title'>{events.eventname}</h2>
                <span className='upcoming-event-date'><Dates /> {formatDate(events.startdate)}</span>
            </div>
            <div>
                <button className="upcoming-register-button" onClick={() => handleCardClick(events.eventname)} >Register Now</button>
            </div>
        </div>
    );
};

function Partners({ eventData, setSelectedLocation, isPopupOpen, setIsPopupOpen }) {
    const handleSelectLocation = (location) => {

        // Set the selected location
        setSelectedLocation(location.city);
        setIsPopupOpen(false);
        localStorage.setItem('popupClosed', 'true');
    };

    const uniqueNationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'National').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'National' }));

    const uniqueInternationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'International').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'International' }));
    return (
        <>
            <div className='about-us-container'>
                <LocationPopup isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onSelectLocation={handleSelectLocation}
                    national={uniqueNationalLocations} international={uniqueInternationalLocations} />
                <div className='privecy-policy-div-one' >
                    <div className='about-us-text-div' >
                        <h1 className='about-text' >Our Partners</h1>
                        <span className='about-us-discription' >In less than 15 months StartupNews.fyi spreaded it wings to over 14 countries through our Media Partnership approach with some of the top event IP’s and top exhibitors from across the globe.</span>
                    </div>
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >International Events</h1>
                        <div className='privecy-text-div'>
                            <div className='partner-image' >
                                <img src={InternationalPartner} alt="InternationalPartner" />
                            </div>
                            <div className='partner-image' >
                                <img src={InternationalPartnerImage} alt="InternationalPartnerImage" />
                            </div>
                        </div>

                    </div>
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >International Partner</h1>
                        <div className='privecy-text-div' >
                            <div className='partner-image' >
                                <img src={IndianPartner} alt="IndianPartner" />
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >e-Cell Partnerships</h1>
                        <div className='privecy-text-div' >
                            <div className='partner-image' >
                                <img src={Ecell} alt="Ecell" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='about-us-div-two'>
                    <div className='about-us-events'>
                        <h2 className='upcoming-event-text'>Upcoming Events</h2>
                        <div className='upcoming-event-cards'>
                            {eventData ? eventData.slice(0, 5).map((event, index) => (
                                <div className='upcoming-event-card' key={index}>
                                    <UpcomingEvents events={event} />
                                </div>
                            )) : <p>No Events to display</p>}
                        </div>
                    </div>
                    <div className='about-us-contact' >
                        <h2 className='about-us-addres-text'>Communication Address</h2>
                        <div className='about-us-contact-details'>
                            <span className='about-us-contact-text'>DOTFYI Media Ventures Private Limited.</span>
                            <span className='about-us-contact-text'>AltF Spaces 5th floor, Wing A Statesman House,Barakhamba Road, Delhi, India – 110001</span>
                            <span className='about-us-contact-text'>CIN No. : U22100DL2022PTC403240</span>
                            <span className='about-us-contact-text'>Contact Person : Kapil Suri</span>
                            <span className='about-us-contact-text'>Contact Number : +91 98990 08322</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Partners
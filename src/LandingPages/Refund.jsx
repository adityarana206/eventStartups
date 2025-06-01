import React from 'react'
import { useNavigate } from 'react-router-dom'
import Dates from '../Assets/EventDetails/Date'
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

function Refund({ eventData, setSelectedLocation, isPopupOpen, setIsPopupOpen }) {
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
                        <h1 className='about-text' >Cancellation / Refund Policy</h1>
                        <span className='about-us-discription' >Thank you for shopping at StartupNews.fyi.​</span>
                        <span className='about-us-discription'>If for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. The following terms are applicable for any products that You purchased with Us.</span>
                    </div>
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Interpretation</h1>
                        <span className='about-us-discription' >For the purposes of this Return and Refund Policy:</span>
                        <ol className='privecy-policy-list' >
                            <li className='about-us-discription'>Company (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to DOTFYI Media Ventures Private Limited, 1553-A-8 Gali No.2, West Rohtash Nagar, Shahdara, East Delhi, India 110032.</li>
                            <li className='about-us-discription'>Goods refer to the items offered for sale on the Service.</li>
                            <li className='about-us-discription'>Orders mean a request by You to purchase Goods from Us.</li>
                            <li className='about-us-discription'>Service refers to the Website.</li>
                            <li className='about-us-discription'>Website refers to StartupNews.fyi, accessible from https://www.StartupNews.fyi​</li>
                        </ol>
                        <span className='about-us-discription' >You mean the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</span>
                    </div>
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Your order Cancellation Rights</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</span>
                            <span className='about-us-discription'>The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</span>
                            <span className='about-us-discription'>To exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>By email: office@startupnews.fyi</li>
                            </ol>
                            <span className='about-us-discription'>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</span>

                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Conditions for Returns</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >In order for the Goods to be eligible for a return, please make sure that:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>The Goods were purchased in the last 7 days</li>
                                <li className='about-us-discription'>The Goods are in the original packaging</li>
                            </ol>
                            <span className='about-us-discription' >The following Goods cannot be returned:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>The supply of Goods made to Your specifications or clearly personalized.</li>
                                <li className='about-us-discription'>The supply of Goods which according to their nature are not suitable to be returned, deteriorates rapidly or where the date of expiry is over.</li>
                                <li className='about-us-discription'>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
                                <li className='about-us-discription'>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
                            </ol>
                            <span className='about-us-discription' >We reserve the right to refuse returns of any merchandise that does not meet the above return conditions at our sole discretion.</span>
                            <span className='about-us-discription' >Only regular-priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Returning goods</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods to the following address:</span>
                            <span className='about-us-discription' >1553-A-8 Gali No.2, West Rohtash Nagar, Shahdara, East Delhi, India 110032​</span>
                            <span className='about-us-discription' >We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Gifts​</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >If the Goods were marked as a gift when purchased and then shipped directly to you, You’ll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.​</span>
                            <span className='about-us-discription' >If the Goods weren’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give it to You later, We will send the refund to the gift giver.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Contact Us</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >If you have any questions about our Returns and Refunds Policy, please contact us:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>By email: office@startupnews.fyi</li>
                            </ol>
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

export default Refund
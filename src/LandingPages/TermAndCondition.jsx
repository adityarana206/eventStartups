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


function TermAndCondition({ eventData, setSelectedLocation, isPopupOpen, setIsPopupOpen }) {
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
                        <h1 className='about-text' >Terms and Conditions</h1>
                        <span className='about-us-discription' >Welcome to StartupNews.fyi!</span>
                        <span className='about-us-discription'>These terms and conditions outline the rules and regulations for the use of DOTFYI Media Ventures Private Limited’s Website, located at Website.com.</span>
                        <span className='about-us-discription'>By accessing this website we assume you accept these terms and conditions. Do not continue to use StartupNews.fyi if you do not agree to take all of the terms and conditions stated on this page.</span>
                        <span className='about-us-discription'>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person who logs on to this website and is compliant with the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of the provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to the same.</span>
                    </div>
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Cookies</h1>
                        <span className='about-us-discription' >We employ the use of cookies. By accessing StartupNews.fyi, you agreed to use cookies in agreement with DOTFYI Media Ventures Private Limited’s Privacy Policy.</span>
                        <span className='about-us-discription' >Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</span>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >License</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >Unless otherwise stated, DOTFYI Media Ventures Private Limited and/or its licensors own the intellectual property rights for all material on StartupNews.fyi. All intellectual property rights are reserved. You may access this from StartupNews.fyi for your personal use subject to restrictions set in these terms and conditions.</span>
                            <span className='about-us-discription'>You must not:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>Republish material from StartupNews.fyi</li>
                                <li className='about-us-discription'>Sell, rent or sub-license material from StartupNews.fyi</li>
                                <li className='about-us-discription'>Reproduce, duplicate or copy material from StartupNews.fyi</li>
                                <li className='about-us-discription'>Redistribute content from StartupNews.fyi​</li>
                            </ol>
                            <span className='about-us-discription'>This Agreement shall begin on the date hereof.</span>
                            <span className='about-us-discription'>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. DOTFYI Media Ventures Private Limited does not filter, edit, publish or review Comments before their presence on the website. Comments do not reflect the views and opinions of DOTFYI Media Ventures Private Limited, its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, DOTFYI Media Ventures Private Limited shall not be liable for the Comments or any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</span>
                            <span className='about-us-discription'>DOTFYI Media Ventures Private Limited reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes a breach of these Terms and Conditions.</span>
                            <span className='about-us-discription'>You warrant and represent that:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                                <li className='about-us-discription'>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                                <li className='about-us-discription'>The Comments do not contain any defamatory, libellous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                                <li className='about-us-discription'>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                            </ol>
                            <span className='about-us-discription'>You hereby grant DOTFYI Media Ventures Private Limited a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Hyperlinking to our content</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >The following organizations may link to our Website without prior written approval:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>Government agencies;</li>
                                <li className='about-us-discription'>Search engines;</li>
                                <li className='about-us-discription'>News organizations;</li>
                                <li className='about-us-discription'>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                                <li className='about-us-discription'>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.​</li>
                            </ol>
                            <span className='about-us-discription'>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</span>
                            <span className='about-us-discription'>We may consider and approve other link requests from the following types of organizations:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>commonly-known consumer and/or business information sources;</li>
                                <li className='about-us-discription'>dot.com community sites;</li>
                                <li className='about-us-discription'>associations or other groups representing charities;</li>
                                <li className='about-us-discription'>online directory distributors;</li>
                                <li className='about-us-discription'>internet portals;</li>
                                <li className='about-us-discription'>accounting, law and consulting firms; and</li>
                                <li className='about-us-discription'>educational institutions and trade associations.</li>
                            </ol>
                            <span className='about-us-discription'>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavourably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of DOTFYI Media Ventures Private Limited; and (d) the link is in the context of general resource information.</span>
                            <span className='about-us-discription'>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</span>
                            <span className='about-us-discription'>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to DOTFYI Media Ventures Private Limited. Please include your name, your organization name, and contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</span>
                            <span className='about-us-discription'>Approved organizations may hyperlink to our Website as follows:</span>
                            <ol className='privecy-policy-list' >
                                <li className='about-us-discription'>By use of our corporate name; or</li>
                                <li className='about-us-discription'>By use of the uniform resource locator being linked to; or</li>
                                <li className='about-us-discription'>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                            </ol>
                            <span className='about-us-discription'>No use of DOTFYI Media Ventures Private Limited’s logo or other artwork will be allowed for linking absent a trademark license agreement.</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >iFrames</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Content Liability</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libellous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Reservation of rights​​</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >You may consult this list to find the Privacy Policy for each of the advertising partners of StartupNews.fyi.​</span>
                            <span className='about-us-discription' >IThird-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on StartupNews.fyi, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.​</span>
                            <span className='about-us-discription' >Note that StartupNews.fyi has no access to or control over these cookies that are used by third-party advertisers.​</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Removal of links from our websites</h1>
                        <div className='privecy-text-div' >
                            <span className='about-us-discription' >If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</span>
                            <span className='about-us-discription' >We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className='about-us-text-div' >
                        <h1 className='privecy-text' >Disclaimer</h1>
                        <span className='about-us-discription' >To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</span>
                        <ol className='privecy-policy-list' >
                            <li className='about-us-discription'>limit or exclude our or your liability for death or personal injury;</li>
                            <li className='about-us-discription'>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                            <li className='about-us-discription'>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                            <li className='about-us-discription'>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                        </ol>
                        <span className='about-us-discription' >The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</span>
                        <span className='about-us-discription' >As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</span>
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

export default TermAndCondition
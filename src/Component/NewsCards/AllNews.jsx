import React, { useState, useEffect, useRef } from 'react';
import './AllNews.css'
import NewsCardOne from './AllNewsCards/NewsCardOne';  // Example NewsCard component
import NewsCardTwo from './AllNewsCards/NewsCardTwo';  // Another example NewsCard component
import NewsCardThree from './AllNewsCards/NewsCardThree';  // Another example NewsCard component
import NewsCardFour from './AllNewsCards/NewsCardFour';  // Another example NewsCard component
import NewsCardFive from './AllNewsCards/NewsCardFive';  // Another example NewsCard component
import NewsSlider from './AllNewsCards/NewsSlider';
import { useNavigate, Link } from 'react-router-dom';
import Dates from '../../Assets/EventDetails/Date'
import EventsCard from '../NewsCards/EventsCard';
import WhatsappIcon from '../../Assets/News/companyDetails/WhatsappIcon';
import InstagramIcon from '../../Assets/News/companyDetails/InstagramIcon';
import InternetIcon from '../../Assets/News/companyDetails/InternetIcon';
import LinkedInIcon from '../../Assets/News/companyDetails/LinkedInIcon';
import EmailForm from './EmailForm';
import PichDeckSlider from './PichDeckSlider'
import GoogleAdsComponent from '../GoogleAds';
import GoogleAds from './GoogleAdsComponent';
import LoadingAnimation from '../LoadingAnimation';
import animationData from '../../Assets/InfiniteScroll/loading.json'


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
        navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
    };

    const truncateEventName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
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
                <h2 className='upcoming-events-title'>{truncateEventName(events.eventname, 50)}</h2>
                <span className='upcoming-event-date'><Dates /> {formatDate(events.startdate)}</span>
            </div>
            <div>
                <button className="upcoming-register-button" onClick={() => handleCardClick(events.eventname)} >Register Now</button>
            </div>
        </div>
    );
};


const AllNews = ({ newsItems, filteredEventData, setSelectedIndustry, loading, setLoading, handleViewAllClick }) => {
    const [latestNews, setLatestNews] = useState(null);
    const [fintech, setFintech] = useState(null)
    const [ecommerceNews, setEcommerceNews] = useState(null)
    const [loadCount, setLoadCount] = useState(0); // Track how many times Load More is clicked
    const [isLoading, setIsLoading] = useState(false); // Show loading spinner

    const loadMoreSections = () => {
        if (loadCount < 5) {
            setIsLoading(true); // Show loading spinner
            setTimeout(() => {
                setLoadCount((prev) => prev + 1); // Increment load count to show next section
                setIsLoading(false); // Hide loading after 1 second
            }, 1000);
        }
    };

    // Infinite scroll detection
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 && !isLoading) {
            loadMoreSections();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadCount, isLoading]);


    // const handleLoadMore = () => {
    //     setLoadCount(prevCount => prevCount + 1);
    // };
    const sliderRef = useRef(null);

    console.log(filteredEventData, 'event data')

    function getLatestNews(newsItems) {
        if (!newsItems) return [];
        let latestNews = [];

        newsItems.forEach(item => {
            if (item.activity && Array.isArray(item.rssContent)) {
                item.rssContent.forEach(news => {
                    latestNews.push({
                        newsDetails: news,
                        parentDetails: {
                            industry: item.industry,
                            icon: item.icon,
                            title: item.title
                        }
                    });
                });
            }
        });

        // Sort news items by date in descending order and take the top 4 or 5
        latestNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));
        return latestNews.slice(1, 5); // Adjust the number as necessary
    }

    function FintechNews(newsItems) {
        if (!newsItems) return [];
        let fintechNews = [];

        newsItems.forEach(item => {
            // Check if the item is active, the content is an array, and the industry is 'fintech'
            if (item.activity && Array.isArray(item.rssContent) && item.industry.toLowerCase() === 'fintech') {
                item.rssContent.forEach(news => {
                    fintechNews.push({
                        newsDetails: news,
                        parentDetails: {
                            industry: item.industry,
                            icon: item.icon,
                            title: item.title
                        }
                    });
                });
            }
        });

        // Sort fintech news items by date in descending order and take the top 5
        fintechNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));
        return fintechNews.slice(0, 4); // Take the top 5 latest fintech news
    }

    function EcommerceNews(newsItems) {
        if (!newsItems) return [];
        let ecommerceNews = [];

        newsItems.forEach(item => {
            // Check if the item is active, the content is an array, and the industry is 'ecommerce'
            if (item.activity && Array.isArray(item.rssContent) && item.industry.toLowerCase() === 'ecommerce') {
                item.rssContent.forEach((news, rssIndex) => {
                    ecommerceNews.push({
                        newsDetails: news,
                        rssIndex: rssIndex,  // Include the rssIndex here
                        parentDetails: {
                            industry: item.industry,
                            icon: item.icon,
                            title: item.title
                        }
                    });
                });
            }
        });

        // Sort ecommerce news items by date in descending order and take the top 4
        ecommerceNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));
        return ecommerceNews.slice(0, 4); // Take the top 4 latest ecommerce news
    }



    function BlockchainNews(newsItems, blockchain) {
        if (!newsItems) return [];
        let ecommerceNews = [];

        newsItems.forEach(item => {
            // Check if the item is active, the content is an array, and the industry is 'ecommerce'
            if (item.activity && Array.isArray(item.rssContent) && item.industry.toLowerCase() === blockchain) {
                item.rssContent.forEach((news, rssIndex) => {
                    ecommerceNews.push({
                        newsDetails: news,
                        rssIndex: rssIndex,  // Include the rssIndex here
                        parentDetails: {
                            industry: item.industry,
                            icon: item.icon,
                            title: item.title
                        }
                    });
                });
            }
        });

        // Sort ecommerce news items by date in descending order and take the top 4
        ecommerceNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));
        return ecommerceNews.slice(0, 4); // Take the top 4 latest ecommerce news
    }

    const edtech = BlockchainNews(newsItems, "edtech")
    const technology = BlockchainNews(newsItems, "technology")
    const agritech = BlockchainNews(newsItems, "agritech")
    const healthtech = BlockchainNews(newsItems, "healthtech")
    const blockchain = BlockchainNews(newsItems, "blockchain")
    const traveltech = BlockchainNews(newsItems, "traveltech")
    const MobileEv = BlockchainNews(newsItems, "mobility-ev")
    const socialMedia = BlockchainNews(newsItems, "social-media")
    const CyberSecurity = BlockchainNews(newsItems, "cyber-security")
    const Logitech = BlockchainNews(newsItems, "logistictech")
    const RetailTech = BlockchainNews(newsItems, "retail-tech")
    const Crypto = BlockchainNews(newsItems, "crypto")
    const Startup = BlockchainNews(newsItems, "startup")
    const Bussiness = BlockchainNews(newsItems, "business")
    const General = BlockchainNews(newsItems, "general")
    const Gedget = BlockchainNews(newsItems, "gadgets")

    console.log(technology, "technology")

    const handleReadMoreClick = () => {
        window.open('https://chat.whatsapp.com/K0BvjFBrJJ5E2UOt2RpXiL', '_blank');
    };

    useEffect(() => {
        if (newsItems && newsItems.length > 0) {
            setLatestNews(getLatestNews(newsItems));
            setFintech(FintechNews(newsItems))
            setEcommerceNews(EcommerceNews(newsItems))
        }
    }, [newsItems]);

    console.log(fintech, 'fintech news')
    const nationalEvents = filteredEventData.filter(event => event.modeofevent === 'National');

    // if (loading) {
    //     return <div className="loading">
    //         <LoadingAnimation animationData={animationData} />
    //     </div>; // Add a loading indicator
    // }

    return (
        <div className='allnews'>
            {/* <div className='google-ads-slider' >
                <GoogleAds />
                <PichDeckSlider images={images} downloads={downloads} />
            </div> */}
            <div className='allnews-container'>
                <div className='allnews-latest-slider'>
                    <NewsCardOne loading={loading} setLoading={setLoading} newsItems={newsItems} filteredEventData={filteredEventData} />
                    <NewsSlider loading={loading} setLoading={setLoading} newsItems={newsItems} />
                </div>
                <div className='allnews-events'>
                    <h2 className='upcoming-event-text'>Upcoming Events</h2>
                    <div className='upcoming-event-cards'>
                        {filteredEventData.slice(0, 5).map((event, index) => {
                            return (
                                <div className='upcoming-event-card' key={index}>
                                    < UpcomingEvents events={event} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div >
            {/* Latest News */}
            <div className='latest-news-container'>
                <div className='latest-news-details'>
                    <div className='latest-news-heading'>
                        <h2 className='latest-news-text'>Latest News</h2>
                        <Link className='latest-news-link' onClick={handleViewAllClick} >View all</Link>
                    </div>
                    <div className='latest-news-cards'>
                        {latestNews ? latestNews.map((news, index) => (
                            <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={latestNews} />
                        )) : <p>No News to display</p>}
                    </div>
                </div>
                <div className='allNews-ggogle-ads' >
                    Google Ads
                </div>
            </div>
            {/* Email Form */}
            <EmailForm />
            {/* National Events */}
            <div className='national-events'>
                <div className='national-events-details'>
                    <div className='latest-news-heading'>
                        <h2 className='latest-news-text'>National Events</h2>
                        <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                    </div>
                    <div className='national-events-cards' ref={sliderRef} >
                        {nationalEvents.slice(0, 4).map((event, index) => {
                            return (
                                <div className='national-event-card' key={index}>
                                    < EventsCard event={event} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Fintech News */}
            <div className='latest-news-container'>
                <div className='latest-news-details'>
                    <div className='latest-news-heading'>
                        <h2 className='latest-news-text'>Fintech News</h2>
                        <Link className='latest-news-link' onClick={() => setSelectedIndustry('Fintech')}>View all</Link>
                    </div>
                    <div className='latest-news-cards'>
                        {fintech ? fintech.map((news, index) => (
                            <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={fintech} />
                        )) : <p>No News to display</p>}
                    </div>
                </div>
                <div className='company-details-container'>
                    <div className='company-details-subcontainer' >
                        <div className='company-subdetails'>
                            <div className='company-details-icon' >
                                <WhatsappIcon />
                                <div className='company-text'>
                                    <span className='company-subtext'>20k</span>
                                    <span className='company-smalltext'>Opt-in Members</span>
                                </div>
                            </div>
                            <div className='company-details-icon'>
                                <InstagramIcon />
                                <div className='company-text'>
                                    <span className='company-subtext'>390k</span>
                                    <span className='company-smalltext'>Followers</span>
                                </div>
                            </div>
                        </div>
                        <div className='company-subdetails' >
                            <div className='company-details-icon'>
                                <InternetIcon />
                                <div className='company-text'>
                                    <span className='company-subtext'>15</span>
                                    <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                </div>
                            </div>
                            <div className='company-details-icon'>
                                <LinkedInIcon />
                                <div className='company-text'>
                                    <span className='company-subtext'>31k+</span>
                                    <span className='company-smalltext'>Followers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                </div>
            </div>
            {/* D2C News */}
            <div className='national-events'>
                <div className='national-events-details'>
                    <div className='latest-news-heading'>
                        <h2 className='latest-news-text'>Ecommerce News</h2>
                        <Link className='latest-news-link' onClick={() => setSelectedIndustry('Ecommerce')}>View all</Link>
                    </div>
                    <div className='national-events-cards'>
                        {ecommerceNews ? ecommerceNews.map((news, index) => (
                            <NewsCardFour
                                key={index}
                                news={news}
                                allNewsData={ecommerceNews}
                                filteredEventData={filteredEventData}
                            />
                        )) : <p>No News to display</p>}
                    </div>
                </div>
            </div>
            {/* for loadmore button 1*/}
            {loadCount >= 1 && (
                <>

                    {/* Fintech News */}
                    {edtech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Edtech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Edtech')} >View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {edtech ? edtech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={fintech} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='company-details-container'>
                            <div className='company-details-subcontainer' >
                                <div className='company-subdetails'>
                                    <div className='company-details-icon' >
                                        <WhatsappIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>20k</span>
                                            <span className='company-smalltext'>Opt-in Members</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <InstagramIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>390k</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-subdetails' >
                                    <div className='company-details-icon'>
                                        <InternetIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>15</span>
                                            <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <LinkedInIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>31k+</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                        </div>
                    </div>}
                    {/* National Events */}
                    {nationalEvents.slice(4, 8).length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>National Events</h2>
                                <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {nationalEvents.slice(4, 8).map((event, index) => {
                                    return (
                                        <div className='national-event-card' key={index}>
                                            < EventsCard event={event} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {/* Latest News */}
                    {technology.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Technology News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Technology')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {technology ? technology.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={latestNews} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='allNews-ggogle-ads' >
                            Google Ads
                        </div>
                    </div>}
                    {/* D2C News */}
                    {MobileEv.length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Mobality EV News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Mobility-ev')}>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {MobileEv ? MobileEv.map((news, index) => (
                                    <NewsCardFour
                                        key={index}
                                        news={news}
                                        allNewsData={MobileEv}
                                        filteredEventData={filteredEventData}
                                    />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                    </div>}


                </>
            )}
            {loadCount >= 2 && (
                <>

                    {/* Fintech News */}
                    {agritech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>AgriTech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Agritech')} >View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {agritech ? agritech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={fintech} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='company-details-container'>
                            <div className='company-details-subcontainer' >
                                <div className='company-subdetails'>
                                    <div className='company-details-icon' >
                                        <WhatsappIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>20k</span>
                                            <span className='company-smalltext'>Opt-in Members</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <InstagramIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>390k</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-subdetails' >
                                    <div className='company-details-icon'>
                                        <InternetIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>15</span>
                                            <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <LinkedInIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>31k+</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                        </div>
                    </div>}
                    {/* National Events */}
                    {nationalEvents.slice(8, 12).length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>National Events</h2>
                                <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {nationalEvents.slice(8, 12).map((event, index) => {
                                    return (
                                        <div className='national-event-card' key={index}>
                                            < EventsCard event={event} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {/* Latest News */}
                    {healthtech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>HealthTech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Healthtech')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {healthtech ? healthtech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={latestNews} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='allNews-ggogle-ads' >
                            Google Ads
                        </div>
                    </div>}

                    {/* D2C News */}
                    {socialMedia.length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Social media News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Social-media')}>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {socialMedia ? socialMedia.map((news, index) => (
                                    <NewsCardFour
                                        key={index}
                                        news={news}
                                        allNewsData={socialMedia}
                                        filteredEventData={filteredEventData}
                                    />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                    </div>}
                </>
            )}
            {loadCount >= 3 && (
                <>

                    {/* Fintech News */}
                    {blockchain.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Blockchain News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Blockchain')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {blockchain ? blockchain.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={fintech} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='company-details-container'>
                            <div className='company-details-subcontainer' >
                                <div className='company-subdetails'>
                                    <div className='company-details-icon' >
                                        <WhatsappIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>20k</span>
                                            <span className='company-smalltext'>Opt-in Members</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <InstagramIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>390k</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-subdetails' >
                                    <div className='company-details-icon'>
                                        <InternetIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>15</span>
                                            <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <LinkedInIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>31k+</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                        </div>
                    </div>}
                    {/* National Events */}
                    {nationalEvents.slice(12, 16).length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>National Events</h2>
                                <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {nationalEvents.slice(12, 16).map((event, index) => {
                                    return (
                                        <div className='national-event-card' key={index}>
                                            < EventsCard event={event} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {/* Latest News */}
                    {traveltech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>TravelTech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Traveltech')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {traveltech ? traveltech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={latestNews} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='allNews-ggogle-ads' >
                            Google Ads
                        </div>
                    </div>}

                    {/* D2C News */}
                    {CyberSecurity.length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Cyber security News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Cyber-security')}>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {CyberSecurity ? CyberSecurity.map((news, index) => (
                                    <NewsCardFour
                                        key={index}
                                        news={news}
                                        allNewsData={CyberSecurity}
                                        filteredEventData={filteredEventData}
                                    />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                    </div>}
                </>
            )}
            {loadCount >= 4 && (
                <>

                    {/* Fintech News */}
                    {Logitech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Logitech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Logistictech')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {Logitech ? Logitech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={Logitech} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='company-details-container'>
                            <div className='company-details-subcontainer' >
                                <div className='company-subdetails'>
                                    <div className='company-details-icon' >
                                        <WhatsappIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>20k</span>
                                            <span className='company-smalltext'>Opt-in Members</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <InstagramIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>390k</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-subdetails' >
                                    <div className='company-details-icon'>
                                        <InternetIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>15</span>
                                            <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <LinkedInIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>31k+</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                        </div>
                    </div>}
                    {/* National Events */}
                    {nationalEvents.slice(16, 20).length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>National Events</h2>
                                <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {nationalEvents.slice(16, 20).map((event, index) => {
                                    return (
                                        <div className='national-event-card' key={index}>
                                            < EventsCard event={event} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {/* Latest News */}
                    {RetailTech.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>RetailTech News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Retail-tech')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {RetailTech ? RetailTech.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={RetailTech} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='allNews-ggogle-ads' >
                            Google Ads
                        </div>
                    </div>}
                    {/* D2C News */}
                    {Crypto.length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Crypto News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Crypto')}>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {Crypto ? Crypto.map((news, index) => (
                                    <NewsCardFour
                                        key={index}
                                        news={news}
                                        allNewsData={Crypto}
                                        filteredEventData={filteredEventData}
                                    />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                    </div>}
                </>
            )}
            {isLoading && <div className='loading-indicator'>Loading...</div>}
            {loadCount >= 5 && (
                <>
                    {/* Fintech News */}
                    {Startup.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Startup News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('Startup')} >View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {Startup ? Startup.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={Startup} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='company-details-container'>
                            <div className='company-details-subcontainer' >
                                <div className='company-subdetails'>
                                    <div className='company-details-icon' >
                                        <WhatsappIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>20k</span>
                                            <span className='company-smalltext'>Opt-in Members</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <InstagramIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>390k</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-subdetails' >
                                    <div className='company-details-icon'>
                                        <InternetIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>15</span>
                                            <span style={{ width: '70px' }} className='company-smalltext'>Presence in countries</span>
                                        </div>
                                    </div>
                                    <div className='company-details-icon'>
                                        <LinkedInIcon />
                                        <div className='company-text'>
                                            <span className='company-subtext'>31k+</span>
                                            <span className='company-smalltext'>Followers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className='company-button' onClick={handleReadMoreClick} >Join our Community</button>
                        </div>
                    </div>}
                    {/* National Events */}
                    {nationalEvents.slice(20, 24).length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>National Events</h2>
                                <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {nationalEvents.slice(20, 24).map((event, index) => {
                                    return (
                                        <div className='national-event-card' key={index}>
                                            < EventsCard event={event} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>}
                    {/* Latest News */}
                    {Bussiness.length > 0 && <div className='latest-news-container'>
                        <div className='latest-news-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>Bussiness News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('business')}>View all</Link>
                            </div>
                            <div className='latest-news-cards'>
                                {Bussiness ? Bussiness.map((news, index) => (
                                    <NewsCardThree key={index} news={news} filteredEventData={filteredEventData} allNewsData={Bussiness} />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                        <div className='allNews-ggogle-ads' >
                            Google Ads
                        </div>
                    </div>}

                    {/* D2C News */}
                    {General.length > 0 && <div className='national-events'>
                        <div className='national-events-details'>
                            <div className='latest-news-heading'>
                                <h2 className='latest-news-text'>General News</h2>
                                <Link className='latest-news-link' onClick={() => setSelectedIndustry('General')}>View all</Link>
                            </div>
                            <div className='national-events-cards'>
                                {General ? General.map((news, index) => (
                                    <NewsCardFour
                                        key={index}
                                        news={news}
                                        allNewsData={General}
                                        filteredEventData={filteredEventData}
                                    />
                                )) : <p>No News to display</p>}
                            </div>
                        </div>
                    </div>}
                </>
            )}
            {/* {loadCount < 5 && (
                <div className='load-more-container'>
                    <button className='all-News-load-more-button' onClick={handleLoadMore}>Load More</button>
                </div>
            )} */}

        </div>
    );
};

export default AllNews;

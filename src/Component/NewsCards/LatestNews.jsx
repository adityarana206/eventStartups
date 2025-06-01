import React, { useState, useEffect } from 'react'
import NewsCardThree from './AllNewsCards/NewsCardThree';
import NewsCardFour from './AllNewsCards/NewsCardFour';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dates from '../../Assets/EventDetails/Date'
import EventsCard from '../NewsCards/EventsCard';
import WhatsappIcon from '../../Assets/News/companyDetails/WhatsappIcon';
import InstagramIcon from '../../Assets/News/companyDetails/InstagramIcon';
import InternetIcon from '../../Assets/News/companyDetails/InternetIcon';
import LinkedInIcon from '../../Assets/News/companyDetails/LinkedInIcon';

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

const LatestNews = ({ newsItems, filteredEventData, eventData, loading, setLoading }) => {
        const [news, setNews] = useState([]);
        const [error, setError] = useState(false); // State to track if there’s an error
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

        function LatestNewsss(newsItems) {
            if (!newsItems) return [];

            let latestNews = [];

            // Loop through all news items
            newsItems.forEach(item => {
                if (item.activity && Array.isArray(item.rssContent)) {
                    // Push each news item into the latestNews array
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

            // Sort the news items by publish date in descending order (latest first)
            latestNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));

            // Optional: Set error state if no news is found (if needed)
            if (latestNews.length === 0) {
                setError(true); // Assuming setError is defined in the surrounding context
            }

            return latestNews;
        }

        useEffect(() => {
            const checkAndSetNews = () => {
                if (newsItems && newsItems.length > 0) {
                    const filteredNews = LatestNewsss(newsItems);
                    if (filteredNews.length > 0) {
                        setNews(filteredNews);
                        setError(false); // Reset error if news is found
                        setLoadCount(0)
                    } else {
                        setNews([]);
                        setError(true); // Set error if no news found
                        setLoadCount(0)
                    }
                } else {
                    setNews([]);
                    setError(true); // Set error if there are no news items
                    setLoadCount(0)
                }
            };

            checkAndSetNews();
            console.log('abc')
        }, [newsItems]);

        if (error) {
            return (
                <div className='error-container'>
                    {/* <LoadingAnimation animationData={animationData} /> */}
                    {/* <h2>No News To Display</h2>
                <p>There is currently no news available for the selected industry.</p> */}
                    <img className='page-not-found' src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1725269057/Page_not_found_pw9qyr.png'} alt='loading image' />
                </div>
            );
        }

        const handleReadMoreClick = () => {
            window.open('https://chat.whatsapp.com/K0BvjFBrJJ5E2UOt2RpXiL', '_blank');
        };

        const nationalEvents = eventData.filter(event => event.modeofevent === 'National');
        return (
            <div className='spcific-industry-container'>
                {/* <div className='google-ads-slider' >
                <GoogleAds />
                <PichDeckSlider images={images} downloads={downloads} />
            </div> */}
                <div className='latest-news-container'>
                    {news.slice(0, 4).length > 0 && <div className='industry-news-details'>
                        <div className='latest-news-heading'>
                            <h2 className='latest-news-text'>Latest News</h2>
                        </div>
                        <div className='latest-news-cards'>
                            {news && news.length > 0 ? (
                                news.slice(0, 4).map((newws, index) => (
                                    <NewsCardThree key={index} news={newws} allNewsData={news} />
                                ))
                            ) : (
                                <p>No News To Display</p>
                            )}
                        </div>
                    </div>}
                    {filteredEventData.slice(0, 5).length > 0 && <div className='industry-events'>
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
                    </div>}
                </div>
                {/* National Events */}
                {nationalEvents.slice(0, 4).length > 0 && <div className='national-events'>
                    <div className='national-events-details'>
                        <div className='latest-news-heading'>
                            <h2 className='latest-news-text'>National Events</h2>
                            <Link to={'/event'} className='national-latest-news-link'>View all</Link>
                        </div>
                        <div className='national-events-cards'>
                            {nationalEvents.slice(0, 4).map((event, index) => {
                                return (
                                    <div className='national-event-card' key={index}>
                                        < EventsCard event={event} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>}
                {/* Industry News Updates */}
                {news.slice(4, 8).length > 0 && <div className='latest-news-container'>
                    <div className='latest-news-details'>
                        <div className='latest-news-heading'>
                            <h2 className='latest-news-text'>Latest Top News</h2>
                            {/* <Link className='latest-news-link'>View all</Link> */}
                        </div>
                        <div className='latest-news-cards'>
                            {news && news.length > 0 ? (
                                news.slice(4, 8).map((newws, index) => (
                                    <NewsCardThree key={index} news={newws} allNewsData={news} />
                                ))
                            ) : (
                                <p>No News To Display</p>
                            )}
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
                {/* Industry Top News */}
                {news.slice(8, 12).length > 0 && <div className='national-events'>
                    <div className='national-events-details'>
                        <div className='latest-news-heading'>
                            <h2 className='latest-news-text'>Latest Top News</h2>
                            {/* <Link className='latest-news-link'>View all</Link> */}
                        </div>
                        <div className='national-events-cards'>
                            {news ? news.slice(8, 12).map((news, index) => (
                                <NewsCardFour key={index} news={news} />
                            )) : <p>No News to display</p>}
                        </div>
                    </div>
                </div>}
                {loadCount >= 1 &&
                    (
                        <>
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
                            {/* Industry News Updates */}
                            {news.slice(12, 16).length > 0 && <div className='latest-news-container'>
                                <div className='latest-news-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='latest-news-cards'>
                                        {news && news.length > 0 ? (
                                            news.slice(12, 16).map((newws, index) => (
                                                <NewsCardThree key={index} news={newws} allNewsData={news} />
                                            ))
                                        ) : (
                                            <p>No News To Display</p>
                                        )}
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
                            {/* Industry Top News */}
                            {news.slice(16, 20).length > 0 && <div className='national-events'>
                                <div className='national-events-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='national-events-cards'>
                                        {news ? news.slice(16, 20).map((news, index) => (
                                            <NewsCardFour key={index} news={news} />
                                        )) : <p>No News to display</p>}
                                    </div>
                                </div>
                            </div>}
                        </>
                    )}
                {loadCount >= 2 &&
                    (
                        <>
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
                            {/* Industry News Updates */}
                            {news.slice(20, 24).length > 0 && <div className='latest-news-container'>
                                <div className='latest-news-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='latest-news-cards'>
                                        {news && news.length > 0 ? (
                                            news.slice(20, 24).map((newws, index) => (
                                                <NewsCardThree key={index} news={newws} allNewsData={news} />
                                            ))
                                        ) : (
                                            <p>No News To Display</p>
                                        )}
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
                            {/* Industry Top News */}
                            {news.slice(24, 28).length > 0 && <div className='national-events'>
                                <div className='national-events-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='national-events-cards'>
                                        {news ? news.slice(24, 28).map((news, index) => (
                                            <NewsCardFour key={index} news={news} />
                                        )) : <p>No News to display</p>}
                                    </div>
                                </div>
                            </div>}
                        </>
                    )}
                     {isLoading && <div className='loading-indicator'>Loading...</div>}
                {loadCount >= 3 &&
                    (
                        <>
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
                            {/* Industry News Updates */}
                            {news.slice(28, 32).length > 0 && <div className='latest-news-container'>
                                <div className='latest-news-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='latest-news-cards'>
                                        {news && news.length > 0 ? (
                                            news.slice(28, 32).map((newws, index) => (
                                                <NewsCardThree key={index} news={newws} allNewsData={news} />
                                            ))
                                        ) : (
                                            <p>No News To Display</p>
                                        )}
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
                            {/* Industry Top News */}
                            {news.slice(32, 36).length > 0 && <div className='national-events'>
                                <div className='national-events-details'>
                                    <div className='latest-news-heading'>
                                        <h2 className='latest-news-text'>Latest Top News</h2>
                                        {/* <Link className='latest-news-link'>View all</Link> */}
                                    </div>
                                    <div className='national-events-cards'>
                                        {news ? news.slice(32, 36).map((news, index) => (
                                            <NewsCardFour key={index} news={news} />
                                        )) : <p>No News to display</p>}
                                    </div>
                                </div>
                            </div>}
                        </>
                    )}

                {/* {loadCount < 3 && (
                    <div className='load-more-container'>
                        <button className='all-News-load-more-button' onClick={handleLoadMore}>Load More</button>
                    </div>
                )} */}
            </div>
        )
    }

    export default LatestNews
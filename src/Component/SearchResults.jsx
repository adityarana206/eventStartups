import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import LoadingAnimation from "./LoadingAnimation";
import animationData from "../Assets/Loading/Loading.json";
import Dates from "../Assets/EventDetails/Date";
import NewsCardThree from "./NewsCards/AllNewsCards/NewsCardThree";
import NewsCardFour from "./NewsCards/AllNewsCards/NewsCardFour";
import EventsCard from "./NewsCards/EventsCard";
import WhatsappIcon from "../Assets/News/companyDetails/WhatsappIcon";
import InstagramIcon from "../Assets/News/companyDetails/InstagramIcon";
import InternetIcon from "../Assets/News/companyDetails/InternetIcon";
import LinkedInIcon from "../Assets/News/companyDetails/LinkedInIcon";

const UpcomingEvents = ({ events }) => {
  const navigate = useNavigate();

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, "-") // Replace each '|' with a single '-'
      .replace(/[^a-z0-9'-]+/g, "-") // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
      .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
      .replace(/^-|-$/g, ""); // Remove any non-word characters except dashes
  };

  const handleCardClick = (eventname) => {
    navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // 4-20 are all 'th'
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} '${year}`;
  }

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-contain">
        <h2 className="upcoming-events-title">{events.eventname}</h2>
        <span className="upcoming-event-date">
          <Dates /> {formatDate(events.startdate)}
        </span>
      </div>
      <div>
        <button
          className="upcoming-register-button"
          onClick={() => handleCardClick(events.eventname)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

const SearchResults = ({ newsItems, eventData }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      filterNews(newsItems, query); // Filter the newsItems based on the query
    }
  }, [query, newsItems]);

  // useEffect(() => {
  //     const fetchResults = async () => {
  //         try {
  //             setLoading(true);
  //             const response = await axios.get(`http://localhost:5001/event-detail`);
  //             let data = response.data.data
  //             // const currentDate = new Date();
  //             // const filteredArray = data.filter(item =>
  //             //     item.activity &&
  //             //     item.eventtype === 'Public' &&
  //             //     new Date(item.startdate) > currentDate
  //             // );
  //             const filteredArray = response.data.data.filter(item => item.activity);
  //             filterResults(filteredArray, query);
  //         } catch (error) {
  //             setError('Error fetching search results');
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     if (query) {
  //         fetchResults();
  //     }
  // }, [query]);

  // const filterResults = (data, query) => {
  //     const lowerCaseQuery = query.toLowerCase();
  //     const queryWords = lowerCaseQuery.split(/\s+/);
  //     const filtered = data.filter(item => {
  //         const eventWords = item.eventname.toLowerCase().split(/\s+/);
  //         const matchesExactWords = queryWords.every(queryWord =>
  //             eventWords.includes(queryWord) ||
  //             item.location.includes(queryWord) ||
  //             item.city.includes(queryWord) ||
  //             item.industry.includes(queryWord)
  //         );
  //         const matchesInitialWords = eventWords.some(eventWord =>
  //             eventWord.startsWith(queryWords[0])
  //         );
  //         return matchesExactWords || matchesInitialWords;
  //     });
  //     setFilteredResults(filtered);
  //     // const lowerCaseQuery = query.toLowerCase();
  //     // const queryWords = lowerCaseQuery.split(/\s+/);
  //     // const filtered = data.filter(item => {
  //     //     const eventWords = item.eventname.toLowerCase().split(/\s+/);

  //     //     eventWords.toLowerCase().includes(queryWords) ||
  //     //         item.location.toLowerCase().includes(queryWords) ||
  //     //         item.city.toLowerCase().includes(queryWords) ||
  //     //         item.industry.toLowerCase().includes(queryWords)
  //     // });
  //     // setFilteredResults(filtered);
  // };
  console.log(filteredResults, "filter");

  const filterNews = (newsItems, query) => {
    if (!newsItems || !query) return [];

    const lowerCaseQuery = query.toLowerCase();
    let filteredNews = [];

    newsItems.forEach((item) => {
      // Check if the industry matches the selected industry and if the item has active news and rssContent
      if (item.activity && Array.isArray(item.rssContent)) {
        item.rssContent.forEach((news) => {
          // Check if the title or industry matches the query
          const eventWords = news.title.toLowerCase().split(/\s+/);
          const titleMatches =
            eventWords && eventWords.includes(lowerCaseQuery);
          const industryMatches = item.industry
            .toLowerCase()
            .includes(lowerCaseQuery);

          // If either title or industry matches the query, push to the filteredNews array
          if (titleMatches || industryMatches) {
            filteredNews.push({
              newsDetails: news,
              parentDetails: {
                industry: item.industry,
                icon: item.icon,
                title: item.title,
              },
            });
          }
        });
      }
    });

    // Sort the filtered news by publishDate (newest first)
    filteredNews.sort(
      (a, b) =>
        new Date(b.newsDetails.publishDate) -
        new Date(a.newsDetails.publishDate),
    );

    if (filteredNews.length === 0) {
      setError(true); // Set error state if no news is found
    } else {
      setError(false); // Clear error state if results are found
    }

    setFilteredResults(filteredNews); // Store the filtered and formatted results
    setLoading(false); // Stop loading
  };

  const handleReadMoreClick = () => {
    window.open("https://chat.whatsapp.com/K0BvjFBrJJ5E2UOt2RpXiL", "_blank");
  };

  if (loading) {
    return <LoadingAnimation animationData={animationData} />;
  }

  console.log(filteredResults, "filtered results");

  return (
    <div className="search-container">
      <h1 className="heading">All News for "{query}"</h1>
      {/* {loading && <div className='loading' ><LoadingAnimation animationData={animationData} /></div>}
            <div className="industry-grid">
                {filteredResults.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div> */}
      {error && (
        <div className="error-container">
          <img
            src={
              "https://res.cloudinary.com/dffy79nhw/image/upload/v1726074687/Page_not_found_new_tizdys.png"
            }
            alt="No results found"
            className="page-not-found"
          />
        </div>
      )}
      {
        <div className="spcific-industry-container">
          {filteredResults.slice(0, 4).length > 0 && (
            <div className="latest-news-container">
              {filteredResults.slice(0, 4).length > 0 && (
                <div className="industry-news-details">
                  <div className="latest-news-heading">
                    <h2 className="latest-news-text">Latest News</h2>
                  </div>
                  <div className="latest-news-cards">
                    {filteredResults && filteredResults.length > 0 ? (
                      filteredResults
                        .slice(0, 4)
                        .map((newws, index) => (
                          <NewsCardThree
                            key={index}
                            news={newws}
                            allNewsData={filteredResults}
                          />
                        ))
                    ) : (
                      <p>No News To Display</p>
                    )}
                  </div>
                </div>
              )}
              {eventData.slice(0, 5).length > 0 && (
                <div className="industry-events">
                  <h2 className="upcoming-event-text">Upcoming Events</h2>
                  <div className="upcoming-event-cards">
                    {eventData.slice(0, 5).map((event, index) => {
                      return (
                        <div className="upcoming-event-card" key={index}>
                          <UpcomingEvents events={event} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {filteredResults.slice(4, 8).length > 0 && (
            <div className="latest-news-container">
              <div className="latest-news-details">
                <div className="latest-news-heading">
                  <h2 className="latest-news-text">Global updates</h2>
                  <Link className="latest-news-link">View all</Link>
                </div>
                <div className="latest-news-cards">
                  {filteredResults && filteredResults.length > 0 ? (
                    filteredResults
                      .slice(4, 8)
                      .map((newws, index) => (
                        <NewsCardThree
                          key={index}
                          news={newws}
                          allNewsData={filteredResults}
                        />
                      ))
                  ) : (
                    <p>No News To Display</p>
                  )}
                </div>
              </div>
              <div className="company-details-container">
                <div className="company-details-subcontainer">
                  <div className="company-subdetails">
                    <div className="company-details-icon">
                      <WhatsappIcon />
                      <div className="company-text">
                        <span className="company-subtext">20k</span>
                        <span className="company-smalltext">
                          Opt-in Members
                        </span>
                      </div>
                    </div>
                    <div className="company-details-icon">
                      <InstagramIcon />
                      <div className="company-text">
                        <span className="company-subtext">390k</span>
                        <span className="company-smalltext">Followers</span>
                      </div>
                    </div>
                  </div>
                  <div className="company-subdetails">
                    <div className="company-details-icon">
                      <InternetIcon />
                      <div className="company-text">
                        <span className="company-subtext">15</span>
                        <span
                          style={{ width: "70px" }}
                          className="company-smalltext"
                        >
                          Presence in countries
                        </span>
                      </div>
                    </div>
                    <div className="company-details-icon">
                      <LinkedInIcon />
                      <div className="company-text">
                        <span className="company-subtext">31k+</span>
                        <span className="company-smalltext">Followers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="company-button"
                  onClick={handleReadMoreClick}
                >
                  Join our Community
                </button>
              </div>
            </div>
          )}
          {filteredResults.slice(8, 12).length > 0 && (
            <div className="latest-news-container">
              {filteredResults.slice(8, 12).length > 0 && (
                <div className="industry-news-details">
                  <div className="latest-news-heading">
                    <h2 className="latest-news-text">Latest News</h2>
                  </div>
                  <div className="latest-news-cards">
                    {filteredResults && filteredResults.length > 0 ? (
                      filteredResults
                        .slice(8, 12)
                        .map((newws, index) => (
                          <NewsCardThree
                            key={index}
                            news={newws}
                            allNewsData={filteredResults}
                          />
                        ))
                    ) : (
                      <p>No News To Display</p>
                    )}
                  </div>
                </div>
              )}
              {eventData.slice(5, 10).length > 0 && (
                <div className="industry-events">
                  <h2 className="upcoming-event-text">Upcoming Events</h2>
                  <div className="upcoming-event-cards">
                    {eventData.slice(5, 10).map((event, index) => {
                      return (
                        <div className="upcoming-event-card" key={index}>
                          <UpcomingEvents events={event} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {filteredResults.slice(12, 16).length > 0 && (
            <div className="latest-news-container">
              {filteredResults.slice(12, 16).length > 0 && (
                <div className="industry-news-details">
                  <div className="latest-news-heading">
                    <h2 className="latest-news-text">Latest News</h2>
                  </div>
                  <div className="latest-news-cards">
                    {filteredResults && filteredResults.length > 0 ? (
                      filteredResults
                        .slice(12, 16)
                        .map((newws, index) => (
                          <NewsCardThree
                            key={index}
                            news={newws}
                            allNewsData={filteredResults}
                          />
                        ))
                    ) : (
                      <p>No News To Display</p>
                    )}
                  </div>
                </div>
              )}
              {eventData.slice(10, 15).length > 0 && (
                <div className="industry-events">
                  <h2 className="upcoming-event-text">Upcoming Events</h2>
                  <div className="upcoming-event-cards">
                    {eventData.slice(10, 15).map((event, index) => {
                      return (
                        <div className="upcoming-event-card" key={index}>
                          <UpcomingEvents events={event} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {filteredResults.slice(16, 20).length > 0 && (
            <div className="latest-news-container">
              {filteredResults.slice(16, 20).length > 0 && (
                <div className="industry-news-details">
                  <div className="latest-news-heading">
                    <h2 className="latest-news-text">Latest News</h2>
                  </div>
                  <div className="latest-news-cards">
                    {filteredResults && filteredResults.length > 0 ? (
                      filteredResults
                        .slice(16, 20)
                        .map((newws, index) => (
                          <NewsCardThree
                            key={index}
                            news={newws}
                            allNewsData={filteredResults}
                          />
                        ))
                    ) : (
                      <p>No News To Display</p>
                    )}
                  </div>
                </div>
              )}
              {eventData.slice(15, 20).length > 0 && (
                <div className="industry-events">
                  <h2 className="upcoming-event-text">Upcoming Events</h2>
                  <div className="upcoming-event-cards">
                    {eventData.slice(15, 20).map((event, index) => {
                      return (
                        <div className="upcoming-event-card" key={index}>
                          <UpcomingEvents events={event} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {filteredResults.slice(20, 24).length > 0 && (
            <div className="latest-news-container">
              {filteredResults.slice(20, 24).length > 0 && (
                <div className="industry-news-details">
                  <div className="latest-news-heading">
                    <h2 className="latest-news-text">Latest News</h2>
                  </div>
                  <div className="latest-news-cards">
                    {filteredResults && filteredResults.length > 0 ? (
                      filteredResults
                        .slice(20, 24)
                        .map((newws, index) => (
                          <NewsCardThree
                            key={index}
                            news={newws}
                            allNewsData={filteredResults}
                          />
                        ))
                    ) : (
                      <p>No News To Display</p>
                    )}
                  </div>
                </div>
              )}
              {eventData.slice(25, 30).length > 0 && (
                <div className="industry-events">
                  <h2 className="upcoming-event-text">Upcoming Events</h2>
                  <div className="upcoming-event-cards">
                    {eventData.slice(25, 30).map((event, index) => {
                      return (
                        <div className="upcoming-event-card" key={index}>
                          <UpcomingEvents events={event} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default SearchResults;

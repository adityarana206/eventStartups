import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import "./NewsDetails.css";
import NewsCardThree from "../NewsCards/AllNewsCards/NewsCardThree";
import WhatsappIcon from "../../Assets/News/companyDetails/WhatsappIcon";
import InstagramIcon from "../../Assets/News/companyDetails/InstagramIcon";
import InternetIcon from "../../Assets/News/companyDetails/InternetIcon";
import LinkedInIcon from "../../Assets/News/companyDetails/LinkedInIcon";
import Dates from "../../Assets/EventDetails/Date";
import EventsCard from "./EventsCard";
import LoadingAnimation from "../LoadingAnimation";
import animationData from "../../Assets/Loading/Loading.json";

const UpcomingEvents = ({ events }) => {
  const navigate = useNavigate();

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, "-")
      .replace(/[^a-z0-9'-]+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const truncateEventName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
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
        <h2 className="upcoming-events-title">
          {truncateEventName(events.eventname, 50)}
        </h2>
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

function NewsDetails({ eventData, newsItems }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const location = useLocation();
  const { year, month, day, title } = useParams();
  const { news, similar, filteredEventData } = location.state || {};
  const { state } = location;

  useEffect(() => {
    if (state && state.news) {
      setSelectedNews(state.news);
    } else {
      // Filter the news item from the newsItems array
      const foundNews = findNewsByParams(newsItems, year, month, day, title);
      setSelectedNews(foundNews);
    }
  }, [year, month, day, title, newsItems, state]);
  console.log(newsItems, "newsitems");

  const findNewsByParams = (newsItems, year, month, day, title) => {
    // Loop through the newsItems to find the matching news item based on date and title
    for (let item of newsItems) {
      if (item.activity && Array.isArray(item.rssContent)) {
        for (let news of item.rssContent) {
          const newsDate = new Date(news.publishDate);
          const formattedDate = `${newsDate.getFullYear()}-${String(newsDate.getMonth() + 1).padStart(2, "0")}-${String(newsDate.getDate()).padStart(2, "0")}`;
          const slugTitle = news.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          if (
            formattedDate === `${year}-${month}-${day}` &&
            slugTitle === title
          ) {
            return {
              newsDetails: news,
              parentDetails: {
                industry: item.industry,
                icon: item.icon,
                title: item.title,
              },
            };
          }
        }
      }
    }
    return null; // Return null if no matching news item is found
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if necessary
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // Get the month name abbreviation
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day} ${month}'${year}`;
  }

  const extractTextFromPTags = (htmlContent) => {
    const pTagContents = [];
    const pTagRegex = /<p\b[^>]*>(.*?)<\/p>/gis; // More robust regex to match <p> tags with attributes
    let match;

    // Extract text within <p> tags
    while ((match = pTagRegex.exec(htmlContent)) !== null) {
      const cleanedContent = match[1].replace(/<[^>]*>?/gm, ""); // Remove any HTML tags inside <p> content
      if (cleanedContent.trim()) {
        pTagContents.push(cleanedContent.trim());
      }
    }

    let finalText = "";
    // If <p> tags found, join their contents
    if (pTagContents.length > 0) {
      finalText = pTagContents.join(" ");
    } else {
      // Fallback: remove all HTML tags and return plain text from the entire HTML
      finalText = htmlContent.replace(/<[^>]*>?/gm, "");
    }

    // Check if the final text exceeds 200 characters
    if (finalText.length > 500) {
      return finalText.substring(0, 499) + "..."; // Truncate and add ellipsis
    }

    return finalText;
  };

  const handleReadMoreClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error('No URL provided for the "Read more" link', url);
    }
  };

  const handleClick = () => {
    window.open("https://chat.whatsapp.com/K0BvjFBrJJ5E2UOt2RpXiL", "_blank");
  };

  const nationalEvents = (eventData || []).filter(
    (event) => event.modeofevent === "National",
  );

  const indusrtyEvents = (eventData || []).filter((event) => {
    if (news && news.parentDetails && news.parentDetails.industry) {
      return (
        event.industry.toLowerCase() ===
        news.parentDetails.industry.toLowerCase()
      );
    }
    return false;
  });

  console.log(selectedNews, "selected news");

  useEffect(() => {
    setSelectedNews(news);
    console.log(similar, "similaer news");
  }, [news, similar]);

  if (!selectedNews) {
    return (
      <div className="loading">
        <LoadingAnimation animationData={animationData} />
      </div>
    ); // Add a loading indicator
  }

  return (
    <div className="news-details-container">
      <div className="news-detail-div">
        <div className="news-details-header">
          <div className="news-details-title-details">
            <h1 className="news-details-title">
              {selectedNews.newsDetails?.title || "No Title Available"}
            </h1>
            <div className="news-details-more-details">
              <div className="news-details-icon-name">
                <div className="news-details-icon">
                  <img
                    src={
                      selectedNews.parentDetails?.icon
                        ? selectedNews.parentDetails.icon.startsWith("http")
                          ? selectedNews.parentDetails.icon
                          : `/api/${selectedNews.parentDetails.icon.replace(/\\/g, "/").replace("uploads/", "")}`
                        : ""
                    }
                    alt=""
                  />
                </div>
                <span className="news-details-souce-name">
                  {selectedNews.parentDetails?.title || "No Source Available"}
                </span>
              </div>
              <div className="news-details-dates">
                <span className="news-details-date">
                  {formatDate(selectedNews.newsDetails?.publishDate)}
                </span>
              </div>
              <div className="news-details-publisher">
                <span className="news-details-publisher-name">
                  {selectedNews.newsDetails?.author || "Unknown Author"}
                </span>
              </div>
            </div>
          </div>
          <div className="news-details-banner">
            <img
              src={selectedNews.newsDetails?.imageUrl || ""}
              alt="News Image"
            />
          </div>
          <div className="news-details-dis">
            <span className="news-details-discription">
              {extractTextFromPTags(selectedNews.newsDetails?.description)}
            </span>
            <button
              className="news-details-button"
              onClick={() =>
                handleReadMoreClick(selectedNews.newsDetails?.link)
              }
            >
              Read more
            </button>
          </div>
        </div>
        {indusrtyEvents.slice(0, 5).length > 0 ? (
          <div className="allnews-events">
            <h2 className="upcoming-event-text">Upcoming Events</h2>
            <div className="upcoming-event-cards">
              {indusrtyEvents ? (
                indusrtyEvents.slice(0, 5).map((event, index) => (
                  <div className="upcoming-event-card" key={index}>
                    <UpcomingEvents events={event} />
                  </div>
                ))
              ) : (
                <p>No Events to display</p>
              )}
            </div>
          </div>
        ) : (
          <div className="allNews-ggogle-ads">Google Ads</div>
        )}
      </div>
      {/* similar Events */}
      <div className="latest-news-container">
        <div className="latest-news-details">
          <div className="latest-news-heading">
            <h2 className="latest-news-text">Similar News</h2>
            {/* <Link to={'#'} className='latest-news-link'>View all</Link> */}
          </div>
          <div className="latest-news-cards">
            {similar ? (
              similar.map((news, index) => (
                <NewsCardThree key={index} news={news} allNewsData={similar} />
              ))
            ) : (
              <p>No News to display</p>
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
                  <span className="company-smalltext">Opt-in Members</span>
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
                  <span style={{ width: "70px" }} className="company-smalltext">
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
          <button className="company-button" onClick={handleClick}>
            Join our Community
          </button>
        </div>
      </div>
      {/* National Events */}
      <div className="national-events">
        <div className="national-events-details">
          <div className="latest-news-heading">
            <h2 className="latest-news-text">National Events</h2>
            <Link to={"/event"} className="national-latest-news-link">
              View all
            </Link>
          </div>
          <div className="national-events-cards">
            {nationalEvents.length > 0 ? (
              nationalEvents.slice(0, 4).map((event, index) => (
                <div className="national-event-card" key={index}>
                  <EventsCard event={event} />
                </div>
              ))
            ) : (
              <p>No National Events to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetails;

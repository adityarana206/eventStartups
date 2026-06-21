import React from "react";
import "./Aboutus.css";
import { useNavigate } from "react-router-dom";
import Dates from "../Assets/EventDetails/Date";
import LocationPopup from "./LocationPopup";

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
    const recentlyViewed =
      JSON.parse(sessionStorage.getItem("recentlyViewedEvents")) || [];
    if (!recentlyViewed.includes(eventname)) {
      recentlyViewed.push(sanitizeEventNameForURL(eventname));
      sessionStorage.setItem(
        "recentlyViewedEvents",
        JSON.stringify(recentlyViewed.slice(-5)),
      );
    }
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
function Aboutus({
  eventData,
  setSelectedLocation,
  isPopupOpen,
  setIsPopupOpen,
}) {
  const safeEventData = eventData || [];

  const handleSelectLocation = (location) => {
    // Set the selected location
    setSelectedLocation(location.city);
    setIsPopupOpen(false);
    localStorage.setItem("popupClosed", "true");
  };

  const uniqueNationalLocations = [
    ...new Set(
      safeEventData
        .filter((event) => event.modeofevent === "National")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "National" }));

  const uniqueInternationalLocations = [
    ...new Set(
      safeEventData
        .filter((event) => event.modeofevent === "International")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "International" }));

  return (
    <>
      <div className="about-us-container">
        <LocationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSelectLocation={handleSelectLocation}
          national={uniqueNationalLocations}
          international={uniqueInternationalLocations}
        />
        <div className="about-us-div-one">
          <div className="about-us-text-div">
            <h1 className="about-text">About Us</h1>
            <span className="about-us-discription">
              StartupNews.fyi is India’s leading news & technology media company
              that focuses on Startups in India and top stories across the
              globe. From latest news to the unicorns, we cover everything that
              happens in Startup World. Within a short span of time we have
              placed a great trust with the startups & reached to over 2 million
              enthusiasts. Whether it is the in-person meetups and international
              delegations SNFYI has served the ecosystem and helped
              several startups and investors to connect & spread the word
              through a single channel.
            </span>
          </div>
          <div className="about-us-details-div">
            <div className="about-us-sub-detail">
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  Send your press release to
                </h2>
                <span className="about-us-details-emails">
                  pressrelease@startupnews.fyi
                </span>
              </div>
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  For advertising and promotion
                </h2>
                <span className="about-us-details-emails">
                  promotions@startupnews.fyi
                </span>
              </div>
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  Do give us feedback at
                </h2>
                <span className="about-us-details-emails">
                  feedback@startupnews.fyi
                </span>
              </div>
            </div>
            <div className="about-us-sub-detail">
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  For Events and Partnerships
                </h2>
                <span className="about-us-details-emails">
                  events@startupnews.fyi
                </span>
              </div>
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  To work for us write to
                </h2>
                <span className="about-us-details-emails">
                  jobs@startupnews.fyi
                </span>
              </div>
              <div className="about-us-detail-div">
                <h2 className="about-us-details-heading">
                  News Alert / Fake News alert
                </h2>
                <span className="about-us-details-emails">
                  https://wa.me/919205412305
                </span>
              </div>
            </div>
          </div>
          <div className="about-us-icon">
            <div className="about-us-icons">
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_xysijx.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">380K+</h2>
                  <span className="about-us-text">Follower</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219858/Vector_1_jmxt6y.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">20k+</h2>
                  <span className="about-us-text">Opt-in Group Members</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images" id="about-us-icon-strach">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Group_fhb6xo.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">40+</h2>
                  <span className="about-us-text">E-cell Partnerships</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images" id="about-us-icon-strach">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_2_jaaw2p.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">7000+</h2>
                  <span className="about-us-text">Founders Connected</span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="about-us-icons">
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_xysijx.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">5M+</h2>
                  <span className="about-us-text">Monthly Reach</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_3_ilkc80.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">31k+</h2>
                  <span className="about-us-text">Follower</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Group_633126_qsacko.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">7</h2>
                  <span className="about-us-text">
                    International Delegations
                  </span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_4_mndco8.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">350+</h2>
                  <span className="about-us-text">Startup Mixers</span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="about-us-icons">
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Vector_3_ilkc80.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">150k+</h2>
                  <span className="about-us-text">Monthly Impressions</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Group_1_fdbcws.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">45k+</h2>
                  <span className="about-us-text">Avg. Post / Reel Reach</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219857/Group_2_nqfrct.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">24</h2>
                  <span className="about-us-text">Presence In Countries</span>
                </div>
              </div>
              <div className="about-us-icon-div">
                <div className="about-icon-images">
                  <img
                    src={
                      "https://res.cloudinary.com/dffy79nhw/image/upload/v1726219858/Vector_5_ine8nm.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-us-icon-texts">
                  <h2 className="about-us-value">1M +</h2>
                  <span className="about-us-text">
                    Monthly Website Impressions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-us-div-two">
          <div className="about-us-events">
            <h2 className="upcoming-event-text">Upcoming Events</h2>
            <div className="upcoming-event-cards">
              {eventData ? (
                eventData.slice(0, 5).map((event, index) => (
                  <div className="upcoming-event-card" key={index}>
                    <UpcomingEvents events={event} />
                  </div>
                ))
              ) : (
                <p>No Events to display</p>
              )}
            </div>
          </div>
          <div className="about-us-contact">
            <h2 className="about-us-addres-text">Communication Address</h2>
            <div className="about-us-contact-details">
              <span className="about-us-contact-text">
                DOTFYI Media Ventures Private Limited.
              </span>
              <span className="about-us-contact-text">
                AltF Spaces 5th floor, Wing A Statesman House,Barakhamba Road,
                Delhi, India – 110001
              </span>
              <span className="about-us-contact-text">
                CIN No. : U22100DL2022PTC403240
              </span>
              <span className="about-us-contact-text">
                Contact Person : Kapil Suri
              </span>
              <span className="about-us-contact-text">
                Contact Number : +91 98990 08322
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./EventDetails.css"; // Importing the CSS file for styles
import Button from "../Component/Button";
import Org from "../Assets/org.png";
import Phone from "../Assets/EventDetails/Phone";
import Email from "../Assets/EventDetails/Email";
import Instagram from "../Assets/EventDetails/Instagram";
import Linkedin from "../Assets/EventDetails/Linkedin";
import Twitter from "../Assets/EventDetails/Twitter";
import Industry from "../Assets/EventDetails/Industry";
import Dates from "../Assets/EventDetails/Date";
import Time from "../Assets/EventDetails/Time";
import Location from "../Assets/EventDetails/Location";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../Component/EventCard";
// import LoadingAnimation from '../Component/LoadingAnimation';
// import animationData from '../Assets/Loading/Loading.json'
import HoverableIcon from "../Component/HoverableIcons";
import HoverInstagram from "../Assets/EventDetails/HoverInstagram";
import HoverLinkedIn from "../Assets/EventDetails/HoverLinkedIn";
import HoverTwitter from "../Assets/EventDetails/HoverTwitter";
import { Helmet } from "react-helmet";
import LocationPopup from "./LocationPopup";
import Loading from "../Component/Loading";

const Header = ({ eventData }) => {
  const currentDate = new Date();
  const eventStartDate = new Date(eventData.startdate);

  const bannerImage = eventData.image
    ? eventData.image.startsWith("http")
      ? eventData.image
      : `/api/${eventData.image.replace(/\\/g, "/").replace("uploads/", "")}`
    : "";
  const soldOutOverlayImage =
    "https://res.cloudinary.com/dffy79nhw/image/upload/v1726729827/SoldOut_fqsxfk.png";

  const isEventSoldOut = eventStartDate < currentDate;

  return (
    <div className="header">
      <div className="header-image">
        <img src={bannerImage} alt="StartupNews Logo" />
        {isEventSoldOut && <img src={soldOutOverlayImage} alt="Sold Out" />}
      </div>
      <div className="about-discription">
        <div className="about-container">
          <h1 className="about">About</h1>
        </div>
        <div
          className="event-discription"
          dangerouslySetInnerHTML={{ __html: eventData.description }}
        />
      </div>
    </div>
  );
};

const EventDetail = ({ eventData }) => {
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

  function formatTimeRange(startDateTimeString, endDateTimeString) {
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      let hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const period = hours >= 12 ? "pm" : "am";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'

      // Add leading zero to minutes if needed
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}${formattedMinutes !== "00" ? `:${formattedMinutes}` : ""}${period}`;
    };

    const startTime = formatTime(startDateTimeString);
    const endTime = formatTime(endDateTimeString);

    return `${startTime}-${endTime}`;
  }
  function limitWords(text, wordLimit = 5) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="event-details">
      <h1 className="event-heading">{limitWords(eventData.eventname, 8)}</h1>
      <div className="event-subdetails">
        <p className="detail">
          <strong>
            <Industry />{" "}
          </strong>{" "}
          <span>{eventData.industry}</span>
        </p>
        <p className="detail">
          <strong>
            <Dates />{" "}
          </strong>{" "}
          <span>{formatDate(eventData.startdate)}</span>
        </p>
        <p className="detail">
          <strong>
            <Time />{" "}
          </strong>{" "}
          <span>{formatTimeRange(eventData.startdate, eventData.enddate)}</span>
        </p>
        <p className="location-detail">
          <strong>
            <Location />
          </strong>
          <a
            href={eventData.address}
            className="city-link"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{limitWords(eventData.location)}</span>
          </a>
        </p>
        {eventData.link ? (
          <a
            href={eventData.link}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="buy-now">Register Now</button>
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

// const TicketInfo = ({ eventData, ticketInfo, coupenInfo, eventId, organisationInfo, eventName }) => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [totalQuantity, setTotalQuantity] = useState(0);
//     const [couponCode, setCouponCode] = useState('');
//     const [couponValue, setCouponValue] = useState(10); // Coupon discount value
//     const [errorMessage, setErrorMessage] = useState('');
//     const [disable, setDisable] = useState(false)
//     const navigate = useNavigate();
//     const location = useLocation();

//     const ticketPrices = {
//         'Basic': ticketInfo[0]?.priceWithTax || 0,
//         'Regular': ticketInfo[1]?.priceWithTax || 0,
//         'Premium': ticketInfo[2]?.priceWithTax || 0,
//     };

//     const [ticket1, setTicket1] = useState(0);
//     const [ticket2, setTicket2] = useState(0);
//     const [ticket3, setTicket3] = useState(0);

//     useEffect(() => {
//         setCouponCode(coupenInfo[0]?.code);

//         const savedTickets = JSON.parse(sessionStorage.getItem('selectedTickets'));
//         if (savedTickets) {
//             const ticketCounts = savedTickets.reduce((counts, ticket) => {
//                 counts[ticket] = (counts[ticket] || 0) + 1;
//                 return counts;
//             }, {});
//             setTicket1(ticketCounts['Basic'] || 0);
//             setTicket2(ticketCounts['Regular'] || 0);
//             setTicket3(ticketCounts['Premium'] || 0);
//             const savedTotalPrice = savedTickets.reduce((total, ticket) => total + ticketPrices[ticket], 0);
//             const savedTotalQuantity = savedTickets.length;
//             setTotalPrice(savedTotalPrice);
//             setTotalQuantity(savedTotalQuantity);
//         }

//         return () => {
//             if (window.location.pathname !== '/attendee-details' && window.location.pathname !== '/event-details') {
//                 sessionStorage.removeItem('selectedTickets');
//                 sessionStorage.removeItem('orderSummary');
//             }
//         };
//     }, [coupenInfo, ticketPrices]);

//     useEffect(() => {
//         setDisable(totalQuantity === 0);
//     }, [totalQuantity]);

//     const handleBuyNow = () => {
//         const selectedTickets = [
//             ...Array(ticket1).fill('Basic'),
//             ...Array(ticket2).fill('Regular'),
//             ...Array(ticket3).fill('Premium')
//         ];
//         const orderSummary = selectedTickets.map((ticketType, index) => ({
//             id: index,
//             ticketType,
//             price: ticketPrices[ticketType]
//         }));

//         sessionStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
//         sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));
//         navigate('/attendee-details', { state: { selectedTickets, organisationInfo, orderSummary, ticketPrices, couponCode, couponValue, eventId, eventData, ticketInfo, eventName } });
//     };

//     return (
//         <div className="ticket-container">
//             <h2 className='ticket'>Choose Tickets</h2>
//             <div className='all-tickets' >
//                 {ticketPrices['Basic'] !== 0 && <div className="ticket-option">
//                     <div className='ticket-price'>
//                         <span>Early Bird Ticket</span>
//                         <span className="price">₹ {ticketPrices['Basic']}</span>
//                     </div>
//                     <Button count={ticket1} setCount={setTicket1} totalPrice={totalPrice} setTotalPrice={setTotalPrice} totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} ticketPrices={ticketPrices['Basic']} eventData={eventData} />
//                 </div>}
//                 {ticketPrices['Regular'] !== 0 && <div className="ticket-option">
//                     <div className='ticket-price'>
//                         <span>Regular Ticket</span>
//                         <span className="price">₹ {ticketPrices['Regular']}</span>
//                     </div>
//                     <Button count={ticket2} setCount={setTicket2} totalPrice={totalPrice} setTotalPrice={setTotalPrice} totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} ticketPrices={ticketPrices['Regular']} eventData={eventData} />
//                 </div>}
//                 {ticketPrices['Premium'] !== 0 && <div className="ticket-option">
//                     <div className='ticket-price'>
//                         <span>Premium Ticket</span>
//                         <span className="price">₹ {ticketPrices['Premium']}</span>
//                     </div>
//                     <Button count={ticket3} setCount={setTicket3} totalPrice={totalPrice} setTotalPrice={setTotalPrice} totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} ticketPrices={ticketPrices['Premium']} eventData={eventData} />
//                 </div>}
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}
//             <div className="total">
//                 <p className="total-price"><span >₹{totalPrice}</span> <span className='total-quantity'>Total Price:</span></p>
//                 <p className="total-price"> <span >{totalQuantity}</span><span className='total-quantity'> Total Quantity:</span></p>
//                 <button className="buy-now" disabled={disable} onClick={handleBuyNow}>Buy Now</button>
//             </div>
//         </div>
//     );
// };

const TicketInfo = ({
  eventData,
  ticketInfo,
  coupenInfo,
  eventId,
  organisationInfo,
  eventName,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState(
    coupenInfo[0] ? coupenInfo[0].amount : 0,
  ); // Coupon discount value
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  console.log(coupenInfo, "coupens");

  const [ticketCounts, setTicketCounts] = useState({});

  useEffect(() => {
    setCouponCode(coupenInfo[0]?.code);

    const savedTickets = JSON.parse(sessionStorage.getItem("selectedTickets"));
    if (savedTickets) {
      const counts = savedTickets.reduce((acc, ticket) => {
        acc[ticket] = (acc[ticket] || 0) + 1;
        return acc;
      }, {});

      setTicketCounts(counts);

      const savedTotalPrice = savedTickets.reduce((total, ticket) => {
        const ticketType = ticketInfo.find((t) => t.type === ticket);
        return total + (ticketType ? ticketType.priceWithTax : 0);
      }, 0);

      const savedTotalQuantity = savedTickets.length;
      setTotalPrice(savedTotalPrice);
      setTotalQuantity(savedTotalQuantity);
    }

    return () => {
      if (
        window.location.pathname !== "/attendee-details" &&
        window.location.pathname !== "/event-details"
      ) {
        sessionStorage.removeItem("selectedTickets");
        sessionStorage.removeItem("orderSummary");
      }
    };
  }, [coupenInfo, ticketInfo]);

  useEffect(() => {
    setDisable(totalQuantity === 0);
  }, [totalQuantity]);

  const handleBuyNow = () => {
    const selectedTickets = [];
    Object.entries(ticketCounts).forEach(([ticketType, count]) => {
      for (let i = 0; i < count; i++) {
        selectedTickets.push(ticketType);
      }
    });

    const orderSummary = selectedTickets.map((ticketType, index) => {
      const ticket = ticketInfo.find((t) => t.type === ticketType);
      return {
        id: index,
        ticketType,
        price: ticket ? ticket.priceWithTax : 0,
      };
    });

    sessionStorage.setItem("selectedTickets", JSON.stringify(selectedTickets));
    sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    navigate("/attendee-details", {
      state: {
        selectedTickets,
        organisationInfo,
        orderSummary,
        ticketPrices: ticketInfo,
        couponCode,
        couponValue,
        eventId,
        eventData,
        ticketInfo,
        eventName,
      },
    });
  };

  return (
    <div className="ticket-container">
      <h2 className="ticket">Choose Tickets</h2>
      <div className="all-tickets">
        {ticketInfo.map((ticket, index) => (
          <div key={index} className="ticket-option">
            <div className="ticket-price">
              <span>{ticket.type} Ticket</span>
              <span className="price">₹ {ticket.priceWithTax}</span>
            </div>
            <Button
              count={ticketCounts[ticket.type] || 0}
              setCount={(count) => {
                setTicketCounts((prev) => ({ ...prev, [ticket.type]: count }));
              }}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              totalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
              ticketPrices={ticket.priceWithTax}
              eventData={eventData}
            />
          </div>
        ))}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="total">
        <p className="total-price">
          <span>₹{totalPrice}</span>{" "}
          <span className="total-quantity">Total Price</span>
        </p>
        <p className="total-price">
          <span>{totalQuantity}</span>
          <span className="total-quantity"> Total Quantity</span>
        </p>
        <button className="buy-now" disabled={disable} onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

const OrganiserDetails = ({ eventData, organisationInfo }) => {
  if (
    !organisationInfo ||
    !organisationInfo.contactDetails ||
    organisationInfo.contactDetails.length === 0
  ) {
    return null; // or a fallback UI
  }
  return (
    <div className="organiser-details">
      <h2 className="organisation-text">Organisation Details</h2>
      <div className="organisation-header">
        <div className="organisation-image">
          <img src={organisationInfo?.logoImage || Org} alt="org" />
        </div>
        <h3 className="organisation-heading">
          {organisationInfo?.contactDetails[0]?.organiserName || "not avilable"}
        </h3>
      </div>
      <div className="organisation-subdetails">
        <div className="organisation-contact">
          <div className="organisation-phone">
            <Phone />
            <p
              style={{
                margin: "0px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#464646",
                fontFamily: "inter",
              }}
            >
              +91-
              {organisationInfo?.contactDetails[0]?.mobileNumber ||
                "not avilable"}
            </p>
          </div>
          <div className="organisation-email">
            <Email />
            <p
              style={{
                margin: "0px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#464646",
                fontFamily: "inter",
              }}
            >
              {organisationInfo?.contactDetails[0]?.email || "not avilable"}
            </p>
          </div>
        </div>
        {/* <div className='organisation-socialmedia'>
                    <p className='socialmedia-icons' >Social media:<NavLink target='_blank' to={`https://${organisationInfo.socialMediaLinks[0].url}`}><Instagram /></NavLink><NavLink to={`https://${organisationInfo.socialMediaLinks[1].url}`} target='_blank'> <Linkedin /></NavLink><NavLink to={`https://${organisationInfo.socialMediaLinks[2].url}`} target='_blank'> <Twitter /></NavLink></p>
                </div> */}
        <div className="organisation-socialmedia">
          <p className="socialmedia-icons">
            Social media:
            {organisationInfo.socialMediaLinks[0]?.url && (
              <HoverableIcon
                DefaultIcon={Instagram}
                HoverIcon={HoverInstagram}
                link={`https://${organisationInfo.socialMediaLinks[0]?.url}`}
              />
            )}
            {organisationInfo.socialMediaLinks[1]?.url && (
              <HoverableIcon
                DefaultIcon={Linkedin}
                HoverIcon={HoverLinkedIn}
                link={`https://${organisationInfo.socialMediaLinks[1]?.url}`}
              />
            )}
            {organisationInfo.socialMediaLinks[2]?.url && (
              <HoverableIcon
                DefaultIcon={Twitter}
                HoverIcon={HoverTwitter}
                link={`https://${organisationInfo.socialMediaLinks[2]?.url}`}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const SimilarEvents = ({ events }) => {
  const sliderRef = useRef(null);
  return (
    <div className="similar-events">
      <div className="industry-header">
        <h2 className="similar-events-title">Similar Events</h2>
        <Link to="/events-search" className="view-all">
          View all
        </Link>
      </div>
      <div className="events-grid" ref={sliderRef}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

function EventPoster({
  setSelectedLocation,
  isPopupOpen,
  setIsPopupOpen,
  alleventData,
}) {
  const { eventName } = useParams();
  const navigate = useNavigate();

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, "-") // Replace each '|' with a single '-'
      .replace(/[^a-z0-9'-]+/g, "-") // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
      .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
      .replace(/^-|-$/g, ""); // Remove any non-word characters except dashes
  };

  const mockEventsList = require("../mockData").mockEvents;
  const mockOrg =
    require("../mockData").mockOrganisationDetails.organisationDetails
      .organiserDetails;
  const foundEvent =
    mockEventsList.find(
      (e) => sanitizeEventNameForURL(e.eventname) === eventName,
    ) || mockEventsList[0];
  const filteredSimilar = mockEventsList.filter(
    (e) => e.industry === foundEvent.industry && e._id !== foundEvent._id,
  );

  const [eventData, setEventData] = useState(foundEvent);
  const [ticketInfo, setTicketInfo] = useState(foundEvent?.tickets || []);
  const [coupenInfo, setCoupenInfo] = useState(foundEvent?.coupons || []);
  const [organisationInfo, setOrganisationInfo] = useState(mockOrg);
  const [similarEvents, setSimilarEvents] = useState(
    filteredSimilar.length > 0 ? filteredSimilar : mockEventsList.slice(0, 3),
  );
  const [loadingOrganisation, setLoadingOrganisation] = useState(false);

  useEffect(() => {
    const targetEvent =
      mockEventsList.find(
        (e) => sanitizeEventNameForURL(e.eventname) === eventName,
      ) || mockEventsList[0];
    setEventData(targetEvent);
    setTicketInfo(targetEvent?.tickets || []);
    setCoupenInfo(targetEvent?.coupons || []);
    const targetSimilar = mockEventsList.filter(
      (e) => e.industry === targetEvent.industry && e._id !== targetEvent._id,
    );
    setSimilarEvents(
      targetSimilar.length > 0 ? targetSimilar : mockEventsList.slice(0, 3),
    );
  }, [eventName]);

  const fetchEventDetails = async () => {};
  const fetchOrganisationDetails = async (eventId) => {};

  //         console.log('Fetched all events:', allEvents);
  //         const similarEventsResponse = await axios.get('https://startupgpt.fyi/similar', {
  //             params: {
  //                 eventId: allEvents._id,
  //                 industry: allEvents.industry
  //             }
  //         });

  //         if (allEvents) {
  //             setEventData(allEvents);
  //             setTicketInfo(allEvents.tickets);
  //             setCoupenInfo(allEvents.coupons);
  //             setSimilarEvents(similarEventsResponse.data.data);

  //             await fetchOrganisationDetails(allEvents._id);
  //         } else {
  //             console.error(`Event not found: ${eventName}`);
  //             navigate('/404');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching event details:', error);
  //     }
  // };
  // fetchEventDetails and fetchOrganisationDetails are disabled since we pre-set mock state on render
  useEffect(() => {
    // Disabled to use mock data instantly on startup
  }, [eventName]);

  // console.log("Event Data 1", eventName)
  // console.log("Event Data 2", eventData)

  if (loadingOrganisation) {
    return (
      <div className="loading">
        {/* <LoadingAnimation animationData={animationData} /> */}
        <Loading />
      </div>
    );
  }

  const handleSelectLocation = (location) => {
    // Set the selected location
    setSelectedLocation(location.city);
    setIsPopupOpen(false);
    localStorage.setItem("popupClosed", "true");
  };

  const uniqueNationalLocations = [
    ...new Set(
      alleventData
        .filter((event) => event.modeofevent === "National")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "National" }));

  const uniqueInternationalLocations = [
    ...new Set(
      alleventData
        .filter((event) => event.modeofevent === "International")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "International" }));

  console.log(alleventData, "title data");
  return (
    <>
      <Helmet>
        {eventData?.seo?.title && <title>{eventData?.seo?.title}</title>}
        {eventData?.seo?.title && (
          <meta property="og:title" content={`${eventData?.seo?.title}`} />
        )}
        {eventData?.seo?.description && (
          <meta
            property="og:description"
            content={`${eventData?.seo?.description}`}
          />
        )}
        {eventData?.seo?.featuredImage && (
          <meta
            property="og:image"
            itemProp="image"
            content={
              eventData?.seo?.featuredImage &&
              `/api/${eventData?.seo?.featuredImage.replace(/\\/g, "/").replace("uploads/", "")}`
            }
          />
        )}
      </Helmet>
      <div className="event-poster">
        <LocationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSelectLocation={handleSelectLocation}
          national={uniqueNationalLocations}
          international={uniqueInternationalLocations}
        />
        <div className="events-datails">
          <div className="header-container">
            <Header eventData={eventData} />
          </div>
          <div className="events-container">
            <EventDetail eventData={eventData} />
            {eventData.link ? (
              ""
            ) : (
              <TicketInfo
                eventData={eventData}
                organisationInfo={organisationInfo}
                ticketInfo={ticketInfo}
                coupenInfo={coupenInfo}
                eventId={eventData._id}
                eventName={eventName}
              />
            )}
            {/* <TicketInfo eventData={eventData} organisationInfo={organisationInfo} ticketInfo={ticketInfo} coupenInfo={coupenInfo} eventId={eventData._id} eventName={eventName} /> */}
            {organisationInfo && (
              <OrganiserDetails organisationInfo={organisationInfo} />
            )}
          </div>
        </div>
        <div>
          {similarEvents.length > 0 && <SimilarEvents events={similarEvents} />}
        </div>
      </div>
    </>
  );
}

export default EventPoster;

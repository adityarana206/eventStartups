import React from "react";
import "./EventCard.css";
// import bannerImage from '../Assets/Frame.png'; // replace with actual path
import CalendarIcon from "../Assets/EventCard/CalandarIcon"; // replace with actual path
import ClockIcon from "../Assets/EventCard/ClockIcon"; // replace with actual path
import LocationIcon from "../Assets/EventCard/LocationIcon"; // replace with actual path
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
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
        JSON.stringify(recentlyViewed),
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
  function extractLocation(fullAddress) {
    // Split the address by commas
    const parts = fullAddress.split(",");

    // Check if there are more than two parts after splitting by commas
    if (parts.length > 2) {
      // Extract the parts starting from the third element (index 2) up to the fifth element (index 4)
      const location = parts
        .slice(0, 2)
        .map((part) => part.trim())
        .join(", ");
      return location;
    } else {
      // Return a default message if the address doesn't have enough parts
      return "Location not found";
    }
  }
  function limitWords(text, wordLimit = 5) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  // Example usage:
  // const startDateTimeString =
  // "2024-07-04T10:05:00.000Z";
  // const endDateTimeString = "2024-07-10T10:06:00.000Z";
  // console.log(formatTimeRange(startDateTimeString, endDateTimeString));
  const imageUrl = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `/api/${event.image.replace(/\\/g, "/").replace("uploads/", "")}`
    : "";
  return (
    <div
      className="event-card"
      onClick={() => handleCardClick(event.eventname)}
    >
      <img src={imageUrl} alt="Event Banner" className="event-banner" />
      <div className="event-content">
        <h3 className="event-title">{limitWords(event.eventname)}</h3>
        <div className="event-details-card">
          <div className="calander-clock">
            <div className="event-detail">
              <CalendarIcon className="event-icon" />
              <span>{formatDate(event.startdate)}</span>
            </div>
            <div className="event-detail">
              <ClockIcon className="event-icon" />
              <span>{formatTimeRange(event.startdate, event.enddate)}</span>
            </div>
          </div>
          <div className="event-detail">
            <div>
              <LocationIcon className="event-icon" />
            </div>
            <span className="event-card-location">
              {limitWords(event.location, 5)}
            </span>
          </div>
        </div>
        <div className="event-footer">
          <span className="event-price">
            {event?.tickets[0]?.priceWithTax !== 0
              ? "₹" + event?.tickets[0]?.priceWithTax
              : "N/A"}
          </span>
          <button
            className="register-button"
            onClick={() => handleCardClick(event.eventname)}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React, { useState, useEffect } from "react";
import axios from "axios";

function ResentlyViewed() {
  const mockEventsList = require("../mockData").mockEvents;
  const eventNamesArray =
    JSON.parse(sessionStorage.getItem("recentlyViewedEvents")) || [];
  const matchedEvents = mockEventsList.filter((e) => {
    const sanitizeEventNameForURL = (eventname) => {
      return eventname
        .toLowerCase()
        .replace(/\|/g, "-")
        .replace(/[^a-z0-9'-]+/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-|-$/g, "");
    };
    return eventNamesArray.includes(sanitizeEventNameForURL(e.eventname));
  });

  const [events, setEvents] = useState(
    matchedEvents.length > 0 ? matchedEvents : mockEventsList.slice(0, 2),
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Events are loaded directly and synchronously from mockEventsList
  }, []);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(events, "events");

  return (
    <div>
      <h2>Resently Viewd Event Details</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <h3>{event.eventname}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default ResentlyViewed;

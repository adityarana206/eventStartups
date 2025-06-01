import React, { useState, useEffect } from 'react'
import axios from 'axios';


function ResentlyViewed() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const eventNamesArray = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];

        const fetchEvents = async () => {
            if (eventNamesArray.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const fetchedEvents = [];
                for (const eventName of eventNamesArray) {
                    const response = await axios.get(
                        `https://start.startupgpt.fyi/events-details/${eventName}`
                    );
                    if (response.data && response.data.data) {
                        fetchedEvents.push(response.data.data);
                    }
                }
                setEvents(fetchedEvents);
            } catch (err) {
                setError('Error fetching events');
                console.error('Error:', err);
            } finally {
                setLoading(false); // Ensure loading state is turned off
            }
        };

        fetchEvents();
    }, []); // Remove eventNamesArray from the dependency array to avoid multiple API hits


    if (loading) {
        return <div>Loading event details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(events, 'events')

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
};


export default ResentlyViewed
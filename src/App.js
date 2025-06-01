import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import axios from 'axios';
import Footer from './Component/Footer';
// import FilterEventByCountery from './Component/HomePage/FilterEventByCountery';
import Home from './LandingPages/Home';
import Industry from './LandingPages/Industry';
import EventDetails from './LandingPages/EventDetails';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AttendeeDetails from './LandingPages/AttendeDetails';
import Events from './LandingPages/Events';
import Error from './LandingPages/Error';
import SearchResults from './Component/SearchResults';
import News from './LandingPages/News';
import NewsDetails from './Component/NewsCards/NewsDetails';
import ScrollToTop from './Component/ScrollToTop';
import Aboutus from './LandingPages/Aboutus';
import Privacyandpolicy from './LandingPages/Privacyandpolicy';
import Refund from './LandingPages/Refund';
import TermAndCondition from './LandingPages/TermAndCondition';
import Partners from './LandingPages/Partners';
import IndustryNews from './Component/NewsCards/IndustryNews';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || '');
  const [eventData, setEventData] = useState([])
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(!localStorage.getItem('popupClosed'));

  useEffect(() => {
    localStorage.setItem('selectedLocation', selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        console.log('Fetching event data from API');
        const response = await axios.get('https://snfyibackend.onrender.com/event-detail');
        const data = response.data.data;
        // const currentDate = new Date();

        // const filteredArray = data.filter(item =>
        //   item.activity &&
        //   item.eventtype === 'Public' &&
        //   new Date(item.startdate) > currentDate
        // );

        setEventData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  function extractImageUrlFromDescription(description) {
    const imgRegex = /<img[^>]+src="([^">]+)"/; // Regex to find img tag and capture src
    const match = description.match(imgRegex);
    return match ? match[1] : '/path/to/default-image.png'; // Return the match or a default image path
  }

  const fetchNewsData = async () => {
    try {
      const response = await axios.get('https://snfyibackend.onrender.com/news-fetch');
      const fetchedNewsData = response.data;

      const activeNewsItems = fetchedNewsData.filter(news => news.activity);
      const updatedNewsItems = await Promise.all(activeNewsItems.map(async (news) => {
        const RSS_TO_JSON_SERVICE_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(news.link)}`;
        try {
          const rssResponse = await axios.get(RSS_TO_JSON_SERVICE_URL);
          const fetchedItems = rssResponse.data.items.map(item => {
            const imageUrl = item.enclosure && item.enclosure.link
              ? item.enclosure.link
              : extractImageUrlFromDescription(item.description);

            return {
              title: item.title || 'No title available',
              publishDate: item.pubDate || 'No date available',
              author: item.author || 'Unknown author',
              description: item.description || 'No description available',
              imageUrl: imageUrl,
              link: item.link,
              industry: news.industry,
              publisher: rssResponse.data.feed.title,
            };
          });
          return {
            ...news,
            rssContent: fetchedItems,
          };
        } catch (error) {
          console.error(`Error fetching data from RSS URL ${news.link}:`, error);
          return { ...news, rssContent: [] };
        }
      }));

      setNewsItems(updatedNewsItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setLoading(false);
    }
  };

  // console.log(newsItems, 'news items')

  useEffect(() => {
    const loadNewsData = async () => {
      await fetchNewsData();
    };

    loadNewsData();

    // Poll for new data every 2 minutes
    const interval = setInterval(loadNewsData, 120000); // 120000 ms = 2 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    localStorage.setItem('popupClosed', 'true'); // Set a flag in localStorage when the popup is closed
  };

  return (
    <div className="App">
      <Router >
        <Navbar selectedLocation={selectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />
        <ScrollToTop />
        <Routes>
          <Route path='/events' element={<Home setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path='/industry/' element={<Industry setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path='/attendee-details' element={<AttendeeDetails setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path='/event/:eventName' element={<EventDetails alleventData={eventData} setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path='/events-search/' element={<Events setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path="/search" element={<SearchResults newsItems={newsItems} eventData={eventData} />} />
          {/* <Route path="events/event/:eventName" element={<Navigate to="event/:eventName" />} />
          <Route path="/events/events-search" element={<Navigate to="events-search" />} /> */}
          {/* News Section */}
          <Route path="/" element={<News setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />} />
          <Route path="/:year/:month/:day/:title" element={<NewsDetails eventData={eventData} newsItems={newsItems} />} />
          <Route path="/:industry" element={<IndustryNews newsItems={newsItems} eventData={eventData} />} />

          {/* Other routes */}
          <Route path='/about-us/' element={<Aboutus setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />} />
          <Route path='/privacy-policy/' element={<Privacyandpolicy setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />} />
          <Route path='/refund/' element={<Refund setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />} />
          <Route path='/terms-and-condition/' element={<TermAndCondition setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />} />
          <Route path='/partners/' element={<Partners setSelectedLocation={setSelectedLocation} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} eventData={eventData} />} />

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

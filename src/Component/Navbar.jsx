import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Hamburger from '../Assets/Navbar/Hamburger';
import SearchIcon from '../Assets/Navbar/SearchIcon';
import LocationIcon from '../Assets/Navbar/LocationIcon';
import MobileLogo from '../Assets/MobileLogo';

const Navbar = ({ selectedLocation, isPopupOpen, setIsPopupOpen, eventData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const isHomePageOrNewsDetails = location.pathname === '/' || /^\/\d{4}\/\d{2}\/\d{2}\/[^\/]+$/.test(location.pathname) || /^\/search(\?query=.*)?$/.test(location.pathname);

  useEffect(() => {
    setIsMobile(false);
  }, [selectedLocation]);

  // Handle search query change and filter suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = eventData.filter(event =>
        event.eventname && event.eventname.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      console.log(filteredSuggestions, 'events')
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, '-')             // Replace each '|' with a single '-'
      .replace(/[^a-z0-9'-]+/g, '-')   // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
      .replace(/--+/g, '-')            // Replace multiple consecutive hyphens with a single hyphen
      .replace(/^-|-$/g, '');   // Remove any non-word characters except dashes
  };

  const handleCardClick = (eventname) => {
    setSearchQuery(eventname);
    const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];
    if (!recentlyViewed.includes(eventname)) {
      recentlyViewed.push(sanitizeEventNameForURL(eventname));
      sessionStorage.setItem('recentlyViewedEvents', JSON.stringify(recentlyViewed.slice(-5)));
    }
    navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a href="/" className="desktop-logo">
          <img src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1726073757/logo_sy_3_2_l3m2k0.png'} alt="logo" />
        </a>
        <a href="/" className="mobile-logo">
          <MobileLogo />
        </a>

        <div className={'inputsandlocation'}>
          <form className={'searchInput'}>
            <div> <SearchIcon /></div>
            <input
              type="text"
              placeholder='Search for Events'
              className='sInput'
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              ref={inputRef}
              // disabled={true}
            />
          </form>
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestion-popup">
              <ul className="suggestion-box">
                {suggestions.map((event, index) => (
                  <li key={index} onClick={() => handleCardClick(event.eventname)}>
                    {event.eventname}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='location-explore-menu' >
        <div className='Location-box'>
          {/* <span className='location-icon'><LocationIcon /></span> */}
          {selectedLocation && (
            <span className="navbar-location" onClick={() => setIsPopupOpen(!isPopupOpen)}>{selectedLocation}</span>
          )}
          <span className='downarrow' style={{ cursor: 'pointer' }}>
            <img className='dropdown-icon' onClick={() => setIsPopupOpen(!isPopupOpen)} src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1726729803/Drop_Down_ecr1jx.png'} alt="dropdown" />
          </span>
        </div>
        {!isHomePageOrNewsDetails ?
          <div className='news-button'>
            <a href='/' className='Nbutton' >Explore News </a>
          </div>
          : <div className='news-button'>
            <a href='/events' className='Nbutton' >Explore Events </a>
          </div>}

        <div className='hamburger'><Hamburger /></div>
      </div>
      <ul className={isMobile ? "nav-links-mobile show" : "nav-links-mobile"}>
        <li><Link to={'https://startupnews.fyi/'}>News</Link></li>
        <li><a href="/">Events</a></li>
        <li><Link to={'https://startupnews.fyi/advertise-with-us/'}>Advertise</Link></li>
        <li><Link to={'https://startupnews.fyi/startup-videos/'}>Videos</Link></li>
        <li><Link to={'https://startupnews.fyi/about-startupnewsdotfyi/'}>About Us</Link></li>
        <li><Link to={'https://startupnews.fyi/event-category/international-events/'}>International</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Event.css';
import EventCard from '../Component/EventCard';
// import LoadingAnimation from '../Component/LoadingAnimation';
// import animationData from '../Assets/Loading/Loading.json';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../Component/ScrollToTop';
import LocationPopup from './LocationPopup';
import Loading from '../Component/Loading';
import Error from '../LandingPages/Error'


const FilterOnEvent = ({ onFilterChange, eventData, activeTimeFilter, setActiveTimeFilter }) => {

    const filters = [
        { label: 'Today', value: 'today' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'This Weekend', value: 'this-weekend' },
        { label: 'This Month', value: 'this-month' },
        { label: 'International', value: 'international' },
        // { label: 'Custom Date', value: 'custom-date' },
    ];

    const sliderRef = useRef(null);

    return (
        <div className="filter-container-event">
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#c6c6c6' }} >Time:</span>
            <div className='date-filters' ref={sliderRef}>
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        className={`filter-button-event ${activeTimeFilter === filter.value ? 'active' : ''}`}
                        onClick={() => { setActiveTimeFilter(filter.value); console.log(filter.value); onFilterChange(filter.value, eventData) }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const IndustryFilter = ({ onIndustryChange, activeIndustry, setActiveIndustry }) => {

    const industries = [
        { label: 'Startup Events', value: 'All' },
        { label: 'EdTech', value: 'EdTech' },
        { label: 'Fintech', value: 'Fintech' },
        { label: 'Ecommerce', value: 'Ecommerce' },
        { label: 'Deeptech', value: 'Deeptech' },
        { label: 'AirTech', value: 'AirTech' },
        { label: 'AI', value: 'ArtificialInteligence' },
        { label: 'AR/VR', value: 'AI/AR/VR' },
        { label: 'D2C', value: 'D2C' },
        { label: 'Mobality', value: 'Mobality' },
        { label: 'FoodTech', value: 'FoodTech' },
        { label: 'Web 3.0', value: 'Web3' },
        { label: 'Social media', value: 'SocialMedia' },
        { label: 'Technology', value: 'Technology' },
        { label: 'AgriTech', value: 'AgriTech' },
        { label: 'Government', value: 'Government' },
        { label: 'HealthTech', value: 'HealthTech' },
        { label: 'Hospitality', value: 'Hospitality' },
        { label: 'HR Tech', value: 'HRTech' },
        { label: 'Metaverse', value: 'Metaverse' },
        { label: 'Retail Estate Tech', value: 'RetailEstate' },
        { label: 'SaaS', value: 'SaaS' },
        { label: 'SpaceTech', value: 'SpaceTech' },
        { label: 'Cyber Security', value: 'CyberSecurity' },
        { label: 'BlockChain', value: 'BlockChain' },
        { label: 'Wellness', value: 'Wellness' },
        { label: 'AirTech', value: 'AirTechIcon' },
        { label: 'B2B', value: 'B2B' },
        { label: 'BeautyTech', value: 'BeautyTech' },
        { label: 'InsuranceTech', value: 'InsuranceTech' },
        { label: 'LogisticTech', value: 'LogisticTech' },
        { label: 'Online Media', value: 'OnlineMedia' },
        { label: 'ParkTech', value: 'ParkTech' },
        { label: 'Retail Tech', value: 'RetailTech' },
        { label: 'SolarTech', value: 'SolarTech' },
        { label: 'Telecom', value: 'Telecom' },
        { label: 'TravelTech', value: 'TravelTech' },
        { label: 'General', value: 'General' }
    ];

    const sliderRef = useRef(null);
    const activeButtonRef = useRef(null);

    // const slideLeft = () => {
    //     sliderRef.current.scrollLeft -= 150; // Adjust scroll amount as needed
    // };

    // const slideRight = () => {
    //     sliderRef.current.scrollLeft += 150; // Adjust scroll amount as needed
    // };
    useEffect(() => {
        if (activeButtonRef.current) {
            // Scroll the active industry button into view
            const activeButtonPosition = activeButtonRef.current.offsetLeft;
            const containerWidth = sliderRef.current.clientWidth;
            const buttonWidth = activeButtonRef.current.clientWidth;

            // Calculate the center position
            const scrollPosition = activeButtonPosition - (containerWidth / 2) + (buttonWidth / 2);
            sliderRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [activeIndustry]);


    return (
        <div className="industry-filter-container-event">
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#c6c6c6' }}>Industry:</span>
            <div className="industry-slider-event" ref={sliderRef}>
                {industries.map((industry) => (
                    <button
                        key={industry.value}
                        ref={activeIndustry === industry.value ? activeButtonRef : null}
                        className={`industry-filter-button-event ${activeIndustry === industry.value ? 'active' : ''}`}
                        onClick={() => {
                            setActiveIndustry(industry.value);
                            onIndustryChange(industry.value);
                        }}
                    >
                        {industry.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

function Events({ setSelectedLocation, isPopupOpen, setIsPopupOpen }) {
    const [eventData, setEventData] = useState([]);
    const [filteredEventData, setFilteredEventData] = useState([]);
    const [showVariableName, setShowVariableName] = useState('');
    const [showVariableIndustry, setShowVariableIndustry] = useState('');
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    // 
    const [activeTimeFilter, setActiveTimeFilter] = useState('');
    const [activeIndustry, setActiveIndustry] = useState('');
    const [selectedLocation, setSelectedLocationState] = useState('');
    const location = useLocation();

    const fetchEventData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://snfyibackend.onrender.com/event-detail');
            const data = response.data.data;

            setEventData(data);
            setFilteredEventData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching event data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    // useEffect(() => {
    //     const applyFilters = () => {
    //         // Start filtering by the selected location first
    //         let filtered = [...eventData];
    //         if (selectedLocation) {
    //             filtered = filtered.filter(event => event.city.toLowerCase() === selectedLocation.toLowerCase());
    //         }

    //         // Apply time filter if active
    //         if (activeTimeFilter) {
    //             filtered = filterByTime(filtered, activeTimeFilter);
    //         }

    //         // Apply industry filter if active
    //         if (activeIndustry) {
    //             filtered = filtered.filter(event => event.industry === activeIndustry || event.industry === 'All');
    //         }

    //         setFilteredEventData(filtered);
    //         setLoading(false);  // End loading after filtering
    //     };

    //     if (eventData.length > 0) {
    //         setLoading(true);  // Start loading before applying filters
    //         applyFilters();
    //     }
    // }, [activeTimeFilter, activeIndustry, selectedLocation, eventData]);

    // useEffect(() => {
    //     const applyFilters = () => {
    //         let filtered = [...eventData];

    //         // Apply location filter if a location is selected
    //         if (selectedLocation) {
    //             filtered = filtered.filter(event => event.city.toLowerCase() === selectedLocation.toLowerCase());
    //         }

    //         // Apply time filter if active
    //         if (activeTimeFilter) {
    //             filtered = filterByTime(filtered, activeTimeFilter);
    //         }

    //         // Apply industry filter if active
    //         if (activeIndustry) {
    //             const industrySpecificEvents = filtered.filter(event => event.industry === activeIndustry);
    //             const allCategoryEvents = filtered.filter(event => event.industry === 'All');
    //             // Combine industry-specific events first, then "All" events
    //             filtered = [...industrySpecificEvents, ...allCategoryEvents];
    //         }

    //         setFilteredEventData(filtered);
    //         setLoading(false);  // End loading after filtering
    //     };

    //     if (eventData.length > 0) {
    //         setLoading(true);  // Start loading before applying filters
    //         applyFilters();
    //     }
    // }, [activeTimeFilter, activeIndustry, selectedLocation, eventData]);

    // useEffect(() => {
    //     const applyFilters = () => {
    //         let filtered = [...eventData];
    //         if (location.state?.filterValue) {
    //             filtered = filterByTime(filtered, location.state.filterValue);
    //             setActiveTimeFilter(location.state.filterValue);
    //             setShowVariableName(location.state.filterValue);
    //         }
    //         if (location.state?.industry) {
    //             filtered = filtered.filter(event => event.industry === location.state.industry || event.industry === 'All');
    //             setActiveIndustry(location.state.industry);
    //             setShowVariableIndustry(location.state.industry);
    //         }
    //         if (timeFilter) {
    //             filtered = filterByTime(filtered, timeFilter);
    //         }
    //         if (industryFilter) {
    //             filtered = filtered.filter(event =>
    //                 event.industry === industryFilter || event.industry === 'All'
    //             );
    //         }
    //         setFilteredEventData(filtered);
    //         setLoading(false);
    //     };

    //     if (eventData.length > 0) {
    //         setLoading(true);
    //         applyFilters();
    //     }
    // }, [timeFilter, industryFilter, eventData, location.state, loading]);

    // useEffect(() => {
    //     const applyFilters = () => {
    //         let filtered = [...eventData];

    //         // Apply time filter if active
    //         if (activeTimeFilter) {
    //             filtered = filterByTime(filtered, activeTimeFilter);
    //         }

    //         // Apply industry filter if active
    //         if (activeIndustry) {
    //             const industrySpecificEvents = filtered.filter(event => event.industry === activeIndustry);
    //             const allCategoryEvents = filtered.filter(event => event.industry === 'All');

    //             // Combine industry-specific events first, then "All" events
    //             filtered = [...industrySpecificEvents, ...allCategoryEvents];
    //         }

    //         setFilteredEventData(filtered);
    //         setLoading(false);  // End loading after filtering
    //     };

    //     if (eventData.length > 0) {
    //         setLoading(true);  // Start loading before applying filters
    //         applyFilters();
    //     }
    // }, [activeTimeFilter, activeIndustry, eventData]);

    const hasAppliedInitialFilters = useRef(false);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...eventData];

            // Apply location.state filters only on the initial render
            if (!hasAppliedInitialFilters.current) {
                if (location.state?.filterValue) {
                    filtered = filterByTime(filtered, location.state.filterValue);
                    setActiveTimeFilter(location.state.filterValue);
                    setShowVariableName(location.state.filterValue);
                }
                if (location.state?.industry) {
                    filtered = filtered.filter(event => event.industry === location.state.industry || event.industry === 'All');
                    setActiveIndustry(location.state.industry);
                    setShowVariableIndustry(location.state.industry);
                }
                hasAppliedInitialFilters.current = true; // Mark that initial filters have been applied
            } else {
                // Apply selectedLocation filter if active
                if (selectedLocation) {
                    filtered = filtered.filter(event => event.city.toLowerCase() === selectedLocation.toLowerCase());
                }

                // Apply activeTimeFilter if active
                if (activeTimeFilter) {
                    filtered = filterByTime(filtered, activeTimeFilter);
                }

                // Apply activeIndustry filter and prioritize the specific industry over 'All'
                if (activeIndustry) {
                    const industrySpecificEvents = filtered.filter(event => event.industry === activeIndustry);
                    const allCategoryEvents = filtered.filter(event => event.industry === 'All');
                    // Combine industry-specific events first, then "All" events
                    filtered = [...industrySpecificEvents, ...allCategoryEvents];
                }
            }

            // Set the filtered data
            setFilteredEventData(filtered);
            setLoading(false); // End loading after filtering
        };

        if (eventData.length > 0) {
            setLoading(true); // Start loading before applying filters
            applyFilters();
        }
    }, [activeTimeFilter, activeIndustry, selectedLocation, eventData, location.state]);







    const filterByTime = (events, filter) => {
        console.log("Filtering events by:", filter);
        const today = new Date();
        switch (filter) {
            case 'today':
                return events.filter(event => new Date(event.startdate).toDateString() === today.toDateString());
            case 'tomorrow':
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                return events.filter(event => new Date(event.startdate).toDateString() === tomorrow.toDateString());
            case 'this-weekend':
                const weekendStart = new Date(today);
                weekendStart.setDate(weekendStart.getDate() + (5 - weekendStart.getDay()));
                const weekendEnd = new Date(weekendStart);
                weekendEnd.setDate(weekendEnd.getDate() + 2);
                return events.filter(event => {
                    const eventDate = new Date(event.startdate);
                    return eventDate >= weekendStart && eventDate <= weekendEnd;
                });
            case 'this-month':
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                return events.filter(event => {
                    const eventDate = new Date(event.startdate);
                    return eventDate >= monthStart && eventDate <= monthEnd;
                });
            case 'international':
                return events.filter(event => event.modeofevent === 'International');
            default:
                return events;
        }
    };

    // const onFilterChange = (filter) => {
    //     setLoading(true);  // Start loading before filtering
    //     let filtered = [...eventData];
    //     if (activeTimeFilter === filter) {
    //         setActiveTimeFilter('');
    //         setShowVariableName('');
    //     } else {
    //         filtered = filterByTime(filtered, filter);
    //         setActiveTimeFilter(filter);
    //         setShowVariableName(filter);
    //     }
    //     setFilteredEventData(filtered);
    //     setLoading(false);  // End loading after filtering
    // };


    // const onIndustryChange = (industry) => {
    //     setLoading(true);

    //     let filtered = [...eventData];

    //     if (activeIndustry === industry) {
    //         setActiveIndustry('');
    //         setShowVariableIndustry('');
    //         setFilteredEventData(eventData);
    //     } else {
    //         // Sort events so that selected industry events are prioritized
    //         const sortedEvents = filtered.sort((a, b) => {
    //             if (a.industry === industry && b.industry !== industry) return -1;
    //             if (a.industry !== industry && b.industry === industry) return 1;
    //             return 0;
    //         });

    //         // Debugging
    //         console.log("Final Sorted Events:", sortedEvents);

    //         setActiveIndustry(industry);
    //         setShowVariableIndustry(industry);
    //         setFilteredEventData(sortedEvents);
    //     }

    //     setLoading(false);
    // };

    const onFilterChange = (filter) => {
        setLoading(true);
        // Start filtering by the selected location first
        let filtered = [...eventData];
        if (selectedLocation) {
            filtered = filtered.filter(event => event.city.toLowerCase() === selectedLocation.toLowerCase());
        }

        // Apply the time filter
        if (activeTimeFilter === filter) {
            setActiveTimeFilter('');
            setShowVariableName('');
        } else {
            filtered = filterByTime(filtered, filter);
            setActiveTimeFilter(filter);
            setShowVariableName(filter);
        }

        // Apply the industry filter if it's active
        if (activeIndustry) {
            filtered = filtered.filter(event => event.industry === activeIndustry || event.industry === 'All');
        }

        setFilteredEventData(filtered);
        setLoading(false);
    };

    const onIndustryChange = (industry) => {
        setLoading(true);
        // Start filtering by the selected location first
        let filtered = [...eventData];
        if (selectedLocation) {
            filtered = filtered.filter(event => event.city.toLowerCase() === selectedLocation.toLowerCase());
        }

        // Apply the time filter if it's active
        if (activeTimeFilter) {
            filtered = filterByTime(filtered, activeTimeFilter);
        }

        // Apply the industry filter
        if (activeIndustry === industry) {
            setActiveIndustry('');
            setShowVariableIndustry('');
        } else {
            filtered = filtered.filter(event => event.industry === industry || event.industry === 'All');
            setActiveIndustry(industry);
            setShowVariableIndustry(industry);
        }

        setFilteredEventData(filtered);
        setLoading(false);
    };




    const convertToTitleCase = (str) => {
        if (str === 'All') {
            return 'Startup';
        }

        const words = str.split('-');
        const titleCaseString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return titleCaseString;
    };

    const handleSelectLocation = (location) => {
        // Reset time and industry filters
        setActiveTimeFilter('');
        setActiveIndustry('');
        setShowVariableName('');
        setShowVariableIndustry('');

        // Set the selected location
        setSelectedLocationState(location.city);
        setSelectedLocation(location.city);
        setIsPopupOpen(false);
        localStorage.setItem('popupClosed', 'true');

        // Filter events based on the newly selected location
        const filteredEvents = eventData.filter(event => event.city.toLowerCase() === location.city.toLowerCase());
        setFilteredEventData(filteredEvents);
    };


    // Extract unique locations from eventData
    const uniqueLocations = [...new Set(eventData.map(event => event.city))].map(city => ({ city }));

    const uniqueNationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'National').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'National' }));

    const uniqueInternationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'International').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'International' }));



    // if (filteredEventData.length === 0) {
    //     return (
    //         <>
    //             <Error />
    //         </>
    //     )
    // }

    return (
        <div className='event-container'>
        <LocationPopup 
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSelectLocation={handleSelectLocation}
            national={uniqueNationalLocations} 
            international={uniqueInternationalLocations} 
        />
        <FilterOnEvent 
            eventData={eventData} 
            onFilterChange={onFilterChange} 
            activeTimeFilter={activeTimeFilter} 
            setActiveTimeFilter={setActiveTimeFilter} 
        />
        <IndustryFilter 
            onIndustryChange={onIndustryChange} 
            activeIndustry={activeIndustry} 
            setActiveIndustry={setActiveIndustry} 
        />
        
        {loading ? (
            <div className="loading">
                <Loading />
            </div>
        ) : (
            filteredEventData.length === 0 ? (
                <Error />
            ) : (
                <div className='show-event-card'>
                    <h2 className='to-show-all-events'>All {convertToTitleCase(showVariableName)} {convertToTitleCase(showVariableIndustry)} Events</h2>
                    <div className='all-events-card'>
                        {filteredEventData.map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            )
        )}
        
        <ScrollToTop />
    </div>
    
    );
}

export default Events;

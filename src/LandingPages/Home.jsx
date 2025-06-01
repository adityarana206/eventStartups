import React, { useState, useEffect } from 'react'
import './Home.css'
// import CustomSlider from '../Component/Slider'
import Filter from '../Component/Filter'
import IndustrySelection from '../Component/IndustrySelection'
import D2CComponent from '../Component/HomePage/D2CComponent'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import LocationPopup from './LocationPopup'
// import LoadingAnimation from '../Component/LoadingAnimation'
// import animationData from '../Assets/Loading/Loading.json'
import GoogleAds from '../Component/GoogleAds'
import ImageSlider from '../Component/NewSlider'
import Loading from '../Component/Loading'
import ResentlyViewed from '../Component/ResentlyViewed'

function Home({ setSelectedLocation, isPopupOpen, setIsPopupOpen }) {
    const [eventData, setEventData] = useState([])
    const [filteredEventData, setFilteredEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadCount, setLoadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreSections = () => {
        if (loadCount < 5) {
            setIsLoading(true);
            setTimeout(() => {
                setLoadCount((prev) => prev + 1);
                setIsLoading(false);
            }, 1000);
        }
    };



    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 && !isLoading) {
            loadMoreSections();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadCount, isLoading]);


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                console.log('Fetching event data from API');
                const response = await axios.get('https://snfyibackend.onrender.com/event-detail');
                const data = response && response.data && response.data.data;
                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format');
                }
                console.log(data, 'Filtered data');
                setEventData(data);
                setFilteredEventData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event data:', error);
                setLoading(false);
            }
        };

        fetchEventData();
    }, []);


    if (loading) {
        return <div className="loading">
            {/* <LoadingAnimation animationData={animationData} /> */}
            <Loading />
        </div>;
    }

    const groupEventsByIndustry = (events) => {
        return events.reduce((acc, event) => {
            const industry = event.industry;
            if (!acc[industry]) {
                acc[industry] = [];
            }
            acc[industry].push(event);
            return acc;
        }, {});
    };

    const eventsByIndustry = groupEventsByIndustry(filteredEventData);

    const onIndustryChange = (industry) => {
        const filteredEvents = eventData.filter(event => event.industry === industry && event.industry === 'All');
        setFilteredEventData(filteredEvents);
    };

    // const { filteredIndustryData } = location.state

    // useEffect(() => {
    //     const newTotalMoney = filteredIndustryData
    //     if (newTotalMoney !== filteredEventData) {
    //         setFilteredEventData([newTotalMoney]);
    //     }
    //     // console.log("filterEventData", filteredEventData)
    // }, [filteredIndustryData]);

    const handleSelectLocation = (location) => {
        const filteredEvents = eventData.filter(event => event.city === location.city);
        setFilteredEventData(filteredEvents);
        setIsPopupOpen(false);
        setSelectedLocation(location.city);
        localStorage.setItem('popupClosed', 'true');
    };


    const uniqueNationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'National').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'National' }));

    const uniqueInternationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'International').map(event => event.city))]
        .map(city => ({ city, modeofevent: 'International' }));

    const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];

    console.log("recentlyViewed", recentlyViewed)
    return (
        <div className='home' >
            <LocationPopup isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSelectLocation={handleSelectLocation}
                national={uniqueNationalLocations} international={uniqueInternationalLocations} />
            <ImageSlider eventData={filteredEventData.slice(0, 12)} />
            <Filter />
            {/* {recentlyViewed.length > 0 && <ResentlyViewed />} */}
            <IndustrySelection onIndustryChange={onIndustryChange} eventData={eventData} setFilteredEventData={setFilteredEventData} />
            {/*  */}
            {eventsByIndustry['All'] && <D2CComponent title='All' eventData={eventsByIndustry['All'].slice(0, 3)} />}
            {eventsByIndustry['Fintech'] && <D2CComponent title='Fintech' eventData={eventsByIndustry['Fintech'].slice(0, 3)} />}
            <GoogleAds />
            {eventsByIndustry['EdTech'] && <D2CComponent title='EdTech' eventData={eventsByIndustry['EdTech'].slice(0, 3)} />}
            {eventsByIndustry['Ecommerce'] && <D2CComponent title='Ecommerce' eventData={eventsByIndustry['Ecommerce'].slice(0, 3)} />}
            {eventsByIndustry['Deeptech'] && <D2CComponent title='Deeptech' eventData={eventsByIndustry['Deeptech'].slice(0, 3)} />}

            {loadCount >= 1 && (
                <>
                    {eventsByIndustry['AirTech'] && <D2CComponent title='AirTech' eventData={eventsByIndustry['AirTech'].slice(0, 3)} />}
                    {eventsByIndustry['ArtificialInteligence'] && <D2CComponent title='AI' eventData={eventsByIndustry['ArtificialInteligence'].slice(0, 3)} />}
                    {eventsByIndustry['AI/AR/VR'] && <D2CComponent title='AI/AR/VR' eventData={eventsByIndustry['AI/AR/VR'].slice(0, 3)} />}
                    {eventsByIndustry['General'] && <D2CComponent title='General' eventData={eventsByIndustry['General'].slice(0, 3)} />}
                    {/* <GoogleAds /> */}
                    {eventsByIndustry['D2C'] && <D2CComponent title='D2C' eventData={eventsByIndustry['D2C'].slice(0, 3)} />}
                </>
            )}
            {loadCount >= 2 && (
                <>
                    {eventsByIndustry['Mobality'] && <D2CComponent title='Mobality' eventData={eventsByIndustry['Mobality'].slice(0, 3)} />}
                    {eventsByIndustry['FoodTech'] && <D2CComponent title='FoodTech' eventData={eventsByIndustry['FoodTech'].slice(0, 3)} />}
                    {eventsByIndustry['Web3'] && <D2CComponent title='Web3.0' eventData={eventsByIndustry['Web3'].slice(0, 3)} />}
                    {eventsByIndustry['SocialMedia'] && <D2CComponent title='Social media' eventData={eventsByIndustry['SocialMedia'].slice(0, 3)} />}
                    {eventsByIndustry['Technology'] && <D2CComponent title='Technology' eventData={eventsByIndustry['Technology'].slice(0, 3)} />}
                </>
            )}

            {loadCount >= 3 && (
                <>
                    {eventsByIndustry['AgriTech'] && <D2CComponent title='AgriTech' eventData={eventsByIndustry['AgriTech'].slice(0, 3)} />}
                    {eventsByIndustry['Government'] && <D2CComponent title='Government' eventData={eventsByIndustry['Government'].slice(0, 3)} />}
                    {eventsByIndustry['HealthTech'] && <D2CComponent title='HealthTech' eventData={eventsByIndustry['HealthTech'].slice(0, 3)} />}
                    {eventsByIndustry['Hospitality'] && <D2CComponent title='Hospitality' eventData={eventsByIndustry['Hospitality'].slice(0, 3)} />}
                    {eventsByIndustry['HRTech'] && <D2CComponent title='HR Tech' eventData={eventsByIndustry['HRTech'].slice(0, 3)} />}
                </>
            )}

            {loadCount >= 4 && (
                <>
                    {eventsByIndustry['Metaverse'] && <D2CComponent title='Metaverse' eventData={eventsByIndustry['Metaverse'].slice(0, 3)} />}
                    {eventsByIndustry['RetailEstate'] && <D2CComponent title='Retail Estate Tech' eventData={eventsByIndustry['RetailEstate'].slice(0, 3)} />}
                    {eventsByIndustry['SaaS'] && <D2CComponent title='SaaS' eventData={eventsByIndustry['SaaS'].slice(0, 3)} />}
                    {eventsByIndustry['CyberSecurity'] && <D2CComponent title='Cyber Security' eventData={eventsByIndustry['CyberSecurity'].slice(0, 3)} />}
                    {eventsByIndustry['BlockChain'] && <D2CComponent title='BlockChain' eventData={eventsByIndustry['BlockChain'].slice(0, 3)} />}
                    {eventsByIndustry['Wellness'] && <D2CComponent title='Wellness' eventData={eventsByIndustry['Wellness'].slice(0, 3)} />}
                </>
            )}

            {loadCount >= 5 && (
                <>
                    {eventsByIndustry['AirTechIcon'] && <D2CComponent title='AirTech' eventData={eventsByIndustry['AirTechIcon'].slice(0, 3)} />}
                    {eventsByIndustry['B2B'] && <D2CComponent title='B2B' eventData={eventsByIndustry['B2B'].slice(0, 3)} />}
                    {eventsByIndustry['BeautyTech'] && <D2CComponent title='BeautyTech' eventData={eventsByIndustry['BeautyTech'].slice(0, 3)} />}
                    {eventsByIndustry['InsuranceTech'] && <D2CComponent title='InsuranceTech' eventData={eventsByIndustry['InsuranceTech'].slice(0, 3)} />}
                    {eventsByIndustry['OnlineMedia'] && <D2CComponent title='Online Media' eventData={eventsByIndustry['OnlineMedia'].slice(0, 3)} />}
                </>
            )}
            {isLoading && <Loading />}

            {loadCount >= 6 && (
                <>
                    {eventsByIndustry['ParkTech'] && <D2CComponent title='ParkTech' eventData={eventsByIndustry['ParkTech'].slice(0, 3)} />}
                    {eventsByIndustry['RetailTech'] && <D2CComponent title='RetailTech' eventData={eventsByIndustry['RetailTech'].slice(0, 3)} />}
                    {eventsByIndustry['SolarTech'] && <D2CComponent title='SolarTech' eventData={eventsByIndustry['SolarTech'].slice(0, 3)} />}
                    {eventsByIndustry['TravelTech'] && <D2CComponent title='TravelTech' eventData={eventsByIndustry['TravelTech'].slice(0, 3)} />}
                </>
            )}
        </div>
    )
}

export default Home

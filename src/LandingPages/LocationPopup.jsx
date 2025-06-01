import React, { useRef, useState, useEffect } from 'react';
import './LocationPopup.css';

const LocationPopup = ({ isOpen, onClose, onSelectLocation, national, international }) => {
    const [showMore, setShowMore] = useState(false); // Toggle to show more or less locations
    const slider = useRef(null)
    const popupRef = useRef(null);
    // if (!isOpen) {
    //     return null;
    // }

    useEffect(() => {

        if (!isOpen) return; // Only add the event listener when the popup is open

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(); // Close the popup when clicked outside
            }
        };

        // Add the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }


    const cityImages = {
        "Delhi NCR": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933698/Group_633119_acqbhb.jpg',
        "Mumbai": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933698/Group_633119_1_fvbrjq.jpg',
        "Bangalore": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933697/Group_633119_2_qm93rc.jpg',
        "Hyderabad": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933688/Group_633119_3_mikomr.jpg',
        "Pune": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933687/Group_633119_4_dcnhsz.jpg',
        "Kolkata": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933687/Group_633119_5_ff1vhu.jpg',
        "Chennai": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933691/Group_633119_6_trav4y.jpg',
        "Chandigarh": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933687/Group_633119_7_kgjq98.jpg',
        "Jaipur": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933698/Group_633119_8_msiv3g.jpg',
        // International
        "Dubai": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933834/Group_633119_raaj9r.jpg',
        "Bostwana": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933875/Group_633119_qcc6ss.jpg',
        "USA": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933890/Group_633119_dyskki.jpg',
        "Indonesia": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933942/Group_633119_vbmxpf.jpg',
        "Singapore": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933909/Group_633119_lpnijm.jpg',
        "Philippines": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933925/Group_633119_xywhse.jpg',
        "China": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933958/Group_633119_g7sxhg.jpg',
        "Netherlands": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933976/Group_633119_nmrf8n.jpg',
        "London": 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724933993/Mask_group_ywvnn1.jpg',
    };

    // Render location items (show image if available)
    const renderLocationItem = (location, index) => (
        <li className='city-list' key={index} onClick={() => onSelectLocation(location)}>
            {cityImages[location.city] && (
                <img src={cityImages[location.city]} className='location-image' alt={location.city} />
            )}
            <p className='locations-names' >{location.city}</p>
        </li>
    );



    // Show only the locations with images initially
    const renderLocationsWithImages = (locations) => {
        return locations
            .filter(location => cityImages[location.city])
            .map((location, index) => renderLocationItem(location, index));
    };

    // Show all locations (with and without images)
    const renderAllLocations = (locations) => {
        return locations.map((location, index) => renderLocationItem(location, index));
    };

    console.log(international.filter(location => !cityImages[location.city]), 'other')

    return (
        <div className="popup">
            <div className="popup-inner" ref={popupRef} >
                <div className='national-event'>
                    <h3 className='National-event'>National Events</h3>
                    <ul className='national-location-list' ref={slider} >
                        {renderLocationsWithImages(national)}
                    </ul>
                </div>
                <div className='international-event'>
                    <h3 className='National-event'>International Events</h3>
                    <ul className='location-list' ref={slider}>
                        {renderLocationsWithImages(international)}
                    </ul>
                </div>
                {showMore && (
                    <>
                        {national?.filter(location => !cityImages[location?.city])?.length > 0 && <div className='other-events'>
                            <h4 className='other-events-text' >Other National Events</h4>
                            <ul className='location-list'>
                                {renderAllLocations(national.filter(location => !cityImages[location.city]))}
                            </ul>
                        </div>}
                        {international?.filter(location => !cityImages[location?.city])?.length > 0 && <div className='other-events'>
                            <h4 className='other-events-text' >Other International Events</h4>
                            <ul className='location-list'>
                                {renderAllLocations(international.filter(location => !cityImages[location.city]))}
                            </ul>
                        </div>}
                    </>
                )}

                {/* Show the "View More" or "Hide All" button */}
                {!showMore ? (
                    <li className='view-more' onClick={() => setShowMore(true)}>
                        View all
                    </li>
                ) : (
                    <li className='view-more' onClick={() => setShowMore(false)}>
                        Hide all
                    </li>
                )}
            </div>
        </div>
    );
};

export default LocationPopup;

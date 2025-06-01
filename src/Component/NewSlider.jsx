import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css'; // For styling
import { useNavigate } from 'react-router-dom';

const MobileSlider = ({ eventData }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(1); // Start with the second image

    const images = eventData.map(event => event.image);

    useEffect(() => {
        const interval = setInterval(() => {
            slideRight();
        }, 3000); // Slide every 3 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);

    const sanitizeEventNameForURL = (eventname) => {
        return eventname
            .toLowerCase()
            .replace(/\|/g, '-')             // Replace each '|' with a single '-'
            .replace(/[^a-z0-9'-]+/g, '-')   // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
            .replace(/--+/g, '-')            // Replace multiple consecutive hyphens with a single hyphen
            .replace(/^-|-$/g, '');   // Remove any non-word characters except dashes
    };


    const handleCardClick = (eventname) => {
        const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];
        if (!recentlyViewed.includes(eventname)) {
            recentlyViewed.push(sanitizeEventNameForURL(eventname));
            sessionStorage.setItem('recentlyViewedEvents', JSON.stringify(recentlyViewed.slice(-5)));
        }
        navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
    };


    const slideRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const slideLeft = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const getImageClass = (index) => {
        if (index === currentIndex) return 'mobile-image-middle';
        if (index === (currentIndex - 1 + images.length) % images.length)
            return 'mobile-image-left';
        if (index === (currentIndex + 1) % images.length) return 'mobile-image-right';
        return 'mobile-image-hidden';
    };

    return (
        <div className="mobile-sliders-container">
            <div className="mobile-slider">
                {images.map((image, index) => {
                    const eventIndex = (index + images.length) % images.length; // Calculate original event index
                    const event = eventData[eventIndex];
                    const imageUrl = image ? `https://snfyibackend.onrender.com/${image.replace(/\\/g, "/").replace("uploads/", "")}` : '';
                    return (
                        <div key={index} className={`mibile-slide ${getImageClass(index)}`}>
                            <img src={imageUrl} onClick={() => handleCardClick(event.eventname)} alt={`Slide ${index}`} />
                        </div>
                    )
                })}
            </div>
            <div className="mobile-dots-container">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'mobile-active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};


// import React, { useState, useEffect, useRef } from 'react';
// import './ImageSlider.css'; // For styling
// import { useNavigate } from 'react-router-dom';

const DesktopSlider = ({ eventData }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to account for the cloned first slide
    const sliderRef = useRef(null); // Ref for the slider
    const autoSlideInterval = useRef(null); // Ref for the interval
    const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

    // Create clones for infinite loop effect
    const slides = [eventData[eventData.length - 1], ...eventData, eventData[0], eventData[1], eventData[2]];

    useEffect(() => {
        startAutoSlide();
        setIsMounted(true); // Set mounted state to true
        return () => {
            clearInterval(autoSlideInterval.current); // Clean up on unmount
        };
    }, []);

    const startAutoSlide = () => {
        clearInterval(autoSlideInterval.current);
        autoSlideInterval.current = setInterval(() => {
            slideRight();
        }, 3000); // Slide every 3 seconds
    };

    const sanitizeEventNameForURL = (eventname) => {
        return eventname
            .toLowerCase()
            .replace(/\|/g, '-')
            .replace(/[^a-z0-9'-]+/g, '-')
            .replace(/--+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleCardClick = (eventname) => {
        const recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewedEvents')) || [];
        if (!recentlyViewed.includes(eventname)) {
            recentlyViewed.push(sanitizeEventNameForURL(eventname));
            sessionStorage.setItem('recentlyViewedEvents', JSON.stringify(recentlyViewed.slice(-5)));
        }
        navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
    };

    const slideRight = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const slideLeft = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index + 1); // Adjust for the cloned slides
    };

    useEffect(() => {
        if (!isMounted) return; // Skip if the component is not mounted

        // Transition to the cloned slide
        if (currentIndex === slides.length - 3) {
            setTimeout(() => {
                sliderRef.current.style.transition = 'none';
                setCurrentIndex(1);
            }, 500); // Match this timeout with the CSS transition duration
        } else if (currentIndex === 0) {
            setTimeout(() => {
                sliderRef.current.style.transition = 'none';
                setCurrentIndex(slides.length - 2);
            }, 500); // Match this timeout with the CSS transition duration
        } else {
            sliderRef.current.style.transition = 'transform 0.5s ease-in-out'; // Set the transition for normal slides
        }
    }, [currentIndex, isMounted]);

    return (
        <div className="sliders-container">
            <div
                className="slider"
                ref={sliderRef}
                style={{
                    transform: `translateX(-${currentIndex * 620}px)`, // Adjust transform based on screen size
                    transition: isMounted ? 'transform 0.5s ease-in-out' : 'none', // Only apply transition after the first mount
                }}
            >
                {/* {slides.map((slide, index) => {
                    const eventIndex = index === 0 ? eventData.length - 1 : index === slides.length - 1 ? 0 : index - 1; // Adjust for the cloned slides
                    const event = eventData[eventIndex];
                    const imageUrl = slide.image ? `http://localhost:5001/${slide.image.replace(/\\/g, "/").replace("uploads/", "")}` : '';
                    return (
                        <div key={index} className="slide">
                            <img src={imageUrl} onClick={() => handleCardClick(event.eventname)} alt={`Slide ${index}`} />
                        </div>
                    );
                })} */}.
                {slides.map((slide, index) => {
                    if (!slide || !eventData || eventData.length === 0) {
                        return null;
                    }
                    const eventIndex = index === 0 ? eventData.length - 1 : index === slides.length - 1 ? 0 : index - 1;
                    if (eventIndex < 0 || eventIndex >= eventData.length) {
                        return;
                    }

                    const event = eventData[eventIndex];
                    if (!event || !slide.image) {
                        return null;
                    }

                    const imageUrl = `https://snfyibackend.onrender.com/${slide.image.replace(/\\/g, "/").replace("uploads/", "")}`;
                    return (
                        <div key={index} className="slide">
                            <img src={imageUrl} onClick={() => handleCardClick(event.eventname)} alt={`Slide ${index}`} />
                        </div>
                    );
                })}
            </div>
            <div className="dots-container">
                {eventData.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index + 1 ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// export default ImageSlider;

const ImageSlider = ({ eventData }) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);

    useEffect(() => {
        // Function to check screen size
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 480);
        };

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Clean up listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobileView ? (
        <MobileSlider eventData={eventData} />
    ) : (
        <DesktopSlider eventData={eventData} />
    );
};

export default ImageSlider;








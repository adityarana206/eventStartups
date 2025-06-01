import React, { useState, useEffect, useRef } from 'react';
import './PichDeckSlider.css'; // Import the CSS for styling

const CustomSlider = ({ images, downloads }) => {
    const [imageWidth, setImageWidth] = useState(0); // Store image width
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const imagesToShow = [
        images[images.length - 1],
        ...images,
        images[0]
    ];

    const updateImageWidth = () => {
        if (sliderRef.current) {
            const sliderContainerWidth = sliderRef.current.offsetWidth;
            setImageWidth(sliderContainerWidth);
        }
    };

    // Function to handle the image click and download the corresponding file
    const handleImageClick = (index) => {
        const link = document.createElement('a');
        link.href = downloads[index];

        // Extract file name from the URL
        const fileName = downloads[index].split('/').pop();

        link.download = fileName; // Set the file name for the download
        link.click();
    };

    // Function to move to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Adjust image width on initial load and window resize
    useEffect(() => {
        updateImageWidth();
        window.addEventListener('resize', updateImageWidth);
        return () => window.removeEventListener('resize', updateImageWidth);
    }, [imagesToShow]);

    // Use effect to implement the infinite loop
    useEffect(() => {
        const sliderInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        return () => clearInterval(sliderInterval); // Clean up on component unmount
    }, []);

    // Cloning the first and last images to create the infinite loop effect


    return (
        <div className="custom-slider-container">
            <div className="custom-slider" ref={sliderRef}  style={{ '--image-width': `${imageWidth}px` }} >
                {imagesToShow.map((image, index) => (
                    <div key={index} className="slider-image">
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            onClick={() => handleImageClick((index - 1 + images.length) % images.length)}
                            style={{ transform: `translateX(-${currentIndex * imageWidth}px)` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSlider;

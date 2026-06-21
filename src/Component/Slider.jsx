import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";
import image1 from "../Assets/Frame.png";
import { useNavigate } from "react-router-dom";

// const images = [image1, image1, image1, image1, image1, image1, image1];

const CustomSlider = ({ eventData }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const [right, setRight] = useState(8);

  const images = eventData.map((event) => event.image);

  const slides = [images[images.length - 1], ...images]; // Add last image at the beginning and first image at the end

  const handleCardClick = (id) => {
    navigate(`/event-details/${id}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setRight((prev) => prev + 3);
  };

  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        setRight(8);
        setTimeout(() => setIsTransitioning(true), 50); // Allow some time before re-enabling the transition
      }, 500); // Match this timeout to your CSS transition duration
      setRight(8);
    }
    if (currentIndex === slides.length - 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 1);
        setTimeout(() => setIsTransitioning(true), 50); // Allow some time before re-enabling the transition
      }, 500); // Match this timeout to your CSS transition duration
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
        setRight(8);
        setTimeout(() => setIsTransitioning(true), 50); // Allow some time before re-enabling the transition
      }, 500); // Match this timeout to your CSS transition duration
      setRight(8);
    }
  }, [currentIndex]);

  const getSlideClass = (index) => {
    if (index === currentIndex + 1) {
      return "slide center";
    } else if (
      index === (currentIndex + 2) % slides.length ||
      index === (currentIndex + slides.length) % slides.length
    ) {
      return "slide side";
    } else {
      return "slide";
    }
  };

  const calculateTransform = (index) => {
    const gap = 16; // Gap between slides in pixels
    const slideWidth = 33.33; // Slide width as a percentage
    const totalWidth = slideWidth + (gap / window.innerWidth) * 100;
    return `translateX(-${index * totalWidth}%)`;
  };

  const rightgap = () => {
    // let right = 8;
    const value = currentIndex + right;
    return `${value}rem`;
  };

  const handleDotClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // Adjust index to account for the duplicated first slide
  };

  return (
    <div className="slider">
      <div className="slider-images">
        <div
          className="slider-wrapper"
          ref={sliderRef}
          style={{
            transform: calculateTransform(currentIndex),
            right: rightgap(),
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {slides.slice(0, 12).map((image, index) => {
            const eventIndex = (index - 1 + images.length) % images.length; // Calculate original event index
            const event = eventData[eventIndex];
            const imageUrl = image
              ? `/api/${image.replace(/\\/g, "/").replace("uploads/", "")}`
              : "";
            return (
              <div key={index} className={getSlideClass(index)}>
                <img
                  src={imageUrl}
                  onClick={() => handleCardClick(event._id)}
                  alt={`Slide ${index}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === (currentIndex - 1) % images.length ? "active" : ""}`}
            onClick={() => {
              handleDotClick(index);
              setRight((prev) => prev + 3);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;

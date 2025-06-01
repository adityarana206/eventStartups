import React, { useState, useRef, useEffect } from 'react';
import NewsCardTwo from './NewsCardTwo';
import './NewsSlider.css';
import NewsCardFour from './NewsCardFour';

const NewsSlider = ({ newsItems }) => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false); const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect screen size and set isMobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
        };

        handleResize(); // Set on mount
        window.addEventListener('resize', handleResize); // Listen for window resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup event listener
    }, []);

    useEffect(() => {
        if (isMobile) return; // Skip auto-scroll for mobile

        const slider = sliderRef.current;
        const scrollStep = 1; // Increase this value for faster scrolling
        const scrollInterval = 20; // Lower this value for faster scrolling

        const scroll = () => {
            // Scroll from left to right
            if (slider.scrollLeft >= slider.scrollWidth / 2) {
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += scrollStep;
            }
        };

        let intervalId;

        if (!isPaused) {
            intervalId = setInterval(scroll, scrollInterval);
        }

        return () => clearInterval(intervalId);
    }, [isPaused, isMobile]);

    function BlockchainNews(newsItems, blockchain) {
        if (!newsItems) return [];
        let ecommerceNews = [];

        newsItems.forEach(item => {
            // Check if the item is active, the content is an array, and the industry is 'ecommerce'
            if (item.activity && Array.isArray(item.rssContent) && item.industry.toLowerCase() === blockchain) {
                item.rssContent.forEach((news, rssIndex) => {
                    ecommerceNews.push({
                        newsDetails: news,
                        rssIndex: rssIndex,  // Include the rssIndex here
                        parentDetails: {
                            industry: item.industry,
                            icon: item.icon,
                            title: item.title
                        }
                    });
                });
            }
        });

        // Sort ecommerce news items by date in descending order and take the top 4
        ecommerceNews.sort((a, b) => new Date(b.newsDetails.publishDate) - new Date(a.newsDetails.publishDate));
        return ecommerceNews.slice(0, 1); // Take the top 4 latest ecommerce news
    }

    const fintech = BlockchainNews(newsItems, "fintech")
    const edtech = BlockchainNews(newsItems, "edtech")
    const technology = BlockchainNews(newsItems, "technology")
    // const agritech = BlockchainNews(newsItems, "agritech")
    const healthtech = BlockchainNews(newsItems, "healthtech")
    const blockchain = BlockchainNews(newsItems, "blockchain")
    const traveltech = BlockchainNews(newsItems, "traveltech")
    const MobileEv = BlockchainNews(newsItems, "mobility-ev")
    const socialMedia = BlockchainNews(newsItems, "social-media")
    const CyberSecurity = BlockchainNews(newsItems, "cyber-security")
    const Logitech = BlockchainNews(newsItems, "logistictech")
    const RetailTech = BlockchainNews(newsItems, "retail-tech")
    const Crypto = BlockchainNews(newsItems, "crypto")
    const Startup = BlockchainNews(newsItems, "startup")
    const Bussiness = BlockchainNews(newsItems, "business")
    const General = BlockchainNews(newsItems, "general")
    const Gedget = BlockchainNews(newsItems, "gadgets")

    // const combinedNews = [
    //     ...edtech,
    //     ...fintech,
    //     ...technology,
    //     ...agritech,
    //     ...healthtech,
    //     ...blockchain,
    //     ...traveltech
    // ];
    const combinedNews = [];

    // Use the push method to add elements from each category
    combinedNews.push(...edtech);
    combinedNews.push(...fintech);
    combinedNews.push(...technology);
    // combinedNews.push(...agritech);
    combinedNews.push(...healthtech);
    combinedNews.push(...blockchain);
    combinedNews.push(...traveltech);
    combinedNews.push(...MobileEv);
    combinedNews.push(...socialMedia);
    combinedNews.push(...CyberSecurity);
    combinedNews.push(...Logitech);
    combinedNews.push(...RetailTech);
    combinedNews.push(...Crypto);
    combinedNews.push(...Startup);
    combinedNews.push(...Bussiness);
    combinedNews.push(...General);
    combinedNews.push(...Gedget);

    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    // }

    // // Shuffle the combinedNews array
    // const shuffledNews = shuffleArray(combinedNews);


    return (
        <div
            ref={sliderRef}
            className="slider-container"
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
            style={{ overflowX: isMobile ? 'scroll' : 'hidden' }} // Manual scroll on mobile, auto-scroll on web
        >
            {combinedNews.map((news, index) => (
                <NewsCardFour key={index} news={news} allNewsData={combinedNews} />
            ))}
        </div>
    );
};

export default NewsSlider;

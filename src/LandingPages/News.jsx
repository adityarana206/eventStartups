import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./News.css"; // Assuming you have a CSS file for styling
import AllNews from "../Component/NewsCards/AllNews";
import IndustryNews from "../Component/NewsCards/IndustryNews";
import LoadingAnimation from "../Component/LoadingAnimation";
import animationData from "../Assets/Loading/Loading.json";
import ImageOne from "../Assets/PickDeckSlider/images/imageOne.png";
import ImageTwo from "../Assets/PickDeckSlider/images/imageTwo.png";
import PDFTwo from "../Assets/PickDeckSlider/PDFs/PitchDeck.pptx";
import PDFOne from "../Assets/PickDeckSlider/PDFs/DubaiDelegation.pdf";
import GoogleAds from "../Component/NewsCards/GoogleAdsComponent";
import PichDeckSlider from "../Component/NewsCards/PichDeckSlider";
import LatestNews from "../Component/NewsCards/LatestNews";
import { mockEvents, mockNewsChannels, mockRssFeeds } from "../mockData";

const initialNewsItems = mockNewsChannels
  .filter((news) => news.activity)
  .map((news) => {
    const rssItems = mockRssFeeds[news.link] || [];
    return {
      ...news,
      rssContent: rssItems.map((item) => ({
        title: item.title || "No title available",
        publishDate: item.pubDate || "No date available",
        author: item.author || "Unknown author",
        description: item.description || "No description available",
        imageUrl: item.enclosure?.link || item.imageUrl || "",
        link: item.link,
        industry: news.industry,
        publisher: news.title || "Source Feed",
      })),
    };
  });

const images = [ImageOne, ImageTwo];
const downloads = [PDFOne, PDFTwo];

function News() {
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [eventData, setEventData] = useState(mockEvents);
  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [showLatestNews, setShowLatestNews] = useState(false);
  const sliderRef = useRef(null);

  // const navigate = useNavigate(); // To programmatically navigate or update the URL
  // const location = useLocation(); // To get the current location

  function extractImageUrlFromDescription(description) {
    const imgRegex = /<img[^>]+src="([^">]+)"/; // Regex to find img tag and capture src
    const match = description.match(imgRegex);
    return match ? match[1] : "/path/to/default-image.png"; // Return the match or a default image path
  }

  // const fetchNewsData = async () => {
  //     try {
  //         const response = await axios.get('http://start.startupgpt.fyi/news-fetch');
  //         const fetchedNewsData = response.data;

  //         const activeNewsItems = fetchedNewsData.filter(news => news.activity);
  //         const updatedNewsItems = await Promise.all(activeNewsItems.map(async (news) => {
  //             const RSS_TO_JSON_SERVICE_URL = `https://api.rss2json.com/v1/api.json?rss_url=${news.link}`;
  //             try {
  //                 const rssResponse = await axios.get(RSS_TO_JSON_SERVICE_URL);
  //                 const fetchedItems = rssResponse.data.items.map(item => {
  //                     const imageUrl = item.enclosure && item.enclosure.link
  //                         ? item.enclosure.link
  //                         : extractImageUrlFromDescription(item.description);

  //                     return {
  //                         title: item.title || 'No title available',
  //                         publishDate: item.pubDate || 'No date available',
  //                         author: item.author || 'Unknown author',
  //                         description: item.description || 'No description available',
  //                         imageUrl: imageUrl,
  //                         link: item.link,
  //                         industry: news.industry,
  //                         publisher: rssResponse.data.feed.title,
  //                     };
  //                 });
  //                 return {
  //                     ...news,
  //                     rssContent: fetchedItems,
  //                 };
  //             } catch (error) {
  //                 console.error(`Error fetching data from RSS URL ${news.link}:`, error);
  //                 return { ...news, rssContent: [] };
  //             }
  //         }));

  //         setNewsItems(updatedNewsItems);
  //         setLoading(false);
  //     } catch (error) {
  //         console.error('Error fetching news data:', error);
  //         setLoading(false);
  //     }
  // };
  const fetchNewsData = async () => {
    try {
      const response = await axios.get("/api/news-fetch");
      const fetchedNewsData = response.data;

      const activeNewsItems = fetchedNewsData.filter((news) => news.activity);
      const updatedNewsItems = await Promise.all(
        activeNewsItems.map(async (news) => {
          const RSS_TO_JSON_SERVICE_URL = `https://api.rss2json.com/v1/api.json?rss_url=${news.link}`;
          try {
            const rssResponse = await axios.get(RSS_TO_JSON_SERVICE_URL);
            const fetchedItems = rssResponse.data.items.map((item) => {
              let imageUrl =
                item.enclosure && item.enclosure.link
                  ? item.enclosure.link
                  : extractImageUrlFromDescription(item.description);

              // Modify image URL to ensure best quality (adjust width/height/quality if necessary)
              if (imageUrl && imageUrl.includes("cdn-cgi/image")) {
                imageUrl = imageUrl.replace(/quality=\d+/g, "quality=100"); // Set highest quality
                imageUrl = imageUrl
                  .replace(/width=\d+/g, "width=1200")
                  .replace(/height=\d+/g, "height=800"); // Set larger size
              }

              return {
                title: item.title || "No title available",
                publishDate: item.pubDate || "No date available",
                author: item.author || "Unknown author",
                description: item.description || "No description available",
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
            console.error(
              `Error fetching data from RSS URL ${news.link}:`,
              error,
            );
            return { ...news, rssContent: [] };
          }
        }),
      );

      setNewsItems(updatedNewsItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setLoading(false);
    }
  };
  // const fetchNewsData = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:5001/news-fetch'); // Backend endpoint
  //         const fetchedNewsData = response.data;
  //         console.log(fetchedNewsData, 'newdata')
  //         setNewsItems(fetchedNewsData); // Store the news data in state
  //         setLoading(false); // Set loading to false when data is fetched
  //     } catch (error) {
  //         console.error('Error fetching news data:', error);
  //         setLoading(false); // Set loading to false even in case of error
  //     }
  // };

  useEffect(() => {
    // News data is pre-seeded synchronously, no background effect needed
  }, []);

  useEffect(() => {
    // Event data is pre-seeded synchronously, no background effect needed
  }, []);

  // useEffect(() => {
  //     // Update selectedIndustry based on the current URL path
  //     const pathIndustry = location.pathname.replace('/', '').toLowerCase();
  //     if (pathIndustry) {
  //         setSelectedIndustry(pathIndustry.charAt(0).toUpperCase() + pathIndustry.slice(1));
  //     } else {
  //         setSelectedIndustry('All');
  //     }
  // }, [location.pathname]);

  if (loading) {
    return null; // Return empty content instantly to avoid any loading screen flashes
  }
  const industries = [
    { label: "All", value: "All" },
    { label: "Fintech", value: "Fintech" },
    { label: "AI", value: "Ai" },
    { label: "AR/VR", value: "Ar-vr" },
    { label: "Ecommerce", value: "Ecommerce" },
    { label: "D2C", value: "D2C" },
    { label: "Mobility/EV", value: "Mobility-ev" },
    { label: "FoodTech", value: "Foodtech" },
    { label: "Web 3.0", value: "Web3-0" },
    { label: "EdTech", value: "Edtech" },
    { label: "Social Media", value: "Social-media" },
    { label: "Technology", value: "Technology" },
    { label: "AgriTech", value: "Agritech" },
    { label: "Government", value: "Government" },
    { label: "HealthTech", value: "Healthtech" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "HR Tech", value: "Hr-tech" },
    { label: "Metaverse", value: "Metaverse" },
    { label: "Real Estate Tech", value: "Real-estate-tech" },
    { label: "SaaS", value: "Saas" },
    { label: "SpaceTech", value: "Spacetech" },
    { label: "Cyber Security", value: "Cyber-security" },
    { label: "Blockchain", value: "Blockchain" },
    { label: "Wellness", value: "Wellness" },
    { label: "AirTech", value: "Airtech" },
    { label: "B2B", value: "B2B" },
    { label: "BeautyTech", value: "Beautytech" },
    { label: "InsuranceTech", value: "Insurancetech" },
    { label: "LogisticTech", value: "Logistictech" },
    { label: "Online Media", value: "Online-media" },
    { label: "ParkTech", value: "Parktech" },
    { label: "Retail Tech", value: "Retail-tech" },
    { label: "SolarTech", value: "Solartech" },
    { label: "Telecom", value: "Telecom" },
    { label: "TravelTech", value: "Traveltech" },
    { label: "Crypto", value: "Crypto" },
    { label: "Startup", value: "Startup" },
    { label: "Business", value: "Business" },
    { label: "General", value: "General" },
    { label: "Gadgets", value: "Gadgets" },
  ];

  // const industries = [
  //     'All', 'Fintech', 'Ai', 'Ar-vr', 'Ecommerce', 'D2C', 'Mobility-ev', 'Foodtech',
  //     'Web3-0', 'Edtech', 'Social-media', 'Technology', 'Agritech', 'Government',
  //     'Healthtech', 'Hospitality', 'Hr-tech', 'Metaverse', 'Real-estate-tech', 'Saas',
  //     'Spacetech', 'Cyber-security', 'Blockchain', 'Wellness', 'Airtech', 'B2B',
  //     'Beautytech', 'Insurancetech', 'Logistictech', 'Online-media', 'Parktech',
  //     'Retail-tech', 'Solartech', 'Telecom', 'Traveltech', 'Crypto', 'Startup',
  //     'Business', 'General', 'Gadgets'
  // ];
  // const industries = [
  //     'All', 'Fintech', 'AI', 'AR/VR', 'Ecommerce', 'D2C', 'Mobility/EV', 'FoodTech',
  //     'Web 3.0', 'EdTech', 'Social media', 'Technology', 'AgriTech', 'Government',
  //     'HealthTech', 'Hospitality', 'HR Tech', 'Metaverse', 'Real Estate Tech', 'Saas',
  //     'SpaceTech', 'Cyber Security', 'Blockchain', 'Wellness', 'AirTech', 'B2B',
  //     'BeautyTech', 'InsuranceTech', 'LogisticTech', 'Online Media', 'ParkTech',
  //     'Retail Tech', 'SolarTech', 'Telecom', 'TravelTech', 'Crypto', 'Startup',
  //     'Business', 'General', 'Gadgets'
  // ];

  const filteredNewsItems =
    selectedIndustry === "All"
      ? newsItems
      : newsItems.filter(
          (newsItem) =>
            newsItem.industry &&
            newsItem.industry.toLowerCase() === selectedIndustry.toLowerCase(),
        );

  const filteredEventData =
    selectedIndustry === "All"
      ? eventData
      : eventData.filter(
          (event) =>
            event.industry.toLowerCase() === selectedIndustry.toLowerCase(),
        );

  // const handleIndustryClick = (industry) => {
  //     const lowerCaseIndustry = industry.toLowerCase();
  //     navigate(`/${lowerCaseIndustry}`); // Update the URL without navigating away
  //     setSelectedIndustry(industry); // Update the selected industry state
  // };

  // const handleSelectLocation = (location) => {
  //     const filteredEvents = eventData.filter(event => event.city === location.city);
  //     setFilteredEventData(filteredEvents);
  //     setIsPopupOpen(false); // Close the popup after selection
  //     setSelectedLocation(location.city);
  //     localStorage.setItem('popupClosed', 'true');
  // };

  // const uniqueNationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'National').map(event => event.city))]
  //     .map(city => ({ city, modeofevent: 'National' }));

  // const uniqueInternationalLocations = [...new Set(eventData.filter(event => event.modeofevent === 'International').map(event => event.city))]
  //     .map(city => ({ city, modeofevent: 'International' }));

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    setShowLatestNews(false); // Reset showLatestNews when an industry is selected
  };

  const handleViewAllClick = () => {
    setShowLatestNews(true); // Show the latest news container
    setSelectedIndustry("");
  };

  return (
    <div className="news-container">
      <div className="industry-slider-container">
        {/* <LocationPopup isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    onSelectLocation={handleSelectLocation}
                    national={uniqueNationalLocations} international={uniqueInternationalLocations} /> */}
        <div className="industry-slider" ref={sliderRef}>
          {/* {industries.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`industry-button ${selectedIndustry === value ? 'active' : ''}`}
                            onClick={() => setSelectedIndustry(value)}
                        >
                            {label}
                        </button>
                    ))} */}
          {industries.map(({ label, value }) => (
            <div key={value} className="industry-container-news">
              <button
                className={`industry-button ${selectedIndustry === value ? "active" : ""}`}
                onClick={() => handleIndustryChange(value)}
              >
                {label}
              </button>
              {selectedIndustry === value && <div className="underline"></div>}
            </div>
          ))}
        </div>
      </div>
      <div className="google-ads-slider">
        <div className="google-ads-section">
          <GoogleAds />
        </div>
        <PichDeckSlider images={images} downloads={downloads} />
      </div>
      {/* {selectedIndustry === 'All' ? (
                <AllNews newsItems={filteredNewsItems} filteredEventData={filteredEventData} setSelectedIndustry={setSelectedIndustry} images={images} loading={loading} setLoading={setLoading} downloads={downloads} />
            ) : (
                <IndustryNews newsItems={filteredNewsItems} filteredEventData={filteredEventData} eventData={eventData} selectedIndustry={selectedIndustry} loading={loading} setLoading={setLoading} images={images} downloads={downloads} />
            )} */}
      {!showLatestNews ? (
        <>
          {selectedIndustry === "All" ? (
            <AllNews
              newsItems={filteredNewsItems}
              filteredEventData={filteredEventData}
              setSelectedIndustry={setSelectedIndustry}
              images={images}
              loading={loading}
              handleViewAllClick={handleViewAllClick}
              setLoading={setLoading}
              downloads={downloads}
            />
          ) : (
            <IndustryNews
              newsItems={filteredNewsItems}
              filteredEventData={filteredEventData}
              eventData={eventData}
              selectedIndustry={selectedIndustry}
              loading={loading}
              setLoading={setLoading}
              images={images}
              downloads={downloads}
            />
          )}
        </>
      ) : (
        <LatestNews
          newsItems={newsItems}
          filteredEventData={filteredEventData}
          eventData={eventData}
          selectedIndustry={selectedIndustry}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default News;

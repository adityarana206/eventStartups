import React, { useEffect, useState } from "react";
import "./NewCard.css"; // Assuming CSS styles for both components are merged in this file
import ShareButton from "../../../Assets/News/CardOne/ShareButton";
import { useNavigate } from "react-router-dom";

function NewsDisplay({ newsItems, loading, setLoading, filteredEventData }) {
  const [latestNews, setLatestNews] = useState(null);

  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // function extractTextFromPTags(htmlContent) {
  //     const pTagContents = [];
  //     const pTagRegex = /<p>(.*?)<\/p>/gi;
  //     let match;

  //     while ((match = pTagRegex.exec(htmlContent)) !== null) {
  //         pTagContents.push(processHtmlContent(match[1]));
  //     }
  //     if (pTagContents.length > 0) {
  //         return truncateText(pTagContents.join(' '));
  //     }
  //     return truncateText(processHtmlContent(htmlContent));
  // }
  // function processHtmlContent(text) {
  //     const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)">(.*?)<\/a>/gi;
  //     const textWithLinksHandled = text.replace(linkRegex, "$2 (link: $1)");
  //     return textWithLinksHandled.replace(/<[^>]+>/gm, '');
  // }
  // function truncateText(text) {
  //     if (text.length > 250) {
  //         return text.substring(0, 200) + '...';
  //     }
  //     return text;
  // }
  function extractTextFromPTags(htmlContent) {
    const pTagContents = [];
    const pTagRegex = /<p>(.*?)<\/p>/gi;
    let match;

    while ((match = pTagRegex.exec(htmlContent)) !== null) {
      pTagContents.push(processHtmlContent(match[1]));
    }
    if (pTagContents.length > 0) {
      return truncateText(pTagContents.join(" "));
    }
    return truncateText(processHtmlContent(htmlContent));
  }

  function processHtmlContent(text) {
    // Remove links entirely
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href="[^"]*">(.*?)<\/a>/gi;
    const textWithoutLinks = text.replace(linkRegex, "");

    // Remove all remaining HTML tags
    return textWithoutLinks.replace(/<[^>]+>/gm, "");
  }

  function truncateText(text) {
    if (text.length > 250) {
      return text.substring(0, 200) + "...";
    }
    return text;
  }

  function capitalizeIndustry(industry) {
    if (!industry) return "";
    return industry.charAt(0).toUpperCase() + industry.slice(1).toLowerCase();
  }

  function getLatestNews(newsItems) {
    if (!newsItems || newsItems.length === 0) return null;

    let latestNews = null;
    // Initialize latestDate to the earliest possible time to ensure any valid date is newer
    let latestDate = new Date(0); // Epoch time

    newsItems.forEach((item) => {
      if (item.activity && Array.isArray(item.rssContent)) {
        item.rssContent.forEach((news) => {
          const newsDate = new Date(news.publishDate);
          // Ensure the newsDate is in the past and more recent than the current latest
          if (newsDate > latestDate && newsDate < new Date()) {
            latestDate = newsDate;
            latestNews = {
              newsDetails: news,
              parentDetails: {
                industry: item.industry,
                icon: item.icon,
                title: item.title,
              },
            };
          }
        });
      }
    });

    return latestNews;
  }

  function getLatestNewsone(newsItems) {
    if (!newsItems || !Array.isArray(newsItems)) return [];

    let allNews = [];

    newsItems.forEach((item) => {
      if (item.activity && Array.isArray(item.rssContent)) {
        item.rssContent.forEach((news) => {
          allNews.push({
            newsDetails: news,
            parentDetails: {
              industry: item.industry,
              icon: item.icon,
              title: item.title,
            },
          });
        });
      }
    });

    // Sort the news items by publish date in descending order (newest first)
    allNews.sort(
      (a, b) =>
        new Date(b.newsDetails.publishDate) -
        new Date(a.newsDetails.publishDate),
    );

    // Return the top 4 to 5 latest news items
    return allNews.slice(0, 5); // Adjust the number here to get the desired number of news items
  }

  function timeAgoInHours(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - givenDate;

    // Convert milliseconds to hours
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    return `${diffInHours}h`;
  }

  const latest = getLatestNewsone(newsItems);

  // const handleCardClick = () => {
  //     navigate(`/news-details`, { state: { news: latestNews, similar: latest, filteredEventData } });
  // };
  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleCardClick = () => {
    const newsTitleSlug = latest[0].newsDetails.title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

    const formattedDate = formatDate(latest[0].newsDetails.publishDate);

    navigate(`/${formattedDate}/${newsTitleSlug}`, {
      state: {
        news: latestNews,
        similar: latest.slice(1, 5),
        filteredEventData,
      },
    });
  };

  const handleShareClick = (linkToCopy) => {
    if (navigator.clipboard && window.isSecureContext) {
      // Copy the link to the clipboard
      navigator.clipboard.writeText(linkToCopy).then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy: ", err);
        },
      );
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = linkToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Effect hook to update the latest news on newsItems update
  useEffect(() => {
    if (newsItems && newsItems.length > 0) {
      console.log(latest[0], "latest");
      setLatestNews(getLatestNews(newsItems));
    }
    setLoading(false);
  }, [newsItems]);

  // Render the latest news or a fallback message
  return (
    <>
      {!latest[0] || (
        <div className="card-one-container" onClick={handleCardClick}>
          <div className="card-one-image">
            <img
              src={latest[0].newsDetails.imageUrl}
              alt="No Image is available to Display"
            />
          </div>
          <div className="card-one-details">
            <div className="card-one-subdetails">
              <span className="card-one-industry">
                {capitalizeIndustry(latest[0].parentDetails.industry)}
              </span>
              <h2 className="card-one-title">{latest[0].newsDetails.title}</h2>
              <p className="card-one-description">
                {extractTextFromPTags(latest[0].newsDetails.description)}
              </p>
            </div>
            <div className="card-one-subdetilstwo">
              <div className="card-one-icons">
                <div className="card-three-icon">
                  <img
                    src={
                      latest[0].parentDetails.icon
                        ? latest[0].parentDetails.icon.startsWith("http")
                          ? latest[0].parentDetails.icon
                          : `/api/${latest[0].parentDetails.icon.replace(/\\/g, "/").replace("uploads/", "")}`
                        : ""
                    }
                    alt="News Icon"
                  />
                </div>
                <span className="card-one-source-name">
                  {latest[0].parentDetails.title}
                </span>
                <span className="card-one-source-name">
                  {timeAgoInHours(latest[0].newsDetails.publishDate)}
                </span>
              </div>
              <div onClick={() => handleShareClick(latest[0].newsDetails.link)}>
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsDisplay;

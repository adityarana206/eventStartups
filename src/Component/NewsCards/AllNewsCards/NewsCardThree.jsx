import React from "react";
import ShareButton from "../../../Assets/News/CardOne/ShareButton";
import { useNavigate } from "react-router-dom";

function NewsCardThree({ news, allNewsData, filteredEventData }) {
  const navigate = useNavigate();

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleCardClick = () => {
    const newsTitleSlug = news.newsDetails.title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

    const formattedDate = formatDate(news.newsDetails.publishDate);

    navigate(`/${formattedDate}/${newsTitleSlug}`, {
      state: {
        news: news,
        similar: allNewsData.slice(1, 5),
        filteredEventData,
      },
    });
  };

  if (!news) {
    return null;
  }
  const capitalizeIndustry = (industry) => {
    if (!industry) return "";
    return industry.charAt(0).toUpperCase() + industry.slice(1).toLowerCase();
  };

  const extractTextFromPTags = (htmlContent) => {
    const pTagContents = [];
    const pTagRegex = /<p\b[^>]*>(.*?)<\/p>/gis; // More robust regex to match <p> tags with attributes
    let match;

    // Extract text within <p> tags
    while ((match = pTagRegex.exec(htmlContent)) !== null) {
      const cleanedContent = match[1].replace(/<[^>]*>?/gm, ""); // Remove any HTML tags inside <p> content
      if (cleanedContent.trim()) {
        pTagContents.push(cleanedContent.trim());
      }
    }

    let finalText = "";
    // If <p> tags found, join their contents
    if (pTagContents.length > 0) {
      finalText = pTagContents.join(" ");
    } else {
      // Fallback: remove all HTML tags and return plain text from the entire HTML
      finalText = htmlContent.replace(/<[^>]*>?/gm, "");
    }

    // Check if the final text exceeds 200 characters
    if (finalText.length > 250) {
      return finalText.substring(0, 197) + "..."; // Truncate and add ellipsis
    }

    return finalText;
  };

  // function convertTimeToHours(timeString) {
  //     // Parse the time string
  //     const [time, modifier] = timeString.split(' ');
  //     let [hours, minutes, seconds] = time.split(':').map(Number);

  //     // Adjust hours based on AM/PM
  //     if (modifier === 'PM' && hours !== 12) {
  //         hours += 12;
  //     }
  //     if (modifier === 'AM' && hours === 12) {
  //         hours = 0;
  //     }

  //     // Calculate total time in minutes from 12:00:00 AM
  //     const totalMinutes = hours * 60 + minutes;

  //     // Convert total minutes into hours and round to the nearest hour
  //     const durationHours = Math.round(totalMinutes / 60);

  //     return `${durationHours}h`;
  // }

  function convertTimeToRelativeTime(dateString) {
    // Parse the date string to a Date object
    const pastDate = new Date(dateString.replace(/-/g, "/")); // Replace hyphens with slashes for better compatibility

    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const differenceMs = now - pastDate;

    // Convert milliseconds to minutes, hours, days, and weeks
    const minutesAgo = Math.round(differenceMs / (1000 * 60));
    const hoursAgo = Math.round(differenceMs / (1000 * 60 * 60));
    const daysAgo = Math.round(differenceMs / (1000 * 60 * 60 * 24));
    const weeksAgo = Math.round(differenceMs / (1000 * 60 * 60 * 24 * 7));

    if (daysAgo >= 7) {
      return `${weeksAgo}w`;
    } else if (hoursAgo >= 24) {
      return `${daysAgo}d`;
    } else {
      return `${hoursAgo}h`;
    }
  }
  // function truncateText(text) {
  //     if (text.length > 70) {
  //         return text.substring(0, 69) + '...'; // Truncate and add ellipsis
  //     }
  //     return text;
  // }
  function truncateText(text) {
    let maxLength;

    // Check if the current environment is a browser
    if (typeof window !== "undefined") {
      // Define mobile breakpoint (e.g., less than 768px width is considered mobile)
      const mobileBreakpoint = 768;
      maxLength = window.innerWidth <= mobileBreakpoint ? 30 : 72;
    } else {
      // Default to larger size if not in a browser environment (e.g., during server-side rendering)
      maxLength = 72;
    }

    // Truncate text if it's longer than the maximum length for the device
    if (text.length > maxLength + 1) {
      return text.substring(0, maxLength) + "..."; // Truncate and add ellipsis
    }
    return text;
  }

  return (
    <div className="card-three-container" onClick={handleCardClick}>
      <div className="card-three-image">
        <img
          src={news.newsDetails.imageUrl}
          alt="No Image is available to Display"
        />
      </div>
      <div className="card-three-details">
        <div className="card-three-subdetails">
          <span className="card-three-industry">
            {capitalizeIndustry(news.parentDetails.industry)}
          </span>
          <h2 className="card-three-title">
            {truncateText(news.newsDetails.title)}
          </h2>
          <p className="card-three-description">
            {extractTextFromPTags(news.newsDetails.description)}
          </p>
        </div>
        <div className="news-card-four-icons">
          <div className="news-card-four-icons-name">
            <div className="card-three-icon">
              <img
                src={
                  news.parentDetails.icon
                    ? news.parentDetails.icon.startsWith("http")
                      ? news.parentDetails.icon
                      : `/api/${news.parentDetails.icon.replace(/\\/g, "/").replace("uploads/", "")}`
                    : ""
                }
                alt=""
              />
            </div>
            <span className="card-three-source-name">
              {" "}
              {news.parentDetails.title}
            </span>
          </div>
          <span className="news-card-three-time">
            {news.newsDetails.publishDate
              ? convertTimeToRelativeTime(news.newsDetails.publishDate)
              : "No date"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewsCardThree;

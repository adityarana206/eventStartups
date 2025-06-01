import React from 'react';
import './NewCard.css'

const NewsCardTwo = ({ iconUrl, industry, article, title }) => {
  if (!article) {
    return null; // or return a placeholder component
  }

  function limitTitleCharacters(title, maxChars = 50) {
    if (title.length <= maxChars) {
      return title;
    }
    const truncatedTitle = title.slice(0, maxChars);
    return truncatedTitle + '…';
  }


  function capitalizeIndustry(industry) {
    if (!industry) return ''; // Return an empty string if input is empty or undefined

    // Capitalize the first letter and add the rest of the string
    return industry.charAt(0).toUpperCase() + industry.slice(1).toLowerCase();
  }

  // function convertTimeToHours(timeString) {
  //   // Parse the time string
  //   const [time, modifier] = timeString.split(' ');
  //   let [hours, minutes, seconds] = time.split(':').map(Number);

  //   // Adjust hours based on AM/PM
  //   if (modifier === 'PM' && hours !== 12) {
  //     hours += 12;
  //   }
  //   if (modifier === 'AM' && hours === 12) {
  //     hours = 0;
  //   }

  //   // Calculate total time in minutes from 12:00:00 AM
  //   const totalMinutes = hours * 60 + minutes;

  //   // Convert total minutes into hours and round to the nearest hour
  //   const durationHours = Math.round(totalMinutes / 60);

  //   return `${durationHours}h`;
  // }

  function convertTimeToRelativeTime(dateString) {
    // Parse the date string to a Date object
    const pastDate = new Date(dateString.replace(/-/g, '/')); // Replace hyphens with slashes for better compatibility

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



  return (
    <div className="news-card">
      <div className='news-card-two-image'>
        <img src={article.imageUrl ? article.imageUrl : ''} alt={article.title} />
      </div>
      <div className="news-card-two-content">
        <div className='news-card-two-subcontain'>
          <p className="news-card-category">{capitalizeIndustry(industry)}</p>
          <h2 className='news-card-two-title'>{limitTitleCharacters(article.title)}</h2>
        </div>
        {/* <span><img style={{ height: '10px', width: '12px' }} src={iconUrl ? `https://startupgpt.fyi/${iconUrl.replace(/\\/g, "/").replace("uploads/", "")}` : ''} alt="" /> {title} {article.publishDate ? convertTimeToHours(new Date(article.publishDate).toLocaleTimeString()) : 'No date'}</span> */}
        <div className='news-card-four-icons'>
          <div className='news-card-four-icons-name'>
            <div className='card-three-icon'>
              <img src={`https://snfyibackend.onrender.com/${iconUrl.replace(/\\/g, "/").replace("uploads/", "")}`} alt="" />
            </div>
            <span className='news-card-four-source-name' > {title}</span>
          </div>
          <span className='news-card-four-time' >{article.publishDate ? convertTimeToRelativeTime(article.publishDate) : 'No date'}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCardTwo;

import React from 'react'
import { useNavigate } from 'react-router-dom';

function NewsCardFour({ news, newsIndex, allNewsData, filteredEventData }) {
    const navigate = useNavigate();

    function formatDate(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const handleCardClick = () => {
        const newsTitleSlug = news.newsDetails.title
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens

        const formattedDate = formatDate(news.newsDetails.publishDate);

        navigate(`/${formattedDate}/${newsTitleSlug}`, { state: { news: news, similar: allNewsData.slice(10, 15), filteredEventData } });
    };

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
        <div className="news-card" onClick={handleCardClick} >
            <div className='news-card-two-image'>
                <img src={news.newsDetails.imageUrl} alt='No Image is available to Display' />
            </div>
            <div className="news-card-two-content">
                <div className='news-card-two-subcontain'>
                    <p className="news-card-category">{capitalizeIndustry(news.parentDetails.industry)}</p>
                    <h2 className='news-card-two-title'>{limitTitleCharacters(news.newsDetails.title)}</h2>
                </div>
                <div className='news-card-four-icons'>
                    <div className='news-card-four-icons-name'>
                        <div className='card-three-icon'>
                            <img src={`https://snfyibackend.onrender.com/${news.parentDetails.icon.replace(/\\/g, "/").replace("uploads/", "")}`} alt="" />
                        </div>
                        <span className='news-card-four-source-name' > {news.parentDetails.title}</span>
                    </div>
                    <span className='news-card-four-time' >{news.newsDetails.publishDate ? convertTimeToRelativeTime(news.newsDetails.publishDate) : 'No date'}</span>
                </div>
            </div>
        </div>
    )
}

export default NewsCardFour
import React from "react";
import { useNavigate } from "react-router-dom";
import Dates from "../Assets/EventDetails/Date";
import LocationPopup from "./LocationPopup";

const UpcomingEvents = ({ events }) => {
  const navigate = useNavigate();

  const sanitizeEventNameForURL = (eventname) => {
    return eventname
      .toLowerCase()
      .replace(/\|/g, "-") // Replace each '|' with a single '-'
      .replace(/[^a-z0-9'-]+/g, "-") // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
      .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
      .replace(/^-|-$/g, ""); // Remove any non-word characters except dashes
  };

  const handleCardClick = (eventname) => {
    const recentlyViewed =
      JSON.parse(sessionStorage.getItem("recentlyViewedEvents")) || [];
    if (!recentlyViewed.includes(eventname)) {
      recentlyViewed.push(sanitizeEventNameForURL(eventname));
      sessionStorage.setItem(
        "recentlyViewedEvents",
        JSON.stringify(recentlyViewed.slice(-5)),
      );
    }
    navigate(`/event/${sanitizeEventNameForURL(eventname)}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // 4-20 are all 'th'
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} '${year}`;
  }

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-contain">
        <h2 className="upcoming-events-title">{events.eventname}</h2>
        <span className="upcoming-event-date">
          <Dates /> {formatDate(events.startdate)}
        </span>
      </div>
      <div>
        <button
          className="upcoming-register-button"
          onClick={() => handleCardClick(events.eventname)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

function Privacyandpolicy({
  eventData,
  setSelectedLocation,
  isPopupOpen,
  setIsPopupOpen,
}) {
  const safeEventData = eventData || [];

  const handleSelectLocation = (location) => {
    // Set the selected location
    setSelectedLocation(location.city);
    setIsPopupOpen(false);
    localStorage.setItem("popupClosed", "true");
  };

  const uniqueNationalLocations = [
    ...new Set(
      safeEventData
        .filter((event) => event.modeofevent === "National")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "National" }));

  const uniqueInternationalLocations = [
    ...new Set(
      safeEventData
        .filter((event) => event.modeofevent === "International")
        .map((event) => event.city),
    ),
  ].map((city) => ({ city, modeofevent: "International" }));

  return (
    <>
      <div className="about-us-container">
        <LocationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSelectLocation={handleSelectLocation}
          national={uniqueNationalLocations}
          international={uniqueInternationalLocations}
        />
        <div className="privecy-policy-div-one">
          <div className="about-us-text-div">
            <h1 className="about-text">Privacy Policy</h1>
            <span className="about-us-discription">
              StartupNews.fyi is India’s leading news & technology media company
              that focuses on Startups in India and top stories across the
              globe. From latest news to the unicorns, we cover everything that
              happens in Startup World. Within a short span of time we have
              placed a great trust with the startups & reached to over 2 million
              enthusiasts. Whether it is the in-person meetups and international
              delegations SNFYI has served the ecosystem and helped
              several startups and investors to connect & spread the word
              through a single channel.
            </span>
            <span className="about-us-discription">
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us
            </span>
            <span className="about-us-discription">
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in StartupNews.fyi. This policy
              does not apply to any information collected offline or via
              channels other than this website.
            </span>
          </div>
          <div className="about-us-text-div">
            <h1 className="privecy-text">Consent</h1>
            <span className="about-us-discription">
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </span>
          </div>
          <div className="about-us-text-div">
            <h1 className="privecy-text">Information we collect</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
              </span>
              <span className="about-us-discription">
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
                When you register for an Account, we may ask for your contact
                information, including items such as name, company name,
                address, email address, and telephone number.
              </span>
              <span className="about-us-discription">
                How do we use your information?
              </span>
              <span className="about-us-discription">
                We use the information we collect in various ways, including:
              </span>
              <ol className="privecy-policy-list">
                <li className="about-us-discription">
                  Provide, operate, and maintain our website
                </li>
                <li className="about-us-discription">
                  Improve, personalize, and expand our website
                </li>
                <li className="about-us-discription">
                  Understand and analyze how you use our website
                </li>
                <li className="about-us-discription">
                  Develop new products, services, features, and functionality
                </li>
                <li className="about-us-discription">
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes
                </li>
                <li className="about-us-discription">Send you emails</li>
                <li className="about-us-discription">Find and prevent fraud</li>
              </ol>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">Log Files</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
              </span>
              <span className="about-us-discription">
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
                When you register for an Account, we may ask for your contact
                information, including items such as name, company name,
                address, email address, and telephone number.
              </span>
              <span className="about-us-discription">
                How do we use your information?
              </span>
              <span className="about-us-discription">
                We use the information we collect in various ways, including:
              </span>
              <ol className="privecy-policy-list">
                <li className="about-us-discription">
                  Provide, operate, and maintain our website
                </li>
                <li className="about-us-discription">
                  Improve, personalize, and expand our website
                </li>
                <li className="about-us-discription">
                  Understand and analyze how you use our website
                </li>
                <li className="about-us-discription">
                  Develop new products, services, features, and functionality
                </li>
                <li className="about-us-discription">
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes
                </li>
                <li className="about-us-discription">Send you emails</li>
                <li className="about-us-discription">Find and prevent fraud</li>
              </ol>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">Log Files</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                StartupNews.fyi follows a standard procedure of using log files.
                These files log visitors when they visit websites. All hosting
                companies do this and are a part of hosting services’ analytics.
                The information collected by log files includes internet
                protocol (IP) addresses, browser type, Internet Service Provider
                (ISP), date and time stamp, referring/exit pages, and possibly
                the number of clicks. These are not linked to any information
                that is personally identifiable. The purpose of the information
                is for analyzing trends, administering the site, tracking users’
                movement on the website, and gathering demographic information.
              </span>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">Our Advertising Partners</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                Some of the advertisers on our site may use cookies and web
                beacons. Our advertising partners are listed below. Each of our
                advertising partners has its own Privacy Policy for their
                policies on user data. For easier access, we hyperlinked to
                their Privacy Policies below.
              </span>
              <ol className="privecy-policy-list">
                <li className="about-us-discription">Google</li>
                <li className="about-us-discription">
                  https://policies.google.com/technologies/ads
                </li>
              </ol>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">
              Advertising Partners Privacy Policies
            </h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                You may consult this list to find the Privacy Policy for each of
                the advertising partners of StartupNews.fyi. Third-party ad
                servers or ad networks uses technologies like cookies,
                JavaScript, or Web Beacons that are used in their respective
                advertisements and links that appear on StartupNews.fyi, which
                are sent directly to users’ browser. They automatically receive
                your IP address when this occurs. These technologies are used to
                measure the effectiveness of their advertising campaigns and/or
                to personalize the advertising content that you see on websites
                that you visit. Note that StartupNews.fyi has no access to or
                control over these cookies that are used by third-party
                advertisers.
              </span>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">Third-Party Privacy Policies</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                StartupNews.fyi’s Privacy Policy does not apply to other
                advertisers or websites. Thus, we are advising you to consult
                the respective Privacy Policies of these third-party ad servers
                for more detailed information. It may include their practices
                and instructions about how to opt-out of certain options.
              </span>
              <span className="about-us-discription">
                You can choose to disable cookies through your individual
                browser options. To know more detailed information about cookie
                management with specific web browsers, it can be found at the
                browsers’ respective websites.
              </span>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                Under the CCPA, among other rights, California consumers have
                the right to:
              </span>
              <ol className="privecy-policy-list">
                <li className="about-us-discription">
                  Request that a business that collects a consumer’s personal
                  data disclose the categories and specific pieces of personal
                  data that a business has collected about consumers.
                </li>
                <li className="about-us-discription">
                  Request that a business deletes any personal data about the
                  consumer that a business has collected.
                </li>
                <li className="about-us-discription">
                  Request that a business that sells a consumer’s personal data,
                  not sell the consumer’s personal data.
                </li>
              </ol>
              <span className="about-us-discription">
                If you make a request, we have one month to respond to you. If
                you would like to exercise any of these rights, please contact
                us.
              </span>
            </div>
          </div>
          {/*  */}
          <div className="about-us-text-div">
            <h1 className="privecy-text">GDPR Data Protection Rights</h1>
            <div className="privecy-text-div">
              <span className="about-us-discription">
                We would like to make sure you are fully aware of all of your
                data protection rights. Every user is entitled to the following:
              </span>
              <ol className="privecy-policy-list">
                <li className="about-us-discription">
                  The right to access – You have the right to request copies of
                  your personal data. We may charge you a small fee for this
                  service.
                </li>
                <li className="about-us-discription">
                  The right to rectification – You have the right to request
                  that we correct any information you believe is inaccurate. You
                  also have the right to request that we complete the
                  information you believe is incomplete.
                </li>
                <li className="about-us-discription">
                  The right to erasure – You have the right to request that we
                  erase your personal data, under certain conditions.
                </li>
                <li className="about-us-discription">
                  The right to restrict processing – You have the right to
                  request that we restrict the processing of your personal data,
                  under certain conditions.
                </li>
                <li className="about-us-discription">
                  The right to object to processing – You have the right to
                  object to our processing of your personal data, under certain
                  conditions.
                </li>
                <li className="about-us-discription">
                  The right to data portability – You have the right to request
                  that we transfer the data that we have collected to another
                  organization, or directly to you, under certain conditions.​
                </li>
              </ol>
              <span className="about-us-discription">
                If you make a request, we have one month to respond to you. If
                you would like to exercise any of these rights, please contact
                us.
              </span>
            </div>
            {/*  */}
            <div className="about-us-text-div">
              <h1 className="privecy-text">Children’s Information</h1>
              <div className="privecy-text-div">
                <span className="about-us-discription">
                  Another part of our priority is adding protection for children
                  while using the internet. We encourage parents and guardians
                  to observe, participate in, and/or monitor and guide their
                  online activity.
                </span>
                <span className="about-us-discription">
                  StartupNews.fyi does not knowingly collect any Personal
                  Identifiable Information from children under the age of 13. If
                  you think that your child provided this kind of information on
                  our website, we strongly encourage you to contact us
                  immediately and we will do our best efforts to promptly remove
                  such information from our records.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-us-div-two">
          <div className="about-us-events">
            <h2 className="upcoming-event-text">Upcoming Events</h2>
            <div className="upcoming-event-cards">
              {eventData ? (
                eventData.slice(0, 5).map((event, index) => (
                  <div className="upcoming-event-card" key={index}>
                    <UpcomingEvents events={event} />
                  </div>
                ))
              ) : (
                <p>No Events to display</p>
              )}
            </div>
          </div>
          <div className="about-us-contact">
            <h2 className="about-us-addres-text">Communication Address</h2>
            <div className="about-us-contact-details">
              <span className="about-us-contact-text">
                DOTFYI Media Ventures Private Limited.
              </span>
              <span className="about-us-contact-text">
                AltF Spaces 5th floor, Wing A Statesman House,Barakhamba Road,
                Delhi, India – 110001
              </span>
              <span className="about-us-contact-text">
                CIN No. : U22100DL2022PTC403240
              </span>
              <span className="about-us-contact-text">
                Contact Person : Kapil Suri
              </span>
              <span className="about-us-contact-text">
                Contact Number : +91 98990 08322
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacyandpolicy;

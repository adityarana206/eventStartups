import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import "./EmailForm.css";
import GoogleAds from "./GoogleAdsComponent";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [googleAds, setGoogleAds] = useState(true);

  useEffect(() => {
    // Check local storage for the googleAds value
    const storedAdsState = localStorage.getItem("googleAds");
    if (storedAdsState) {
      setGoogleAds(JSON.parse(storedAdsState));
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous messages
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("/api/save-email", { email });
      setMessage("Email successfully saved!");
      setEmail(""); // Clear input after submission
      alert("Email sent");
      setGoogleAds(false);
      localStorage.setItem("googleAds", JSON.stringify(false)); // Save the state to local storage
    } catch (error) {
      if (error.response) {
        setError("Failed to save email: " + error.response.data.message);
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div className="email-form-container">
      {googleAds ? (
        <form onSubmit={handleSubmit} className="email-form">
          <label className="email-form-label">
            Stay updated with our Startup Daily Digest, right in your inbox.
          </label>
          <div className="email-form-input">
            <div className="email-form-input-error">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Id"
                className="email-input"
                required
              />
              {error && <p className="email-form-error">{error}</p>}
            </div>
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </div>
        </form>
      ) : (
        <GoogleAds />
      )}
    </div>
  );
}

export default EmailForm;

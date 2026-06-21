// Global Axios Mock Interceptor.
// This file overrides the default adapter in Axios to completely stub/mock all backend API requests,
// returning the dynamic seed data from mockData.js. This avoids calling any backend APIs and works offline.

import axios from "axios";
import {
  mockEvents,
  mockNewsChannels,
  mockRssFeeds,
  mockOrganisationDetails,
} from "./mockData";

// Helper to sanitize event name for comparison (matching EventCard / EventDetails)
const sanitizeEventNameForURL = (eventname) => {
  return eventname
    .toLowerCase()
    .replace(/\|/g, "-") // Replace each '|' with a single '-'
    .replace(/[^a-z0-9'-]+/g, "-") // Replace any non-alphanumeric characters (except hyphen and apostrophe) with a hyphen
    .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove any non-word characters except dashes
};

const mockAdapter = (config) => {
  return new Promise((resolve, reject) => {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();

    console.log(
      `[MOCK API] Intercepting ${method.toUpperCase()} request to: ${url}`,
    );

    // 1. Check for /event-detail
    if (url.includes("/event-detail")) {
      resolve({
        data: { data: mockEvents },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 2. Check for /news-fetch
    if (url.includes("/news-fetch")) {
      resolve({
        data: mockNewsChannels,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 3. Check for rss2json service
    if (
      url.includes("api.rss2json.com/v1/api.json") ||
      url.includes("rss2json")
    ) {
      const params = config.params || {};
      let rssUrl = params.rss_url;
      if (!rssUrl) {
        try {
          const urlObj = new URL(url);
          rssUrl = urlObj.searchParams.get("rss_url");
        } catch (e) {
          // ignore parsing error
        }
      }

      const decodedRssUrl = rssUrl ? decodeURIComponent(rssUrl) : "";
      const feedItems = mockRssFeeds[decodedRssUrl] || [];
      const title = decodedRssUrl.includes("fintech")
        ? "Fintech Insider Feed"
        : decodedRssUrl.includes("artificial")
          ? "AI Frontiers Feed"
          : decodedRssUrl.includes("saas")
            ? "SaaS Enterprise Feed"
            : "TechCrunch Headlines Feed";

      resolve({
        data: {
          feed: { title: title },
          items: feedItems.map((item) => ({
            title: item.title,
            pubDate: item.pubDate,
            author: item.author,
            description: item.description,
            enclosure: item.enclosure,
            link: item.link,
          })),
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 4. Check for /events-details/:eventName
    if (url.includes("/events-details/")) {
      const parts = url.split("/events-details/");
      const eventNameSlug = parts[1] ? parts[1].split("?")[0] : "";
      const foundEvent = mockEvents.find(
        (e) => sanitizeEventNameForURL(e.eventname) === eventNameSlug,
      );

      resolve({
        data: { data: foundEvent || mockEvents[0] },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 5. Check for /similar
    if (url.includes("/similar")) {
      const params = config.params || {};
      const industry = params.industry;
      const eventId = params.eventId;
      const filtered = mockEvents.filter(
        (e) => e.industry === industry && e._id !== eventId,
      );
      const similar = filtered.length > 0 ? filtered : mockEvents.slice(0, 3);

      resolve({
        data: { data: similar },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 6. Check for /organisation-by-event/
    if (url.includes("/organisation-by-event/")) {
      resolve({
        data: mockOrganisationDetails,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 7. Check for POST/PUT to save-email or send-email or registerEvent or updateEvent-by-user
    if (
      url.includes("/save-email") ||
      url.includes("/send-email") ||
      url.includes("/registerEvent") ||
      url.includes("/updateEvent-by-user/")
    ) {
      resolve({
        data: { status: "ok", data: { success: true } },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // 8. Check for payment endpoint
    if (url.includes("/payment")) {
      resolve({
        data: {
          payment_session_id:
            "mock_session_" + Math.random().toString(36).substring(7),
          order_id: "mock_order_" + Math.random().toString(36).substring(7),
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
      return;
    }

    // Fallback default response
    resolve({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {},
      config: config,
    });
  });
};

axios.defaults.adapter = mockAdapter;

// Use interceptor to force mockAdapter on every config, preventing overrides or defaults bypass
axios.interceptors.request.use(
  (config) => {
    config.adapter = mockAdapter;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

console.log("[MOCK API] Global Axios Mock Interceptor initialized.");

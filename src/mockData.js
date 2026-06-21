// Comprehensive Mock data file containing rich seed data for events, organizations, and news.
// These mock datasets are dynamically generated to ensure date-based filters and all industry-specific views work flawlessly.

const now = new Date();

// Helper to get relative dates
const getRelativeDate = (daysOffset, hoursOffset = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(date.getHours() + hoursOffset);
  return date.toISOString();
};

export const mockEvents = [
  {
    _id: "event-fintech-today",
    eventname: "India Fintech Summit 2026",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(0, 2), // Today, starts in 2 hours
    enddate: getRelativeDate(0, 6), // Today, ends in 6 hours
    location:
      "NESCO Center, Western Express Highway, Goregaon East, Mumbai, Maharashtra 400063",
    city: "Mumbai",
    country: "India",
    modeofevent: "National",
    activity: true,
    eventtype: "Public",
    industry: "Fintech",
    tickets: [
      {
        ticketName: "Delegate Pass",
        priceWithTax: 1499,
        description: "Standard access to the conference hall.",
      },
      {
        ticketName: "VIP Pass",
        priceWithTax: 4999,
        description: "All access pass with networking lunch.",
      },
    ],
    coupons: [
      { code: "FINTECH20", discount: 20 },
      { code: "SUPER50", discount: 50 },
    ],
    description:
      "<p>The India Fintech Summit is the largest gathering of finance and technology professionals in South Asia.</p><p>Explore digital banking, smart payments, blockchain frameworks, and secure transactions.</p>",
    address: "https://maps.google.com/?q=NESCO+Center+Mumbai",
    link: "https://example.com/register/india-fintech-summit",
    seo: {
      title: "India Fintech Summit 2026",
      description: "Finance and tech in Mumbai.",
      featuredImage:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    },
  },
  {
    _id: "event-mumbai-tomorrow",
    eventname: "Mumbai AI & Deep Learning Summit",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(1, 1), // Tomorrow
    enddate: getRelativeDate(1, 5),
    location:
      "Taj Lands End, Band Stand, Bandra West, Mumbai, Maharashtra 400050",
    city: "Mumbai",
    country: "India",
    modeofevent: "National",
    activity: true,
    eventtype: "Public",
    industry: "ArtificialInteligence",
    tickets: [
      {
        ticketName: "General Admission",
        priceWithTax: 999,
        description: "Full day pass to keynote and developer showcases.",
      },
    ],
    coupons: [{ code: "AIFIRST", discount: 15 }],
    description:
      "<p>Deep dive into Generative AI developments and real world production implementations at the heart of Mumbai.</p>",
    address: "https://maps.google.com/?q=Taj+Lands+End+Mumbai",
    link: "https://example.com/register/mumbai-ai-summit",
    seo: {
      title: "Mumbai AI Summit 2026",
      description: "Discover the latest in neural networks in Mumbai.",
      featuredImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    },
  },
  {
    _id: "event-mumbai-weekend",
    eventname: "Mumbai Startup Founders Meetup",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    startdate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(14, 0, 0, 0);
      return d.toISOString();
    })(),
    enddate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(19, 0, 0, 0);
      return d.toISOString();
    })(),
    location:
      "WeWork Vaswani Chambers, 264-265, Dr Annie Besant Rd, Worli, Mumbai 400030",
    city: "Mumbai",
    country: "India",
    modeofevent: "National",
    activity: true,
    eventtype: "Public",
    industry: "General",
    tickets: [
      {
        ticketName: "Free Ticket",
        priceWithTax: 0,
        description: "Complimentary access with registration approval.",
      },
    ],
    coupons: [],
    description:
      "<p>The premier networking and pitch sandbox meetup for founders, micro-VCs and startup enthusiasts in Worli.</p>",
    address: "https://maps.google.com/?q=WeWork+Worli+Mumbai",
    link: "https://example.com/register/mumbai-founders-meet",
    seo: {
      title: "Mumbai Startup Founders Meetup 2026",
      description: "Connect with world class innovators in Worli.",
      featuredImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    },
  },
  {
    _id: "event-london-today",
    eventname: "London Web3 Developers Roundtable",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(0, 5), // Today
    enddate: getRelativeDate(0, 9),
    location: "CodeNode London, 9-29 South Pl, London EC2M 7AQ",
    city: "London",
    country: "UK",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "Web3",
    tickets: [
      {
        ticketName: "Developer Pass",
        priceWithTax: 10,
        description: "Entry and workshop access.",
      },
    ],
    coupons: [],
    description:
      "<p>Hands-on coding, smart contracts architecture, and protocol engineering workshops with London's elite devs.</p>",
    address: "https://maps.google.com/?q=CodeNode+London",
    link: "https://example.com/register/london-web3",
    seo: {
      title: "London Web3 Roundtable 2026",
      description: "Learn Solidity and Rust smart contract best practices.",
      featuredImage:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    },
  },
  {
    _id: "event-london-tomorrow",
    eventname: "London Biotech & HealthTech Expo",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(1, 3), // Tomorrow
    enddate: getRelativeDate(1, 8),
    location:
      "ExCeL London, Royal Victoria Dock, 1 Western Gateway, London E16 1XL",
    city: "London",
    country: "UK",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "HealthTech",
    tickets: [
      {
        ticketName: "Exhibitor Guest",
        priceWithTax: 45,
        description: "Access to halls and research pavilions.",
      },
    ],
    coupons: [],
    description:
      "<p>Discover groundbreaking developments in clinical health-tech platforms, genetic research tools, and medical hardware devices.</p>",
    address: "https://maps.google.com/?q=ExCeL+London",
    link: "https://example.com/register/london-biotech",
    seo: {
      title: "London HealthTech Expo 2026",
      description: "The leading biological and health-tech conference.",
      featuredImage:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
    },
  },
  {
    _id: "event-ai-tomorrow",
    eventname: "Silicon Valley AI Frontiers Expo",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(1, 4), // Tomorrow
    enddate: getRelativeDate(1, 9),
    location:
      "Santa Clara Convention Center, Great America Parkway, Santa Clara, CA 95054",
    city: "Santa Clara",
    country: "USA",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "ArtificialInteligence",
    tickets: [
      {
        ticketName: "Expo Pass",
        priceWithTax: 0,
        description: "Free general admission.",
      },
      {
        ticketName: "All-Access Pass",
        priceWithTax: 799,
        description: "Full workshop and technical session access.",
      },
    ],
    coupons: [{ code: "AIFIRST", discount: 15 }],
    description:
      "<p>Step into the future of Artificial Intelligence at the AI Frontiers Expo.</p><p>Featuring groundbreaking advancements in Generative AI, Large Language Models (LLMs), Computer Vision, and neural networks.</p>",
    address: "https://maps.google.com/?q=Santa+Clara+Convention+Center",
    link: "https://example.com/register/ai-frontiers",
    seo: {
      title: "AI Frontiers Expo 2026",
      description: "Discover the latest in AI.",
      featuredImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    },
  },
  {
    _id: "event-saas-weekend",
    eventname: "London SaaS Growth Summit",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    startdate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(10, 0, 0, 0);
      return d.toISOString();
    })(),
    enddate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(17, 0, 0, 0);
      return d.toISOString();
    })(),
    location: "The QEII Centre, Broad Sanctuary, Westminster, London SW1P 3EE",
    city: "London",
    country: "UK",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "SaaS",
    tickets: [
      {
        ticketName: "Standard Pass",
        priceWithTax: 299,
        description: "Includes keynote entry and networking.",
      },
    ],
    coupons: [{ code: "LONDONSAAS", discount: 10 }],
    description:
      "<p>The London SaaS Growth Summit gathers B2B software founders, executives, and VCs to share proven playbooks for scaling recurring revenue.</p>",
    address: "https://maps.google.com/?q=QEII+Centre+London",
    link: "https://example.com/register/london-saas",
    seo: {
      title: "London SaaS Growth Summit 2026",
      description: "Scale your software recurring revenue.",
      featuredImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    },
  },
  {
    _id: "event-deeptech-month",
    eventname: "Gaborone DeepTech Innovation Forum",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(5), // Within this month
    enddate: getRelativeDate(5, 4),
    location:
      "Gaborone International Convention Centre (GICC), Bonnington Farm, Gaborone",
    city: "Gaborone",
    country: "Botswana",
    modeofevent: "National",
    activity: true,
    eventtype: "Public",
    industry: "Deeptech",
    tickets: [
      {
        ticketName: "General Delegate",
        priceWithTax: 150,
        description: "Full entry to research presentations and panels.",
      },
    ],
    coupons: [],
    description:
      "<p>DeepTech Innovation Forum brings together pioneering scientists, engineering startups, and deeptech investors in Southern Africa.</p>",
    address: "https://maps.google.com/?q=GICC+Gaborone",
    link: "https://example.com/register/deeptech-gaborone",
    seo: {
      title: "Gaborone DeepTech Innovation Forum",
      description: "Pioneering science and engineering summit in Botswana.",
      featuredImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    },
  },
  {
    _id: "event-singapore-today",
    eventname: "Singapore Tech Ventures Sandbox",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(0, 3), // Today
    enddate: getRelativeDate(0, 7),
    location: "LaunchPad @ One-North, 71 Ayer Rajah Crescent, Singapore 139951",
    city: "Singapore",
    country: "Singapore",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "General",
    tickets: [
      {
        ticketName: "Startup Pitch Pass",
        priceWithTax: 49,
        description: "Includes pitch slot and networking session.",
      },
    ],
    coupons: [],
    description:
      "<p>Connect with angel investors, prototype your technology, and test in an open incubator environment at Singapore's premier startup LaunchPad.</p>",
    address: "https://maps.google.com/?q=One-North+Singapore",
    link: "https://example.com/register/singapore-sandbox",
    seo: {
      title: "Singapore Tech Sandbox 2026",
      description: "Accelerate your tech startup at LaunchPad.",
      featuredImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    },
  },
  {
    _id: "event-singapore-tomorrow",
    eventname: "Singapore FinTech & Digital Assets Forum",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(1, 2), // Tomorrow
    enddate: getRelativeDate(1, 6),
    location:
      "Suntec Singapore Convention & Exhibition Centre, 1 Raffles Blvd, Singapore 039593",
    city: "Singapore",
    country: "Singapore",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "Fintech",
    tickets: [
      {
        ticketName: "General Pass",
        priceWithTax: 120,
        description: "Access to all finance tracking panels.",
      },
    ],
    coupons: [],
    description:
      "<p>Unlocking smart-banking systems, DeFi regulations, and central ledger infrastructure with key finance experts.</p>",
    address: "https://maps.google.com/?q=Suntec+Singapore",
    link: "https://example.com/register/singapore-fintech-forum",
    seo: {
      title: "Singapore FinTech Forum 2026",
      description: "Unlock DeFi solutions and smart-banking updates.",
      featuredImage:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    },
  },
  {
    _id: "event-singapore-weekend",
    eventname: "Singapore SaaS Builders Workshop",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80",
    startdate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(9, 0, 0, 0);
      return d.toISOString();
    })(),
    enddate: (() => {
      const d = new Date(now);
      d.setDate(d.getDate() + (6 - d.getDay())); // Saturday of this week
      d.setHours(15, 0, 0, 0);
      return d.toISOString();
    })(),
    location: "The Hive Coworking, 59 New Bridge Rd, Singapore 059405",
    city: "Singapore",
    country: "Singapore",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "SaaS",
    tickets: [
      {
        ticketName: "Standard Pass",
        priceWithTax: 15,
        description: "Full workshop workspace access and coffee.",
      },
    ],
    coupons: [],
    description:
      "<p>Learn recurring revenue playbooks and optimize client lifecycle models with premium SaaS founders.</p>",
    address: "https://maps.google.com/?q=The+Hive+Singapore",
    link: "https://example.com/register/singapore-saas-builders",
    seo: {
      title: "Singapore SaaS Workshop 2026",
      description: "Actionable SaaS frameworks in Singapore.",
      featuredImage:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    },
  },
  {
    _id: "event-edtech-general",
    eventname: "Global EdTech Summit Singapore",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(12),
    enddate: getRelativeDate(13),
    location:
      "Marina Bay Sands Expo & Convention Centre, 10 Bayfront Ave, Singapore 018956",
    city: "Singapore",
    country: "Singapore",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "EdTech",
    tickets: [
      {
        ticketName: "Educator Pass",
        priceWithTax: 0,
        description: "Complimentary access for school and university teachers.",
      },
      {
        ticketName: "Corporate Pass",
        priceWithTax: 450,
        description: "Full commercial access and business matchmaking.",
      },
    ],
    coupons: [{ code: "EDTECHSG", discount: 25 }],
    description:
      "<p>The Global EdTech Summit is Asia's most prominent exhibition exploring the integration of technology into the classroom and workplace learning.</p>",
    address: "https://maps.google.com/?q=Marina+Bay+Sands+Singapore",
    link: "https://example.com/register/edtech-singapore",
    seo: {
      title: "Global EdTech Summit Singapore 2026",
      description:
        "The future of teaching, learning, and digital education infrastructure.",
      featuredImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    },
  },
  {
    _id: "event-ecommerce-general",
    eventname: "E-Commerce Pioneers Conference",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(8),
    enddate: getRelativeDate(8, 6),
    location: "Tokyo Big Sight, 3-11-1 Ariake, Koto City, Tokyo 135-0063",
    city: "Tokyo",
    country: "Japan",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "Ecommerce",
    tickets: [
      {
        ticketName: "General Admission",
        priceWithTax: 250,
        description: "Full access to ecommerce workshops and developer labs.",
      },
    ],
    coupons: [{ code: "ECOM20", discount: 20 }],
    description:
      "<p>The premier Ecommerce and retail tech showcase. Discover dropshipping playbooks, supply chain optimizations, and social selling tools.</p>",
    address: "https://maps.google.com/?q=Javits+Center+New+York",
    link: "https://example.com/register/ecommerce-expo",
    seo: {
      title: "Ecommerce Pioneers Summit 2026",
      description: "Accelerate your online retail enterprise.",
      featuredImage:
        "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800",
    },
  },
  {
    _id: "event-d2c-general",
    eventname: "D2C Brands Masterclass & Showcase",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(15),
    enddate: getRelativeDate(15, 5),
    location: "The Grand Hyatt, 80 Boulevard J.F. Kennedy, Luxembourg",
    city: "Luxembourg",
    country: "Luxembourg",
    modeofevent: "National",
    activity: true,
    eventtype: "Public",
    industry: "D2C",
    tickets: [
      {
        ticketName: "Founder Pass",
        priceWithTax: 199,
        description: "Access to roundtables and panels.",
      },
    ],
    coupons: [],
    description:
      "<p>Understand brand positioning, customer retention loops, and multi-channel attribution for Direct-to-Consumer startups.</p>",
    address: "https://maps.google.com/?q=Grand+Hyatt+Luxembourg",
    link: "https://example.com/register/d2c-brands",
    seo: {
      title: "D2C Brands Masterclass 2026",
      description: "Mastering the direct-to-consumer playbook.",
      featuredImage:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    },
  },
  {
    _id: "event-general-startup",
    eventname: "Tech Founders Global Expo",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    startdate: getRelativeDate(18),
    enddate: getRelativeDate(19),
    location: "Javits Center, 429 11th Ave, New York, NY 10001",
    city: "New York",
    country: "USA",
    modeofevent: "International",
    activity: true,
    eventtype: "Public",
    industry: "General",
    tickets: [
      {
        ticketName: "Startup Exhibition Stand",
        priceWithTax: 1200,
        description: "Includes standard table and 2 passes.",
      },
      {
        ticketName: "Attendee Pass",
        priceWithTax: 199,
        description: "Full access to keynotes and workshop halls.",
      },
    ],
    coupons: [{ code: "FOUNDERNY", discount: 30 }],
    description:
      "<p>The Tech Founders Global Expo connects seed and Series A founders with elite global angel networks and institutional venture capitalists.</p>",
    address: "https://maps.google.com/?q=Javits+Center+New+York",
    link: "https://example.com/register/tech-founders-expo",
    seo: {
      title: "Tech Founders Global Expo 2026",
      description: "Connect with tech founders and investors in NYC.",
      featuredImage:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    },
  },
];

export const mockOrganisationDetails = {
  organisationDetails: {
    organiserDetails: {
      organiserName: "StartupsNews Events",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100",
      description:
        "Pioneering the global Tech ecosystem through insightful news and world-class networking summits.",
      contactEmail: "events@startupnews.fyi",
      contactPhone: "+91 98765 43210",
      instagram: "https://instagram.com/startupnews.fyi",
      linkedin: "https://linkedin.com/company/startupnewsfyi",
      twitter: "https://twitter.com/startupnewsfyi",
      website: "https://startupnews.fyi",
    },
  },
};

// Raw response for /news-fetch containing the channels for ALL industries
export const mockNewsChannels = [
  {
    _id: "chan-fintech",
    activity: true,
    industry: "Fintech",
    link: "https://news.google.com/rss/search?q=fintech+startup+funding",
    title: "Fintech Insider",
    icon: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "chan-ai",
    activity: true,
    industry: "ArtificialInteligence",
    link: "https://news.google.com/rss/search?q=artificial+intelligence+startup",
    title: "AI & Neural Tech Daily",
    icon: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "chan-saas",
    activity: true,
    industry: "SaaS",
    link: "https://news.google.com/rss/search?q=saas+growth+startup",
    title: "SaaS Enterprise News",
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
  },
  {
    _id: "chan-edtech",
    activity: true,
    industry: "EdTech",
    link: "https://news.google.com/rss/search?q=edtech+startup+education",
    title: "EdTech Classroom News",
    icon: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100",
  },
  {
    _id: "chan-ecommerce",
    activity: true,
    industry: "Ecommerce",
    link: "https://news.google.com/rss/search?q=ecommerce+retail+technology",
    title: "E-Commerce Pioneers Feed",
    icon: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=100",
  },
  {
    _id: "chan-deeptech",
    activity: true,
    industry: "Deeptech",
    link: "https://news.google.com/rss/search?q=deeptech+science+startup",
    title: "DeepTech Innovation Hub",
    icon: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100",
  },
  {
    _id: "chan-d2c",
    activity: true,
    industry: "D2C",
    link: "https://news.google.com/rss/search?q=d2c+brands+retail",
    title: "D2C Brands Digest",
    icon: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100",
  },
  {
    _id: "chan-general",
    activity: true,
    industry: "General",
    link: "https://news.google.com/rss/search?q=tech+startup+funding",
    title: "TechCrunch Headlines",
    icon: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=80",
  },
];

// Mock items resolved from the RSS feeds mapped by key link
export const mockRssFeeds = {
  "https://news.google.com/rss/search?q=fintech+startup+funding": [
    {
      title:
        "Fintech Startup Payflow Raises $25M Series B to Scale Digital Wallets",
      pubDate: getRelativeDate(0, -3), // 3 hours ago
      author: "Elena Petrova",
      description:
        "<p>Payflow, a leading neobank specializing in digital wallets, has successfully closed a $25 Million Series B round. The company plans to use the capital to scale its product offerings and launch cross-border real-time transactions across Southeast Asia.</p><p>Investors include Sequoia India, Accel Partners, and several prominent regional angel networks.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/payflow-series-b",
    },
    {
      title:
        "DeFi Protocol LedgerSecure Secures $12M to Prevent Smart Contract Vulnerabilities",
      pubDate: getRelativeDate(-1), // Yesterday
      author: "Marcus Vance",
      description:
        "<p>Smart contract security startup LedgerSecure has announced a $12M seed funding round led by Paradigm and DragonFly Capital. The platform offers automated AI auditing for Solidity and Rust smart contracts to detect logical loopholes before production deployment.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/ledgersecure-funding",
    },
  ],
  "https://news.google.com/rss/search?q=artificial+intelligence+startup": [
    {
      title:
        "CognitiveAgents Launches Open-Source LLM Specially Tuned for Edge Devices",
      pubDate: getRelativeDate(0, -1), // 1 hour ago
      author: "Sarah Chen",
      description:
        "<p>Silicon Valley artificial intelligence research lab CognitiveAgents has released 'EdgeMind-7B', an open-weights large language model designed to achieve state-of-the-art performance on low-power consumer edge hardware and mobile processors.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/edgemind-7b-release",
    },
    {
      title:
        "Robotic AI Startup Dexterous Labs Raises $45M for Intelligent Warehouse Automation",
      pubDate: getRelativeDate(-2), // 2 days ago
      author: "Tariq Mahmood",
      description:
        "<p>Dexterous Labs, a startup building neural network software for robotic arms, has closed an oversubscribed $45M funding round from Founders Fund and General Catalyst. The systems enable picking-robots to handle highly delicate items at unprecedented speeds in micro-fulfillment centers.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/dexterous-warehouse-robots",
    },
  ],
  "https://news.google.com/rss/search?q=saas+growth+startup": [
    {
      title:
        "SaaS Metrics Startup Chartify cross $5M ARR After Rapid European Expansion",
      pubDate: getRelativeDate(-1, -4), // Yesterday
      author: "Lara Croft",
      description:
        "<p>Chartify, a plug-and-play dashboards platform for Stripe and Chargebee, has officially surpassed the $5M Annual Recurring Revenue (ARR) milestone. This marks a 250% year-on-year growth trajectory driven by customer adoption in enterprise software segments across Germany, France, and the UK.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/chartify-growth",
    },
  ],
  "https://news.google.com/rss/search?q=edtech+startup+education": [
    {
      title:
        "EdTech Startup BrainJump Closes $10M Series A For Immersive Classroom Gaming",
      pubDate: getRelativeDate(0, -2),
      author: "Samuel Jackson",
      description:
        "<p>BrainJump utilizes gamified virtual landscapes to teach STEM sciences to middle-schoolers. The company just closed a $10M investment round to scale its curriculum across the USA and Singapore schools.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      },
      link: "https://example.com/news/brainjump-funding",
    },
  ],
  "https://news.google.com/rss/search?q=ecommerce+retail+technology": [
    {
      title:
        "Tokyo E-Commerce Enabler CartFlow Closes $15M To Launch Autonomous Warehousing",
      pubDate: getRelativeDate(-1),
      author: "Kenji Tanaka",
      description:
        "<p>CartFlow, an automation suite for online retailers, announced a major expansion strategy in Asia Pacific, focusing heavily on automated sorting and direct dropshipping logistics.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800",
      },
      link: "https://example.com/news/cartflow-tokyo",
    },
  ],
  "https://news.google.com/rss/search?q=deeptech+science+startup": [
    {
      title:
        "QuantumScribe Raises Seed Capital To Expand Real-Time Cryogenic Telemetry Labs",
      pubDate: getRelativeDate(-2),
      author: "Fikile Ndlovu",
      description:
        "<p>Gaborone-based QuantumScribe has successfully demonstrated stable teleportation protocols over micro-distances using state-of-the-art cryogenic chambers, securing backing from global deeptech VCs.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      },
      link: "https://example.com/news/quantumscribe-gaborone",
    },
  ],
  "https://news.google.com/rss/search?q=d2c+brands+retail": [
    {
      title:
        "Activewear Challenger CoreWear Lands $18M To Expand Sustainable Apparel Lines",
      pubDate: getRelativeDate(-3),
      author: "Chantal Weber",
      description:
        "<p>Luxembourg direct-to-consumer startup CoreWear makes high-performance activewear solely out of ocean-recovered plastics. The brand now aims to launch flagship experience studios across Paris and Berlin.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
      },
      link: "https://example.com/news/corewear-activewear",
    },
  ],
  "https://news.google.com/rss/search?q=tech+startup+funding": [
    {
      title:
        "Seed Stage Venture Capital Flows Stabilize as Investors Target AI and Biotech",
      pubDate: getRelativeDate(0, -5), // 5 hours ago
      author: "Alex Rivera",
      description:
        "<p>According to the latest Q2 venture capital index reports, seed stage startup investments have stabilized after several quarters of decline. The renewed interest is highly concentrated in climate technology, biomedical advancements, and advanced Generative AI architectures.</p>",
      enclosure: {
        link: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
      },
      link: "https://example.com/news/seed-stage-vc-trends",
    },
  ],
};

/**
 * Portfolio Data Configuration - PRAHLAD JEE
 * Software Engineer & Data Engineer
 */

export const PORTFOLIO_DATA = {
  profile: {
    name: "PRAHLAD JEE",
    role: "Software Engineer & Data Engineer",
    tagline: "Building scalable software systems, backend services, 2 Cr+ record data pipelines, enterprise SaaS apps, and intelligent applications.",
    phone: "+91-9060707325",
    location: "India (Available Worldwide)",
    email: "prahladjee433@gmail.com",
    avatar: "assets/images/prahlad_jee.jpg",
    bio: "I am a Software Engineer & Data Engineer with experience in designing and developing enterprise SaaS applications, REST APIs, high-volume data-processing pipelines, e-commerce engines, search systems, short-clips video platforms, and AI-powered applications. My core technical expertise includes Java, Spring Boot, Spring Data JPA, Spring Security, REST APIs, PostgreSQL, Microsoft SQL Server, Apache Solr, Python, FFmpeg, and React.js.",
    philosophy: "Build simple. Solve problems. Optimize when necessary. Keep learning.",
    availability: "Available for Backend, Data Engineering & Full-Stack Software Engineering Roles",
    stats: [
      { label: "Records Processed", value: "2 Cr+" },
      { label: "Core Backend Stack", value: "Java / Spring" },
      { label: "Databases & Search", value: "Solr / Postgres" },
      { label: "AI & Media Apps", value: "Python / FFmpeg" }
    ]
  },

  themePresets: [
    {
      id: "cyberpunk",
      name: "Cyber Neon",
      primary: "#00f3ff",
      secondary: "#ff007f",
      accent: "#8a2be2",
      background: "#080b14",
      particleColor: 0x00f3ff,
      ambientColor: 0x1a0933
    },
    {
      id: "space",
      name: "Deep Cosmos",
      primary: "#38ef7d",
      secondary: "#11998e",
      accent: "#00d2ff",
      background: "#040d1a",
      particleColor: 0x38ef7d,
      ambientColor: 0x051d3b
    },
    {
      id: "matrix",
      name: "Emerald Void",
      primary: "#00ff66",
      secondary: "#00b33c",
      accent: "#33ff99",
      background: "#03120b",
      particleColor: 0x00ff66,
      ambientColor: 0x062817
    },
    {
      id: "quartz",
      name: "Golden Quartz",
      primary: "#ffaa00",
      secondary: "#ff5500",
      accent: "#ffd700",
      background: "#140e06",
      particleColor: 0xffaa00,
      ambientColor: 0x2e1a05
    }
  ],

  projects: [
    {
      id: "shg-pipeline",
      title: "SHG API Data Engineering Pipeline",
      category: "data",
      description: "Enterprise Java 17 Spring Boot data pipeline processing & verifying 2 Crore+ (20M+) records with streaming batching and complete JSON auditing.",
      fullDescription: "Architected a high-throughput data pipeline designed to ingest, validate, and store massive volumes of SHG API data. Implemented Java 17 Spring Boot batch processing, streaming execution for low-memory overhead, and JSON response payload persistence for auditability and production debugging. Successfully processed and verified over 2 Crore+ (20 Million+) records with zero data corruption.",
      image: "assets/images/shg_data_pipeline.jpg",
      tags: ["Java 17", "Spring Boot", "Batch Processing", "PostgreSQL", "JSON Streaming"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { "Verified Records": "2 Cr+ (20M+)", "Runtime": "Java 17 / Spring", "Architecture": "Batch & Stream" },
      color: "#00f3ff"
    },
    {
      id: "ecommerce-engine",
      title: "Enterprise E-Commerce Backend Engine",
      category: "web",
      description: "Scalable e-commerce platform with multi-vendor inventory management, Apache Solr product search, cart checkout, and payment gateway integration.",
      fullDescription: "Engineered a high-performance e-commerce backend platform capable of handling peak traffic surges. Built with Java Spring Boot microservices, PostgreSQL table partitioning, Apache Solr for faceted product search with sub-millisecond retrieval, Redis caching, and RESTful payment integration.",
      image: "assets/images/ecommerce_platform.jpg",
      tags: ["Java", "Spring Boot", "E-Commerce", "Apache Solr", "PostgreSQL", "Redis"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { "Search": "Faceted Solr", "Database": "Partitioned Postgres", "Security": "Spring Security" },
      color: "#ffaa00"
    },
    {
      id: "saas-enterprise",
      title: "Multi-Tenant Enterprise SaaS Platform",
      category: "web",
      description: "Cloud-native multi-tenant SaaS application with RBAC security, subscription management, API rate limiting, and tenant data isolation.",
      fullDescription: "Architected a multi-tenant enterprise SaaS backend enabling seamless organization onboarding and tenant data isolation. Implemented Spring Security with OAuth2/JWT token authentication, fine-grained Role-Based Access Control (RBAC), subscription billing API endpoints, and React.js administrative dashboard.",
      image: "assets/images/saas_enterprise_app.jpg",
      tags: ["Java", "Spring Boot", "SaaS Architecture", "Multi-Tenancy", "OAuth2", "React.js"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { "Architecture": "Multi-Tenant", "Auth": "OAuth2 / JWT", "Security": "RBAC Enforced" },
      color: "#38ef7d"
    },
    {
      id: "short-clips-app",
      title: "Short-Clips Video Transcoding & Web App",
      category: "web",
      description: "Short-form video streaming web app featuring automated FFmpeg video transcoding, unique video ID generation, and React infinite video feed.",
      fullDescription: "Built a short-form video processing and streaming web application. Includes an automated media pipeline using Python and FFmpeg to transcode user uploads into adaptive bitrate video formats, generate unique UUID video identifiers, index metadata into Apache Solr for instant feed retrieval, and present an optimized React.js video feed UI.",
      image: "assets/images/short_clips_app.jpg",
      tags: ["Python", "FFmpeg", "Video Processing", "React.js", "Apache Solr", "REST API"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { "Transcoding": "FFmpeg Pipeline", "Feed UI": "React.js", "Search Index": "Apache Solr" },
      color: "#ff007f"
    },
    {
      id: "speech-to-text",
      title: "Offline Speech-to-Text AI Pipeline",
      category: "ai",
      description: "Privacy-focused offline speech recognition engine converting audio formats (MP3, WAV, M4A, FLAC, OGG) to 16kHz mono PCM before Whisper transcription.",
      fullDescription: "Developed a fully offline Speech-to-Text pipeline application using Python. Integrates FFmpeg for audio preprocessing, standardizing input streams into 16 kHz mono 16-bit PCM WAV before feeding them into local Whisper AI transcription engines without external cloud API dependencies.",
      image: "assets/images/speech_to_text_ai.jpg",
      tags: ["Python", "Whisper AI", "FFmpeg", "Offline AI", "Audio Engineering"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { "Privacy": "100% Offline", "Preprocessing": "FFmpeg Audio", "Engine": "Whisper AI" },
      color: "#8a2be2"
    },
    {
      id: "ai-helpdesk",
      title: "AI Helpdesk Chatbot & Ticket Automation",
      category: "ai",
      description: "Intelligent helpdesk bot integrating Python AI intent classification, React frontend, and Odoo REST APIs for automated ticket lifecycle management.",
      fullDescription: "AI-powered helpdesk chatbot designed to simplify ticket creation and status checking. Uses NLP to identify user intent, category, and subcategory, requests confirmation, and seamlessly triggers ticket creation via Odoo backend REST APIs with a conversational React frontend UI.",
      image: "assets/images/ai_helpdesk_bot.jpg",
      tags: ["Python", "AI", "REST APIs", "Odoo ERP", "React.js"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { "Integration": "Odoo APIs", "Frontend": "React.js", "Automation": "End-to-End" },
      color: "#8a2be2"
    },
    {
      id: "solr-search-platform",
      title: "Apache Solr Search & Content Platform",
      category: "search",
      description: "High-throughput search engine integration using Apache Solr, Spring Boot, and PostgreSQL for large-scale content indexing and rapid retrieval.",
      fullDescription: "Engineered high-volume backend search systems integrating Spring Boot REST APIs with Apache Solr cores. Handled core schema configuration, DocValues tuning, large dataset indexing/reindexing pipelines, Solr security authentication, and query optimization for high-performance React frontends.",
      image: "assets/images/solr_search_engine.jpg",
      tags: ["Java", "Spring Boot", "Apache Solr", "PostgreSQL", "React.js"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { "Engine": "Apache Solr", "Database": "PostgreSQL", "Capabilities": "Reindexing & Search" },
      color: "#38ef7d"
    },
    {
      id: "geofencing-service",
      title: "GeoFencing Location Processing Service",
      category: "data",
      description: "Location-aware microservice performing spatial validation, API rate control, and real-time location payload processing.",
      fullDescription: "Built a robust GeoFencing backend service in Spring Boot for location-based data processing. Features rigorous API input validation, spatial calculation algorithms, database persistence, and production logging for low-latency spatial services.",
      image: "assets/images/geofencing_map_service.jpg",
      tags: ["Java", "Spring Boot", "Location Services", "REST APIs", "Spatial Data"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      stats: { "Service": "GeoFencing", "Latency": "<10ms", "Architecture": "REST Microservice" },
      color: "#ffaa00"
    }
  ],

  skills: [
    { name: "Java 17 & Spring Boot Ecosystem", category: "backend", level: 98, icon: "code", highlight: true },
    { name: "Batch Data Pipelines (2 Cr+ Records)", category: "data", level: 96, icon: "layers", highlight: true },
    { name: "Enterprise SaaS & E-Commerce Systems", category: "backend", level: 95, icon: "shopping-bag", highlight: true },
    { name: "REST API Design & OAuth2 Security", category: "backend", level: 95, icon: "shield-check", highlight: true },
    { name: "PostgreSQL, MySQL & MS SQL Server", category: "backend", level: 94, icon: "database", highlight: true },
    { name: "Apache Solr & Search Indexing", category: "search", level: 92, icon: "search", highlight: true },
    { name: "Microservices & Distributed Systems", category: "backend", level: 90, icon: "network", highlight: true },
    { name: "Python & Offline AI (Whisper NLP)", category: "ai", level: 88, icon: "cpu", highlight: true },
    { name: "FFmpeg Video Transcoding & Processing", category: "data", level: 86, icon: "video", highlight: true },
    { name: "React.js & Frontend Integration", category: "frontend", level: 85, icon: "layout", highlight: false },
    { name: "Linux, Docker & Tomcat Deployment", category: "devops", level: 86, icon: "terminal", highlight: false },
    { name: "Production Debugging & Optimization", category: "backend", level: 95, icon: "sliders", highlight: true }
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Mewar University",
      period: "2023 – Present",
      details: "Specializing in Advanced Software Architecture, Distributed Data Engineering, and AI Applications."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "B.D. College, Patna",
      period: "2018",
      details: "Core Computer Science, Data Structures, Object-Oriented Programming, RDBMS, and Web Systems."
    },
    {
      degree: "Intermediate — Mathematics",
      institution: "BSEB",
      period: "2015",
      details: "Higher Mathematics, Physics, and Analytical Logic."
    }
  ],

  experience: [
    {
      role: "Software Engineer & Data Engineer",
      company: "Enterprise Systems & Data Solutions",
      period: "Core Professional Focus",
      description: "Engineering high-capacity backend APIs, 2 Cr+ record data ingestion pipelines, enterprise SaaS microservices, e-commerce platforms, Apache Solr search engines, and media processing web apps.",
      achievements: [
        "Architected SHG Data Pipeline processing and verifying over 2 Crore+ (20 Million+) API records with zero loss",
        "Built Enterprise E-Commerce engine with PostgreSQL partitioning and sub-millisecond Solr search retrieval",
        "Engineered multi-tenant SaaS platform with OAuth2/JWT authentication and RBAC tenant isolation",
        "Developed Short-Clips video web app with automated FFmpeg transcoding pipelines and React infinite feed UI"
      ]
    }
  ],

  socials: [
    { name: "Phone", url: "tel:+919060707325", icon: "phone" },
    { name: "Email", url: "mailto:prahladjee433@gmail.com", icon: "mail" },
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
  ]
};

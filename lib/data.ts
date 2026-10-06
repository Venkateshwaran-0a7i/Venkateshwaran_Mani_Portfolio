export interface Project {
  id: string;
  title: string;
  category: string;
  impactDesc: string;
  image: string;
  tags: string[];
  featured?: boolean;
  stats?: { label: string; value: string }[];
  dockerCallout?: string;
  techNote: string;
  repoUrl: string;
}

export interface SkillItem {
  name: string;
  desc: string;
  level: number;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  badge: string;
  points: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

export interface StudyItem {
  title: string;
  icon: string;
  description: string;
}

export interface MarketTrack {
  industry: string;
  cities: string;
  icon: string;
  points: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Venkateshwaran M",
    shortName: "VM.",
    title: "AI R&D Engineer",
    subtitle: "AI R&D Engineer | Generative AI | AI Agents | LLMs | RAG",
    email: "venkateshwaran0720@gmail.com",
    phone: "+91 9655724769",
    location: "Chennai, India",
    github: "https://github.com/Venkateshwaran-0a7i",
    linkedin: "https://www.linkedin.com/in/venkateshwaran-m-a3b2b23a3",
    resumeUrl: "/Venkateshwaran Mani.pdf",
    avatar: "/Venkateshwaran.jpeg",
    bio: "An experienced AI R&D Engineer working at the intersection of data, engineering, and business outcomes — building clean pipelines, training ML models, and translating raw data into clear insights teams can actually use. Skilled in designing Generative AI solutions, AI Agents, LLMs, and RAG pipelines. Proven track record of reducing reporting time by 30%, improving model accuracy by 20%, and delivering multiple end-to-end analytics and machine learning solutions across real-world projects and internships. Focused on structured problem solving, clean code, and documentation so solutions are reliable and scalable.",
  },
  metrics: [
    { label: "Manual Reporting Reduction", value: 30, suffix: "%" },
    { label: "ML Model Accuracy Improvement", value: 20, suffix: "%" },
    { label: "B.Tech Aggregate (AI & DS)", value: 82, suffix: "%" },
    { label: "Industry Projects Delivered", value: 4, suffix: "+" },
  ],
  topAchievement: {
    badge: "🏆 Top Career Achievement",
    highlight: "-30% Reporting Time",
    description: "Eliminated 30% of manual reporting workload at Corizo Edutech by building interactive Power BI dashboards with automated data refresh, DAX measures, and stakeholder-ready KPI layouts — saving measurable human hours every reporting cycle."
  },
  education: [
    {
      period: "Aug 2022 – May 2026",
      degree: "Bachelor of Technology (B.Tech) in AI & Data Science",
      institution: "Bharath Niketan College of Engineering",
      description: "Aggregate: 82%. Focused on Artificial Intelligence, Machine Learning, and Big Data Analytics."
    },
    {
      period: "Jul 2020 – Mar 2022",
      degree: "Higher Secondary (Computer Science)",
      institution: "PKN Higher Secondary School",
      description: "Focused on computer science fundamentals, data logic, and programming concepts."
    }
  ] as EducationItem[],
  quote: {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "William Butler Yeats"
  },
  skills: [
    {
      name: "Artificial Intelligence & ML",
      desc: "Supervised/Unsupervised Learning, Neural Networks, TensorFlow, Keras, Deployable Pipelines",
      level: 90
    },
    {
      name: "Deep Learning & NLP",
      desc: "CNNs, RNNs, LSTMs, Image Classification, Transformers, Intent Classification",
      level: 85
    },
    {
      name: "Data Engineering & Scraping",
      desc: "ETL, Data Warehousing, Airflow, BeautifulSoup, Selenium, Scrapy",
      level: 88
    },
    {
      name: "Programming & APIs",
      desc: "Python, R, SQL, NoSQL, FastAPI, REST APIs, CRUD",
      level: 95
    },
    {
      name: "Data Analytics & BI",
      desc: "Power BI, Tableau, Excel, DAX, KPI Dashboards, EDA",
      level: 92
    },
    {
      name: "Cloud & DevOps",
      desc: "GCP (Compute Engine, Storage), Git, GitHub, Docker — Containerized Deployments",
      level: 82
    },
    {
      name: "Research & Database Consulting",
      desc: "Research Skills, Database Consulting, Data Architecture, Structured Problem Solving",
      level: 88
    },
    {
      name: "Languages",
      desc: "English (Professional), Tamil (Native)",
      level: 100
    }
  ] as SkillItem[],
  experience: [
    {
      period: "Jun 2026 – Present",
      role: "AI R&D Engineer",
      company: "Cavin Infotech, Chennai",
      badge: "Researching & developing Generative AI, AI Agents, and LLM applications",
      points: [
        "Develop and deploy advanced Generative AI solutions and intelligent agents using LangChain.",
        "Design and optimize high-performance Retrieval-Augmented Generation (RAG) architectures for enterprise data query systems.",
        "Create clean, automated Python pipelines for workflow automation and LLM orchestration.",
        "Collaborate on building scalable AI applications running in containerized production environments."
      ]
    },
    {
      period: "Mar 2026 – Apr 2026",
      role: "Artificial Intelligence Intern",
      company: "Codec Technologies India, Chennai",
      badge: "Developed Deep Learning models and automated NLP pipelines",
      points: [
        "Built and optimized Deep Learning architectures including CNNs and RNNs/LSTMs for classification and text analytics.",
        "Designed NLP preprocessing pipelines using TF-IDF and intent-based classification to power automated systems.",
        "Improved model accuracy by 20% through systematic feature engineering and parameter tuning.",
        "Created containerized application versions using Docker to streamline local deployments."
      ]
    },
    {
      period: "Dec 2025 – Dec 2025",
      role: "Data Science Job Simulation",
      company: "Forage (Remote)",
      badge: "Completed virtual corporate data science project simulations",
      points: [
        "Simulated real-world corporate data scientist duties by conducting statistical analysis and EDA.",
        "Built predictive models and developed clean data visualizations to communicate insights to stakeholders.",
        "Earned recognition for structured problem-solving and documentation excellence."
      ]
    }
  ] as ExperienceItem[],
  projects: [
    {
      id: "chatbot",
      title: "Automating Customer Operations",
      category: "Customer Operations",
      impactDesc: "Built an AI-powered conversational interface to automate user query handling — reducing manual support ticket loads and improving real-time response efficiency for end users.",
      image: "/project_chatbot.png",
      tags: ["NLP", "Flask", "TF-IDF", "Dockerized"],
      dockerCallout: "Includes a Dockerfile for containerized deployment — enabling IT teams to spin up the chatbot in any live business environment with zero configuration friction.",
      techNote: "Intent-based classification with TF-IDF vectorization. Containerized for one-command enterprise deployment.",
      repoUrl: "https://github.com/Venkateshwaran-0a7i"
    },
    {
      id: "powerbi",
      title: "Power BI Reporting Automation",
      category: "Business Intelligence",
      impactDesc: "Eliminated 30% of manual reporting effort by building interactive Power BI dashboards with automated data refresh, DAX measures, and intuitive KPI layouts for stakeholder reporting.",
      image: "/project_analytics.png",
      featured: true,
      stats: [
        { label: "Time Saved", value: "30%" },
        { label: "Live Tracking", value: "KPI" },
        { label: "Measures", value: "DAX" },
        { label: "Refresh", value: "Auto" }
      ],
      tags: ["Power BI", "DAX", "ETL", "KPI Dashboards", "Data Storytelling"],
      techNote: "Data storytelling layouts designed for corporate decision-makers and non-technical stakeholders. Automated refresh eliminates recurring manual work.",
      repoUrl: "https://github.com/Venkateshwaran-0a7i"
    }
  ] as Project[],
  biztech: {
    statement: "Currently bridging the gap between engineering and corporate strategy by independently studying business management frameworks, enterprise ERP data structures, and financial data modeling — combining technical depth with business acumen to operate at the intersection of data and decision-making.",
    learningTags: [
      "Business Strategy", "Financial Modeling", "ERP Systems", 
      "Enterprise Data Architecture", "Corporate IT Operations", "Supply Chain Analytics"
    ],
    studies: [
      {
        title: "Business Management Frameworks",
        icon: "BookOpen",
        description: "Porter's Five Forces, SWOT Analysis, Balanced Scorecard — applying strategic tools to data-driven decision contexts."
      },
      {
        title: "Enterprise ERP Data Structures",
        icon: "Database",
        description: "SAP-style data models, master data management, and cross-functional module integrations (Finance, HR, Supply Chain)."
      },
      {
        title: "Financial Data Modeling",
        icon: "TrendingUp",
        description: "P&L structures, budget variance analysis, and building financial KPI dashboards for management reporting."
      },
      {
        title: "Corporate IT & Digital Transformation",
        icon: "Network",
        description: "IT governance frameworks, enterprise architecture patterns, and cloud-first strategy for modern business operations."
      }
    ] as StudyItem[],
    marketTracks: [
      {
        industry: "Manufacturing & Industrial",
        cities: "Coimbatore & Hosur",
        icon: "Factory",
        points: [
          "Predictive Maintenance & Defect Detection",
          "Supply Chain Data Automation",
          "Automated Workflows to Eliminate Manual Errors",
          "Operational KPI Dashboards (Power BI)"
        ]
      },
      {
        industry: "Corporate & IT",
        cities: "Chennai",
        icon: "Building",
        points: [
          "Clean Database Management & Data Integrity",
          "ETL Pipeline Construction",
          "Enterprise BI Reporting & Dashboards",
          "AI-Powered Process Automation"
        ]
      }
    ] as MarketTrack[]
  },
  certifications: [
    {
      org: "Corizo Edutech Private Limited",
      title: "Data Science, Finance, and HR Internship Training"
    },
    {
      org: "Microsoft / Coursera",
      title: "Preparing Data for Analysis with Microsoft Excel"
    },
    {
      org: "Lloyds Banking Group / Forage",
      title: "Data Science Job Simulation"
    },
    {
      org: "Simplilearn (SkillUp)",
      title: "Introduction to Data Science & Python Libraries"
    }
  ],
  additional: {
    strengths: [
      "Analytical Intelligence", "Creative Problem Solving", "Critical Thinking",
      "Efficient Multitasking", "Flexibility", "Responsible Leadership"
    ],
    interests: "Artificial Intelligence | Machine Learning | Data Engineering | Cloud Computing | Predictive Analytics | Business Intelligence | Business Strategy | Enterprise ERP"
  }
};

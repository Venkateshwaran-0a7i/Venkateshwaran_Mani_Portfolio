/**
 * content.ts — single source of truth for every piece of copy on the site.
 *
 * Sources: Venkateshwaran_Mani_CV.pdf (public/) + the previous site data.
 * Nothing here is invented: where the résumé gives no date / link / number,
 * the field is omitted rather than made up.
 */

import { asset, siteUrl } from "@/lib/asset";

// ─── Profile ───────────────────────────────────────────────────────────────

export const profile = {
  name: "Venkateshwaran Mani",
  firstName: "Venkateshwaran",
  role: "AI R&D Engineer",
  badge: "01 / AI R&D ENGINEER",
  headline: ["BUILDING THOUGHTS", "INTO LIVES"],
  tagline: "Generative AI · LLMs · RAG · AI Agents",
  location: "Madurai, Tamil Nadu, India",
  email: "venkateshwaran0720@gmail.com",
  phone: "+91 96557 24769",
  phoneTel: "+919655724769",
  linkedin: "https://www.linkedin.com/in/venkateshwaran-m-a3b2b23a3/",
  github: "https://github.com/Venkateshwaran-0a7i",
  cv: asset("/Venkateshwaran_Mani_CV.pdf"),
  siteUrl: siteUrl(),
  summary:
    "I work where data, engineering and business outcomes meet — building Generative AI apps, agents and RAG systems on clean Python pipelines.",
  objective:
    "Results-driven Data Scientist and Data Engineer with a strong foundation in Artificial Intelligence, Machine Learning and Deep Learning. Skilled in data analysis, predictive modeling and business-intelligence tooling — turning raw data into actionable insight and shipping solutions that drive business growth.",
  languages: ["English — Professional", "Tamil — Native"],
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Engineering",
    "Cloud Computing",
    "Predictive Analytics",
    "Business Intelligence",
  ],
} as const;

// ─── Hero telemetry ────────────────────────────────────────────────────────

export interface Metric {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}

export const metrics: Metric[] = [
  { value: 82, suffix: "%", label: "B.Tech aggregate" },
  { value: 5, suffix: "", label: "Projects shipped" },
  { value: 20, prefix: "+", suffix: "%", label: "Model accuracy gain" },
  { value: 30, prefix: "−", suffix: "%", label: "Manual reporting time" },
];

// ─── Projects ──────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  index: string;
  title: string;
  kind: string;
  desc: string;
  highlights: string[];
  stack: string[];
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "wallet-scholer",
    index: "01",
    title: "Wallet Scholer",
    kind: "Python · Web App",
    desc: "Personal finance tracking and budgeting app built with Python.",
    highlights: [
      "Expense tracking and budgeting workflows",
      "Open-source — full code on GitHub",
    ],
    stack: ["Python", "Web App"],
    repo: "https://github.com/Venkateshwaran-0a7i/Wallet-Scholer",
  },
  {
    id: "customer-ops-chatbot",
    index: "02",
    title: "Customer Ops Chatbot",
    kind: "NLP · Automation",
    desc: "Intent-based query automation for customer operations, containerised with Docker.",
    highlights: [
      "TF-IDF intent classification",
      "Flask service packaged as a Docker image",
    ],
    stack: ["Flask", "TF-IDF", "Docker", "Python"],
  },
  {
    id: "power-bi-automation",
    index: "03",
    title: "Power BI Automation",
    kind: "Business Intelligence",
    desc: "KPI dashboards that cut manual reporting time by 30% through automated refresh.",
    highlights: [
      "Dashboards built with DAX measures",
      "Automated refresh replaces manual reporting",
      "−30% data-analysis time",
    ],
    stack: ["Power BI", "DAX", "KPIs"],
  },
  {
    id: "semiconductor-yield",
    index: "04",
    title: "Semiconductor Yield Prediction",
    kind: "Machine Learning",
    desc: "Classification models that predict semiconductor production outcomes.",
    highlights: [
      "Feature engineering + PCA dimensionality reduction",
      "GridSearchCV hyperparameter optimisation",
      "Validated pre-processing and model pipeline",
    ],
    stack: ["Scikit-learn", "PCA", "GridSearchCV", "Pandas"],
  },
  {
    id: "anthropometric-analysis",
    index: "05",
    title: "Anthropometric Data Analysis",
    kind: "Data Analysis",
    desc: "Cleaning and statistical analysis of body-measurement datasets.",
    highlights: [
      "NumPy + Pandas cleaning pipeline",
      "BMI trend visualisation and correlation analysis",
      "Health insights derived from the data",
    ],
    stack: ["NumPy", "Pandas", "EDA", "Matplotlib"],
  },
];

// ─── Experience & education (one unified journey) ──────────────────────────

export type JourneyType = "work" | "education";

export interface Milestone {
  id: string;
  type: JourneyType;
  title: string;
  org: string;
  when: string;
  location?: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
}

export const journey: Milestone[] = [
  {
    id: "cavin",
    type: "work",
    title: "AI R&D Engineer",
    org: "Cavin Infotech",
    location: "Chennai",
    when: "Jun 2026 — Present",
    current: true,
    bullets: [
      "Building LangChain-based AI agents",
      "Designing RAG systems over enterprise data",
      "Shipping end-to-end LLM pipelines",
    ],
    tags: ["LangChain", "RAG", "LLMs", "AI Agents"],
  },
  {
    id: "codec",
    type: "work",
    title: "AI Intern",
    org: "Codec Technologies India",
    location: "Chennai",
    when: "Mar — Apr 2026",
    bullets: [
      "Developed CNN / LSTM models",
      "Built NLP preprocessing pipelines",
      "Improved model accuracy by 20%",
      "Deployed the solution with Docker",
    ],
    tags: ["CNN", "LSTM", "NLP", "Docker"],
  },
  {
    id: "forage",
    type: "work",
    title: "Data Science Job Simulation",
    org: "Forage · Lloyds Banking Group",
    when: "Dec 2025",
    bullets: [
      "Data gathering and exploratory data analysis",
      "Predictive modelling on financial data",
      "Stakeholder-ready visualisations",
    ],
    tags: ["EDA", "Predictive Modelling", "Visualisation"],
  },
  {
    id: "btech",
    type: "education",
    title: "B.Tech — Artificial Intelligence & Data Science",
    org: "Bharath Niketan Engineering College",
    location: "Theni · Anna University",
    when: "2022 — 2026",
    bullets: [
      "82% aggregate",
      "Focus on machine learning, deep learning and data engineering",
    ],
    tags: ["AI", "ML", "Data Science"],
  },
  {
    id: "corizo",
    type: "work",
    title: "Data Science, Finance & HR Intern",
    org: "Corizo Edutech · Wipro DICE",
    when: "Feb — Jun 2025",
    bullets: [
      "Data Science: EDA, preprocessing, +20% model accuracy via feature selection & tuning",
      "Data Science: Power BI dashboards cut analysis time by 30%",
      "Finance: budgeting, monthly summaries and reconciliation support",
      "HR: recruitment coordination, onboarding and employee data management",
    ],
    tags: ["Power BI", "DAX", "EDA", "Excel"],
  },
  {
    id: "hsc",
    type: "education",
    title: "Higher Secondary — Computer Science",
    org: "PKN Higher Secondary School",
    location: "Tirumangalam",
    when: "2020 — 2022",
    bullets: ["65% — computer-science stream"],
    tags: ["Computer Science"],
  },
];

// ─── Certifications ────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  code: string;
  title: string;
  issuer: string;
  badge: string;
  brand: string;
  blurb: string;
  /** Only filled when the résumé states a date. */
  period?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "corizo-internship",
    code: "CORIZO//DS-INT",
    title: "Data Science Internship",
    issuer: "Corizo / Wipro DICE",
    badge: "CZ",
    brand: "#ff6a3d",
    blurb: "Hands-on experience in data science projects.",
    period: "Feb — Mar 2025",
    skills: ["EDA", "Data Preprocessing", "Model Optimisation", "Power BI"],
  },
  {
    id: "corizo-finance",
    code: "CORIZO//FIN-INT",
    title: "Finance Internship",
    issuer: "Corizo / Wipro DICE",
    badge: "CZ",
    brand: "#ffb020",
    blurb: "Financial analysis, budgeting, reporting and reconciliation support.",
    period: "05 Mar — 05 Apr 2025",
    skills: ["Financial Analysis", "Budgeting", "Reporting", "Reconciliation"],
  },
  {
    id: "corizo-hr",
    code: "CORIZO//HR-INT",
    title: "Human Resources Internship",
    issuer: "Corizo / Wipro DICE",
    badge: "CZ",
    brand: "#ff3b5c",
    blurb: "Recruitment coordination, onboarding and HR documentation.",
    period: "05 May — 05 Jun 2025",
    skills: ["Recruitment Coordination", "Onboarding", "HR Documentation"],
  },
  {
    id: "corizo-training",
    code: "CORIZO//DS-TRN",
    title: "Data Science Training",
    issuer: "Corizo / Wipro DICE",
    badge: "CZ",
    brand: "#e0529c",
    blurb: "Statistical modeling and ML foundations.",
    skills: ["Statistical Modeling", "Machine Learning", "Python"],
  },
  {
    id: "simplilearn-intro",
    code: "SKILLUP//DS-101",
    title: "Introduction to Data Science",
    issuer: "Simplilearn (SkillUp)",
    badge: "SL",
    brand: "#27c4a8",
    blurb: "Core data science concepts.",
    skills: ["Data Science Concepts", "Analytics Workflow", "Python"],
  },
  {
    id: "forage-sim",
    code: "FORAGE//DS-SIM",
    title: "Data Science Job Simulation",
    issuer: "Forage",
    badge: "FG",
    brand: "#4d8dff",
    blurb:
      "Practical experience in data gathering, exploratory data analysis and building ML models.",
    period: "Completed Dec 2025",
    skills: ["Data Gathering", "EDA", "Machine Learning Models"],
  },
  {
    id: "simplilearn-libs",
    code: "SKILLUP//PY-LIB",
    title: "Python Libraries for Data Science",
    issuer: "Simplilearn (SkillUp)",
    badge: "SL",
    brand: "#b36bff",
    blurb: "NumPy, Pandas and Matplotlib for data analysis.",
    skills: ["NumPy", "Pandas", "Matplotlib"],
  },
];

// ─── Skills ────────────────────────────────────────────────────────────────

export const skillGroups: Record<string, string[]> = {
  Languages: ["Python", "SQL", "NoSQL"],
  "AI & ML": [
    "LangChain",
    "RAG",
    "LLMs",
    "AI Agents",
    "NLP",
    "Transformers",
    "TensorFlow",
    "Keras",
    "PyTorch",
    "Scikit-learn",
    "CNNs",
    "RNNs / LSTMs",
  ],
  "UI/UX Designing": [
    "Wireframing",
    "Prototyping",
    "User Flows",
    "Visual Design",
    "Figma",
    "Canva",
  ],
  Backend: [
    "FastAPI",
    "REST APIs",
    "Authentication",
    "CRUD Operations",
    "Model Deployment via APIs",
  ],
  Databases: ["PostgreSQL", "MongoDB", "MSSQL", "SQL", "NoSQL"],
  "Data & BI": [
    "Pandas",
    "NumPy",
    "Power BI",
    "Tableau",
    "DAX",
    "Excel",
    "Feature Engineering",
  ],
  "Cloud & DevOps": [
    "Google Cloud Platform",
    "Compute Engine",
    "Docker",
    "Linux",
    "Git & GitHub",
  ],
  "Core CS": [
    "ETL Pipelines",
    "Data Warehousing",
    "Batch & Stream Processing",
    "Workflow Automation",
    "Statistical Analysis",
    "A/B Testing",
  ],
};

/** Terminal-style skills matrix: domain → what it was applied to. */
export interface SkillDomain {
  id: string;
  label: string;
  skills: string[];
  evidence: string[];
}

export const skillMatrix: SkillDomain[] = [
  {
    id: "genai",
    label: "GenAI & Agents",
    skills: ["LangChain", "RAG", "LLMs", "AI Agents", "Transformers"],
    evidence: [
      "Cavin Infotech — LangChain agents & RAG over enterprise data",
      "Cavin Infotech — end-to-end LLM pipelines",
    ],
  },
  {
    id: "dl",
    label: "Deep Learning",
    skills: ["CNNs", "RNNs / LSTMs", "TensorFlow", "Keras", "NLP"],
    evidence: [
      "Codec Technologies — CNN / LSTM models, +20% accuracy",
      "Codec Technologies — NLP preprocessing pipelines",
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    skills: ["Scikit-learn", "PCA", "GridSearchCV", "Feature Engineering"],
    evidence: [
      "Semiconductor Yield Prediction — PCA + GridSearchCV",
      "Corizo — +20% accuracy through feature selection & tuning",
    ],
  },
  {
    id: "data",
    label: "Data Engineering",
    skills: ["ETL Pipelines", "Pandas", "SQL", "Airflow (basic)", "GCP"],
    evidence: [
      "Anthropometric Data Analysis — NumPy/Pandas cleaning pipeline",
      "Forage × Lloyds — data gathering and EDA",
    ],
  },
  {
    id: "bi",
    label: "BI & Analytics",
    skills: ["Power BI", "DAX", "Tableau", "Excel", "KPIs"],
    evidence: [
      "Corizo — Power BI dashboards, −30% analysis time",
      "Power BI Automation — automated refresh KPI dashboards",
    ],
  },
  {
    id: "backend",
    label: "APIs & Deployment",
    skills: ["FastAPI", "Flask", "REST", "Docker", "Linux"],
    evidence: [
      "Customer Ops Chatbot — Flask service shipped in Docker",
      "Codec Technologies — Docker deployment",
    ],
  },
];

export const strengths = [
  {
    title: "Agentic AI",
    text: "LangChain agents and RAG systems that reason over real enterprise data.",
  },
  {
    title: "Data → Decisions",
    text: "From messy datasets to dashboards and models stakeholders actually use.",
  },
  {
    title: "Production mindset",
    text: "FastAPI services, Docker images and clean, testable Python pipelines.",
  },
];

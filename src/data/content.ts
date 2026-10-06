/**
 * content.ts — single source of truth for all copy.
 * Editing this file is the ONLY action required to update page content.
 */

// ─── Interfaces ────────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  /** Path to CV PDF served from /public. */
  cv: string;
  summary: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Project {
  title: string;
  stack: string;
  desc: string;
  /** GitHub repo URL — empty string hides the "Code" button. */
  repo: string;
  /** Live demo URL — empty string hides the "Demo" button. */
  demo: string;
}

export interface Role {
  role: string;
  org: string;
  when: string;
  note: string;
}

export type StackGroups = Record<string, string[]>;

// ─── Data ──────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name: "Venkateshwaran Mani",
  role: "AI R&D Engineer",
  tagline: "Generative AI · LLMs · RAG · AI Agents",
  location: "Madurai, Tamil Nadu, India",
  email: "venkateshwaran0720@gmail.com",
  linkedin: "https://www.linkedin.com/in/venkateshwaran-m-a3b2b23a3/",
  github: "https://github.com/Venkateshwaran-0a7i",
  cv: "/Venkateshwaran_Mani_Portfolio/Venkateshwaran_Mani_CV.pdf",
  summary:
    "I work where data, engineering and business outcomes meet — building Generative AI apps, agents and RAG systems on clean Python pipelines.",
};

export const stats: Stat[] = [
  { value: 30, suffix: "%", label: "less manual reporting time" },
  { value: 20, suffix: "%", label: "model accuracy gain" },
  { value: 82, suffix: "%", label: "B.Tech aggregate" },
];

export const projects: Project[] = [
  {
    title: "Wallet Scholer",
    stack: "Python · Web App",
    desc: "Personal finance tracking and budgeting app built with Python.",
    repo: "https://github.com/Venkateshwaran-0a7i/Wallet-Scholer",
    demo: "",
  },
  {
    title: "Customer Ops Chatbot",
    stack: "Flask · TF-IDF · Docker",
    desc: "Intent-based query automation for customer operations — containerised with Docker.",
    repo: "",
    demo: "",
  },
  {
    title: "Power BI Automation",
    stack: "Power BI · DAX",
    desc: "KPI dashboards that cut manual reporting time by 30% through automated refresh.",
    repo: "",
    demo: "",
  },
  {
    title: "Semiconductor Yield",
    stack: "Scikit-learn · PCA · GridSearchCV",
    desc: "Manufacturing yield prediction using PCA dimensionality reduction and hyperparameter tuning.",
    repo: "",
    demo: "",
  },
  {
    title: "Anthropometric Analysis",
    stack: "Pandas · EDA",
    desc: "Exploratory analysis of BMI trends and anthropometric correlations across datasets.",
    repo: "",
    demo: "",
  },
];

export const experience: Role[] = [
  {
    role: "AI R&D Engineer",
    org: "Cavin Infotech, Chennai",
    when: "Jun 2026 – Present",
    note: "LangChain agents, RAG for enterprise data, end-to-end LLM pipelines.",
  },
  {
    role: "AI Intern",
    org: "Codec Technologies India, Chennai",
    when: "Mar – Apr 2026",
    note: "CNN / LSTM model development, NLP preprocessing, +20% accuracy, Docker deployment.",
  },
  {
    role: "Data Science Simulation",
    org: "Forage · Lloyds Banking Group",
    when: "Dec 2025",
    note: "EDA, predictive modelling, stakeholder-ready visualisations.",
  },
  {
    role: "Data Science, Finance & HR Intern",
    org: "Corizo Edutech",
    when: "Feb – May 2025",
    note: "Power BI + DAX dashboards, automated refresh, −30% reporting overhead.",
  },
];

export const education = {
  degree: "B.Tech, Artificial Intelligence & Data Science",
  institution: "Bharath Niketan College of Engineering",
  period: "2022 – 2026",
  aggregate: "82%",
};

export const stackGroups: StackGroups = {
  "AI / GenAI": [
    "LangChain",
    "RAG",
    "LLMs",
    "AI Agents",
    "NLP",
    "Transformers",
    "CNN / LSTM",
  ],
  Backend: ["FastAPI", "Flask", "REST APIs", "Docker", "Linux", "Git"],
  Data: ["SQL", "PostgreSQL", "MongoDB", "ETL", "Pandas", "Power BI", "DAX"],
  ML: ["Scikit-learn", "TensorFlow", "PyTorch", "Keras", "OpenCV", "R"],
};

/* ============================================================
   Experience data — default content
   ------------------------------------------------------------
   This is the fallback data shown on the Experience page.
   The Admin Panel (admin.html) lets you add/edit/delete/reorder
   entries without touching this file — those changes are saved
   to the browser's localStorage and take over automatically.

   To make Admin Panel edits permanent for EVERY visitor (not
   just your own browser), use "Export JSON" in the Admin Panel
   and paste the result in place of the array below, replacing
   DEFAULT_EXPERIENCES entirely, then re-upload the site.
   ============================================================ */

const DEFAULT_EXPERIENCES = [
  {
    id: "exp-software-dev",
    title: "Software Development & Project Experience",
    organization: "Academic & Personal Projects",
    type: "Project Experience",
    categories: ["Project Experience", "Academic Experience"],
    period: "2025 – Present",
    featured: true,
    description:
      "Developing practical software and technology projects as part of my Computer Science and Engineering journey, focusing on programming, web development, data structures, and artificial intelligence.",
    responsibilities: [
      "Developed academic and personal software projects.",
      "Worked with Python, Java, C, HTML, CSS, and web technologies.",
      "Applied Data Structures & Algorithms to practical problems.",
      "Explored Artificial Intelligence concepts through academic projects.",
      "Worked on projects designed to solve real-world problems."
    ],
    skills: ["Python", "Java", "C", "HTML", "CSS", "DSA", "Artificial Intelligence", "Problem Solving"],
    outcome: "",
    image: ""
  },
  {
    id: "exp-adf-internship",
    title: "Amrita Devi Foundation Internship",
    organization: "Amrita Devi Foundation, in collaboration with NIET",
    type: "Internship",
    categories: ["Internship"],
    period: "2026",
    featured: true,
    description:
      "Participated in an online internship focused on digital outreach, social awareness, content creation, and social-impact activities.",
    responsibilities: [
      "Participated in digital awareness and outreach activities.",
      "Created and shared social-impact related content.",
      "Contributed to LinkedIn engagement and awareness campaigns.",
      "Participated in cleanliness and social-impact activities.",
      "Worked on documentation-related activities as part of the internship."
    ],
    skills: ["Communication", "Content Creation", "Digital Outreach", "Social Media", "Teamwork"],
    outcome: "",
    image: ""
  },
  {
    id: "exp-ai-fake-identity",
    title: "AI-Based Fake Identity & Document Screening System",
    organization: "Academic / AI Project",
    type: "Academic / AI Project",
    categories: ["AI / Technology", "Project Experience"],
    period: "2026",
    featured: false,
    description:
      "Worked on an AI-focused project designed to explore how artificial intelligence can assist in identifying potentially fake identities and suspicious documents.",
    responsibilities: [
      "Contributed to project research and problem identification.",
      "Explored AI concepts relevant to identity and document verification.",
      "Worked with the team on developing the project concept and solution.",
      "Helped connect the technical solution with a real-world problem."
    ],
    skills: ["Artificial Intelligence", "Python", "Problem Solving", "Research", "Project Development"],
    outcome: "",
    image: ""
  },
  {
    id: "exp-legal-awareness",
    title: "Legal Awareness for Common Citizens",
    organization: "Academic / Innovation Project",
    type: "Academic / Innovation Project",
    categories: ["Innovation", "Project Experience"],
    period: "2026",
    featured: false,
    description:
      "Worked on an innovation-focused project aimed at making basic legal awareness more accessible to common citizens.",
    responsibilities: [
      "Identified the problem and target users.",
      "Conducted basic market and problem analysis.",
      "Developed the project concept using design-thinking principles.",
      "Worked on solution ideation and MVP planning.",
      "Contributed to the project's business and implementation strategy."
    ],
    skills: ["Design Thinking", "Innovation", "Problem Solving", "Research", "Entrepreneurship", "Teamwork"],
    outcome: "",
    image: ""
  },
  {
    id: "exp-fee-receipt-dsa",
    title: "Fee Receipt and Tracking System",
    organization: "Academic / DSA Project",
    type: "Academic / DSA Project",
    categories: ["DSA", "Project Experience"],
    period: "2026",
    featured: false,
    description:
      "Developed a data-structure-focused project for managing and tracking student fee receipt information.",
    responsibilities: [
      "Designed the basic system structure.",
      "Explored the use of arrays, linked lists, and hybrid data structures.",
      "Applied Data Structures & Algorithms concepts to a practical education-related problem.",
      "Worked on organizing and retrieving student fee information efficiently."
    ],
    skills: ["Data Structures", "Algorithms", "C / Programming", "Problem Solving", "System Design"],
    outcome: "",
    image: ""
  }
];

/* ---- Shared storage helpers (used by experience.js and admin.js) ---- */
const EXPERIENCE_STORAGE_KEY = "portfolio.experienceData.v1";

function getExperienceData() {
  try {
    const raw = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Could not read saved experience data, using defaults.", e);
  }
  return DEFAULT_EXPERIENCES;
}

function saveExperienceData(data) {
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(data));
}

function resetExperienceData() {
  localStorage.removeItem(EXPERIENCE_STORAGE_KEY);
}

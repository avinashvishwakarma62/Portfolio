/* ============================================================
   Skills data
   ============================================================ */

const SKILL_CATEGORIES = [
  { id: "programming", label: "Programming Languages", filter: "Programming" },
  { id: "web", label: "Web Development", filter: "Web Development" },
  { id: "cs", label: "Computer Science", filter: "Computer Science" },
  { id: "ai", label: "Artificial Intelligence", filter: "AI" },
  { id: "tools", label: "Tools & Platforms", filter: "Tools" }
];

const SKILLS = [
  {
    name: "Python",
    category: "programming",
    level: "Intermediate",
    description: "My primary language for problem solving, scripting, and AI/ML experimentation.",
    icon: "code"
  },
  {
    name: "Java",
    category: "programming",
    level: "Beginner",
    description: "Learning object-oriented fundamentals and applying them to small programs and DSA practice.",
    icon: "braces"
  },
  {
    name: "C",
    category: "programming",
    level: "Beginner",
    description: "Built a foundation in core programming logic, memory concepts, and low-level problem solving.",
    icon: "terminal"
  },
  {
    name: "HTML & CSS",
    category: "web",
    level: "Intermediate",
    description: "Comfortable structuring and styling responsive, accessible pages — used throughout this portfolio.",
    icon: "layout"
  },
  {
    name: "JavaScript",
    category: "web",
    level: "Beginner",
    description: "Learning to add interactivity and dynamic behaviour to web pages and small projects.",
    icon: "script"
  },
  {
    name: "Web Development",
    category: "web",
    level: "Beginner",
    description: "Growing my ability to plan and build full web experiences end to end, from layout to logic.",
    icon: "globe"
  },
  {
    name: "Data Structures & Algorithms",
    category: "cs",
    level: "Beginner",
    description: "Practicing arrays, linked lists, and core algorithms to build stronger problem-solving instincts.",
    icon: "nodes"
  },
  {
    name: "Object-Oriented Programming",
    category: "cs",
    level: "Beginner",
    description: "Learning OOP principles — classes, objects, and structure — to write cleaner, reusable code.",
    icon: "cube"
  },
  {
    name: "Artificial Intelligence",
    category: "ai",
    level: "Beginner",
    description: "Exploring how AI concepts can be applied to real problems through academic projects.",
    icon: "spark"
  },
  {
    name: "Machine Learning",
    category: "ai",
    level: "Beginner",
    description: "Learning the basics of ML models and how data-driven systems make predictions.",
    icon: "chart"
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Beginner",
    description: "Using version control to track changes and manage project code.",
    icon: "branch"
  },
  {
    name: "VS Code",
    category: "tools",
    level: "Intermediate",
    description: "My everyday editor for writing, debugging, and organizing code across projects.",
    icon: "editor"
  },
  {
    name: "Google Colab",
    category: "tools",
    level: "Intermediate",
    description: "Regularly used for running Python and AI/ML experiments without local setup overhead.",
    icon: "cloud"
  },
  {
    name: "Kaggle",
    category: "tools",
    level: "Beginner",
    description: "Exploring datasets and beginner-friendly notebooks to build practical ML experience.",
    icon: "flask"
  },
  {
    name: "Linux / Ubuntu",
    category: "tools",
    level: "Beginner",
    description: "Getting comfortable navigating the terminal and working in a Linux environment.",
    icon: "terminal2"
  },
  {
    name: "LeetCode",
    category: "tools",
    level: "Beginner",
    description: "Practicing DSA problems regularly to sharpen problem-solving and interview readiness.",
    icon: "target"
  }
];

const CURRENTLY_LEARNING = ["Python", "Data Structures & Algorithms", "Artificial Intelligence", "Web Development"];

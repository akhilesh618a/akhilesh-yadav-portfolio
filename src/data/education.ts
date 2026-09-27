export interface EducationEntry {
  year: string;
  title: string;
  detail: string[];
  current?: boolean;
}

export const educationTimeline: EducationEntry[] = [
  {
    year: "2024",
    title: "B.Tech Started",
    detail: [
      "Computer Science & Engineering",
      "Artificial Intelligence & Machine Learning",
      "NIET, Greater Noida",
    ],
  },
  {
    year: "2025",
    title: "Foundation Building",
    detail: ["Programming", "DSA", "Development", "AI/ML fundamentals"],
  },
  {
    year: "2026",
    title: "Project-Oriented Learning",
    detail: [
      "AI systems",
      "Machine Learning",
      "Full-stack development",
      "Real-world problem solving",
    ],
  },
  {
    year: "NOW",
    title: "Third Year",
    detail: ["Machine Learning", "AI Development", "DSA", "Projects"],
    current: true,
  },
];

export const journeyTimeline: EducationEntry[] = [
  { year: "2024", title: "Started B.Tech in CSE (AI & ML).", detail: [] },
  {
    year: "2025",
    title: "Focused on programming, DSA and development fundamentals.",
    detail: [],
  },
  {
    year: "2026",
    title:
      "Moved deeper into AI/ML projects and real-world technical problem solving.",
    detail: [],
  },
  {
    year: "NOW",
    title:
      "Building projects and preparing for the next stage of my engineering career.",
    detail: [],
    current: true,
  },
];

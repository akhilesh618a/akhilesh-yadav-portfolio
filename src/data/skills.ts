export interface Skill {
  name: string;
  category: string;
}

export interface SkillOrbit {
  id: string;
  label: string;
  radius: number;
  duration: number; // seconds per full rotation
  skills: Skill[];
}

/**
 * Only technologies Akhilesh has actually used or is actively learning
 * are listed here. If a technology's status is uncertain, keep it here
 * as a clearly-editable entry rather than presenting it as verified,
 * production-grade experience.
 */
export const skillOrbits: SkillOrbit[] = [
  {
    id: "code",
    label: "CODE",
    radius: 150,
    duration: 34,
    skills: [
      { name: "Python", category: "Language" },
      { name: "Java", category: "Language" },
      { name: "C++", category: "Language" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    radius: 230,
    duration: 46,
    skills: [
      { name: "Machine Learning", category: "AI/ML" },
      { name: "Artificial Intelligence", category: "AI/ML" },
      { name: "Generative AI", category: "AI/ML" },
      { name: "Data Analysis", category: "AI/ML" },
    ],
  },
  {
    id: "build",
    label: "BUILD",
    radius: 310,
    duration: 58,
    skills: [
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "FastAPI", category: "Backend" },
      { name: "REST APIs", category: "Backend" },
    ],
  },
  {
    id: "tools",
    label: "TOOLS",
    radius: 390,
    duration: 70,
    skills: [
      { name: "Git", category: "Tooling" },
      { name: "GitHub", category: "Tooling" },
      { name: "VS Code", category: "Tooling" },
      { name: "Postman", category: "Tooling" },
    ],
  },
];

export const exploringTags: string[] = [
  "Machine Learning",
  "Artificial Intelligence",
  "Generative AI",
  "DSA",
  "Full-Stack Development",
  "AI Applications",
];

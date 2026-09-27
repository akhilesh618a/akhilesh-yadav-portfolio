/**
 * profile.ts
 * ------------------------------------------------------------------
 * Single source of truth for all personal, verified information.
 *
 * IMPORTANT: This file intentionally contains only information that
 * has been confirmed. Fields that are not yet available are left as
 * empty strings / null / empty arrays rather than invented — the UI
 * is written to gracefully hide or placeholder these instead of
 * fabricating content. Fill them in as real data becomes available.
 * ------------------------------------------------------------------
 */

import profileImage from "@/assets/profile.jpg";

export const profile = {
  name: "Akhilesh Yadav",
  initials: "AY",
  role: "CSE • AI & ML • Developer",
  status: "3rd-Year B.Tech Student",
  degree: "B.Tech — Computer Science & Engineering (AI & ML)",
  college: "Noida Institute of Engineering & Technology (NIET), Greater Noida",
  location: "Greater Noida, India",
  careerGoal: "Aspiring Machine Learning Engineer",

  rotatingRoles: [
    "Aspiring Machine Learning Engineer",
    "AI/ML Developer",
    "Software Developer",
    "Problem Solver",
  ],

  heroDescription: [
    "I'm a third-year B.Tech student specializing in Computer Science & Artificial Intelligence & Machine Learning, focused on building intelligent systems and practical software solutions.",
    "Currently exploring Machine Learning, Generative AI, development and real-world problem solving.",
  ],

  aboutParagraph:
    "I'm Akhilesh Yadav, a third-year B.Tech student specializing in Computer Science and Artificial Intelligence & Machine Learning at NIET, Greater Noida. I enjoy understanding complex problems, designing practical solutions and turning ideas into working systems. My current focus is building a stronger foundation in Machine Learning, Artificial Intelligence, software development and problem solving.",

  yearOfBTech: "03",

  openToOpportunities: true,

  // Only verified, real profiles. Do not add guessed URLs.
  links: {
    github: "https://github.com/akhilesh618a",
    linkedin: "https://www.linkedin.com/in/akhilesh-yadav-931489349",
    leetcode: "https://leetcode.com/u/akhil_618a/",
    // Add only when a real, confirmed address is supplied — never invented.
    email: "",
  },

  // Set to a real path (e.g. "/resume.pdf" placed in /public) only once
  // an actual resume file is supplied. The Hero section hides the
  // "Download Resume" button automatically while this is empty.
  resumeUrl: "",

  // Real photo — src/assets/profile.jpg. Replace this file to update it.
  profileImageSrc: profileImage as string | null,
} as const;

export type Profile = typeof profile;

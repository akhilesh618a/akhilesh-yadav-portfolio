export interface ArchitectureStage {
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  architecture: ArchitectureStage[];
  riskStates?: string[];
  caseStudy: {
    problem: string;
    approach: string;
    architecture: string;
    technology: string[];
    implementation: string | null;
    challenges: string | null;
    contribution: string | null;
    status: string;
    github: string | null;
    liveDemo: string | null;
  };
  hardware?: string[];
  software?: string[];
}

/**
 * Every field below reflects only what has been explicitly provided.
 * Any unknown case-study field is rendered in the UI as
 * "Details coming soon" rather than invented — see ProjectModal.tsx.
 */
export const projects: Project[] = [
  {
    slug: "minewatch",
    title: "MINEWATCH",
    subtitle:
      "AI-Enabled Mine Subsidence Monitoring, Prediction & Early Warning System",
    description:
      "MINEWATCH is a low-cost intelligent monitoring concept for underground coal mines that combines sensor data, LoRa-based communication, real-time processing and machine-learning-based risk assessment.",
    tech: [
      "ESP32",
      "LoRa",
      "LoRaWAN",
      "MQTT",
      "Python",
      "FastAPI",
      "Machine Learning",
      "React",
    ],
    architecture: [
      { label: "SENSORS" },
      { label: "EDGE DEVICE" },
      { label: "LoRa" },
      { label: "MQTT" },
      { label: "BACKEND" },
      { label: "ML RISK ENGINE" },
      { label: "DASHBOARD" },
      { label: "ALERT" },
    ],
    riskStates: ["LOW", "MEDIUM", "HIGH"],
    hardware: ["ESP32", "MPU6050", "VL53L1X", "DHT11", "MQ-2", "LoRa"],
    software: ["Python", "FastAPI", "MQTT", "React", "Machine Learning"],
    caseStudy: {
      problem:
        "Underground mine environments require continuous monitoring of parameters associated with potential subsidence and unsafe conditions.",
      approach:
        "A low-cost monitoring architecture that combines IoT sensing, long-range communication, backend processing and ML-based risk assessment.",
      architecture: "Sensor → LoRa → MQTT → Backend → ML → Dashboard → Alert",
      technology: [
        "Python",
        "FastAPI",
        "MQTT",
        "React",
        "Machine Learning",
        "ESP32",
        "LoRa / LoRaWAN",
      ],
      implementation: null,
      challenges: null,
      contribution: null,
      status:
        "Project / prototype — this system is a concept and engineering exercise, not a production-deployed solution.",
      github: null,
      liveDemo: null,
    },
  },
  {
    slug: "document-intelligence",
    title: "DOCUMENT INTELLIGENCE",
    subtitle: "AI-powered Mining & Geological Document Retrieval",
    description:
      "A document intelligence system designed to process mining and geological documents, extract information and provide AI-assisted answers grounded in retrieved document evidence.",
    tech: ["Python", "FastAPI", "AI/LLM", "OCR", "Vector Search", "React"],
    architecture: [
      { label: "DOCUMENT" },
      { label: "EXTRACTION" },
      { label: "CHUNKING" },
      { label: "INDEXING" },
      { label: "RETRIEVAL" },
      { label: "AI" },
      { label: "EVIDENCE-BASED ANSWER" },
    ],
    caseStudy: {
      problem:
        "Mining and geological documents are dense and hard to search — extracting the right evidence quickly is a real bottleneck.",
      approach:
        "A retrieval-augmented pipeline: extract text (with OCR where applicable), chunk and index documents, retrieve relevant evidence, and generate answers grounded in that evidence.",
      architecture:
        "Document → Extraction → Chunking → Indexing → Retrieval → AI → Evidence-based Answer",
      technology: [
        "Python",
        "FastAPI",
        "OCR",
        "Vector Search",
        "AI / LLM",
        "React",
      ],
      implementation: null,
      challenges: null,
      contribution: null,
      status: "In active development.",
      github: null,
      liveDemo: null,
    },
  },
];

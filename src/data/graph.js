// Layout of the stack graph shown in the hero. Positions are world units for the 3D scene.
// Edges follow the real architectures of HRC TECH, Shop-Zone and the Java/MySQL work.
export const GRAPH_NODES = {
  react:    { label: "React",        skill: "React",                  pos: [-2.7, 0.9, 0.2],  color: "#38e1ff" },
  nextjs:   { label: "Next.js",      skill: "Next.js",                pos: [-2.7, -1.1, -0.3], color: "#eef1f7" },
  aspnet:   { label: "ASP.NET Core", skill: "ASP.NET Core",           pos: [-0.9, 1.7, 0.3],  color: "#a78bfa" },
  node:     { label: "Node.js",      skill: "Node.js & Express",      pos: [-0.9, -0.2, -0.4], color: "#c6ff3d" },
  java:     { label: "Java",         skill: "Java",                   pos: [-0.9, -2.1, 0.2],  color: "#fb923c" },
  jwt:      { label: "JWT",          skill: "JWT & role-based auth",  pos: [0.9, 2.0, -0.2],  color: "#ff5c8a" },
  stripe:   { label: "Stripe",       skill: "Stripe payments",        pos: [0.9, 0.6, 0.4],   color: "#8b6cff" },
  ffmpeg:   { label: "FFmpeg",       skill: "FFmpeg",                 pos: [0.9, -0.8, -0.3], color: "#4ade80" },
  docker:   { label: "Docker",       skill: "Docker",                 pos: [0.9, -2.2, 0.3],  color: "#38bdf8" },
  postgres: { label: "PostgreSQL",   skill: "PostgreSQL",             pos: [2.7, 1.3, 0.1],   color: "#38e1ff" },
  mongo:    { label: "MongoDB",      skill: "MongoDB",                pos: [2.7, -0.5, -0.4], color: "#4ade80" },
  mysql:    { label: "MySQL",        skill: "MySQL",                  pos: [2.7, -2.0, 0.3],  color: "#facc15" },
};

export const GRAPH_EDGES = [
  ["react", "aspnet"], ["react", "node"], ["react", "nextjs"],
  ["aspnet", "jwt"], ["aspnet", "stripe"], ["aspnet", "ffmpeg"], ["aspnet", "postgres"],
  ["node", "jwt"], ["node", "mongo"], ["java", "mysql"],
  ["docker", "aspnet"], ["docker", "postgres"],
];

// Layout of the stack graph shown in the hero. Positions are world units for the 3D scene.
// Edges follow the real architectures of HRC TECH, Shop-Zone and the Java/MySQL work.
export const GRAPH_NODES = {
  react:    { label: "React",        skill: "React",                  pos: [-2.7, 0.9, 0.2],  color: "#2dd4bf" },
  nextjs:   { label: "Next.js",      skill: "Next.js",                pos: [-2.7, -1.1, -0.3], color: "#f5ede3" },
  aspnet:   { label: "ASP.NET Core", skill: "ASP.NET Core",           pos: [-0.9, 1.7, 0.3],  color: "#ff9db1" },
  node:     { label: "Node.js",      skill: "Node.js & Express",      pos: [-0.9, -0.2, -0.4], color: "#ff7a45" },
  java:     { label: "Java",         skill: "Java",                   pos: [-0.9, -2.1, 0.2],  color: "#ff9f5a" },
  jwt:      { label: "JWT",          skill: "JWT & role-based auth",  pos: [0.9, 2.0, -0.2],  color: "#ff5c7a" },
  stripe:   { label: "Stripe",       skill: "Stripe payments",        pos: [0.9, 0.6, 0.4],   color: "#e879a6" },
  ffmpeg:   { label: "FFmpeg",       skill: "FFmpeg",                 pos: [0.9, -0.8, -0.3], color: "#8fd19e" },
  docker:   { label: "Docker",       skill: "Docker",                 pos: [0.9, -2.2, 0.3],  color: "#7dd3c8" },
  postgres: { label: "PostgreSQL",   skill: "PostgreSQL",             pos: [2.7, 1.3, 0.1],   color: "#2dd4bf" },
  mongo:    { label: "MongoDB",      skill: "MongoDB",                pos: [2.7, -0.5, -0.4], color: "#8fd19e" },
  mysql:    { label: "MySQL",        skill: "MySQL",                  pos: [2.7, -2.0, 0.3],  color: "#f4d58d" },
};

export const GRAPH_EDGES = [
  ["react", "aspnet"], ["react", "node"], ["react", "nextjs"],
  ["aspnet", "jwt"], ["aspnet", "stripe"], ["aspnet", "ffmpeg"], ["aspnet", "postgres"],
  ["node", "jwt"], ["node", "mongo"], ["java", "mysql"],
  ["docker", "aspnet"], ["docker", "postgres"],
];

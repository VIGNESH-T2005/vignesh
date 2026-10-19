// Small inline icon set (no icon dependency). All icons inherit currentColor.
const base = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const GithubIcon = (p) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
export const LinkedinIcon = (p) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
export const CodeIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
);
export const MailIcon = (p) => (
  <svg {...base} {...stroke} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const DownloadIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" /></svg>
);
export const ExternalIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
export const ArrowRightIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
);
export const SunIcon = (p) => (
  <svg {...base} {...stroke} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const MoonIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const MenuIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const ChatIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 21 12z" /></svg>
);
export const SendIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>
);
export const CheckIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="m5 12 5 5 9-10" /></svg>
);

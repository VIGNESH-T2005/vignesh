// Engineering notes: short write-ups of how my own projects work. Each statement describes
// code that exists in the linked repository; dates are commit dates.
export const POSTS = [
  {
    slug: "protecting-course-content-in-hrc-tech",
    title: "How HRC TECH keeps paid course content from leaking",
    date: "2026-10-06",
    project: "hrc-tech",
    tags: ["ASP.NET Core", "Security", "FFmpeg"],
    summary: "Token-gated streaming, hashed access tokens and per-lesson watermarks: the layers that protect video and PDF lessons.",
    body: [
      { t: "p", v: "An e-learning platform has a simple promise to instructors: only paying students see the lessons. The hard part is that videos and PDFs are just files. HRC TECH layers several small defences instead of relying on one." },
      { t: "h", v: "1. No static file serving" },
      { t: "p", v: "Course files are not placed in a public folder. The only way to reach one is the content controller, which checks that the signed-in student is enrolled in the course before returning anything." },
      { t: "h", v: "2. Short-lived, hashed content tokens" },
      { t: "p", v: "Each playback request gets a ContentAccessToken tied to one student and one lesson with an expiry time. The database stores only the SHA-256 hash of the token, so a leaked table cannot be replayed." },
      { t: "h", v: "3. Streaming that behaves like a file server" },
      { t: "p", v: "The controller streams the file with byte-range support so video seeking works, and marks responses as non-cacheable:" },
      { t: "code", v: "Response.Headers.CacheControl = \"no-store\";\nreturn PhysicalFile(file.PhysicalPath, file.ContentType, enableRangeProcessing: true);" },
      { t: "h", v: "4. Watermarks that identify the student" },
      { t: "p", v: "Uploads are queued on a Channel and processed by a BackgroundService so admins are not blocked. Videos are re-encoded with FFmpeg's drawtext filter (libx264, veryfast preset) and PDFs are stamped with PDFsharp. If a copy leaks, it carries the student's identity." },
      { t: "h", v: "5. Rate limits on the expensive endpoints" },
      { t: "p", v: "Fixed-window rate limiters partition by IP for strict auth, refresh and content-stream policies, so brute force or scraping attempts are throttled." },
      { t: "h", v: "Limits" },
      { t: "p", v: "Watermarking is a deterrent and an audit trail rather than DRM: a determined person can still screen-record." },
    ],
  },
  {
    slug: "idempotent-stripe-webhooks",
    title: "Making Stripe webhooks safe to retry in ASP.NET Core",
    date: "2026-09-24",
    project: "hrc-tech",
    tags: ["Stripe", "Payments", "ASP.NET Core"],
    summary: "Verify the signature, remember every event ID, and never enrol a student twice.",
    body: [
      { t: "p", v: "Stripe retries webhooks whenever your server does not answer quickly, so the same event can arrive more than once. If the handler grants course access each time, the result is duplicate enrollments or double processing." },
      { t: "h", v: "Step 1: verify the signature" },
      { t: "p", v: "The payment gateway rebuilds the event from the raw body and the Stripe-Signature header using the webhook secret. A forged request fails before any business logic runs:" },
      { t: "code", v: "var stripeEvent = EventUtility.ConstructEvent(json, signatureHeader, _o.WebhookSecret, throwOnApiVersionMismatch: false);" },
      { t: "h", v: "Step 2: remember every event" },
      { t: "p", v: "A WebhookEvent row stores the gateway's event ID, its type and when it was processed. The service checks for the ID first and returns early if it has been handled:" },
      { t: "code", v: "if (await db.WebhookEvents.AnyAsync(w => w.GatewayEventId == evt.EventId, ct)) return;" },
      { t: "h", v: "Step 3: make the state change idempotent too" },
      { t: "p", v: "Even for a new event, a payment that is already marked Successful returns immediately, and enrolling in a course the student already owns raises a conflict instead of creating a second record." },
      { t: "p", v: "The platform runs against Stripe in test mode. The pattern is what matters: verify, deduplicate, then change state." },
    ],
  },
  {
    slug: "building-the-shop-zone-api",
    title: "Building the Shop-Zone REST API with Express, JWT and MongoDB",
    date: "2026-06-20",
    project: "shop-zone",
    tags: ["Node.js", "Express", "MongoDB"],
    summary: "MVC folders, bcrypt, JWT middleware and admin-only routes in a first Node.js backend.",
    body: [
      { t: "p", v: "Shop-Zone started as a React storefront with hard-coded products. To make it real I built a separate Express API, my first Node.js backend, and deployed it to Render with MongoDB Atlas." },
      { t: "h", v: "Structure" },
      { t: "p", v: "Routes, controllers, models and middleware live in separate folders. Route files only map URLs to controller functions, which keeps each file small." },
      { t: "h", v: "Authentication" },
      { t: "p", v: "Passwords are hashed with bcryptjs (salt rounds of 10) and login returns a JWT that expires in 30 days. A protect middleware verifies the token and loads the user; an admin middleware checks the isAdmin flag." },
      { t: "h", v: "Routes" },
      { t: "ul", v: ["POST /register and /login; GET /profile (protected)", "GET products and product by ID are public; create, update and delete require admin", "POST an order and GET my orders for any signed-in user; admins list all orders and mark them delivered"] },
      { t: "h", v: "Deployment details" },
      { t: "p", v: "CORS is limited to an allow-list that includes the deployed frontend, and a seeder script loads sample products into MongoDB." },
      { t: "h", v: "What is next" },
      { t: "p", v: "The React app currently consumes the product endpoints only. Wiring login, checkout and order history to the existing API is the obvious next step." },
    ],
  },
];

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);
export const readingMinutes = (post) =>
  Math.max(1, Math.round(post.body.map((b) => (Array.isArray(b.v) ? b.v.join(" ") : b.v)).join(" ").split(/\s+/).length / 200));

const http = require("http");
const os = require("os");

// The version is baked into the image at build time (see the Dockerfile).
// Building with --build-arg APP_VERSION=2.0 lets you see rolling updates clearly.
const VERSION = process.env.APP_VERSION || "dev";
const POD = os.hostname();

// The workspace container owns the PORT environment variable, so never read it
// here — hard-code the port the app listens on instead.
const APP_PORT = 3000;

const page = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Kubernetes 101</title>
    <style>
      body { font-family: system-ui, sans-serif; background: #0b1f33; color: #e8f0fe;
             display: grid; place-items: center; height: 100vh; margin: 0; }
      .card { background: #12263a; padding: 2.5rem 3rem; border-radius: 16px;
              box-shadow: 0 10px 40px rgba(0,0,0,.4); text-align: center; }
      h1 { margin: 0 0 1rem; font-size: 1.8rem; }
      .badge { display: inline-block; background: #1d72f3; padding: .35rem .9rem;
               border-radius: 999px; font-weight: 700; letter-spacing: .03em; }
      code { background: #08151f; padding: .2rem .5rem; border-radius: 6px; }
      p { margin: .6rem 0; color: #b8c7d9; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>🐳 Hello from Kubernetes!</h1>
      <p>Version <span class="badge">v${VERSION}</span></p>
      <p>Served by pod <code>${POD}</code></p>
    </div>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }
  if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ version: VERSION, pod: POD }) + "\n");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(page());
});

server.listen(APP_PORT, () => {
  console.log(`web v${VERSION} listening on :${APP_PORT} (pod ${POD})`);
});

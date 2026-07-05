# Kubernetes 101 — A Hands-on Labspace

Learn Kubernetes fundamentals **hands-on** by deploying a real application to a live, multi-node cluster — no cloud account, no cluster setup, just your browser and Docker.

This is a [Labspace](https://github.com/dockersamples/labspace-infra): a self-contained, interactive lab that runs entirely in Docker. It ships with a real **k3s** cluster (1 server + 2 agents), `kubectl` pre-configured, an in-cluster registry, and a Traefik ingress controller — all running beside a browser-based IDE and terminal.

## What you'll learn

The lab is split into 8 sections (six core + two bonus):

| # | Section | You'll learn to… |
|---|---------|------------------|
| 1 | **Introduction & Your Cluster** | Explore a running cluster with `kubectl get nodes` / `pods` / `cluster-info` |
| 2 | **Pods** | Run your first container as the smallest deployable unit |
| 3 | **Deployments** | Manage replicas, self-healing, and readiness probes |
| 4 | **Services** | Give pods a stable address and load-balance across them |
| 5 | **Scaling & Rolling Updates** | Scale replicas and ship a new version with zero downtime |
| 6 | **Exposing Your App with Ingress** | Route a real URL to your Service via Traefik |
| 7 | **Bonus: Compose → Kubernetes** | Generate manifests from a `compose.yaml` with [Compose Bridge](https://docs.docker.com/compose/bridge/) |
| 8 | **Bonus: GenAI on Kubernetes** | Run [Docker Model Runner](https://docs.docker.com/ai/model-runner/) and chat with an LLM in a Pod |

By the end you'll have built an image, pushed it to an in-cluster registry, and deployed a self-healing, load-balanced, publicly-routed app to Kubernetes.

## ✅ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine) **4.43+** with Compose v2
- Basic comfort with Docker (building and running containers)
- ~4 GB free RAM for the cluster and workspace

> No prior Kubernetes experience needed. If you can run `docker run`, you're ready.

## 🚀 Run the Labspace locally

1. **Clone this repository:**

   ```bash
   git clone https://github.com/ajeetraina/labspace-kubernetes-101.git
   cd labspace-kubernetes-101
   ```

2. **Start the Labspace:**

   ```bash
   # On Mac/Linux
   CONTENT_PATH=$PWD docker compose up

   # On Windows (PowerShell)
   $Env:CONTENT_PATH = (Get-Location).Path; docker compose up
   ```

   `CONTENT_PATH` points the content server at this repo's `labspace/` folder. The first run pulls the Labspace base images (the k3s cluster, registry, Traefik, and workspace), so give it a couple of minutes.

3. **Open the Labspace in your browser:**

   When the logs settle, they print the URL to open (the Labspace UI, served by default at <http://localhost:3030>). You'll see the lab content on the left and an IDE + terminal on the right. The **Your App** tab (pointing at <http://app.dockerlabs.xyz>) appears once you reach the Ingress section.

4. **Follow the sections in order**, starting with *Introduction & Your Cluster*. Every command runs in the built-in terminal against the live cluster.

5. **When you're done, tear everything down:**

   ```bash
   docker compose down -v
   ```

### The cluster you get

The lab runs a **3-node** k3s cluster so you can see Kubernetes spread work across machines:

- 1 server node (`control-plane`, also schedules workloads)
- 2 agent nodes (`k3s-agent-1`, `k3s-agent-2`)

The extra agents are defined in `compose.override.yaml` and join the server using a fixed token. Confirm it's healthy from the lab terminal with:

```bash
kubectl get nodes
```

You should see three nodes with `STATUS` of `Ready`.

## 🗂️ Repository structure

```
labspace-kubernetes-101/
├── compose.yaml               # Pulls the Labspace base + the override below
├── compose.override.yaml      # App config + the 2 extra k3s agent nodes
├── labspace/
│   ├── labspace.yaml          # Title, description, section order, service tabs
│   └── 01..08-*.md            # The 8 lab sections (the content learners read)
└── project/                   # The sample app, cloned into the workspace at start
    ├── server.js              # Tiny dependency-free Node.js app (reports version + pod)
    ├── Dockerfile             # APP_VERSION build arg drives the rolling-update demo
    ├── k8s/                   # Hand-written manifests: pod, deployment, service, ingress
    └── compose-bridge/        # Compose file + generated manifests for the bonus sections
```

## ✍️ Editing the content (dev mode)

Want to tweak the lab? Add `--watch` to the start command so edits to the `labspace/` markdown appear live without a restart:

```bash
# On Mac/Linux
CONTENT_PATH=$PWD docker compose up --watch
```

Edit any `labspace/0X-*.md` file (on your host or inside the Labspace IDE) and refresh the browser to see your changes. Update `labspace/labspace.yaml` to change the title, description, or section ordering.

> Check the [Labspace docs](https://github.com/dockersamples/labspace-infra/tree/main/docs) for authoring guidelines and available markdown directives (`:fileLink`, code-block run buttons, etc.).

## ✨ Authoring a new Labspace with Claude Code

This repo was bootstrapped from the Labspace starter template, which includes a Claude Code slash command that can scaffold an entire labspace — all section markdown, `labspace.yaml`, `compose.override.yaml`, and starter project files.

**Prerequisites:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed.

```
/labspace-author Teach Docker networking using bridge and overlay networks
```

Claude will ask a few questions (audience, tech stack, GitHub repo URL) and generate the files. Run `/labspace-author` with no arguments to be guided interactively.

## 📦 Publishing your Labspace

To publish a Labspace image to Docker Hub via GitHub Actions:

1. Add these GitHub Actions **secrets** to your repo:
   - `DOCKERHUB_USERNAME` — the username to authenticate to Docker Hub with
   - `DOCKERHUB_TOKEN` — a personal or organization access token
2. In `.github/workflows/publish-labspace.yaml.temp`, set `DOCKERHUB_REPO` to your target Docker Hub repo.
3. Rename the workflow to activate it:

   ```bash
   mv .github/workflows/publish-labspace.yaml.temp .github/workflows/publish-labspace.yaml
   ```

## 📄 License

See [LICENSE](./LICENSE).

# Kubernetes 101 — sample project

A tiny, dependency-free Node.js web app and the Kubernetes manifests you'll use
throughout the **Kubernetes 101** labspace.

## Files

| Path | Description |
|------|-------------|
| `server.js` | The web app. Reports its version and the pod it runs in. |
| `Dockerfile` | Builds the app image. Version is set via the `APP_VERSION` build arg. |
| `package.json` | Project metadata (no runtime dependencies). |
| `k8s/pod.yaml` | A single Pod — the smallest deployable unit. |
| `k8s/deployment.yaml` | A Deployment managing 3 replicas with a readiness probe. |
| `k8s/service.yaml` | A ClusterIP Service giving the pods one stable address. |
| `k8s/ingress.yaml` | An Ingress routing `app.dockerlabs.xyz` to the Service via Traefik. |

Follow the labspace instructions on the left to build the image, push it to the
in-cluster registry, and deploy it to a live k3s cluster.

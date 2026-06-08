# A tiny, dependency-free Node.js web server. It reports its version and the
# name of the pod it is running in — perfect for watching Kubernetes scale,
# load-balance, and roll out new versions.
FROM node:24-alpine

WORKDIR /app

# The version is baked in at build time. Override it with:
#   docker build --build-arg APP_VERSION=2.0 ...
ARG APP_VERSION=1.0
ENV APP_VERSION=${APP_VERSION}

COPY package.json ./
COPY server.js ./

EXPOSE 3000
USER node
CMD ["node", "server.js"]

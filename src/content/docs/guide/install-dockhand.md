---
title: Install Dockhand
description: Install Dockhand and open its Docker management interface.
sidebar:
  order: 6
---

Dockhand gives you a web interface for deploying and managing Docker Compose stacks.

In the VS Code terminal connected to Debian, create its directory and open a Compose file:

```bash
mkdir -p /opt/dockhand
cd /opt/dockhand
code compose.yaml
```

Paste and save:

```yaml
services:
  dockhand:
    image: fnsys/dockhand:latest
    container_name: dockhand
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      DATA_DIR: /opt/dockhand
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /opt/dockhand:/opt/dockhand
```

Start it:

```bash
docker compose up -d
```

Open `http://CONTAINER-IP:3000` and create the first admin account when prompted.

Dockhand can control every Docker container through the mounted Docker socket. Keep it on your trusted home network; do not expose port 3000 to the internet.

Dockhand is ready.

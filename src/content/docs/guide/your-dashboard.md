---
title: Build Your Dashboard
description: Deploy Heimdall through Dockhand and save a working snapshot.
sidebar:
  order: 7
---

Heimdall gives your homelab a simple home page with links to every service.

## Deploy Heimdall

1. Open Dockhand at `http://CONTAINER-IP:3000`.
2. Open **Stacks**, choose **New Stack**, select an internal stack, and name it `heimdall`.
3. Paste this Compose file into the editor:

```yaml
services:
  heimdall:
    image: lscr.io/linuxserver/heimdall:latest
    container_name: heimdall
    restart: unless-stopped
    environment:
      PUID: "0"
      PGID: "0"
      TZ: Etc/UTC
      ALLOW_INTERNAL_REQUESTS: "true"
    volumes:
      - ./config:/config
    ports:
      - "8080:80"
```

4. Choose **Deploy** and wait for the container to show as running.
5. Open `http://CONTAINER-IP:8080`.

## Add your first links

In Heimdall, choose **Add an application** and add:

- **Proxmox:** `https://PROXMOX-IP:8006`
- **Dockhand:** `http://CONTAINER-IP:3000`

## Save the working dashboard

In Proxmox, select the Debian container, open **Snapshots**, choose **Take Snapshot**, and name it `working-dashboard`.

Your homelab now has a front door and a restore point.

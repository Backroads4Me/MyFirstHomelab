---
title: Add Monitoring
description: Add Beszel and Dozzle through Dockhand, then finish the core path.
sidebar:
  order: 9
---

Beszel shows the server's health. Dozzle gives you a live, searchable view of Docker logs.

## Add Beszel

In Dockhand, create an internal stack named `beszel` with this Compose file, then deploy it:

```yaml
services:
  beszel:
    image: henrygd/beszel:latest
    container_name: beszel
    restart: unless-stopped
    environment:
      APP_URL: http://localhost:8090
    ports:
      - "8090:8090"
    volumes:
      - ./beszel_data:/beszel_data
      - ./beszel_socket:/beszel_socket
  beszel-agent:
    image: henrygd/beszel-agent:latest
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./beszel_agent_data:/var/lib/beszel-agent
      - ./beszel_socket:/beszel_socket
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      LISTEN: /beszel_socket/beszel.sock
      HUB_URL: http://localhost:8090
      TOKEN: REPLACE_AFTER_ADDING_SYSTEM
      KEY: REPLACE_AFTER_ADDING_SYSTEM
```

Open `http://CONTAINER-IP:8090`, create the admin account, and choose **Add System**. Use `/beszel_socket/beszel.sock` for **Host / IP**. Copy the generated token and key into the matching values in Dockhand's stack editor, redeploy the stack, then finish adding the system. It should turn green.

## Add Dozzle

Create an internal stack named `dozzle`, paste this file, and deploy it:

```yaml
services:
  dozzle:
    image: amir20/dozzle:latest
    container_name: dozzle
    restart: unless-stopped
    ports:
      - "8888:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data:/data
```

Open `http://CONTAINER-IP:8888`. Add Beszel and Dozzle to Heimdall with their URLs.

You now have Proxmox, a lightweight Debian container, Docker, a dashboard, health monitoring, and live logs—and you have proved you can undo a mistake. Take one final snapshot, and make **snapshot before every experiment** your homelab habit.

Continue with [Next Steps](/reference/next-steps/).

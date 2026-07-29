---
title: Glossary
description: Plain-language definitions for terms used in this guide.
sidebar:
  order: 2
---

**Clone:** An independent copy of a container. A full clone copies all of its storage.

**Compose:** A YAML file and Docker command for defining and running a group of containers as one stack.

**Container:** An isolated application or Linux environment that shares its host's kernel. This guide uses both an LXC system container and Docker application containers.

**DHCP:** The router service that automatically assigns network addresses.

**DHCP reservation:** A router setting that keeps the same address assigned to a particular device.

**Docker:** The engine that downloads images and runs application containers.

**Image:** A packaged, read-only application used to create a Docker container.

**LXC:** The Linux container technology Proxmox uses for lightweight system containers.

**Nesting:** The Proxmox LXC feature that permits container technology such as Docker to run inside an LXC.

**Proxmox VE:** The server operating system and web interface that manages virtual machines, LXC containers, storage, snapshots, and networking.

**Snapshot:** A saved point in a container's filesystem and configuration that you can roll back to. Later changes are discarded during rollback.

**SSH:** An encrypted connection used by VS Code and its terminal to work on another computer.

**Stack:** One or more services managed together from a Compose file.

**Template:** A prepared Linux filesystem Proxmox uses to create an LXC.

**VM:** A virtual machine that behaves like a separate computer with its own operating system and virtual hardware.

**Volume:** Persistent data stored outside a Docker container's disposable filesystem.

## Ports used in this guide

| Service | Port | Address form |
| --- | ---: | --- |
| Proxmox | 8006 | `https://PROXMOX-IP:8006` |
| Dockhand | 3000 | `http://CONTAINER-IP:3000` |
| Heimdall | 8080 | `http://CONTAINER-IP:8080` |
| Beszel | 8090 | `http://CONTAINER-IP:8090` |
| Dozzle | 8888 | `http://CONTAINER-IP:8888` |

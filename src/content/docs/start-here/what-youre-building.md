---
title: What You're Building
description: See the simple homelab path and check that your old PC is ready.
sidebar:
  order: 1
---

You are turning one old PC into a home server.

Proxmox manages the server and gives you snapshots and clones. A Debian Linux container (LXC) holds Docker. Dockhand manages the Docker apps, Heimdall links to them, Beszel shows system health, and Dozzle shows container logs.

This guide makes every choice for you so you can build something real today. When you outgrow these choices—and you will—that is the guide working as intended.

Proxmox recommends running application containers such as Docker inside a virtual machine. This guide deliberately uses an unprivileged LXC with nesting enabled because snapshots and clones make experimentation less scary, and its tiny overhead suits modest hardware.

## What you need

- An old desktop or laptop with a 64-bit processor, virtualization support, and a wired network connection
- 16 GB of RAM for a comfortable start; do not use a machine with less than 8 GB
- A 64 GB drive or larger that can be erased
- A USB stick that can be erased
- Your everyday Windows, macOS, or Linux computer
- A weekend of curiosity

The best hardware is what you already have.

Ready? [Install Proxmox VE](/guide/install-proxmox/).

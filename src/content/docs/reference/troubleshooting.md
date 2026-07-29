---
title: Troubleshooting
description: Fix the problems most likely to appear while following this guide.
sidebar:
  order: 1
---

Start with the symptom you can see. Change one thing, test again, and keep notes.

## The USB stick will not boot

- Reflash the Proxmox ISO with balenaEtcher and let validation finish.
- Use the PC's one-time boot menu, usually `F12`, `F2`, or `Del`, and select the USB stick.
- In BIOS settings, enable USB boot and Intel VT-x or AMD-V virtualization.

## Proxmox does not open on port 8006

- Use `https`, not `http`: `https://PROXMOX-IP:8006`.
- Confirm the IP shown on the physical server's console.
- Make sure the server and your everyday computer are on the same home network.
- Try `ping PROXMOX-IP` in the VS Code terminal. If it fails, check the Ethernet cable and the gateway entered during installation.

The browser certificate warning is expected for a new Proxmox server. Accept it only when the address is your server's address.

## SSH says connection refused

- Confirm the target IP. The Proxmox host and Debian container have different addresses.
- Confirm the target is running in Proxmox.
- Open the container's **Console** in Proxmox and run `ip address` to check its current address.
- Retry `ssh root@CORRECT-IP`.

If SSH rejects the key, use the Proxmox console to compare `/root/.ssh/authorized_keys` with the output of `ssh-keygen -y -f ~/.ssh/id_ed25519` on your everyday computer.

## Docker will not start in the LXC

Select the Debian container in Proxmox, open **Options → Features**, and confirm **Nesting** is enabled. Restart the container after changing it, then run:

```bash
systemctl status docker --no-pager
docker run --rm hello-world
```

## A Docker port is already allocated

The ports in this guide do not overlap, so an earlier attempt is still using
the port. Find the container:

```bash
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

Open that container in Dockhand and remove its old stack. Redeploy the stack
from the current guide page without changing its port.

## I broke it

Stop changing things. In Proxmox, select the Debian container, open **Snapshots**, select the last known-good snapshot, and choose **Rollback**. Changes made after that snapshot will be discarded.

If there is no snapshot, inspect the affected stack's logs in Dockhand or Dozzle before deleting anything.

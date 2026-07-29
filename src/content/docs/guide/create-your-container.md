---
title: Create Your Container
description: Create an unprivileged Debian 13 LXC with nesting and SSH access.
sidebar:
  order: 4
---

This task creates the small Debian server that will hold every Docker app in the guide.

## Download Debian

1. In Proxmox, select **local (pve)**, then **CT Templates**.
2. Choose **Templates**, select the latest `debian-13-standard` template, and choose **Download**.

## Create the container

In the VS Code terminal on your everyday computer, print your public key:

```bash
ssh-keygen -y -f ~/.ssh/id_ed25519
```

Copy the single output line. In Proxmox, choose **Create CT** and complete the wizard:

1. **General:** use hostname `docker`, set a root password, paste the line into **SSH public key**, and leave **Unprivileged container** checked.
2. **Template:** select the Debian 13 template.
3. **Disks:** set **Disk size** to `16` GiB.
4. **CPU:** set **Cores** to `2`.
5. **Memory:** set **Memory** to `2048` MiB and **Swap** to `512` MiB.
6. **Network:** keep bridge `vmbr0`, choose **DHCP** for IPv4, and leave IPv6 on DHCP.
7. **DNS:** keep **Use host settings**.
8. Confirm the settings and create the container.

Select the new container, open **Options → Features**, choose **Edit**, enable **Nesting**, and save. Docker will not start without nesting.

Start the container. Its **Summary** page shows the DHCP address. Return to
your router's admin page and create a DHCP reservation for the container named
`docker`. This keeps its address from changing.

## Connect to Debian

In VS Code's **Remote Explorer**, add `ssh root@CONTAINER-IP`, choose the
suggested SSH configuration file, and connect. Accept the fingerprint, then
run:

```bash
cat /etc/debian_version
```

You now have a Debian 13 LXC with key-based root SSH.

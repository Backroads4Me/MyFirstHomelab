---
title: Set Up VS Code
description: Install VS Code, create an SSH key, and connect to Proxmox.
sidebar:
  order: 3
---

Visual Studio Code is the standard starting point for working with servers and code. In this guide it gives you one place for file editing, a terminal, and SSH connections.

## Install VS Code and Remote - SSH

Download [Visual Studio Code](https://code.visualstudio.com/download), run the installer for Windows, macOS, or Linux, and open it.

Open **Extensions**, search for **Remote - SSH** by Microsoft, and select **Install**. This is the only extension you need.

## Create your key

Open **Terminal → New Terminal** inside VS Code and run:

```bash
ssh-keygen -t ed25519
```

Press Enter to accept the default file and enter a passphrase you can remember.
If the default file already exists, answer `n` when asked whether to overwrite
it. Your existing key will work.

Copy the key to Proxmox with these two commands, replacing `PROXMOX-IP` with
the address you reserved:

```bash
scp ~/.ssh/id_ed25519.pub root@PROXMOX-IP:/tmp/homelab-key.pub
ssh root@PROXMOX-IP "umask 077; mkdir -p /root/.ssh; cat /tmp/homelab-key.pub >> /root/.ssh/authorized_keys; rm /tmp/homelab-key.pub"
```

Accept the host fingerprint when prompted and enter the Proxmox root password. These commands work with the OpenSSH client included with current Windows, macOS, and Linux systems.

## Connect from VS Code

1. Open **Remote Explorer** in the Activity Bar.
2. Under **SSH**, choose **New Remote** (`+`).
3. Enter `ssh root@PROXMOX-IP` with your server's reserved address.
4. Choose the SSH configuration file suggested by VS Code.
5. Select the new host and choose **Connect in New Window**.
6. Accept the host fingerprint and unlock your key if prompted.

The lower-left corner now shows the remote host. Open **Terminal → New Terminal** and run `hostname`; it should print `pve`.

Your workstation is ready.

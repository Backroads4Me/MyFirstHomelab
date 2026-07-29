---
title: Install Proxmox
description: Install Proxmox VE 9 and update it from the web interface.
sidebar:
  order: 2
---

This task turns the old PC into a Proxmox server you can manage from a browser. Installing Proxmox erases the selected drive.

## Make the installer

1. Download the current **Proxmox VE 9 ISO Installer** from [Proxmox Downloads](https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso).
2. Install [balenaEtcher](https://etcher.balena.io/) on your everyday computer.
3. Insert the USB stick and open Etcher.
4. Choose **Flash from file**, select the Proxmox ISO, choose the USB stick, then select **Flash**.
5. When validation finishes, eject the USB stick and put it in the server.

## Install Proxmox

Boot the server from the USB stick and choose **Install Proxmox VE (Graphical)**. Follow the installer:

1. Accept the license and select the drive to erase.
2. Set your country, time zone, and keyboard layout.
3. Set a strong root password and enter your email address.
4. On **Management Network Configuration**, select the wired network interface. The installer fills in the network values supplied by your router. Leave those values in place and enter:
   - **Hostname:** `pve.home.arpa`
5. Review the summary, install, remove the USB stick, and reboot.

:::tip[USB does not boot]
Open the PC's BIOS or boot menu with `F2`, `F12`, or `Del`, enable USB boot, then try again.
:::

## Log in and update

The physical server's console shows its management address after it starts.
Open your router's admin page and create a DHCP reservation for the Proxmox
server at that address. This keeps the router from assigning the address to
another device.

On your everyday computer, open `https://PROXMOX-IP:8006`, replacing
`PROXMOX-IP` with the reserved address. Accept the browser's warning for the
server's self-signed certificate, then sign in as `root` with realm **Linux PAM
standard authentication**.

Set up the no-subscription repository:

1. Select the Proxmox node, then **Updates → Repositories**.
2. Select the enterprise repository and choose **Disable**.
3. Choose **Add**, select **No-Subscription**, and confirm.
4. Open **Updates**, choose **Refresh**, then **Upgrade**.
5. Follow the prompts in the upgrade window and reboot if requested.

You now have an updated Proxmox server.

---
title: Server Setup
description: Setting up your server operating system and preparing for virtualization
published: 1
date: 2024-12-06T10:55:00.000Z
tags: server, setup, operating-system
editor: markdown
dateCreated: 2024-12-06T10:55:00.000Z
---

# Setting Up Your Server: From Hardware to Hypervisor

Great job selecting your hardware! Now it's time to transform that computer into a proper server. Don't worry—this step is more straightforward than it might seem, and we'll walk through everything together.

---

## What We're Accomplishing

Before diving into the technical details, let's understand what we're doing:
- **Installing a server operating system** on your chosen hardware
- **Configuring basic network settings** so you can access your server remotely
- **Preparing the system** for virtualization (running multiple "computers" on one machine)
- **Setting up remote access** so you don't need a monitor connected all the time

---

## Two Paths Forward

You have two excellent options for your server setup:

### Option 1: Direct Hypervisor Installation (Recommended for Beginners)
Install Proxmox VE directly on your hardware. This is simpler and gets you to the fun stuff faster.
- **Pros**: Easier setup, fewer steps, purpose-built for homelabs
- **Cons**: Less flexibility if you want to change hypervisors later

### Option 2: Base OS + Hypervisor
Install a base operating system (like Ubuntu Server) first, then add virtualization on top.
- **Pros**: More flexibility, easier troubleshooting, familiar Linux environment
- **Cons**: More complex setup, additional maintenance

**For your first homelab, we recommend Option 1 (Direct Proxmox installation).** You can always rebuild later as you learn more!

---

## Pre-Installation Checklist

Before we begin, gather this information:

### Network Information
- **Router's IP address** (usually 192.168.1.1 or 192.168.0.1)
- **Available IP range** (check your router's DHCP settings)
- **Your desired server IP** (pick something like 192.168.1.100)

### Hardware Preparation
- [ ] Keyboard and monitor connected to your server
- [ ] Ethernet cable connected
- [ ] USB drive with installation media ready
- [ ] Another computer available for remote access

---

## Understanding Your Network

Your homelab server needs to communicate with other devices on your network. Here's a simple breakdown:

```
Internet → Router → Your Devices
                 ├── Your Computer (192.168.1.50)
                 ├── Your Phone (192.168.1.51)
                 └── Your Server (192.168.1.100) ← We're setting this up
```

**Static vs. Dynamic IP:**
- **Dynamic (DHCP)**: Router assigns IP automatically (can change)
- **Static**: You assign a fixed IP (stays the same)

**For servers, we want static IPs** so you can always find your server at the same address.

---

## Basic Network Configuration

### Finding Your Network Information

On your main computer, open a terminal/command prompt:

**Windows:**
```cmd
ipconfig
```

**Mac/Linux:**
```bash
ip route show default
```

Look for:
- **Gateway**: Your router's IP (usually 192.168.1.1)
- **Your IP**: Something like 192.168.1.50
- **Subnet**: Usually 255.255.255.0 (or /24)

### Choosing Your Server IP

Pick an IP address in the same range but outside your router's DHCP range:
- If your router uses 192.168.1.100-192.168.1.200 for DHCP
- Choose something like 192.168.1.50 for your server

---

## Installation Media Preparation

### Using Ventoy (Recommended)

Ventoy lets you put multiple ISO files on one USB drive—super handy for homelabs!

1. **Download Ventoy:**
   - Visit [Ventoy GitHub](https://github.com/ventoy/Ventoy/releases)
   - Download the Windows/Mac/Linux version

2. **Install Ventoy on USB:**
   - Run Ventoy installer
   - Select your USB drive
   - Click "Install" (this will erase the USB drive)

3. **Add ISO files:**
   - Copy any ISO files directly to the USB drive
   - Ventoy will automatically detect them

### Alternative: Traditional Method

If you prefer the traditional approach:
- Use Rufus (Windows) or Balena Etcher (Mac/Linux)
- Flash one ISO at a time to your USB drive

---

## BIOS/UEFI Configuration

Before installing anything, we need to configure your computer's firmware:

### Accessing BIOS/UEFI
- Restart your computer
- Press the BIOS key during startup (usually F2, F12, Delete, or Esc)
- Look for the key mentioned on the startup screen

### Essential Settings

**Enable Virtualization:**
- Look for "Intel VT-x" or "AMD-V"
- Enable "Virtualization Technology"
- Enable "VT-d" or "IOMMU" if available

**Boot Settings:**
- Set USB as first boot device
- Disable "Secure Boot" if present
- Enable "UEFI Boot" (disable Legacy/CSM if possible)

**Power Management:**
- Set "Power On After Power Loss" to "On" or "Previous State"
- Disable "Deep Sleep" modes that might interfere with server operation

---

## What's Next?

With your hardware prepared and network information gathered, you're ready to install your hypervisor! The next section will walk you through the Proxmox installation process step-by-step.

Remember: **Take your time, and don't hesitate to restart if something doesn't look right.** Every experienced homelab enthusiast has reinstalled their system multiple times while learning!

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Hardware" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Hardware
    </a>
    <a href="/en/Hypervisor" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Hypervisor →
    </a>
</div>
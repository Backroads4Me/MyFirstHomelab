---
title: Hypervisor Installation
description: Installing and configuring Proxmox VE for your first homelab
published: 1
date: 2024-11-27T03:01:33.653Z
tags: hypervisor
editor: markdown
dateCreated: 2024-12-06T10:55:00.000Z
---

# Installing Your Hypervisor: Proxmox VE

Welcome to the exciting part—installing Proxmox VE! This is where your hardware becomes a powerful virtualization platform capable of running multiple "virtual computers" simultaneously.

**What is Proxmox VE?**
Proxmox Virtual Environment (VE) is a complete server virtualization management solution. Think of it as the "operating system" that lets you create and manage virtual machines and containers on your server.

---

## The Case for Proxmox

Native Virtualization and Container Support: Proxmox VE (Virtual Environment) is built with virtualization and containerization in mind. It supports both KVM for virtual machines and LXC for containers, offering a flexible, integrated environment for all your services.

Web-Based Management Interface: Proxmox comes with a comprehensive, yet intuitive, web GUI. This allows for easy management of virtual machines, containers, storage, and even cluster configurations without the need for an SSH window for every task.

Backup and Restore Features: Proxmox has robust backup mechanisms, allowing for quick snapshots and restores of your VMs and containers. This functionality is vital for experimentation and recovery scenarios in a Homelab setting.

Resource Monitoring and Reporting: Proxmox provides real-time reporting and monitoring of resources, making it easier to optimize the usage of your hardware based on specific needs.

Security Measures: From built-in firewalls to various authentication methods, Proxmox offers a variety of security options, crucial for an environment that might eventually face exposure to the internet.

Proxmox offers a slew of features tailored for a Homelab setup. Its focus on containerization, virtualization, and ease of management makes it a more fitting choice for those specifically interested in a robust, scalable Homelab server environment. Therefore, despite my comfort level with Ubuntu, the feature set of Proxmox tipped the scales.

For beginners venturing into virtualization, Proxmox VE (Virtual Environment) stands out as an excellent choice. It's a powerful, open-source platform designed for creating and managing virtual machines and containers. Here's why Proxmox VE is beginner-friendly:

Proxmox VE boasts an intuitive web interface that simplifies virtual machine creation, configuration, and monitoring, eliminating the need for complex command-line operations.

Comprehensive Documentation

Extensive and well-structured documentation, along with a vibrant community forum, provide abundant resources for learning and troubleshooting.

Easy Installation

Proxmox VE can be installed directly on your hardware or as a virtual machine itself, offering a straightforward setup process.

---

## What You'll Need

Before we start, make sure you have:
- [ ] Your server hardware prepared (from the previous section)
- [ ] USB drive with Rufus and Proxmox ISO
- [ ] Network information (IP address, gateway, DNS)
- [ ] Another computer for remote access
- [ ] About 30-60 minutes of time

---

## Understanding System Requirements

### Minimum Requirements (Will Work)
- **CPU**: 64-bit dual-core processor with virtualization support
- **RAM**: 8GB (4GB for Proxmox + 4GB for your first VMs)
- **Storage**: 120GB SSD minimum
- **Network**: Gigabit Ethernet connection

### Recommended Setup (Better Experience)
- **CPU**: Quad-core or better (more VMs, better performance)
- **RAM**: 32GB (comfortable for multiple VMs)
- **Storage**: 500GB SSD + additional drives for data
- **Network**: Multiple Gigabit Ethernet ports for advanced networking

## Step-by-Step Installation

### Step 1: Download Proxmox VE

1. **Visit the official website**: [https://www.proxmox.com/en/downloads](https://www.proxmox.com/en/downloads)
2. **Download the latest ISO**: Look for "Proxmox VE" (not Backup Server or Mail Gateway)
3. **Verify the download** (optional but recommended):
   - The website provides checksums to verify your download wasn't corrupted

### Step 2: Prepare Your Installation Media

If you followed the Server Setup guide, you should already have Rufus ready:

1. **Launch Rufus** on your computer
2. **Select your USB drive** from the Device dropdown
3. **Click "SELECT"** and choose the Proxmox ISO file you downloaded
4. **Leave all other settings as default** (Rufus will auto-configure for the ISO)
5. **Click "START"** to create the bootable USB drive
6. **Wait for the process to complete** (usually 5-10 minutes)
7. **Safely eject** the USB drive
8. **Insert it into your server**

### Step 3: Boot and Start Installation

1. **Power on your server** with the USB drive inserted
2. **Select the USB drive** from the boot menu (usually F12 or F11)
3. **The Proxmox installer will start automatically**
4. **Select "Install Proxmox VE"** (the first option)

### Step 4: Basic Installation Configuration

The installer will guide you through several screens:

#### Welcome Screen
- Click "Next" to continue

#### License Agreement
- Read and accept the license terms
- Click "I agree"

#### Target Harddisk
- **Select your main drive** (usually the SSD you want to install on)
- **Filesystem**: Leave as "ext4" (default is fine for beginners)
- **Click "Next"**

> **Important**: This will erase everything on the selected drive!

#### Location and Time Zone
- **Country**: Select your country
- **Time zone**: Should auto-populate correctly
- **Keyboard Layout**: Choose your keyboard layout
- **Click "Next"**

#### Administrator Password and Email
- **Password**: Choose a strong password (you'll need this to log in!)
- **Confirm Password**: Type it again
- **Email**: Enter your email address (for system notifications)
- **Click "Next"**

#### Management Network Configuration
This is the most important screen for beginners:

**Hostname**:
- Change from "proxmox" to something like "homelab" or "pve"
- Format: `homelab.local` or `pve.yourdomain.com`

**IP Address**:
- Use the static IP you planned (e.g., `192.168.1.100`)
- **Don't use DHCP** for servers!

**Netmask**:
- Usually `255.255.255.0` (or `/24`)

**Gateway**:
- Your router's IP address (usually `192.168.1.1`)

**DNS Server**:
- Use your router's IP (`192.168.1.1`) or public DNS (`8.8.8.8`)

#### Summary
- **Review all settings** carefully
- **Click "Install"** when everything looks correct

### Step 5: Installation Process

- The installation takes about 10-15 minutes
- You'll see a progress bar and log messages
- **Don't interrupt the process!**
- When complete, you'll see a "Installation successful" message
- **Remove the USB drive** and click "Reboot"

## First Boot and Initial Setup

### Step 6: Accessing the Web Interface

After your server reboots:

1. **Wait for the boot process** (about 1-2 minutes)
2. **Look for the login screen** on your server's monitor
3. **Note the IP address** displayed (should match what you configured)

**Example boot screen message:**
```
Welcome to the Proxmox Virtual Environment. Please use your web browser to
configure this server - connect to:

  https://192.168.1.100:8006/

```

### Step 7: First Web Login

1. **Open a web browser** on your main computer
2. **Navigate to**: `https://YOUR-SERVER-IP:8006`
   - Example: `https://192.168.1.100:8006`
3. **Accept the security warning** (it's normal for self-signed certificates)
4. **Log in with**:
   - **Username**: `root`
   - **Password**: The password you set during installation
   - **Realm**: `Linux PAM standard authentication`

### Step 8: Initial Configuration

#### Remove Enterprise Repository Warning

You'll see a warning about enterprise repositories. Here's how to fix it:

1. **Click on your server name** in the left panel
2. **Go to "Shell"** (opens a command line)
3. **Run these commands**:

```bash
# Remove enterprise repository
echo "# deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise" > /etc/apt/sources.list.d/pve-enterprise.list

# Add community repository
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list

# Update package lists
apt update
```

#### Update Your System

Still in the shell, run:

```bash
# Upgrade all packages
apt full-upgrade -y

# Reboot to ensure everything is working
reboot
```

**Wait for the reboot** (about 2-3 minutes), then log back into the web interface.

### Step 9: Basic Security Setup (Optional but Recommended)

For beginners, the default security is adequate for a home network. However, if you want to improve security:

#### Change Default SSH Port (Optional)
```bash
# Edit SSH configuration
nano /etc/ssh/sshd_config

# Find the line "#Port 22" and change it to:
Port 2222

# Restart SSH service
systemctl restart sshd
```

#### Create a Non-Root User (Optional)
```bash
# Create a new user
adduser homelab-admin

# Add to sudo group
usermod -aG sudo homelab-admin
```

> **For beginners**: You can skip the advanced security setup initially and focus on learning the basics. You can always enhance security later!

## Understanding the Proxmox Interface

### Main Dashboard Overview

Once logged in, you'll see the Proxmox web interface with several key areas:

**Left Panel (Server View)**:
- **Datacenter**: Overall cluster management
- **Your Server Name**: Individual server management
- **Local Storage**: Storage management

**Center Panel**:
- **Summary**: System overview and statistics
- **Shell**: Command line access
- **Updates**: System updates
- **Firewall**: Network security settings

**Right Panel**:
- **Tasks**: Running and completed operations
- **Logs**: System messages and errors

### Key Concepts for Beginners

**Virtual Machines (VMs)**:
- Complete computer systems running inside your server
- Each VM has its own operating system
- More resource-intensive but fully isolated

**Containers (LXC)**:
- Lightweight virtualization
- Share the host's kernel but isolated file systems
- More efficient for running services

**Storage**:
- **local**: System storage (where Proxmox is installed)
- **local-lvm**: Virtual machine storage
- You can add more storage later

---

## What's Next?

Congratulations! You now have a working Proxmox hypervisor. This is a major milestone in your homelab journey!

### Your Next Steps:

1. **Explore the Interface**: Click around and familiarize yourself with the layout
2. **Create Your First VM**: Start with a simple Linux virtual machine
3. **Set Up Basic Services**: Install essential applications for your homelab
4. **Learn Backup Strategies**: Protect your work with proper backups

### Before You Continue:

- **Take a snapshot** of your current setup (we'll cover this in the next section)
- **Document your network settings** (IP addresses, passwords, etc.)
- **Bookmark the web interface** for easy access

---

## Troubleshooting Common Issues

### Can't Access Web Interface
- **Check IP address**: Verify you're using the correct IP
- **Check network connection**: Ensure your computer and server are on the same network
- **Try different browser**: Some browsers have issues with self-signed certificates

### Forgot Root Password
- **Boot from USB**: Use the Proxmox installer in rescue mode
- **Reset password**: Follow the rescue mode instructions

### Enterprise Repository Warnings
- **Follow Step 8 above**: Remove enterprise repositories and add community ones
- **This is normal**: Proxmox shows these warnings for non-paying users

### System Updates Fail
- **Check internet connection**: Ensure your server can reach the internet
- **Verify DNS settings**: Make sure DNS is configured correctly
- **Try manual update**: Use the shell to run `apt update && apt upgrade`

---

## Security Considerations for Beginners

While we've kept security simple for this initial setup, here are important considerations:

### Network Security
- **Keep your homelab on your home network** (don't expose it to the internet initially)
- **Use strong passwords** for all accounts
- **Regular updates** keep your system secure

### Access Control
- **Limit physical access** to your server
- **Use the web interface** instead of direct console access when possible
- **Consider VPN access** if you need remote connectivity

### Backup Strategy
- **Regular backups** are your best security against data loss
- **Test your backups** to ensure they work
- **Keep backups offline** or on separate systems

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Server" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Server Setup
    </a>
    <a href="/en/VS-Code-SSH" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        VS Code Setup →
    </a>
</div>

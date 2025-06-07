---
title: Creating Your First Virtual Machine
description: Step-by-step guide to creating and configuring your first VM in Proxmox
published: 1
date: 2024-12-06T10:57:00.000Z
tags: virtual-machine, vm, proxmox, beginner
editor: markdown
dateCreated: 2024-12-06T10:57:00.000Z
---

# Creating Your First Virtual Machine

Congratulations on getting Proxmox installed! Now comes the exciting part—creating your first virtual machine (VM). Think of this as building a computer inside your computer.

**What is a Virtual Machine?**
A VM is a complete computer system that runs inside your physical server. It has its own CPU allocation, memory, storage, and network connection, but it's all virtualized by Proxmox.

---

## Why Start with a VM?

For beginners, VMs are perfect because:
- **Familiar environment**: VMs work just like physical computers
- **Complete isolation**: If something breaks, it won't affect your host system
- **Easy to rebuild**: Made a mistake? Delete it and start over!
- **Learning platform**: Perfect for experimenting with new operating systems

---

## Choosing Your First Operating System

For your first VM, we recommend **Ubuntu Server 22.04 LTS** because:
- **Beginner-friendly**: Well-documented with lots of community support
- **Lightweight**: Runs well with minimal resources
- **Long-term support**: Stable and supported until 2027
- **Great for learning**: Most homelab tutorials use Ubuntu

**Alternative options:**
- **Ubuntu Desktop**: If you want a graphical interface
- **Debian**: More minimal, similar to Ubuntu
- **CentOS Stream**: If you want to learn Red Hat-style Linux

---

## Pre-Installation Checklist

Before creating your VM, gather:
- [ ] **ISO file**: Ubuntu Server 22.04 LTS downloaded
- [ ] **Resource planning**: Decide on CPU, RAM, and storage allocation
- [ ] **Network information**: Know your network setup
- [ ] **Time**: About 30-45 minutes for creation and basic setup

---

## Step 1: Download Ubuntu Server

1. **Visit Ubuntu's website**: [https://ubuntu.com/download/server](https://ubuntu.com/download/server)
2. **Download Ubuntu Server 22.04 LTS**: Choose the LTS (Long Term Support) version
3. **Upload to Proxmox**:
   - In Proxmox web interface, click on your server name
   - Go to "local (your-server)" storage
   - Click "ISO Images"
   - Click "Upload" and select your downloaded Ubuntu ISO

---

## Step 2: Create the Virtual Machine

### Starting the VM Creation

1. **Click "Create VM"** (blue button in top-right corner)
2. **VM ID**: Leave as default (usually 100) or choose your own number
3. **Name**: Give it a descriptive name like "ubuntu-server-01"
4. **Click "Next"**

### OS Configuration

1. **ISO Image**: Select the Ubuntu Server ISO you uploaded
2. **Guest OS**: 
   - **Type**: Linux
   - **Version**: 6.x - 2.6 Kernel (or leave as default)
3. **Click "Next"**

### System Configuration

1. **Graphic card**: Default (VGA) is fine for servers
2. **Machine**: Default (q35) is recommended
3. **BIOS**: OVMF (UEFI) for modern systems, or SeaBIOS for compatibility
4. **SCSI Controller**: VirtIO SCSI (best performance)
5. **Click "Next"**

### Hard Disk Configuration

1. **Bus/Device**: VirtIO Block (best performance)
2. **Storage**: local-lvm (default)
3. **Disk size**: 
   - **Minimum**: 20GB
   - **Recommended**: 32GB for learning
   - **Advanced users**: 50GB+ if you plan to install lots of software
4. **Click "Next"**

### CPU Configuration

1. **Sockets**: 1 (unless you have specific needs)
2. **Cores**: 
   - **Minimum**: 1 core
   - **Recommended**: 2 cores for better performance
3. **Type**: Default (kvm64) or host if you want best performance
4. **Click "Next"**

### Memory Configuration

1. **Memory (MiB)**: 
   - **Minimum**: 1024 (1GB) for basic server
   - **Recommended**: 2048 (2GB) for comfortable use
   - **Advanced**: 4096 (4GB) if you have plenty of RAM
2. **Click "Next"**

### Network Configuration

1. **Bridge**: vmbr0 (default bridge)
2. **Model**: VirtIO (paravirtualized) for best performance
3. **MAC address**: Leave auto-generated
4. **Click "Next"**

### Confirm and Create

1. **Review all settings** carefully
2. **Check "Start after created"** if you want to boot immediately
3. **Click "Finish"**

---

## Step 3: Installing Ubuntu Server

### Starting the Installation

1. **Select your VM** from the left panel
2. **Click "Console"** to see the VM's screen
3. **Choose "Try or Install Ubuntu Server"** (first option)

### Installation Process

#### Language and Keyboard
1. **Language**: Choose your language (English is recommended for tutorials)
2. **Keyboard**: Select your keyboard layout

#### Network Configuration
1. **Network**: Should auto-configure via DHCP
2. **If you want static IP**: 
   - Select your network interface
   - Choose "Edit IPv4"
   - Set manual configuration with your planned IP address

#### Storage Configuration
1. **Storage**: Choose "Use an entire disk"
2. **Select the virtual disk** Proxmox created
3. **Confirm the layout** (default is usually fine)

#### Profile Setup
1. **Your name**: Enter your full name
2. **Server name**: Choose a hostname (e.g., "ubuntu-vm-01")
3. **Username**: Create a username (avoid "admin" or "root")
4. **Password**: Choose a strong password

#### SSH Setup
1. **Install OpenSSH server**: ✅ **Check this box**
2. **Import SSH identity**: Skip for now (you can set this up later)

#### Featured Server Snaps
1. **Skip for now**: Don't install any additional software yet
2. **You can install these later** once you're more comfortable

### Completing Installation

1. **Wait for installation** (usually 10-15 minutes)
2. **Reboot when prompted**
3. **Remove installation media**: Proxmox handles this automatically

---

## Step 4: First Login and Basic Setup

### Logging In

1. **Wait for boot process** (watch the console)
2. **Login prompt**: Enter your username and password
3. **You're in!** You should see a command prompt

### Basic System Updates

Run these commands to update your system:

```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install useful tools
sudo apt install -y curl wget vim htop tree
```

### Check System Information

```bash
# See system information
hostnamectl

# Check memory usage
free -h

# Check disk usage
df -h

# Check network configuration
ip addr show
```

---

## Step 5: Basic VM Management

### Using the Proxmox Interface

**Start VM**: Click "Start" button
**Stop VM**: Click "Stop" button (graceful shutdown)
**Shutdown**: Click "Shutdown" (sends shutdown signal to OS)
**Reset**: Click "Reset" (hard restart - use sparingly)

### Console Access

**Console**: Built-in VNC console (what you've been using)
**SSH**: More convenient for command-line work
**SPICE**: Enhanced console with better performance

### VM Settings

You can modify your VM settings when it's stopped:
- **Hardware**: Add/remove virtual hardware
- **Options**: Change boot order, startup behavior
- **Backup**: Configure automatic backups
- **Snapshots**: Create point-in-time backups

---

## Step 6: Setting Up SSH Access

SSH makes it much easier to manage your VM from your main computer:

### Find Your VM's IP Address

In your VM console:
```bash
ip addr show
```

Look for an IP address like `192.168.1.xxx`

### Connect from Your Main Computer

**Windows (using PowerShell or Command Prompt):**
```cmd
ssh username@192.168.1.xxx
```

**Mac/Linux:**
```bash
ssh username@192.168.1.xxx
```

**First connection**: You'll be asked to verify the host key - type "yes"

---

## What's Next?

Congratulations! You've successfully created and configured your first virtual machine. Here's what you can do next:

### Immediate Next Steps
1. **Explore the command line**: Get comfortable with basic Linux commands
2. **Install software**: Try installing applications with `apt install`
3. **Create snapshots**: Learn to backup your VM state
4. **Set up file sharing**: Access files between your VM and main computer

### Learning Opportunities
- **Web server**: Install Apache or Nginx
- **Database**: Set up MySQL or PostgreSQL
- **Docker**: Learn containerization
- **Monitoring**: Install system monitoring tools

### Best Practices
- **Regular updates**: Keep your system updated
- **Snapshots before changes**: Always backup before major changes
- **Document your setup**: Keep notes on what you've configured

---

## Troubleshooting Common Issues

### VM Won't Start
- **Check resources**: Ensure enough RAM/CPU available
- **Storage space**: Verify sufficient disk space
- **ISO mounting**: Make sure ISO is properly uploaded

### Can't Connect via SSH
- **Check IP address**: Verify VM's IP with `ip addr show`
- **Firewall**: Ubuntu's firewall (ufw) might be blocking connections
- **SSH service**: Ensure SSH is running with `sudo systemctl status ssh`

### VM is Slow
- **Increase RAM**: 1GB might not be enough for some tasks
- **Add CPU cores**: More cores can improve performance
- **Check host resources**: Ensure your physical server isn't overloaded

### Console Issues
- **Try different browsers**: Some browsers handle the console better
- **Use SSH instead**: Often more reliable than web console
- **Check network**: Ensure stable connection to Proxmox

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Hypervisor" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Hypervisor
    </a>
    <a href="/en/Essential-Services" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Essential Services →
    </a>
</div>
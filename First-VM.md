---
title: Creating Your First LXC Container
description: Step-by-step guide to creating and configuring your first LXC container in Proxmox
published: 1
date: 2024-12-06T10:57:00.000Z
tags: lxc, container, proxmox, debian, beginner
editor: markdown
dateCreated: 2024-12-06T10:57:00.000Z
---

# Creating Your First LXC Container

Congratulations on getting Proxmox installed! Now comes the exciting part—creating your first LXC container. Think of this as building a lightweight, efficient virtual environment that shares your host's kernel.

**What is an LXC Container?**
An LXC (Linux Container) is a lightweight virtualization method that runs isolated Linux systems on a single host. Unlike virtual machines, containers share the host's kernel, making them much more efficient with resources while still providing strong isolation.

---

## Why Start with LXC Containers?

For homelab enthusiasts, LXC containers are ideal because:
- **Resource efficient**: Use significantly less RAM and CPU than VMs
- **Fast startup**: Boot in seconds, not minutes
- **Easy management**: Simple to create, clone, and destroy
- **Perfect for services**: Ideal for web servers, databases, and network services
- **Proxmox native**: Deeply integrated with Proxmox for optimal performance

---

## Understanding LXC vs Virtual Machines

**LXC Containers:**
- Share the host kernel
- Minimal resource overhead
- Fast boot times
- Perfect for Linux services
- Cannot run different operating systems

**Virtual Machines:**
- Complete operating system isolation
- Higher resource usage
- Slower boot times
- Can run any operating system
- Better for desktop environments

**When to choose LXC:**
- Running Linux services (web servers, databases)
- Development environments
- Network services (DNS, DHCP, VPN)
- Microservices architecture
- Resource-constrained environments

---

## Choosing Your First Container OS

For your first LXC container, we recommend **Debian 12** because:
- **Same base as Proxmox**: Proxmox is built on Debian, ensuring compatibility
- **Lightweight**: Minimal resource usage
- **Stable**: Rock-solid reliability for services
- **Package management**: Excellent APT package system
- **Long-term support**: Stable and well-maintained

**Alternative options:**
- **Ubuntu**: If you prefer Ubuntu's package versions
- **Alpine Linux**: Extremely lightweight for microservices
- **CentOS Stream**: For Red Hat-style environments

---

## Pre-Creation Checklist

Before creating your container, ensure:
- [ ] **Template downloaded**: Debian 12 container template available
- [ ] **Resource planning**: Decide on CPU, RAM, and storage allocation
- [ ] **Network information**: Know your network setup
- [ ] **Purpose defined**: Know what service this container will run
- [ ] **Time**: About 10-15 minutes for creation and basic setup

---

## Step 1: Download Container Template

### Accessing Container Templates

1. **Navigate to your Proxmox node** in the web interface
2. **Click on your server name** (e.g., "pve")
3. **Go to "local" storage**
4. **Click "CT Templates"**
5. **Click "Templates"** button

### Download Debian Template

1. **Find Debian section** in the template list
2. **Select "debian-12-standard"** (latest stable version)
3. **Click "Download"**
4. **Wait for download** (usually 1-2 minutes)

The template will be stored locally and ready for container creation.

---

## Step 2: Create the LXC Container

### Starting Container Creation

1. **Click "Create CT"** (blue button in top-right corner)
2. **Node**: Should show your Proxmox server
3. **CT ID**: Leave as default (usually 100) or choose your own number
4. **Hostname**: Give it a descriptive name like "debian-web-01"
5. **Resource Pool**: Leave empty for now
6. **Password**: Set a strong root password
7. **SSH public key**: Leave empty for now (we'll set up SSH later)
8. **Click "Next"**

### Template Selection

1. **Storage**: local (where you downloaded the template)
2. **Template**: Select "debian-12-standard" from dropdown
3. **Click "Next"**

### Root Disk Configuration

1. **Storage**: local-lvm (default)
2. **Disk size**: 
   - **Minimum**: 4GB for basic services
   - **Recommended**: 8GB for comfortable use
   - **Web services**: 12GB if hosting websites
   - **Database services**: 16GB+ for databases
3. **Click "Next"**

### CPU Configuration

1. **Cores**: 
   - **Minimum**: 1 core for basic services
   - **Recommended**: 2 cores for better performance
   - **Web/Database**: 2-4 cores depending on load
2. **CPU limit**: Leave empty (no limit)
3. **CPU units**: 1024 (default weight)
4. **Click "Next"**

### Memory Configuration

1. **Memory (MiB)**: 
   - **Basic services**: 512MB (0.5GB)
   - **Web server**: 1024MB (1GB)
   - **Database**: 2048MB (2GB)
   - **Multiple services**: 1536MB (1.5GB)
2. **Swap (MiB)**: 
   - **Recommended**: Same as memory or 512MB minimum
3. **Click "Next"**

### Network Configuration

1. **Bridge**: vmbr0 (default bridge)
2. **IPv4**: DHCP (automatic IP assignment)
   - **For static IP**: Choose "Static" and enter IP/Gateway/DNS
3. **IPv6**: DHCP (or disable if not needed)
4. **Click "Next"**

### DNS Configuration

1. **DNS domain**: Leave empty or enter your local domain
2. **DNS servers**: Leave empty to use host settings
3. **Click "Next"**

### Confirm and Create

1. **Review all settings** carefully
2. **Check "Start after created"** to boot immediately
3. **Click "Finish"**

---

## Step 3: First Boot and Initial Setup

### Starting Your Container

1. **Select your container** from the left panel (CT 100)
2. **Click "Console"** to access the container
3. **Wait for boot** (should be very fast - under 10 seconds)
4. **Login as root** with the password you set

### Basic System Updates

Update your container with the latest packages:

```bash
# Update package lists
apt update

# Upgrade installed packages
apt upgrade -y

# Install essential tools
apt install -y curl wget vim htop tree sudo openssh-server
```

### Create a Regular User

It's good practice to create a non-root user:

```bash
# Create a new user (replace 'username' with your preferred name)
adduser username

# Add user to sudo group
usermod -aG sudo username

# Switch to the new user
su - username
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

# Check container-specific info
cat /proc/version
```

---

## Step 4: Container Management Basics

### Using the Proxmox Interface

**Start Container**: Click "Start" button
**Stop Container**: Click "Stop" button (graceful shutdown)
**Shutdown**: Click "Shutdown" (sends shutdown signal)
**Reboot**: Click "Reboot" (restart container)

### Console Access

**Console**: Built-in console access (what you've been using)
**SSH**: More convenient for remote management
**Shell**: Direct shell access from Proxmox

### Container Settings

You can modify container settings when it's stopped:
- **Resources**: Adjust CPU, memory, and disk
- **Network**: Modify network configuration
- **Options**: Change startup behavior and features
- **Backup**: Configure automatic backups
- **Snapshots**: Create point-in-time backups

### Container Features

LXC containers support various features:
- **Nesting**: Run containers inside containers
- **FUSE**: Filesystem in userspace support
- **Keyctl**: Kernel keyring support
- **Mount**: Additional mount points

---

## Step 5: Setting Up SSH Access

SSH makes container management much easier from your main computer:

### Enable SSH Service

```bash
# Ensure SSH is installed and running
sudo systemctl enable ssh
sudo systemctl start ssh
sudo systemctl status ssh
```

### Configure SSH (Optional Security)

```bash
# Edit SSH configuration
sudo vim /etc/ssh/sshd_config

# Recommended changes:
# PermitRootLogin no
# PasswordAuthentication yes (or no if using keys)
# Port 22 (or change to custom port)

# Restart SSH after changes
sudo systemctl restart ssh
```

### Find Your Container's IP Address

```bash
# Show IP address
ip addr show eth0

# Or use hostname command
hostname -I
```

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

## Step 6: Container Optimization

### Resource Monitoring

Monitor your container's resource usage:

```bash
# Check memory usage
free -h

# Check CPU usage
htop

# Check disk usage
df -h

# Check network usage
iftop  # Install with: apt install iftop
```

### Performance Tuning

**Memory optimization:**
```bash
# Check swap usage
swapon --show

# Adjust swappiness (lower = less swap usage)
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

**Disk optimization:**
```bash
# Check disk I/O
iostat  # Install with: apt install sysstat

# Clean package cache
sudo apt autoremove
sudo apt autoclean
```

---

## What's Next?

Congratulations! You've successfully created and configured your first LXC container. Here's what you can do next:

### Immediate Next Steps
1. **Install a service**: Set up a web server (Apache/Nginx)
2. **Create more containers**: Try different services in separate containers
3. **Learn container networking**: Connect containers together
4. **Set up backups**: Configure automatic container backups

### Popular Container Services
- **Web server**: Install Nginx or Apache
- **Database**: Set up MariaDB or PostgreSQL
- **File sharing**: Install Nextcloud or Samba
- **Monitoring**: Set up Prometheus or Grafana
- **DNS**: Configure Pi-hole or Unbound

### Container Best Practices
- **One service per container**: Keep containers focused
- **Regular updates**: Keep containers updated
- **Snapshots before changes**: Always backup before major changes
- **Resource monitoring**: Watch CPU and memory usage
- **Security updates**: Enable automatic security updates

### Advanced Topics
- **Container templates**: Create your own custom templates
- **Container clustering**: Link multiple containers
- **Load balancing**: Distribute traffic across containers
- **Container orchestration**: Use Docker Swarm or Kubernetes

---

## Troubleshooting Common Issues

### Container Won't Start
- **Check resources**: Ensure enough RAM available on host
- **Storage space**: Verify sufficient disk space
- **Template issues**: Re-download container template
- **Check logs**: View container logs in Proxmox

### Can't Connect via SSH
- **Check IP address**: Verify container's IP with `ip addr show`
- **SSH service**: Ensure SSH is running with `systemctl status ssh`
- **Firewall**: Check if firewall is blocking connections
- **Network bridge**: Verify network bridge configuration

### Container is Slow
- **Increase memory**: Add more RAM allocation
- **Add CPU cores**: Increase CPU allocation
- **Check host load**: Ensure physical server isn't overloaded
- **Disk I/O**: Check for disk bottlenecks

### Network Issues
- **Bridge configuration**: Verify vmbr0 is properly configured
- **IP conflicts**: Check for IP address conflicts
- **DNS resolution**: Test DNS with `nslookup google.com`
- **Gateway**: Verify default gateway is correct

### Package Management Issues
- **Update sources**: Run `apt update` to refresh package lists
- **Broken packages**: Use `apt --fix-broken install`
- **Disk space**: Ensure enough space with `df -h`
- **Repository issues**: Check `/etc/apt/sources.list`

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/VS-Code-SSH" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← VS Code Setup
    </a>
    <a href="/en/Essential-Services" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Essential Services →
    </a>
</div>
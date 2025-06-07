---
title: Essential Homelab Services
description: Setting up core services that every homelab needs
published: 1
date: 2024-12-06T10:58:00.000Z
tags: services, docker, containers, homelab-essentials
editor: markdown
dateCreated: 2024-12-06T10:58:00.000Z
---

# Essential Homelab Services

Now that you have a working VM, it's time to make your homelab actually useful! We'll set up essential services that form the foundation of any good homelab.

**What are Essential Services?**
These are the core applications that help you manage, monitor, and get the most out of your homelab. Think of them as the basic utilities that make everything else easier.

---

## Our Service Stack

We'll set up these essential services:

1. **Docker** - Container platform for easy application deployment
2. **Dockge** - Modern Docker Compose management interface
3. **Heimdall** - Dashboard to organize all your services
4. **Watchtower** - Automatic container updates

**Why these services?**
- **Easy to install and manage**
- **Beginner-friendly web interfaces**
- **Essential for homelab operations**
- **Foundation for future expansion**

---

## Understanding Docker

**What is Docker?**
Docker is a platform that packages applications into "containers" - lightweight, portable units that include everything needed to run an application.

**Why use Docker in homelabs?**
- **Easy installation**: Most homelab apps have Docker versions
- **Isolation**: Each app runs in its own container
- **Portability**: Easy to move between systems
- **Updates**: Simple to update or rollback applications
- **Resource efficiency**: Containers share the host OS kernel

**Containers vs VMs:**
- **VMs**: Full operating systems (what we created earlier)
- **Containers**: Just the application and its dependencies
- **Use both**: VMs for isolation, containers for services

---

## Step 1: Installing Docker

### Connect to Your VM

First, SSH into your Ubuntu VM:
```bash
ssh your-username@your-vm-ip
```

### Install Docker

Run these commands to install Docker:

```bash
# Update system packages
sudo apt update

# Install required packages
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt update

# Install Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group (avoid using sudo)
sudo usermod -aG docker $USER

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### Verify Installation

```bash
# Log out and back in for group changes to take effect
exit
# SSH back in
ssh your-username@your-vm-ip

# Test Docker installation
docker --version
docker compose version

# Test with hello-world container
docker run hello-world
```

If you see "Hello from Docker!" your installation is successful!

---

## Step 2: Setting Up Dockge

Dockge is a modern, self-hosted Docker Compose stack-oriented manager. It provides a clean web interface specifically designed for managing Docker Compose stacks, making it perfect for homelab environments where you manage multiple services.

### Why Dockge?

- **Stack-focused**: Designed specifically for Docker Compose management
- **Interactive editor**: Built-in compose file editor with syntax highlighting
- **Real-time logs**: View container logs directly in the web interface
- **Terminal access**: Execute commands directly in containers
- **Update management**: Easy stack updates and rollbacks
- **Lightweight**: Minimal resource usage compared to alternatives

### Install Dockge

First, create a directory structure for Dockge:

```bash
# Create Dockge directory
mkdir -p ~/dockge/stacks
cd ~/dockge

# Create docker-compose.yml for Dockge
nano docker-compose.yml
```

Add this configuration:

```yaml
version: '3.8'

services:
  dockge:
    image: louislam/dockge:1
    container_name: dockge
    restart: unless-stopped
    ports:
      - "5001:5001"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
      - ./stacks:/opt/stacks
    environment:
      - DOCKGE_STACKS_DIR=/opt/stacks
```

### Start Dockge

```bash
# Create data directory
mkdir -p data

# Start Dockge
docker compose up -d

# Verify it's running
docker compose ps
```

### Access Dockge

1. **Open your web browser**
2. **Navigate to**: `http://your-vm-ip:5001`
3. **Create admin account**:
   - Username: Choose your preferred username
   - Password: Choose a strong password
4. **Complete setup**: Follow the initial setup wizard

### Using Dockge

**Creating a New Stack:**
1. Click "Compose" in the sidebar
2. Click "+" to create a new stack
3. Give your stack a name
4. Write or paste your docker-compose.yml content
5. Click "Deploy" to start the stack

**Managing Existing Stacks:**
- **View logs**: Click on any stack to see real-time logs
- **Edit compose**: Use the built-in editor to modify configurations
- **Start/Stop**: Control individual stacks or services
- **Terminal access**: Execute commands directly in containers

You now have a powerful Docker Compose management interface!

---

## Step 3: Creating a Docker Compose Stack

Docker Compose lets us define multiple services in a single file. We'll create a stack with our essential services.

### Create Project Directory

```bash
# Create directory for our homelab stack
mkdir ~/homelab-stack
cd ~/homelab-stack

# Create docker-compose.yml file
nano docker-compose.yml
```

### Docker Compose Configuration

Copy this configuration into the file:

```yaml
version: '3.8'

services:
  # Heimdall - Application Dashboard
  heimdall:
    image: lscr.io/linuxserver/heimdall:latest
    container_name: heimdall
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York  # Change to your timezone
    volumes:
      - ./heimdall:/config
    ports:
      - "8080:80"
      - "8443:443"
    restart: unless-stopped

  # Watchtower - Automatic Updates
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_SCHEDULE=0 0 4 * * *  # 4 AM daily
    restart: unless-stopped

networks:
  default:
    name: homelab-network
```

### Start the Services

```bash
# Create necessary directories
mkdir -p heimdall data

# Start all services
docker compose up -d

# Check status
docker compose ps
```

---

## Step 4: Configuring Your Services

### Heimdall Dashboard (Port 8080)

1. **Access**: `http://your-vm-ip:8080`
2. **First setup**: Click through the welcome screens
3. **Add applications**: Click the "+" to add your services:
   - **Dockge**: `http://your-vm-ip:5001`
   - **Proxmox**: `https://your-proxmox-ip:8006`

### Managing Your Stack with Dockge

Now that your services are running, you can use Dockge to manage them:

1. **Access Dockge**: `http://your-vm-ip:5001`
2. **View your stack**: You should see your homelab-stack listed
3. **Monitor services**: Click on the stack to view real-time logs
4. **Make changes**: Use the built-in editor to modify your docker-compose.yml
5. **Deploy updates**: Click "Deploy" after making changes

**Pro Tips:**
- Use Dockge's terminal feature to execute commands directly in containers
- The logs view helps troubleshoot issues with individual services
- You can create additional stacks for different projects or environments

---

## Step 5: Understanding Your Setup

### What You've Accomplished

- **Docker platform**: Foundation for running containerized applications
- **Dockge**: Modern Docker Compose management interface
- **Heimdall**: Central dashboard for all your services
- **Watchtower**: Automatic updates for your containers

### Service URLs Summary

Create bookmarks for easy access:
- **Proxmox**: `https://your-proxmox-ip:8006`
- **Dockge**: `http://your-vm-ip:5001`
- **Heimdall**: `http://your-vm-ip:8080`

### Directory Structure

Your homelab is organized like this:
```
~/dockge/                 # Dockge installation
├── docker-compose.yml    # Dockge service definition
├── data/                 # Dockge configuration data
└── stacks/               # Your Docker Compose stacks
    └── homelab-stack/    # Your main services stack
        ├── docker-compose.yml
        ├── heimdall/
        └── data/
```

---

## Step 6: Basic Management Tasks

### Viewing Logs

```bash
# View logs for all services
docker compose logs

# View logs for specific service
docker compose logs heimdall

# Follow logs in real-time
docker compose logs -f heimdall
```

### Managing Services

```bash
# Stop all services
docker compose down

# Start all services
docker compose up -d

# Restart specific service
docker compose restart heimdall

# Update all services
docker compose pull
docker compose up -d
```

### Backup Your Configuration

```bash
# Create backup directory
mkdir ~/backups

# Backup your entire homelab setup
tar -czf ~/backups/dockge-$(date +%Y%m%d).tar.gz ~/dockge/
tar -czf ~/backups/homelab-stack-$(date +%Y%m%d).tar.gz ~/dockge/stacks/homelab-stack/

# List backups
ls -la ~/backups/
```

---

## What's Next?

You now have a solid foundation for your homelab! Here are your next steps:

### Immediate Tasks
1. **Customize Heimdall**: Add more applications and organize your dashboard
2. **Explore Dockge**: Learn to manage Docker Compose stacks through the web interface
3. **Add monitoring**: Consider adding Uptime Kuma or Grafana for service monitoring
4. **Create backups**: Set up regular backup routines

### Expansion Ideas
- **Media server**: Plex or Jellyfin for streaming
- **Cloud storage**: Nextcloud for file sync and sharing
- **Network monitoring**: Grafana and Prometheus
- **Home automation**: Home Assistant
- **VPN server**: WireGuard for secure remote access

### Learning Opportunities
- **Docker fundamentals**: Understand images, containers, and volumes
- **Networking**: Learn about Docker networks and port mapping
- **Security**: Implement reverse proxies and SSL certificates
- **Automation**: Create scripts for common tasks

---

## Troubleshooting Common Issues

### Container Won't Start
```bash
# Check container status
docker compose ps

# View detailed logs
docker compose logs container-name

# Check resource usage
docker stats
```

### Port Conflicts
- **Error**: "Port already in use"
- **Solution**: Change port in docker-compose.yml or stop conflicting service

### Permission Issues
```bash
# Fix file permissions for Dockge
sudo chown -R $USER:$USER ~/dockge/

# Fix file permissions for stacks
sudo chown -R $USER:$USER ~/dockge/stacks/

# Check Docker group membership
groups $USER
```

### Service Not Accessible
- **Check firewall**: `sudo ufw status`
- **Verify container is running**: `docker compose ps`
- **Check port mapping**: Ensure correct ports in docker-compose.yml

### Updates Breaking Things
```bash
# Rollback to previous version
docker compose down
docker compose pull
docker compose up -d

# If issues persist, restore from backup
```

---

## Security Best Practices

### Network Security
- **Keep services on internal network**: Don't expose to internet initially
- **Use strong passwords**: For all service accounts
- **Regular updates**: Keep containers and host system updated

### Access Control
- **Change default passwords**: Never use default credentials
- **Limit access**: Only expose necessary ports
- **Monitor access**: Consider adding monitoring tools to track service availability

### Data Protection
- **Regular backups**: Automate backup creation
- **Test restores**: Verify backups actually work
- **Separate storage**: Keep backups on different devices

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/First-VM" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← First VM
    </a>
    <a href="/en/Backup-Strategy" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Backup Strategy →
    </a>
</div>
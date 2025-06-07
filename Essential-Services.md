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
2. **Portainer** - Web interface for managing Docker containers
3. **Heimdall** - Dashboard to organize all your services
4. **Uptime Kuma** - Monitor your services and get alerts
5. **File Browser** - Web-based file management
6. **Watchtower** - Automatic container updates

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

## Step 2: Setting Up Portainer

Portainer provides a web interface for managing Docker containers - perfect for beginners!

### Install Portainer

```bash
# Create a volume for Portainer data
docker volume create portainer_data

# Run Portainer container
docker run -d \
  --name portainer \
  --restart unless-stopped \
  -p 8000:8000 \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

### Access Portainer

1. **Open your web browser**
2. **Navigate to**: `https://your-vm-ip:9443`
3. **Accept the security warning** (self-signed certificate)
4. **Create admin account**:
   - Username: `admin`
   - Password: Choose a strong password
5. **Select "Get Started"** and choose "Docker" environment

You now have a web interface for managing Docker!

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

  # Uptime Kuma - Service Monitoring
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    volumes:
      - ./uptime-kuma:/app/data
    ports:
      - "3001:3001"
    restart: unless-stopped

  # File Browser - Web File Management
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    volumes:
      - ./filebrowser/database.db:/database.db
      - ./filebrowser/config.json:/config.json
      - /home:/srv/home
      - ./data:/srv/data
    ports:
      - "8082:80"
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
mkdir -p heimdall uptime-kuma filebrowser data

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
   - **Portainer**: `https://your-vm-ip:9443`
   - **Uptime Kuma**: `http://your-vm-ip:3001`
   - **File Browser**: `http://your-vm-ip:8082`

### Uptime Kuma Monitoring (Port 3001)

1. **Access**: `http://your-vm-ip:3001`
2. **Create admin account**: Set username and password
3. **Add monitors**:
   - **Heimdall**: HTTP monitor for `http://your-vm-ip:8080`
   - **Portainer**: HTTPS monitor for `https://your-vm-ip:9443`
   - **Proxmox**: HTTPS monitor for `https://your-proxmox-ip:8006`

### File Browser (Port 8082)

1. **Access**: `http://your-vm-ip:8082`
2. **Default login**:
   - Username: `admin`
   - Password: `admin`
3. **Change password**: Go to Settings → User Management
4. **Explore**: You can now manage files through the web interface

---

## Step 5: Understanding Your Setup

### What You've Accomplished

- **Docker platform**: Foundation for running containerized applications
- **Portainer**: Easy container management through web interface
- **Heimdall**: Central dashboard for all your services
- **Uptime Kuma**: Monitoring to know when services are down
- **File Browser**: Web-based file management
- **Watchtower**: Automatic updates for your containers

### Service URLs Summary

Create bookmarks for easy access:
- **Proxmox**: `https://your-proxmox-ip:8006`
- **Portainer**: `https://your-vm-ip:9443`
- **Heimdall**: `http://your-vm-ip:8080`
- **Uptime Kuma**: `http://your-vm-ip:3001`
- **File Browser**: `http://your-vm-ip:8082`

### Directory Structure

Your homelab stack is organized like this:
```
~/homelab-stack/
├── docker-compose.yml     # Service definitions
├── heimdall/             # Heimdall configuration
├── uptime-kuma/          # Uptime Kuma data
├── filebrowser/          # File Browser config
└── data/                 # Shared data directory
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
docker compose logs -f uptime-kuma
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

# Backup your entire stack
tar -czf ~/backups/homelab-stack-$(date +%Y%m%d).tar.gz ~/homelab-stack/

# List backups
ls -la ~/backups/
```

---

## What's Next?

You now have a solid foundation for your homelab! Here are your next steps:

### Immediate Tasks
1. **Customize Heimdall**: Add more applications and organize your dashboard
2. **Set up monitoring**: Configure Uptime Kuma alerts (email, Discord, etc.)
3. **Explore Portainer**: Learn to manage containers through the web interface
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
# Fix file permissions
sudo chown -R $USER:$USER ~/homelab-stack/

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
- **Monitor access**: Use Uptime Kuma to track service availability

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
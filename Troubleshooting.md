---
title: Homelab Troubleshooting Guide
description: Common problems and solutions for homelab beginners
published: 1
date: 2024-12-06T11:00:00.000Z
tags: troubleshooting, debugging, problems, solutions
editor: markdown
dateCreated: 2024-12-06T11:00:00.000Z
---

# Homelab Troubleshooting Guide

**Every homelab enthusiast becomes a detective!**

Troubleshooting is an essential skill in homelabbing. Things will break, services will stop working, and configurations will mysteriously change. Don't panic—this is all part of the learning process!

This guide covers the most common issues beginners face and provides step-by-step solutions.

---

## General Troubleshooting Methodology

### The STOP Method

**S** - **Stop** and don't panic
**T** - **Think** about what changed recently
**O** - **Observe** the symptoms carefully
**P** - **Plan** your troubleshooting approach

### Basic Troubleshooting Steps

1. **Identify the problem**: What exactly isn't working?
2. **Gather information**: Check logs, error messages, system status
3. **Form a hypothesis**: What might be causing the issue?
4. **Test the hypothesis**: Try a solution
5. **Document the solution**: Write down what worked

### Essential Commands for Troubleshooting

```bash
# System status
systemctl status service-name
journalctl -u service-name -f

# Network connectivity
ping google.com
nslookup domain.com
netstat -tulpn

# Resource usage
top
htop
df -h
free -h

# Docker troubleshooting
docker ps
docker logs container-name
docker exec -it container-name /bin/bash
```

---

## Proxmox Issues

### Can't Access Proxmox Web Interface

**Symptoms**: Browser can't connect to `https://proxmox-ip:8006`

**Possible Causes & Solutions**:

#### Network Issues
```bash
# Check if Proxmox is running
ping proxmox-ip

# Check if web service is running
systemctl status pveproxy

# Restart web service if needed
systemctl restart pveproxy
```

#### Firewall Issues
```bash
# Check firewall status
ufw status

# Allow Proxmox web interface
ufw allow 8006

# Or disable firewall temporarily for testing
ufw disable
```

#### Certificate Issues
- **Browser shows security warning**: This is normal for self-signed certificates
- **Click "Advanced" → "Proceed to site"**
- **Or add security exception** in browser settings

### Proxmox Server Won't Boot

**Symptoms**: Server powers on but doesn't reach login screen

**Troubleshooting Steps**:

1. **Check boot order** in BIOS
2. **Remove USB drives** that might interfere
3. **Check storage connections** (SATA cables, power)
4. **Boot from rescue media** if needed

#### Boot from Proxmox Rescue
1. **Boot from Proxmox USB**
2. **Select "Rescue Boot"**
3. **Mount existing installation**
4. **Check and repair file systems**

### VM Won't Start

**Symptoms**: VM fails to start with error messages

**Common Solutions**:

#### Insufficient Resources
```bash
# Check available resources
pvesh get /nodes/nodename/status

# Check VM configuration
qm config vmid

# Reduce VM memory/CPU if needed
qm set vmid -memory 1024
```

#### Storage Issues
```bash
# Check storage status
pvesh get /storage

# Check disk space
df -h

# Clean up old backups if needed
find /var/lib/vz/dump -name "*.vma*" -mtime +30 -delete
```

#### Lock Issues
```bash
# Remove VM lock
qm unlock vmid

# Force stop if needed
qm stop vmid --skiplock
```

---

## Network Connectivity Issues

### Can't Reach Services

**Symptoms**: Services show as running but can't access via web browser

#### Check Service Status
```bash
# For Docker containers
docker ps
docker logs container-name

# For system services
systemctl status service-name
```

#### Check Port Binding
```bash
# See what's listening on ports
netstat -tulpn | grep :8080

# Check if container is binding to correct interface
docker port container-name
```

#### Firewall Troubleshooting
```bash
# Check firewall rules
ufw status numbered

# Allow specific port
ufw allow 8080

# Check iptables rules
sudo iptables -L
```

### DNS Resolution Issues

**Symptoms**: Can't reach services by hostname, IP addresses work

```bash
# Test DNS resolution
nslookup google.com
dig google.com

# Check DNS configuration
cat /etc/resolv.conf

# Test with different DNS server
nslookup google.com 8.8.8.8
```

**Solutions**:
```bash
# Set DNS servers manually
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

# Or configure in netplan (Ubuntu)
sudo nano /etc/netplan/00-installer-config.yaml
```

### Network Interface Issues

**Symptoms**: No network connectivity at all

```bash
# Check network interfaces
ip addr show

# Check interface status
ip link show

# Bring interface up
sudo ip link set eth0 up

# Check routing table
ip route show
```

---

## Docker and Container Issues

### Docker Service Won't Start

**Symptoms**: `docker` commands fail with connection errors

```bash
# Check Docker service status
systemctl status docker

# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Check Docker logs
journalctl -u docker -f
```

### Container Keeps Restarting

**Symptoms**: Container shows "Restarting" status

```bash
# Check container logs
docker logs container-name

# Check container resource usage
docker stats container-name

# Run container interactively for debugging
docker run -it image-name /bin/bash
```

**Common Causes**:
- **Application crashes**: Check application logs
- **Resource limits**: Increase memory/CPU limits
- **Missing dependencies**: Check Dockerfile or image documentation
- **Port conflicts**: Change port mapping

### Docker Compose Issues

**Symptoms**: `docker compose up` fails or services don't start

```bash
# Validate compose file syntax
docker compose config

# Check service logs
docker compose logs service-name

# Restart specific service
docker compose restart service-name

# Rebuild containers
docker compose up --build
```

### Storage Issues with Containers

**Symptoms**: Containers can't write files or run out of space

```bash
# Check Docker disk usage
docker system df

# Clean up unused resources
docker system prune

# Check volume mounts
docker inspect container-name | grep -A 10 "Mounts"

# Fix permissions
sudo chown -R $USER:$USER /path/to/volume
```

---

## Performance Issues

### System Running Slowly

**Symptoms**: Everything feels sluggish, high response times

#### Check Resource Usage
```bash
# CPU and memory usage
top
htop

# Disk I/O
iotop

# Disk space
df -h

# Check for high load
uptime
```

#### Common Solutions
```bash
# Kill resource-heavy processes
kill -9 process-id

# Restart services consuming too much memory
systemctl restart service-name

# Clean up disk space
sudo apt autoremove
sudo apt autoclean
docker system prune
```

### High Memory Usage

**Symptoms**: System becomes unresponsive, out of memory errors

```bash
# Check memory usage by process
ps aux --sort=-%mem | head

# Check swap usage
swapon --show
free -h

# Add swap file if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Disk Space Issues

**Symptoms**: "No space left on device" errors

```bash
# Find large files
find / -type f -size +100M 2>/dev/null | head -20

# Check directory sizes
du -sh /* | sort -hr

# Clean up common space hogs
# Docker
docker system prune -a

# Logs
sudo journalctl --vacuum-time=7d

# Package cache
sudo apt clean

# Temporary files
sudo rm -rf /tmp/*
```

---

## Service-Specific Issues

### Portainer Issues

**Can't access Portainer web interface**:
```bash
# Check if container is running
docker ps | grep portainer

# Check logs
docker logs portainer

# Restart Portainer
docker restart portainer

# Check port binding
docker port portainer
```

### Heimdall Issues

**Dashboard not loading or showing errors**:
```bash
# Check container status
docker logs heimdall

# Check file permissions
ls -la ~/homelab-stack/heimdall/

# Fix permissions
sudo chown -R 1000:1000 ~/homelab-stack/heimdall/

# Restart container
docker restart heimdall
```

### Uptime Kuma Issues

**Monitoring not working correctly**:
```bash
# Check container logs
docker logs uptime-kuma

# Verify network connectivity from container
docker exec uptime-kuma ping google.com

# Check database permissions
ls -la ~/homelab-stack/uptime-kuma/
```

---

## Security and Access Issues

### SSH Connection Issues

**Can't connect via SSH**:

```bash
# Check if SSH service is running
systemctl status ssh

# Check SSH configuration
sudo nano /etc/ssh/sshd_config

# Check firewall
ufw status | grep 22

# Check SSH logs
journalctl -u ssh -f
```

**Common SSH fixes**:
```bash
# Restart SSH service
sudo systemctl restart ssh

# Allow SSH through firewall
sudo ufw allow ssh

# Check SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### Permission Denied Errors

**Can't access files or run commands**:

```bash
# Check file permissions
ls -la filename

# Fix ownership
sudo chown user:group filename

# Fix permissions
chmod 755 filename  # For directories
chmod 644 filename  # For files
chmod +x filename   # Make executable
```

### Sudo Issues

**"User not in sudoers file" error**:

```bash
# Add user to sudo group
sudo usermod -aG sudo username

# Or edit sudoers file directly
sudo visudo

# Add line: username ALL=(ALL:ALL) ALL
```

---

## Hardware-Related Issues

### Temperature Issues

**System overheating or thermal throttling**:

```bash
# Check CPU temperature
sensors

# Install sensors if not available
sudo apt install lm-sensors
sudo sensors-detect

# Check for thermal throttling
dmesg | grep -i thermal
```

**Solutions**:
- **Clean dust** from fans and heatsinks
- **Check fan operation** (listen for unusual noises)
- **Improve airflow** in server location
- **Reduce CPU load** temporarily

### Storage Hardware Issues

**Disk errors or failures**:

```bash
# Check disk health
sudo smartctl -a /dev/sda

# Check file system errors
sudo fsck /dev/sda1

# Check disk usage and bad sectors
sudo badblocks -v /dev/sda
```

**Warning signs**:
- **Unusual noises** from hard drives
- **Slow file operations**
- **Frequent I/O errors** in logs
- **SMART errors** in system logs

---

## Recovery Procedures

### System Won't Boot

1. **Boot from USB rescue media**
2. **Mount existing file systems**
3. **Check and repair file systems**
4. **Restore from backup if needed**

### Corrupted Configuration

```bash
# Restore from backup
cp ~/backups/configs/config-file /etc/original-location

# Or reset to defaults
sudo dpkg-reconfigure package-name

# For Docker compose
cd ~/homelab-stack
git checkout docker-compose.yml  # If using git
# Or restore from backup
cp ~/backups/homelab-stack/docker-compose.yml .
```

### Complete System Recovery

1. **Reinstall operating system**
2. **Restore configuration files**
3. **Restore Docker volumes**
4. **Restart services**
5. **Verify functionality**

---

## Prevention Strategies

### Monitoring and Alerting

**Set up monitoring for**:
- **System resources** (CPU, memory, disk)
- **Service availability** (web interfaces, APIs)
- **Network connectivity** (internet, local services)
- **Hardware health** (temperature, disk SMART data)

### Regular Maintenance

**Weekly tasks**:
- **Check system logs** for errors
- **Update packages** and containers
- **Verify backups** are working
- **Monitor resource usage** trends

**Monthly tasks**:
- **Review and clean logs**
- **Check disk space** usage
- **Test backup restoration**
- **Update documentation**

### Documentation

**Keep records of**:
- **Configuration changes** made
- **Problems encountered** and solutions
- **Network topology** and IP assignments
- **Service passwords** and access methods

---

## Getting Help

### Log Analysis

**Always check logs first**:
```bash
# System logs
journalctl -f
journalctl -u service-name

# Docker logs
docker logs container-name

# Application logs
tail -f /var/log/application.log
```

### Community Resources

**Where to get help**:
- **r/homelab** subreddit
- **Proxmox community forum**
- **Docker community forums**
- **Stack Overflow** for specific technical issues
- **GitHub issues** for application-specific problems

### Preparing for Help Requests

**Include this information**:
- **Exact error messages**
- **What you were trying to do**
- **What changed recently**
- **System specifications**
- **Relevant log excerpts**
- **Steps already tried**

---

## Emergency Procedures

### Service Down Checklist

1. **Check if it's really down** (try different browser/device)
2. **Check container/service status**
3. **Review recent logs**
4. **Restart the service**
5. **Check system resources**
6. **Restore from backup if needed**

### Data Loss Prevention

**If you suspect data corruption**:
1. **Stop all services immediately**
2. **Don't write any new data**
3. **Create disk image backup**
4. **Attempt recovery on copy**
5. **Restore from known good backup**

### Network Isolation

**If security breach suspected**:
1. **Disconnect from internet**
2. **Change all passwords**
3. **Check logs for unauthorized access**
4. **Scan for malware**
5. **Rebuild from clean backups**

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Backup-Strategy" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Backup Strategy
    </a>
    <a href="/en/Next-Steps" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Next Steps →
    </a>
</div>
---
title: Hypervisor
description: 
published: 1
date: 2024-11-27T03:01:33.653Z
tags: hypervisor
editor: markdown
dateCreated: 2024-11-26T09:33:21.218Z
---

# Homelab Project Guide

## Project Overview

This guide provides a structured approach to building your first homelab using Proxmox VE. It's designed for beginners while maintaining best practices for security and stability.

## Table of Contents

1. [Project Vision](#project-vision)
2. [Hardware Planning](#hardware-planning)
3. [Proxmox Installation Guide](#proxmox-installation-guide)
4. [Core Infrastructure Setup](#core-infrastructure-setup)
5. [Application Deployment](#application-deployment)
6. [Backup Strategy](#backup-strategy)
7. [Remote Access](#remote-access)

## Project Vision

### Purpose
- Create a beginner-friendly homelab environment
- Focus on security and stability
- Provide practical, hands-on experience

### Target Audience
- Homelab beginners
- Tech enthusiasts with basic technical knowledge
- Self-hosted service enthusiasts

## Hardware Planning

### Minimum Requirements
- CPU: 64-bit dual-core processor (Intel EMT64 or AMD64)
- RAM: 8GB minimum (16GB recommended)
- Storage: 120GB SSD minimum
- Network: Gigabit Ethernet

### Recommended Setup
- CPU: Quad-core or better
- RAM: 32GB
- Storage: 500GB SSD + Additional storage drives
- Network: Multiple Gigabit Ethernet ports

## Proxmox Installation Guide

### Prerequisites
- Proxmox VE ISO from [official website](https://www.proxmox.com/en/downloads)
- USB drive (8GB minimum)
- Ventoy for USB creation

### Installation Steps

#### 1. Prepare Installation Media

1. Download Ventoy:
   - Visit [Ventoy GitHub](https://github.com/ventoy/Ventoy/releases)
   - Install on your USB drive

2. Download Proxmox VE:
   ```bash
   # Verify the ISO checksum after downloading
   sha256sum proxmox-ve_*.iso
   ```

3. Copy the ISO:
   - Drag the Proxmox ISO to your Ventoy USB drive

#### 2. BIOS Configuration

1. Access BIOS/UEFI settings
2. Enable:
   - Virtualization (VT-x/AMD-V)
   - IOMMU
   - ECC (if available)
3. Disable:
   - Secure Boot
   - CSM/Legacy Boot

#### 3. Base Installation

1. Boot from USB
2. Select Proxmox VE installer
3. Configure:
   - Target disk (use entire disk for system)
   - Location/Timezone
   - Admin password (use strong password)
   - Network settings (static IP recommended)

#### 4. Initial Security Setup

1. Generate SSH Key (on your workstation):
   ```bash
   ssh-keygen -t ed25519 -C "homelab-admin"
   ```

2. Create Admin User:
   ```bash
   # On Proxmox host
   apt update
   apt install sudo
   useradd -m admin
   usermod -aG sudo admin
   ```

3. Configure SSH:
   ```bash
   # Create SSH directory
   mkdir -p /home/admin/.ssh
   chmod 700 /home/admin/.ssh
   
   # Add your public key
   nano /home/admin/.ssh/authorized_keys
   chmod 600 /home/admin/.ssh/authorized_keys
   chown -R admin:admin /home/admin/.ssh
   ```

4. Secure SSH Configuration:
   ```bash
   # Edit SSH config
   nano /etc/ssh/sshd_config
   ```
   
   Add:
   ```
   Port 22
   PubkeyAuthentication yes
   PasswordAuthentication no
   PermitRootLogin prohibit-password
   MaxAuthTries 3
   ```

#### 5. Repository Configuration

Instead of using community scripts, manually configure repositories:

1. Edit `/etc/apt/sources.list`:
   ```bash
   deb http://ftp.debian.org/debian bullseye main contrib
   deb http://ftp.debian.org/debian bullseye-updates main contrib
   deb http://security.debian.org/debian-security bullseye-security main contrib
   ```

2. Edit `/etc/apt/sources.list.d/pve-enterprise.list`:
   ```bash
   # Comment out enterprise repository
   # deb https://enterprise.proxmox.com/debian/pve bullseye pve-enterprise
   ```

3. Add no-subscription repository:
   ```bash
   echo "deb http://download.proxmox.com/debian/pve bullseye pve-no-subscription" > /etc/apt/sources.list.d/pve-install-repo.list
   ```

4. Update system:
   ```bash
   apt update
   apt full-upgrade
   ```

## Core Infrastructure Setup

### Initial Container Setup

1. Create LXC for Docker:
   - OS: Ubuntu 22.04
   - RAM: 4GB minimum
   - Storage: 32GB minimum
   - Features: Nesting enabled

2. Install Docker Environment:
   ```bash
   # Install Docker and Dockge
   apt update && apt install docker.io docker-compose
   ```

### Essential Applications

1. Core Services:
   - Heimdall (Dashboard)
   - Dozzle (Log Management)
   - Watchtower (Updates)
   - Ntfy (Notifications)

2. Utility Services:
   - Actual Server (Budget Management)
   - Stirling-PDF (PDF Tools)
   - Readarr (Ebook Management)

## Backup Strategy

1. Configure Proxmox Backup Server
2. Implement automated backups
3. Test restore procedures

## Remote Access

1. Cloudflare Tunnel Setup
2. Reverse Proxy Configuration
3. Security Hardening

---

> **Note**: This guide is part of a larger homelab documentation series. For additional resources, check the [Glossary](glossary.md) and [Further Reading](further-reading.md) sections.

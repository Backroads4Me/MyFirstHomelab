---
title: VS Code Remote Development
description: Setting up VS Code for remote SSH access to your Proxmox server
published: 1
date: 2024-12-06T11:00:00.000Z
tags: vscode, ssh, remote-development, proxmox, management
editor: markdown
dateCreated: 2024-12-06T11:00:00.000Z
---

# VS Code for Remote Server Management

Now that you have Proxmox running, let's set up a powerful development environment that will make managing your homelab much easier. VS Code with SSH remote development transforms your server management experience from basic command-line work to a full-featured development environment.

**What is VS Code Remote Development?**
VS Code Remote Development allows you to use Visual Studio Code as if it were running directly on your remote server. You get the full VS Code experience—file explorer, integrated terminal, extensions, and more—while actually working on your Proxmox server.

---

## Why Use VS Code for Homelab Management?

**Enhanced Productivity:**
- **Visual file management**: Browse your server's file system with a familiar interface
- **Integrated terminal**: Multiple terminal sessions in tabs
- **Syntax highlighting**: Proper highlighting for configuration files, scripts, and logs
- **IntelliSense**: Auto-completion for commands and file paths

**Better Configuration Management:**
- **Side-by-side editing**: Compare configuration files easily
- **Search and replace**: Powerful find/replace across multiple files
- **Git integration**: Version control for your configurations
- **Extensions**: Add functionality for Docker, YAML, JSON, and more

**Simplified Workflow:**
- **No more nano/vim learning curve**: Use a familiar editor
- **File transfer**: Easy drag-and-drop file uploads
- **Multi-tasking**: Edit files while monitoring logs in terminal
- **Persistent sessions**: Your work environment survives connection drops

---

## VS Code Installation

### Windows Installation

1. **Download VS Code**:
   - Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
   - Click "Download for Windows"
   - Choose the **User Installer** (recommended)

2. **Run the installer**:
   - Double-click the downloaded file
   - Accept the license agreement
   - **Important**: Check "Add to PATH" during installation
   - Check "Register Code as an editor for supported file types"
   - Complete the installation

3. **Launch VS Code**:
   - VS Code should open automatically
   - If not, find it in your Start menu

### macOS Installation

1. **Download VS Code**:
   - Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
   - Click "Download for Mac"
   - Choose the appropriate version (Intel or Apple Silicon)

2. **Install VS Code**:
   - Open the downloaded `.zip` file
   - Drag `Visual Studio Code.app` to your Applications folder
   - Launch VS Code from Applications

3. **Add to PATH** (optional but recommended):
   - Open VS Code
   - Press `Cmd+Shift+P` to open Command Palette
   - Type "shell command" and select "Shell Command: Install 'code' command in PATH"

### Linux Installation

#### Ubuntu/Debian:
```bash
# Update package index
sudo apt update

# Install dependencies
sudo apt install wget gpg

# Add Microsoft GPG key
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Update and install
sudo apt update
sudo apt install code
```

#### Fedora/RHEL/CentOS:
```bash
# Add Microsoft repository
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

# Install VS Code
sudo dnf install code
```

---

## Installing Required Extensions

### Remote - SSH Extension

This is the essential extension that enables SSH connections:

1. **Open VS Code**
2. **Click the Extensions icon** (square icon in left sidebar) or press `Ctrl+Shift+X`
3. **Search for "Remote - SSH"**
4. **Install the extension** by Microsoft (should be the first result)
5. **Restart VS Code** when prompted

### Recommended Additional Extensions

While connected to your server, install these helpful extensions:

**For General Server Management:**
- **Remote - SSH: Editing Configuration Files**: Helps edit SSH config
- **YAML**: Syntax highlighting for Docker Compose and configuration files
- **JSON**: Better JSON file handling
- **XML**: For various configuration files

**For Docker Management:**
- **Docker**: Manage containers, images, and compose files
- **Docker Compose**: Syntax highlighting and IntelliSense for compose files

**For Shell Scripting:**
- **Bash IDE**: Enhanced bash scripting support
- **ShellCheck**: Linting for shell scripts

---

## SSH Key Setup

SSH keys provide secure, password-less authentication to your server. This is essential for a smooth VS Code experience.

### Generating SSH Keys

#### Windows (PowerShell):
```powershell
# Open PowerShell as regular user (not administrator)
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your-email@example.com"

# When prompted for file location, press Enter for default
# When prompted for passphrase, you can:
# - Press Enter for no passphrase (easier but less secure)
# - Enter a passphrase (more secure but you'll need to enter it)

# Display your public key
Get-Content ~/.ssh/id_ed25519.pub
```

#### macOS/Linux:
```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "your-email@example.com"

# When prompted for file location, press Enter for default
# When prompted for passphrase, choose based on your security needs

# Display your public key
cat ~/.ssh/id_ed25519.pub
```

### Copying SSH Key to Proxmox

#### Method 1: Using ssh-copy-id (macOS/Linux):
```bash
# Replace with your Proxmox server IP
ssh-copy-id root@192.168.1.100
```

#### Method 2: Manual Copy (All Platforms):
```bash
# Copy your public key (the output from the previous step)
# Then SSH into your Proxmox server
ssh root@192.168.1.100

# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh

# Add your public key to authorized_keys
echo "your-public-key-here" >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Exit the SSH session
exit
```

### Testing SSH Key Authentication

```bash
# Test connection (should not prompt for password)
ssh root@192.168.1.100

# If successful, you should be logged in without entering a password
# Exit the test session
exit
```

---

## SSH Configuration File

Create an SSH config file to make connections easier and more reliable.

### Creating SSH Config

#### Windows:
```powershell
# Create .ssh directory if it doesn't exist
New-Item -ItemType Directory -Force -Path ~/.ssh

# Create/edit SSH config file
notepad ~/.ssh/config
```

#### macOS/Linux:
```bash
# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh

# Create/edit SSH config file
nano ~/.ssh/config
```

### SSH Config Content

Add this configuration to your SSH config file:

```
# Proxmox Server Configuration
Host proxmox
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes

# Alternative short name
Host pve
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3
    TCPKeepAlive yes
```

**Configuration Explanation:**
- **Host**: Nickname for your server (use `ssh proxmox` instead of the full command)
- **HostName**: Your server's IP address
- **User**: Username to connect with (root for Proxmox)
- **Port**: SSH port (22 is default)
- **IdentityFile**: Path to your private key
- **ServerAliveInterval**: Keeps connection alive
- **TCPKeepAlive**: Prevents connection drops

### Testing SSH Config

```bash
# Test connection using the nickname
ssh proxmox

# Should connect without prompting for IP or password
```

---

## Connecting to Proxmox with VS Code

### First Connection

1. **Open VS Code**
2. **Open Command Palette**: Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. **Type "Remote-SSH"** and select "Remote-SSH: Connect to Host..."
4. **Choose your server**:
   - If you set up SSH config: Select "proxmox" from the list
   - If no config: Select "Add New SSH Host" and enter `root@192.168.1.100`
5. **Select platform**: Choose "Linux" when prompted
6. **Wait for connection**: VS Code will install the VS Code Server on your Proxmox machine

### Understanding the Remote Environment

Once connected, you'll notice:
- **Green indicator**: Bottom-left corner shows "SSH: proxmox"
- **Remote file system**: File explorer shows your server's files
- **Remote terminal**: Terminal opens on your server
- **Extensions**: Some extensions need to be installed on the remote server

### Opening Your First Remote Folder

1. **Click "Open Folder"** in the Welcome tab
2. **Navigate to a useful directory**:
   - `/etc/` - Configuration files
   - `/root/` - Root user's home directory
   - `/var/log/` - Log files
   - `/opt/` - Optional software installations
3. **Select folder** and click "OK"
4. **Trust the folder** when prompted

---

## Navigating the Proxmox File System

### Important Directories for Homelab Management

**Configuration Files:**
- `/etc/` - System configuration files
- `/etc/pve/` - Proxmox-specific configurations
- `/etc/network/interfaces` - Network configuration
- `/etc/hosts` - Host name mappings

**Proxmox Specific:**
- `/var/lib/vz/` - Container and VM storage
- `/var/lib/vz/template/cache/` - Downloaded templates
- `/var/lib/vz/images/` - VM disk images
- `/etc/pve/lxc/` - LXC container configurations

**Logs and Monitoring:**
- `/var/log/` - System logs
- `/var/log/syslog` - General system messages
- `/var/log/daemon.log` - Service logs

**User Data:**
- `/root/` - Root user's home directory
- `/home/` - Regular user home directories

### File Management Tips

**Creating Files:**
- Right-click in file explorer → "New File"
- Use `Ctrl+N` for new untitled file

**Editing Configuration Files:**
- Double-click to open
- VS Code provides syntax highlighting automatically
- Save with `Ctrl+S`

**File Permissions:**
- VS Code shows file permissions in the file explorer
- Use terminal for permission changes: `chmod 755 filename`

---

## Using the Integrated Terminal

### Opening Terminals

**Multiple Ways to Open Terminal:**
- **Menu**: Terminal → New Terminal
- **Keyboard**: `Ctrl+`` (backtick)
- **Command Palette**: "Terminal: Create New Terminal"

### Terminal Features

**Multiple Terminals:**
- Click the "+" icon to create new terminals
- Switch between terminals using the dropdown
- Each terminal is independent

**Terminal Types:**
- **bash**: Default Linux shell
- **zsh**: Alternative shell (if installed)
- **Custom shells**: Can be configured

### Useful Terminal Commands for Homelab

**System Information:**
```bash
# Check system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check running services
systemctl status

# Check network connections
ss -tulpn
```

**Proxmox Specific:**
```bash
# List VMs and containers
qm list
pct list

# Check Proxmox version
pveversion

# Check cluster status
pvecm status

# Check storage
pvesm status
```

**File Operations:**
```bash
# Navigate directories
cd /etc/pve/
ls -la

# View file contents
cat /etc/hostname
less /var/log/syslog

# Edit files (if you prefer command line)
nano /etc/hosts
```

---

## Practical Usage Examples

### Editing Configuration Files

**Example: Modifying Network Configuration**

1. **Navigate to network config**:
   - Open folder: `/etc/`
   - Find file: `network/interfaces`

2. **Edit the file**:
   - Double-click to open
   - Make your changes with syntax highlighting
   - Save with `Ctrl+S`

3. **Apply changes**:
   - Open terminal in VS Code
   - Run: `systemctl restart networking`

### Managing Scripts and Automation

**Creating a Backup Script:**

1. **Create new file**: `/root/backup-script.sh`
2. **Write the script**:
```bash
#!/bin/bash
# Simple backup script for homelab

# Variables
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup important configs
tar -czf $BACKUP_DIR/configs_$DATE.tar.gz /etc/pve/ /etc/network/

echo "Backup completed: $BACKUP_DIR/configs_$DATE.tar.gz"
```

3. **Make executable**:
   - Terminal: `chmod +x /root/backup-script.sh`

4. **Test the script**:
   - Terminal: `./backup-script.sh`

### Docker Compose Management

**Creating a Docker Compose File:**

1. **Create directory**: `/opt/docker-services/`
2. **Create file**: `docker-compose.yml`
3. **Edit with full IntelliSense**:
```yaml
version: '3.8'
services:
  heimdall:
    image: lscr.io/linuxserver/heimdall:latest
    container_name: heimdall
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - ./heimdall:/config
    ports:
      - 80:80
      - 443:443
    restart: unless-stopped
```

4. **Deploy with terminal**:
   - `cd /opt/docker-services/`
   - `docker-compose up -d`

---

## Advanced Features

### File Synchronization

**Sync Local Files to Server:**
- Drag and drop files from your local machine to VS Code
- Files are automatically uploaded to the server
- Great for uploading scripts, configurations, or documentation

### Multi-Root Workspaces

**Managing Multiple Directories:**
1. **File** → **Add Folder to Workspace**
2. **Add multiple important directories**:
   - `/etc/pve/`
   - `/opt/`
   - `/root/scripts/`
3. **Save workspace**: **File** → **Save Workspace As**

### Search Across Files

**Powerful Search Capabilities:**
- `Ctrl+Shift+F` - Search across all files
- Use regex patterns for complex searches
- Find configuration settings across multiple files
- Search log files for specific errors

### Git Integration

**Version Control for Configurations:**
```bash
# Initialize git in your config directory
cd /etc/pve/
git init
git add .
git commit -m "Initial Proxmox configuration"

# Track changes over time
git add .
git commit -m "Added new VM configuration"
```

---

## Troubleshooting

### Connection Issues

**"Could not establish connection to server":**
1. **Check SSH connection manually**:
   ```bash
   ssh root@192.168.1.100
   ```
2. **Verify SSH service is running on Proxmox**:
   ```bash
   systemctl status ssh
   ```
3. **Check firewall settings**:
   ```bash
   ufw status
   ```

**Connection drops frequently:**
1. **Update SSH config** with keep-alive settings:
   ```
   ServerAliveInterval 60
   ServerAliveCountMax 3
   TCPKeepAlive yes
   ```
2. **Check network stability**
3. **Consider using a wired connection**

### SSH Key Problems

**"Permission denied (publickey)":**
1. **Verify key permissions**:
   ```bash
   chmod 600 ~/.ssh/id_ed25519
   chmod 644 ~/.ssh/id_ed25519.pub
   ```
2. **Check authorized_keys on server**:
   ```bash
   cat ~/.ssh/authorized_keys
   ```
3. **Verify key format** (should be one long line)

**Key not being used:**
1. **Check SSH agent**:
   ```bash
   ssh-add -l
   ```
2. **Add key to agent**:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

### Permission Issues

**"Permission denied" when editing files:**
1. **Check file ownership**:
   ```bash
   ls -la /path/to/file
   ```
2. **Change ownership if needed**:
   ```bash
   sudo chown root:root /path/to/file
   ```
3. **Use sudo for system files**:
   ```bash
   sudo nano /etc/important-config
   ```

**VS Code can't save files:**
1. **Check directory permissions**
2. **Ensure you're connected as the right user**
3. **Use terminal for permission changes**

### Extension Issues

**Extensions not working on remote server:**
1. **Install extensions on remote server**:
   - Extensions panel → "Install in SSH: proxmox"
2. **Some extensions require local installation**
3. **Reload VS Code window**: `Ctrl+Shift+P` → "Developer: Reload Window"

**Slow extension loading:**
1. **Check server resources**: `htop`
2. **Disable unnecessary extensions**
3. **Consider server hardware upgrade**

### Performance Issues

**Slow file operations:**
1. **Check network latency**: `ping 192.168.1.100`
2. **Use wired connection if possible**
3. **Close unnecessary VS Code windows**

**High server resource usage:**
1. **Monitor VS Code server process**: `htop`
2. **Disable resource-intensive extensions**
3. **Close unused terminal sessions**

---

## Security Best Practices

### SSH Security

**Use Strong SSH Keys:**
- Prefer `ed25519` over `rsa`
- Use passphrases for private keys
- Regularly rotate SSH keys

**Limit SSH Access:**
```bash
# Edit SSH configuration
nano /etc/ssh/sshd_config

# Recommended settings:
PermitRootLogin yes  # Only for homelab; disable for production
PasswordAuthentication no
PubkeyAuthentication yes
Port 22  # Consider changing to non-standard port
```

**Monitor SSH Access:**
```bash
# Check SSH logs
tail -f /var/log/auth.log | grep ssh
```

### Network Security

**Firewall Configuration:**
```bash
# Check current firewall status
ufw status

# Allow SSH (if using UFW)
ufw allow 22/tcp

# Allow Proxmox web interface
ufw allow 8006/tcp
```

**Network Isolation:**
- Keep homelab on isolated VLAN if possible
- Use VPN for remote access instead of exposing SSH
- Monitor network traffic regularly

### File System Security

**Protect Sensitive Files:**
```bash
# Set restrictive permissions on SSH keys
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 700 ~/.ssh/

# Protect configuration files
chmod 644 /etc/pve/storage.cfg
```

**Regular Backups:**
- Backup SSH keys and configurations
- Version control important configurations
- Test backup restoration procedures

---

## What's Next?

Congratulations! You now have a powerful remote development environment for managing your Proxmox server. This setup will make all your future homelab tasks much easier and more enjoyable.

### Your Next Steps:

1. **Explore the file system**: Get familiar with Proxmox directory structure
2. **Create your first scripts**: Automate common tasks
3. **Set up configuration management**: Use Git to track changes
4. **Install useful extensions**: Enhance your development experience

### Before You Continue:

- **Bookmark your SSH connection** in VS Code for quick access
- **Create a workspace** with your most-used directories
- **Test your backup scripts** to ensure they work correctly
- **Document your SSH configuration** for future reference

### Integration with Next Steps:

This VS Code setup will be invaluable as you:
- **Create and manage VMs**: Edit configuration files easily
- **Set up Docker services**: Manage compose files with IntelliSense
- **Monitor your homelab**: View logs and system files efficiently
- **Automate tasks**: Write and test scripts in a proper development environment

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Hypervisor" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Hypervisor Setup
    </a>
    <a href="/en/First-VM" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        First VM →
    </a>
</div>
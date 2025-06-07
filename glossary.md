---
title: Homelab Glossary
description: Essential terms and concepts for homelab beginners
published: 1
date: 2024-12-06T11:02:00.000Z
tags: glossary, definitions, terminology, reference
editor: markdown
dateCreated: 2024-12-06T11:02:00.000Z
---

# Homelab Glossary

**Your guide to homelab terminology!**

Starting with homelabs means learning a lot of new terms and acronyms. This glossary explains the essential concepts you'll encounter on your homelab journey, from basic networking to advanced virtualization.

---

## A

**API (Application Programming Interface)**
A set of protocols and tools that allows different software applications to communicate with each other. Many homelab services provide APIs for automation and integration.

**Ansible**
An open-source automation tool used for configuration management, application deployment, and task automation. Popular in homelabs for managing multiple servers.

**Apache**
A popular open-source web server software. Often used in homelabs to host websites and web applications.

---

## B

**Backup**
A copy of data stored separately from the original to protect against data loss. Essential for any homelab setup.

**Bare Metal**
Installing software directly on physical hardware without a virtualization layer. Opposite of virtualized installation.

**BIOS (Basic Input/Output System)**
Firmware that initializes hardware during the boot process. Being replaced by UEFI in modern systems.

**Bridge**
A network device or software that connects different network segments. In virtualization, bridges connect virtual machines to physical networks.

---

## C

**Container**
A lightweight, portable unit that packages an application and its dependencies. Docker is the most popular containerization platform.

**CPU (Central Processing Unit)**
The main processor in a computer that executes instructions. Important consideration for VM resource allocation.

**Cron**
A time-based job scheduler in Unix-like operating systems. Used to automate tasks like backups and updates.

**CLI (Command Line Interface)**
A text-based interface for interacting with computers and software. Essential skill for homelab management.

---

## D

**DHCP (Dynamic Host Configuration Protocol)**
A network service that automatically assigns IP addresses to devices. Usually provided by your router.

**DNS (Domain Name System)**
The system that translates human-readable domain names (like google.com) into IP addresses.

**Docker**
A platform for developing, shipping, and running applications in containers. Very popular in homelabs for easy application deployment.

**Docker Compose**
A tool for defining and running multi-container Docker applications using YAML files.

---

## E

**Ethernet**
A family of wired networking technologies commonly used in local area networks (LANs).

**ESXi**
VMware's enterprise-class hypervisor. Alternative to Proxmox for virtualization.

---

## F

**Firewall**
A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.

**FQDN (Fully Qualified Domain Name)**
A complete domain name that specifies the exact location of a host within the domain name system (e.g., server.example.com).

---

## G

**Gateway**
A network device that serves as an access point to another network, typically the internet. Usually your router's IP address.

**GPU (Graphics Processing Unit)**
A specialized processor designed for graphics rendering. Can be passed through to VMs for specific applications.

**GUI (Graphical User Interface)**
A visual interface that allows users to interact with software using graphical elements like windows, icons, and buttons.

---

## H

**Hypervisor**
Software that creates and manages virtual machines. Examples include Proxmox, VMware ESXi, and Hyper-V.

**HTTP/HTTPS**
Protocols for transferring web pages. HTTPS is the secure version that encrypts data in transit.

**Host**
The physical computer that runs virtual machines or containers. Also refers to any device on a network.

---

## I

**IP Address**
A unique numerical identifier assigned to each device on a network. Can be IPv4 (e.g., 192.168.1.100) or IPv6.

**ISO**
A disk image file format. Used to distribute operating system installers and other software.

**IOMMU (Input-Output Memory Management Unit)**
Hardware feature that allows secure direct memory access by peripheral devices. Required for GPU passthrough.

---

## J

**JSON (JavaScript Object Notation)**
A lightweight data interchange format commonly used for configuration files and API responses.

---

## K

**Kubernetes**
An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.

**KVM (Kernel-based Virtual Machine)**
A virtualization infrastructure for Linux that turns the kernel into a hypervisor.

---

## L

**LAN (Local Area Network)**
A network that connects devices in a limited geographical area, such as your home.

**Linux**
An open-source operating system kernel. Many distributions (Ubuntu, Debian, CentOS) are built on Linux.

**LXC (Linux Containers)**
An operating system-level virtualization method for running multiple isolated Linux systems on a single host.

**Load Balancer**
A device or software that distributes network traffic across multiple servers to ensure no single server is overwhelmed.

---

## M

**MAC Address**
A unique identifier assigned to network interfaces. Used for device identification on local networks.

**Metadata**
Data that provides information about other data. In virtualization, describes VM configurations and properties.

**Mount**
The process of making a file system accessible at a certain point in the directory tree.

---

## N

**NAS (Network Attached Storage)**
A dedicated file storage device that provides data access to multiple clients over a network.

**NAT (Network Address Translation)**
A method of mapping private IP addresses to public IP addresses, allowing multiple devices to share a single public IP.

**Netmask**
A 32-bit mask used to divide an IP address into network and host portions. Commonly written as 255.255.255.0 or /24.

**NFS (Network File System)**
A distributed file system protocol that allows access to files over a network as if they were local.

---

## O

**OS (Operating System)**
System software that manages computer hardware and provides services for computer programs.

**OVA/OVF**
Open Virtualization Archive/Format - standardized formats for packaging and distributing virtual machines.

---

## P

**Port**
A communication endpoint in networking. Software ports (like 80 for HTTP) allow multiple services on one IP address.

**Proxmox**
An open-source virtualization platform that combines KVM hypervisor and LXC containers with a web-based management interface.

**Passthrough**
Directly assigning physical hardware (like GPU or USB devices) to a virtual machine.

---

## Q

**QEMU**
A generic machine emulator and virtualizer. Used by Proxmox and other virtualization platforms.

**QoS (Quality of Service)**
Network management techniques to prioritize certain types of traffic over others.

---

## R

**RAID (Redundant Array of Independent Disks)**
A data storage technology that combines multiple disk drives for redundancy and/or performance.

**RAM (Random Access Memory)**
Volatile memory used by computers to store data temporarily. Critical resource for virtual machines.

**Reverse Proxy**
A server that sits between clients and backend servers, forwarding client requests to backend servers.

**Router**
A networking device that forwards data packets between computer networks, typically connecting your home network to the internet.

---

## S

**SSH (Secure Shell)**
A cryptographic network protocol for secure communication over an unsecured network. Used for remote server management.

**SSL/TLS**
Security protocols for encrypting data transmitted over networks. Used to secure web traffic (HTTPS).

**Snapshot**
A point-in-time copy of a virtual machine's state, including memory, settings, and disk contents.

**SSD (Solid State Drive)**
A storage device that uses flash memory. Faster and more reliable than traditional hard drives.

**Subnet**
A logical subdivision of an IP network. Allows network segmentation and organization.

---

## T

**TCP/UDP**
Transmission Control Protocol and User Datagram Protocol - two main transport protocols used in networking.

**Terraform**
An infrastructure as code tool that allows you to define and provision infrastructure using configuration files.

**TLS (Transport Layer Security)**
A cryptographic protocol that provides secure communication over a network. Successor to SSL.

---

## U

**UEFI (Unified Extensible Firmware Interface)**
Modern replacement for BIOS that provides more features and better security.

**Ubuntu**
A popular Linux distribution based on Debian. Commonly used in homelabs for its ease of use and extensive documentation.

**Uptime**
The amount of time a system has been running without interruption. Important metric for server reliability.

---

## V

**VLAN (Virtual Local Area Network)**
A logical grouping of devices on a network, regardless of their physical location.

**VM (Virtual Machine)**
A software-based emulation of a physical computer that runs an operating system and applications.

**VPN (Virtual Private Network)**
A secure connection between two networks over the internet, often used for remote access to home networks.

**Virtualization**
The process of creating virtual versions of physical resources like servers, storage, or networks.

---

## W

**WAN (Wide Area Network)**
A network that covers a large geographical area, such as the internet.

**Web Server**
Software that serves web pages to clients. Examples include Apache, Nginx, and IIS.

**WiFi**
A wireless networking technology that allows devices to connect to a network without cables.

---

## X

**XML (eXtensible Markup Language)**
A markup language used for storing and transporting data. Often used in configuration files and APIs.

---

## Y

**YAML (YAML Ain't Markup Language)**
A human-readable data serialization standard commonly used for configuration files, especially in Docker Compose.

---

## Z

**ZFS**
A combined file system and logical volume manager with features like snapshots, data integrity verification, and automatic repair.

**Zone**
In networking, a logical grouping of network resources. In DNS, a portion of the domain name space.

---

## Common Acronyms Quick Reference

| Acronym | Full Name | Description |
|---------|-----------|-------------|
| API | Application Programming Interface | Software communication protocol |
| BIOS | Basic Input/Output System | Computer startup firmware |
| CLI | Command Line Interface | Text-based computer interface |
| CPU | Central Processing Unit | Main computer processor |
| DHCP | Dynamic Host Configuration Protocol | Automatic IP address assignment |
| DNS | Domain Name System | Domain name to IP address translation |
| GPU | Graphics Processing Unit | Graphics processing chip |
| GUI | Graphical User Interface | Visual computer interface |
| HTTP | HyperText Transfer Protocol | Web page transfer protocol |
| HTTPS | HTTP Secure | Encrypted web page transfer |
| IP | Internet Protocol | Network addressing system |
| ISO | International Organization for Standardization | Disk image file format |
| LAN | Local Area Network | Local computer network |
| MAC | Media Access Control | Network interface identifier |
| NAS | Network Attached Storage | Network storage device |
| NAT | Network Address Translation | IP address mapping |
| NFS | Network File System | Network file sharing protocol |
| OS | Operating System | Computer system software |
| RAID | Redundant Array of Independent Disks | Multiple disk storage system |
| RAM | Random Access Memory | Computer temporary memory |
| SSD | Solid State Drive | Flash memory storage device |
| SSH | Secure Shell | Secure remote access protocol |
| SSL | Secure Sockets Layer | Network encryption protocol |
| TCP | Transmission Control Protocol | Reliable network protocol |
| TLS | Transport Layer Security | Modern network encryption |
| UDP | User Datagram Protocol | Fast network protocol |
| UEFI | Unified Extensible Firmware Interface | Modern computer firmware |
| URL | Uniform Resource Locator | Web address |
| USB | Universal Serial Bus | Computer connection standard |
| VLAN | Virtual Local Area Network | Logical network grouping |
| VM | Virtual Machine | Software-based computer |
| VPN | Virtual Private Network | Secure network connection |
| WAN | Wide Area Network | Wide-area computer network |

---

## Networking Ports Quick Reference

| Port | Service | Description |
|------|---------|-------------|
| 22 | SSH | Secure remote access |
| 53 | DNS | Domain name resolution |
| 80 | HTTP | Web traffic |
| 443 | HTTPS | Secure web traffic |
| 3389 | RDP | Windows remote desktop |
| 5900 | VNC | Virtual network computing |
| 8006 | Proxmox | Proxmox web interface |
| 9443 | Portainer | Portainer web interface |

---

## File Extensions Reference

| Extension | Description | Common Use |
|-----------|-------------|------------|
| .iso | Disk image file | OS installers |
| .ova | Open Virtual Appliance | VM export format |
| .yml/.yaml | YAML file | Configuration files |
| .json | JSON file | Data and config files |
| .conf | Configuration file | Service settings |
| .log | Log file | System and application logs |
| .sh | Shell script | Automation scripts |
| .md | Markdown file | Documentation |

---

## Storage Units Reference

| Unit | Bytes | Common Usage |
|------|-------|--------------|
| KB | 1,024 | Small files |
| MB | 1,024 KB | Documents, photos |
| GB | 1,024 MB | Applications, videos |
| TB | 1,024 GB | Large storage drives |
| PB | 1,024 TB | Enterprise storage |

---

## Network Address Ranges

| Range | Type | Usage |
|-------|------|-------|
| 192.168.0.0/16 | Private | Home networks |
| 172.16.0.0/12 | Private | Corporate networks |
| 10.0.0.0/8 | Private | Large networks |
| 127.0.0.1 | Loopback | Local machine |
| 169.254.0.0/16 | Link-local | Auto-configuration |

---

<div style="display: flex; gap: 1.5rem; justify-content: space-between; margin-top: 3rem;">
    <a href="/en/Next-Steps" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4); transition: all 0.3s ease;">
        ← Next Steps
    </a>
    <a href="/en/home" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; text-decoration: none; border-radius: 25px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(45deg, #00ffff, #00d4ff); color: #1a1a2e; box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4); transition: all 0.3s ease;">
        Home →
    </a>
</div>
---
title: "Building an Intranet Mail Server with Ubuntu Server & Zimbra"
description: "A complete case study of deploying Zimbra Collaboration Suite on Ubuntu Server — for internal government communication."
publishedAt: 2011-12-01
tags:
  [
    "Linux",
    "Zimbra",
    "Mail Server",
    "BIND9",
    "Ubuntu",
    "Infrastructure",
    "Portfolio",
  ]
cover: "/images/zimbra-logo.jpg"
category: "Documenter"
tech:
  ["Ubuntu Server 10.04 LTS", "Zimbra 5.5.3", "BIND9", "TCP/IP", "Linux CLI"]
status: "Completed"
---

## Overview

This project documents the end-to-end deployment of an internal mail server using **Ubuntu Server 10.04 LTS** and **Zimbra Collaboration Suite 5.5.3**. The goal was to provide a centralized email system for internal government communication — replacing manual correspondence with a faster, more efficient, and document-friendly solution.

The scope covered hostname and TCP/IP configuration, DNS setup with BIND9, disabling conflicting default services, installing Zimbra, configuring the admin account, creating user mailboxes, and validating the system through webmail.

## Background

Internal email communication requires a centralized, secure, and easy-to-manage server. Zimbra was selected because it is open source, supports multi-domain, offers per-user mailbox quotas, integrates antivirus and antispam, and provides web-based administration.

The target environment was an intranet network serving multiple departments, requiring a reliable internal mail service without recurring license costs.

## Objectives

- Build an internal mail server on Linux.
- Configure hostname, IP address, and DNS correctly.
- Install and configure Zimbra Collaboration Suite.
- Test email delivery, admin panel access, and user account creation.

## Architecture

The mail server sits inside an intranet behind a Cisco router and switch, alongside a proxy server and web server, serving users on the local LAN.

![Network diagram](/images/diagramzimbrapemkabbes.svg)

**Server requirements:**

- Pentium IV 1.6 GHz or higher
- 20 GB HDD with 15 GB free space
- 256 MB RAM minimum (512 MB+ recommended)
- CD-ROM 12x, VGA 64 MB

## Tech Stack

- **OS:** Ubuntu Server 10.04 LTS
- **Mail & Collaboration:** Zimbra Collaboration Suite 5.5.3
- **DNS:** BIND9
- **Protocols:** SMTP, IMAP, POP3, HTTP/HTTPS
- **Admin:** Zimbra Web Administration

## Implementation Steps

### 1. Hostname & TCP/IP Configuration

Configured static IP, gateway, and DNS in `/etc/network/interfaces`, then set the hostname in `/etc/hosts` and verified it with `hostname` and `hostname -f`.

```bash
cat /etc/issue
hostname -f
```

![zimbra hostname](/images/zimbrahostname.png)

### 2. DNS Configuration with BIND9

Set up forwarders, local zones, and the `db.bekasikab.go.id` database file. Verified resolution using `nslookup`.
![zimbra Bind](/images/zimbradbbind.png)

### 3. Package Update

Ran `apt-get update` to sync the package database.

```bash
apt-get update

```

### 4. Disabling Conflicting Services

Stopped and disabled Postfix, Apache, and OpenLDAP — all of which are already bundled inside Zimbra.

### 5. Installing Zimbra Dependencies

Installed required packages: `curl`, `fetchmail`, `libpcre3`, `libgmp3c2`, `libexpat1`, `libxml2`, and others.

### 6. Downloading & Extracting Zimbra

Downloaded the Zimbra package, moved it to `/zimbra`, and extracted the archive.

### 7. Installing & Configuring Zimbra

Ran `./install.sh`, selected packages (ldap, logger, mta, snmp, store, apache, spell, proxy), set the admin email and password, and saved the configuration.

### 8. Testing

Verified all Zimbra services with `zmcontrol status`, accessed the admin panel via `https://mail.bekasikab.go.id:7071/ZimbraAdmin`, created a test user account, and logged into webmail.

![zmcontrol status](/images/zmstatus.png)

## Testing & Results

All Zimbra services (antispam, antivirus, imapproxy, ldap, logger, mailbox, mta, snmp, spell, stats) were running. The admin panel was accessible, user accounts were created successfully, and users could log in via webmail on the intranet.

## Challenges & Lessons Learned

- **DNS must be correct before installing Zimbra.** Any misconfiguration will break the installation.
- **Default services must be disabled.** Postfix, Apache, and OpenLDAP conflict with Zimbra's bundled services.
- **Hostname consistency matters.** `hostname` and `hostname -f` must return the same value.
- **Hardware requirements are real.** Insufficient RAM or disk space can cause installation failures.
- **Documentation is critical.** Clear step-by-step notes made troubleshooting and handover easier.

## Note on Legacy Stack

Ubuntu 10.04 LTS and Zimbra 5.5.3 are legacy / end-of-life. This documentation is published as a **learning and historical reference**. For current production, use the latest Ubuntu LTS and a supported Zimbra release with proper security hardening.
_That all IP addresses and hostnames have changed today, so the previous records are now outdated._

## Gallery

![Login as root](/images/zimbraroot.png)
![IP and hostname configuration](/images/zimbrahost.png)
![DNS zone configuration](/images/zimbraip.png)
![Webmail login](/images/zimbrarossy.png)
![Webmail inbox](/images/zimbrainbox.png)

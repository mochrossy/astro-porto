---
title: "Membangun Mail Server Intranet dengan Ubuntu Server & Zimbra"
description: "Studi kasus lengkap deployment Zimbra Collaboration Suite di Ubuntu Server — untuk kebutuhan komunikasi internal instansi pemerintah."
publishedAt: 2011-12-01
tags:
  [
    "Linux",
    "Zimbra",
    "Mail Server",
    "BIND9",
    "Ubuntu",
    "Infrastruktur",
    "Portfolio",
  ]
cover: "/images/zimbra-logo.jpg"
category: "Documenter"
tech:
  ["Ubuntu Server 10.04 LTS", "Zimbra 5.5.3", "BIND9", "TCP/IP", "Linux CLI"]
status: "Completed"
---

## Ringkasan

Proyek ini mendokumentasikan deployment mail server internal secara end-to-end menggunakan **Ubuntu Server 10.04 LTS** dan **Zimbra Collaboration Suite 5.5.3**. Tujuannya adalah menyediakan sistem email terpusat untuk komunikasi internal instansi pemerintah — menggantikan korespondensi manual dengan solusi yang lebih cepat, efisien, dan ramah dokumen.

Lingkup pekerjaan mencakup konfigurasi hostname dan TCP/IP, setup DNS dengan BIND9, menonaktifkan service bawaan yang berpotensi konflik, instalasi Zimbra, konfigurasi akun admin, pembuatan mailbox pengguna, hingga validasi sistem melalui webmail.

## Latar Belakang

Komunikasi email internal membutuhkan server yang terpusat, aman, dan mudah dikelola. Zimbra dipilih karena bersifat open source, mendukung multi-domain, menyediakan quota mailbox per pengguna, terintegrasi dengan antivirus dan antispam, serta menyediakan administrasi berbasis web.

Lingkungan target adalah jaringan intranet yang melayani beberapa dinas, sehingga membutuhkan layanan email internal yang andal tanpa biaya lisensi berulang.

## Tujuan

- Membangun mail server internal di Linux.
- Mengonfigurasi hostname, IP address, dan DNS dengan benar.
- Menginstal dan mengonfigurasi Zimbra Collaboration Suite.
- Menguji pengiriman email, akses admin panel, dan pembuatan akun pengguna.

## Arsitektur

Mail server berada di dalam jaringan intranet, di belakang Cisco router dan switch, bersama dengan proxy server dan web server, melayani pengguna pada LAN lokal.

![Diagram jaringan](/images/diagramzimbrapemkabbes.svg)

**Kebutuhan server:**

- Pentium IV 1.6 GHz atau lebih tinggi
- HDD 20 GB dengan 15 GB free space
- RAM minimum 256 MB (disarankan 512 MB atau lebih)
- CD-ROM 12x, VGA 64 MB

## Tech Stack

- **OS:** Ubuntu Server 10.04 LTS
- **Mail & Collaboration:** Zimbra Collaboration Suite 5.5.3
- **DNS:** BIND9
- **Protokol:** SMTP, IMAP, POP3, HTTP/HTTPS
- **Admin:** Zimbra Web Administration

## Tahapan Implementasi

### 1. Konfigurasi Hostname & TCP/IP

Mengkonfigurasi static IP, gateway, dan DNS pada `/etc/network/interfaces`, kemudian menetapkan hostname di `/etc/hosts` dan memverifikasinya dengan `hostname` dan `hostname -f`.

```bash
cat /etc/issue
hostname -f
```

![zimbra hostname](/images/zimbrahostname.png)

### 2. Konfigurasi DNS dengan BIND9

Menyiapkan forwarders, zona lokal, dan file database `db.bekasikab.go.id`. Verifikasi resolusi menggunakan `nslookup`.
![zimbra Bind](/images/zimbradbbind.png)

### 3. Update Paket

Menjalankan `apt-get update` untuk menyinkronkan database paket.

```bash
apt-get update

```

### 4. Menonaktifkan Service yang Berpotensi Konflik

Menghentikan dan menonaktifkan Postfix, Apache, dan OpenLDAP — semuanya sudah tersedia di dalam paket Zimbra.

### 5. Instalasi Dependency Zimbra

Menginstal paket yang dibutuhkan: `curl`, `fetchmail`, `libpcre3`, `libgmp3c2`, `libexpat1`, `libxml2`, dan lainnya.

### 6. Download & Extract Zimbra

Mengunduh paket Zimbra, memindahkannya ke `/zimbra`, lalu mengekstrak arsipnya.

### 7. Instalasi & Konfigurasi Zimbra

Menjalankan `./install.sh`, memilih paket (ldap, logger, mta, snmp, store, apache, spell, proxy), menetapkan email admin dan password, lalu menyimpan konfigurasi.

### 8. Pengujian

Memverifikasi seluruh service Zimbra dengan `zmcontrol status`, mengakses admin panel melalui `https://mail.bekasikab.go.id:7071/ZimbraAdmin`, membuat akun pengguna uji, dan login ke webmail.

## Pengujian & Hasil

Seluruh service Zimbra (antispam, antivirus, imapproxy, ldap, logger, mailbox, mta, snmp, spell, stats) berjalan dengan baik. Admin panel dapat diakses, akun pengguna berhasil dibuat, dan pengguna dapat login melalui webmail pada jaringan intranet.

![zmcontrol status](/images/zmstatus.png)

## Tantangan & Pelajaran

- **DNS harus benar sebelum instalasi Zimbra.** Kesalahan konfigurasi akan menggagalkan instalasi.
- **Service bawaan harus dinonaktifkan.** Postfix, Apache, dan OpenLDAP berkonflik dengan service bawaan Zimbra.
- **Konsistensi hostname sangat penting.** `hostname` dan `hostname -f` harus mengembalikan nilai yang sama.
- **Kebutuhan hardware requirement.** RAM atau disk yang kurang dapat menyebabkan kegagalan instalasi.
- **Dokumentasi sangat krusial.** Catatan langkah demi langkah memudahkan troubleshooting dan handover.

## Catatan tentang Stack Legacy

Ubuntu 10.04 LTS dan Zimbra 5.5.3 sudah termasuk legacy / end-of-life. Dokumentasi ini dipublikasikan sebagai **referensi pembelajaran dan historis**. Untuk production saat ini, gunakan Ubuntu LTS terbaru dan rilis Zimbra yang masih didukung dengan hardening keamanan yang tepat.
_Seluruh IP address dan hostname sudah berubah saat ini, sehingga catatan sebelumnya sudah tidak relevan lagi._

## Galeri

![Login sebagai root](/images/zimbraroot.png)
![Konfigurasi IP dan hostname](/images/zimbrahost.png)
![Konfigurasi zona DNS](/images/zimbraip.png)
![Login webmail](/images/zimbrarossy.png)
![Inbox webmail](/images/zimbrainbox.png)

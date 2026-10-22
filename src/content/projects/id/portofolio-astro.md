---
title: "Portofolio Pribadi dengan Astro"
description: "Website portofolio dan blog pribadi yang dibangun dengan Astro SSG untuk performa maksimal dan biaya hosting minimal."
techStack:
  [
    "Astro",
    "Markdown",
    "Docker",
    "Cloudflare Pages",
    "astro",
    "portfolio",
    "i18n",
    "learning",
  ]
category: "Web"
duration: "2 minggu"
completedAt: 2026-10-05
githubUrl: "https://github.com/mochrossy/astro-porto"
featured: true
order: 2
---

## Tujuan

Membangun website portofolio pribadi yang cepat, ringan, dan murah
untuk di-hosting. Setelah sebelumnya menggunakan Laravel, kali ini
memilih pendekatan Static Site Generation dengan Astro.

## Kenapa Astro?

- **Zero JavaScript by default** — output murni HTML
- **Markdown-first** — fokus ke konten
- **Build cepat** — proses build hanya beberapa detik
- **Deploy gratis** — Cloudflare Pages tanpa biaya

## Fitur

- Blog dengan Content Collections
- Portfolio dengan detail lengkap
- Halaman Bilingual untuk Blog dan Portfolio
- Search engine friendly (SEO)
- Sitemap XML dan RSS feed

## Hasil

Website live dengan skor Lighthouse 100 di semua kategori.
Biaya hosting: **Rp 0** (Cloudflare Pages free tier).

# Membangun Portofolio Bilingual dengan Astro

**Dari Nol sampai Siap Deploy — Catatan Perjalanan Belajar**

**Moch. Rossy Avian I.**  
System Administrator & DevOps Engineer  
2026

## Ringkasan Proyek

| Aspek            | Detail                                            |
| :--------------- | :------------------------------------------------ |
| **Framework**    | Astro v5                                          |
| **Bahasa**       | English (default) + Indonesia                     |
| **Konten**       | Blog + Portfolio                                  |
| **Styling**      | Scoped CSS (per komponen)                         |
| **Runtime Dev**  | Node.js v24 + npm                                 |
| **Environment**  | Windows + Laragon                                 |
| **Hosting Plan** | Cloudflare Pages (gratis)                         |
| **Fitur**        | Blog, Portfolio, Contact Form, WhatsApp, SEO, RSS |

## 1. Pendahuluan

### 1.1 Tujuan Proyek

Setelah menyelesaikan portofolio dengan Laravel, saya memutuskan untuk membangun portofolio versi baru menggunakan **Astro** sebagai Static Site Generator (SSG). Alasan utamanya:

- **Performa** — output HTML statis murni tanpa JavaScript berlebih
- **Biaya hosting** — bisa gratis di Cloudflare Pages
- **Keamanan** — tidak ada backend yang bisa dieksploitasi
- **SEO** — struktur statis sangat disukai mesin pencari
- **Pembelajaran** — mengenal pendekatan modern dalam web development

### 1.2 Stack Teknologi

| Komponen            | Pilihan                        |
| :------------------ | :----------------------------- |
| **Framework**       | Astro v5                       |
| **Content Format**  | Markdown (.md)                 |
| **Styling**         | Scoped CSS + Custom Properties |
| **Dev Server**      | Vite (built-in Astro)          |
| **Package Manager** | npm                            |
| **Hosting (plan)**  | Cloudflare Pages               |

> **Hasil:** Website portofolio bilingual dengan blog dan portfolio yang sepenuhnya statis, siap deploy ke hosting gratis.

## 2. Kenapa Astro?

### 2.1 Perbandingan Pendekatan

| Aspek             | Laravel (Dynamic)                        | Astro (Static)                    |
| :---------------- | :--------------------------------------- | :-------------------------------- |
| **Output**        | HTML di-generate per request             | HTML siap pakai                   |
| **Hosting**       | VPS/shared hosting (Rp 500rb-2jt/tahun)  | Gratis (Cloudflare Pages)         |
| **Performa**      | Tergantung server                        | Sangat cepat (CDN)                |
| **Keamanan**      | Perlu patch rutin                        | Permukaan serangan minimal        |
| **Update Konten** | Via admin panel                          | Via Git commit + rebuild          |
| **Cocok Untuk**   | Aplikasi dinamis, user-generated content | Blog, portofolio, company profile |

### 2.2 Kelebihan Astro

- **Zero JavaScript by default** — output HTML murni
- **Island Architecture** — JS hanya di bagian yang butuh interaktif
- **Content Collections** — type-safe content management
- **Built-in i18n** — support multi-bahasa
- **Framework-agnostic** — bisa pakai React, Vue, Svelte di dalamnya
- **Markdown-first** — fokus ke konten

---

## 3. Persiapan & Setup

### 3.1 Prasyarat

- Node.js v20+ (kami pakai v24)
- npm v10+
- Git
- Editor: VS Code
- Terminal: PowerShell / Git Bash

### 3.2 Membuat Proyek Baru

```bash
npm create astro@latest portofolio
cd portofolio
npm install
npm run dev
```

Setelah menjalankan npm run dev, buka http://localhost:4321 — Anda akan melihat halaman default Astro.

### 3.3 Struktur Folder Awal

```bash
portofolio/
├── src/
│   ├── pages/           ← setiap file jadi route
│   ├── layouts/         ← template pembungkus
│   ├── components/      ← komponen reusable
│   └── content/         ← konten Markdown
├── public/              ← aset statis
├── astro.config.mjs     ← konfigurasi Astro
├── package.json
└── tsconfig.json
```

Tips: Di Astro, setiap file .astro di dalam src/pages/ otomatis menjadi route. index.astro = homepage, about.astro = /about, dst.

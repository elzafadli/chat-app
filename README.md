# ChatAPP

![ChatAPP](assets/wabotv2.png)

**ChatAPP** adalah layanan chatbot yang membantu tim customer service dalam menangani pesan dan permintaan bantuan dari pelanggan secara efisien melalui sistem chat multikanal.

---

## 🧭 Project Overview

ChatAPP memungkinkan agen customer service untuk:

- Melihat daftar percakapan aktif dari pelanggan
- Memilih dan menanggapi pesan pengguna dalam setiap room
- Mengelola dukungan tanpa tergantung pada status perangkat utama

---

## ✨ Fitur Utama

- Menampilkan daftar room yang berisi pelanggan yang menghubungi support
- Menyediakan UI untuk membalas pesan pada room terpilih
- Fitur pencarian/filter daftar room berdasarkan nama

---

## Architecture

Berikut adalah bagian struktur folder dalam format README.md yang sudah kamu minta, dengan penjelasan singkat untuk setiap folder:

```
.
├── src/                # Root source code folder
│   ├── assets/         # Static assets (images, icons, etc.)
│   ├── components/     # Reusable Vue components
│   ├── constants/      # Constant values (e.g., status maps, enums)
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores for global state management
│   ├── types/          # TypeScript type definitions and interfaces
│   ├── utils/          # Utility/helper functions
│   └── views/          # Page-level Vue components

```

---

## 📦 Prerequisites

Sebelum memulai pengembangan atau menjalankan proyek ini, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) versi 18 atau lebih tinggi
- [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/) sebagai package manager
- [Vue CLI](https://cli.vuejs.org/) (opsional, jika digunakan secara global)

---

## 🚀 Development, Build & Testing

Berikut adalah perintah-perintah utama untuk menjalankan aplikasi, membangun project, dan menjalankan testing:

### 🔧 Jalankan Aplikasi (Development)

Untuk menjalankan aplikasi secara lokal selama pengembangan:

```bash
npm run dev
```

Untuk membangun proyek untuk produksi:

```bash
npm run build
```

Untuk menjalankan unit testing:

```bash
npm run test:unit
```

Untuk menjalankan linting:

```bash
npm run lint
```

Untuk memformat kode:

```bash
npm run format
```

---

## 📡 API Endpoints

### 💬 Get Chat Room by ID

**Endpoint:**

```bash
GET /api/chat/{room_id}
```

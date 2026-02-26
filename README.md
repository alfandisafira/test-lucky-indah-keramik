# NestJS — Generate & Kirim Excel via WhatsApp

Aplikasi NestJS untuk generate file Excel dan mengirimkannya ke nomor WhatsApp menggunakan **ExcelJS** dan **whatsapp-web.js**.

---

## Prasyarat

Pastikan sudah terinstall di komputer:

- [Node.js](https://nodejs.org/) v18 ke atas
- npm v9 ke atas
- Google Chrome atau Chromium (dibutuhkan oleh Puppeteer)
- Gunakan WA Business untuk Scan QR Code

---

## Clone & Setup

### 1. Clone repository

```bash
git https://github.com/alfandisafira/test-lucky-indah-keramik.git
cd test-lucky-indah-keramik
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file `.env`

Buat file `.env` di root project (sesuaikan isinya):

```env
PORT=3000
```

> File `.env` tidak ikut ter-push ke GitHub karena ada di `.gitignore`, jadi perlu dibuat ulang secara manual.

---

## Menjalankan Aplikasi

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

Aplikasi berjalan di `http://localhost:3000`

---

## Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `@nestjs/core` | NestJS framework |
| `exceljs` | Generate file Excel |
| `whatsapp-web.js` | Integrasi WhatsApp Web |
| `qrcode` | Generate QR Code sebagai base64 image |
| `puppeteer` | Browser automation (dipakai whatsapp-web.js) |

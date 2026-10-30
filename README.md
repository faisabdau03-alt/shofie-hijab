# 🧕 Shofie Hijab - E-Commerce Landing Page

Website Landing Page & Toko Online modern dan elegan untuk brand hijab **Shofie Hijab**. Dilengkapi dengan katalog produk interaktif, fitur keranjang belanja (*shopping cart*), filter & pencarian, kalkulasi diskon otomatis, serta sistem konfirmasi checkout yang terhubung langsung ke **WhatsApp Admin**.

---

## ✨ Fitur Utama

1. **Desain Modern & Aesthetic Muslimah**:
   - Palette warna *Rose Gold*, *Warm Taupe*, *Dusty Pink*, dan *Champagne*.
   - Tipografi elegan kombinasi *Cormorant Garamond* & *Plus Jakarta Sans*.
   - Sepenuhnya responsif untuk smartphone, tablet, maupun layar desktop.

2. **Katalog Produk & Filter Kategori**:
   - Filter cepat berdasarkan kategori:
     - *Semua Produk*
     - *Pashmina Series* (Silk Shimmer, Ceruty Babydoll, Kaos Modal)
     - *Segi Empat / Voal* (Paris Premium, Ultrafine Laser Cut, Voal Motif)
     - *Bergo & Instan* (Maryam Diamond, Jersey Sport)
     - *Hijab Syar'i* (French Khimar 2in1, Segi Empat Jumbo)
     - *Ciput & Aksesoris* (Ciput Ninja Rayon, Scrunchie Sutra)
   - Kolom pencarian produk secara langsung (*real-time search*).
   - Pengurutan produk (*Sorting*) berdasarkan: Terpopuler, Rating Tertinggi, Harga Terendah & Tertinggi.

3. **Detail Produk (Quick View Modal)**:
   - Preview foto produk resolusi tinggi.
   - Pilihan varian warna dengan color swatch interaktif.
   - Penjelasan bahan (*material*), ukuran dimensi (*size*), dan karakteristik kain.
   - Pengatur jumlah pembelian (+ / -).

4. **Keranjang Belanja Interaktif (Slide-Over Drawer)**:
   - Keranjang belanja geser dari sisi kanan layar.
   - Manajemen produk (tambah, kurangi kuantitas, hapus item).
   - Otomatis tersimpan di memori browser (*localStorage*).

5. **Sistem Pemesanan Terhubung ke WhatsApp (WA Checkout)**:
   - Form data pemesan: Nama, Nomor WhatsApp, Alamat Pengiriman, Pilihan Kurir (J&T, SiCepat, JNE, Gosend, dll.), Metode Pembayaran (Transfer Bank BCA/Mandiri/BRI/BSI, QRIS, COD), dan Catatan Khusus.
   - Fitur Kupon Promo (Contoh: kode `SHOFIEBARU` untuk potongan Rp 10.000).
   - **Live Preview Format WhatsApp**: Pemesan dapat melihat langsung draft pesan yang akan dikirimkan.
   - Format pesan WhatsApp rapi, lengkap dengan nama produk, varian warna, subtotal harga, dan data penerima paket.

6. **Fitur Pendukung Penjualan (Conversion Boosters)**:
   - **Floating WhatsApp Button** dengan animasi denyut (*pulse effect*) untuk konsultasi cepat dengan CS.
   - **Flash Sale Banner** dengan hitung mundur (*countdown timer*).
   - **Live Purchase Notification Toast**: Simulasi pop-up pesanan terbaru untuk meningkatkan kepercayaan calon pembeli (*social proof*).
   - **Ulasan & Testimoni Pelanggan** berbintang 5.
   - **FAQ Interaktif** (Accordion buka-tutup) untuk menjawab pertanyaan seputar bahan, pengiriman, dan garansi.

---

## 📁 Struktur File

```
shofie-hijab/
│
├── index.html          # Halaman utama landing page & seluruh struktur UI
├── css/
│   └── style.css       # Styling kustom, animasi, font, dan elemen visual
├── js/
│   ├── products.js     # Data katalog produk, testimoni, dan FAQ
│   └── app.js          # Logika aplikasi (keranjang, filter, pesan WhatsApp, modal)
└── README.md           # Panduan penggunaan & kustomisasi
```

---

## 🚀 Cara Menjalankan Website

Website ini dibuat menggunakan HTML, CSS kustom + Tailwind CSS CDN, dan Vanilla JavaScript murni, sehingga **tidak memerlukan instalasi compiler atau dependencies yang rumit**.

### Cara 1: Buka Langsung di Browser
Cukup klik ganda (double click) file `index.html` di komputer Anda, atau klik kanan lalu pilih **Open With** -> **Google Chrome / Microsoft Edge / Mozilla Firefox**.

### Cara 2: Menggunakan VS Code Live Server (Rekomendasi)
1. Buka folder `shofie hijab` di VS Code.
2. Klik kanan file `index.html` dan pilih **Open with Live Server**.
3. Website akan otomatis terbuka di browser Anda pada alamat `http://127.0.0.1:5500`.

---

## ⚙️ Cara Mengubah Nomor WhatsApp & Pengaturan Toko

Untuk mengganti nomor WhatsApp tujuan konfirmasi pemesanan:

1. Buka file [js/app.js](file:///c:/Users/HP/Documents/belajarr/shofie%20hijab/js/app.js#L7-L18):
```javascript
const STORE_CONFIG = {
  name: "Shofie Hijab",
  tagline: "Elegansi Muslimah Masa Kini",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp aktif toko Anda (gunakan awalan 62)
  instagram: "@shofiehijab.official",
  ...
};
```
2. Ganti juga tautan WhatsApp pada [index.html](file:///c:/Users/HP/Documents/belajarr/shofie%20hijab/index.html) jika ingin menyesuaikan nomor pada tombol konsultasi di header dan floating button.

---

## 🛍️ Cara Menambah atau Mengubah Produk

Buka file [js/products.js](file:///c:/Users/HP/Documents/belajarr/shofie%20hijab/js/products.js). Setiap produk memiliki format data berikut:

```javascript
{
  id: 13,
  name: "Nama Hijab Baru",
  category: "pashmina", // pashmina | segi-empat | bergo | syari | aksesoris
  price: 55000,
  originalPrice: 75000,
  rating: 4.9,
  soldCount: "1.2k",
  badge: "New Arrival",
  material: "Katun Voal Premium",
  size: "115 cm x 115 cm",
  image: "URL_FOTO_PRODUK",
  description: "Deskripsi keunggulan hijab...",
  colors: [
    { name: "Dusty Mauve", hex: "#BDA3A7" },
    { name: "Oat Latte", hex: "#F3EDE2" }
  ]
}
```
Simpan file, dan produk baru akan langsung muncul di katalog secara otomatis!


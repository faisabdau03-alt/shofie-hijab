# 🧕 Shofie Hijab - E-Commerce Landing Page & Dashboard Admin

Website Toko Online modern dan elegan untuk brand hijab **Shofie Hijab**. Dilengkapi dengan katalog produk interaktif, keranjang belanja (*shopping cart*), konfirmasi pesanan terhubung ke **WhatsApp**, serta **Dashboard Admin Lengkap (CMS)** untuk mengelola produk, analitik pengunjung harian, dan mengedit konten website secara langsung.

---

## 👑 Dashboard Admin & CMS (`admin.html`)

Akses Dashboard Admin dengan membuka [admin.html](file:///c:/Users/HP/Documents/belajarr/shofie%20hijab/admin.html) atau mengklik tombol **"Login Admin"** di navigasi / footer website.

### 🔑 Kredensial Login Default:
- **Username**: `admin`
- **Password**: `shofie123`
*(Kredensial dapat diubah kapan saja melalui menu Pengaturan Akun di dalam Dashboard Admin)*

### 🚀 Fitur Dashboard Admin:
1. **Ringkasan & Analitik (Overview)**:
   - Jumlah Pengunjung Hari Ini & Pertumbuhan vs Hari Kemarin.
   - Total Tayangan Halaman (*Page Views*).
   - Total Produk Aktif di Etalase.
   - Jumlah Pesanan Masuk via WhatsApp & Estimasi Omset Penjualan.
   - **Grafik Tren Pengunjung 7 Hari Terakhir** (*Chart.js line chart*).
   - **Grafik Donat Sebaran Kategori Produk** (Pashmina, Voal, Bergo, Syar'i, Aksesoris).
   - Pratinjau Pesanan WhatsApp Terbaru.

2. **Kelola Produk (CRUD Lengkap)**:
   - **Tambah Produk Baru**: Form input nama produk, kategori, harga diskon, harga coret, badge (Best Seller, New Arrival, dll.), material kain, ukuran dimensi, URL foto produk, varian warna, dan deskripsi.
   - **Edit Produk**: Perbarui harga, nama, deskripsi, atau foto produk kapan saja.
   - **Hapus Produk**: Hapus item dari etalase dengan dialog konfirmasi aman.
   - **Reset ke Katalog Awal**: Tombol satu-klik untuk mengembalikan 12 produk bawaan awal.
   - Sinkronisasi instan dengan halaman depan toko (*localStorage*).

3. **Editor Konten Website Langsung (Live CMS)**:
   Admin dapat mengubah isi website tanpa menyentuh kode program:
   - **Bar Pengumuman Promo**: Ubah teks banner promo, kode voucher promo (`SHOFIEBARU`), dan nominal diskon (Rp).
   - **Hero Banner**: Ubah teks headline utama, subheadline, teks tombol CTA, dan URL foto model hero.
   - **Kontak Pemesanan WhatsApp**: Ubah nomor WhatsApp admin (otomatis mengubah nomor tujuan semua tombol checkout dan floating WA).
   - **Informasi Toko**: Ubah nama brand, alamat toko, jam buka operasional, link Instagram, dan TikTok.
   - Tombol **"Simpan Perubahan Konten"** langsung memperbarui tampilan website publik.
   - Tombol **"Reset Teks ke Default"** jika ingin mengembalikan kalimat awal.

4. **Riwayat Pesanan WhatsApp**:
   - Setiap pengunjung yang mengisi data dan mengklik *Kirim Pesanan ke WhatsApp* akan otomatis tercatat di tabel riwayat.
   - Menampilkan tanggal, nama pembeli, nomor WhatsApp (dapat diklik langsung untuk chat), rincian produk, ekspedisi, metode pembayaran, dan total belanja.
   - Pengelola bisa mengubah status pesanan (*Menunggu Konfirmasi*, *Diproses*, *Selesai*).

5. **Laporan Pengunjung Harian (Analytics)**:
   - Pelacak pengunjung harian dan total *pageviews* otomatis.
   - Rasio perangkat pengunjung (Smartphone Mobile vs Laptop Desktop).
   - Metode pembayaran terfavorit.
   - Tabel riwayat kunjungan 14 hari terakhir lengkap dengan tingkat konversi pesanan.

---

## 🛍️ Fitur Website Publik Pengunjung (`index.html`)

1. **Desain Modern & Aesthetic Muslimah**:
   - Palette warna *Rose Gold*, *Warm Taupe*, *Dusty Pink*, dan *Champagne*.
   - Tipografi elegan kombinasi *Cormorant Garamond* & *Plus Jakarta Sans*.
   - Sepenuhnya responsif untuk smartphone, tablet, maupun layar desktop.

2. **Katalog Produk & Filter Kategori**:
   - Filter cepat kategori: Pashmina, Segi Empat / Voal, Bergo & Instan, Syar'i, Aksesoris.
   - Pencarian produk real-time (*live search*).
   - Sorting berdasarkan: Terpopuler, Rating Tertinggi, Harga Terendah & Tertinggi.

3. **Detail Produk (Quick View Modal)**:
   - Preview foto produk HD, swatches warna interaktif, spesifikasi bahan, dan selektor kuantitas.

4. **Keranjang Belanja Interaktif (Slide-Over Drawer)**:
   - Slide-over drawer dari samping kanan layar, perhitungan subtotal belanja, dan penyimpanan di memori browser.

5. **Sistem Pemesanan WhatsApp Otomatis**:
   - Form data pemesan: Nama, No. WA, Alamat Lengkap, Pilihan Kurir (J&T, SiCepat, JNE, Gosend), Metode Pembayaran (Transfer Bank BCA/Mandiri/BRI/BSI, QRIS, COD).
   - Fitur Kupon Promo (Kode `SHOFIEBARU`).
   - *Live Preview* format chat WhatsApp sebelum dikirim.
   - Format pesan WhatsApp rapi dan detail saat diklik.

6. **Conversion Boosters**:
   - Floating WhatsApp button dengan animasi pulse glow.
   - Flash Sale banner dengan countdown timer aktif.
   - Live Purchase Notification toast simulation (*social proof*).
   - Testimoni pelanggan bintang 5 & FAQ interaktif.

---

## 📁 Struktur File

```
shofie-hijab/
│
├── index.html          # Halaman depan toko & katalog untuk pembeli
├── admin.html          # Dashboard Admin, Login, Analytics & CMS Editor
├── css/
│   └── style.css       # Styling kustom, animasi, font, dan elemen visual
├── js/
│   ├── products.js     # Data katalog awal produk, testimoni, dan FAQ
│   ├── app.js          # Logika frontend toko, keranjang, order WhatsApp, tracker
│   └── admin.js        # Logika login admin, CRUD produk, CMS editor, Chart.js
├── .gitignore          # File ignore Git
└── README.md           # Panduan lengkap penggunaan & dokumentasi
```

---

## 🚀 Cara Menjalankan

Website ini murni berbasis HTML5, CSS kustom + Tailwind CSS CDN, dan Vanilla JavaScript:
1. Buka file `index.html` langsung di browser untuk melihat tampilan toko.
2. Buka file `admin.html` (atau klik tombol **Login Admin** di pojok kanan atas / footer) untuk masuk ke panel admin dengan username `admin` dan password `shofie123`.

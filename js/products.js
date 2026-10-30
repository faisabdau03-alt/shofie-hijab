// Data Katalog Produk Shofie Hijab
const productsData = [
  {
    id: 1,
    name: "Pashmina Silk Shimmer Luxury",
    category: "pashmina",
    price: 69000,
    originalPrice: 95000,
    rating: 4.9,
    soldCount: "2.4k",
    badge: "Best Seller",
    material: "Cradle Silk Shimmer Import (Kilau Lembut, Lemas, Tidak Panas)",
    size: "180 cm x 75 cm",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Pashmina dengan kilauan mewah yang anggun dan elegan. Tekstur luar berglimmer halus dengan sisi dalam doff sehingga tidak mudah merosot dan tetap nyaman dipakai seharian. Cocok untuk kondangan, wisuda, maupun acara formal.",
    colors: [
      { name: "Rose Gold", hex: "#D4A39B" },
      { name: "Champagne Nude", hex: "#E8D8C8" },
      { name: "Sage Mist", hex: "#9EADA2" },
      { name: "Silver Ash", hex: "#C2C6CA" },
      { name: "Espresso Brown", hex: "#4A3528" }
    ]
  },
  {
    id: 2,
    name: "Voal Paris Premium Japan",
    category: "segi-empat",
    price: 45000,
    originalPrice: 65000,
    rating: 4.9,
    soldCount: "4.8k",
    badge: "Terfavorit",
    material: "Katun Paris Premium Japan (Tegak Paripurna, Adem & Halus)",
    size: "115 cm x 115 cm",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
    description: "Hijab segi empat legendaris dengan formula serat lebih rapat dari Paris biasa. Tidak letoy di dahi, sangat mudah dibentuk tegak melengkung sempurna, dan super adem saat terkena angin seharian.",
    colors: [
      { name: "Oat Milk", hex: "#F3EDE2" },
      { name: "Mocca Latte", hex: "#B89B84" },
      { name: "Soft Mauve", hex: "#BDA3A7" },
      { name: "Olive Green", hex: "#7E856E" },
      { name: "Midnight Black", hex: "#1C1C1E" }
    ]
  },
  {
    id: 3,
    name: "Pashmina Ceruty Babydoll Armani",
    category: "pashmina",
    price: 49000,
    originalPrice: 70000,
    rating: 4.8,
    soldCount: "3.2k",
    badge: "Diskon 30%",
    material: "Original Ceruty Babydoll Armani (Jatuh, Berpasir Lembut)",
    size: "180 cm x 75 cm",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    description: "Kain ceruty kualitas tertinggi dengan karakter berpasir halus, jatuh (flowy) saat dilingkarkan, dan sangat cantik untuk berbagai gaya pashmina modern ala selebgram.",
    colors: [
      { name: "Dusty Cedar", hex: "#C38D9E" },
      { name: "Terracotta", hex: "#C8644A" },
      { name: "Almond Cream", hex: "#EAD7C5" },
      { name: "Charcoal Grey", hex: "#434343" },
      { name: "Emerald Forest", hex: "#2E4F4F" }
    ]
  },
  {
    id: 4,
    name: "Bergo Maryam Diamond Crepe Daily",
    category: "bergo",
    price: 35000,
    originalPrice: 50000,
    rating: 4.9,
    soldCount: "6.1k",
    badge: "Best Seller",
    material: "Diamond Italiano Premium (Tekstur Jeruk Halus, Adem, Elastis)",
    size: "Depan 70 cm, Belakang 85 cm",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80",
    description: "Hijab instan tali praktis yang wajib punya untuk outfit rumahan, jalan santai, kuliah, hingga antar jemput anak. Jahitan tepi double-stitch rapi tanpa serabut.",
    colors: [
      { name: "Nude Peach", hex: "#EBC8B2" },
      { name: "Lilac Pastel", hex: "#D7BDE2" },
      { name: "Army Green", hex: "#4B5320" },
      { name: "Navy Blue", hex: "#1B2A47" },
      { name: "Jet Black", hex: "#111111" }
    ]
  },
  {
    id: 5,
    name: "Voal Trypan Ultrafine Laser Cut",
    category: "segi-empat",
    price: 58000,
    originalPrice: 85000,
    rating: 5.0,
    soldCount: "1.9k",
    badge: "New Arrival",
    material: "Ultrafine Voal Voile (Finishing Laser Cut Presisi)",
    size: "120 cm x 120 cm",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Menggunakan bahan voal terbaik di kelasnya dengan tepian laser cut bermotif ombak anggun. Tidak kedap di telinga dan langsung tegak meski tanpa disetrika berlebih.",
    colors: [
      { name: "Taupe Velvet", hex: "#9E8B7F" },
      { name: "Blush Rose", hex: "#E8B4B8" },
      { name: "Steel Blue", hex: "#627D98" },
      { name: "Sand Dune", hex: "#D6C7B2" },
      { name: "Pure White", hex: "#FDFDFD" }
    ]
  },
  {
    id: 6,
    name: "French Khimar Syar'i 2in1 Cadar",
    category: "syari",
    price: 115000,
    originalPrice: 159000,
    rating: 4.9,
    soldCount: "980",
    badge: "Premium Syar'i",
    material: "Wollpeach Woolvis Grade A (Ringan, Jatuh, Ekstra Adem)",
    size: "Depan 110 cm, Belakang 135 cm",
    image: "https://images.unsplash.com/photo-1583391733975-ac52277d0186?auto=format&fit=crop&w=800&q=80",
    description: "Khimar syar'i multifungsi dengan model French jilbab khas Eropa. Bagian dagu bisa ditarik ke atas menjadi cadar atau diturunkan menjadi jilbab syar'i biasa. Menutup dada dan punggung sempurna.",
    colors: [
      { name: "Deep Maroon", hex: "#5C1D24" },
      { name: "Coffee Brown", hex: "#3D2B1F" },
      { name: "Dark Emerald", hex: "#1A3626" },
      { name: "Abaya Black", hex: "#0E0E0E" },
      { name: "Grey Dove", hex: "#95A5A6" }
    ]
  },
  {
    id: 7,
    name: "Pashmina Kaos Modal Rayon Soft",
    category: "pashmina",
    price: 52000,
    originalPrice: 75000,
    rating: 4.8,
    soldCount: "1.7k",
    badge: "Trending",
    material: "Kaos Modal Rayon Organic (Dingin Semriwing, Melar Lembut)",
    size: "175 cm x 70 cm",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    description: "Pashmina tren masa kini tanpa perlu jarum pentul! Bahannya menyerap keringat dengan luar biasa, pas di bentuk wajah tanpa bikin pusing, dan tidak gampang bergeser.",
    colors: [
      { name: "Heather Grey", hex: "#A8A8A8" },
      { name: "Brownie Melange", hex: "#7A5230" },
      { name: "Matcha Latte", hex: "#A3B18A" },
      { name: "Broken White", hex: "#F5F5F0" },
      { name: "Charcoal Dark", hex: "#2A2A2A" }
    ]
  },
  {
    id: 8,
    name: "Segi Empat Voal Motif Exclusive",
    category: "segi-empat",
    price: 79000,
    originalPrice: 110000,
    rating: 4.9,
    soldCount: "1.5k",
    badge: "Exclusive",
    material: "Voal Digital Printing Premium (Warna Tajam, Tepi Laser Cut)",
    size: "115 cm x 115 cm",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    description: "Motif floral etnik eksklusif desain orisinil Shofie Hijab. Warna cetak digital tajam tidak luntur, bahan voal nyaman yang tidak kedap di telinga dan tegak paripurna.",
    colors: [
      { name: "Serene Garden", hex: "#D4A373" },
      { name: "Royal Botanical", hex: "#588157" },
      { name: "Pastel Blossom", hex: "#DDA15E" },
      { name: "Nocturne Flora", hex: "#283618" }
    ]
  },
  {
    id: 9,
    name: "Bergo Jersey Sport & Active",
    category: "bergo",
    price: 39000,
    originalPrice: 55000,
    rating: 4.9,
    soldCount: "3.5k",
    badge: "Best Seller",
    material: "Jersey Premium Dry-Fit (Adem, Ringan, Tidak Menerawang)",
    size: "Depan 65 cm, Belakang 75 cm",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    description: "Bergo olahraga & harian dengan pad antem (anti tembem). Didesain agar tetap stylish saat jogging, gym, bersepeda, maupun aktivitas harian padat tanpa merasa gerah.",
    colors: [
      { name: "Soft Grey", hex: "#B0B0B0" },
      { name: "Maroon Solid", hex: "#671B23" },
      { name: "Dusty Mocca", hex: "#9C7A68" },
      { name: "Solid Black", hex: "#111111" },
      { name: "Navy Sport", hex: "#1A2238" }
    ]
  },
  {
    id: 10,
    name: "Segi Empat Syar'i Jumbo Voal 140x140",
    category: "syari",
    price: 68000,
    originalPrice: 95000,
    rating: 5.0,
    soldCount: "890",
    badge: "Syar'i Choice",
    material: "Voal Ultrafine Signature 140x140 (Tebal Pas, Lembut)",
    size: "140 cm x 140 cm (Jumbo)",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    description: "Hijab segi empat ukuran jumbo untuk tampilan syar'i yang anggun dan syahdu. Tidak menerawang saat dilipat dua dan jatuh melambai indah menutupi dada serta punggung.",
    colors: [
      { name: "Vanilla Cream", hex: "#F7EFE2" },
      { name: "Dusty Rosewood", hex: "#A86B6F" },
      { name: "Earthy Cedar", hex: "#825E4B" },
      { name: "Forest Pine", hex: "#2B4736" },
      { name: "Deep Charcoal", hex: "#232323" }
    ]
  },
  {
    id: 11,
    name: "Ciput Ninja Anti Pusing Rayon Spandex",
    category: "aksesoris",
    price: 24000,
    originalPrice: 35000,
    rating: 4.9,
    soldCount: "5.2k",
    badge: "Must Have",
    material: "Rayon Spandex Kualitas Super (Elastis, Dingin, Breathable)",
    size: "All Size Fit to XL (Menutup Leher)",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
    description: "Ciput dalaman hijab ninja yang didesain ergonomis tanpa menekan telinga, sehingga bebas dari sakit kepala meski dipakai dari pagi hingga malam. Menutup leher dengan sempurna.",
    colors: [
      { name: "Skin Nude", hex: "#D2B48C" },
      { name: "Hitam Pekat", hex: "#0A0A0A" },
      { name: "Broken White", hex: "#F4F1EA" },
      { name: "Abu Sedang", hex: "#7F8C8D" }
    ]
  },
  {
    id: 12,
    name: "Scrunchie Ikat Rambut Silk Jumbo",
    category: "aksesoris",
    price: 15000,
    originalPrice: 25000,
    rating: 4.8,
    soldCount: "4.1k",
    badge: "Favorit",
    material: "Silky Satin Lembut (Karet Anti Pusing & Tidak Bikin Rontok)",
    size: "Diameter 15 cm (Bervolume Cantik)",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    description: "Kunciran rambut bervolume untuk efek hijab lebih anggun dan proporsional. Bahan sutra satin tidak merusak atau merontokkan rambut saat dilepas.",
    colors: [
      { name: "Mauve Pink", hex: "#C792A1" },
      { name: "Champagne", hex: "#EAD2AC" },
      { name: "Silver Grey", hex: "#C0C0C0" },
      { name: "Midnight Black", hex: "#1A1A1A" }
    ]
  }
];

// Data Testimoni Pelanggan
const testimonialsData = [
  {
    name: "dr. Aisyah Rahmawati",
    city: "Bandung, Jawa Barat",
    rating: 5,
    comment: "Pashmina silk shimmer-nya beneran mewah banget! Dipakai buat acara kondangan kemarin banyak yang muji. Nggak licin karena bagian dalamnya doff, dahi tetap tegak seharian. Pasti langganan!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    productBought: "Pashmina Silk Shimmer"
  },
  {
    name: "Nabila Zahra, S.Farm",
    city: "Jakarta Selatan",
    rating: 5,
    comment: "Voal Paris Premiumnya juara dunia! Akhirnya nemu voal paris yang seratnya rapat dan gampang banget melengkung rapi di dahi tanpa semprotan hairspray. Udah beli 4 warna sekaligus!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    productBought: "Voal Paris Premium Japan"
  },
  {
    name: "Fatimah Azzahra",
    city: "Surabaya, Jawa Timur",
    rating: 5,
    comment: "Checkout via WhatsApp nya cepet dan responsif banget adminnya ramah pol. Kemasannya wangi, ada greeting card cantiknya juga. Bergo Maryamnya enak banget buat daily di rumah.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    productBought: "Bergo Maryam Diamond Daily"
  },
  {
    name: "Khadijah Al-Muntaha",
    city: "Yogyakarta",
    rating: 5,
    comment: "French Khimar 2in1 nya sangat nyaman! Menutup aurat dengan sempurna, bahannya sejuk tidak bikin gerah waktu pengajian outdoor. Jahitan butik sangat halus dan rapi.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    productBought: "French Khimar Syar'i 2in1"
  }
];

// Data FAQ (Frequently Asked Questions)
const faqsData = [
  {
    question: "Bagaimana cara memesan di Shofie Hijab?",
    answer: "Sangat mudah! Pilih produk yang kamu suka, tentukan warna dan jumlahnya, klik 'Tambah ke Keranjang' atau 'Beli Sekarang'. Pada keranjang belanja, klik 'Checkout via WhatsApp'. Data pesanan kamu akan terangkum rapi dan otomatis terbuka di aplikasi WhatsApp untuk konfirmasi langsung dengan Admin kami."
  },
  {
    question: "Apakah bahannya panas atau menerawang?",
    answer: "Semua produk Shofie Hijab melewati proses kurasi bahan yang ketat (Quality Check). Kami memilih material premium yang terbukti breathable (adem), menyerap keringat, dan tidak menerawang saat dipakai dengan benar."
  },
  {
    question: "Pengiriman dari mana dan menggunakan kurir apa?",
    answer: "Pengiriman dilakukan dari Gudang Shofie Hijab di Jakarta/Bandung. Kami bekerja sama dengan ekspedisi terpercaya seperti J&T Express, SiCepat, JNE, Ninja Xpress, serta Gosend / Grab untuk area Jabodetabek."
  },
  {
    question: "Apakah bisa bayar dengan sistem COD (Bayar di Tempat)?",
    answer: "Bisa banget! Kami menyediakan opsi pembayaran COD (Bayar di Tempat saat kurir tiba) serta Transfer Bank (BCA, Mandiri, BRI, BSI) dan QRIS untuk kemudahan belanja kamu."
  },
  {
    question: "Apakah ada garansi jika barang yang diterima rusak / salah warna?",
    answer: "Tentu ada! Kami memberikan garansi 100% ganti baru atau uang kembali jika ada cacat produksi atau ketidaksesuaian warna yang kami kirimkan (sertakan video unboxing maksimal 2x24 jam setelah barang sampai)."
  }
];


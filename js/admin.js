// ==========================================================
// SHOFIE HIJAB - ADMIN DASHBOARD & CMS LOGIC
// ==========================================================

// Default Initial CMS Site Content
const DEFAULT_CMS_CONTENT = {
  storeName: "Shofie Hijab",
  storeTagline: "Modest Elegance",
  whatsappNumber: "6281234567890",
  promoBannerText: "✨ Diskon s.d 35% + Voucher Potongan Rp 10.000 dengan kode:",
  promoCouponCode: "SHOFIEBARU",
  promoCouponDiscount: 10000,
  heroBadge: "Koleksi Terbaru Muslimah 2026",
  heroTitle: "Elegan, Nyaman & Menawan di Setiap Momen.",
  heroSubtitle: "Hadirkan sentuhan anggun dengan hijab premium Shofie. Dibuat dari serat pilihan yang sejuk, jatuh sempurna, tidak menerawang, dan mudah dibentuk tegak paripurna di dahi tanpa ribet.",
  heroCtaText: "Buka Katalog Sekarang",
  heroImageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
  storeAddress: "Jl. Melati Hijab No. 88, Kemang, Jakarta Selatan",
  storeHours: "Senin - Sabtu: 08.00 - 21.00 WIB",
  instagramUrl: "https://instagram.com",
  tiktokUrl: "https://tiktok.com"
};

// Global State
let adminProducts = [];
let adminOrders = [];
let visitorsHistory = [];
let visitorsChartInstance = null;
let categoryChartInstance = null;
let currentEditingProductId = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initDataStorage();
  checkSession();
});

// ==========================================================
// 1. AUTHENTICATION (LOGIN & LOGOUT)
// ==========================================================
function initAdminAuth() {
  if (!localStorage.getItem('shofie_admin_auth')) {
    localStorage.setItem('shofie_admin_auth', JSON.stringify({
      username: 'admin',
      password: 'shofie123'
    }));
  }
}

function checkSession() {
  const isLogged = localStorage.getItem('shofie_admin_session');
  const loginScreen = document.getElementById('loginScreen');
  const adminLayout = document.getElementById('adminLayout');

  if (isLogged === 'true') {
    if (loginScreen) loginScreen.classList.add('hidden');
    if (adminLayout) adminLayout.classList.remove('hidden');
    loadDashboardData();
  } else {
    if (loginScreen) loginScreen.classList.remove('hidden');
    if (adminLayout) adminLayout.classList.add('hidden');
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('adminUsername').value.trim();
  const passwordInput = document.getElementById('adminPassword').value.trim();
  const alertEl = document.getElementById('loginAlert');

  const authData = JSON.parse(localStorage.getItem('shofie_admin_auth'));

  if (usernameInput === authData.username && passwordInput === authData.password) {
    localStorage.setItem('shofie_admin_session', 'true');
    if (alertEl) alertEl.classList.add('hidden');
    checkSession();
    showAdminToast("Selamat datang di Dashboard Admin Shofie Hijab!");
  } else {
    if (alertEl) {
      alertEl.textContent = "Username atau kata sandi yang Anda masukkan salah!";
      alertEl.classList.remove('hidden');
    }
  }
}

function handleAdminLogout() {
  if (confirm("Apakah Anda yakin ingin keluar dari Dashboard Admin?")) {
    localStorage.removeItem('shofie_admin_session');
    checkSession();
    showAdminToast("Anda telah berhasil logout.");
  }
}

function togglePasswordVisibility() {
  const pwdInput = document.getElementById('adminPassword');
  const icon = document.getElementById('togglePwdIcon');
  if (!pwdInput || !icon) return;

  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    pwdInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function handleUpdateAdminCredentials(event) {
  event.preventDefault();
  const newUsername = document.getElementById('newAdminUsername').value.trim();
  const newPassword = document.getElementById('newAdminPassword').value.trim();
  const confirmPassword = document.getElementById('confirmNewAdminPassword').value.trim();
  const alertEl = document.getElementById('settingsAlert');

  if (newPassword.length < 6) {
    alert("Password baru minimal 6 karakter!");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Konfirmasi password tidak cocok!");
    return;
  }

  localStorage.setItem('shofie_admin_auth', JSON.stringify({
    username: newUsername,
    password: newPassword
  }));

  if (alertEl) {
    alertEl.textContent = "Kredensial akun admin berhasil diperbarui!";
    alertEl.classList.remove('hidden');
    setTimeout(() => alertEl.classList.add('hidden'), 4000);
  }

  showAdminToast("Username dan kata sandi baru tersimpan!");
}

// ==========================================================
// 2. DATA STORAGE INITIALIZATION
// ==========================================================
function initDataStorage() {
  // 1. Products
  const storedProducts = localStorage.getItem('shofie_products');
  if (storedProducts) {
    adminProducts = JSON.parse(storedProducts);
  } else {
    adminProducts = typeof productsData !== 'undefined' ? [...productsData] : [];
    localStorage.setItem('shofie_products', JSON.stringify(adminProducts));
  }

  // 2. Orders
  const storedOrders = localStorage.getItem('shofie_orders');
  if (storedOrders) {
    adminOrders = JSON.parse(storedOrders);
  } else {
    adminOrders = [
      {
        id: "SH-8921",
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: "Aisyah Rahmawati",
        customerPhone: "081298765432",
        itemsText: "Pashmina Silk Shimmer Luxury (Rose Gold x 2)",
        courier: "J&T Express",
        payment: "Transfer BCA",
        total: 138000,
        status: "Selesai"
      },
      {
        id: "SH-8920",
        date: new Date(Date.now() - 3600000 * 5).toISOString(),
        customerName: "Nabila Zahra",
        customerPhone: "085712345678",
        itemsText: "Voal Paris Premium Japan (Oat Milk x 1)",
        courier: "SiCepat Halu",
        payment: "QRIS",
        total: 45000,
        status: "Diproses"
      },
      {
        id: "SH-8919",
        date: new Date(Date.now() - 3600000 * 12).toISOString(),
        customerName: "Fatimah Azzahra",
        customerPhone: "087890123456",
        itemsText: "Bergo Maryam Diamond (Nude Peach x 2)",
        courier: "J&T Express",
        payment: "COD (Bayar di Tempat)",
        total: 70000,
        status: "Menunggu Konfirmasi"
      }
    ];
    localStorage.setItem('shofie_orders', JSON.stringify(adminOrders));
  }

  // 3. Visitors Analytics History
  const storedAnalytics = localStorage.getItem('shofie_analytics');
  if (storedAnalytics) {
    visitorsHistory = JSON.parse(storedAnalytics);
  } else {
    visitorsHistory = generateSampleVisitorHistory();
    localStorage.setItem('shofie_analytics', JSON.stringify(visitorsHistory));
  }

  // 4. Site Content CMS
  if (!localStorage.getItem('shofie_site_content')) {
    localStorage.setItem('shofie_site_content', JSON.stringify(DEFAULT_CMS_CONTENT));
  }
}

function generateSampleVisitorHistory() {
  const history = [];
  const now = new Date();

  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Realistic numbers
    const visitors = Math.floor(180 + Math.random() * 120 + (i === 0 ? 95 : 0));
    const pageviews = Math.floor(visitors * (2.1 + Math.random() * 0.8));
    const orders = Math.floor(visitors * (0.04 + Math.random() * 0.025));

    history.push({
      date: dateStr,
      visitors: visitors,
      pageviews: pageviews,
      orders: orders
    });
  }
  return history;
}

// ==========================================================
// 3. NAVIGATION TAB SWITCHING
// ==========================================================
function switchTab(tabId) {
  const tabs = ['overview', 'products', 'siteContent', 'orders', 'analytics', 'settings'];
  
  tabs.forEach(t => {
    const view = document.getElementById(`view-${t}`);
    const btn = document.getElementById(`tabBtn-${t}`);
    if (view) view.classList.add('hidden');
    if (btn) btn.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${tabId}`);
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeBtn) activeBtn.classList.add('active');

  const titleEl = document.getElementById('pageTitle');
  const titles = {
    overview: 'Ringkasan & Analitik',
    products: 'Kelola Katalog Produk',
    siteContent: 'Editor Konten Website (Live CMS)',
    orders: 'Riwayat Pesanan WhatsApp',
    analytics: 'Laporan Pengunjung Harian',
    settings: 'Pengaturan Akun'
  };
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  // Specific reload on tab
  if (tabId === 'overview') {
    renderCharts();
    renderOverviewOrders();
  } else if (tabId === 'products') {
    renderAdminProductsTable();
  } else if (tabId === 'siteContent') {
    populateCmsForm();
  } else if (tabId === 'orders') {
    renderAdminOrdersTable();
  } else if (tabId === 'analytics') {
    renderVisitorsTable();
  }
}

// ==========================================================
// 4. LOAD DASHBOARD DATA & KPIS
// ==========================================================
function loadDashboardData() {
  // Sync state
  initDataStorage();

  // Update counts
  const totalProducts = adminProducts.length;
  const totalOrders = adminOrders.length;
  
  const todayEntry = visitorsHistory[visitorsHistory.length - 1] || { visitors: 0, pageviews: 0 };
  const totalPageviews = visitorsHistory.reduce((sum, h) => sum + h.pageviews, 0);
  const totalRevenue = adminOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Update DOM KPI elements
  const statTodayVisitors = document.getElementById('statTodayVisitors');
  const statTotalPageviews = document.getElementById('statTotalPageviews');
  const statActiveProducts = document.getElementById('statActiveProducts');
  const statWaOrders = document.getElementById('statWaOrders');
  const statEstimatedRevenue = document.getElementById('statEstimatedRevenue');
  const sidebarProductCount = document.getElementById('sidebarProductCount');
  const sidebarOrderCount = document.getElementById('sidebarOrderCount');

  if (statTodayVisitors) statTodayVisitors.textContent = todayEntry.visitors.toLocaleString('id-ID');
  if (statTotalPageviews) statTotalPageviews.textContent = totalPageviews.toLocaleString('id-ID');
  if (statActiveProducts) statActiveProducts.textContent = totalProducts;
  if (statWaOrders) statWaOrders.textContent = totalOrders;
  if (statEstimatedRevenue) statEstimatedRevenue.textContent = `Estimasi ${formatRupiah(totalRevenue)}`;
  if (sidebarProductCount) sidebarProductCount.textContent = totalProducts;
  if (sidebarOrderCount) sidebarOrderCount.textContent = totalOrders;

  renderCharts();
  renderOverviewOrders();
}

// ==========================================================
// 5. CHARTS (CHART.JS)
// ==========================================================
function renderCharts() {
  const visitorsCtx = document.getElementById('visitorsChart');
  const categoryCtx = document.getElementById('categoryChart');
  if (!visitorsCtx || !categoryCtx) return;

  // Last 7 days
  const last7Days = visitorsHistory.slice(-7);
  const labels = last7Days.map(item => {
    const parts = item.date.split('-');
    return `${parts[2]}/${parts[1]}`;
  });
  const visitorsData = last7Days.map(item => item.visitors);
  const pageviewsData = last7Days.map(item => item.pageviews);

  if (visitorsChartInstance) visitorsChartInstance.destroy();

  visitorsChartInstance = new Chart(visitorsCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Pengunjung Unik',
          data: visitorsData,
          borderColor: '#9C5248',
          backgroundColor: 'rgba(156, 82, 72, 0.1)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#9C5248'
        },
        {
          label: 'Tayangan Halaman',
          data: pageviewsData,
          borderColor: '#D4AF37',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: '#D4AF37'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 11, family: 'Plus Jakarta Sans' }, boxWidth: 12 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { font: { size: 10 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });

  // Category Distribution
  const categoryCounts = {
    'pashmina': 0,
    'segi-empat': 0,
    'bergo': 0,
    'syari': 0,
    'aksesoris': 0
  };

  adminProducts.forEach(p => {
    if (categoryCounts[p.category] !== undefined) {
      categoryCounts[p.category]++;
    }
  });

  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: ['Pashmina', 'Segi Empat', 'Bergo', 'Syar\'i', 'Aksesoris'],
      datasets: [{
        data: [
          categoryCounts['pashmina'],
          categoryCounts['segi-empat'],
          categoryCounts['bergo'],
          categoryCounts['syari'],
          categoryCounts['aksesoris']
        ],
        backgroundColor: ['#9C5248', '#C97D73', '#D4AF37', '#627D98', '#825E4B']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      cutout: '65%'
    }
  });

  // Category Legend Custom HTML
  const legendEl = document.getElementById('categoryChartLegend');
  if (legendEl) {
    legendEl.innerHTML = `
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#9C5248]"></span> Pashmina (${categoryCounts['pashmina']})</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#C97D73]"></span> Segi Empat (${categoryCounts['segi-empat']})</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span> Bergo (${categoryCounts['bergo']})</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#627D98]"></span> Syar'i (${categoryCounts['syari']})</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#825E4B]"></span> Aksesoris (${categoryCounts['aksesoris']})</div>
    `;
  }
}

// ==========================================================
// 6. PRODUCT CRUD LOGIC
// ==========================================================
function renderAdminProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  const emptyState = document.getElementById('adminProductsEmpty');
  if (!tbody) return;

  const q = (document.getElementById('adminProductSearch')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('adminCategoryFilter')?.value || 'all';

  let filtered = [...adminProducts];

  if (cat !== 'all') {
    filtered = filtered.filter(p => p.category === cat);
  }

  if (q !== '') {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.material && p.material.toLowerCase().includes(q)));
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = filtered.map(product => {
    const colorsList = product.colors ? product.colors.map(c => 
      `<span class="w-3.5 h-3.5 rounded-full inline-block border border-white shadow-sm" style="background-color: ${c.hex};" title="${c.name}"></span>`
    ).join(' ') : '-';

    return `
      <tr class="hover:bg-stone-50/70 transition">
        <td class="p-4">
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${escapeHtml(product.name)}" class="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 flex-shrink-0" />
            <div>
              <div class="font-bold text-stone-900">${escapeHtml(product.name)}</div>
              <div class="text-[11px] text-stone-400 line-clamp-1">${escapeHtml(product.material || '')}</div>
            </div>
          </div>
        </td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
            ${product.category}
          </span>
        </td>
        <td class="p-4 font-bold text-rose-800">
          ${formatRupiah(product.price)}
        </td>
        <td class="p-4 text-stone-400 line-through">
          ${product.originalPrice ? formatRupiah(product.originalPrice) : '-'}
        </td>
        <td class="p-4">
          <div class="flex items-center gap-1">${colorsList}</div>
        </td>
        <td class="p-4">
          ${product.badge ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">${escapeHtml(product.badge)}</span>` : '<span class="text-stone-300">-</span>'}
        </td>
        <td class="p-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="editProduct(${product.id})" class="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold transition" title="Edit Produk">
              <i class="fas fa-edit mr-1 text-[11px]"></i> Edit
            </button>
            <button onclick="deleteProduct(${product.id})" class="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-semibold transition" title="Hapus Produk">
              <i class="fas fa-trash-alt text-[11px]"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleAdminProductFilter() {
  renderAdminProductsTable();
}

function openProductModal(productId = null) {
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');
  const form = document.getElementById('productForm');
  if (!modal || !form) return;

  currentEditingProductId = productId;

  if (productId) {
    const p = adminProducts.find(item => item.id === productId);
    if (!p) return;
    if (title) title.textContent = "Edit Produk Hijab";

    document.getElementById('formProductId').value = p.id;
    document.getElementById('formProductName').value = p.name;
    document.getElementById('formProductCategory').value = p.category;
    document.getElementById('formProductPrice').value = p.price;
    document.getElementById('formProductOriginalPrice').value = p.originalPrice || '';
    document.getElementById('formProductBadge').value = p.badge || '';
    document.getElementById('formProductMaterial').value = p.material || '';
    document.getElementById('formProductSize').value = p.size || '';
    document.getElementById('formProductImage').value = p.image || '';
    document.getElementById('formProductDescription').value = p.description || '';
    document.getElementById('formProductColors').value = p.colors ? p.colors.map(c => c.name).join(', ') : '';
  } else {
    if (title) title.textContent = "Tambah Produk Baru";
    form.reset();
    document.getElementById('formProductId').value = '';
    // Sample default image
    document.getElementById('formProductImage').value = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';
  }

  modal.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('active');
}

function handleSaveProduct(event) {
  event.preventDefault();

  const idVal = document.getElementById('formProductId').value;
  const name = document.getElementById('formProductName').value.trim();
  const category = document.getElementById('formProductCategory').value;
  const price = parseInt(document.getElementById('formProductPrice').value) || 0;
  const origPriceVal = document.getElementById('formProductOriginalPrice').value;
  const originalPrice = origPriceVal ? parseInt(origPriceVal) : null;
  const badge = document.getElementById('formProductBadge').value.trim();
  const material = document.getElementById('formProductMaterial').value.trim();
  const size = document.getElementById('formProductSize').value.trim();
  const image = document.getElementById('formProductImage').value.trim();
  const description = document.getElementById('formProductDescription').value.trim();
  const colorsText = document.getElementById('formProductColors').value.trim();

  // Color generator
  const colorPalette = {
    'rose': '#D4A39B', 'nude': '#E8D8C8', 'sage': '#9EADA2', 'silver': '#C2C6CA',
    'black': '#1C1C1E', 'hitam': '#1C1C1E', 'putih': '#FDFDFD', 'white': '#FDFDFD',
    'mocca': '#B89B84', 'mauve': '#BDA3A7', 'olive': '#7E856E', 'terracotta': '#C8644A',
    'peach': '#EBC8B2', 'lilac': '#D7BDE2', 'army': '#4B5320', 'navy': '#1B2A47'
  };

  const colors = colorsText.split(',').map(c => c.trim()).filter(c => c.length > 0).map(colorName => {
    const lower = colorName.toLowerCase();
    let hex = '#C4A482'; // default elegant taupe
    for (const key in colorPalette) {
      if (lower.includes(key)) {
        hex = colorPalette[key];
        break;
      }
    }
    return { name: colorName, hex: hex };
  });

  if (idVal) {
    // Update
    const idx = adminProducts.findIndex(p => p.id === parseInt(idVal));
    if (idx > -1) {
      adminProducts[idx] = {
        ...adminProducts[idx],
        name, category, price, originalPrice, badge, material, size, image, description,
        colors: colors.length > 0 ? colors : adminProducts[idx].colors
      };
      showAdminToast(`Produk "${name}" berhasil diperbarui!`);
    }
  } else {
    // Create
    const newId = Date.now();
    adminProducts.unshift({
      id: newId,
      name,
      category,
      price,
      originalPrice,
      rating: 5.0,
      soldCount: "0",
      badge: badge || "New",
      material,
      size,
      image,
      description,
      colors: colors.length > 0 ? colors : [{ name: 'Standard', hex: '#9C5248' }]
    });
    showAdminToast(`Produk baru "${name}" berhasil ditambahkan ke katalog!`);
  }

  saveProducts();
  closeProductModal();
  renderAdminProductsTable();
  loadDashboardData();
}

function editProduct(productId) {
  openProductModal(productId);
}

function deleteProduct(productId) {
  const p = adminProducts.find(item => item.id === productId);
  if (!p) return;

  if (confirm(`Apakah Anda yakin ingin menghapus produk "${p.name}" dari katalog?`)) {
    adminProducts = adminProducts.filter(item => item.id !== productId);
    saveProducts();
    renderAdminProductsTable();
    loadDashboardData();
    showAdminToast(`Produk "${p.name}" telah dihapus.`);
  }
}

function saveProducts() {
  localStorage.setItem('shofie_products', JSON.stringify(adminProducts));
}

function resetProductsToDefault() {
  if (confirm("Kembalikan daftar produk ke 12 produk bawaan awal?")) {
    adminProducts = typeof productsData !== 'undefined' ? [...productsData] : [];
    saveProducts();
    renderAdminProductsTable();
    loadDashboardData();
    showAdminToast("Produk berhasil di-reset ke katalog bawaan awal.");
  }
}

// ==========================================================
// 7. EDIT ISI WEBSITE (CMS CONTENT MANAGER)
// ==========================================================
function populateCmsForm() {
  let content = DEFAULT_CMS_CONTENT;
  const stored = localStorage.getItem('shofie_site_content');
  if (stored) {
    try {
      content = { ...DEFAULT_CMS_CONTENT, ...JSON.parse(stored) };
    } catch (e) {
      console.error(e);
    }
  }

  document.getElementById('cmsPromoText').value = content.promoBannerText || '';
  document.getElementById('cmsPromoCoupon').value = content.promoCouponCode || '';
  document.getElementById('cmsPromoDiscount').value = content.promoCouponDiscount || 10000;
  
  document.getElementById('cmsHeroBadge').value = content.heroBadge || '';
  document.getElementById('cmsHeroTitle').value = content.heroTitle || '';
  document.getElementById('cmsHeroSubtitle').value = content.heroSubtitle || '';
  document.getElementById('cmsHeroCtaText').value = content.heroCtaText || '';
  document.getElementById('cmsHeroImage').value = content.heroImageUrl || '';

  document.getElementById('cmsWhatsAppNumber').value = content.whatsappNumber || '';
  document.getElementById('cmsStoreName').value = content.storeName || '';
  document.getElementById('cmsStoreAddress').value = content.storeAddress || '';
  document.getElementById('cmsStoreHours').value = content.storeHours || '';
  document.getElementById('cmsInstagramUrl').value = content.instagramUrl || '';
  document.getElementById('cmsTiktokUrl').value = content.tiktokUrl || '';
}

function handleSaveSiteContent(event) {
  event.preventDefault();

  const updatedContent = {
    promoBannerText: document.getElementById('cmsPromoText').value.trim(),
    promoCouponCode: document.getElementById('cmsPromoCoupon').value.trim().toUpperCase(),
    promoCouponDiscount: parseInt(document.getElementById('cmsPromoDiscount').value) || 10000,
    
    heroBadge: document.getElementById('cmsHeroBadge').value.trim(),
    heroTitle: document.getElementById('cmsHeroTitle').value.trim(),
    heroSubtitle: document.getElementById('cmsHeroSubtitle').value.trim(),
    heroCtaText: document.getElementById('cmsHeroCtaText').value.trim(),
    heroImageUrl: document.getElementById('cmsHeroImage').value.trim(),

    whatsappNumber: document.getElementById('cmsWhatsAppNumber').value.trim(),
    storeName: document.getElementById('cmsStoreName').value.trim(),
    storeAddress: document.getElementById('cmsStoreAddress').value.trim(),
    storeHours: document.getElementById('cmsStoreHours').value.trim(),
    instagramUrl: document.getElementById('cmsInstagramUrl').value.trim(),
    tiktokUrl: document.getElementById('cmsTiktokUrl').value.trim()
  };

  localStorage.setItem('shofie_site_content', JSON.stringify(updatedContent));
  showAdminToast("Perubahan konten website berhasil disimpan! Halaman web publik otomatis ter-update.");
}

function resetCmsContentToDefault() {
  if (confirm("Reset seluruh teks dan konten website ke pengaturan awal?")) {
    localStorage.setItem('shofie_site_content', JSON.stringify(DEFAULT_CMS_CONTENT));
    populateCmsForm();
    showAdminToast("Konten website dikembalikan ke pengaturan default.");
  }
}

// ==========================================================
// 8. ORDERS LOG (WHATSAPP TRANSACTIONS)
// ==========================================================
function renderOverviewOrders() {
  const tbody = document.getElementById('overviewRecentOrdersBody');
  if (!tbody) return;

  if (adminOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-stone-400">Belum ada pesanan masuk.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminOrders.slice(0, 5).map(o => `
    <tr class="hover:bg-stone-50">
      <td class="p-3.5 text-stone-400 text-[11px] whitespace-nowrap">${formatDate(o.date)}</td>
      <td class="p-3.5 font-bold text-stone-800">${escapeHtml(o.customerName)}</td>
      <td class="p-3.5 text-stone-600 line-clamp-1 max-w-xs">${escapeHtml(o.itemsText || '')}</td>
      <td class="p-3.5 font-bold text-emerald-700">${formatRupiah(o.total || 0)}</td>
      <td class="p-3.5 text-right">
        <a href="https://wa.me/${o.customerPhone ? o.customerPhone.replace(/[^0-9]/g, '') : ''}" target="_blank" class="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-bold">
          <i class="fab fa-whatsapp"></i> Chat
        </a>
      </td>
    </tr>
  `).join('');
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById('adminOrdersTableBody');
  const emptyState = document.getElementById('adminOrdersEmpty');
  if (!tbody) return;

  if (adminOrders.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = adminOrders.map((o, index) => {
    let statusClass = "bg-amber-100 text-amber-800";
    if (o.status === "Selesai") statusClass = "bg-emerald-100 text-emerald-800";
    if (o.status === "Diproses") statusClass = "bg-blue-100 text-blue-800";

    const cleanPhone = o.customerPhone ? o.customerPhone.replace(/[^0-9]/g, '') : '';

    return `
      <tr class="hover:bg-stone-50 transition">
        <td class="p-4">
          <span class="font-mono font-bold text-stone-800 block">${escapeHtml(o.id || `SH-${index+1}`)}</span>
          <span class="text-[10px] text-stone-400">${formatDate(o.date)}</span>
        </td>
        <td class="p-4 font-bold text-stone-900">${escapeHtml(o.customerName)}</td>
        <td class="p-4">
          <a href="https://wa.me/${cleanPhone}" target="_blank" class="text-emerald-700 hover:underline font-semibold flex items-center gap-1">
            <i class="fab fa-whatsapp"></i> ${escapeHtml(o.customerPhone || '-')}
          </a>
        </td>
        <td class="p-4 max-w-xs text-stone-700">${escapeHtml(o.itemsText || '-')}</td>
        <td class="p-4">
          <span class="block font-semibold text-stone-800">${escapeHtml(o.courier || '-')}</span>
          <span class="text-[10px] text-stone-400">${escapeHtml(o.payment || '-')}</span>
        </td>
        <td class="p-4 font-bold text-rose-800">${formatRupiah(o.total || 0)}</td>
        <td class="p-4">
          <select onchange="updateOrderStatus(${index}, this.value)" class="px-2 py-1 rounded text-[11px] font-bold ${statusClass} border-none focus:outline-none cursor-pointer">
            <option value="Menunggu Konfirmasi" ${o.status === 'Menunggu Konfirmasi' ? 'selected' : ''}>Menunggu Konfirmasi</option>
            <option value="Diproses" ${o.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
            <option value="Selesai" ${o.status === 'Selesai' ? 'selected' : ''}>Selesai</option>
          </select>
        </td>
        <td class="p-4 text-right">
          <button onclick="deleteOrder(${index})" class="text-stone-400 hover:text-red-600 transition" title="Hapus catatan">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(index, newStatus) {
  if (!adminOrders[index]) return;
  adminOrders[index].status = newStatus;
  localStorage.setItem('shofie_orders', JSON.stringify(adminOrders));
  showAdminToast("Status pesanan berhasil diperbarui!");
  renderAdminOrdersTable();
}

function deleteOrder(index) {
  if (confirm("Hapus pesanan ini dari riwayat?")) {
    adminOrders.splice(index, 1);
    localStorage.setItem('shofie_orders', JSON.stringify(adminOrders));
    renderAdminOrdersTable();
    loadDashboardData();
    showAdminToast("Pesanan dihapus.");
  }
}

function clearOrderHistory() {
  if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?")) {
    adminOrders = [];
    localStorage.setItem('shofie_orders', JSON.stringify(adminOrders));
    renderAdminOrdersTable();
    loadDashboardData();
    showAdminToast("Riwayat pesanan dikosongkan.");
  }
}

// ==========================================================
// 9. VISITORS ANALYTICS TABLE
// ==========================================================
function renderVisitorsTable() {
  const tbody = document.getElementById('adminVisitorsTableBody');
  if (!tbody) return;

  const reversed = [...visitorsHistory].reverse();

  tbody.innerHTML = reversed.map(item => {
    const rate = item.visitors > 0 ? ((item.orders / item.visitors) * 100).toFixed(1) : 0;
    return `
      <tr class="hover:bg-stone-50">
        <td class="p-4 font-semibold text-stone-800">${item.date}</td>
        <td class="p-4 font-bold text-blue-700">${item.visitors.toLocaleString('id-ID')}</td>
        <td class="p-4 text-stone-600">${item.pageviews.toLocaleString('id-ID')}</td>
        <td class="p-4 font-bold text-emerald-700">${item.orders}</td>
        <td class="p-4">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${rate > 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}">
            ${rate}%
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================
// 10. UTILITIES
// ==========================================================
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(num);
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return isoStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  const text = document.getElementById('adminToastText');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3500);
}

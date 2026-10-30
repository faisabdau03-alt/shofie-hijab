// ==========================================================
// SHOFIE HIJAB - APPLICATION CORE & E-COMMERCE LOGIC
// ==========================================================

// Global Store Configuration
const STORE_CONFIG = {
  name: "Shofie Hijab",
  tagline: "Elegansi Muslimah Masa Kini",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp aktif toko (format 62...)
  instagram: "@shofiehijab.official",
  shopee: "shofiehijab_official",
  tokopedia: "shofie-hijab-store",
  defaultCoupon: {
    code: "SHOFIEBARU",
    discount: 10000,
    type: "fixed" // 'fixed' or 'percent'
  }
};

// Application State
let cart = JSON.parse(localStorage.getItem('shofie_hijab_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'popular';
let activeDiscount = 0;
let appliedCouponCode = '';

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderTestimonials();
  renderFaqs();
  updateCartUI();
  setupEventListeners();
  initCountdownTimer();
  startLivePurchaseNotifications();
});

// ==========================================================
// 1. PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  let filtered = [...productsData];

  // Category filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(item => item.category === activeCategory);
  }

  // Search filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.material.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // default popular
    filtered.sort((a, b) => b.id - a.id);
  }

  // Check if empty
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
          <i class="fas fa-search text-2xl"></i>
        </div>
        <h3 class="text-xl font-serif-luxury font-bold text-neutral-800 mb-1">Produk Tidak Ditemukan</h3>
        <p class="text-neutral-500 text-sm max-w-md mx-auto mb-6">
          Maaf, produk dengan kata kunci "<strong>${escapeHtml(searchQuery)}</strong>" tidak ditemukan dalam kategori ini.
        </p>
        <button onclick="resetFilters()" class="px-5 py-2.5 bg-rose-800 hover:bg-rose-900 text-white rounded-full text-sm font-semibold transition">
          Reset Filter & Tampilkan Semua
        </button>
      </div>
    `;
    return;
  }

  // Render cards
  container.innerHTML = filtered.map(product => {
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0].name : "Standard";
    
    // Color dots preview
    const colorDots = product.colors ? product.colors.slice(0, 5).map(c => 
      `<span class="w-3.5 h-3.5 rounded-full inline-block border border-white shadow-sm" style="background-color: ${c.hex};" title="${c.name}"></span>`
    ).join('') : '';

    const moreColors = product.colors && product.colors.length > 5 ? 
      `<span class="text-[11px] text-neutral-500 font-medium">+${product.colors.length - 5}</span>` : '';

    return `
      <div class="product-card bg-white rounded-2xl overflow-hidden flex flex-col group relative">
        <!-- Top Badge -->
        ${product.badge ? `
          <div class="absolute top-3 left-3 z-10">
            <span class="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full shadow-sm ${
              product.badge.includes('Best') || product.badge.includes('Terfavorit') ? 'badge-gold' : 'badge-primary'
            }">
              ${product.badge}
            </span>
          </div>
        ` : ''}

        <!-- Quick View Overlay Button -->
        <button onclick="openQuickView(${product.id})" class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-rose-800 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105" title="Lihat Detail Produk">
          <i class="fas fa-eye text-sm"></i>
        </button>

        <!-- Product Image -->
        <div class="product-image-container relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onclick="openQuickView(${product.id})">
          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}" 
            loading="lazy" 
            class="w-full h-full object-cover object-center"
          />
          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Product Information -->
        <div class="p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Colors preview -->
            <div class="flex items-center gap-1.5 mb-2.5">
              ${colorDots}
              ${moreColors}
            </div>

            <!-- Title -->
            <h3 class="font-serif-luxury font-bold text-lg md:text-xl text-neutral-800 line-clamp-1 mb-1.5 hover:text-rose-800 transition cursor-pointer" onclick="openQuickView(${product.id})">
              ${escapeHtml(product.name)}
            </h3>

            <!-- Rating & Sold -->
            <div class="flex items-center gap-2 text-xs text-neutral-500 mb-3">
              <span class="flex items-center text-amber-500 font-semibold">
                <i class="fas fa-star text-[11px] mr-1"></i> ${product.rating}
              </span>
              <span>•</span>
              <span>Terjual ${product.soldCount}</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-rose-800 font-extrabold text-lg md:text-xl">
                ${formatRupiah(product.price)}
              </span>
              ${product.originalPrice ? `
                <span class="text-xs text-neutral-400 line-through">
                  ${formatRupiah(product.originalPrice)}
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
            <button 
              onclick="addToCartDirect(${product.id}, '${escapeHtml(defaultColor)}', 1)" 
              class="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95">
              <i class="fas fa-shopping-bag"></i>
              <span>+ Keranjang</span>
            </button>
            <button 
              onclick="buyNowDirect(${product.id}, '${escapeHtml(defaultColor)}')" 
              class="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95">
              <i class="fab fa-whatsapp text-sm"></i>
              <span>Beli via WA</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  sortBy = 'popular';
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'popular';

  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.dataset.category === 'all') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
}

// ==========================================================
// 2. QUICK VIEW & DETAIL MODAL
// ==========================================================
let currentModalProduct = null;
let selectedModalColor = null;

function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  selectedModalColor = product.colors && product.colors.length > 0 ? product.colors[0].name : "Standard";

  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;

  const colorOptionsHtml = product.colors.map((c, idx) => `
    <button 
      type="button"
      onclick="selectModalColor('${c.name}', this)"
      class="color-option-btn px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition ${idx === 0 ? 'border-rose-800 bg-rose-50 text-rose-800 font-bold ring-1 ring-rose-800' : 'border-stone-200 text-neutral-700 hover:border-neutral-400'}">
      <span class="w-3.5 h-3.5 rounded-full inline-block shadow-sm" style="background-color: ${c.hex};"></span>
      <span>${c.name}</span>
    </button>
  `).join('');

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
      <!-- Image Left Column -->
      <div class="relative rounded-2xl overflow-hidden bg-stone-100 aspect-square">
        <img id="modalProductImage" src="${product.image}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover">
        ${product.badge ? `
          <div class="absolute top-4 left-4 z-10">
            <span class="px-3 py-1 text-xs font-bold uppercase rounded-full shadow ${
              product.badge.includes('Best') || product.badge.includes('Terfavorit') ? 'badge-gold' : 'badge-primary'
            }">
              ${product.badge}
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Details Right Column -->
      <div class="flex flex-col justify-between">
        <div>
          <!-- Category & Rating -->
          <div class="flex items-center justify-between text-xs text-neutral-500 mb-2">
            <span class="uppercase tracking-wider font-semibold text-rose-800">${product.category}</span>
            <div class="flex items-center gap-2">
              <span class="flex items-center text-amber-500 font-bold">
                <i class="fas fa-star mr-1"></i> ${product.rating}
              </span>
              <span>•</span>
              <span>Terjual ${product.soldCount}</span>
            </div>
          </div>

          <h2 class="text-2xl md:text-3xl font-serif-luxury font-bold text-neutral-900 mb-2">
            ${escapeHtml(product.name)}
          </h2>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-2xl font-extrabold text-rose-800">
              ${formatRupiah(product.price)}
            </span>
            ${product.originalPrice ? `
              <span class="text-sm text-neutral-400 line-through">
                ${formatRupiah(product.originalPrice)}
              </span>
              <span class="text-xs px-2 py-0.5 bg-red-100 text-red-600 font-bold rounded">
                Hemat ${formatRupiah(product.originalPrice - product.price)}
              </span>
            ` : ''}
          </div>

          <!-- Description -->
          <p class="text-neutral-600 text-sm leading-relaxed mb-5">
            ${escapeHtml(product.description)}
          </p>

          <!-- Specs -->
          <div class="bg-stone-50 rounded-xl p-3.5 mb-5 space-y-2 text-xs">
            <div class="flex items-start">
              <span class="text-neutral-400 w-20 flex-shrink-0 font-medium">Bahan:</span>
              <span class="text-neutral-800 font-semibold">${product.material}</span>
            </div>
            <div class="flex items-start">
              <span class="text-neutral-400 w-20 flex-shrink-0 font-medium">Ukuran:</span>
              <span class="text-neutral-800 font-semibold">${product.size}</span>
            </div>
          </div>

          <!-- Color Variants -->
          <div class="mb-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-neutral-800">Pilihan Warna:</span>
              <span id="selectedColorLabel" class="text-xs font-bold text-rose-800">${selectedModalColor}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              ${colorOptionsHtml}
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="flex items-center gap-4 mb-6">
            <span class="text-xs font-semibold text-neutral-800">Jumlah:</span>
            <div class="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
              <button type="button" onclick="adjustModalQty(-1)" class="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-stone-200 font-bold">-</button>
              <input id="modalQtyInput" type="number" value="1" min="1" max="99" class="w-12 text-center bg-transparent text-sm font-semibold border-none focus:outline-none" readonly />
              <button type="button" onclick="adjustModalQty(1)" class="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-stone-200 font-bold">+</button>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-200">
          <button 
            type="button"
            onclick="addModalProductToCart()" 
            class="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition active:scale-95">
            <i class="fas fa-shopping-bag"></i>
            <span>Tambah ke Keranjang</span>
          </button>
          <button 
            type="button"
            onclick="buyModalProductDirectWhatsApp()" 
            class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition active:scale-95">
            <i class="fab fa-whatsapp text-lg"></i>
            <span>Beli Sekarang via WA</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function selectModalColor(colorName, btnElement) {
  selectedModalColor = colorName;
  const label = document.getElementById('selectedColorLabel');
  if (label) label.textContent = colorName;

  document.querySelectorAll('.color-option-btn').forEach(btn => {
    btn.classList.remove('border-rose-800', 'bg-rose-50', 'text-rose-800', 'font-bold', 'ring-1', 'ring-rose-800');
    btn.classList.add('border-stone-200', 'text-neutral-700');
  });

  if (btnElement) {
    btnElement.classList.remove('border-stone-200', 'text-neutral-700');
    btnElement.classList.add('border-rose-800', 'bg-rose-50', 'text-rose-800', 'font-bold', 'ring-1', 'ring-rose-800');
  }
}

function adjustModalQty(delta) {
  const input = document.getElementById('modalQtyInput');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
}

function addModalProductToCart() {
  if (!currentModalProduct) return;
  const qtyInput = document.getElementById('modalQtyInput');
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
  addToCart(currentModalProduct, selectedModalColor, qty);
  closeQuickView();
  showToast(`Berhasil menambahkan ${currentModalProduct.name} (${selectedModalColor}) ke keranjang!`);
}

function buyModalProductDirectWhatsApp() {
  if (!currentModalProduct) return;
  const qtyInput = document.getElementById('modalQtyInput');
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
  
  // Directly open checkout modal with this single product pre-selected
  openSingleProductCheckout(currentModalProduct, selectedModalColor, qty);
  closeQuickView();
}

// ==========================================================
// 3. CART MANAGEMENT
// ==========================================================
function addToCartDirect(productId, colorName, qty = 1) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, colorName, qty);
  showToast(`"${product.name}" ditambahkan ke keranjang belanja!`);
}

function addToCart(product, color, qty = 1) {
  const existingIndex = cart.findIndex(item => item.id === product.id && item.color === color);
  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: color,
      qty: qty
    });
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('shofie_hijab_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countBadge = document.getElementById('cartCountBadge');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (countBadge) {
    countBadge.textContent = totalItems;
    if (totalItems > 0) {
      countBadge.classList.remove('hidden');
      countBadge.classList.add('flex');
    } else {
      countBadge.classList.add('hidden');
      countBadge.classList.remove('flex');
    }
  }

  // Update Drawer list
  const cartList = document.getElementById('cartItemsList');
  const cartFooter = document.getElementById('cartDrawerFooter');
  const emptyState = document.getElementById('cartEmptyState');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');

  if (!cartList) return;

  if (cart.length === 0) {
    if (cartList) cartList.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (cartFooter) cartFooter.classList.remove('hidden');

  let subtotal = 0;

  cartList.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="flex gap-3 py-3 border-b border-stone-100 items-center">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" class="w-16 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-neutral-800 line-clamp-1">${escapeHtml(item.name)}</h4>
          <p class="text-[11px] text-neutral-500 mb-1">Varian: <span class="font-medium text-rose-800">${escapeHtml(item.color)}</span></p>
          <div class="text-xs font-bold text-rose-800">${formatRupiah(item.price)}</div>
        </div>
        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
          <button onclick="removeCartItem(${index})" class="text-neutral-400 hover:text-red-500 text-xs transition" title="Hapus item">
            <i class="fas fa-trash-alt"></i>
          </button>
          <div class="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
            <button onclick="changeCartItemQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-stone-200 font-bold">-</button>
            <span class="w-7 text-center text-xs font-semibold">${item.qty}</span>
            <button onclick="changeCartItemQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-stone-200 font-bold">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatRupiah(subtotal);
  }
}

function changeCartItemQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast(`Item "${removedName}" dihapus dari keranjang`);
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// ==========================================================
// 4. WHATSAPP CHECKOUT ENGINE
// ==========================================================
let checkoutItems = [];

function openCartCheckout() {
  if (cart.length === 0) {
    showToast("Keranjang belanja kamu masih kosong! Silakan pilih hijab favoritmu.");
    return;
  }
  checkoutItems = [...cart];
  closeCartDrawer();
  showCheckoutModal();
}

function buyNowDirect(productId, defaultColor) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  openSingleProductCheckout(product, defaultColor, 1);
}

function openSingleProductCheckout(product, color, qty) {
  checkoutItems = [{
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    color: color,
    qty: qty
  }];
  showCheckoutModal();
}

function showCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  renderCheckoutSummary();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function renderCheckoutSummary() {
  const listContainer = document.getElementById('checkoutProductsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const discountEl = document.getElementById('checkoutDiscount');
  const totalEl = document.getElementById('checkoutGrandTotal');
  const couponNoticeEl = document.getElementById('couponNotice');

  if (!listContainer) return;

  let subtotal = 0;
  listContainer.innerHTML = checkoutItems.map(item => {
    const total = item.price * item.qty;
    subtotal += total;
    return `
      <div class="flex justify-between items-center text-xs py-1.5 border-b border-stone-100">
        <div>
          <span class="font-bold text-neutral-800">${escapeHtml(item.name)}</span>
          <span class="text-neutral-500 block text-[11px]">Varian: ${escapeHtml(item.color)} × ${item.qty} pcs</span>
        </div>
        <span class="font-bold text-neutral-800">${formatRupiah(total)}</span>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);

  let grandTotal = subtotal - activeDiscount;
  if (grandTotal < 0) grandTotal = 0;

  if (discountEl) {
    discountEl.textContent = activeDiscount > 0 ? `- ${formatRupiah(activeDiscount)}` : 'Rp 0';
  }
  if (totalEl) totalEl.textContent = formatRupiah(grandTotal);

  if (couponNoticeEl) {
    if (activeDiscount > 0) {
      couponNoticeEl.innerHTML = `<span class="text-emerald-700 text-xs font-semibold flex items-center gap-1"><i class="fas fa-check-circle"></i> Kupon "${appliedCouponCode}" aktif (Hemat ${formatRupiah(activeDiscount)})</span>`;
    } else {
      couponNoticeEl.innerHTML = '';
    }
  }

  updateLiveWaMessagePreview();
}

function applyCoupon() {
  const couponInput = document.getElementById('couponInput');
  if (!couponInput) return;

  const code = couponInput.value.trim().toUpperCase();
  if (code === STORE_CONFIG.defaultCoupon.code) {
    activeDiscount = STORE_CONFIG.defaultCoupon.discount;
    appliedCouponCode = code;
    showToast(`Selamat! Kupon diskon Rp ${formatRupiah(activeDiscount)} berhasil diterapkan.`);
  } else if (code === 'HIJABCANTIK') {
    activeDiscount = 15000;
    appliedCouponCode = code;
    showToast("Selamat! Diskon Rp 15.000 berhasil diterapkan!");
  } else {
    showToast("Kode kupon tidak valid atau sudah kadaluarsa.");
    activeDiscount = 0;
    appliedCouponCode = '';
  }
  renderCheckoutSummary();
}

function updateLiveWaMessagePreview() {
  const previewBox = document.getElementById('waMessagePreview');
  if (!previewBox) return;

  const name = document.getElementById('customerName')?.value.trim() || 'Nama Pelanggan';
  const phone = document.getElementById('customerPhone')?.value.trim() || '-';
  const address = document.getElementById('customerAddress')?.value.trim() || 'Alamat Belum Diisi';
  const courier = document.getElementById('customerCourier')?.value || 'J&T Express';
  const payment = document.getElementById('customerPayment')?.value || 'Transfer BCA';
  const note = document.getElementById('customerNotes')?.value.trim() || '-';

  const message = generateWhatsAppMessage(name, phone, address, courier, payment, note);
  previewBox.textContent = message;
}

function generateWhatsAppMessage(name, phone, address, courier, payment, note) {
  let subtotal = 0;
  const itemsText = checkoutItems.map((item, idx) => {
    const total = item.price * item.qty;
    subtotal += total;
    return `${idx + 1}. *${item.name}*\n   • Varian: ${item.color}\n   • Jumlah: ${item.qty} pcs\n   • Total: ${formatRupiah(total)}`;
  }).join('\n\n');

  const grandTotal = Math.max(0, subtotal - activeDiscount);

  const discountText = activeDiscount > 0 ? `\nDiskon Kupon (${appliedCouponCode}): -${formatRupiah(activeDiscount)}` : '';

  return `Halo Admin *${STORE_CONFIG.name}*, saya mau konfirmasi pemesanan hijab:

🛍️ *DETAIL PESANAN:*
${itemsText}

------------------------------------
Subtotal: ${formatRupiah(subtotal)}${discountText}
*ESTIMASI TOTAL: ${formatRupiah(grandTotal)}*
*(belum termasuk ongkir)*
------------------------------------

👤 *DATA PENERIMA:*
• *Nama Lengkap:* ${name}
• *Nomor WhatsApp:* ${phone}
• *Alamat Pengiriman:* ${address}
• *Ekspedisi Pilihan:* ${courier}
• *Metode Pembayaran:* ${payment}
• *Catatan Khusus:* ${note}

Mohon bantuannya untuk cek ketersediaan stok & total ongkir ya min. Terima kasih banyak! ✨`;
}

function submitWhatsAppOrder(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('customerName');
  const phoneInput = document.getElementById('customerPhone');
  const addressInput = document.getElementById('customerAddress');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const courier = document.getElementById('customerCourier')?.value || 'J&T Express';
  const payment = document.getElementById('customerPayment')?.value || 'Transfer BCA';
  const note = document.getElementById('customerNotes')?.value.trim() || '-';

  if (!name || !phone || !address) {
    showToast("Harap isi Nama, Nomor WhatsApp, dan Alamat Lengkap terlebih dahulu!");
    return;
  }

  const message = generateWhatsAppMessage(name, phone, address, courier, payment, note);
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMsg}`;

  // If this was from cart, ask to clear cart
  if (cart.length > 0 && checkoutItems.length === cart.length) {
    clearCart();
  }

  closeCheckoutModal();
  showToast("Membuka WhatsApp untuk konfirmasi pesanan...");

  // Open WhatsApp
  window.open(waUrl, '_blank');
}

// ==========================================================
// 5. TESTIMONIALS & FAQ RENDERING
// ==========================================================
function renderTestimonials() {
  const container = document.getElementById('testimonialsGrid');
  if (!container) return;

  container.innerHTML = testimonialsData.map(item => `
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
          ${'<i class="fas fa-star"></i>'.repeat(item.rating)}
        </div>
        <p class="text-neutral-600 text-sm italic mb-6 leading-relaxed">
          "${escapeHtml(item.comment)}"
        </p>
      </div>
      <div class="flex items-center gap-3 pt-4 border-t border-stone-100">
        <img src="${item.avatar}" alt="${escapeHtml(item.name)}" class="w-11 h-11 rounded-full object-cover border border-rose-200">
        <div>
          <h4 class="text-sm font-bold text-neutral-800">${escapeHtml(item.name)}</h4>
          <p class="text-[11px] text-neutral-400">${escapeHtml(item.city)} • <span class="text-rose-800 font-medium">${escapeHtml(item.productBought)}</span></p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFaqs() {
  const container = document.getElementById('faqsAccordion');
  if (!container) return;

  container.innerHTML = faqsData.map((faq, index) => `
    <div class="border border-stone-200 rounded-2xl overflow-hidden bg-white">
      <button 
        type="button" 
        onclick="toggleFaq(${index})" 
        class="w-full p-5 text-left font-semibold text-neutral-800 flex items-center justify-between gap-4 hover:bg-stone-50 transition">
        <span class="text-sm md:text-base">${escapeHtml(faq.question)}</span>
        <i id="faq-icon-${index}" class="fas fa-chevron-down text-neutral-400 text-xs transition-transform duration-300"></i>
      </button>
      <div id="faq-ans-${index}" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out px-5 bg-stone-50/50">
        <p class="text-xs md:text-sm text-neutral-600 py-4 border-t border-stone-100 leading-relaxed">
          ${escapeHtml(faq.answer)}
        </p>
      </div>
    </div>
  `).join('');
}

function toggleFaq(index) {
  const content = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!content || !icon) return;

  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

  // Close all other FAQs
  faqsData.forEach((_, i) => {
    const otherContent = document.getElementById(`faq-ans-${i}`);
    const otherIcon = document.getElementById(`faq-icon-${i}`);
    if (otherContent) otherContent.style.maxHeight = '0px';
    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
  });

  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + 40 + 'px';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ==========================================================
// 6. UTILITIES & EVENT LISTENERS
// ==========================================================
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  const toast = document.getElementById('notificationToast');
  const text = document.getElementById('toastMessageText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3500);
}

function setupEventListeners() {
  // Category Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // Navbar scroll style
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Checkout inputs live preview update
  ['customerName', 'customerPhone', 'customerAddress', 'customerCourier', 'customerPayment', 'customerNotes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateLiveWaMessagePreview);
      el.addEventListener('change', updateLiveWaMessagePreview);
    }
  });

  // Close modals on overlay click or Escape
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
      closeCheckoutModal();
    }
  });
}

// Countdown timer for Flash Sale
function initCountdownTimer() {
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');
  if (!hoursEl || !minutesEl || !secondsEl) return;

  // Set 8 hours countdown from load
  let totalSeconds = 8 * 3600 + 45 * 60 + 30;

  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 12 * 3600;
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Live Sales Popup Simulation
function startLivePurchaseNotifications() {
  const toast = document.getElementById('livePurchaseToast');
  const toastBuyer = document.getElementById('liveToastBuyer');
  const toastProduct = document.getElementById('liveToastProduct');
  const toastTime = document.getElementById('liveToastTime');
  if (!toast || !toastBuyer || !toastProduct) return;

  const samplePurchases = [
    { name: "Dewi Safitri", city: "Surabaya", product: "Pashmina Silk Shimmer" },
    { name: "Anisa Maulida", city: "Bandung", product: "Voal Paris Premium Japan" },
    { name: "Rina Kusuma", city: "Jakarta Selatan", product: "Bergo Maryam Diamond" },
    { name: "Fathia Althaf", city: "Yogyakarta", product: "French Khimar Syar'i 2in1" },
    { name: "Salma Az-Zahra", city: "Medan", product: "Pashmina Ceruty Babydoll" },
    { name: "Hilya Nurul", city: "Semarang", product: "Voal Trypan Laser Cut" }
  ];

  let index = 0;

  function showNextNotification() {
    const item = samplePurchases[index % samplePurchases.length];
    index++;

    toastBuyer.textContent = `${item.name} (${item.city})`;
    toastProduct.textContent = item.product;
    if (toastTime) toastTime.textContent = "Baru saja memesan";

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // First trigger after 6 seconds, then recurring every 22 seconds
  setTimeout(() => {
    showNextNotification();
    setInterval(showNextNotification, 22000);
  }, 6000);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}


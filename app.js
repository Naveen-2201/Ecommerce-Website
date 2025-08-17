/* Clothora — Vanilla JS Store 🔨🤖🔧
 * Features: catalog render, search, filter, sort, pagination, cart with localStorage, mock checkout, theme toggle
 */

/* -------------------- DATA -------------------- */
const PRODUCTS = [
  // id, title, brand, category, sizes, colors, price, compareAt, rating, createdAt, img, tags
  {
    id: "p1",
    title: "Premium Cotton Tee",
    brand: "Clothora",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    price: 799,
    compareAt: 999,
    rating: 4.5,
    createdAt: "2025-08-01",
    img: "n5.jpg",
    tags: ["tee","basic","cotton"],
  },
  {
    id: "p2",
    title: "Relaxed Denim Jacket",
    brand: "Clothora",
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    price: 2799,
    compareAt: 3499,
    rating: 4.7,
    createdAt: "2025-07-21",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
    tags: ["denim","jacket"],
  },
  {
    id: "p3",
    title: "Athletic Joggers",
    brand: "Move+",
    category: "Men",
    sizes: ["S","M","L","XL"],
    colors: ["Charcoal", "Navy"],
    price: 1599,
    compareAt: 1999,
    rating: 4.2,
    createdAt: "2025-06-02",
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=900&auto=format&fit=crop",
    tags: ["athleisure","pants"],
  },
  {
    id: "p4",
    title: "Floral Summer Dress",
    brand: "Bloom",
    category: "Women",
    sizes: ["XS","S","M","L"],
    colors: ["Floral"],
    price: 1899,
    compareAt: 0,
    rating: 4.8,
    createdAt: "2025-05-12",
    img: "b5.jpg",
    tags: ["dress","summer"],
  },
  {
    id: "p5",
    title: "Kids Graphic Tee",
    brand: "Mini",
    category: "Kids",
    sizes: ["2-3","4-5","6-7","8-9"],
    colors: ["Yellow","Blue"],
    price: 499,
    compareAt: 699,
    rating: 4.4,
    createdAt: "2025-08-05",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=900&auto=format&fit=crop",
    tags: ["kids","tee"],
  },
  {
    id: "p6",
    title: "Classic Chinos",
    brand: "Clothora",
    category: "Men",
    sizes: ["S","M","L","XL"],
    colors: ["Beige","Olive"],
    price: 1799,
    compareAt: 0,
    rating: 4.1,
    createdAt: "2025-04-20",
    img: "pant.jpeg",
    tags: ["pants","chinos"],
  },
  {
    id: "p7",
    title: "Silk Scarf",
    brand: "Clothora",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Multi"],
    price: 999,
    compareAt: 1299,
    rating: 4.6,
    createdAt: "2025-07-11",
    img: "silk.jpg",
    tags: ["scarf","silk"],
  },
  {
    id: "p8",
    title: "Unisex Hoodie",
    brand: "Clothora",
    category: "Sale",
    sizes: ["S","M","L","XL"],
    colors: ["Grey","Black"],
    price: 1299,
    compareAt: 2499,
    rating: 4.3,
    createdAt: "2025-01-10",
    img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=900&auto=format&fit=crop",
    tags: ["hoodie","sale"],
  },
  {
    id: "p9",
    title: "Linen Shirt",
    brand: "Clothora",
    category: "Men",
    sizes: ["S","M","L","XL"],
    colors: ["White","Sage"],
    price: 1499,
    compareAt: 0,
    rating: 4.0,
    createdAt: "2025-06-16",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=900&auto=format&fit=crop",
    tags: ["shirt","linen"],
  },
  {
    id: "p10",
    title: "Knit Cardigan",
    brand: "Bloom",
    category: "Women",
    sizes: ["S","M","L"],
    colors: ["Brown","Cream"],
    price: 2199,
    compareAt: 0,
    rating: 4.5,
    createdAt: "2025-02-14",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop",
    tags: ["knit","cardigan"],
  },
  {
    id: "p11",
    title: "Canvas Tote",
    brand: "Clothora",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Beige"],
    price: 699,
    compareAt: 0,
    rating: 4.2,
    createdAt: "2025-03-01",
    img: "bag.avif",
    tags: ["tote","bag"],
  },
  {
    id: "p12",
    title: "Slim Fit Jeans",
    brand: "Clothora",
    category: "Men",
    sizes: ["S","M","L","XL"],
    colors: ["Indigo"],
    price: 2099,
    compareAt: 2499,
    rating: 4.6,
    createdAt: "2025-05-30",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    tags: ["denim","jeans"],
  },
];

const SIZES = ["XS","S","M","L","XL","2XL","One Size","2-3","4-5","6-7","8-9"];
const CATEGORIES = ["All","Men","Women","Kids","Accessories","Sale"];
const PAGE_SIZE = 8;
const CURRENCY = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/* -------------------- STATE -------------------- */
const state = {
  search: "",
  category: "All",
  size: null,
  minPrice: 0,
  maxPrice: 5000,
  sort: "featured",
  page: 1,
  cart: loadCart(),
  coupon: null, // { code, percent }
  theme: localStorage.getItem("theme") || "light",
};

/* -------------------- HELPERS -------------------- */
function q(sel, root = document) { return root.querySelector(sel); }
function qa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function clamp(n, min, max) { return Math.max(min, Math.min(n, max)); }
function uid() { return Math.random().toString(36).slice(2); }

function saveCart(cart = state.cart) { localStorage.setItem("clothora_cart", JSON.stringify(cart)); }
function loadCart() {
  try { return JSON.parse(localStorage.getItem("clothora_cart")) || []; }
  catch { return []; }
}

/* -------------------- FILTER / SORT / PAGINATION -------------------- */
function applyFilters(products) {
  const { search, category, size, minPrice, maxPrice } = state;
  return products.filter(p => {
    const matchesCat = category === "All" ? true : p.category === category;
    const matchesSearch = !search ? true :
      (p.title + " " + p.brand + " " + p.colors.join(" ") + " " + p.tags.join(" "))
        .toLowerCase().includes(search.toLowerCase());
    const matchesSize = size ? p.sizes.includes(size) : true;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesCat && matchesSearch && matchesSize && matchesPrice;
  });
}

function sortProducts(products) {
  switch (state.sort) {
    case "priceAsc": return products.slice().sort((a,b) => a.price - b.price);
    case "priceDesc": return products.slice().sort((a,b) => b.price - a.price);
    case "ratingDesc": return products.slice().sort((a,b) => b.rating - a.rating);
    case "newest": return products.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    default: return products; // featured
  }
}

function paginate(products) {
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  state.page = clamp(state.page, 1, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  return { totalPages, items: products.slice(start, start + PAGE_SIZE) };
}

/* -------------------- RENDER -------------------- */
function renderFilters() {
  // Categories
  const catWrap = q("#filterCategories");
  catWrap.innerHTML = "";
  CATEGORIES.filter(Boolean).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip" + (state.category === cat ? " chip--active" : "");
    btn.textContent = cat;
    btn.setAttribute("data-cat", cat);
    btn.addEventListener("click", () => {
      state.category = cat;
      // Also sync nav highlight
      qa(".nav__link").forEach(a => a.classList.toggle("active", a.dataset.cat === cat));
      state.page = 1;
      update();
    });
    catWrap.appendChild(btn);
  });

  // Sizes
  const sizeWrap = q("#filterSizes");
  sizeWrap.innerHTML = "";
  SIZES.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "chip" + (state.size === s ? " chip--active" : "");
    btn.textContent = s;
    btn.addEventListener("click", () => {
      state.size = (state.size === s ? null : s);
      state.page = 1;
      update();
    });
    sizeWrap.appendChild(btn);
  });

  // Price inputs
  q("#minPrice").value = state.minPrice;
  q("#maxPrice").value = state.maxPrice;
}

function renderCatalog() {
  const filtered = sortProducts(applyFilters(PRODUCTS));
  const { items, totalPages } = paginate(filtered);
  q("#resultTitle").textContent = state.category === "All" ? "All Products" : state.category;
  q("#resultCount").textContent = `${filtered.length} item${filtered.length === 1 ? "" : "s"}`;
  const grid = q("#productGrid");
  grid.innerHTML = items.map(cardHTML).join("");

  // Wire card buttons
  qa(".btn-add").forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const qty = parseInt(q(`#qty-${id}`)?.value || "1", 10);
    addToCart(id, qty);
  }));

  // Pagination
  renderPagination(totalPages);
}

function cardHTML(p) {
  const discount = p.compareAt && p.compareAt > p.price ? Math.round((1 - (p.price / p.compareAt)) * 100) : 0;
  const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
  return `
    <article class="card" aria-label="${p.title}">
      <div style="position:relative">
        ${discount ? `<span class="badge-pill">-${discount}%</span>` : ""}
        <img class="card__img" src="${p.img}" alt="${p.title}" loading="lazy">
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <div class="muted">${p.brand} • ${p.category}</div>
        <div class="stars" aria-label="Rated ${p.rating} out of 5">${stars}</div>
        <div class="card__meta">
          <div class="price">
            ${CURRENCY.format(p.price)}
            ${p.compareAt ? `<span class="strike">${CURRENCY.format(p.compareAt)}</span>` : ""}
          </div>
          <div class="muted">Sizes: ${p.sizes.join(", ")}</div>
        </div>
      </div>
      <div class="card__footer">
        <div class="qty">
          <label for="qty-${p.id}" class="muted">Qty</label>
          <input id="qty-${p.id}" type="number" min="1" value="1">
        </div>
        <button class="btn btn--primary btn-add" data-id="${p.id}">Add to Cart</button>
        <button class="btn alt" onclick="quickBuy('${p.id}')">Buy Now</button>
      </div>
    </article>
  `;
}

function renderPagination(totalPages) {
  const pager = q("#pagination");
  if (totalPages <= 1) { pager.innerHTML = ""; return; }
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${state.page === i ? "active" : ""}" data-page="${i}">${i}</button>`;
  }
  pager.innerHTML = html;
  qa(".page-btn", pager).forEach(btn => btn.addEventListener("click", () => {
    state.page = parseInt(btn.dataset.page, 10);
    renderCatalog();
    window.scrollTo({ top: q(".main").offsetTop - 20, behavior: "smooth" });
  }));
}

/* -------------------- CART -------------------- */
function addToCart(productId, qty = 1, extra = {}) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) existing.qty = clamp(existing.qty + qty, 1, 99);
  else state.cart.push({ id: productId, qty: clamp(qty, 1, 99), ...extra });

  saveCart();
  renderCart();
  openCart();
  toast(`${product.title} added to cart`);
}
function quickBuy(productId) {
  addToCart(productId, 1);
  openCart();
}
function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
}
function updateQty(productId, qty) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = clamp(qty, 1, 99);
  saveCart();
  renderCartTotals();
  renderCartItems(); // minimal rerender
}

function cartTotals() {
  const lines = state.cart.map(ci => {
    const p = PRODUCTS.find(pp => pp.id === ci.id);
    const price = p.price * ci.qty;
    return price;
  });
  const subtotal = lines.reduce((a,b) => a + b, 0);
  const shipping = subtotal > 2999 ? 0 : (subtotal ? 149 : 0);
  const tax = Math.round(subtotal * 0.05);
  const discount = state.coupon ? Math.round(subtotal * (state.coupon.percent / 100)) : 0;
  const total = Math.max(0, subtotal - discount) + shipping + tax;
  return { subtotal, shipping, tax, discount, total };
}

function renderCart() {
  renderCartItems();
  renderCartTotals();
  q("#cartCount").textContent = state.cart.reduce((a,b) => a + b.qty, 0);
}
function renderCartItems() {
  const wrap = q("#cartItems");
  if (state.cart.length === 0) {
    wrap.innerHTML = `<p class="muted center">Your cart is empty.</p>`;
    return;
  }
  wrap.innerHTML = state.cart.map(ci => {
    const p = PRODUCTS.find(pp => pp.id === ci.id);
    return `
      <div class="cart-item" aria-label="${p.title}">
        <img src="${p.img}" alt="${p.title}">
        <div>
          <div class="title">${p.title}</div>
          <div class="muted">${p.brand} • ${p.category}</div>
          <div class="muted">${CURRENCY.format(p.price)} × 
            <input type="number" min="1" max="99" value="${ci.qty}" data-id="${p.id}" class="qty-input" style="width:56px">
          </div>
        </div>
        <div class="actions">
          <strong>${CURRENCY.format(p.price * ci.qty)}</strong>
          <button class="trash" aria-label="Remove item" data-id="${p.id}">🗑️</button>
        </div>
      </div>
    `;
  }).join("");

  // Wire qty and delete
  qa(".qty-input", wrap).forEach(inp => inp.addEventListener("change", () => updateQty(inp.dataset.id, parseInt(inp.value, 10) || 1)));
  qa(".trash", wrap).forEach(btn => btn.addEventListener("click", () => removeFromCart(btn.dataset.id)));
}
function renderCartTotals() {
  const { subtotal, shipping, tax, discount, total } = cartTotals();
  q("#subtotal").textContent = CURRENCY.format(subtotal);
  q("#shipping").textContent = CURRENCY.format(shipping);
  q("#tax").textContent = CURRENCY.format(tax);
  q("#grandTotal").textContent = CURRENCY.format(total);

  const msg = q("#couponMsg");
  if (state.coupon) msg.textContent = `Applied ${state.coupon.code} (-${state.coupon.percent}%)`;
  else msg.textContent = "";
}

/* -------------------- UI OPEN/CLOSE -------------------- */
function openCart() { q("#cartDrawer").setAttribute("aria-hidden", "false"); q("#btnCart").setAttribute("aria-expanded", "true"); }
function closeCart() { q("#cartDrawer").setAttribute("aria-hidden", "true"); q("#btnCart").setAttribute("aria-expanded", "false"); }
function openCheckout() { q("#checkoutModal").setAttribute("aria-hidden","false"); }
function closeCheckout() { q("#checkoutModal").setAttribute("aria-hidden","true"); }

/* -------------------- EVENTS & INIT -------------------- */
function bindEvents() {
  // Search
  q("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.search = q("#searchInput").value.trim();
    state.page = 1;
    update();
  });

  // Nav -> Category
  qa(".nav__link").forEach(a => a.addEventListener("click", (e) => {
    e.preventDefault();
    state.category = a.dataset.cat;
    qa(".nav__link").forEach(x => x.classList.toggle("active", x === a));
    state.page = 1;
    update();
    if (window.innerWidth <= 800) toggleMobileMenu(false);
  }));

  // Price
  q("#btnApplyPrice").addEventListener("click", () => {
    state.minPrice = Math.max(0, parseInt(q("#minPrice").value || "0", 10));
    state.maxPrice = Math.max(state.minPrice, parseInt(q("#maxPrice").value || "5000", 10));
    state.page = 1;
    update();
  });

  // Sort
  q("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; state.page = 1; update(); });

  // Clear filters
  q("#btnClearFilters").addEventListener("click", () => {
    state.search = ""; q("#searchInput").value = "";
    state.category = "All"; qa(".nav__link").forEach(a => a.classList.toggle("active", a.dataset.cat === "All"));
    state.size = null; state.minPrice = 0; state.maxPrice = 5000; state.sort = "featured"; state.page = 1;
    renderFilters(); update();
  });

  // Hero CTA
  q("#shopNow").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: q(".main").offsetTop - 10, behavior: "smooth" }); });

  // Drawer open/close
  q("#btnCart").addEventListener("click", openCart);
  q("#btnCloseCart").addEventListener("click", closeCart);
  q("#cartBackdrop").addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeCheckout(); } });

  // Coupon
  q("#couponForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = q("#couponInput").value.trim().toUpperCase();
    const valid = [
      { code: "WELCOME10", percent: 10 },
      { code: "FALL15", percent: 15 },
      { code: "SAVE20", percent: 20 },
    ].find(c => c.code === code);
    if (valid) { state.coupon = valid; renderCartTotals(); toast(`Coupon ${code} applied ✔️`); }
    else { state.coupon = null; renderCartTotals(); toast("Invalid coupon ❗"); }
  });

  // Checkout
  q("#btnCheckout").addEventListener("click", () => { if (!state.cart.length) return toast("Cart is empty 🤔"); openCheckout(); });
  q("#btnCloseCheckout").addEventListener("click", closeCheckout);
  q("#checkoutBackdrop").addEventListener("click", closeCheckout);
  q("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Simple validation done by HTML5; simulate success
    const orderId = `ORD-${uid().slice(0,6).toUpperCase()}`;
    const { total } = cartTotals();
    toast(`Payment successful! Order ${orderId} placed for ${CURRENCY.format(total)} 🎉`);
    state.cart = []; saveCart(); renderCart(); closeCheckout(); closeCart();
  });

  // Newsletter
  q("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = q("#newsletterEmail").value.trim();
    if (!email) return;
    toast("Subscribed! 💌");
    q("#newsletterEmail").value = "";
    q("#newsletterMsg").textContent = "Thanks for subscribing.";
  });

  // Theme
  q("#btnTheme").addEventListener("click", toggleTheme);

  // Mobile menu
  q("#btnMobileMenu").addEventListener("click", () => toggleMobileMenu());
}

function toggleTheme() {
  state.theme = (state.theme === "light" ? "dark" : "light");
  applyTheme();
  localStorage.setItem("theme", state.theme);
}
function applyTheme() {
  if (state.theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
}

function toggleMobileMenu(force) {
  const nav = q("#mainNav");
  const btn = q("#btnMobileMenu");
  const show = typeof force === "boolean" ? force : nav.style.display !== "flex";
  nav.style.display = show ? "flex" : "none";
  btn.setAttribute("aria-expanded", String(show));
}

/* -------------------- TOAST -------------------- */
let toastTimer;
function toast(msg = "") {
  let el = q("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    Object.assign(el.style, {
      position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: "24px",
      background: "rgba(30, 41, 59, .92)", color: "#fff", padding: "10px 14px", borderRadius: "12px", zIndex: 200,
      boxShadow: "0 10px 20px rgba(0,0,0,.25)", maxWidth: "90vw", textAlign: "center"
    });
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.opacity = "0"; }, 1800);
}

/* -------------------- MASTER UPDATE -------------------- */
function update() {
  renderFilters();
  renderCatalog();
  renderCart();
}

/* -------------------- BOOT -------------------- */
function boot() {
  bindEvents();
  renderFilters();
  renderCatalog();
  renderCart();
  applyTheme();
  // Set active nav link on load
  qa(".nav__link").forEach(a => a.classList.toggle("active", a.dataset.cat === state.category));
  // Footer year
  q("#year").textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", boot);

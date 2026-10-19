/* ============================================================
   HIRANYA — cart.js
   Cart state: [{ id, qty, size }] persisted via HiranyaStore.
   Powers both the slide-in cart drawer (every page) and the
   full cart.html page.
   ============================================================ */

const SHIPPING_FLAT = 0;          // complimentary shipping, per DESIGN.md trust bar
const GST_RATE = 0.03;            // 3% GST, typical for jewellery in India

/**
 * Adds a product to the cart at a specific size. The size's own price and
 * stock (see products.js normalization) decide what gets charged and how
 * many can be added — the cart line stores a `price` snapshot so totals
 * stay correct even if the catalog changes later.
 */
function addToCart(productId, qty = 1, size = null) {
  const product = getProductById(productId);
  if (!product) return;

  const sizeOption = getSizeOption(product, size);
  if (!sizeOption) return;

  if (sizeOption.stock <= 0) {
    hiranyaToast(`${product.name} — Size ${sizeOption.label} is out of stock`, "error");
    return;
  }

  const cart = HiranyaStore.getCart();
  const existing = cart.find(item => item.id === productId && item.size === sizeOption.label);
  const alreadyInCart = existing ? existing.qty : 0;

  if (alreadyInCart + qty > sizeOption.stock) {
    const room = Math.max(0, sizeOption.stock - alreadyInCart);
    if (room <= 0) {
      hiranyaToast(`You already have all ${sizeOption.stock} available in size ${sizeOption.label}`, "warning");
      return;
    }
    hiranyaToast(`Only ${sizeOption.stock} left in size ${sizeOption.label} — added ${room}`, "warning");
    qty = room;
  }

  if (existing) {
    existing.qty += qty;
    existing.price = sizeOption.price; // keep the snapshot in sync with current size pricing
  } else {
    cart.push({ id: productId, qty, size: sizeOption.label, price: sizeOption.price });
  }
  HiranyaStore.setCart(cart);
  HiranyaNotify.addedToBag(product.name);
  renderCartDrawer();
  if (document.body.dataset.page === "cart") renderCartPage();
}

function removeFromCart(productId, size = null) {
  const product = getProductById(productId);
  const cart = HiranyaStore.getCart().filter(item => !(item.id === productId && item.size === size));
  HiranyaStore.setCart(cart);
  HiranyaNotify.removedFromBag(product && product.name);
  renderCartDrawer();
  if (document.body.dataset.page === "cart") renderCartPage();
}

function updateCartQty(productId, size, delta) {
  const cart = HiranyaStore.getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (!item) return;

  const newQty = item.qty + delta;
  if (newQty <= 0) {
    return removeFromCart(productId, size);
  }

  if (delta > 0) {
    const product = getProductById(productId);
    const sizeOption = product && getSizeOption(product, size);
    if (sizeOption && newQty > sizeOption.stock) {
      hiranyaToast(`Only ${sizeOption.stock} left in size ${size}`, "warning");
      return;
    }
  }

  item.qty = newQty;
  HiranyaStore.setCart(cart);
  renderCartDrawer();
  if (document.body.dataset.page === "cart") renderCartPage();
}

function clearCart() {
  HiranyaStore.setCart([]);
  HiranyaNotify.cartCleared();
  renderCartDrawer();
  if (document.body.dataset.page === "cart") renderCartPage();
}

function getCartLines() {
  return HiranyaStore.getCart()
    .map(item => ({ ...item, product: getProductById(item.id) }))
    .filter(line => line.product)
    // Fallback for any cart data saved before per-size pricing existed.
    .map(line => ({ ...line, price: line.price ?? getSizeOption(line.product, line.size)?.price ?? line.product.price }));
}

function getCartTotals() {
  const lines = getCartLines();
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const savings = lines.reduce((sum, l) => {
    if (!l.product.originalPrice) return sum;
    return sum + Math.max(0, l.product.originalPrice - l.price) * l.qty;
  }, 0);
  const tax = Math.round(subtotal * GST_RATE);
  const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + tax + shipping;
  return { subtotal, savings, tax, shipping, total, itemCount: lines.reduce((s, l) => s + l.qty, 0) };
}

/* ---------- Drawer (present on every page via #cartOffcanvas) ---------- */
function renderCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  const footer = document.getElementById("cartDrawerFooter");
  if (!body) return;

  const lines = getCartLines();

  if (!lines.length) {
    body.innerHTML = `
      <div class="empty-state py-5">
        <span class="material-symbols-outlined">shopping_bag</span>
        <p class="body-md text-on-surface-var mb-0">Your bag is empty.</p>
        <p class="body-md text-on-surface-var">Pieces you add will appear here.</p>
      </div>`;
    if (footer) footer.classList.add("d-none");
    return;
  }

  if (footer) footer.classList.remove("d-none");
  body.innerHTML = lines.map(cartLineHTML).join("");

  const totals = getCartTotals();
  const subtotalEl = document.getElementById("cartDrawerSubtotal");
  if (subtotalEl) subtotalEl.textContent = formatINR(totals.subtotal);
}

function cartLineHTML(line) {
  const { product, qty, size, price } = line;
  return `
    <div class="d-flex gap-3 py-3 border-bottom" style="border-color: var(--hiranya-outline-variant) !important;">
      <img src="${product.images[0]}" alt="${product.name}" style="width:72px;height:88px;object-fit:cover;">
      <div class="flex-grow-1">
        <p class="title-md mb-0" style="font-size:16px;">${product.name}</p>
        <p class="body-md text-on-surface-var mb-1" style="font-size:13px;">${size ? "Size: " + size : product.metal}</p>
        <p class="body-md fw-semibold mb-2">${formatINR(price)}</p>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-hiranya-ghost hairline px-2 py-0" aria-label="Decrease quantity" onclick="updateCartQty('${product.id}', ${size ? `'${size}'` : null}, -1)">−</button>
          <span style="min-width:20px;text-align:center;">${qty}</span>
          <button class="btn btn-sm btn-hiranya-ghost hairline px-2 py-0" aria-label="Increase quantity" onclick="updateCartQty('${product.id}', ${size ? `'${size}'` : null}, 1)">+</button>
          <button class="btn btn-sm btn-hiranya-ghost ms-auto" aria-label="Remove ${product.name}" onclick="removeFromCart('${product.id}', ${size ? `'${size}'` : null})">
            <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
          </button>
        </div>
      </div>
    </div>`;
}

/* ---------- Full cart page ---------- */
function renderCartPage() {
  const container = document.getElementById("cartPageLines");
  const emptyState = document.getElementById("cartPageEmpty");
  const summary = document.getElementById("cartPageSummary");
  if (!container) return;

  const lines = getCartLines();

  if (!lines.length) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    if (summary) summary.classList.add("d-none");
    return;
  }

  if (emptyState) emptyState.classList.add("d-none");
  if (summary) summary.classList.remove("d-none");

  container.innerHTML = lines.map(line => `
    <div class="row align-items-center py-4 border-bottom" style="border-color: var(--hiranya-outline-variant) !important;">
      <div class="col-3 col-md-2">
        <img src="${line.product.images[0]}" alt="${line.product.name}" class="w-100" style="aspect-ratio:4/5;object-fit:cover;">
      </div>
      <div class="col-9 col-md-4">
        <p class="title-md mb-1"><a href="product-details.html?id=${line.product.id}" class="text-decoration-none text-primary-brand">${line.product.name}</a></p>
        <p class="body-md text-on-surface-var mb-0">${line.product.metal}</p>
        ${line.size ? `<p class="body-md text-on-surface-var mb-0">Size: ${line.size}</p>` : ""}
      </div>
      <div class="col-6 col-md-3 mt-3 mt-md-0">
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-hiranya-ghost hairline px-3" onclick="updateCartQty('${line.product.id}', ${line.size ? `'${line.size}'` : null}, -1)">−</button>
          <span>${line.qty}</span>
          <button class="btn btn-hiranya-ghost hairline px-3" onclick="updateCartQty('${line.product.id}', ${line.size ? `'${line.size}'` : null}, 1)">+</button>
        </div>
      </div>
      <div class="col-4 col-md-2 mt-3 mt-md-0 text-md-end">
        <p class="fw-semibold mb-0">${formatINR(line.price * line.qty)}</p>
        ${line.qty > 1 ? `<p class="body-md text-on-surface-var mb-0" style="font-size:12px;">${formatINR(line.price)} each</p>` : ""}
      </div>
      <div class="col-2 col-md-1 mt-3 mt-md-0 text-end">
        <button class="btn btn-hiranya-ghost" aria-label="Remove ${line.product.name}" onclick="removeFromCart('${line.product.id}', ${line.size ? `'${line.size}'` : null})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  `).join("");

  const totals = getCartTotals();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("summarySubtotal", formatINR(totals.subtotal));
  set("summaryTax", formatINR(totals.tax));
  set("summaryShipping", totals.shipping === 0 ? "Complimentary" : formatINR(totals.shipping));
  set("summaryTotal", formatINR(totals.total));
  const savingsRow = document.getElementById("summarySavingsRow");
  if (savingsRow) {
    if (totals.savings > 0) {
      savingsRow.classList.remove("d-none");
      set("summarySavings", "− " + formatINR(totals.savings));
    } else {
      savingsRow.classList.add("d-none");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartDrawer();
  if (document.body.dataset.page === "cart") renderCartPage();
});

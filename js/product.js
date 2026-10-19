/* ============================================================
   HIRANYA — product.js
   Drives product-details.html. Reads ?id=<product-id> from the
   URL, hydrates the whole page from HIRANYA_PRODUCTS, and wires
   gallery switching, size selection, quantity, add-to-bag/buy-now.
   ============================================================ */

let currentProduct = null;
let selectedSize = null;
let selectedQty = 1;

function initProductPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || HIRANYA_PRODUCTS[0].id;
  currentProduct = getProductById(id);

  if (!currentProduct) {
    document.getElementById("productContent").innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">diamond</span>
        <p class="title-md mb-1">This piece is unavailable</p>
        <p class="body-md text-on-surface-var mb-4">It may have sold or been retired from the collection.</p>
        <a href="shop.html" class="btn btn-hiranya-primary">Browse the Collection</a>
      </div>`;
    return;
  }

  // Default to the first in-stock size where possible, so shoppers don't
  // land on a sold-out variant by accident.
  const firstInStock = currentProduct.sizeOptions.find(s => s.stock > 0);
  selectedSize = (firstInStock || currentProduct.sizeOptions[0]).label;
  selectedQty = 1;
  renderProduct();
}

function renderProduct() {
  const p = currentProduct;
  document.title = `HIRANYA — ${p.name}`;

  document.getElementById("breadcrumbCollection").textContent = p.collection;
  document.getElementById("productName").textContent = p.name;

  document.getElementById("productDescription").textContent = p.description;
  document.getElementById("specMetal").textContent = p.metal;
  document.getElementById("specStones").textContent = p.purity;

  renderGallery();
  renderSizeSelector();
  updatePriceAndAvailability();

  const wishBtn = document.getElementById("productWishlistBtn");
  if (wishBtn) wishBtn.setAttribute("data-product-id", p.id);
  refreshWishlistButtons();

  const relatedGrid = document.getElementById("relatedGrid");
  if (relatedGrid) {
    const related = getRelatedProducts(p, 4);
    relatedGrid.innerHTML = related.map(r => productCardHTML(r)).join("");
  }
}

function renderGallery() {
  const main = document.getElementById("mainProductImage");
  const thumbWrap = document.getElementById("thumbnailStrip");
  if (!main || !thumbWrap) return;

  main.src = currentProduct.images[0];
  main.alt = currentProduct.name;

  thumbWrap.innerHTML = currentProduct.images.map((src, i) => `
    <button type="button" class="thumb-btn ${i === 0 ? "active" : ""}" data-thumb-index="${i}" aria-label="View image ${i + 1} of ${currentProduct.name}">
      <img src="${src}" alt="">
    </button>`).join("");

  thumbWrap.querySelectorAll("[data-thumb-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-thumb-index"));
      main.src = currentProduct.images[idx];
      thumbWrap.querySelectorAll(".thumb-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function renderSizeSelector() {
  const wrap = document.getElementById("sizeSelector");
  if (!wrap) return;
  wrap.innerHTML = currentProduct.sizeOptions.map(opt => `
    <button type="button"
      class="size-btn ${opt.label === selectedSize ? "active" : ""} ${opt.stock <= 0 ? "out-of-stock" : ""}"
      data-size="${opt.label}"
      ${opt.stock <= 0 ? 'aria-disabled="true" title="Out of stock in this size"' : ""}>
      ${opt.label}
    </button>
  `).join("");

  wrap.querySelectorAll("[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("out-of-stock")) return; // still selectable to view price, but skip silently on tap-to-buy paths
      selectedSize = btn.getAttribute("data-size");
      selectedQty = 1;
      wrap.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updatePriceAndAvailability();
    });
  });
}

/**
 * Re-reads price + stock for the currently selected size and updates the
 * price display, the "in stock / low stock / out of stock" indicator, the
 * quantity stepper's ceiling, and whether Add to Bag / Buy Now are enabled.
 */
function updatePriceAndAvailability() {
  const p = currentProduct;
  const sizeOption = getSizeOption(p, selectedSize);
  if (!sizeOption) return;

  document.getElementById("productPrice").textContent = formatINR(sizeOption.price);

  // Scale the struck-through original price proportionally, so the
  // discount percentage stays consistent across sizes.
  const originalEl = document.getElementById("productOriginalPrice");
  if (originalEl) {
    if (p.originalPrice) {
      const scaledOriginal = Math.round(p.originalPrice * (sizeOption.price / p.price));
      originalEl.textContent = formatINR(scaledOriginal);
      originalEl.classList.remove("d-none");
    } else {
      originalEl.classList.add("d-none");
    }
  }

  // Availability indicator
  const availEl = document.getElementById("availabilityIndicator");
  if (availEl) {
    if (sizeOption.stock <= 0) {
      availEl.className = "availability-indicator availability-out";
      availEl.innerHTML = `<span class="dot"></span> Out of Stock in size ${sizeOption.label}`;
    } else if (sizeOption.stock <= 3) {
      availEl.className = "availability-indicator availability-low";
      availEl.innerHTML = `<span class="dot"></span> Only ${sizeOption.stock} left in size ${sizeOption.label}`;
    } else {
      availEl.className = "availability-indicator availability-in-stock";
      availEl.innerHTML = `<span class="dot"></span> In Stock — ships in 3-5 days`;
    }
  }

  // Clamp quantity to what's actually available in this size
  selectedQty = Math.min(selectedQty, Math.max(1, sizeOption.stock));
  const qtyDisplay = document.getElementById("qtyDisplay");
  if (qtyDisplay) qtyDisplay.textContent = selectedQty;

  const addBtn = document.getElementById("addToBagBtn");
  const buyBtn = document.getElementById("buyNowBtn");
  const outOfStock = sizeOption.stock <= 0;
  [addBtn, buyBtn].forEach(btn => {
    if (!btn) return;
    btn.disabled = outOfStock;
    btn.classList.toggle("disabled", outOfStock);
  });
  if (addBtn) addBtn.innerHTML = outOfStock
    ? `<span class="material-symbols-outlined">block</span> OUT OF STOCK`
    : `<span class="material-symbols-outlined">shopping_bag</span> ADD TO BAG`;

  const increaseBtn = document.getElementById("qtyIncrease");
  if (increaseBtn) increaseBtn.disabled = outOfStock || selectedQty >= sizeOption.stock;
}

function initProductActions() {
  const qtyDisplay = document.getElementById("qtyDisplay");
  document.getElementById("qtyDecrease")?.addEventListener("click", () => {
    selectedQty = Math.max(1, selectedQty - 1);
    if (qtyDisplay) qtyDisplay.textContent = selectedQty;
    updatePriceAndAvailability();
  });
  document.getElementById("qtyIncrease")?.addEventListener("click", () => {
    const sizeOption = getSizeOption(currentProduct, selectedSize);
    const max = sizeOption ? sizeOption.stock : 99;
    if (selectedQty >= max) {
      hiranyaToast(`Only ${max} available in size ${selectedSize}`, "warning");
      return;
    }
    selectedQty += 1;
    if (qtyDisplay) qtyDisplay.textContent = selectedQty;
    updatePriceAndAvailability();
  });

  document.getElementById("addToBagBtn")?.addEventListener("click", () => {
    addToCart(currentProduct.id, selectedQty, selectedSize);
  });

  document.getElementById("buyNowBtn")?.addEventListener("click", () => {
    addToCart(currentProduct.id, selectedQty, selectedSize);
    window.location.href = "cart.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "product") return;
  initProductPage();
  initProductActions();
});

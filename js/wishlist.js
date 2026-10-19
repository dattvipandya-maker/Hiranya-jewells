/* ============================================================
   HIRANYA — wishlist.js
   Wishlist state lives in localStorage via HiranyaStore.
   Any element with [data-wishlist-btn][data-product-id] anywhere
   in the DOM (home, shop, product page, wishlist page) is wired
   up automatically through event delegation, so new product
   cards rendered dynamically work with no extra binding code.
   ============================================================ */

function isWishlisted(productId) {
  return HiranyaStore.getWishlist().includes(productId);
}

function toggleWishlist(productId) {
  const list = HiranyaStore.getWishlist();
  const idx = list.indexOf(productId);
  const product = getProductById(productId);

  if (idx > -1) {
    list.splice(idx, 1);
    HiranyaStore.setWishlist(list);
    HiranyaNotify.removedFromWishlist(product && product.name);
  } else {
    list.push(productId);
    HiranyaStore.setWishlist(list);
    HiranyaNotify.addedToWishlist(product && product.name);
  }
  refreshWishlistButtons();
  if (document.body.dataset.page === "wishlist") renderWishlistPage();
  return list.includes(productId);
}

function refreshWishlistButtons() {
  document.querySelectorAll("[data-wishlist-btn]").forEach(btn => {
    const id = btn.getAttribute("data-product-id");
    const active = isWishlisted(id);
    btn.classList.toggle("active", active);
    const icon = btn.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = active ? "favorite" : "favorite_border";
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-wishlist-btn]");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const id = btn.getAttribute("data-product-id");
  if (id) toggleWishlist(id);
});

/* ---------- Wishlist page rendering ---------- */
function renderWishlistPage() {
  const grid = document.getElementById("wishlistGrid");
  const emptyState = document.getElementById("wishlistEmpty");
  if (!grid) return;

  const ids = HiranyaStore.getWishlist();
  const products = ids.map(getProductById).filter(Boolean);

  if (!products.length) {
    grid.innerHTML = "";
    grid.classList.add("d-none");
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }

  grid.classList.remove("d-none");
  if (emptyState) emptyState.classList.add("d-none");

  grid.innerHTML = products.map(p => productCardHTML(p)).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  refreshWishlistButtons();
  if (document.body.dataset.page === "wishlist") renderWishlistPage();
});

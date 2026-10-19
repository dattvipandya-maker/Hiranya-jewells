/* ============================================================
   HIRANYA — shop.js
   Drives shop.html: renders the product grid from HIRANYA_PRODUCTS
   and applies category / metal / stone filters + sorting, all
   client-side against the centralized catalog.
   ============================================================ */

const ShopState = {
  category: new Set(),
  metal: new Set(),
  stone: new Set(),
  sort: "featured"
};

function applyShopFilters() {
  let results = [...HIRANYA_PRODUCTS];

  if (ShopState.category.size) {
    results = results.filter(p => ShopState.category.has(p.category));
  }
  if (ShopState.metal.size) {
    results = results.filter(p => ShopState.metal.has(p.metal));
  }
  if (ShopState.stone.size) {
    results = results.filter(p => p.stones.some(s => ShopState.stone.has(s)));
  }

  switch (ShopState.sort) {
    case "newest":
      results.sort((a, b) => (b.newArrival === a.newArrival) ? 0 : (b.newArrival ? 1 : -1));
      break;
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "bestselling":
      results.sort((a, b) => (b.bestSeller === a.bestSeller) ? 0 : (b.bestSeller ? 1 : -1));
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    default: // featured
      results.sort((a, b) => (b.featured === a.featured) ? 0 : (b.featured ? 1 : -1));
  }

  renderShopGrid(results);
}

function renderShopGrid(products) {
  const grid = document.getElementById("shopGrid");
  const emptyState = document.getElementById("shopEmpty");
  const countEl = document.getElementById("shopResultCount");
  if (!grid) return;

  if (countEl) countEl.textContent = `${products.length} piece${products.length === 1 ? "" : "s"}`;

  if (!products.length) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("d-none");
    return;
  }
  if (emptyState) emptyState.classList.add("d-none");

  grid.innerHTML = products.map(p => productCardHTML(p)).join("");
}

function initShopFilters() {
  document.querySelectorAll("[data-filter-category]").forEach(cb => {
    cb.addEventListener("change", () => {
      cb.checked ? ShopState.category.add(cb.value) : ShopState.category.delete(cb.value);
      applyShopFilters();
    });
  });
  document.querySelectorAll("[data-filter-metal]").forEach(cb => {
    cb.addEventListener("change", () => {
      cb.checked ? ShopState.metal.add(cb.value) : ShopState.metal.delete(cb.value);
      applyShopFilters();
    });
  });
  document.querySelectorAll("[data-filter-stone]").forEach(chip => {
    chip.addEventListener("click", () => {
      const val = chip.getAttribute("data-filter-stone");
      chip.classList.toggle("active");
      chip.classList.contains("active") ? ShopState.stone.add(val) : ShopState.stone.delete(val);
      applyShopFilters();
    });
  });
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      ShopState.sort = sortSelect.value;
      applyShopFilters();
    });
  }
  const clearBtn = document.getElementById("clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      ShopState.category.clear();
      ShopState.metal.clear();
      ShopState.stone.clear();
      document.querySelectorAll("[data-filter-category], [data-filter-metal]").forEach(cb => cb.checked = false);
      document.querySelectorAll("[data-filter-stone]").forEach(chip => chip.classList.remove("active"));
      applyShopFilters();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "shop") return;

  // Support arriving from a home category tile: shop.html?category=Rings
  const params = new URLSearchParams(location.search);
  const presetCategory = params.get("category");
  if (presetCategory) {
    ShopState.category.add(presetCategory);
    const cb = document.querySelector(`[data-filter-category][value="${presetCategory}"]`);
    if (cb) cb.checked = true;
  }

  initShopFilters();
  applyShopFilters();
});

/* ============================================================
   HIRANYA — lookbook.js
   Drives lookbook.html. Nothing here is hand-authored content
   that could drift from the catalog: collection order, imagery,
   piece counts, mini "shop the edit" thumbnails, and the stats
   band are all derived live from HIRANYA_PRODUCTS.
   ============================================================ */

const COLLECTION_META = {
  "Heritage": "Uncut diamonds, temple motifs, and gold work rooted in centuries of Indian craftsmanship — reimagined with a lighter, more wearable hand.",
  "Contemporary": "Clean lines and asymmetry for a wardrobe that wants fine jewellery to read as modern first, ornamental second.",
  "Bridal": "Complete sets built for the wedding season — kundan, polki, and temple work, engineered to photograph as beautifully as they wear.",
  "Festive": "Temple jewellery motifs cast in a lighter, everyday weight — built for the days between the big occasions.",
  "Everyday": "The entry point into fine gold jewellery — pieces designed to be worn daily and layered without a second thought.",
  "Men's": "Restrained, architectural accessories — cufflinks, signet rings, and chains built for formalwear and beyond."
};

function slugify(text) {
  return "collection-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ---------- Collection rows ---------- */
function renderLookbookRows() {
  const container = document.getElementById("lookbookBlocks");
  if (!container) return [];

  const collectionNames = Object.keys(COLLECTION_META).filter(
    name => HIRANYA_PRODUCTS.some(p => p.collection === name)
  );

  const html = collectionNames.map((name, i) => {
    const products = HIRANYA_PRODUCTS.filter(p => p.collection === name);
    const heroProduct = products.find(p => p.featured) || products[0];
    const otherProducts = products.filter(p => p.id !== heroProduct.id).slice(0, 3);
    const reversed = i % 2 === 1;
    const index = String(i + 1).padStart(2, "0");

    const miniThumbs = otherProducts.length
      ? `<div class="mini-thumbs">
          ${otherProducts.map(p => `
            <a href="product-details.html?id=${p.id}" aria-label="${p.name}">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            </a>`).join("")}
        </div>`
      : "";

    return `
      <section class="lookbook-block ${reversed ? "lookbook-reversed" : ""} reveal" id="${slugify(name)}">
        <div class="lookbook-image">
          <img src="${heroProduct.images[0]}" alt="${name} collection — ${heroProduct.name}" loading="lazy">
        </div>
        <div class="lookbook-copy">
          <span class="ghost-number" aria-hidden="true">${index}</span>
          <span class="label-caps collection-eyebrow">Collection ${index} / ${String(collectionNames.length).padStart(2, "0")}</span>
          <h2 class="display-md">${name}</h2>
          <p class="body-lg text-on-surface-var collection-blurb mb-3">${COLLECTION_META[name]}</p>
          <p class="body-md text-on-surface-var collection-count mb-0">${products.length} piece${products.length === 1 ? "" : "s"} in this collection, including <em>${heroProduct.name}</em>.</p>
          ${miniThumbs}
          <a href="shop.html?collection=${encodeURIComponent(name)}" class="btn btn-hiranya-outline shop-the-edit-link">
            Shop the Edit <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>`;
  }).join("");

  container.innerHTML = html;
  return collectionNames;
}

/* ---------- Sticky quick-nav ---------- */
function renderQuickNav(collectionNames) {
  const nav = document.getElementById("lookbookQuickNavInner");
  if (!nav) return;
  nav.innerHTML = collectionNames.map((name, i) =>
    `<a href="#${slugify(name)}" class="quicknav-chip ${i === 0 ? "active" : ""}" data-quicknav="${slugify(name)}">${name}</a>`
  ).join("");
}

function initQuickNavScrollSpy(collectionNames) {
  const chips = document.querySelectorAll("[data-quicknav]");
  if (!chips.length || !("IntersectionObserver" in window)) return;

  const sections = collectionNames.map(name => document.getElementById(slugify(name))).filter(Boolean);
  const setActive = (id) => {
    chips.forEach(chip => chip.classList.toggle("active", chip.getAttribute("data-quicknav") === id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ---------- Live stats band ---------- */
function renderStats() {
  const collectionCount = new Set(HIRANYA_PRODUCTS.map(p => p.collection)).size;
  const pieceCount = HIRANYA_PRODUCTS.length;
  const metalCount = new Set(HIRANYA_PRODUCTS.map(p => p.metal)).size;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("statCollections", collectionCount);
  set("statPieces", pieceCount);
  set("statMetals", metalCount);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "lookbook") return;

  const collectionNames = renderLookbookRows();
  renderQuickNav(collectionNames);
  initQuickNavScrollSpy(collectionNames);
  renderStats();

  // The rows were just injected, so re-scan for the new .reveal elements —
  // app.js's own DOMContentLoaded pass already ran before this content existed.
  initScrollReveal();
});

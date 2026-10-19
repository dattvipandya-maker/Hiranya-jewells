/* ============================================================
   HIRANYA — app.js
   Core, page-agnostic utilities: localStorage-backed store,
   toast notifications, header scroll state, and nav badge sync.
   Loaded on every page, before page-specific scripts.
   ============================================================ */

const HiranyaStore = (() => {
  const KEYS = {
    cart: "hiranya_cart",
    wishlist: "hiranya_wishlist",
    orders: "hiranya_orders",
    account: "hiranya_account"
  };

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error("HiranyaStore read error for", key, e);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("HiranyaStore write error for", key, e);
    }
  }

  return {
    // ---- Cart: [{ id, qty, size }] ----
    getCart: () => read(KEYS.cart, []),
    setCart: (cart) => { write(KEYS.cart, cart); syncBadges(); },

    // ---- Wishlist: [id, id, ...] ----
    getWishlist: () => read(KEYS.wishlist, []),
    setWishlist: (list) => { write(KEYS.wishlist, list); syncBadges(); },

    // ---- Orders: [{...}] ----
    getOrders: () => read(KEYS.orders, []),
    setOrders: (orders) => write(KEYS.orders, orders),

    // ---- Demo account state ----
    getAccount: () => read(KEYS.account, null),
    setAccount: (account) => write(KEYS.account, account)
  };
})();

/* ---------- Toast notifications ---------- */
function hiranyaToast(message, icon = "check_circle") {
  let stack = document.querySelector(".hiranya-toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "hiranya-toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = "hiranya-toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${icon}</span><span>${message}</span>`;
  stack.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 2600);
}

/* ---------- Nav badge sync (cart / wishlist counts) ---------- */
function syncBadges() {
  const cartCount = HiranyaStore.getCart().reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = HiranyaStore.getWishlist().length;

  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? "flex" : "none";
  });
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    el.textContent = wishlistCount;
    el.style.display = wishlistCount > 0 ? "flex" : "none";
  });
}

/* ---------- Header scroll shadow ---------- */
function initHeaderScrollState() {
  const header = document.querySelector(".hiranya-header");
  if (!header) return;

  // Publish the header's real rendered height as a CSS var so any other
  // sticky element (e.g. the Lookbook's quick-nav) can stack directly
  // beneath it instead of guessing a fixed pixel offset per breakpoint.
  const publishHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
  };
  publishHeaderHeight();
  window.addEventListener("resize", publishHeaderHeight);

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Scroll reveal for .reveal elements ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));
}

/* ---------- Active nav link highlighting ---------- */
function initActiveNavLink() {
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  syncBadges();
  initHeaderScrollState();
  initScrollReveal();
  initActiveNavLink();
});

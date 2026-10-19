/* ============================================================
   HIRANYA — navigation.js
   Search overlay open/close + Escape handling. Mobile menu uses
   Bootstrap's native offcanvas (data-bs-toggle) so no extra JS
   is required for it beyond closing it on link tap, handled here.
   ============================================================ */

function openSearchOverlay() {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay) return;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  const input = document.getElementById("searchInput");
  if (input) { input.value = ""; setTimeout(() => input.focus(), 50); }
  renderSearchResults("");
}

function closeSearchOverlay() {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-search-open]").forEach(btn => {
    btn.addEventListener("click", openSearchOverlay);
  });
  document.querySelectorAll("[data-search-close]").forEach(btn => {
    btn.addEventListener("click", closeSearchOverlay);
  });
  const overlay = document.getElementById("searchOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeSearchOverlay(); });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearchOverlay();
  });

  // Close the mobile offcanvas automatically when a nav link is tapped
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu && window.bootstrap) {
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        const instance = window.bootstrap.Offcanvas.getOrCreateInstance(mobileMenu);
        instance.hide();
      });
    });
  }
});

/* ============================================================
   HIRANYA — account.js
   Drives account.html. This is explicitly a DEMO auth system —
   there is no real backend, no password hashing, no verification.
   "Signing in" just creates/reuses a HiranyaStore.getAccount()
   record in localStorage. This is called out on-page too, not
   just here, so it's never mistaken for real authentication.
   ============================================================ */

function capitalizeWord(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Turns an order's timestamp into a fake but consistent shipping stage, purely for demo flavor. */
function getOrderStatus(order) {
  const hoursElapsed = (Date.now() - new Date(order.date).getTime()) / 36e5;
  if (hoursElapsed < 1)  return { label: "Confirmed",  step: 1 };
  if (hoursElapsed < 24) return { label: "Processing", step: 2 };
  if (hoursElapsed < 72) return { label: "Shipped",    step: 3 };
  return { label: "Delivered", step: 4 };
}

function renderAccountPage() {
  const account = HiranyaStore.getAccount();
  const authView = document.getElementById("accountAuthView");
  const dashView = document.getElementById("accountDashboardView");
  if (!authView || !dashView) return;

  if (!account) {
    authView.classList.remove("d-none");
    dashView.classList.add("d-none");
    return;
  }

  authView.classList.add("d-none");
  dashView.classList.remove("d-none");

  document.getElementById("accountWelcomeName").textContent = account.name;
  document.getElementById("accountEmailDisplay").textContent = account.email;
  document.getElementById("accountJoinedDisplay").textContent =
    "Member since " + new Date(account.joined).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  renderOrdersTab();
  renderAddressTab();
  renderWishlistSummary();
}

/* ---------- Sign in / Register (demo) ---------- */
function initAuthForms() {
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const email = form.loginEmail.value.trim();
    const existing = HiranyaStore.getAccount();
    // Demo-only: "signing in" with any email either resumes the existing
    // demo profile (if the email matches) or creates a fresh one. There is
    // no password check because there is no real backend to check against.
    const name = existing && existing.email === email ? existing.name : capitalizeWord(email.split("@")[0]);
    HiranyaStore.setAccount({
      name,
      email,
      joined: (existing && existing.email === email) ? existing.joined : new Date().toISOString(),
      address: (existing && existing.email === email) ? existing.address : null
    });
    HiranyaNotify.signedIn(name);
    form.reset();
    renderAccountPage();
  });

  document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const name = form.registerName.value.trim();
    const email = form.registerEmail.value.trim();
    HiranyaStore.setAccount({ name, email, joined: new Date().toISOString(), address: null });
    HiranyaNotify.signedIn(name);
    form.reset();
    renderAccountPage();
  });

  // Toggle between the Sign In and Create Account panels
  document.querySelectorAll("[data-auth-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-auth-tab");
      document.querySelectorAll("[data-auth-tab]").forEach(b => b.classList.toggle("active", b === btn));
      document.getElementById("loginPanel").classList.toggle("d-none", target !== "login");
      document.getElementById("registerPanel").classList.toggle("d-none", target !== "register");
    });
  });

  document.getElementById("signOutBtn")?.addEventListener("click", () => {
    HiranyaStore.setAccount(null);
    HiranyaNotify.signedOut();
    renderAccountPage();
  });
}

/* ---------- Orders tab ---------- */
function renderOrdersTab() {
  const wrap = document.getElementById("ordersList");
  const empty = document.getElementById("ordersEmpty");
  if (!wrap) return;

  const orders = HiranyaStore.getOrders().slice().reverse();
  if (!orders.length) {
    wrap.innerHTML = "";
    if (empty) empty.classList.remove("d-none");
    return;
  }
  if (empty) empty.classList.add("d-none");
  wrap.innerHTML = orders.map(orderCardHTML).join("");
}

function orderCardHTML(order) {
  const status = getOrderStatus(order);
  const steps = ["Confirmed", "Processing", "Shipped", "Delivered"];

  return `
    <div class="order-card mb-4">
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
        <div>
          <p class="title-md mb-1">Order ${order.id}</p>
          <p class="body-md text-on-surface-var mb-0">${new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <span class="order-status-badge">${status.label}</span>
      </div>
      <div class="order-timeline mb-4">
        ${steps.map((s, i) => `
          <div class="timeline-step ${i < status.step ? "done" : ""}">
            <span class="dot"></span>
            <span class="label-caps">${s}</span>
          </div>`).join("")}
      </div>
      <div class="order-items">
        ${order.items.map(it => `
          <div class="d-flex gap-3 py-2">
            <img src="${it.image}" alt="${it.name}" style="width:52px;height:64px;object-fit:cover;flex-shrink:0;">
            <div class="flex-grow-1">
              <p class="body-md mb-0">${it.name}${it.size ? " — Size " + it.size : ""}</p>
              <p class="body-md text-on-surface-var mb-0" style="font-size:13px;">Qty ${it.qty} · ${formatINR(it.price)} each</p>
            </div>
          </div>`).join("")}
      </div>
      <div class="d-flex justify-content-between align-items-center pt-3 mt-2 border-top" style="border-color: var(--hiranya-outline-variant) !important;">
        <span class="body-md text-on-surface-var">${order.paymentMethod}</span>
        <span class="title-md">${formatINR(order.total)}</span>
      </div>
    </div>`;
}

/* ---------- Address tab ---------- */
function renderAddressTab() {
  const account = HiranyaStore.getAccount();
  const form = document.getElementById("addressForm");
  if (!form || !account) return;
  const a = account.address || {};
  form.fullName.value = a.fullName || account.name || "";
  form.phone.value = a.phone || "";
  form.line1.value = a.line1 || "";
  form.city.value = a.city || "";
  form.state.value = a.state || "";
  form.pincode.value = a.pincode || "";
}

function initAddressForm() {
  document.getElementById("addressForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const account = HiranyaStore.getAccount();
    if (!account) return;
    account.address = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      line1: form.line1.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      pincode: form.pincode.value.trim()
    };
    HiranyaStore.setAccount(account);
    hiranyaToast("Address Saved", "home_pin");
  });
}

/* ---------- Wishlist summary tab ---------- */
function renderWishlistSummary() {
  const el = document.getElementById("accountWishlistCount");
  if (el) el.textContent = HiranyaStore.getWishlist().length;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "account") return;
  initAuthForms();
  initAddressForm();
  renderAccountPage();

  // If checkout.html sent us here after placing an order, land on the Orders tab
  if (location.hash === "#orders") {
    const ordersTabBtn = document.querySelector('[data-bs-target="#accountOrdersPane"]');
    if (ordersTabBtn && window.bootstrap) {
      window.bootstrap.Tab.getOrCreateInstance(ordersTabBtn).show();
    }
  }
});

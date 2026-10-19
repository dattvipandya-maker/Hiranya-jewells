/* ============================================================
   HIRANYA — search.js
   Live search against the centralized product catalog.
   Renders suggestions, matches, and an empty state inside the
   full-screen search overlay (see navigation.js for open/close).
   ============================================================ */

const SUGGESTED_SEARCHES = ["Necklaces", "Bridal", "Diamond Rings", "Men's", "Rose Gold", "Everyday"];

function renderSearchResults(query) {
  const resultsEl = document.getElementById("searchResults");
  const suggestedEl = document.getElementById("searchSuggested");
  if (!resultsEl) return;

  const q = query.trim();

  if (!q) {
    resultsEl.innerHTML = "";
    if (suggestedEl) {
      suggestedEl.classList.remove("d-none");
      suggestedEl.innerHTML = SUGGESTED_SEARCHES.map(s =>
        `<button type="button" class="chip me-2 mb-2" onclick="document.getElementById('searchInput').value='${s}'; renderSearchResults('${s}');">${s}</button>`
      ).join("");
    }
    return;
  }

  if (suggestedEl) suggestedEl.classList.add("d-none");

  const matches = searchProducts(q);

  if (!matches.length) {
    resultsEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">search_off</span>
        <p class="title-md mb-1">No results for "${q}"</p>
        <p class="body-md text-on-surface-var">Try a category, metal, or stone — e.g. "Rings", "Rose Gold", "Sapphire".</p>
      </div>`;
    return;
  }

  resultsEl.innerHTML = `<div class="row g-4">${matches.map(p => productCardHTML(p)).join("")}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", (e) => renderSearchResults(e.target.value));
});

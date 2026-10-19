/* ============================================================
   HIRANYA — notifications.js
   Standardized toast copy so every module (cart, wishlist,
   checkout, account) speaks with one voice.
   ============================================================ */

const HiranyaNotify = {
  addedToBag: (name) => hiranyaToast(`${name ? name + " — " : ""}Added to Bag`, "shopping_bag"),
  removedFromBag: (name) => hiranyaToast(`${name ? name + " — " : ""}Removed from Bag`, "remove_shopping_cart"),
  cartUpdated: () => hiranyaToast("Cart Updated", "sync"),
  cartCleared: () => hiranyaToast("Bag Cleared", "delete_sweep"),
  addedToWishlist: (name) => hiranyaToast(`${name ? name + " — " : ""}Added to Wishlist`, "favorite"),
  removedFromWishlist: (name) => hiranyaToast(`${name ? name + " — " : ""}Removed from Wishlist`, "heart_broken"),
  orderPlaced: () => hiranyaToast("Order Placed Successfully", "task_alt"),
  paymentFailed: () => hiranyaToast("Payment Failed — Please Try Again", "error"),
  formError: (message) => hiranyaToast(message || "Please check the highlighted fields", "warning"),
  linkCopied: () => hiranyaToast("Link Copied", "content_copy"),
  signedIn: (name) => hiranyaToast(`Welcome back${name ? ", " + name : ""}`, "person"),
  signedOut: () => hiranyaToast("Signed Out", "logout")
};

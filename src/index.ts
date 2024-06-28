/**
 * Adds a red border to all webpages matching mozilla.org domain.
 *
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#borderify.js
 *
 * @module
 */
if (typeof document === "undefined") {
  console.info("No document object found.");
} else {
  document.body.style.border = "10px solid pink";
}

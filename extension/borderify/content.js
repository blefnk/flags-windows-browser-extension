// src/index.ts
if (typeof document === "undefined") {
  console.info(
    "This is a browser extension. Install it via about:debugging in Firefox or chrome://extensions in Chrome.",
  );
} else {
  document.body.style.border = "10px solid green";
}

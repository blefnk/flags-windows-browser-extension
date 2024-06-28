// src/index.ts
if (typeof document === "undefined") {
  console.info("No document object found.");
} else {
  document.body.style.border = "10px solid pink";
}

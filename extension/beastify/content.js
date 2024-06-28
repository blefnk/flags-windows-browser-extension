/* eslint-disable prefer-const */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/no-unsafe-call */
(() => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  // @ts-expect-error TODO: fix
  if (window.hasRun) {
    return;
  }
  // @ts-expect-error TODO: fix
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  // @ts-expect-error TODO: fix
  function insertBeast(beastURL) {
    removeExistingBeasts();
    // biome-ignore lint/style/useConst: <explanation>
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    // biome-ignore lint/style/useConst: <explanation>
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (const beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  // @ts-expect-error TODO: fix
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();

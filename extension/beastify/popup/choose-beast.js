/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    // @ts-expect-error TODO: fix
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Frog": {
          // @ts-expect-error TODO: fix
          return browser.runtime.getURL("assets/beasts/frog.jpg");
        }
        case "Snake": {
          // @ts-expect-error TODO: fix
          return browser.runtime.getURL("assets/beasts/snake.jpg");
        }
        case "Turtle": {
          // @ts-expect-error TODO: fix
          return browser.runtime.getURL("assets/beasts/turtle.jpg");
        }
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    // @ts-expect-error TODO: fix
    function beastify(tabs) {
      // @ts-expect-error TODO: fix
      browser.tabs.insertCSS({ code: hidePage }).then(() => {
        // @ts-expect-error TODO: fix
        const url = beastNameToURL(e.target.textContent);
        // @ts-expect-error TODO: fix
        browser.tabs.sendMessage(tabs[0].id, {
          beastURL: url,
          command: "beastify",
        });
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    // @ts-expect-error TODO: fix
    function reset(tabs) {
      // @ts-expect-error TODO: fix
      browser.tabs.removeCSS({ code: hidePage }).then(() => {
        // @ts-expect-error TODO: fix
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    // @ts-expect-error TODO: fix
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    // @ts-expect-error TODO: fix
    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      // Ignore when click is not on a button within <div id="popup-content">.
      return;
    }
    // @ts-expect-error TODO: fix
    if (e.target.type === "reset") {
      // @ts-expect-error TODO: fix
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    } else {
      // @ts-expect-error TODO: fix
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
// @ts-expect-error TODO: fix
function reportExecuteScriptError(error) {
  // @ts-expect-error TODO: fix
  document.querySelector("#popup-content").classList.add("hidden");
  // @ts-expect-error TODO: fix
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
// @ts-expect-error TODO: fix
browser.tabs
  .executeScript({ file: "/beastify/content.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

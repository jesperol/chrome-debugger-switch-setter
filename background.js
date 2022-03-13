/* chrome.runtime.onInstalled.addListener(() => {
  let color = "#3aa757";
  chrome.storage.sync.set({ color });
  console.log('Stored background color set to %c%s', `color: ${color}`, color);
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.storage.sync.get("color", ({ color }) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (c) => { document.body.style.backgroundColor = c; },
        args: [color],
      });
      console.log('Document background color set to %c%s', `color: ${color}`, color);
    })
  }
}); */

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("chrome://")) return;
  debuggeeId = { tabId: tab.id };

  // We need to attach to our tab first in order to be able to ssendCommand() to it
  cb = onAttach.bind(null, debuggeeId);
  chrome.debugger.attach(debuggeeId, "1.0", cb);

/*   chrome.debugger.sendCommand(
      debuggeeId,
      "Emulation.setEmulatedMedia", {
        "media": "",
        "features": [
            {
                "name": "color-gamut",
                "value": ""
            },
            {
                "name": "prefers-color-scheme",
                "value": "dark"
            },
            {
                "name": "forced-colors",
                "value": ""
            },
            {
                "name": "prefers-contrast",
                "value": ""
            },
            {
                "name": "prefers-reduced-data",
                "value": ""
            },
            {
                "name": "prefers-reduced-motion",
                "value": ""
            }
        ]
      },
      onSetEmulatedMedia.bind(null, debuggeeId)); */

  chrome.debugger.sendCommand(
    debuggeeId,
    "Emulation.setAutoDarkModeOverride", { "enabled": true },
    onSetAutoDarkOverride.bind(null, debuggeeId)
  );
});

function onAttach(debuggeeId) {
  console.log("onAttach: " + debuggeeId)
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message);
  }
}

function onSetAutoDarkOverride(debuggeeId) {
  console.log("onAutoDarkOverride: " + debuggeeId);
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message);
  }
}

function onSetEmulatedMedia(debuggeeId) {
  console.log("onEmulatedMedia: " + debuggeeId);
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message);
  }
}

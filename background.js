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
  chrome.debugger.attach(debuggeeId, "1.0", onAttach.bind(tab, debuggeeId));

  chrome.debugger.sendCommand(
    debuggeeId,
    "Emulation.setAutoDarkModeOverride", { "enabled": true },
    onSetAutoDarkOverride.bind(tab, debuggeeId)
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
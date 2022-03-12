let injectFunction = document.getElementById('inject-function');
var version = "1.0"

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.debugger
  return tab;
}

injectFunction.addEventListener('click', async () => {
  let tab = await getCurrentTab();
  debuggeeId = { tabId: tab.id }

  // We need to attach to our tab first in order to be able to ssendCommand() to it
  cb = onAttach.bind(null, debuggeeId)
  chrome.debugger.attach(debuggeeId, version, cb);

  function onAttach(debuggeeId) {
    if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      return;
    }
  }

  chrome.debugger.sendCommand(
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
      onSetEmulatedMedia.bind(null, debuggeeId));

  chrome.debugger.sendCommand(
      debuggeeId,
      "Emulation.setAutoDarkModeOverride", { "enabled": true },
      onSetAutoDarkOverride.bind(null, debuggeeId));
});

function onSetAutoDarkOverride(debuggeeId) {
  console.log({ "onAutoDarkOverride": debuggeeId });
}

function onSetEmulatedMedia(debuggeeId) {
  console.log({ "onEmulatedMedia": debuggeeId });
}


chrome.debugger.onEvent.addListener(onEvent);

function onEvent(debuggeeId, message, params) {
  if (getCurrentTab().id != debuggeeId.tabId)
    return;

  if (message == "Network.requestWillBeSent") {
    var requestDiv = requests[params.requestId];
    if (!requestDiv) {
      var requestDiv = document.createElement("div");
      requestDiv.className = "request";
      requests[params.requestId] = requestDiv;
      var urlLine = document.createElement("div");
      urlLine.textContent = params.request.url;
      requestDiv.appendChild(urlLine);
    }

    if (params.redirectResponse)
      appendResponse(params.requestId, params.redirectResponse);

    var requestLine = document.createElement("div");
    requestLine.textContent = "\n" + params.request.method + " " +
        parseURL(params.request.url).path + " HTTP/1.1";
    requestDiv.appendChild(requestLine);
    document.getElementById("container").appendChild(requestDiv);
  } else if (message == "Network.responseReceived") {
    appendResponse(params.requestId, params.response);
  }
}
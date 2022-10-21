// Initialize button with users' preferred color
let forceDark = document.getElementById("forceDark");
let emulateFocus = document.getElementById("emulateFocus");

forceDark.addEventListener("click", async () => { 
    toggleEmulation("Emulation.setAutoDarkModeOverride");
});
emulateFocus.addEventListener("click", async () => { 
    toggleEmulation("Emulation.setFocusEmulationEnabled" );
});

async function toggleEmulation(command) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    debuggeeId = { tabId: tab.id };

    // We need to attach to our tab first in order to be able to ssendCommand() to it
    await chrome.debugger.attach(debuggeeId, "1.0").catch((msg) => console.log("already attached?"));
    await chrome.debugger.sendCommand(
      debuggeeId,
      command, { "enabled": true },
    )
    // If we detach we lose our changes
    // await chrome.debugger.detach(debuggeeId)
}
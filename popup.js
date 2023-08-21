let btnForceDark = document.getElementById("btnForceDark");
let btnEmulateFocus = document.getElementById("btnEmulateFocus");
let btnDetach = document.getElementById("btnDetach")

btnForceDark.addEventListener("click", async () => { 
    toggleEmulation("Emulation.setAutoDarkModeOverride");
});
btnEmulateFocus.addEventListener("click", async () => { 
    toggleEmulation("Emulation.setFocusEmulationEnabled" );
});
btnDetach.addEventListener("click", async () => { 
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.debugger.detach({ tabId: tab.id}).catch((error) => { console.debug(error); });
    chrome.action.setBadgeText({ tabId: tab.id, text: '' }) 
});

async function toggleEmulation(command) {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let debuggeeId = { tabId: tab.id };

    await chrome.debugger.attach(debuggeeId, "1.0").catch((msg) => console.debug("ChromeDebuggerSwitchSetter: " + msg));
    await chrome.debugger.sendCommand(
      debuggeeId,
      command, { "enabled": true },
    )
    
    let badgeLetter = command[13];
    let badgeLetters = await chrome.action.getBadgeText({ tabId: tab.id });
    if (badgeLetters) {
        if (badgeLetters.search(badgeLetter) < 0) {
            badgeLetters += badgeLetter;
        }
    } else {
        badgeLetters = badgeLetter;
    }
    
    chrome.action.setBadgeText({ tabId: tab.id, text: badgeLetters})
}

// Not really any debugger functionality but let's add it here too
let btnFSIFrame = document.getElementById("btnFSIFrame");
let txtFSID = document.getElementById("txtFSID");

btnFSIFrame.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (elementId) => document.querySelector(elementId)?.requestFullscreen().catch(e => console.error(e)),
        args: [ txtFSID.value ],
        injectImmediately: true,
        world: 'MAIN'
    }, (frameResults) => {
        for (const frameResult of frameResults) {
            console.log("StopCapture Injection result: " + frameResult.result);
        }
    });
});
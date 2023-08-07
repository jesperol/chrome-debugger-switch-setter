chrome.debugger.onDetach.addListener((debugee) => {
  console.dir(debugee)
  chrome.action.setBadgeText({ tabId: debugee.tabId, text: '' }) 
});
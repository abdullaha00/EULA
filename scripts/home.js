
document.getElementById("findEULAButton").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({action: "findEULA", tabId: tabs[0].id});
    })
})
document.getElementById("highlightButton").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({action: "highlight", tabId: tabs[0].id});
    })
})

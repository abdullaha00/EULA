chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "findEULA"){
        chrome.scripting.executeScript({
            target: {tabId: request.tabId},
            files: ["/text_extraction/links.js"]
        })
    }
    if(request.action === "highlight"){
        chrome.scripting.executeScript({
            target: {tabId: request.tabId},
            files: ["/scripts/highlight.js"]
        })
    }
});
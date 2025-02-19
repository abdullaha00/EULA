const cache = {}


async function getData() {
    try {
        const data = await chrome.storage.local.get(tempData)
        Object.assign(cache, data)
    } catch (e) {
        console.log("An error occurred:" + e);
        
    }
    console.log(cache)
}


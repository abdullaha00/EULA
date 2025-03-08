function setHosts(arr){
    
    const container = document.getElementById("hidden-all-app-container")
    console.log(container);
    

    for (const host of arr){
        
        const newAppContainer = document.createElement("div")
        const newApp = document.createElement("div")
        const newAppName = document.createElement("div")

        newAppContainer.classList.add("app-container")
        newApp.classList.add("app")

        newApp.style.backgroundColor = "red"

        newAppName.classList.add("app-name")

        newAppName.innerText = "test"
        
        newAppContainer.appendChild(newApp)
        newAppContainer.appendChild(newAppName)

        container.appendChild(newAppContainer)
    }
}

function search(hiddenFuse, host_arr) {
    const value = document.getElementById("hidden-search-bar").value

    if (value == "") {
        console.log("empty")
        return
    }
    hiddenFuse.search(value)
    new_hosts = Array.from(hiddenFuse.search(value)).map(a => a.item)
    setHosts(new_hosts)
    
    
}

chrome.storage.local.get(["tempData"], function (data) {
    host_arr = data["tempData"][0]["hidden"];
    setHosts(host_arr)

    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // ignoreDiacritics: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "name"
        ]
    };

    const hiddenFuse = new Fuse(host_arr, fuseOptions)
    if(document.getElementById("hidden-search-bar")){
        console.log("test")
    }
    document.getElementById("hidden-search-bar").addEventListener("keyup", () => {search(hiddenFuse, host_arr)})
  
  })

document.querySelector("ul").addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        host = event.target.id;
        chrome.storage.local.get(["tempData"], function (data) {
            var index = data["tempData"][0]["hidden"].indexOf(host);
            if (index !== -1) {
                data["tempData"][0]["hidden"].splice(index, 1);
            }
            chrome.storage.local.set({"tempData" : data["tempData"]}).then(() => {
                event.target.parentElement.remove();
            });
          });
    }
});

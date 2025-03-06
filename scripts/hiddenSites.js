function setHosts(arr){
    site_list = document.getElementById("site-list")
    site_list.innerHTML = '';
    for (const host of arr){
        const newListItem = document.createElement("li");
        const newButton = document.createElement("button");
        newButton.innerHTML = "&times;";
        newButton.id = host;
        newButton.classList.add("remove-btn");
        if (host.length > 25){
            newListItem.textContent = host.slice(0,25).concat("...");
        }else{
            newListItem.textContent = host;
        }
        newListItem.title = host
        newListItem.appendChild(newButton);
        document.getElementById("site-list").appendChild(newListItem);
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

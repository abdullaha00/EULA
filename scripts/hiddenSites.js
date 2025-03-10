function setHosts(hosts){
    
    const container = document.getElementById("hidden-all-app-container")
    console.log("container:", container);
    
    console.log("hosts:", hosts);
    
    for (const [id, v] of Object.entries(hosts)){
        
        const newAppContainer = document.createElement("div")
        const newApp = document.createElement("div")
        const newAppName = document.createElement("div")
        const newAppDelete = document.createElement("div")

        newAppDelete.innerHTML = "&times"

        newAppDelete.classList.add("app-delete")
        newAppContainer.classList.add("app-container")
        newApp.classList.add("app")

        if (v.hasLogo) {
            newApp.style.backgroundImage = `url(${v.logo})`
            

        } else {
            newApp.style.backgroundColor = `${v.logo}`
            newApp.classList.add("default-icon")
            let name = id
            let letter = name[0]
            if (name.length > 3 && name.substring(0,3)=="www") {
                letter = name[4]
            }
            newApp.innerText = `${letter.toUpperCase()}`

            
        }

        newAppName.classList.add("app-name")

        newAppName.innerText = `${id}`
        
        newApp.appendChild(newAppDelete)
        newAppContainer.appendChild(newApp)
        newAppContainer.appendChild(newAppName)

        newAppContainer.addEventListener("click", () => {removeHidden(id)})

        container.appendChild(newAppContainer)
    }
    
}

function clearHosts() {

    const container = document.getElementById("hidden-all-app-container")

    while (container.firstChild) {
        container.lastChild.remove()
    }
}


function removeHidden(id) {
    chrome.storage.local.get(["tempData"], function (data) {
        const newData = data["tempData"][0];
        const newHidden = newData.hidden

        delete newHidden[id]

        newData.hidden = newHidden

        chrome.storage.local.set({"tempData" : [newData]}).then(() => {
            initHidden = newHidden
            clearHosts()
            setHosts(newHidden)
        });
    })
}




function search(hiddenFuse, host_arr) {
    clearHosts()
    
    const value = document.getElementById("hidden-search-bar").value

    if (value == "") {
        setHosts(initHidden)
    }
    const results = hiddenFuse.search(value)
    const newHosts = {}
    for (let i=0;i<results.length;i++) {
        const id = results[i].item
        const contents = initHidden[id]
        newHosts[id] = contents
    }
    setHosts(newHosts)
    
    
    
    
}


chrome.storage.local.get(["tempData"], function (data) {
    hosts = data["tempData"][0].hidden;
    initHidden = hosts
    setHosts(hosts)

    
    let hostnames = []
    for (const [id,v] of Object.entries(hosts)) {
        hostnames.push(id)
    }

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
    };

    const hiddenFuse = new Fuse(hostnames)
    document.getElementById("hidden-search-bar").addEventListener("keyup", () => {search(hiddenFuse, hostnames)})
  
  })


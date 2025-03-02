// default to starting on home page
// fetch("/popup/pages/home.html")
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById("content").innerHTML = data;
//     })
//     .then(() => activate("home"))
//     .then(() => loadScript("/scripts/home.js"))


// // helper function
// function activate(id) {
//     const navitems = document.querySelectorAll("#navbar>li>a")
//     navitems.forEach(navitem => {
//         navitem.classList.remove("active");
//     });
//     document.getElementById(id).classList.add("active");
// }
// function loadScript(src) {
//     var script = document.createElement('script');
//     script.src = src;
//     document.head.appendChild(script);  
// }

// add event listeners for navbar
// document.getElementById("home").addEventListener("click", function () {
//     fetch("/popup/pages/home.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("content").innerHTML = data;
//         })
//         .then(() => activate("home"))
//         .then(() => loadScript("/scripts/home.js"))

// });

// document.getElementById("customEula").addEventListener("click", function () {
//     fetch("/popup/pages/custom.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("content").innerHTML = data;
//         })
//         .then(() => activate("customEula"))
//         .then(() => loadScript("/scripts/analysis.js"))
// });

// document.getElementById("preferences").addEventListener("click", function () {
//     fetch("/popup/pages/preferences.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("content").innerHTML = data;
//         })
//         .then(() => activate("preferences"))
// });


// document.getElementById("websites").addEventListener("click", function () {
//     fetch("/popup/pages/websites.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("content").innerHTML = data;
//         })
//         .then(() => activate("websites"))
//         .then(() => loadScript("/scripts/websites.js"))
// });

function hidePanel() {
    // delete contents of panel content
    const panelContent = document.getElementById("panel-content")
    while (panelContent.firstChild) {
        panelContent.lastChild.remove()
    }
    panelContent.style.display = "none"
}

function loadHome() {
    hidePanel()

    // make home content visible
    const homeContent = document.getElementById("home-content")
    homeContent.style.display = "block"
}

function hideHome() {
    // make home content invisible
    const homeContent = document.getElementById("home-content")
    homeContent.style.display = "none"
}

function clearHome() {
    let container = document.getElementById("all-app-container")
    while (container.firstChild) {
        container.lastChild.remove()
    }
}

function loadAddEula() {
    hideHome()
    hidePanel()
    
    const content = document.getElementById("panel-content")
    content.innerText ="loadAddEula"

    content.style.display = "block"
}

function loadPreferences() {
    hideHome()
    hidePanel()
    
    const content = document.getElementById("panel-content")
    content.innerText = "loadPreferences"

    content.style.display = "block"
}

function initHome(data) {

    let container = document.getElementById("all-app-container")

    for (const [id, value] of Object.entries(data.profiles)) {
        const newAppContainer = document.createElement("div")
        const newApp = document.createElement("div")
        const newAppName = document.createElement("div")

        newAppContainer.classList.add("app-container")
        newApp.classList.add("app")
        newAppName.classList.add("app-name")

        newApp.style.backgroundImage = `url('${value.logo}')`
        newAppName.innerText = `${value.name}`

        newApp.addEventListener("click", function () {
            loadAppPanel(value)
        })

        newAppContainer.appendChild(newApp)
        newAppContainer.appendChild(newAppName)
        container.appendChild(newAppContainer)
    }
    
}

function search(arr, fuse) {
    const value = document.getElementById("search-bar").value

    if (value == "") {
        clearHome()
        initHome(apps)
        return
    }
    
    searchResults = fuse.search(value)
    let data = {}
    data.profiles = {}
    for (let i=0; i<searchResults.length; i++) {
        const item = searchResults[i].item
        const id = item.id
        data["profiles"][id] = item
    }

    clearHome()
    initHome(data)
    
    
}


chrome.storage.local.get("tempData", function (data) {
    initHome(data.tempData[0])
    apps = data.tempData[0]

    // generate array of apps with their ids
    let arr = []
    for (const [k,v] of Object.entries(data.tempData[0].profiles)) {
        v.id = k
        arr.push(v)
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
        keys: [
            "name"
        ]
    };

    const fuse = new Fuse(arr, fuseOptions)
    
    document.getElementById("search-bar").addEventListener("keyup", () => {search(arr, fuse)})
})



let apps
document.getElementById("home").addEventListener("click", loadHome)
document.getElementById("add-eula").addEventListener("click", loadAddEula)
document.getElementById("preferences").addEventListener("click", loadPreferences)
// main extension script

// old popup (deprecated)
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

function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);  
}


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
    fetch("/popup/pages/add.html")
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .then(() => loadScript("/scripts/analysis.js"))

    content.style.display = "block"
}

function highlight(){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({action: "highlight", tabId: tabs[0].id});
    })
}

function loadHiddenSites(){
    hideHome()
    hidePanel()
    
    const content = document.getElementById("panel-content")
    fetch("/popup/pages/hidden.html")
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        })
        .then(() => loadScript("/scripts/hiddenSites.js"))

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
            loadAppPanel(id, value)
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

function loadAppPanel(id, app) {
    hideHome()
    const panelContent = document.getElementById("panel-content")
    
    const appHeader = document.createElement("div")
    appHeader.classList.add("panel-app-header")

    const appIcon = document.createElement("div")
    appIcon.classList.add("panel-app-icon")
    appIcon.style.backgroundImage = `url(${app.logo})`

    const appTitle = document.createElement("div")
    appTitle.classList.add("panel-app-title")
    appTitle.innerText = `${app.name}`

    
    const appHeaderBackground = document.createElement("div")
    appHeaderBackground.classList.add("panel-app-header-background") 

    const appHeaderBackButton = document.createElement("div")
    appHeaderBackButton.classList.add("panel-app-header-back-button")
    appHeaderBackButton.innerText = "<"
    appHeaderBackButton.addEventListener("click", () => {loadHome()})

    const appScoreContainer = document.createElement("div")
    appScoreContainer.classList.add("panel-app-score-container")
    const appScoreSummary = document.createElement("div")
    appScoreSummary.classList.add("panel-app-score-summary")
    appScoreSummary.innerText = "This is some placeholder text for the overall app score summary. Why this app got this score, what kind of app it is etc."

    const arc = createScoreArc(app.score, 120)
    arc.classList.add("panel-arc")

    const arcContainer = document.createElement("div")
    const arcValue = document.createElement("div")
    arcValue.innerText = `${app.score}/5`
    arcValue.classList.add("panel-arc-value")
    arcContainer.classList.add("panel-arc-container")

    arcContainer.appendChild(arc)
    arcContainer.appendChild(arcValue)

    appScoreContainer.appendChild(arcContainer)
    appScoreContainer.appendChild(appScoreSummary)

    const appCategoryContainer = document.createElement("div")
    appCategoryContainer.classList.add("panel-app-category-container")

    for (const [id, cat] of Object.entries(app.categories)) {
        const category = document.createElement("div")
        const categoryIcon = document.createElement("img")
        const categoryTextContainer = document.createElement("div")
        const categoryName = document.createElement("div")
        const categorySummary = document.createElement("div")
        const categoryArc = createScoreArc(cat.score, 60)

        category.classList.add("panel-category")
        categoryIcon.classList.add("panel-category-icon")
        categoryTextContainer.classList.add("panel-category-text-container")
        categoryName.classList.add("panel-category-name")
        categorySummary.classList.add("panel-category-summary")
        categoryArc.classList.add("panel-category-arc")

        categoryIcon.src = `../resources/icons/${id}.svg`
        categoryName.innerText = `${categoryMap[id]}`
        categorySummary.innerText = `${cat.summary}`

        categoryTextContainer.appendChild(categoryName)
        categoryTextContainer.appendChild(categorySummary)
        category.appendChild(categoryIcon)
        category.appendChild(categoryTextContainer)
        category.appendChild(categoryArc)

        appCategoryContainer.appendChild(category)
    }

    const deleteButton = document.createElement("div")
    deleteButton.classList.add("panel-delete-button")
    deleteButton.addEventListener("click", () => {deleteProfile(id)})
    deleteButton.innerText = "Remove Profile"


    appHeader.appendChild(appIcon)
    appHeader.appendChild(appTitle)
    appHeader.appendChild(appHeaderBackButton)
    appHeader.appendChild(appHeaderBackground)
    panelContent.appendChild(appHeader)

    panelContent.appendChild(appScoreContainer)

    panelContent.appendChild(appCategoryContainer)

    panelContent.appendChild(deleteButton)

    panelContent.style.display = "block"
}

function deleteProfile(id) {

    chrome.storage.local.get("tempData", function (data) {
        const obj = data.tempData[0]
        const profiles = obj.profiles
        
        delete profiles[id]

        chrome.storage.local.set({"tempData" : [obj]}, function() {
            return true
        })
        apps = obj

        clearHome()
        initHome(apps)
        loadHome()
    })
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
document.getElementById("highlight").addEventListener("click", highlight)
document.getElementById("hidden-sites").addEventListener("click", loadHiddenSites)

function initPanel(data) {

    let container = document.getElementById("side-panel-apps-container")

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
            loadGraph(value.categories)
            loadAppPanel(value)
        })

        newAppContainer.appendChild(newApp)
        newAppContainer.appendChild(newAppName)
        container.appendChild(newAppContainer)
    }
}

function resetPanel() {
    const header = document.getElementById("side-panel-header")
    const backButton = document.getElementById("back-button")
    const appsContainer = document.getElementById("side-panel-apps-container")
    const appInformationContainer = document.getElementById("app-information-container")
    const graphDefaultText = document.getElementById("graph-default-text")

    header.classList.remove("app-name-header")
    header.innerText = "Agreements"

    backButton.style.display = "none"

    while (appInformationContainer.firstChild) {
        appInformationContainer.lastChild.remove()
    }
    appInformationContainer.style.display = "none"

    clearGraph()


    graphDefaultText.style.display = "block"
    appsContainer.style.display = "block"
}


// this loads the selected apps information panel
function loadAppPanel(value) {

    // existing elements
    const header = document.getElementById("side-panel-header")
    const backButton = document.getElementById("back-button")
    const appsContainer = document.getElementById("side-panel-apps-container")
    const appInformationContainer = document.getElementById("app-information-container")
    const graphDefaultText = document.getElementById("graph-default-text")

    // elements to be added to the DOM
    const appScoreContainer = document.createElement("div")
    const appScoreValue = document.createElement("div")
    const appScoreContainerTitle = document.createElement("div")
    const appCategoryContainer = document.createElement("div")

    // changes panel information
    header.classList.add("app-name-header")
    header.innerText = `${value.name}`
    backButton.style.display = "inline-block"
    appsContainer.style.display = "none"
    appInformationContainer.style.display = "block"


    // creates main app score DOM element
    const arc = createScoreArc(value.score, 100)
    arc.style.position = "absolute"
    arc.setAttribute("id", "app-score")
    appScoreContainer.setAttribute("id", "app-score-container")
    appScoreValue.setAttribute("id", "app-score-value")
    appScoreValue.innerText = `${value.score}/5`
    appScoreValue.classList.add("non-selectable")
    appScoreContainer.appendChild(appScoreValue)
    appScoreContainer.appendChild(arc)
    appScoreContainerTitle.innerText = "Overall Score"
    appScoreContainerTitle.setAttribute("id", "app-score-container-title")
    appScoreContainerTitle.classList.add("non-selectable")
    appScoreContainer.appendChild(appScoreContainerTitle)


    // creates tiles for each EULA category
    appCategoryContainer.setAttribute("id", "app-category-container")

    for (const [id, cat] of Object.entries(value.categories)) {
        const category = document.createElement("div")
        category.setAttribute("id", `tile-${id}`)
        category.classList.add("category-tile")

        // create category image
        const categoryImage = document.createElement("img")
        categoryImage.classList.add("category-image")
        categoryImage.src = `../../../resources/icons/${id}.svg`

        // create category content
        const categoryTitle = document.createElement("div")
        const categorySummary = document.createElement("div")
        const categoryContent = document.createElement("div")
        
        categoryTitle.innerText = `${categoryMap[id]}`
        categoryTitle.classList.add("category-title")
        categorySummary.innerText = `${cat.summary}`
        categorySummary.classList.add("category-summary")
        categoryContent.classList.add("category-content")
        categoryContent.appendChild(categoryTitle)
        categoryContent.appendChild(categorySummary)

        // create category rating
        const arc = createScoreArc(cat.score, 50)
        arc.classList.add("category-score")


        category.appendChild(categoryImage)
        category.append(categoryContent)
        category.append(arc)

        // tile highlighting event handlers
        category.addEventListener("mouseenter", () => {
            highlight(id)
        })
        category.addEventListener("mouseleave", () => {
            unhighlight(id)
        })

        appCategoryContainer.appendChild(category)
    }


    graphDefaultText.style.display = "none"

    // add all new elements to the DOM
    appInformationContainer.appendChild(appScoreContainer)
    appInformationContainer.appendChild(appCategoryContainer)

    // sets back button event handler
    backButton.addEventListener("click", resetPanel)

}
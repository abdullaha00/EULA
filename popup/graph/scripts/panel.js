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
        categoryTitle.innerText = `${cat.name}`
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

function createScoreArc(score, size) {
    const width = size
    const height = width
    const outerRadius = height/2
    const innerRadius = outerRadius * 0.75

    const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    const g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

    const separatorArc = d3.arc()
        .innerRadius(innerRadius-2)
        .outerRadius(outerRadius+2)

    const background = g.append("path")
        .datum({endAngle: 2*Math.PI})
        .style("fill", "#ddd")
        .attr("d", arc);

    let color
    switch (score) {
        case 1 : color = "#FA897B"; break
        case 2 : color = "#FFDD94"; break
        case 3 : color = "#D0E685"; break
        case 4 : color = "#86E3CE"; break
        case 5 : color = "#CCABD8"; break
    }

    const foreground = g.append("path")
        .datum({endAngle: 2*Math.PI * score/5})
        .style("fill", color)
        .attr("d", arc);

    for (let i=1;i<6;i++) {
        g.append("path")
            .datum({startAngle: -0.05+i*(2*Math.PI)/5, endAngle: 0.05+i*(2*Math.PI)/5})
            .style("fill", "whitesmoke")
            .attr("d", separatorArc);
    }

    return svg.node()
}
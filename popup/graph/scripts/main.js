window.onload = function() {

    // initialize the panzoom element
    const elem = document.getElementById('graph-container')
    const panzoom = Panzoom(elem, {
    maxScale: 5
    })
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)

    const resetPanzoom = document.getElementById("reset-panzoom")
    resetPanzoom.addEventListener("click", () => {
        panzoom.reset()
        resetPanzoom.style.display = "none"
    })

    elem.addEventListener("panzoomchange", (e) => {
        resetPanzoom.style.display = "block"
    })

    // initially hide the reset button
    setTimeout(() => {
    resetPanzoom.style.display = "none"
    }, 0)


    // get the data from chrome.storage.local

    chrome.storage.local.get(tempData, function (data) {
        initPanel(data)
    })
}


// resizes the graph if the viewport is resized
onresize = (e) => {
    if (isLoaded) {
        reloadGraph(loaded)
    }
}

// highlights both the tile and node
function highlight(id) {
    const tile = document.getElementById(`tile-${id}`)
    const node = document.getElementById(`node-${id}`)

    tile.classList.add('tile-highlight')
    node.classList.add('node-highlight')
}

function unhighlight(id) {
    const tile = document.getElementById(`tile-${id}`)
    const node = document.getElementById(`node-${id}`)

    tile.classList.remove('tile-highlight')
    node.classList.remove('node-highlight')
}
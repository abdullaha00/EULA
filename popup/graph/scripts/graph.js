let isLoaded = false
let loaded

function reloadGraph(data) {
    clearGraph()
    loadGraph(data)
}

function loadGraph(data) {
    isLoaded = true
    loaded = data

    const container = document.getElementById("graph-container")
    width = container.offsetWidth
    height = container.offsetHeight
    padding = 0
    
    // include the id in the value
    let arr = []
    for (const [k,v] of Object.entries(data)) {
        v.id = k
        arr.push(v)
    }
    console.log(arr);
    
    
    const colorScale = d3.scaleOrdinal()
    .domain(arr.map(d => d.name))
    .range(d3.schemeSet2)

    const pack = d3.pack()
    .size([width-padding, height-padding])
    .padding(10)

    const hierarchy = d3.hierarchy({children: arr}) 
    .sum(d => d.score)

    const root = pack(hierarchy)

    const svg = d3.select("#graph-container")
    .append("svg")
    .attr("id", "graph")
    .attr("width", `${width}px`)
    .attr("height", `${height}px`)

    const bubbles = svg.selectAll(".bubble")
    .data(root.descendants().slice(1))
    .enter()
    .append("g")
    .attr("class", "bubble")
    .attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`)
    .attr("id", d => `node-${d.data.id}`)

    bubbles.append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => colorScale(d.data.name));

    bubbles.append("text")
    .style("text-anchor", "middle")
    .style("dominant-baseline", "middle")
    .append("tspan")
    .attr("class", "node-title")
    .text(d => d.data.name)

    // Set the text color to black
    d3.selectAll("text").style("fill", "black");

    // NEEDED IF WANT TO ADD CLICKING FUNCTIONALITY
    // differentiate between click and drag for elements
    // var bubbleElems = document.querySelectorAll(".bubble")
    // bubbleElems.forEach(bubble => {
    //     let startX
    //     let startY
    //     const threshold = 5
    //     bubble.addEventListener("pointerdown", e => {
    //         startX = e.pageX
    //         startY = e.pageY
            
    //     })
    //     bubble.addEventListener("pointerup", e => {
    //         const diffX = Math.abs(e.pageX - startX)
    //         const diffY = Math.abs(e.pageY - startY)

    //         if (diffX < threshold && diffY < threshold) {
    //             console.log("click"); // do bubble thing
    //         }
    //     })
    // })


    var bubbleElems = document.querySelectorAll(".bubble")
    bubbleElems.forEach( bubble => {
        const id = +bubble.getAttribute("id").slice(5)
        

        // node highlighting event handlers
        bubble.addEventListener("mouseenter", () => {
            highlight(id)
        })
        bubble.addEventListener("mouseleave", () => {
            unhighlight(id)
        })
    })

}


function clearGraph() {
    isLoaded = false
    const graph = document.getElementById("graph")
    graph.remove()


}
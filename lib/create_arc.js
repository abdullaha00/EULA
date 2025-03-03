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
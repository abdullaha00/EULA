window.onload = function() {

    // initialize the panzoom element
    const elem = document.getElementById('graph-container')
    const panzoom = Panzoom(elem, {
    maxScale: 5
    })
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)


    // differentiate between click and drag for elements
    var bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach(bubble => {
        let startX
        let startY
        const threshold = 5
        bubble.addEventListener("pointerdown", e => {
            startX = e.pageX
            startY = e.pageY
            
        })
        bubble.addEventListener("pointerup", e => {
            const diffX = Math.abs(e.pageX - startX)
            const diffY = Math.abs(e.pageY - startY)

            if (diffX < threshold && diffY < threshold) {
                console.log("click");
                
            }
        })
    })
}
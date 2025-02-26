// helper function
function activate(id) {
    const navitems = document.querySelectorAll("#navbar>li>a")
    navitems.forEach(navitem => {
        navitem.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}
function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);  
}

// add event listeners for navbar
document.getElementById("home").addEventListener("click", function () {
    fetch("/popup/pages/home.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .then(() => activate("home"))
        .then(() => loadScript("/scripts/home.js"))

});

document.getElementById("customEula").addEventListener("click", function () {
    fetch("/popup/pages/custom.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .then(() => activate("customEula"))
        .then(() => loadScript("/scripts/analysis.js"))
});

document.getElementById("preferences").addEventListener("click", function () {
    fetch("/popup/pages/preferences.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .then(() => activate("preferences"))
});
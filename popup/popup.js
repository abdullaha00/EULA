document.getElementById("HOME").addEventListener("click", function () {

    fetch("home.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })


});

let data = null;

chrome.storage.local.get(["tempData"], function(res) {

    console.log(res.tempData[0]);
    data = Object.values(res.tempData[0].profiles);
    document.dispatchEvent(new CustomEvent("dataLoaded", {detail: data}));

});

function refresh(data, filter="") {

    document.querySelector(".icon-grid").innerHTML = "";

    data.forEach(value => {
        
        if (filter && !value.name.toLowerCase().includes(filter.toLowerCase())) {return;}

        console.log(value.name);
        const div = document.createElement("div");
        div.className = "icon";

        const img = document.createElement("img");
        // img.src = "https://www.google.com/s2/favicons?domain=google.com&sz=64";

        img.src = value.logo;
        img.width = 64;
        img.height = 64;
        div.appendChild(img);

        document.querySelector(".icon-grid").appendChild(div);
    
    })

} 



document.addEventListener("dataLoaded", (event) => {

    refresh(event.detail);

})



document.getElementById('searchbox').addEventListener('input', (event) =>  {

    refresh(data, event.target.value);

})
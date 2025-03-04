chrome.storage.local.get(["tempData"], function (data) {
    for (const host of data["tempData"][0]["hidden"]){
        const newListItem = document.createElement("li");
        const newButton = document.createElement("button");
        newButton.innerHTML = "&times;";
        newButton.id = host;
        newButton.classList.add("remove-btn");
        newListItem.textContent = host; // Text for the list item
        newListItem.appendChild(newButton);
        document.getElementById("site-list").appendChild(newListItem);
    }
  
  })

document.querySelector("ul").addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        host = event.target.id;
        chrome.storage.local.get(["tempData"], function (data) {
            var index = data["tempData"][0]["hidden"].indexOf(host);
            if (index !== -1) {
                data["tempData"][0]["hidden"].splice(index, 1);
            }
            chrome.storage.local.set({"tempData" : data["tempData"]}).then(() => {
                event.target.parentElement.remove();
            });
          });
    }
});
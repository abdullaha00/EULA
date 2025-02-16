let s = document.getElementById('setBtn')
if (s) {
    s.addEventListener('click', () => {save()})
}

let g = document.getElementById('getBtn')
if (g) {
    g.addEventListener('click', () => {retrieve()})
}

function save() {
    chrome.storage.sync.set({ "key": "val" }).then(() => {
        console.log("Value set");
      });
}

function retrieve() {
    chrome.storage.sync.get(["key"]).then((result) => {
        console.log("Value is " + result.key);
      });
}
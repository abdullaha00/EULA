const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';
const modal = document.createElement("div");
modal.innerHTML = `
<div class="modal" id="myModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h1>New EULA Detected!</h1>
    <button>Add EULA</button>
  </div>
</div>
`

const style = document.createElement("style");
style.textContent = `
.modal{
    display: block;
    position: fixed;
    z-index: 1000;
    right: 8%;
    top: 3%;
    width: 15%;
    height: auto;
    max-height: 80%;
    border-radius: 8px;
}
.modal-content{
    background-color: gainsboro;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 8px;
}

.close{
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
`

function find_links(){
    const relevant_links = Array.from(document.querySelectorAll('a'))
    .filter(a => link_words.some(phrase => a.textContent.toLowerCase().includes(phrase)))
    .map(a => a.href);

    const unique_links = [...new Set(relevant_links)];
    unique_links.forEach(link => {
        fetch(base.concat(encodeURIComponent(encodeURIComponent(link))))
        .then(res => res.json())
        .then(console.log)
    });
    return unique_links.length
};

const tempData = chrome.storage.local.get();

let match = false
const currentHost = window.location.hostname;
for (const id in tempData.profiles){
    console.log(tempData.profiles[id].hostname)
    if (currentHost === tempData.profiles[id].hostname){
        match = true;
        break;
    }
};

if (!match){
    setTimeout(() => {
        let found = find_links();
        if (found > 0){
            document.head.appendChild(style);
            document.body.appendChild(modal);
            const myModal = document.getElementById("myModal");
            const allClose = document.getElementsByClassName("close")
            const span = allClose[allClose.length - 1]
            span.onclick = function() {
                modal.style.display = "none";
            };
            window.onclick = function(event) {
                if (event.target == myModal) {
                  modal.style.display = "none";
                }
              };
        }
        
    }, 1000);
}
console.log(match);
const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';
const modal = document.createElement("div");
modal.innerHTML = `
<div class="modal" id="myModal">
  <div class="modal-content">
    <span class="close">&times;</span>

    <h1>New EULAs Detected</h1>
    <button id="addEULA">Add Platform</button>
  </div>
</div>
`

const style = document.createElement("style");
style.textContent = `
.modal{
    display: flex;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    align-items: center;
    justify-content: right;
}
.modal-content{
    background-color: whitesmoke;
    padding: 20px;
    width: 200px;
    border: 1px solid #888;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px;
}

.close{
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
.close:hover {
  color: #333;
}

button {
  background-color: dimgray;
  color: whitesmoke;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: darkslategrey;
}

h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 22px;
  color: darkslategrey;
}
`

function scrape_links(){
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
        let found = scrape_links();
        if (found > 0){
            document.head.appendChild(style);
            document.body.appendChild(modal);
            const myModal = document.getElementById("myModal");
            const allClose = document.getElementsByClassName("close")
            const button = document.getElementById("addEULA");
            const span = allClose[allClose.length - 1]
            span.onclick = function() {
                modal.style.display = "none";
            };
            window.onclick = function(event) {
                if (event.target == myModal) {
                  modal.style.display = "none";
                }
              };
            button.onclick = function(){
                console.log("added!")
            }
            
        }
        
    }, 1000);
}
console.log(match);
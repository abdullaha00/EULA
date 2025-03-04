// automatic popup script

const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';


function hidePopup() {
  // hide popup
  const popup = document.getElementById("popup-container")
  popup.style.display = "none"

  // add button to redisplay popup
  const reshowPopupButton = document.getElementById("reshow-popup-button")
  reshowPopupButton.style.display = "block"
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function showPopup() {

  const reshowPopupButton = document.createElement("div")
  reshowPopupButton.setAttribute("id", "reshow-popup-button")
  reshowPopupButton.style.backgroundImage = `url(${chrome.runtime.getURL("resources/EULAV.svg")})`
  reshowPopupButton.addEventListener("click", () => {popupContainer.style.display = "block"; reshowPopupButton.style.display = "none"})
  reshowPopupButton.style.display = "none" // hide for now


  const popupContainer = document.createElement("div")
  popupContainer.setAttribute("id", "popup-container")
  popupContainer.classList.add("popup-container")
  dragElement(popupContainer)
  
  const headerContainer = document.createElement("div")
  headerContainer.classList.add("popup-header-container")

  const logoContainer = document.createElement("div")
  logoContainer.classList.add("popup-logo-container")
  const logo = document.createElement("img")
  logo.src = chrome.runtime.getURL("resources/EULAV.svg")
  logo.classList.add("popup-logo")
  const logoName = document.createElement("div")
  logoName.classList.add("popup-logo-name")
  logoName.innerText = "EULAV"

  logoContainer.appendChild(logo)
  logoContainer.appendChild(logoName)
  
  headerContainer.appendChild(logoContainer)

  const closeButton = document.createElement("div")
  closeButton.classList.add("popup-close-button")
  closeButton.innerHTML = "&times"
  closeButton.addEventListener("click", hidePopup)

  headerContainer.appendChild(closeButton)

  popupContainer.appendChild(headerContainer)



  // load fonts
  const poppinsFontFace = new FontFace('Poppins', `url(${chrome.runtime.getURL("resources/fonts/Poppins/Poppins-Regular.ttf")})`);
  poppinsFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      popupContainer.style.fontFamily = "'Poppins', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));
  
  const montserratFontFace = new FontFace('Montserrat', `url(${chrome.runtime.getURL("resources/fonts/Montserrat/static/Montserrat-Bold.ttf")})`);
  montserratFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      logoName.style.fontFamily = "'Montserrat', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));

  // overlay popup onto document
  document.body.appendChild(popupContainer)
  document.body.appendChild(reshowPopupButton)


  // add styling
  const style = document.createElement("link")
  style.type = "text/css"
  style.rel = "stylesheet"
  style.href = chrome.runtime.getURL("popup/styles/popup.css")
  document.head.appendChild(style)

  
}









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
// const currentHost = window.location.hostname;
// for (const id in tempData.profiles){
//     console.log(tempData.profiles[id].hostname)
//     if (currentHost === tempData.profiles[id].hostname){
//         match = true;
//         break;
//     }
// };

if (!match){
    setTimeout(() => {
        // let found = scrape_links();
        let found = 1
        if (found > 0){
            showPopup()

            // const myModal = document.getElementById("myModal");
            // const allClose = document.getElementsByClassName("close")
            // const button = document.getElementById("addEULA");
            // const span = allClose[allClose.length - 1]
            // span.onclick = function() {
            //     modal.style.display = "none";
            // };
            // window.onclick = function(event) {
            //     if (event.target == myModal) {
            //       modal.style.display = "none";
            //     }
            //   };
            // button.onclick = function(){
            //     console.log("added!")
            // }
            
        }
        
    }, 1000);
}

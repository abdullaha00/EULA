// automatic popup script

const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';

function addProfile() {
  return
}

function addHiddenProfile() {
  return
}



function hidePopup() {
  // hide popup
  const popup = document.getElementById("popup-container")
  popup.style.display = "none"

  // add button to redisplay popup
  const reshowPopupButton = document.getElementById("reshow-popup-button")
  reshowPopupButton.style.display = "block"
}

function closePopup() {
  const popup = document.getElementById("popup-container")
  popup.style.display = "none"
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
  closeButton.classList.add("popup-corner-button")
  closeButton.innerHTML = "&times"
  closeButton.addEventListener("click", closePopup)

  const hideButton = document.createElement("div")
  hideButton.classList.add("popup-corner-button")
  hideButton.classList.add("popup-hide-button")
  hideButton.innerHTML ="&#8964"
  hideButton.addEventListener("click", hidePopup)

  const footerContainer = document.createElement("div")
  footerContainer.classList.add("popup-footer")

  const addButton = document.createElement("div")
  addButton.classList.add("add-button")
  addButton.classList.add("popup-bottom-button")
  addButton.innerText = "Add Profile"
  addButton.addEventListener("click", addProfile) // TODO

  const dontShowButton = document.createElement("div")
  dontShowButton.classList.add("dont-show-button")
  dontShowButton.classList.add("popup-bottom-button")
  dontShowButton.innerText = "Don't Show Again"
  dontShowButton.addEventListener("click", addHiddenProfile) // TODO

  footerContainer.appendChild(addButton)
  footerContainer.appendChild(dontShowButton)

  headerContainer.appendChild(closeButton)
  headerContainer.appendChild(hideButton)

  popupContainer.appendChild(headerContainer)
  popupContainer.appendChild(footerContainer)

  // load fonts
  const poppinsFontFace = new FontFace('Poppins', `url(${chrome.runtime.getURL("resources/fonts/Poppins/Poppins-Regular.ttf")})`);
  poppinsFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      popupContainer.style.fontFamily = "'Poppins', sans-serif"
  }).catch((err) => console.error("Font failed to load:", err));
  
  const poppinsMediumFontFace = new FontFace('Poppins-medium', `url(${chrome.runtime.getURL("resources/fonts/Poppins/Poppins-Medium.ttf")})`);
  poppinsMediumFontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      footerContainer.style.fontFamily = "'Poppins-medium', sans-serif"
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

chrome.storage.local.get(["tempData"], function (data) {
    console.log(data["tempData"][0])
    const tempData = data.tempData[0] 
    let match = false
    const currentHost = window.location.hostname;
    for (const id in tempData.profiles){
        if (currentHost === tempData.profiles[id].hostname){
            console.log("this is an added page")
            match = true;
            break;
        }
    }
    for (const id in tempData.hidden){
      if (currentHost === tempData.profiles[id].hostname){
        console.log("hidden page")
        match = true;
        break;
      }
    }
    if (!match){
      console.log("this is a new page")
        setTimeout(() => {
            let found = scrape_links();
            if (found > 0){
              showPopup()
            }
            
        }, 1000);
    }
;});

// automatic popup script

const link_words = ["policy", "terms", "privacy", "notice"];
const base = 'https://as3495.user.srcf.net/';

const categoryMap = {
  1  : "Grant of License",
  2  : "Restrictions of Use",
  3  : "Ownership & IP",
  4  : "User responsibilities",
  5  : "Privacy & Data",
  6  : "Security",
  7  : "Third-party Services",
  8  : "Fees and Payments",
  9  : "Updates and Modifications",
  10 : "Support and Maintenance",
  11 : "Warranties",
  12 : "Liability",
  13 : "Dispute Resolution",
  14 : "Governing Law",
  15 : "Changes to EULA"
}


function getPageIcon() {
  return "https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png" // TODO
}

function addProfile() {

}

function addHiddenProfile() {
  const currentHost = window.location.hostname;
  chrome.storage.local.get(["tempData"], function (data) {
    data["tempData"][0]["hidden"].push(currentHost);
    chrome.storage.local.set({"tempData" : data["tempData"]}).then(() => {
      closePopup()
    });
  });
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
  dontShowButton.innerText = "Don't Show On This Site "
  dontShowButton.addEventListener("click", addHiddenProfile) // TODO

  footerContainer.appendChild(addButton)
  footerContainer.appendChild(dontShowButton)

  headerContainer.appendChild(closeButton)
  headerContainer.appendChild(hideButton)

  const infoContainer = document.createElement("div")
  infoContainer.classList.add("popup-info-container")
  const siteIcon = document.createElement("img")
  siteIcon.classList.add("popup-site-icon")
  siteIcon.src = getPageIcon()
  const siteName = document.createElement("div")
  siteName.classList.add("popup-site-name")
  siteName.innerText = window.location.hostname
  const siteBackground = document.createElement("div")
  siteBackground.classList.add("popup-site-background")

  infoContainer.appendChild(siteIcon)
  infoContainer.appendChild(siteName)
  infoContainer.appendChild(siteBackground)


  const arcsContainer = document.createElement("div")
  arcsContainer.classList.add("popup-arcs-container")

  const mainScoreArcContainer = document.createElement("div")
  mainScoreArcContainer.classList.add("popup-main-score-arc-container")
  const mainScoreArc = createScoreArc(3, 180)
  mainScoreArc.classList.add("popup-main-score-arc")

  const mainScoreValue = document.createElement("div")
  mainScoreValue.classList.add("popup-main-score-value")
  mainScoreValue.innerText = "3/5"

  mainScoreArcContainer.appendChild(mainScoreArc)
  mainScoreArcContainer.appendChild(mainScoreValue)


  const categoriesContainer = document.createElement("div")
  categoriesContainer.classList.add("popup-categories-container")

  for ([id, val] of Object.entries(categoryMap)) {
    const categoryContainer = document.createElement("div")
    const categoryIcon = document.createElement("div")
    const categoryArc = createScoreArc(5, 80)
    
    categoryContainer.classList.add("popup-category-container")
    categoryIcon.classList.add("popup-category-icon")
    categoryArc.classList.add("popup-category-arc")

    categoryContainer.appendChild(categoryIcon)
    categoryContainer.appendChild(categoryArc)
    categoriesContainer.appendChild(categoryContainer)
  }

  arcsContainer.appendChild(mainScoreArcContainer)
  arcsContainer.appendChild(categoriesContainer)

  popupContainer.appendChild(headerContainer)
  popupContainer.appendChild(infoContainer)
  popupContainer.appendChild(arcsContainer)
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
      arcsContainer.style.fontFamily = "'Poppins-medium', sans-serif"
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
            match = true;
            break;
        }
    }
    for (const host of tempData.hidden){
      if (currentHost === host){
        match = true;
        break;
      }
    }
    match = false
    if (!match){
        setTimeout(() => {
            let found = scrape_links();
            found = 1
            if (found > 0){
              showPopup()
            }
            
        }, 1000);
    }
;});
